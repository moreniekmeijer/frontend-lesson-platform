import {useContext, useEffect, useState} from "react";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";

function SavedPage() {
    const {user} = useContext(AuthContext);
    const [savedItems, setSavedItems] = useState([]);
    const { executeRequest } = useApiRequest();

    useEffect(() => {
        const fetchSavedMaterials = async () => {
            try {
                const response = await executeRequest(
                    "get",
                    `${import.meta.env.VITE_API_URL}/users/${user.id}/materials`
                );

                if (response?.data) {
                    setSavedItems(response.data);
                }
            } catch (error) {
                console.error("Fout bij ophalen opgeslagen materiaal:", error);
            }
        };

        if (user) {
            void fetchSavedMaterials();
        }
    }, [user]);

    return (
        <section className="leftContainer">
            {savedItems.length > 0 ? (
                <MoreItemsTile
                    title="Mijn opgeslagen materiaal"
                    items={savedItems}
                />
            ) : (
                <>
                    <h2>Mijn opgeslagen materiaal</h2>
                    <p>Je hebt nog niks opgeslagen! Wil je materiaal opslaan?</p>
                    <NavLink to="/zoeken">
                        <Button>Zoek materiaal</Button>
                    </NavLink>
                </>
            )}
        </section>
    );
}

export default SavedPage;
