import styles from "./MoreItemsTile.module.css"
import {Link} from "react-router-dom";

function MoreItemsTile({title, items, variant}) {
    console.log("Items in MoreItemsTile:", items); // Toegevoegd om te controleren

    return (
        <section className={`${styles.moreItemsTile} ${variant === "secondary" ? styles.secondary : ""}`}>
            {variant === "secondary" ?
                <h3>{title}</h3>
                :
                <h2>{title}</h2>}
            <ul className={styles.itemList}>
                {items.map((item) => (
                    <li key={item.id}>
                        <Link to={`/materiaal/${item.id}`}>

                            {item.fileType === "VIDEO" && item.fileLink && (
                                <video width="200" height="157" controls>
                                    <source src={item.fileLink} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            )}

                            {item.fileType === "LINK" && item.fileLink && (
                                <img
                                    src="../../assets/YT-logo.png"
                                    alt="Video Link"
                                    width="200"
                                    height="130"
                                />
                            )}

                            {item.fileType === "PDF" && item.fileLink && (
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                                    alt="PDF Preview"
                                    width="200"
                                    height="130"
                                />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default MoreItemsTile;