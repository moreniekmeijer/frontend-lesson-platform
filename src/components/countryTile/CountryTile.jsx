import React, { useState, useEffect } from 'react';
import './CountryTile.css';

function CountryTile(props) {
    const [countryData, setCountryData] = useState(null);
    const countryName = props.countryName; // Dit is het land dat je doorgeeft

    // Helperfunctie om data op te halen van de REST Countries API
    useEffect(() => {
        if (countryName) {
            const fetchCountryData = async () => {
                try {
                    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
                    const data = await response.json();
                    // Aangezien de API een array teruggeeft, nemen we het eerste land
                    setCountryData(data[0]);
                } catch (error) {
                    console.error("Er is een fout opgetreden bij het ophalen van de gegevens:", error);
                }
            };

            fetchCountryData();
        }
    }, [countryName]); // Dit zorgt ervoor dat de effect opnieuw wordt uitgevoerd wanneer de countryName verandert

    if (!countryData) {
        return <div>Loading...</div>; // Wacht op de data
    }

    return (
        <div className="country-tile">
            <h3>{countryData.translations?.nld?.common || countryData.name.common}</h3>
            <span><img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} /></span>
        </div>
    );
}

export default CountryTile;