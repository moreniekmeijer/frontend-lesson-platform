import "../../App.css";
import styles from "./HelpPage.module.css";


function Help() {
    return (
        <div className="leftContainer">
            <h2>Hulp en tips</h2>
            <section className={styles.section}>
                <p>
                    Welkom! Na inloggen kom je op het <strong>dashboard</strong>.
                    Het dashboard is eigenlijk alles wat je nodig hebt. Hier staat de informatie om je voor te
                    bereiden op de volgende les. Het arrangement en de video's per stijl staan links en de agenda en
                    notities rechts, samen met een zoekfunctie. Het dashboard kun je onder andere bereiken via het
                    hoofdmenu links; hieronder staat wat je nog meer kunt vinden in dit menu.
                </p>
                <ol className={styles.subSection}>
                    <li>
                        <strong>Stijlen</strong>: Dit is een dropdown met alle beschikbare stijlen, klik op een stijl om
                        gedetailleerde informatie te vinden, inclusief het bijbehorende materiaal.
                    </li>
                    <li>
                        <strong>Zoeken</strong>: Hier kun je specifiek materiaal opzoeken op een zoekterm of
                        via verschillende categorieën
                    </li>
                    <li>
                        <strong>Opgeslagen</strong>: De laatste tab laat al jouw opgeslagen materiaal zien. Materiaal
                        kun je opslaan door op de 'Bewaar dit materiaal' knop te klikken op de detail weergave van het
                        desbetreffende materiaal.
                    </li>
                </ol>
                <p>
                    Op deze pagina kwam je via het instellingenmenu rechtsbovenin. Naast deze help pagina kun je daarin
                    ook je accountgegevens vinden en wijzigen; en uitloggen (je kunt jezelf overigens ingelogd houden,
                    dat is wel zo handig).
                </p>
            </section>

            <section className={styles.section}>
                <h3>Veelgestelde Vragen (FAQ)</h3>

                <div className={styles.subSection}>
                    <strong>Waarom moet ik inloggen met een e-mailadres?</strong>
                    <p>
                        Inloggen met een e-mailadres is nodig om ervoor te zorgen dat je wachtwoord kunt resetten,
                        zonder e-mailadres kan er geen reset-link worden gestuurd.
                    </p>
                </div>

                <div className={styles.subSection}>
                    <strong>Hoe weet ik wat ik kan voorbereiden?</strong>
                    <p>
                        Op je dashboard zie je de aankomende lessen en al het relevante
                        materiaal voor jouw eerstvolgende les.
                    </p>
                </div>

                <div className={styles.subSection}>
                    <strong>Kan ik het materiaal downloaden?</strong>
                    <p>
                        Ja, materiaal kun je downloaden als je het handig vindt
                        om offline te gebruiken, de knop hiervoor staat rechts naast het materiaal.
                    </p>
                </div>

                <div className={styles.subSection}>
                    <strong>Kan ik dit ook op mijn telefoon gebruiken?</strong>
                    <p>
                        Ja, de site werkt op mobiele apparaten en tablets. Voor een optimale
                        ervaring raadt ik echter wel een tablet of laptop aan (groter scherm).
                        <a href="https://www.youtube.com/shorts/vBQ-ZFih1VI" target="_blank"> Deze</a> video laat zien
                        hoe je sites op je startscherm kunt vastzetten op Android; voor de Iphone zie
                        <a href="https://www.youtube.com/shorts/3lRsB7U_Gxg" target="_blank"> deze</a> video. Zo hoef je
                        niet de hele tijd opnieuw de link in je browser te typen...
                    </p>
                </div>

                <div className={styles.subSection}>
                    <strong>Wat doe ik als ik iets niet kan openen?</strong>
                    <p>
                        Probeer je browser te verversen of een andere browser te gebruiken.
                        Als het blijft gebeuren, neem contact op met je docent.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Help;