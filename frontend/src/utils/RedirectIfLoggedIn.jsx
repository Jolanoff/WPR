import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RedirectIfLoggedIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) {
            navigate("/dashboard"); 
        }
    }, [navigate]);
};
