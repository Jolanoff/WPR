import React, { useState, useEffect } from "react";
import eventEmitter from "../utils/EventEmitter";
import { Login } from './buttons/Login';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
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

  return (
    <header className="bg-gray-50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <img
            src="src/assets/carandall.svg"
            alt="CarAndAll logo"
            className="w-28"
          />
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
          <a href="/abonnementbeheer" className="hover:text-blue-500">
            Abonnementbeheer
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <Login />
          ) : (
            <div className="relative">
              <img
                src="src/assets/placeholder.png"
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

      <div className="block md:hidden px-4 py-2">
        <nav className="flex flex-col space-y-2 font-Alata text-lg">
          <a href="/" className="hover:text-blue-500">
            Home
          </a>
          <a href="/contact" className="hover:text-blue-500">
            Contact
          </a>
          <a href="/aanbod" className="hover:text-blue-500">
            Aanbod
          </a>
          <a href="/abonnementbeheer" className="hover:text-blue-500">
            Abonnementbeheer
          </a>
        </nav>
      </div>
    </header>
  );
}
