import {useState} from 'react'
import './App.css'
import CountryTile from "./components/countryTile/CountryTile.jsx";
import Header from "./components/header/Header.jsx";
import Button from "./components/button/Button.jsx";
import StyleTile from "./components/styleTile/StyleTile.jsx";
import Aside from "./components/aside/Aside.jsx";
import DragDrop from "./components/dragDrop/DragDrop.jsx";

function App() {

    return (
        <>
            <Header></Header>
            <main>
                <DragDrop></DragDrop>
                <StyleTile></StyleTile>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolorem ducimus iusto laudantium, magnam necessitatibus quis vel! Ab atque dicta excepturi odio porro quisquam quos repellendus sit tempore voluptatibus? Non? loerm   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ea et eum maxime, officia quae ratione repellendus repudiandae! Architecto cum deserunt facilis id laboriosam magni, mollitia numquam quod ratione tempora.
            </main>
            <Aside></Aside>
        </>
    )
}

export default App
