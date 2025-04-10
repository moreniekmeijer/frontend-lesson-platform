import { useEffect, useState } from "react";
import axios from "axios";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import SearchTile from "../../components/searchTile/SearchTile.jsx";
import styles from "./HomePage.module.css";
import "../../App.css";

function HomePage() {
    const [lesson, setLesson] = useState(null);
    const [lessonStyles, setLessonStyles] = useState([]);
    const [arrangementMaterials, setArrangementMaterials] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchLessonData() {
            try {
                const lessonResponse = await axios.get(`${import.meta.env.VITE_API_URL}/lessons/next`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const lessonData = lessonResponse.data;
                setLesson(lessonData);

                // Style data ophalen
                const styleIds = lessonData.styleIds || [];
                const styleRequests = styleIds.map(id =>
                    axios.get(`${import.meta.env.VITE_API_URL}/styles/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                );
                const styleResponses = await Promise.all(styleRequests);
                const stylesData = styleResponses.map(res => res.data);
                setLessonStyles(stylesData);

                // Arrangementmateriaal uit styles extraheren
                const arrangements = stylesData
                    .map(style => style.materials.find(m => m.id === style.arrangementId))
                    .filter(Boolean);

                setArrangementMaterials(arrangements);

            } catch (error) {
                console.error("Fout bij ophalen lesgegevens:", error);
            }
        }

        fetchLessonData();
    }, [token]);

    return (
        <>
            <div className="upperContainer">
                <div className="leftItems">
                    <MoreItemsTile title="Arrangementen" items={arrangementMaterials} />
                </div>

                <div>
                    <section className={styles.notes}>
                        <h3>Notities</h3>
                        <p>{lesson?.notes || "Geen notities"}</p>
                    </section>

                    <section className={styles.agenda}>
                        <h3>Agenda</h3>
                        <ul>
                            <li>{lesson?.scheduledDateTime || "Geen datum beschikbaar"}</li>
                        </ul>
                    </section>

                    <section className={styles.styles}>
                        <h3>Stijlen in deze les</h3>
                        <ul>
                            {lessonStyles.map((style) => (
                                <li key={style.id}>{style.name}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>

            <div className="lowerContainer">
                <div className="leftItems">
                    {lessonStyles.map((style, index) => {
                        const videoMaterials = style.materials.filter(m => m.fileType === "VIDEO");
                        if (videoMaterials.length === 0) return null;

                        return (
                            <MoreItemsTile
                                key={style.id}
                                title={`Video's ${style.name || `Stijl ${index + 1}`}`}
                                items={videoMaterials}
                                variant="secondary"
                            />
                        );
                    })}
                </div>
                <SearchTile />
            </div>
        </>
    );
}

export default HomePage;
