import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import eventEmitter from "../../utils/EventEmitter";

export function Login() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");

            // Update localStorage and emit logout event
            localStorage.setItem("isLoggedIn", "false");
            eventEmitter.emit("login", false);

            setIsLoggedIn(false);
            navigate("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        const updateLoginState = (loggedIn) => {
            setIsLoggedIn(loggedIn);
        };

        // Listen for login/logout events
        eventEmitter.on("login", updateLoginState);

        // Cleanup listener on unmount
        return () => {
            eventEmitter.on("login", updateLoginState);
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
