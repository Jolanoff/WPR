import { useEffect } from "react";
import api from "../api";

const UseSessionRefresh = () => {
    useEffect(() => {
        const cookieName = import.meta.env.VITE_AUTH_COOKIE_NAME;
        const hasCookie = document.cookie.includes(cookieName);
        if (hasCookie) {
            const interval = setInterval(async () => {
                try {
                    await api.get("/auth/refresh-session-explicit");
                    console.log("Sessie was succesvol vernieuwd met een nieuwe cookie");
                } catch (error) {
                    console.error("Herladen van de pagina mislukt", error);
                }
            }, 60000);

            return () => clearInterval(interval);
        }
    }, []);
};

export default UseSessionRefresh;
