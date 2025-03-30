import {useForm} from "react-hook-form";
import DragDrop from "../dragDrop/DragDrop.jsx";
import {useState} from "react";
import Button from "../button/Button.jsx";
import axios from "axios";

function MaterialForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [file, setFile] = useState(null);

    function handleFileSelect(selectedFile) {
        setFile(selectedFile);
    }

    function handleFormSubmit(data) {
        const formData = new FormData();

        // Voeg de tekstvelden toe
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        // Voeg het bestand toe als het bestaat
        if (file) {
            formData.append("file", file);
            formData.append("filePath", file.name);
        }

        // Debugging: Log wat er wordt verstuurd
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        async function sendData() {
            try {
                const response = axios.post(`${import.meta.env.VITE_API_URL}/materials`, formData);
                console.log("Succes:", response.data);
                alert("Upload succesvol!");
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
                alert("Er is iets misgegaan tijdens het uploaden.");
            }
        }

        void sendData();
    }

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
                        className={errors.title ? "input-error" : ""}
                        {...register("title", {
                            required: {
                                value: true,
                                message: "Titel is verplicht"
                            }
                        })}
                    />
                </label>
                {errors.title && <p className="error-message">{errors.title.message}</p>}

                <label htmlFor="link">
                    Link (optioneel):
                    <input
                        type="text"
                        id="link"
                        className={errors.link ? "input-error" : ""}
                        {...register("link", {
                            pattern: {
                                value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/.*)?$/,
                                message: "Moet een geldige link zijn (bijv. https://example.com)",
                            },
                        })}
                        placeholder="https://example.com"
                    />
                </label>
                {errors.link && <p className="error-message">{errors.link.message}</p>}

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


                <label htmlFor="style">
                    Voeg toe aan stijl:
                    <select id="style" {...register("style")}>
                        <option value="{uit backend}">`Stijl 1</option>
                        <option value="Maracatu">Stijl 2</option>
                        <option value="3">Stijl 3</option>
                    </select>
                </label>

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