import {useState, useEffect} from "react";
import Button from "../button/Button.jsx";
import axios from "axios";
import styles from "./SearchTile.module.css";
import MoreItemsTile from "../moreVideosTile/MoreItemsTile.jsx";
import useApiRequest from "../../hooks/useApiRequest.jsx";

function SearchTile() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        fileType: "",
        instrument: "",
        category: "",
        styleName: "",
        origin: "",
    });

    const {
        data: allMaterials,
        error: optionsError,
        executeRequest: fetchAllMaterials
    } = useApiRequest();

    const {
        data: filteredMaterials,
        loading,
        error,
        executeRequest: fetchFilteredMaterials
    } = useApiRequest();

    const categoryLabels = {
        fileType: "Bestandstype",
        instrument: "Instrument",
        category: "Categorie",
        styleName: "Stijl",
        origin: "Herkomst",
    };

    // Haal alle materialen op voor de filteropties
    useEffect(() => {
        void fetchAllMaterials("get", `${import.meta.env.VITE_API_URL}/materials`);
    }, []);

    const [options, setOptions] = useState({
        fileType: [],
        instrument: [],
        category: [],
        styleName: [],
        origin: [],
    });

    useEffect(() => {
        if (!allMaterials) return;

        const uniqueValues = (key) =>
            [...new Set(allMaterials.map((item) => item[key]).filter(Boolean))];

        setOptions({
            fileType: uniqueValues("fileType"),
            instrument: uniqueValues("instrument"),
            category: uniqueValues("category"),
            styleName: uniqueValues("styleName"),
            origin: uniqueValues("origin"),
        });
    }, [allMaterials]);

    // Zoekresultaten ophalen op basis van zoekterm + filters
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = {
                search: searchTerm || null,
                ...filters,
            };

            Object.keys(params).forEach((key) => {
                if (!params[key]) delete params[key];
            });

            void fetchFilteredMaterials("get", `${import.meta.env.VITE_API_URL}/materials`, null, params);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, filters]);

    return (
        <section className={styles.searchTile}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Zoekterm..."
            />

            {/*TODO - misschien gekozen categorieen laten uitlichten zodat het duidelijk is of je iets hebt aangevinkt*/}
            {Object.keys(filters).map((key) => (
                <label key={key} className={styles.options}>
                    <p>{categoryLabels[key]}</p>
                    <select
                        value={filters[key]}
                        onChange={(e) => setFilters({...filters, [key]: e.target.value})}
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

            {/*<Button onClick={handleSearch}>Zoeken</Button>*/}

            <MoreItemsTile
                title="Zoekresultaten"
                items={filteredMaterials || []}
                variant="secondary"
            />
        </section>


    );
}

export default SearchTile;