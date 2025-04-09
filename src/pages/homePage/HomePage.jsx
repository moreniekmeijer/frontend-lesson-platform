import {useEffect, useState} from "react";
import axios from "axios";
import MoreItemsTile from "../../components/moreVideosTile/MoreItemsTile.jsx";
import styles from "./HomePage.module.css"
import SearchTile from "../../components/searchTile/SearchTile.jsx";
import "../../App.css"

function HomePage() {
    const [lesson, setLesson] = useState([]);
    const [lessonStyles, setLessonStyles] = useState({});
    const token = localStorage.getItem("token");

    const videoExamples = [
        {fileType: "VIDEO", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s"},
        {fileType: "VIDEO", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s"},
        {fileType: "VIDEO", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s"},
        {fileType: "VIDEO", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s"},
        {fileType: "VIDEO", url: "https://www.youtube.com/watch?v=abc123"}
    ];

    // TODO - change backend en make second GET for styles (from ID)
    async function getLessonData() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/lessons/next`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
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
            <div className="upperContainer">
                <div className="leftItems">
                    <MoreItemsTile title="Volgende les" items={videoExamples}/>
                </div>
                <div>
                    {/*TODO - own item?*/}
                    <section className={styles.notes}>
                        <h3>Notities</h3>
                        <p>{lesson.notes}</p>
                    </section>
                    <section className={styles.agenda}>
                        <h3>Agenda</h3>
                        {/*TODO - make own item with helperfile to extract readable date*/}
                        <ul>
                            <li>wordt denk ik eigen component</li>
                            <li>of {lesson.scheduledDateTime}</li>
                            <li>01-01-2025</li>
                        </ul>
                    </section>
                </div>
            </div>
            <div className="lowerContainer">
                <div className="leftItems">
                    <MoreItemsTile title="Nieuw toegevoegd" items={videoExamples} variant="secondary"/>
                    <MoreItemsTile title="Videos volgende les" items={videoExamples} variant="secondary"/>
                </div>
                <SearchTile/>
            </div>
        </>
    )
}

export default HomePage;