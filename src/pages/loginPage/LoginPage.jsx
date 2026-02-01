import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";
import axios from "axios";

function LoginPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/authenticate`, data,{ withCredentials: true })
            login(response.data.jwt);
            // navigate('/');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setLoginError("Ongeldig e-mailadres of wachtwoord.");
                } else {
                    setLoginError("Er is iets misgegaan. Probeer het later opnieuw.");
                }
            } else {
                setLoginError("Server niet bereikbaar.");
            }
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <section className="centerContainer">
            <h2>Inloggen</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="email">
                        E-mailadres:
                        <input
                            type="email"
                            id="email"
                            className={errors.email ? "inputError" : ""}
                            {...register("email", {
                                required: "E-mailadres is verplicht",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Ongeldig e-mailadres"
                                }
                            })}
                        />
                    </label>
                    {errors.email && <p className="errorMessage">{errors.email.message}</p>}

                    <label htmlFor="password">
                        Wachtwoord:
                        <input
                            type="password"
                            id="password"
                            className={errors.password ? "inputError" : ""}
                            {...register("password", {required: "Wachtwoord is verplicht"})}
                        />
                    </label>
                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}

                    <p>Wachtwoord vergeten? <NavLink to="/forgot-password">Klik hier</NavLink></p>

                    {loginError && <p className="errorMessage">{loginError}</p>}
                    <Button type="submit">Inloggen</Button>
                    {loading && <p>Bezig met inloggen...</p>}

                    <p>Nieuw? Registreer je <NavLink to="/registreren">hier</NavLink></p>
                </fieldset>
            </form>
        </section>
    );
}

export default LoginPage;
