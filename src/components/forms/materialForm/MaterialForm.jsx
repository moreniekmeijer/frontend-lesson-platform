import {useForm} from "react-hook-form";
import DragDrop from "../../dragDrop/DragDrop.jsx";
import {useEffect, useState} from "react";
import Button from "../../button/Button.jsx";
import axios from "axios";
import "../Forms.css";

function MaterialForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [file, setFile] = useState(null);
    const [styles, setStyles] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const selectedStyleId = watch("styleId");

    useEffect(() => {
        async function fetchStyles() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/styles`);
                setStyles(response.data);
            } catch (error) {
                console.error("Kon stijlen niet ophalen:", error);
            }
        }

        void fetchStyles();
    }, []);

    useEffect(() => {
        if (selectedStyleId) {
            const selectedStyle = styles.find((style) => style.id.toString() === selectedStyleId);
            setSelectedOrigin(selectedStyle?.origin || null);
        } else {
            setSelectedOrigin(null);
        }
    }, [selectedStyleId, styles]);


    function handleFileSelect(selectedFile) {
        setFile(selectedFile);
    }

    function handleFormSubmit(metaData) {

        async function sendData(fileToUpload) {

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/materials`, metaData);
                alert("Upload succesvol!");

                const materialId = response.data.id;

                if (fileToUpload) {
                    const fileFormData = new FormData();
                    fileFormData.append("file", fileToUpload);

                    for (let [key, value] of fileFormData.entries()) {
                        console.log(`${key}:`, value);
                    }

                    await axios.post(`${import.meta.env.VITE_API_URL}/materials/${materialId}/file`, fileFormData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    alert("Bestand geüpload!");
                }
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
                alert("Er is iets misgegaan tijdens het uploaden.");
            }
        }

        void sendData(file);
    }

    // TODO - alerts weghalen en nette html berichtgeving daarvoor in de plaats

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <fieldset>
                <label>Upload een bestand:</label>
                <DragDrop onFileSelect={handleFileSelect}/>
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

                <label htmlFor="link">
                    Link (optioneel):
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

                <label htmlFor="category">
                    Categorie (optioneel):
                    <input
                        type="text"
                        id="category"
                        placeholder="Bijv: break of solo"
                        {...register("category")}
                    />
                </label>

                <label htmlFor="instrument">
                    Instrument (optioneel):
                    <input
                        type="instrument"
                        id="instrument"
                        placeholder="Bijv: djembé"
                        {...register("instrument")}
                    />
                </label>

                <label htmlFor="styleId">
                    Voeg toe aan stijl:
                    <select id="styleId" {...register("styleId", {required: true})}>
                        <option value="">-- Kies een stijl --</option>
                        {styles.map((style) => (
                            <option key={style.id} value={style.id}>
                                {style.name}
                            </option>
                        ))}
                    </select>
                </label>
                {selectedOrigin && (
                    <p><strong>Herkomst:</strong> {selectedOrigin}</p>
                )}

                <label htmlFor="hidden">
                    <input type="checkbox" id="hidden" {...register("hidden")}/>
                    Houd video verborgen
                </label>

                <Button type="submit">
                    Opslaan
                </Button>
            </fieldset>
        </form>
    )
}

export default MaterialForm;