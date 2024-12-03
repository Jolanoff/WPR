import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import eventEmitter from "../../utils/EventEmitter";

export function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      eventEmitter.emit("login", false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const handleAccountDeleted = () => {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    };

    eventEmitter.on("accountDeleted", handleAccountDeleted);

    return () => {
      eventEmitter.off("accountDeleted", handleAccountDeleted);
    };
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Uitloggen
        </a>
      ) : (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Inloggen
        </a>
      )}
    </>
  );
}
