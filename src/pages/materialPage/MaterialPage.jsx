import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MoreItemsTile from "../../components/moreVideosTile/MoreItemsTile.jsx";
import axios from "axios";

function MaterialPage() {
    const {id} = useParams();
    const [material, setMaterial] = useState(null);
    const [relatedItems, setRelatedItems] = useState([]);

    useEffect(() => {
        const fetchMaterialAndRelated = async () => {
            try {
                const materialResponse = await axios.get(`${import.meta.env.VITE_API_URL}/materials/1`);
                const materialData = materialResponse.data;
                setMaterial(materialData);

                const relatedResponse = await axios.get(`${import.meta.env.VITE_API_URL}/materials?styleName=${materialData.styleName}`);
                const relatedMaterial = relatedResponse.data.filter(m => m.id !== materialData.id);

                setRelatedItems(relatedMaterial);
                console.log(relatedResponse.data);
            } catch (err) {
                console.error("Error fetching material + related:", err);
            }
        };

        void fetchMaterialAndRelated();
    }, [id]);


    if (!material) return <p>Loading...</p>;

    return (
        <section className="material-page">
            <h2>{material.title}</h2>

            {/* Bestandstype weergeven */}
            {material.fileType === "VIDEO" && (
                <video width="600" height="400" controls>
                    <source src={material.fileLink} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            )}
            {material.fileType === "PDF" && (
                <img
                    src="/path/to/pdf-placeholder.png"
                    alt="PDF Preview"
                    width="600"
                    height="400"
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
            {material.fileType === "LINK" && (
                <a href={material.filePath} target="_blank" rel="noreferrer">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                        alt="Extern materiaal"
                        width="600"
                        height="400"
                    />
                </a>
            )}

            <section>
                <h3>{material.styleName}</h3>
                <p><strong>Categorie:</strong> {material.category}</p>
                <p><strong>Instrument:</strong> {material.instrument}</p>
                <p><strong>Herkomst:</strong> {material.origin}</p>
            </section>

            <MoreItemsTile title="Gerelateerd" items={relatedItems}/>
        </section>
    );
}

export default MaterialPage;
