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
                        {item.type === "video" && (
                            <video width="200" height="157" controls>
                                <source src={item.url} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        )}
                        {item.type === "image" && (
                            <img src={item.url} alt={`Item ${index}`} width="200" height="157"/>
                        )}
                        {item.type === "text" && (
                            <p>{item.content}</p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default MoreItemsTile;