import styles from "./StyleTile.module.css";
import Button from "../button/Button.jsx";
import {useNavigate} from "react-router-dom";

function StyleTile({data}) {
    if (!data) return null;

    return (
        <section className={styles.styleTile}>
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
