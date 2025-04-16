import {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import StyleTile from "../../components/styleTile/StyleTile.jsx";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import CountryTile from "../../components/countryTile/CountryTile.jsx";
import styles from "./StylePage.module.css";
import useApiRequest from "../../hooks/useApiRequest.js";
import Button from "../../components/button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function StylePage() {
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

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

    async function handleDelete() {
        try {
            await executeRequest('delete', `${import.meta.env.VITE_API_URL}/styles/${id}`);
            navigate("/"); // Of waar je ook naartoe wilt
        } catch (error) {
            console.error("Fout bij verwijderen:", error);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!styleData) return <p>Geen data gevonden.</p>;

    const videos = styleData.materials || [];

    return (
        <>
            <div className="leftContainer">
                <StyleTile data={styleData}/>
                <MoreItemsTile variant="secondary" title="Videos" items={videos}/>
            </div>
            <div className="rightContainer">
                <CountryTile countryName={styleData?.origin || "Onbekend"}/>
                {user?.role === 'admin' && (
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
