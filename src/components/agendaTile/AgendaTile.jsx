import { useEffect } from 'react';
import useApiRequest from "../../hooks/useApiRequest.js";
import {formatToDayMonth} from "../../helpers/formatDate.js";

const AgendaTile = () => {
    const { data, loading, error, executeRequest } = useApiRequest();

    useEffect(() => {
        void executeRequest('get', `${import.meta.env.VITE_API_URL}/lessons`);
    }, []);

    const lessons = Array.isArray(data) ? data : [];

    return (
        <section>
            <h3>Agenda</h3>
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
                        <li>Geen lessen beschikbaar</li>
                    )}
                </ul>
            )}
        </section>
    );
};

export default AgendaTile;
