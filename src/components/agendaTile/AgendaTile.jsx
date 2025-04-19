import {useContext, useEffect} from 'react';
import useApiRequest from "../../hooks/useApiRequest.js";
import {formatToDayMonth} from "../../helpers/formatDate.js";
import styles from "./AgendaTile.module.css";
import Button from "../button/Button.jsx";
import {Controller, useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext.jsx";

const AgendaTile = () => {
    const {user} = useContext(AuthContext);
    const { data, loading, error, executeRequest } = useApiRequest();
    const { control, handleSubmit, reset } = useForm();

    useEffect(() => {
        void executeRequest('get', `${import.meta.env.VITE_API_URL}/lessons`);
    }, []);

    const onDelete = async ({ styleId }) => {
        if (!styleId) return;
        try {
            await executeRequest('delete', `${import.meta.env.VITE_API_URL}/lessons/${styleId}`);
            reset(); // reset form
            void executeRequest('get', `${import.meta.env.VITE_API_URL}/lessons`); // herladen
        } catch (error) {
            console.error("Fout bij verwijderen:", error);
        }
    };

    const lessons = Array.isArray(data) ? data : [];

    return (
        <section className={styles.agenda}>
            <h3>Lesdata</h3>
            {loading && <p>Bezig met laden...</p>}
            {error && <p>Fout bij ophalen van lessen: {error}</p>}
            {!loading && !error && (
                <ul>
                    {lessons.length > 0 ? (
                        lessons.map((lesson, index) => (
                            <li key={index}>
                                {formatToDayMonth(lesson.scheduledDateTime) || 'Geen datum beschikbaar'}
                            </li>
                        ))
                    ) : (
                        <li>Geen lesson op de agenda!</li>
                    )}
                </ul>
            )}

            {lessons.length > 0 && user?.role === 'admin' && (
                <form onSubmit={handleSubmit(onDelete)} className={styles.deleteContainer}>
                    <Controller
                        name="styleId"
                        control={control}
                        rules={{ required: "Selecteer een les om te verwijderen" }}
                        render={({ field }) => (
                            <select {...field}>
                                <option value="">-- Kies --</option>
                                {lessons.map((lesson) => (
                                    <option key={lesson.id} value={lesson.id}>
                                        {lesson.name || formatToDayMonth(lesson.scheduledDateTime)}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    <Button type="submit" variant="danger">
                        Verwijder les
                    </Button>
                </form>
            )}
        </section>
    );
};

export default AgendaTile;
