import {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import axios from "axios";
import styles from "./MaterialPage.module.css";
import getYouTubeVideoId from "../../helpers/getYouTubeVideoId.js";
import Button from "../../components/button/Button.jsx";
import StyleTile from "../../components/styleTile/StyleTile.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";

function MaterialPage() {
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [material, setMaterial] = useState(null);
    const [relatedItems, setRelatedItems] = useState([]);
    const token = localStorage.getItem("token");
    const {executeRequest} = useApiRequest();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMaterialAndRelated = async () => {
            try {
                const materialResponse = await axios.get(`${import.meta.env.VITE_API_URL}/materials/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const materialData = materialResponse.data;
                setMaterial(materialData);

                const relatedResponse = await axios.get(`${import.meta.env.VITE_API_URL}/materials?styleName=${materialData.styleName}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const relatedMaterial = relatedResponse.data.filter(m => m.id !== materialData.id);
                setRelatedItems(relatedMaterial);
            } catch (err) {
                console.error("Error fetching material + related:", err);
            }
        };

        void fetchMaterialAndRelated();
    }, [id]);

    async function handleDelete() {
        try {
            await executeRequest('delete', `${import.meta.env.VITE_API_URL}/materials/${id}`);
            navigate("/materiaal"); // Of waar je ook naartoe wilt
        } catch (error) {
            console.error("Fout bij verwijderen:", error);
        }
    }

    if (!material) return <p>Loading...</p>;

    return (
        <>
            <section className="leftContainer">
                <h2>{material.title}</h2>

                {/* Bestandstype weergeven */}
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
                        alt="Afbeelding"
                        width="600"
                        height="400"
                    />
                )}

                {material.fileType === "LINK" && material.fileLink && (
                    // TODO - backend geeft nu fileLink, die moet je aanspreken
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
                        <a href={material.filePath} target="_blank" rel="noreferrer">
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

                {/*TODO - misschien StyleTile nog implementeren hier*/}
                <StyleTile/>
                <section>
                    <h3>{material.styleName}</h3>
                    <p><strong>Categorie:</strong> {material.category}</p>
                    <p><strong>Instrument:</strong> {material.instrument}</p>
                    <p><strong>Herkomst:</strong> {material.origin}</p>
                </section>
                {user?.role === 'admin' && (
                    <span className={styles.buttonContainer}>
                        <Button variant="danger" onClick={handleDelete}>
                            Verwijder {material.title}
                        </Button>
                        <Link to="/toevoegen/materiaal">
                            <Button variant="simple" >Materiaal toevoegen?</Button>
                        </Link>
                    </span>
                )}
                <MoreItemsTile title="Gerelateerd" items={relatedItems} variant="secondary"/>
            </section>
        </>
    );
}

export default MaterialPage;
