import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";

function ForgotPasswordPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        setMessage("");
        setError("");
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/forgot-password`, data);
            setMessage("Er is een e-mail verstuurd met instructies om je wachtwoord te resetten.");
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError("Geen gebruiker gevonden met dit e-mailadres.");
            } else {
                setError("Er is iets misgegaan. Probeer het later opnieuw.");
            }
        }
    };

    return (
        <section className="centerContainer">
            <h2>Wachtwoord vergeten</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="email">
                        E-mailadres:
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "E-mailadres is verplicht" })}
                            className={errors.email ? "inputError" : ""}
                        />
                    </label>
                    {errors.email && <p className="errorMessage">{errors.email.message}</p>}

                    {error && <p className="errorMessage">{error}</p>}
                    {message && <p className="successMessage">{message}</p>}

                    <Button type="submit">Verzend resetlink</Button>
                </fieldset>
            </form>
        </section>
    );
}

export default ForgotPasswordPage;
