import styles from "./StyleTile.module.css";
import Button from "../button/Button.jsx";

function StyleTile({ data }) {
    if (!data) return null;

    return (
        <article className={styles.styleTile}>
            <span>
                <h2>{data.name}</h2>
                <Button>Arrangement</Button>
            </span>
            <p>{data.description}</p>
            <ul>
                {data.links?.map((link, index) => (
                    <li key={index}><a href={link.url}>{link.title}</a></li>
                )) || <li>Geen links beschikbaar</li>}
            </ul>
        </article>
    );
}

export default StyleTile;
