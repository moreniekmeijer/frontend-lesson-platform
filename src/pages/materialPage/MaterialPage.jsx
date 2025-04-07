import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MoreItemsTile from "../../components/moreVideosTile/MoreItemsTile.jsx";
import axios from "axios";

function MaterialPage() {
    const {id} = useParams();
    const [material, setMaterial] = useState(null);

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/materials/${id}`)
                setMaterial(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching styles:", error);
            }
        };

        void fetchMaterial();
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

            {/* Extra info */}
            <section>
                <h3>{material.styleName}</h3>
                <p><strong>Categorie:</strong> {material.category}</p>
                <p><strong>Instrument:</strong> {material.instrument}</p>
                <p><strong>Herkomst:</strong> {material.origin}</p>
            </section>

            {/* Gerelateerde items – optioneel als je die data hebt */}
            <MoreItemsTile title="Gerelateerd" items={[material]}/>
        </section>
    );
}

export default MaterialPage;
