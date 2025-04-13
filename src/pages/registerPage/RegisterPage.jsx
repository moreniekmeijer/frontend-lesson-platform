import {useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function RegisterPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [invalidInviteCode, setInvalidInviteCode] = useState(null);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, data);
            console.log("Gebruiker geregistreerd:", response.data);
            login(response.data.jwt);
            navigate('/');

        } catch (error) {
            console.error("Registratie mislukt:", error);

            if (error.response.status === 409) {
                setInvalidInviteCode("Registratiecode is incorrect");
            }
        }
    };

    return (
        <>
            <h2>Registreren</h2>
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

                    <label htmlFor="email">
                        E-mailadres (optioneel):
                        <input
                            type="email"
                            id="email"
                            className={errors.email ? "inputError" : ""}
                            {...register("email", {
                                required: false,
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
                                    value: 6,
                                    message: "Wachtwoord moet minimaal 6 tekens bevatten"
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
                    {invalidInviteCode && <p className="errorMessage">{invalidInviteCode}</p>}

                    <Button type="submit">Registreren</Button>

                    <p>Al een account? Log <NavLink to="/login">hier</NavLink> in</p>
                </fieldset>
            </form>
        </>
    );
}

export default RegisterPage;
