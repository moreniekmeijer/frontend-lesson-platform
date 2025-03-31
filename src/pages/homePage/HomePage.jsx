import {useEffect, useState} from "react";
import axios from "axios";
import MoreItemsTile from "../../components/moreVideosTile/MoreItemsTile.jsx";
import styles from "./HomePage.module.css"
import SearchTile from "../../components/searchTile/SearchTile.jsx";

function HomePage() {
    const [lesson, setLesson] = useState([]);
    const [lessonStyles, setLessonStyles] = useState({});

    const videoExamples = [
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=abc123" }
    ];

    async function getLessonData() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/lessons/next`);
            setLesson(response.data);
            setLessonStyles(response.data.styles);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        void getLessonData();
    }, []);

    return (
        <>
            <section className={styles.lessons}>
                <MoreItemsTile title="Volgende les" items={videoExamples} />
                <section className={styles.notes}>
                    <h3>Notities</h3>
                    <p>{lesson.notes}</p>
                </section>
                <section className={styles.agenda}>
                    <h3>Agenda</h3>
                    <ul>
                        <li>wordt denk ik eigen component</li>
                        <li>of {lesson.scheduledDateTime}</li>
                        <li>01-01-2025</li>
                    </ul>
                </section>
            </section>
            <MoreItemsTile title="Nieuw toegevoegd" items={videoExamples}/>
            <MoreItemsTile title="Videos volgende les" items={videoExamples}/>
            <SearchTile/>
        </>
    )
}

export default HomePage;