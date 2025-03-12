import './App.css'
import Header from "./components/header/Header.jsx";
import Aside from "./components/aside/Aside.jsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.jsx";
import StylePage from "./pages/stylePage/StylePage.jsx";
import MaterialPage from "./pages/materialPage/MaterialPage.jsx";
import UploadPage from "./pages/uploadPage/UploadPage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";

function App() {

    return (
        <>
            <Header></Header>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    {/*<Route path="/register" element={<RegisterPage/>}/>*/}
                    <Route path="/stijlen" element={<StylePage/>}/>
                    <Route path="/materiaal" element={<MaterialPage/>}/>
                    <Route path="/uploaden" element={<UploadPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </main>
            <Aside></Aside>
        </>
    )
}

export default App
