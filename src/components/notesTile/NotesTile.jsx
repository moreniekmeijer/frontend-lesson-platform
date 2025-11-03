import styles from "./NotesTile.module.css";

const NotesTile = ({ title, items = [], notes = [] }) => {
    return (
        <section className={styles.notes}>
            <h3>{title}</h3>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <h4>Notities:</h4>
            {Array.isArray(notes) && notes.length > 0 ? (
                notes.map((note, idx) => <p key={idx}>{note}</p>)
            ) : (
                <p>(Geen notities beschikbaar)</p>
            )}
        </section>
    );
};

export default NotesTile;
