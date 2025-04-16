import SearchTile from "../../components/searchTile/SearchTile.jsx";
import {useLocation} from "react-router-dom";
import MoreItemsTile from "../../components/moreItemsTile/MoreItemsTile.jsx";

function SearchPage() {
    const { state } = useLocation();

    console.log(state?.hasSearched);

    return (
        <section className="leftContainer">
            <SearchTile
                initialFilters={state?.filters}
                initialSearchTerm={state?.searchTerm}
                initialHasSearched={state?.hasSearched}
            />
            {/*TODO - dit werkt nog niet qua checks*/}
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
            ) : null}
        </section>
    )
}

export default SearchPage;