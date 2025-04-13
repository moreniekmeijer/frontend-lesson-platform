import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="leftContainer">
            <p>De pagina die u probeert te bezoeken bestaat niet.</p>
            <p><Link to="/">Klik hier</Link> om terug te keren naar het dashboard.</p>
        </div>
    )
}

export default NotFoundPage;