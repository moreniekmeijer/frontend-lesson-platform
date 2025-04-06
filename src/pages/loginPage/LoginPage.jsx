import {useForm} from "react-hook-form";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";
import axios from "axios";

function LoginPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/authenticate`, data)
            console.log(response);
            login(response.data.jwt);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
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
