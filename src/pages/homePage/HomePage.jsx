import {useContext, useEffect, useState} from "react";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import SearchTile from "../../components/searchTile/SearchTile.jsx";
import "../../App.css";
import AgendaTile from "../../components/agendaTile/AgendaTile.jsx";
import NotesTile from "../../components/notesTile/NotesTile.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import {AuthContext} from "../../context/AuthContext.jsx";

function HomePage() {
    const [lesson, setLesson] = useState(null);
    const [lessonStyles, setLessonStyles] = useState([]);
    const [arrangementMaterials, setArrangementMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const { executeRequest } = useApiRequest();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user.roles.includes("ROLE_GUEST")) {
            setErrorMessage("Gasten hebben geen toegang tot lessen.");
            setLoading(false);
            return;
        }

        async function fetchLessonData() {
            setLoading(true);
            setErrorMessage("");

            try {
                const lessonResponse = await executeRequest("get", `${import.meta.env.VITE_API_URL}/lessons/next`);
                const lessonData = lessonResponse?.data;

                if (!lessonData) {
                    setErrorMessage("Geen lessen gepland voor jouw groep.");
                    setLesson(null);
                    return;
                }

                setLesson(lessonData);

                const styleIds = lessonData.styleIds || [];
                if (styleIds.length === 0) {
                    setLessonStyles([]);
                    setArrangementMaterials([]);
                    return;
                }

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
                if (error.response?.status === 404) {
                    setErrorMessage("Geen lessen beschikbaar voor jouw groep.");
                } else if (error.response?.status === 403) {
                    setErrorMessage("Je hebt geen toegang tot lessen.");
                } else {
                    setErrorMessage("Er is een fout opgetreden bij het ophalen van de les.");
                }
                setLesson(null);
            } finally {
                setLoading(false);
            }
        }

        void fetchLessonData();
    }, []);

    if (loading) return <p>Laden...</p>;

    return (
        <>
            <div className="leftContainer">
                {errorMessage ? (
                    <h2>{errorMessage}</h2>
                ) : !lesson ? (
                    <h2>Geen lessen gepland.</h2>
                ) : (
                    <>
                        {arrangementMaterials.length > 0 ? (
                            <MoreItemsTile title="Voor volgende les:" items={arrangementMaterials}/>
                        ) : (
                            <h3>Geen specifiek arrangement voor volgende les!</h3>
                        )}

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
                    </>
                )}
            </div>

            <div className="rightContainer">
                <div className="upperItems">
                    {lesson && (
                        <NotesTile
                            title={lessonStyles.length > 0 && "Stijlen volgende les:"}
                            items={lessonStyles}
                            notes={lesson?.notes || ""}
                        />
                    )}
                    <AgendaTile/>
                </div>
                <SearchTile/>
            </div>
        </>
    );
}

export default HomePage;
