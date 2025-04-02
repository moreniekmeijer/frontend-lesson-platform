import styles from "./StyleTile.module.css";
import Button from "../button/Button.jsx";

function StyleTile({data}) {
    if (!data) return null;

    return (
        <article className={styles.styleTile}>
            <span>
                <h2>{data.name}</h2>
                <Button>Arrangement</Button>
            </span>
            <p>{data.description}</p>
            {/*TODO - de backend geeft nu alleen links mee vanuit materials (in get /styles), dus er is geen metadata, dus ik kan de links*/}
            {/*     - geen titel geven vanuit de backend... Misschien toch de volledige material objecten meesturen?*/}
            {/*TODO - Misschien ook de 'geen links beschikbaar' fallback weghalen, want is niet nodig*/}
            <ul>
                {data.links && data.links.length > 0 ? (
                    data.links.map((link, index) => (
                        <li key={index}>
                            <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                        </li>
                    ))
                ) : (
                    <li>Geen links beschikbaar</li>
                )}
            </ul>
        </article>
    );
}

export default StyleTile;
