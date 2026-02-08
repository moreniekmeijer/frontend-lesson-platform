import Button from "../../button/Button.jsx";
import {useForm} from "react-hook-form";
import {useState} from "react";
import "../Forms.css";
import useApiRequest from "../../../hooks/useApiRequest.js";

function StyleForm() {
    const [successId, setSuccessId] = useState(null);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const {
        error,
        executeRequest
    } = useApiRequest();

    async function handleFormSubmit(formData) {
        setLoading(true);

        try {
            const response = await executeRequest("post", `${import.meta.env.VITE_API_URL}/styles`, formData);
            setSuccessId(response.data.id);
        } catch (e) {
            console.error("Post error:", e);
        }
        setLoading(false);
        reset()
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <fieldset>
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
                    Land van oorsprong (in het Engels):
                    <input
                        type="text"
                        id="origin"
                        placeholder="Bijv: Brasil"
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
            </fieldset>
            <fieldset>
                <label htmlFor="description">
                    Omschrijving:
                </label>
                <textarea
                    id="description"
                    rows="6"
                    cols="30"
                    className={errors.description ? "inputError" : ""}
                    {...register("description", {
                        required: {
                            value: true,
                            message: 'Een omschrijving is verplicht',
                        },
                        maxLength: {
                            value: 1000,
                            message: 'Input mag maximaal 1000 karakters bevatten',
                        },
                    })}/>
                {errors.description && <p className="errorMessage">{errors.description.message}</p>}

                <Button type="submit" disabled={loading}>
                    Opslaan
                </Button>
                {loading && <p>Stijl aan het opslaan...</p>}
                {successId && <p>De stijl is succesvol opgeslagen!</p>}
                {error === "The name must be unique. This name already exists." && <p>Deze stijl bestaat al.</p>}
            </fieldset>
        </form>
    )
}

export default StyleForm;