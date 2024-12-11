import React, { useState, useEffect } from "react";
import eventEmitter from "../utils/EventEmitter";
import { Login } from "./buttons/Login";
import CarAndAllLogo from "../assets/carandall.svg";
import placeholder from "../assets/placeholder.png";
import useUserInfo from "../hooks/useUserInfo";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const { userInfo, loading, error } = useUserInfo(); // Always call the hook unconditionally
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const updateLoginState = (loggedIn) => {
      setIsLoggedIn(loggedIn);
    };

    const handleAccountDeleted = () => {
      setIsLoggedIn(false);
      setShowProfileMenu(false);
      localStorage.removeItem("isLoggedIn");
    };

    eventEmitter.on("login", updateLoginState);
    eventEmitter.on("accountDeleted", handleAccountDeleted);

    return () => {
      eventEmitter.off("login", updateLoginState);
      eventEmitter.off("accountDeleted", handleAccountDeleted);
    };
  }, []);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  if (loading) return <div>Loading...</div>; // Show loading state if needed
  if (error) return <div>Error: {error.message}</div>; // Handle any errors

  return (
    <header className="bg-gray-50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <img src={CarAndAllLogo} alt="CarAndAll logo" className="w-28" />
        </div>

        <nav className="hidden md:flex space-x-6 font-Alata text-lg">
          <a href="/" className="hover:text-blue-500">
            Home
          </a>
          <a href="/contact" className="hover:text-blue-500">
            Contact
          </a>
          <a href="/aanbod" className="hover:text-blue-500">
            Aanbod
          </a>
          <a href="/abonnementen" className="hover:text-blue-500">
            Abonnementbeheer
          </a>

          <a
            href={
              userInfo?.roles?.includes("Bedrijf")
                ? "/bedrijf/huren"
                : userInfo?.roles?.includes("ParticuliereHuurder")
                ? "/particulier/huren"
                : "#"
            }
            className="hover:text-blue-500"
          >
            Huren
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <Login />
          ) : (
            <div className="relative">
              <img
                src={placeholder}
                alt="User avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleProfileMenu}
              />
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                  <a
                    href="/profiel"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profiel
                  </a>
                  <Login />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
