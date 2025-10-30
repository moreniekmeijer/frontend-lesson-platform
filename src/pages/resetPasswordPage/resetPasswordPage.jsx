import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/button/Button.jsx";

function ResetPasswordPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const query = new URLSearchParams(useLocation().search);
    const token = query.get("token");

    const onSubmit = async (data) => {
        setMessage("");
        setError("");
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/reset-password`, {
                token,
                newPassword: data.password,
            });
            setMessage("Je wachtwoord is succesvol gewijzigd. Je kunt nu inloggen.");
            setTimeout(() => navigate("/login"), 2500);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError("De resetlink is ongeldig of verlopen.");
            } else {
                setError("Er is iets misgegaan. Probeer het later opnieuw.");
            }
        }
    };

    return (
        <section className="centerContainer">
            <h2>Nieuw wachtwoord instellen</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="password">
                        Nieuw wachtwoord:
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: "Wachtwoord is verplicht" })}
                            className={errors.password ? "inputError" : ""}
                        />
                    </label>
                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}

                    {error && <p className="errorMessage">{error}</p>}
                    {message && <p className="successMessage">{message}</p>}

                    <Button type="submit">Wachtwoord wijzigen</Button>
                </fieldset>
            </form>
        </section>
    );
}

export default ResetPasswordPage;
