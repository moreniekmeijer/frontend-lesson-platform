import {useEffect, useState} from "react";
import axios from "axios";
import MoreItemsTile from "../../components/moreVideosTile/MoreItemsTile.jsx";

function HomePage() {
    const [lesson, setLesson] = useState([]);
    const [lessonStyles, setLessonStyles] = useState({});

    async function getLessonData() {
        try {
            const response = await axios.get("http://localhost:8000/lessons/next");
            setLesson(response.data);
            setLessonStyles(response.data.styles);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        void getLessonData();
    })

    return (
        <>
            <section className="lessons">
            <MoreItemsTile>props met lessonStyles</MoreItemsTile>
                <section className="notes">
                    <h2>Notities</h2>
                    <p>{lesson.notes}</p>
                </section>
                <section className="agenda">
                    <h2>Agenda</h2>
                    <ul>
                        <li>wordt denk ik eigen component</li>
                        <li>of {lesson.scheduledDateTime}</li>
                        <li>01-01-2025</li>
                    </ul>
                </section>

            </section>
            <MoreItemsTile/>
            <MoreItemsTile/>
            <section>
                zoekveld (Misschien ook subregions categorie via countries API?)
            </section>

        </>
    )
}

export default HomePage;