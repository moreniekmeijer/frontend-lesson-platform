import {useState, useEffect} from "react";
import Button from "../button/Button.jsx";
import axios from "axios";
import styles from "./SearchTile.module.css";
import MoreItemsTile from "../moreVideosTile/MoreItemsTile.jsx";

function SearchTile() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        fileType: "",
        instrument: "",
        category: "",
        styleName: "",
        origin: "",
    });

    const [options, setOptions] = useState({
        fileType: [],
        instrument: [],
        category: [],
        styleName: [],
        origin: [],
    });

    const [materials, setMaterials] = useState([]);

    const categoryLabels = {
        fileType: "Bestandstype",
        instrument: "Instrument",
        category: "Categorie",
        styleName: "Stijl",
        origin: "Herkomst",
    };

    useEffect(() => {
        async function fetchOptions() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/materials`);
                const materials = response.data;
                const uniqueValues = (key) => [...new Set(materials.map((item) => item[key]).filter(Boolean))];

                setOptions({
                    fileType: uniqueValues("fileType"),
                    instrument: uniqueValues("instrument"),
                    category: uniqueValues("category"),
                    styleName: uniqueValues("styleName"),
                    origin: uniqueValues("origin"),
                });
            } catch (error) {
                console.error("Fout bij ophalen van materialen:", error);
            }
        }

        void fetchOptions();
    }, []);

    useEffect(() => {
        async function fetchMaterials() {
            try {

                const params = {
                    search: searchTerm || null,
                    ...filters,
                };

                Object.keys(params).forEach((key) => {
                    if (!params[key]) delete params[key];
                });

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/materials`, { params });
                setMaterials(response.data);

            } catch (error) {
                console.error("Fout bij zoeken naar materialen:", error);
            }
        }

        const timeoutId = setTimeout(() => {
            void fetchMaterials();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, filters]);

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

            <Button onClick={handleSearch}>Zoeken</Button>

            <MoreItemsTile
                title="Zoekresultaten"
                items={materials}
                variant="secondary"
            />
        </section>


    );
}

export default SearchTile;