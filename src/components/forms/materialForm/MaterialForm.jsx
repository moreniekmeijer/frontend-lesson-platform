import { useForm } from "react-hook-form";
import DragDrop from "../../dragDrop/DragDrop.jsx";
import { useEffect, useRef, useState } from "react";
import Button from "../../button/Button.jsx";
import "../Forms.css";
import useApiRequest from "../../../hooks/useApiRequest.js";
import normalizeUrl from "../../../helpers/normalizeUrl.js"
import {normalizeInstruments} from "../../../helpers/normalizeInstruments.js";

function MaterialForm() {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [processing, setProcessing] = useState([]);
    const selectedStyleId = watch("styleId");
    const dragDropRef = useRef();
    const [hasFile, setHasFile] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState(null);

    const { data: fetchedStyles, loading: stylesLoading, error: stylesError, executeRequest: fetchStyles } = useApiRequest([]);
    const { executeRequest } = useApiRequest();

    const handleRemoveFile = () => {
        dragDropRef.current?.reset();
        setHasFile(false);
        setSelectedFileName(null);
    };

    function addProcess(process) {
        setProcessing(prev => [...prev, process]);
    }

    function updateProcess(id, updates) {
        setProcessing(prev =>
            prev.map(p => p.id === id ? { ...p, ...updates } : p)
        );
    }

    useEffect(() => {
        void fetchStyles('get', `${import.meta.env.VITE_API_URL}/styles`);
    }, []);

    useEffect(() => {
        if (selectedStyleId) {
            const selectedStyle = fetchedStyles.find(s => s.id.toString() === selectedStyleId);
            setSelectedOrigin(selectedStyle?.origin || null);
        } else {
            setSelectedOrigin(null);
        }
    }, [selectedStyleId, fetchedStyles]);

    async function handleFormSubmit(metaData) {
        const file = dragDropRef.current?.getFile?.() ?? null;
        const link = normalizeUrl(metaData.link?.trim()) || null;
        const instrumentsArray = normalizeInstruments(metaData.instruments);

        const payload = {
            ...metaData,
            instruments: instrumentsArray,
        };

        const processId = metaData.title + '_' + Date.now();
        addProcess({
            id: processId,
            name: metaData.title,
            file,
            link,
            status: 'pending',
            message: 'Metadata opslaan...'
        });

        if (!file && !link) {
            updateProcess(processId, {
                status: 'error',
                message: 'Upload mislukt',
                error: 'Je moet minimaal een bestand of een link toevoegen'
            });
            return;
        }

        let material, uploadUrl, objectName, fileType;

        try {
            let url = `${import.meta.env.VITE_API_URL}/materials`;
            if (file) {
                const params = new URLSearchParams({
                    filename: file.name,
                    contentType: file.type
                });
                url += `?${params.toString()}`;
            }

            const response = await executeRequest('post', url, payload);
            material = response?.data.material;
            uploadUrl = response?.data.uploadUrl;
            objectName = response?.data.objectName;
            fileType = response?.data.fileType;

            if (!material?.id) throw new Error("Material ID ontbreekt");

        } catch (err) {
            updateProcess(processId, {
                status: 'error',
                message: 'Upload mislukt',
                error: err?.response?.data?.error || err.message
            });
            return;
        }

        reset();
        handleRemoveFile()

        try {
            if (file && uploadUrl && objectName && fileType) {
                updateProcess(processId, { status: 'uploading', message: `${file.name} uploaden...` });

                const res = await fetch(uploadUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': file.type },
                    body: file
                });

                if (!res.ok) {
                    updateProcess(processId, { status: 'error', message: 'Upload mislukt', error: res.status });
                    return;
                }

                updateProcess(processId, { status: 'processing', message: `${file.name} verwerken...` });

                await executeRequest(
                    'post',
                    `${import.meta.env.VITE_API_URL}/materials/${material.id}/confirm-upload`,
                    { objectName, fileType }
                );

            } else if (link) {
                updateProcess(processId, { status: 'processing', message: 'Link verwerken...' });

                await executeRequest(
                    'post',
                    `${import.meta.env.VITE_API_URL}/materials/${material.id}/link`,
                    { link }
                );
            }

            updateProcess(processId, { status: 'done', message: `Materiaal is toegevoegd!` });

        } catch (err) {
            updateProcess(processId, {
                status: 'error',
                message: 'Upload mislukt',
                error: err?.response?.data?.error || err.message
            });
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <fieldset>
                <label>Upload een bestand:</label>
                <DragDrop
                    ref={dragDropRef}
                    onFileSelect={(file) => {
                        setHasFile(!!file);
                        setSelectedFileName(file?.name ?? null);
                    }}
                />
                {hasFile && (
                    <div>
                        <p><strong>Geselecteerd bestand:</strong></p>
                        <p>{selectedFileName}</p>
                        <Button
                            type="button"
                            onClick={handleRemoveFile}
                            variant="secondary"
                        >
                            Verwijder bestand
                        </Button>
                    </div>
                )}
            </fieldset>
            <fieldset>
                <label htmlFor="title">
                    Titel:
                    <input
                        type="text"
                        id="title"
                        className={errors.title ? "inputError" : ""}
                        {...register("title", {
                            required: {
                                value: true,
                                message: "Titel is verplicht"
                            }
                        })}
                    />
                </label>
                {errors.title && <p className="errorMessage">{errors.title.message}</p>}

                {!hasFile && (
                    <>
                        <label htmlFor="link">
                            Link:
                            <input
                                type="text"
                                id="link"
                                className={errors.link ? "inputError" : ""}
                                {...register("link", {
                                    pattern: {
                                        value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/.*)?$/,
                                        message: "Moet een geldige link zijn (bijv. https://example.com)",
                                    },
                                })}
                                placeholder="https://example.com"
                            />
                        </label>
                        {errors.link && <p className="errorMessage">{errors.link.message}</p>}
                    </>
                )}

                <label htmlFor="category">
                    Categorie:
                    <input
                        type="text"
                        id="category"
                        placeholder="Bijv: break of solo"
                        {...register("category")}
                    />
                </label>

                <label htmlFor="instruments">
                    Instrument(en):
                    <input
                        type="text"
                        id="instruments"
                        placeholder="Bijv: Doundoun, Sangban, Kenkeni"
                        {...register("instruments")}
                    />
                </label>

                <label htmlFor="styleId">
                    Voeg toe aan stijl:
                    <select id="styleId" {...register("styleId", {
                        required: {
                            value: true,
                            message: "Style is verplicht"
                        }
                    })}>
                        <option value="">-- Kies een stijl --</option>
                        {stylesLoading && <option>Bezig met laden...</option>}
                        {stylesError && <option>Fout bij ophalen stijlen</option>}
                        {fetchedStyles.map((style) => (
                            <option key={style.id} value={style.id}>
                                {style.name}
                            </option>
                        ))}
                    </select>
                </label>
                {errors.styleId && <p className="errorMessage">{errors.styleId.message}</p>}

                {selectedOrigin && (
                    <p><strong>Herkomst:</strong> {selectedOrigin}</p>
                )}

                <Button type="submit">
                    Opslaan
                </Button>

                {/*{validationError && <p className="errorMessage">{validationError}</p>}*/}
                <div>
                    {processing.map(p => (
                        <div key={p.id} className="process">
                            <strong>{p.name}</strong>: {p.message}
                            {p.error && <div className="errorMessage">{p.error}</div>}
                        </div>
                    ))}
                </div>
            </fieldset>
        </form>
    );
}

export default MaterialForm;
