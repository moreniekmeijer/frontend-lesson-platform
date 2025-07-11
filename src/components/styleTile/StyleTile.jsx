import styles from "./StyleTile.module.css";
import Button from "../button/Button.jsx";
import {useNavigate} from "react-router-dom";

function StyleTile({data}) {
    const navigate = useNavigate();

    if (!data) return null;

    const arrangementId = data.arrangementId;
    const handleNavigate = () => {
        if (arrangementId) {
            navigate(`/materiaal/${arrangementId}`);
        }
    };

    return (
        <section className={styles.styleTile}>
            <span>
                <h2>{data.name}</h2>
                {arrangementId && (
                    <Button onClick={handleNavigate}>
                        Arrangement
                    </Button>
                )}
            </span>
            <p>{data.description}</p>

            <ul>
                {data.links && data.links.length > 0 && (
                    data.links.map((link, index) => (
                        <li key={index}>
                            <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
}

export default StyleTile;
