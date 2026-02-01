import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function RegisterPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const [invalidInput, setInvalidInput] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/register`,
                data,
                { withCredentials: true }
            );
            login(response.data.jwt);
            // navigate('/');
        } catch (error) {
            if (error.response.status === 409) {
                setInvalidInput("Registratiecode is incorrect");
            }
            if (error.response.status === 400) {
                setInvalidInput("Email is al in gebruik")
            }
        }
        setLoading(false);
    };

    return (
        <section className="centerContainer">
            <h2>Registreren</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="fullName">
                        Voor- en achternaam:
                        <input
                            type="text"
                            id="fullName"
                            className={errors.fullName ? "inputError" : ""}
                            {...register("fullName", {required: "Naam is verplicht"})}
                        />
                    </label>
                    {errors.fullName && <p className="errorMessage">{errors.fullName.message}</p>}

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
                            {...register("password", {
                                required: "Wachtwoord is verplicht",
                                minLength: {
                                    value: 8,
                                    message: "Wachtwoord moet minimaal 8 tekens bevatten"
                                }
                            })}
                        />
                    </label>
                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}

                    <label htmlFor="inviteCode">
                        Registratiecode:
                        <input
                            type="text"
                            id="inviteCode"
                            className={errors.inviteCode ? "inputError" : ""}
                            {...register("inviteCode", {required: "Registratiecode is verplicht"})}
                        />
                    </label>
                    {errors.inviteCode && <p className="errorMessage">{errors.inviteCode.message}</p>}
                    {invalidInput && <p className="errorMessage">{invalidInput}</p>}

                    <Button type="submit">Registreren</Button>
                    {loading && <p className="centerContainer">Bezig met registreren...</p>}

                    <p>Al een account? Log <NavLink to="/inloggen">hier</NavLink> in</p>
                </fieldset>
            </form>
        </section>
    );
}

export default RegisterPage;
