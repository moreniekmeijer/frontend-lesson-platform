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
import PrivateRoute from "./routes/PrivateRoute.jsx";
import RegisterPage from "./pages/registerPage/RegisterPage.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import AccountPage from "./pages/accountPage/AccountPage.jsx";
import UserManagementPage from "./pages/userManagementPage/UserManagementPage.jsx";

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
                    <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
                    <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />
                    <Route path="/account" element={<PrivateRoute element={<AccountPage />} />} />
                    <Route path="/users" element={<AdminRoute element={<UserManagementPage />} />} />
                    <Route path="/stijlen/:id" element={<PrivateRoute element={<StylePage />} />} />
                    <Route path="/materiaal/:id" element={<PrivateRoute element={<MaterialPage />} />} />
                    <Route path="/uploaden" element={<AdminRoute element={<UploadPage />} />} />
                    <Route path="*" element={<PrivateRoute element={<NotFoundPage />} />} />
                    <Route path="*" element={<PublicRoute element={<LoginPage />} />} />
                </Routes>
            </main>
            <Aside />
        </>
    );
}

export default App
