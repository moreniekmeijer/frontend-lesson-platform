import { useContext, useEffect, useState } from "react";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import SearchTile from "../../components/searchTile/SearchTile.jsx";
import "../../App.css";
import AgendaTile from "../../components/agendaTile/AgendaTile.jsx";
import NotesTile from "../../components/notesTile/NotesTile.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { formatRoles } from "../../helpers/formatRole.js";
import ArrangementsTile from "../../components/arrangementsTile/ArrangementsTile.jsx";

function HomePage() {
    const [lessons, setLessons] = useState([]);
    const [lessonStyles, setLessonStyles] = useState([]);
    const [arrangementStyles, setArrangementStyles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const { executeRequest } = useApiRequest();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user.roles?.includes("ROLE_GUEST") && !user.roles?.includes("ROLE_ADMIN")) {
            setErrorMessage("Gasten hebben geen toegang tot lessen.");
            setLoading(false);
            return;
        }

        async function fetchLessonsData() {
            setLoading(true);
            setErrorMessage("");

            try {
                const response = await executeRequest("get", `${import.meta.env.VITE_API_URL}/lessons/next`);
                const lessonsData = response?.data;

                if (!Array.isArray(lessonsData) || lessonsData.length === 0) {
                    setErrorMessage("Geen lessen gepland voor jouw groep(en).");
                    return;
                }

                setLessons(lessonsData);

                const allStyleIds = [
                    ...new Set(lessonsData.flatMap(lesson => lesson.styleIds || []))
                ];

                const styleResponses = await Promise.all(
                    allStyleIds.map(id => executeRequest("get", `${import.meta.env.VITE_API_URL}/styles/${id}`))
                );

                const stylesData = styleResponses.map(res => res?.data).filter(Boolean);
                setLessonStyles(stylesData);

                const arrangementStyles = stylesData.filter(
                    style => style.arrangement && style.arrangement !== "<p></p>"
                );

                setArrangementStyles(arrangementStyles);

            } catch (error) {
                console.error("Fout bij ophalen lesgegevens:", error);
                const msg =
                    error.response?.data?.error ||
                    (error.response?.status === 404
                        ? "Geen lessen beschikbaar voor jouw groep(en)."
                        : error.response?.status === 403
                            ? "Je hebt geen toegang tot lessen."
                            : "Er is een fout opgetreden bij het ophalen van de lessen.");
                setErrorMessage(msg);
            } finally {
                setLoading(false);
            }
        }

        void fetchLessonsData();
    }, []);

    if (loading) return <p className="centerContainer">Laden...</p>;

    const lessonNotes = [
        ...new Set(
            lessons
                .filter(lesson =>
                    lesson.allowedRoles.length > 0 &&
                    lesson.notes?.trim()
                )
                .map(lesson => {
                    const groupLabel = formatRoles(lesson.allowedRoles);
                    return `${groupLabel}: ${lesson.notes}`;
                })
        )
    ];

    return (
        <>
            <div className="leftContainer">
                {errorMessage ? (
                    <h2>{errorMessage}</h2>
                ) : lessons.length === 0 ? (
                    <h2>Geen lessen gepland.</h2>
                ) : (
                    <>
                        {/*<ArrangementsTile items={arrangementStyles}/>*/}
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
                    </>
                )}
            </div>

            <div className="rightContainer">
                <div className="upperItems">
                    {lessonNotes.length > 0 && (
                        <NotesTile
                            title="Stijlen volgende les:"
                            items={lessonStyles}
                            notes={lessonNotes}
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
