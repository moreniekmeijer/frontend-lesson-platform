import {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import StyleTile from "../../components/styleTile/StyleTile.jsx";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import CountryTile from "../../components/countryTile/CountryTile.jsx";
import styles from "./StylePage.module.css";
import useApiRequest from "../../hooks/useApiRequest.js";
import Button from "../../components/button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import ArrangementEditor from "../../components/arrangementEditor/ArrangementEditor.jsx";

function StylePage() {
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [arrangement, setArrangement] = useState("");
    const isAdmin = user?.roles.includes("ROLE_ADMIN");

    const {
        data: styleData,
        loading,
        executeRequest: fetchStyle,
    } = useApiRequest();

    const {
        executeRequest: saveArrangementRequest
    } = useApiRequest();

    const {
        executeRequest: deleteArrangementRequest
    } = useApiRequest();

    useEffect(() => {
        if (!id) return;
        void fetchStyle('get', `${import.meta.env.VITE_API_URL}/styles/${id}`);
    }, [id]);

    async function handleDelete() {
        try {
            await deleteArrangementRequest('delete', `${import.meta.env.VITE_API_URL}/styles/${id}`);
            navigate("/");
        } catch (error) {
            console.error("Fout bij verwijderen:", error);
        }
    }

    async function handleSaveArrangement() {
        try {
            await saveArrangementRequest(
                "put",
                `${import.meta.env.VITE_API_URL}/styles/${id}/arrangement`,
                { arrangement }
            );

            await fetchStyle('get', `${import.meta.env.VITE_API_URL}/styles/${id}`);

        } catch (error) {
            console.error("Opslaan arrangement mislukt:", error);
        }
    }

    if (loading) return <p className="centerContainer">Laden...</p>;
    if (!styleData) return <p className="centerContainer">Geen data gevonden.</p>;

    const videos = styleData.materials || [];
    console.log(styleData.arrangement);

    return (
        <>
            <div className="leftContainer">
                <h2>{styleData.name}</h2>
                {isAdmin ? (
                    <>
                        <div className={styles.arrangementContainer}>
                            <ArrangementEditor
                                content={styleData.arrangement || ""}
                                onChange={setArrangement}
                                editable={true}
                            />
                            <Button variant="secondary" onClick={handleSaveArrangement}>
                                Opslaan arrangement
                            </Button>
                        </div>
                    </>
                ) : (
                    !styleData.arrangement || styleData.arrangement === "<p></p>" ? (
                        <p>Nog geen arrangement beschikbaar.</p>
                    ) : (
                        <div
                            className="arrangementViewer"
                            dangerouslySetInnerHTML={{__html: styleData.arrangement}}
                        />
                    )
                )}
                <MoreItemsTile variant="secondary" title="Video's" items={videos}/>
            </div>
            <div className="rightContainer">
                <CountryTile countryName={styleData?.origin || "Onbekend"}/>
                <StyleTile data={styleData}/>
                {user?.roles.includes("ROLE_ADMIN") && (
                    <span className={styles.buttonContainer}>
                        <Button variant="danger" onClick={handleDelete}>
                        Verwijder stijl
                        </Button>
                        <Link to="/toevoegen/stijl">
                            <Button variant="simple">Stijl toevoegen?</Button>
                        </Link>
                    </span>
                )}
            </div>
        </>
    );
}

export default StylePage;
