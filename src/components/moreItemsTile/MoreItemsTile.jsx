import styles from "./MoreItemsTile.module.css"
import {Link} from "react-router-dom";
import youtube from "../../assets/YT-logo.png";
import pdf from "../../assets/PDF-Placeholder.png";

function MoreItemsTile({title, items, variant}) {
    return (
        <section className={`${styles.moreItemsTile} ${variant === "secondary" ? styles.secondary : ""}`}>
            {variant === "secondary" ?
                <h3>{title}</h3>
                :
                <h2>{title}</h2>}
            {items.length > 0 ? (
                <ul className={styles.itemList}>
                    {items.map((item) => (
                        <li key={item.id}>
                            <Link to={`/materiaal/${item.id}`}>
                                {variant === "secondary" ?
                                    <h5 title={item.title}>{item.title}</h5>
                                    :
                                    <h4 title={item.title}>{item.title}</h4>}

                                {item.fileType === "VIDEO" && item.fileLink && (
                                    <video controls>
                                        <source src={item.fileLink} type="video/mp4"/>
                                        Your browser does not support the video tag.
                                    </video>
                                )}

                                {item.fileType === "LINK" && item.fileLink && (
                                    <img
                                        src={youtube}
                                        alt="Video Link"
                                    />
                                )}

                                {item.fileType === "PDF" && item.fileLink && (
                                    <img
                                        src={pdf}
                                        alt="PDF Preview"
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Er zijn geen resultaten beschikbaar.</p>
            )}

        </section>
    )
}

export default MoreItemsTile;