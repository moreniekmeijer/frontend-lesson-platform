import {Link} from "react-router-dom";

function ArrangementsTile({ styles = [] }) {
    if (styles.length === 0) {
        return <p>Geen arrangementen beschikbaar.</p>;
    }

    console.log("ArrangementsTile", styles[0].name);

    return (
        <div>
            {styles.map(style => (
                <Link key={style.id} to={`/styles/${style.id}`}>
                    <p>{style.name}</p>
                </Link>
            ))}
        </div>
    );
}

export default ArrangementsTile;