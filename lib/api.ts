import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {

        if (err.response?.status !== 401 || err.config._retry) {
            return Promise.reject(err);
        }
        err.config._retry = true;

        try {
            const res = await axios.post('/api/auth/refresh');
            const { accessToken } = res.data
            localStorage.setItem("accessToken", accessToken);
            err.config.headers.authorization = `Bearer ${accessToken}`
            return api(err.config);
        } catch (refreshErr) {
            alert('Token is expired. Please login again.');
            localStorage.clear();
            await axios.post("/api/auth/signOut");
            window.location.href = "/"
            return Promise.reject(refreshErr);
        }
    }
)