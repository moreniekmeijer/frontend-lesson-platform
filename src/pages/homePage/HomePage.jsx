import {useEffect, useState} from "react";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import SearchTile from "../../components/searchTile/SearchTile.jsx";
import "../../App.css";
import AgendaTile from "../../components/agendaTile/AgendaTile.jsx";
import NotesTile from "../../components/notesTile/NotesTile.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";

function HomePage() {
    const [lesson, setLesson] = useState(null);
    const [lessonStyles, setLessonStyles] = useState([]);
    const [arrangementMaterials, setArrangementMaterials] = useState([]);

    const { executeRequest } = useApiRequest();

    useEffect(() => {
        async function fetchLessonData() {
            try {
                const lessonResponse = await executeRequest("get", `${import.meta.env.VITE_API_URL}/lessons/next`);
                const lessonData = lessonResponse?.data;

                if (!lessonData) return;

                setLesson(lessonData);

                const styleIds = lessonData.styleIds || [];
                const stylePromises = styleIds.map(id =>
                    executeRequest("get", `${import.meta.env.VITE_API_URL}/styles/${id}`)
                );

                const styleResponses = await Promise.all(stylePromises);
                const stylesData = styleResponses.map(res => res?.data).filter(Boolean);
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
    }, []);

    return (
        <>
            <div className="leftContainer">
                {!lesson ? <h2>Geen lessen gepland.</h2> : (
                    <>
                        {arrangementMaterials.length > 0 ? (
                            <MoreItemsTile title="Voor volgende les: " items={arrangementMaterials}/>
                        ) : (
                            <h3>Geen specifiek arrangement voor volgende les!</h3>
                        )}
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
                    </>)
                }
            </div>

            <div className="rightContainer">
                    <div className="upperItems">
                        {lesson && <NotesTile
                            title={lessonStyles.length > 0 && "Stijlen volgende les:"}
                            items={lessonStyles}
                            notes={lesson?.notes || ""}
                        />}
                        <AgendaTile/>
                    </div>
                <SearchTile/>
            </div>
        </>
    );
}

export default HomePage;
