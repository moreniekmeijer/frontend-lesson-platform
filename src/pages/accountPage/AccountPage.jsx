import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import styles from "./AccountPage.module.css";

function AccountPage() {
    const { user, logout } = useContext(AuthContext); // Zorg dat je context de username bevat
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors, isDirty } } = useForm();
    const newPassword = watch("password");

    useEffect(() => {
        if (user) {
            reset({
                username: user.username,
                email: user.email,
                password: "", // leeg veld voor eventueel nieuw wachtwoord
            });
            setLoading(false);
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        try {
            if (!data.password) {
                delete data.password;
            }

            await axios.put(`${import.meta.env.VITE_API_URL}/users/${user.username}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Gegevens succesvol bijgewerkt!");

        } catch (err) {
            console.error(err);
            setError("Bijwerken mislukt.");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/users/${user.username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            logout();

        } catch (err) {
            console.error(err);
            setError("Account verwijderen mislukt.");
        }
    };

    if (loading) return <p>Gegevens laden...</p>;

    return (
        <section className="leftContainer">
            <h2>Mijn Account</h2>
            {error && <p className="errorMessage">{error}</p>}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <legend><h4>Gegevens bijwerken</h4></legend>
                <fieldset>
                    <label htmlFor="username">
                        Gebruikersnaam:
                        <input
                            type="text"
                            id="username"
                            disabled
                            {...register("username")}
                        />
                    </label>

                    <label htmlFor="email">
                        E-mailadres:
                        <input
                            type="email"
                            id="email"
                            className={errors.email ? "inputError" : ""}
                            {...register("email", {
                                required: "E-mail is verplicht",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Ongeldig e-mailadres"
                                }
                            })}
                        />
                    </label>
                    {errors.email && <p className="errorMessage">{errors.email.message}</p>}

                    <label htmlFor="currentPassword">
                        Huidig wachtwoord:
                        <input
                            type="password"
                            id="currentPassword"
                            {...register("currentPassword", {
                                validate: value => {
                                    if (newPassword && !value) {
                                        return "Vul je huidige wachtwoord in om het te wijzigen";
                                    }
                                    return true;
                                }
                            })}
                        />
                    </label>
                    {errors.currentPassword && <p className="errorMessage">{errors.currentPassword.message}</p>}

                    <label htmlFor="password">
                        Nieuw wachtwoord:
                        <input
                            type="password"
                            id="password"
                            placeholder="Laat leeg om niet te wijzigen"
                            {...register("password")}
                        />
                    </label>

                    <Button type="submit" disabled={!isDirty}>Opslaan</Button>
                </fieldset>
            </form>

            <section className={styles.deleteContainer}>
                <legend><h4>Account verwijderen</h4></legend>
                {!confirmDelete ? (
                    <>
                        <p><i>Let op: dit kan niet ongedaan worden gemaakt!</i></p>
                        <Button
                            type="button"
                            onClick={() => setConfirmDelete(true)}
                            variant="danger"
                        >
                            Verwijder mijn account
                        </Button>
                    </>
                ) : (
                    <div>
                        <p><i>Weet je zeker dat je je account wilt verwijderen?</i></p>
                        <div>
                            <Button type="button" onClick={handleDeleteAccount} variant="danger">
                                Ja, verwijder
                            </Button>
                            <Button type="button" onClick={() => setConfirmDelete(false)} variant="secondary">
                                Nee, annuleren
                            </Button>
                        </div>
                    </div>
                )}
            </section>
        </section>
    );
}

export default AccountPage;
