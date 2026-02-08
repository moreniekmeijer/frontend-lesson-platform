import SearchTile from "../../components/searchTile/SearchTile.jsx";
import {useLocation} from "react-router-dom";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";

function SearchPage() {
    const { state } = useLocation();

    return (
        <section className="leftContainer">
            <SearchTile
                initialFilters={state?.filters}
                initialSearchTerm={state?.searchTerm}
                initialHasSearched={state?.hasSearched}
            />
            {state?.hasSearched === true ? (
                state.results?.length > 0 ? (
                    <MoreItemsTile
                        title="Zoekresultaten"
                        items={state.results}
                        variant="secondary"
                    />
                ) : (
                    <p>Helaas zijn er geen zoekresultaten beschikbaar...</p>
                )
            ) : <div>{state?.hasSearched}</div>}
        </section>
    )
}

export default SearchPage;