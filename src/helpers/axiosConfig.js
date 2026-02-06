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
            console.log('🔄 Retry request - gebruik bestaande Authorization header');
            config.withCredentials = true;
            return config;
        }

        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('📤 Request met token naar:', config.url);
        } else {
            console.log('⚠️ Request ZONDER token naar:', config.url);
        }

        config.withCredentials = true;
        return config;
    });

    axios.interceptors.response.use(
        response => {
            console.log('✅ Success response van:', response.config.url, '- Status:', response.status);
            return response;
        },
        async error => {
            console.log('❌ Error response:', {
                url: error.config?.url,
                status: error.response?.status,
                hasRetry: error.config?._retry
            });

            const originalRequest = error.config;

            // Check eerst of dit de refresh call zelf is
            if (originalRequest?.url?.includes("/auth/refresh")) {
                console.log('🚪 Refresh call zelf gefaald - logout');
                logout();
                return Promise.reject(error);
            }

            // Probeer te refreshen bij 401
            if (error.response?.status === 401 && !originalRequest?._retry) {
                console.log('🔄 Start refresh flow...');
                originalRequest._retry = true;

                try {
                    console.log('🔄 Aanroepen refresh endpoint...');
                    const response = await refreshAxios.post('/auth/refresh', {});

                    console.log('✅ Refresh succesvol! Nieuwe token ontvangen');
                    const newToken = response.data.jwt;

                    // Update token in auth context
                    setAccessToken(newToken);

                    // Update header van originele request
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    console.log('🔁 Retry origineel request naar:', originalRequest.url);

                    // Retry het originele request
                    return axios(originalRequest);

                } catch (refreshError) {
                    console.log('❌ Refresh definitief gefaald:', refreshError);
                    logout();
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
}