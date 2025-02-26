import "./StyleTile.css";
import Button from "../button/Button.jsx";

function StyleTile({ name, description }) {

    return (
        <article className="style-tile">
            <span>
                <h2>{name}</h2>
                <Button>Arrangement</Button>
            </span>
            <p>{description}</p>
            <ul>
                <li>get link from styles</li>
                <li>get link from styles</li>
            </ul>
        </article>
    )
}

export default StyleTile;