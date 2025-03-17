import Button from "../button/Button.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function LessonForm() {
    const [successId, setSuccessId] = useState(null);
    const [error, setError] = useState(false);
    const [styles, setStyles] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function getStyles() {
        setError(false);
        try {
            const response = await axios.get(`http://localhost:8080/styles`);
            setStyles(response.data);
        } catch (e) {
            console.error(e);
            setError(true);
        }
    }

    // Dit is niet handig misschien vanuit efficiency oogpunt.
    // Of de backend API anders of vanuit app.jsx?
    useEffect(() => {
        void getStyles();
    }, [])

    function handleFormSubmit(data) {
        const addedData = {
            ...data,
            scheduledDateTime: new Date().toISOString(),
        };

        async function postData() {
            setError(false);
            try {
                const response = await axios.post(`http://localhost:8080/lessons`, addedData);
                setSuccessId(response.data.id);
            } catch (e) {
                console.error(e);
                setError(true);
            }
        }

        void postData();
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <fieldset>
                {successId && <p>De stijl is succesvol opgeslagen!</p>}
                {error && <p>Er is iets misgegaan. Probeer het opnieuw.</p>}

                {/*Deze optie om stijlen te kiezen is nog niet ideaal*/}
                <label htmlFor="styleNames">
                    Kies stijlen:
                    {styles.length === 0 ?
                        <p>Geen stijlen beschikbaar! <Link to="/">Wil je stijlen toevoegen?</Link></p>
                        :
                        <select id="styleNames"
                            multiple
                            {...register("styleNames")}>
                            {styles.map((style) => (
                                <option key={style.id} value={style.name}>
                                    {style.name}
                                </option>
                            ))}
                    </select>}
                </label>

                <label htmlFor="notes">
                    Notities:
                </label>
                <textarea
                    id="notes"
                    rows="5"
                    cols="30"
                    {...register("notes", {
                        maxLength: {
                            value: 2000,
                            message: 'Input mag maximaal 2000 karakters bevatten',
                        },
                    })}/>
                {errors.notes && <p>{errors.notes.message}</p>}

                <Button type="submit">
                    Opslaan
                </Button>
            </fieldset>
        </form>
    )
}

export default LessonForm;