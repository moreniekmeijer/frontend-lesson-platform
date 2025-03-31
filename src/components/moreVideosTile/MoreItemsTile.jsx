import styles from "./MoreItemsTile.module.css"

function MoreItemsTile({ title, items }) {
    return (
        <section className={styles.moreItemsTile}>
            <h3>{title}</h3>
            <ul className={styles.itemList}>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.type === "video" && (
                            <video width="244" height="192" controls>
                                <source src={item.url} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        )}
                        {item.type === "image" && (
                            <img src={item.url} alt={`Item ${index}`} width="244" height="192"/>
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