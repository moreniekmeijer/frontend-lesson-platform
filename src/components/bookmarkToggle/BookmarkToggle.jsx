import { useEffect, useState } from "react";
import Button from "../button/Button.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";

function BookmarkToggle({ user, materialId }) {
    const [saved, setSaved] = useState(false);
    const { executeRequest } = useApiRequest();

    useEffect(() => {
        const checkIfSaved = async () => {
            try {
                const response = await executeRequest(
                    "get",
                    `${import.meta.env.VITE_API_URL}/users/${user.username}/materials`
                );

                if (response?.data) {
                    const isSaved = response.data.some((m) => m.id === materialId);
                    setSaved(isSaved);
                }
            } catch (error) {
                console.error("Fout bij ophalen opgeslagen materiaal:", error);
            }
        };

        if (user) {
            void checkIfSaved();
        }
    }, [user, materialId]);

    const toggleBookmark = async () => {
        if (!user) return;

        const url = `${import.meta.env.VITE_API_URL}/users/${user.username}/materials/${materialId}`;
        try {
            if (saved) {
                await executeRequest("delete", url);
            } else {
                await executeRequest("put", url);
            }
            setSaved((prev) => !prev);
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
