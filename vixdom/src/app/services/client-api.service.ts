import axios from "axios";
// import Cookies from "js-cookie";
// import { clearCookies } from "./cookies-handler";

const API_URL = process.env.API_URL || "localhost:8080";

export const API = axios.create({
    baseURL: API_URL,
});

// const urlsToCheck = new Set([
//     "/admin/request/otp",
//     "/admin/verify/otp",
//     "/admin/validateLogin",
// ]);

// API.interceptors.request.use(async (config) => {
//     if (
//         config.url &&
//         typeof config.url === "string" &&
//         urlsToCheck.has(config.url)
//     ) {
//         return config;
//     }

//     const accessToken = Cookies.get("accessToken");
//     if (accessToken) {
//         config.headers.set("Authorization", accessToken);
//     } else {
//         console.error("Client AccessToken not found!");
//     }
//     return config;
// });

// API.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         const originalRequest = error.config;

//         if (
//             originalRequest.url &&
//             typeof originalRequest.url === "string" &&
//             urlsToCheck.has(originalRequest.url)
//         ) {
//             return Promise.reject(error);
//         }

//         if (
//             error.response.status === 401 &&
//             originalRequest.url === "/admin/refresh/token"
//         ) {
//             clearCookies();
//             console.log("reload page below");
//             window.location.href = "/login";
//             return Promise.reject(error);
//         }

//         if (error.response.status === 401) {
//             const refreshToken = Cookies.get("refreshToken");
//             const authToken = Cookies.get("accessToken");
//             return API.post("/admin/refresh/token", {
//                 authorization: authToken,
//                 refreshToken: refreshToken,
//                 userName: Cookies.get("user"),
//                 gymId: Cookies.get("gymId")
//             }).then((res) => {
//                 if (res.status === 200) {
//                     Cookies.set("accessToken", res.data.authorization);
//                     Cookies.set("refreshToken", res.data.refreshToken);
//                     originalRequest.headers["Authorization"] = Cookies.get("accessToken");
//                     return axios(originalRequest);
//                 }
//             });
//         }
//         return Promise.reject(error);
//     },
// );
