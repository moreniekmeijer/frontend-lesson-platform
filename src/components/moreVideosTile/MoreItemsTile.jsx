import styles from "./MoreItemsTile.module.css"

function MoreItemsTile({title, items, variant}) {
    return (
        <section className={`${styles.moreItemsTile} ${variant === "secondary" ? styles.secondary : ""}`}>
            {variant === "secondary" ?
                <h3>{title}</h3>
                :
                <h2>{title}</h2>}
            <ul className={styles.itemList}>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.fileType === "VIDEO" && (
                            <video width="200" height="157" controls>
                                <source src={item.link} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        )}
                        {item.fileType === "IMAGE" && (
                            <img src={item.filePath} alt={`Item ${index}`} width="200" height="157"/>
                        )}
                        {item.fileType === "PDF" && (
                            <p>{item.content}</p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default MoreItemsTile;