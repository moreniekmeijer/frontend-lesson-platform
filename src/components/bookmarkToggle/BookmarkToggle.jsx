import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../button/Button.jsx";

function BookmarkToggle({ user, materialId }) {
    const [saved, setSaved] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkIfSaved = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${user.username}/materials`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const isSaved = response.data.some((m) => m.id === materialId);
                setSaved(isSaved);
            } catch (error) {
                console.error("Fout bij ophalen opgeslagen materiaal:", error);
            }
        };

        if (user) {
            checkIfSaved();
        }
    }, [user, materialId]);

    const toggleBookmark = async () => {
        try {
            if (!user) return;

            const url = `${import.meta.env.VITE_API_URL}/users/${user.username}/materials/${materialId}`;
            if (saved) {
                await axios.delete(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.put(url, null, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setSaved(!saved);
        } catch (error) {
            console.error("Fout bij wijzigen bookmark:", error);
        }
    };

    return (
        <Button variant={saved && "simple"} onClick={toggleBookmark}>
            {saved ? "Verwijder uit opgeslagen" : "Bewaar dit materiaal"}
        </Button>
    );
}

export default BookmarkToggle;
