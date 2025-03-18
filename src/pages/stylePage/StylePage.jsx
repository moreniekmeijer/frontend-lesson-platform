import StyleTile from "../../components/styleTile/StyleTile.jsx";
import MoreItemsTile from "../../components/moreVideosTile/MoreItemsTile.jsx";
import CountryTile from "../../components/countryTile/CountryTile.jsx";

function StylePage() {
    return (
        <section className="style-page">
            <StyleTile/>
            <MoreItemsTile/>
            <CountryTile countryName="nederland"/>
        </section>
    )
}

export default StylePage;