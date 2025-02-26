import { useState } from 'react'
import './App.css'
import CountryTile from "./components/countryTile/CountryTile.jsx";
import Header from "./components/header/Header.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Header></Header>
      <CountryTile countryName="brazil" />

    </>
  )
}

export default App
