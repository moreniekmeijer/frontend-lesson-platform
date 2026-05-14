import React, { useState, useEffect } from 'react';
import styles from './Loader.module.css';

const PERCUSSION_FACTS = [
    "Cajón komt oorspronkelijk uit Peru, waar tot slaaf gemaakte Afrikanen houten kisten als trommels gingen gebruiken...",
    "In veel Braziliaanse sambagroepen spelen soms honderden percussionisten tegelijk...",
    "De Taiko werd vroeger in Japan gebruikt om dorpsgrenzen aan te geven: hoe ver de trom klonk, zo ver reikte het dorp...",
    "Het woord “percussie” komt van het Latijnse percussio, wat letterlijk “slaan” of “ergens op tikken” betekent...",
    "Een Surdo bepaalt vaak de hartslag van samba: zonder surdo voelt de hele groep direct minder stevig...",
    "Sommige traditionele Afrikaanse trommels konden boodschappen over kilometers doorgeven — een soort vroege “telefoon”, maar dan ritmisch...",
    "Shakers zoals maracas lijken simpel, maar in veel stijlen bepalen ze juist de groove tussen de grote accenten...",
    "Bij Taiko draait techniek niet alleen om ritme, maar ook om houding, ademhaling en choreografie — het is bijna tegelijk muziek én krijgskunst...",
    "In veel Latijnse muziek is stilte net zo belangrijk als de slag zelf: de ruimte tussen twee noten maakt de groove...",
    "Mensen reageren vaak instinctief op lage trommels, omdat lage frequenties fysiek voelbaar zijn — je hoort ze niet alleen, je lichaam voelt ze ook...",
    "Je kunt op bijna alles percussie maken: hout, metaal, steen, water en zelfs je eigen lichaam...",
    "Het menselijk hart klopt van nature ritmisch; misschien reageren we daarom zo sterk op drums...",
    "Een eenvoudig ritme kan technisch moeilijk zijn als het lang perfect gelijk moet blijven...",
    "Stil blijven in een ritmegroep is ook muziek: niet spelen op het juiste moment is soms de belangrijkste noot...",
    "Djembe wordt traditioneel uit één massief stuk hout gesneden en bespannen met geitenvel...",
    "De eerste muziek van de mens was waarschijnlijk ritmisch: klappen, stampen en slaan op objecten..."
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
        const interval = setInterval(getRandomFact, 10000);

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
