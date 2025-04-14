import {useState, useEffect} from "react";
import styles from "./SearchTile.module.css";
import useApiRequest from "../../hooks/useApiRequest.js";
import Button from "../button/Button.jsx";
import {useNavigate} from "react-router-dom";

function SearchTile({
                        initialFilters = {},
                        initialSearchTerm = "",
                        initialHasSearched = false,
                    }) {
    const navigate = useNavigate();
    const [hasSearched, setHasSearched] = useState(initialHasSearched);
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [filters, setFilters] = useState({
        fileType: "",
        instrument: "",
        category: "",
        styleName: "",
        origin: "",
        ...initialFilters,
    });
    const [filteredMaterials, setFilteredMaterials] = useState([]);  // <-- Nieuwe state voor de gefilterde materialen
    const filterOrder = ['origin', 'styleName', 'instrument', 'category', 'fileType'];

    const {
        data: allMaterials,
        error: optionsError,
        executeRequest: fetchAllMaterials
    } = useApiRequest();

    const {
        // data: filteredMaterials,
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
        origin: [],
        styleName: [],
        instrument: [],
        category: [],
        fileType: [],
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

    const fetchMaterialsWithParams = async () => {
        const params = {
            search: searchTerm || null,
            ...filters,
        };

        Object.keys(params).forEach((key) => {
            if (!params[key]) delete params[key];
        });

        const response = await fetchFilteredMaterials("get", `${import.meta.env.VITE_API_URL}/materials`, null, params);

        if (response) {
            console.log("Gevonden gefilterde materialen:", response);
            setFilteredMaterials(response.data);
        }
    };

    const handleSearch = async () => {
        setHasSearched(true);
        await fetchMaterialsWithParams();
        navigate("/zoeken", {state: {results: filteredMaterials}});
    };

    // Voor nakijkers: deze useEffect zorgt voor het navigeren
    useEffect(() => {
        if (hasSearched && filteredMaterials.length > 0) {
            navigate("/zoeken", {
                state: {
                    results: filteredMaterials,
                    filters,
                    searchTerm,
                    hasSearched: true,
                },
            });
        }
    }, [filteredMaterials]);

    // deze zorgt voor de automatische zoek updates
    useEffect(() => {
        if (!hasSearched) {
            return;
        }

        const timeoutId = setTimeout(() => {
            void fetchMaterialsWithParams();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, filters, hasSearched]);

    const handleReset = () => {
        setSearchTerm("");
        setFilters({
            fileType: "",
            instrument: "",
            category: "",
            styleName: "",
            origin: "",
        });
    };

    return (
        <section className={styles.searchTile}>
            <h3>Welk materiaal zoek je?</h3>
            <section className={styles.searchArea}>
                <div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Zoekterm..."
                    />

                    <span className={styles.buttons}>
                    {!hasSearched &&
                        <Button onClick={handleSearch}>Zoeken</Button>
                    }
                        <Button variant="secondary" onClick={handleReset}>Reset</Button>
                    </span>
                </div>

                {/*TODO - misschien gekozen categorieen laten uitlichten zodat het duidelijk is of je iets hebt aangevinkt*/}
                <div className={styles.optionsContainer}>
                    {filterOrder.map((key) => (
                        <label key={key} className={styles.options}>
                            <select
                                className={`${filters[key] ? styles.selected : ''}`}
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
                </div>
            </section>
        </section>
    );
}

export default SearchTile;