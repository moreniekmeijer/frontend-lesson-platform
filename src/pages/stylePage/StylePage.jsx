import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StyleTile from "../../components/styleTile/StyleTile.jsx";
import MoreItemsTile from "../../components/moreVideosTile/MoreItemsTile.jsx";
import CountryTile from "../../components/countryTile/CountryTile.jsx";
import styles from "./StylePage.module.css";

function StylePage() {
    const { id } = useParams();
    const [styleData, setStyleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("Geen geldig ID gevonden.");
            setLoading(false);
            return;
        }

        const fetchStyleData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/styles/${id}`);
                setStyleData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        void fetchStyleData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // const videoExamples = styleData?.videos || [];
    const videoExamples = [
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=abc123" }
    ];

    return (
        <section className={styles.stylePage}>
            {/*<h1>{styleData?.name || "Stijl"}</h1>*/}
            <div className="left-container-aaaaa">
                <StyleTile data={styleData}/>
                <MoreItemsTile title="Videos" items={videoExamples}/>
            </div>
            <CountryTile countryName={styleData?.origin || "Onbekend"} />
        </section>
    );
}

export default StylePage;
