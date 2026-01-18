import {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import styles from "./MaterialPage.module.css";
import getYouTubeVideoId from "../../helpers/getYouTubeVideoId.js";
import Button from "../../components/button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";
import BookmarkToggle from "../../components/bookmarkToggle/BookmarkToggle.jsx";

function MaterialPage() {
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [material, setMaterial] = useState(null);
    const [relatedItems, setRelatedItems] = useState([]);
    const {executeRequest} = useApiRequest();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMaterialAndRelated = async () => {
            try {
                const materialResponse = await executeRequest(
                    'get',
                    `${import.meta.env.VITE_API_URL}/materials/${id}`
                );
                const materialData = materialResponse?.data;
                if (!materialData) return;
                setMaterial(materialData);

                const relatedResponse = await executeRequest(
                    'get',
                    `${import.meta.env.VITE_API_URL}/materials`,
                    null,
                    { styleName: materialData.styleName }
                );

                const relatedMaterial = (relatedResponse?.data || []).filter(m => m.id !== materialData.id);
                setRelatedItems(relatedMaterial);
            } catch (error) {
                console.error("Fout bij het ophalen van materiaal en gerelateerde items:", error);
            }
        };

        void fetchMaterialAndRelated();
    }, [id]);

    async function handleDelete() {
        try {
            await executeRequest('delete', `${import.meta.env.VITE_API_URL}/materials/${id}`);
            navigate("/zoeken");
        } catch (error) {
            console.error("Fout bij verwijderen:", error);
        }
    }

    if (!material) return <p>Loading...</p>;

    return (
        <>
            <section className="leftContainer">
                <h2>{material.title}</h2>

                {material.fileType === "VIDEO" && (
                    <video key={material.id} width="600" height="400" controls>
                        <source src={material.fileLink} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                )}

                {material.fileType === "PDF" && material.fileLink && (
                    <iframe src={material.fileLink}
                            frameBorder="0"
                    />
                )}

                {material.fileType === "IMAGE" && (
                    <img
                        src={material.fileLink}
                        alt={material.title}
                        width="600"
                        height="400"
                    />
                )}

                {material.fileType === "LINK" && material.fileLink && (
                    material.fileLink.includes("youtube.com") || material.fileLink.includes("youtu.be") ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(material.fileLink)}`}
                            width="600"
                            height="400"
                            frameBorder="0"
                            allowFullScreen
                            title="YouTube video"
                        />
                    ) : (
                        <a href={material.fileLink} target="_blank" rel="noreferrer">
                            <iframe
                                src={material.fileLink}
                                width="600"
                                height="400"
                                frameBorder="0"
                            />
                        </a>
                    )
                )}
            </section>

            <section className="rightContainer">
                {(material.fileType === "VIDEO" || material.fileType === "PDF" || material.fileType === "IMAGE") && (
                    <span className={styles.buttonContainer}>
                    <a href={material.fileLink} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary">Open in een nieuw tabblad</Button>
                    </a>
                    <a href={`${material.fileLink}?action=download`}>
                        <Button variant="secondary">Download {material.title}</Button>
                    </a>
                    </span>
                )}
                {user && material && (
                    <BookmarkToggle user={user} materialId={material.id} />
                )}

                <section>
                    <h3>{material.styleName}</h3>
                    <p><strong>Categorie:</strong> {material.category}</p>
                    <p><strong>Instrument:</strong> {material.instrument}</p>
                    <p><strong>Herkomst:</strong> {material.origin}</p>
                </section>
                {relatedItems.length > 0 && (
                    <MoreItemsTile title="Gerelateerd" items={relatedItems} variant="secondary"/>
                )}
                {user?.roles.includes("ROLE_ADMIN") && (
                    <span className={styles.buttonContainer}>
                        <Button variant="danger" onClick={handleDelete}>
                            Verwijder {material.title}
                        </Button>
                        <Link to="/toevoegen/materiaal">
                            <Button variant="simple" >Materiaal toevoegen?</Button>
                        </Link>
                    </span>
                )}
            </section>
        </>
    );
}

export default MaterialPage;
