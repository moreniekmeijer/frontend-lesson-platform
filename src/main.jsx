import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './global.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Router>
    </StrictMode>,
)
