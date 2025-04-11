const NotesTile = ({ title, notes }) => {
    return (
        <section>
            <h3>{title}</h3>
            <p>{notes || "Geen notities"}</p>
        </section>
    );
};

export default NotesTile;
