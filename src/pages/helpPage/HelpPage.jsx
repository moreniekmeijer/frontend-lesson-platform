
function Help() {
    return (
        <div>
            <h1>Help en tips</h1>

            {/* Hoe gebruik je de site */}
            <section>
                <h2>Hoe gebruik ik deze les‑site?</h2>
                <p>
                    Welkom! Deze site is gemaakt om je te helpen met het volgen van je
                    lessen en het bekijken van lesmateriaal.
                </p>
                <ol>
                    <li>
                        <strong>Inloggen</strong>: Log in met je gebruikersnaam en wachtwoord.
                    </li>
                    <li>
                        <strong>Dashboard</strong>: Na inloggen zie je je <em>overzicht</em> met
                        aankomende lessen.
                    </li>
                    <li>
                        <strong>Lesmateriaal</strong>: Klik op een les om het bijbehorende
                        materiaal te bekijken (bijv. PDF, audio, video of links).
                    </li>
                    <li>
                        <strong>Volgorde</strong>: Gebruik de navigatie om door de lessen te
                        gaan.
                    </li>
                    <li>
                        <strong>Uitloggen</strong>: Je kunt altijd uitloggen via de knop
                        rechtsboven.
                    </li>
                </ol>
            </section>

            {/* Wat als er problemen zijn */}
            <section>
                <h2>Problemen oplossen</h2>
                <ul>
                    <li>
                        <strong>Kan ik niet inloggen?</strong> Controleer of je
                        gebruikersnaam en wachtwoord correct zijn. Vraag je docent als je
                        geen account hebt.
                    </li>
                    <li>
                        <strong>Zie ik geen materiaal?</strong> Zorg dat je bent ingelogd en
                        kijk of de lesdatum nadert.
                    </li>
                    <li>
                        <strong>PDF/Media opent niet?</strong> Soms moet je pop‑ups toestaan
                        of een PDF‑viewer op je apparaat hebben.
                    </li>
                </ul>
            </section>

            {/* FAQ */}
            <section>
                <h2>Veelgestelde Vragen (FAQ)</h2>

                <div>
                    <h3>Waarom moet ik inloggen?</h3>
                    <p>
                        Inloggen zorgt ervoor dat alleen <strong>jij</strong> toegang hebt tot
                        jouw lessen en materiaal.
                    </p>
                </div>

                <div>
                    <h3>Hoe weet ik welke lessen ik moet doen?</h3>
                    <p>
                        Op je dashboard zie je de <em>aankomende lessen</em> en al het relevante
                        materiaal voor jouw eerstvolgende les.
                    </p>
                </div>

                <div>
                    <h3>Kan ik het materiaal downloaden?</h3>
                    <p>
                        Ja, materiaal kun je downloaden als je het handig vindt
                        om offline te gebruiken, de knop hiervoor staat rechts naast het materiaal.
                    </p>
                </div>

                <div>
                    <h3>Kan ik dit ook op mijn telefoon gebruiken?</h3>
                    <p>
                        Ja. De site werkt op mobiele apparaten en tablets. Voor een optimale
                        ervaring raadt ik een tablet of laptop aan (groter scherm).
                    </p>
                </div>

                <div>
                    <h3>Wat doe ik als ik iets niet kan openen?</h3>
                    <p>
                        Probeer je browser te verversen of een andere browser te gebruiken.
                        Als het blijft gebeuren, neem contact op met je docent.
                    </p>
                </div>
            </section>

            {/* Contact informatie */}
            <section>
                <h2>Contact / Vragen</h2>
                <p>
                    Heb je nog vragen die hier niet tussen staan? Stuur dan een bericht
                    naar je docent of gebruik het contactformulier op de site.
                </p>
            </section>
        </div>
    );
}

export default Help;