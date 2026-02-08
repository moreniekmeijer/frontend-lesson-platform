import axios from "axios";

let isSetup = false;

const refreshAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export function setupAxiosInterceptors(getAccessToken, setAccessToken, logout) {
    if (isSetup) return;
    isSetup = true;

    axios.interceptors.request.use(config => {
        if (config._retry) {
            config.withCredentials = true;
            return config;
        }

        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
        }

        config.withCredentials = true;
        return config;
    });

    axios.interceptors.response.use(
        response => {
            return response;
        },
        async error => {
            const originalRequest = error.config;

            if (originalRequest?.url?.includes("/auth/refresh")) {
                logout();
                return Promise.reject(error);
            }

            if (error.response?.status === 401 && !originalRequest?._retry) {
                originalRequest._retry = true;

                try {
                    const response = await refreshAxios.post('/auth/refresh', {});

                    const newToken = response.data.jwt;

                    setAccessToken(newToken);

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    return axios(originalRequest);

                } catch (refreshError) {
                    logout();
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );
}