import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StyleTile from "../../components/styleTile/StyleTile.jsx";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import CountryTile from "../../components/countryTile/CountryTile.jsx";
import styles from "./StylePage.module.css";
import useApiRequest from "../../hooks/useApiRequest.js";

function StylePage() {
    const { id } = useParams();

    const {
        data: styleData,
        loading,
        error,
        executeRequest,
    } = useApiRequest();

    useEffect(() => {
        if (!id) return;
        void executeRequest('get', `${import.meta.env.VITE_API_URL}/styles/${id}`);
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!styleData) return <p>Geen data gevonden.</p>;

    const videos = styleData.materials || [];

    return (
        <>
            <div className="leftContainer">
                <StyleTile data={styleData}/>
                <MoreItemsTile title="Videos" items={videos}/>
            </div>
            <div className="rightContainer"><CountryTile countryName={styleData?.origin || "Onbekend"}/></div>
        </>
    );
}

export default StylePage;
