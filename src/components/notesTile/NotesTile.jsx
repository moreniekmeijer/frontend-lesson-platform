import styles from "./NotesTile.module.css";

const NotesTile = ({title, items = [], notes = ""}) => {
    return (
        <section className={styles.notes}>
            <h3>{title}</h3>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <h4>Notities:</h4>
            <p>{notes}</p>
        </section>
    );
};

export default NotesTile;
