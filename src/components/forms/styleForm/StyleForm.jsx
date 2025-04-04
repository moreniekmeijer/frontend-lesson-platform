import Button from "../../button/Button.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useState} from "react";
import "../Forms.css";

function StyleForm() {
    const [successId, setSuccessId] = useState(null);
    const [error, setError] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    function handleFormSubmit(data) {
        async function postData() {
            setError(false);
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/styles`, data);
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
                <label htmlFor="name">
                    Naam:
                    <input
                        type="text"
                        id="name"
                        className={errors.name ? "inputError" : ""}
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Naam is verplicht"
                            }
                        })}
                    />
                </label>
                {errors.name && <p className="errorMessage">{errors.name.message}</p>}

                <label htmlFor="origin">
                    Land van oorsprong:
                    <input
                        type="text"
                        id="origin"
                        placeholder="In het Engels"
                        className={errors.origin ? "inputError" : ""}
                        {...register("origin", {
                            required: {
                                value: true,
                                message: "Land van oorsprong is verplicht"
                            }
                        })}
                    />
                </label>
                {errors.origin && <p className="errorMessage">{errors.origin.message}</p>}

                <label htmlFor="description">
                    Omschrijving:
                </label>
                <textarea
                    id="description"
                    rows="5"
                    cols="30"
                    className={errors.description ? "inputError" : ""}
                    {...register("description", {
                        required: {
                            value: true,
                            message: 'Een omschrijving is verplicht',
                        },
                        maxLength: {
                            value: 2000,
                            message: 'Input mag maximaal 2000 karakters bevatten',
                        },
                    })}/>
                {errors.description && <p className="errorMessage">{errors.description.message}</p>}

                <Button type="submit">
                    Opslaan
                </Button>
            </fieldset>
        </form>
    )
}

export default StyleForm;