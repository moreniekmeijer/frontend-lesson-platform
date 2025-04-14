import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";
import axios from "axios";

function LoginPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/authenticate`, data)
            login(response.data.jwt);
            navigate('/');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setLoginError("Ongeldige gebruikersnaam of wachtwoord.");
                } else {
                    setLoginError("Er is iets misgegaan. Probeer het later opnieuw.");
                }
            } else {
                setLoginError("Server niet bereikbaar.");
            }
            console.error(error);
        }
    };

    return (
        <section className="centerContainer">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="username">
                        Gebruikersnaam:
                        <input
                            type="text"
                            id="username"
                            className={errors.username ? "inputError" : ""}
                            {...register("username", {required: "Gebruikersnaam is verplicht"})}
                        />
                    </label>
                    {errors.username && <p className="errorMessage">{errors.username.message}</p>}

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

                    {loginError && <p className="errorMessage">{loginError}</p>}
                    <Button type="submit">Inloggen</Button>

                    <p>Nieuw? registreer je <NavLink to="/registreren">hier</NavLink></p>
                </fieldset>
            </form>
        </section>
    );
}

export default LoginPage;
