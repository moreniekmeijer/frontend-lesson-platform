import React, { useState, useEffect } from 'react';
import styles from './Loader.module.css';

const PERCUSSION_FACTS = [
    "Cajón komt oorspronkelijk uit Peru, waar tot slaaf gemaakte Afrikanen houten kisten als trommels gingen gebruiken.",
    "In veel Braziliaanse sambagroepen spelen soms honderden percussionisten tegelijk",
    "De Taiko werd vroeger in Japan gebruikt om dorpsgrenzen aan te geven: hoe ver de trom klonk, zo ver reikte het dorp.",
    "Het woord “percussie” komt van het Latijnse percussio, wat letterlijk “slaan” of “ergens op tikken” betekent.",
    "Een Surdo bepaalt vaak de hartslag van samba: zonder surdo voelt de hele groep direct minder stevig.",
    "Sommige traditionele Afrikaanse trommels konden boodschappen over kilometers doorgeven — een soort vroege “telefoon”, maar dan ritmisch.",
    "Shakers zoals maracas lijken simpel, maar in veel stijlen bepalen ze juist de groove tussen de grote accenten.",
    "Bij Taiko draait techniek niet alleen om ritme, maar ook om houding, ademhaling en choreografie — het is bijna tegelijk muziek én krijgskunst.",
    "In veel Latijnse muziek is stilte net zo belangrijk als de slag zelf: de ruimte tussen twee noten maakt de groove.",
    "Mensen reageren vaak instinctief op lage trommels, omdat lage frequenties fysiek voelbaar zijn — je hoort ze niet alleen, je lichaam voelt ze ook."
];

function Loader({ message, showFact = true }) {
    const [fact, setFact] = useState("");

    useEffect(() => {
        if (!showFact) return;

        const getRandomFact = () => {
            const randomIndex = Math.floor(Math.random() * PERCUSSION_FACTS.length);
            setFact(PERCUSSION_FACTS[randomIndex]);
        };

        getRandomFact();
        const interval = setInterval(getRandomFact, 7000);

        return () => clearInterval(interval);
    }, [showFact]);

    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
            {message && <p className={styles.message}>{message}</p>}
            {showFact && <p className={styles.factText}>{fact}</p>}
        </div>
    );
}

export default Loader;
