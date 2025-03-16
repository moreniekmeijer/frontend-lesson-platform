import "./StyleTile.css";
import Button from "../button/Button.jsx";
import axios from "axios";

function StyleTile({ name, description }) {
    async function getStyleInfo() {
        try {
            const result = await axios.get("http://localhost:8080/styles");
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <article className="style-tile">
            <span>
                <button onClick={getStyleInfo}>test-eigen-api</button>
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