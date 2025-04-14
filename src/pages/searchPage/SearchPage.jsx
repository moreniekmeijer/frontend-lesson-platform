import SearchTile from "../../components/searchTile/SearchTile.jsx";
import {useLocation} from "react-router-dom";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";

function SearchPage() {
    const { state } = useLocation();

    console.log(state?.results);  // Bekijk de resultaten in de console

    return (
        <section className="leftContainer">
            <SearchTile
                initialFilters={state?.filters}
                initialSearchTerm={state?.searchTerm}
                initialHasSearched={state?.hasSearched}
            />
            {state?.results && <MoreItemsTile
                title="Zoekresultaten"
                items={state.results}
                variant="secondary"
            />}
        </section>
    )
}

export default SearchPage;