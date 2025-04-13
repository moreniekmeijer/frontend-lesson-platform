import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import axios from "axios";
import styles from "./MaterialPage.module.css";
import getYouTubeVideoId from "../../helpers/getYouTubeVideoId.js";
import Button from "../../components/button/Button.jsx";
import StyleTile from "../../components/styleTile/StyleTile.jsx";

function MaterialPage() {
    const {id} = useParams();
    const [material, setMaterial] = useState(null);
    const [relatedItems, setRelatedItems] = useState([]);
    const token = localStorage.getItem("token");

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
                    <iframe src={material.fileLink} frameBorder="0"></iframe>
                )}

                {material.fileType === "IMAGE" && (
                    <img
                        src={material.fileLink}
                        alt="Afbeelding"
                        width="600"
                        height="400"
                    />
                )}

                {material.fileType === "LINK" && material.filePath && (
                    // Check of de link een YouTube URL is
                    material.filePath.includes("youtube.com") || material.filePath.includes("youtu.be") ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(material.filePath)}`}
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
                <MoreItemsTile title="Gerelateerd" items={relatedItems} variant="secondary" />
            </section>

            <section className="rightContainer">
                {/*TODO - misschien StyleTile nog implementeren hier*/}
                <StyleTile />
                <section>
                    <h3>{material.styleName}</h3>
                    <p><strong>Categorie:</strong> {material.category}</p>
                    <p><strong>Instrument:</strong> {material.instrument}</p>
                    <p><strong>Herkomst:</strong> {material.origin}</p>
                </section>
            </section>
        </>
    );
}

export default MaterialPage;
