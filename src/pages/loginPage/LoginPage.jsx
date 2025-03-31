import {useForm} from "react-hook-form";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";

function LoginPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        login(data.username);
        navigate("/");
    };

    return (
        <>
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

                    <label htmlFor="email">
                        E-mail (optioneel):
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                        />
                    </label>

                    <Button type="submit">Inloggen</Button>
                </fieldset>
            </form>
        </>
    );
}

export default LoginPage;
