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
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";
import PrivateRoute from "./components/PrivateRoute.jsx";
import RegisterPage from "./pages/registerPage/RegisterPage.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
                    <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
                    <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />
                    <Route path="/stijlen/:id" element={<PrivateRoute element={<StylePage />} />} />
                    <Route path="/materiaal/:id" element={<PrivateRoute element={<MaterialPage />} />} />
                    <Route path="/uploaden" element={<PrivateRoute element={<UploadPage />} />} />
                    <Route path="*" element={<PrivateRoute element={<NotFoundPage />} />} />
                    <Route path="*" element={<PublicRoute element={<LoginPage />} />} />
                </Routes>
            </main>
            <Aside />
        </>
    );
}

export default App
