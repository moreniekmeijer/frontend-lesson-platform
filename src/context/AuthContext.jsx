import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import isTokenExpired from "../helpers/isTokenExpired.js";

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
        localStorage.setItem('token', token);

        if (isTokenExpired(token)) {
            logout();
        } else {
            const decoded = jwtDecode(token);
            void fetchUserData(decoded.sub, token, '/');
        }
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        navigate('/inloggen');
    }

    async function fetchUserData(id, token, redirectUrl) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = response.data;
            console.log(userData)

            setAuth({
                isAuth: true,
                user: {
                    id: userData.id,
                    email: userData.email,
                    fullName: userData.fullName,
                    roles: userData.authorities ?? [],
                },
                status: "done",
            });

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