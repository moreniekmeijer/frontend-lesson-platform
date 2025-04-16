import React, {useState, useEffect} from 'react';
import styles from './CountryTile.module.css';

function CountryTile({countryName}) {
    const [countryData, setCountryData] = useState(null);

    useEffect(() => {
        if (countryName) {
            const fetchCountryData = async () => {
                try {
                    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
                    const data = await response.json();
                    setCountryData(data[0]);
                } catch (error) {
                    console.error("Er is een fout opgetreden bij het ophalen van de gegevens:", error);
                }
            };

            void fetchCountryData();
        }
    }, [countryName]);

    // if (!countryData) {
    //     return <div>Loading...</div>;
    // }

    return (
        countryData ? (
            <div className={styles.countryTile}>
                <h4>{countryData.translations?.nld?.common || countryData.name.common}</h4>
                <span><img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`}/></span>
            </div>
        ) : (
            <h4>{countryName}</h4>
        )
    );
}

export default CountryTile;