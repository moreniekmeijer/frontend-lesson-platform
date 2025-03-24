import Button from "../button/Button.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useEffect, useState} from "react";

function LessonForm({setActiveTab}) {
    const [successId, setSuccessId] = useState(null);
    const [error, setError] = useState(false);
    const [styles, setStyles] = useState([]);
    const [selectedStyles, setSelectedStyles] = useState([]);
    const {register, handleSubmit, formState: {errors}} = useForm();

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

    function handleStyleChange(styleName) {
        setSelectedStyles((prevSelected) => {
            if (prevSelected.includes(styleName)) {
                return prevSelected.filter((name) => name !== styleName);
            } else {
                return [...prevSelected, styleName];
            }
        });
    }

    function handleFormSubmit(data) {
        const addedData = {
            ...data,
            styleNames: selectedStyles,
            scheduledDateTime: new Date().toISOString(),
        };

        async function postData() {
            setError(false);
            try {
                const response = await axios.post(`http://localhost:8080/lessons`, addedData);
                setSuccessId(response.data.id);
                setSelectedStyles([]);
            } catch (e) {
                console.error(e);
                setError(true);
            }
        }

        void postData();
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            {successId && <p>De stijl is succesvol opgeslagen!</p>}
            {error && <p>Er is iets misgegaan. Probeer het opnieuw.</p>}

            {/*Deze optie om stijlen te kiezen is nog niet ideaal*/}
            <fieldset className="styleNames">
                <legend>Kies stijlen:</legend>
                {styles.length === 0 ? (
                    <p>Geen stijlen beschikbaar!
                        <button
                            type="button"
                            onClick={() => setActiveTab('style')}>
                            Wil je stijlen toevoegen?
                        </button>
                    </p>
                ) : (
                    <div className="checkbox-container">
                        {styles.map((style) => (
                            <label key={style.id} className="checkbox">
                                <input
                                    type="checkbox"
                                    value={style.name}
                                    checked={selectedStyles.includes(style.name)}
                                    onChange={() => handleStyleChange(style.name)}
                                />
                                {style.name}
                            </label>
                        ))}
                    </div>
                )}
            </fieldset>
            <fieldset>
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