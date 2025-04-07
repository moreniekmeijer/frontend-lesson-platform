import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import isTokenExpired from "../helpers/isTokenExpired.jsx";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            if (isTokenExpired(token)) {
                logout();
            } else {
                const decoded = jwtDecode(token);
                void fetchUserData(decoded.sub, token);
            }
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(token) {
        console.log('Inloggen met token:', token);
        localStorage.setItem('token', token);

        if (isTokenExpired(token)) {
            console.log('Token is expired tijdens login!');
            logout();
        } else {
            const decoded = jwtDecode(token);
            void fetchUserData(decoded.sub, token, '/');
        }
    }

    function logout() {
        localStorage.clear();
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        console.log('Gebruiker is uitgelogd!');
        navigate('/login');
    }

    async function fetchUserData(id, token, redirectUrl) {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            setAuth(prev => ({
                ...prev,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
            }));


            if (redirectUrl) {
                navigate(redirectUrl);
            }

        } catch (e) {
            console.error(e);
            localStorage.removeItem('token');
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }

    }

    const contextData = {
        ...auth,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;