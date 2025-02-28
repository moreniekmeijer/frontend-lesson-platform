import {useForm} from "react-hook-form";
import DragDrop from "../dragDrop/DragDrop.jsx";
import "./materialForm.css"
import {useState} from "react";

function MaterialForm(props) {
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
        }

        // Debugging: Log wat er wordt verstuurd
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        console.log(formData);
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
                        {...register("title", {
                            required: {
                                value: true,
                                message: "Titel is verplicht"
                            }
                        })}
                    />
                </label>
                {errors.title && <p>{errors.title.message}</p>}

                <label htmlFor="link">
                    Link (optioneel):
                    <input
                        type="text"
                        id="link"
                        {...register("link", {
                            pattern: {
                                value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/.*)?$/,
                                message: "Moet een geldige link zijn (bijv. https://example.com)",
                            },
                        })}
                        placeholder="https://example.com"
                    />
                </label>
                {errors.link && <p>{errors.link.message}</p>}

                <label htmlFor="type">
                    Type materiaal (optioneel):
                    <input
                        type="text"
                        id="type"
                        placeholder="Bijv: break of solo"
                        {...register("type")}
                    />
                </label>

                <label htmlFor="instrument">
                    Instrument (optioneel):
                </label>
                <input
                    type="instrument"
                    id="instrument"
                    placeholder="Bijv: djembé"
                    {...register("instrument")}
                />

                <label htmlFor="style">
                    Voeg toe aan stijl:
                    <select id="style" {...register("style")}>
                        <option value="{uit backend}">`Stijl 1</option>
                        <option value="2">Stijl 2</option>
                        <option value="3">Stijl 3</option>
                    </select>
                </label>

                <label htmlFor="hidden">
                    <input type="checkbox" id="hidden" {...register("hidden")}/>
                    Houd video verborgen
                </label>

                <button type="submit">
                    Opslaan
                </button>
            </fieldset>
        </form>
    )
}

export default MaterialForm;