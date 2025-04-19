import {useContext, useEffect, useState} from "react";
import axios from "axios";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";

function SavedPage() {
    const {user} = useContext(AuthContext);
    const [savedItems, setSavedItems] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchSavedMaterials = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/${user.username}/materials`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setSavedItems(response.data);
            } catch (err) {
                console.error("Fout bij ophalen opgeslagen materiaal:", err);
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
                    <h3>Mijn opgeslagen materiaal</h3>
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
