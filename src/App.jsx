import {useState} from 'react'
import './App.css'
import CountryTile from "./components/countryTile/CountryTile.jsx";
import Header from "./components/header/Header.jsx";
import Button from "./components/button/Button.jsx";
import StyleTile from "./components/styleTile/StyleTile.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Header></Header>
            <CountryTile countryName="japan"/>
            <Button>button</Button>
            <StyleTile name="Maracatu"
                       description={`Maracatu is een traditioneel percussieritme uit Brazilië, afkomstig uit de staat Pernambuco. Het heeft Afrikaanse wortels en wordt vaak geassocieerd met carnavalsoptochten en religieuze ceremonies. Maracatu wordt gespeeld door een "nação" (groep) met grote trommels (alfaia's), bellen (agogô), shakers (ganzá), en een kenmerkende "caixa" (snaredrum).`}></StyleTile>

        </>
    )
}

export default App
