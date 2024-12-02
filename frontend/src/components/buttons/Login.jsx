import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import eventEmitter from "../../utils/EventEmitter";

export function Login() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const validateSession = async () => {
        try {
            const response = await api.get("/auth/validate-session"); // Replace with your endpoint
            if (response.data.isValid) {
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", "true");
            } else {
                setIsLoggedIn(false);
                localStorage.setItem("isLoggedIn", "false");
            }
        } catch (error) {
            console.error("Session validation failed", error);
            setIsLoggedIn(false);
            localStorage.setItem("isLoggedIn", "false");
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            localStorage.setItem("isLoggedIn", "false");
            eventEmitter.emit("login", false);
            setIsLoggedIn(false);
            navigate("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        // Validate session on component mount
        validateSession();

        // Listen for login/logout events
        const updateLoginState = (loggedIn) => setIsLoggedIn(loggedIn);
        eventEmitter.on("login", updateLoginState);

        return () => {
            eventEmitter.off("login", updateLoginState);
        };
    }, []);

    return (
        <>
            {isLoggedIn ? (
                <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="hover:text-blue-500">
                    Uitloggen
                </a>
            ) : (
                <a href="#" onClick={(e) => { e.preventDefault(); handleLogin(); }} className="hover:text-blue-500">
                    Inloggen
                </a>
            )}
        </>
    );
}
