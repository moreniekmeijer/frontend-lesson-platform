import StyleTile from "../../components/styleTile/StyleTile.jsx";
import MoreItemsTile from "../../components/moreVideosTile/MoreItemsTile.jsx";
import CountryTile from "../../components/countryTile/CountryTile.jsx";
import "./StylePage.css"

function StylePage() {
    // Alles moet hier opgehaald worden via de GET styles, via een id parameter. (dus niet in de styleTile)

    const videoExamples = [
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" },
        { type: "video", url: "https://www.youtube.com/watch?v=abc123" }
    ];

    return (
        <section className="style-page">
            <StyleTile/>
            <MoreItemsTile title="Videos" items={videoExamples}/>
            <CountryTile countryName="nederland"/>
        </section>
    )
}

export default StylePage;