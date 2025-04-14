import {useEffect, useState} from "react";
import axios from "axios";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import SearchTile from "../../components/searchTile/SearchTile.jsx";
import styles from "./HomePage.module.css";
import "../../App.css";
import AgendaTile from "../../components/agendaTile/AgendaTile.jsx";
import NotesTile from "../../components/notesTile/NotesTile.jsx";

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

                const arrangements = stylesData
                    .map(style => style.materials.find(m => m.id === style.arrangementId))
                    .filter(Boolean);

                setArrangementMaterials(arrangements);

            } catch (error) {
                console.error("Fout bij ophalen lesgegevens:", error);
            }
        }

        void fetchLessonData();
    }, [token]);

    return (
        <>
            <div className="leftContainer">
                <div className="upperItems">
                    <MoreItemsTile title="Voor volgende les: " items={arrangementMaterials}/>
                </div>
                <div>
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
            </div>

            <div className="rightContainer">
                <div className="upperItems">
                    <NotesTile
                        items={lessonStyles}
                        notes={lesson?.notes || ""}
                    />
                    <AgendaTile/>
                </div>
                <SearchTile/>
            </div>
        </>
    );
}

export default HomePage;
