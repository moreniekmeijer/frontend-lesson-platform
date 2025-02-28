import {useState} from 'react'
import './App.css'
import CountryTile from "./components/countryTile/CountryTile.jsx";
import Header from "./components/header/Header.jsx";
import Button from "./components/button/Button.jsx";
import StyleTile from "./components/styleTile/StyleTile.jsx";
import Aside from "./components/aside/Aside.jsx";
import DragDrop from "./components/dragDrop/DragDrop.jsx";
import { useForm } from 'react-hook-form';
import MaterialForm from "./components/materialForm/materialForm.jsx";
import MoreVideosTile from "./components/moreVideosTile/MoreVideosTile.jsx";

function App() {

    return (
        <>
            <Header></Header>
            <main>
                <MoreVideosTile description="Recent afgespeeld"></MoreVideosTile>
            </main>
            <Aside></Aside>
        </>
    )
}

export default App
