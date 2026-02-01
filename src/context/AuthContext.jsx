import {createContext, useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {setupAxiosInterceptors} from "../helpers/axiosConfig.js";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        accessToken: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    const logoutRef = useRef();

    const logout = useCallback(async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/logout`,
                {},
                { withCredentials: true }
            );
        } catch (e) {
            // mag falen (bijv. cookie al weg), we loggen sowieso uit
            console.warn("Logout API failed:", e);
        } finally {
            setAuth({
                isAuth: false,
                user: null,
                accessToken: null,
                status: 'done',
            });
            navigate('/inloggen');
        }
    }, [navigate]);


    logoutRef.current = logout;

    const authRef = useRef(auth);
    authRef.current = auth;

    useEffect(() => {
        setupAxiosInterceptors(
            () => authRef.current.accessToken,
            token => setAuth(prev => ({ ...prev, accessToken: token })),
            () => logoutRef.current()
        );
    }, []);

    useEffect(() => {
        async function silentLogin() {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                login(response.data.jwt);
            } catch {
                setAuth({
                    isAuth: false,
                    user: null,
                    accessToken: null,
                    status: 'done',
                });
            }
        }

        silentLogin();
    }, []);

    function login(accessToken) {
        const decoded = jwtDecode(accessToken);

        setAuth(prev => ({
            ...prev,
            accessToken
        }));

        void fetchUserData(decoded.sub, accessToken, '/');
    }

    async function fetchUserData(id, token, redirectUrl) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            const userData = response.data;

            setAuth(prev => ({
                ...prev,
                isAuth: true,
                user: {
                    id: userData.id,
                    email: userData.email,
                    fullName: userData.fullName,
                    roles: userData.authorities ?? [],
                },
                status: "done",
            }));

            if (redirectUrl) {
                navigate(redirectUrl);
            }

        } catch (e) {
            console.error(e);
            if (e.response?.status === 404 || e.response?.status === 403) {
                // Gebruiker bestaat niet of heeft geen toegang
                setAuth({
                    isAuth: false,
                    user: null,
                    accessToken: null,
                    status: 'done',
                });
            }
        }
    }

    const contextData = {
        ...auth,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p className="centerContainer">Laden...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;