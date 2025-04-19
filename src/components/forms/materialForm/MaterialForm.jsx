import { useForm } from "react-hook-form";
import DragDrop from "../../dragDrop/DragDrop.jsx";
import { useEffect, useRef, useState } from "react";
import Button from "../../button/Button.jsx";
import "../Forms.css";
import useApiRequest from "../../../hooks/useApiRequest.js";

function MaterialForm() {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [file, setFile] = useState(null);
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [successId, setSuccessId] = useState(null);
    const [validationError, setValidationError] = useState("");
    const selectedStyleId = watch("styleId");
    const selectedLink = watch("link");
    const dragDropRef = useRef();

    const { data: fetchedStyles, loading: stylesLoading, error: stylesError, executeRequest: fetchStyles, postData } = useApiRequest([]);

    useEffect(() => {
        void fetchStyles('get', `${import.meta.env.VITE_API_URL}/styles`);
    }, []);

    useEffect(() => {
        if (selectedStyleId) {
            const selectedStyle = fetchedStyles.find((style) => style.id.toString() === selectedStyleId);
            setSelectedOrigin(selectedStyle?.origin || null);
        } else {
            setSelectedOrigin(null);
        }
    }, [selectedStyleId, fetchedStyles]);

    useEffect(() => {
        if ((file || selectedLink)) {
            setValidationError("");
        }
    }, [file, selectedLink]);

    function handleFileSelect(selectedFile) {
        setFile(selectedFile);
    }

    const { executeRequest } = useApiRequest();

    async function handleFormSubmit(metaData) {
        const hasLink = metaData.link && metaData.link.trim() !== "";
        const hasFile = file !== null;

        if (!hasLink && !hasFile) {
            setValidationError("Je moet minimaal een bestand óf een link toevoegen.");
            return;
        }

        try {
            const response = await executeRequest('post', `${import.meta.env.VITE_API_URL}/materials`, metaData);
            const material = response?.data || {};
            const materialId = material.id;

            if (file) {
                const fileFormData = new FormData();
                fileFormData.append("file", file);
                await executeRequest('post', `${import.meta.env.VITE_API_URL}/materials/${materialId}/file`, fileFormData);
            } else if (metaData.link) {
                await executeRequest('post', `${import.meta.env.VITE_API_URL}/materials/${materialId}/link`, { link: metaData.link });
            }

            setSuccessId(materialId);
            reset();
            removeFile();

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    }

    function removeFile() {
        setFile(null);
        dragDropRef.current?.reset();
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <fieldset>
                <label>Upload een bestand:</label>
                <DragDrop onFileSelect={handleFileSelect} ref={dragDropRef} />
                {file && (
                    <div>
                        <p><strong>Geselecteerd bestand:</strong></p>
                        <p>{file.name}</p>
                        <Button type="button" onClick={removeFile} variant="secondary">
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

                {!file && (
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

                <label htmlFor="instrument">
                    Instrument:
                    <input
                        type="instrument"
                        id="instrument"
                        placeholder="Bijv: djembé"
                        {...register("instrument")}
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

                {validationError && <p className="errorMessage">{validationError}</p>}
                {successId && <p>Het materiaal is succesvol opgeslagen!</p>}

            </fieldset>
        </form>
    );
}

export default MaterialForm;
