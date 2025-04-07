import { useState, useEffect } from "react";
import Button from "../button/Button.jsx";
import styles from "./SearchTile.module.css";
import MoreItemsTile from "../moreVideosTile/MoreItemsTile.jsx";
import useApiRequest from "../../hooks/useApiRequest";

function SearchTile() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        fileType: "",
        instrument: "",
        category: "",
        styleName: "",
        origin: "",
    });

    const categoryLabels = {
        fileType: "Bestandstype",
        instrument: "Instrument",
        category: "Categorie",
        styleName: "Stijl",
        origin: "Herkomst",
    };

    // Custom hook instanties
    const {
        data: optionsData,
        loading: optionsLoading,
        error: optionsError,
        executeRequest: fetchOptions
    } = useApiRequest();

    const {
        data: materialsData,
        loading: materialsLoading,
        error: materialsError,
        executeRequest: fetchMaterials
    } = useApiRequest();

    // Haal unieke waarden uit opties
    const extractOptions = (materials) => {
        const uniqueValues = (key) => [...new Set(materials.map((item) => item[key]).filter(Boolean))];
        return {
            fileType: uniqueValues("fileType"),
            instrument: uniqueValues("instrument"),
            category: uniqueValues("category"),
            styleName: uniqueValues("styleName"),
            origin: uniqueValues("origin"),
        };
    };

    // Haal filteropties op bij het laden
    useEffect(() => {
        const loadOptions = async () => {
            await fetchOptions("get", `${import.meta.env.VITE_API_URL}/materials`);
        };

        void loadOptions();
    }, []);

    // Haal materialen op wanneer filters of zoekterm veranderen
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = {
                search: searchTerm || null,
                ...filters,
            };

            Object.keys(params).forEach((key) => {
                if (!params[key]) delete params[key];
            });

            const queryString = new URLSearchParams(params).toString();
            const url = `${import.meta.env.VITE_API_URL}/materials?${queryString}`;

            void fetchMaterials("get", url);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, filters]);

    const options = optionsData ? extractOptions(optionsData) : {
        fileType: [],
        instrument: [],
        category: [],
        styleName: [],
        origin: [],
    };

    const handleSearch = () => {
        console.log("Zoekterm:", searchTerm);
        console.log("Gekozen filters:", filters);
    };

    return (
        <section className={styles.searchTile}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Zoekterm..."
            />

            {Object.keys(filters).map((key) => (
                <label key={key} className={styles.options}>
                    <p>{categoryLabels[key]}</p>
                    <select
                        value={filters[key]}
                        onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                    >
                        <option value="">Kies {categoryLabels[key].toLowerCase()}...</option>
                        {options[key].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
            ))}

            <Button onClick={handleSearch}>Zoeken</Button>

            {materialsLoading && <p>Bezig met laden...</p>}
            {materialsError && <p>Fout: {materialsError}</p>}

            <MoreItemsTile
                title="Zoekresultaten"
                items={materialsData || []}
                variant="secondary"
            />
        </section>
    );
}

export default SearchTile;
