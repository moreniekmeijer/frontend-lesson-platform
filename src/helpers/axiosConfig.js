import axios from "axios";

let isSetup = false;

// Maak een aparte axios instance voor de refresh call
const refreshAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});
// Deze instance heeft GEEN interceptors!

export function setupAxiosInterceptors(getAccessToken, setAccessToken, logout) {
    if (isSetup) return;
    isSetup = true;

    axios.interceptors.request.use(config => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.withCredentials = true;

        return config;
    });

    axios.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;

            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                !originalRequest.url?.endsWith("/auth/refresh")
            ) {
                originalRequest._retry = true;

                try {
                    console.log('🔄 Probeer token te refreshen...');

                    // Gebruik de aparte instance zonder interceptors
                    const response = await refreshAxios.post('/auth/refresh', {});

                    console.log('✅ Nieuwe token ontvangen');
                    setAccessToken(response.data.jwt);

                    originalRequest.headers.Authorization = `Bearer ${response.data.jwt}`;

                    return axios(originalRequest);

                } catch (refreshError) {
                    console.log('❌ Refresh gefaald, uitloggen');
                    logout();
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
}