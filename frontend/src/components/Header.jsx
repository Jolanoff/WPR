import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { isLoggedIn, userRoles, logout, userInfo } = useAuthStore();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();
    const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);

    const renderLinks = () => {
        if (!userRoles) return null;
        const commonLinks = [
            { href: "/dashboard", label: "Home" },
            { href: "/contact", label: "Contact" },
            { href: "/huren", label: "Aanbod" },
        ];
        const adminLinks = [{ href: "/admin", label: "Admin Dashboard" }];

        const bedrijfLinks = [
            { href: "/abonnementen", label: "Abonnementen" },
            { href: "/bedrijf-medewerkers", label: "Beheer Medewerkers" },
            { href: "/huren-history", label: "Mijn Huuraanvragen" },
            { href: "/bedrijf/huuraanvragen", label: "Overzicht Aanvragen" },


        ];
        const BackofficeLinks = [
            { href: "/schade", label: "Schademeldingen" },
            { href: "/huuraanvragen", label: "Huuraanvragen" },
            { href: "/Voertuigen-beheer", label: "Beheren Voertuigen" },
            { href: "/uitgiften", label: "Uitgiften" },
            { href: "/innamen", label: "Innamen" },
            { href: "/schade", label: "Schades" },

        ];
        const KlantenLinks = [
            { href: "/huren-history", label: "Mijn Huuraanvragen" },

        ];

        // Combine links based on roles
        let links = [...commonLinks];

        if (userRoles.includes("Admin")) {
            links = [...links, ...adminLinks];
        }
        if (userRoles.includes("BackOfficeMedewerker")) {
            links = [...links, ...BackofficeLinks];
        }

        if (
            userRoles.some((role) =>
                ["Bedrijf", "Wagenparkbeheerder"].includes(role)
            )
        ) {
            links = [...links, ...bedrijfLinks];
        }

        if (
            userRoles.some((role) =>
                ["ZakelijkeHuurder", "ParticuliereHuurder"].includes(role)
            )
        ) {
            links = [...links, ...KlantenLinks];
        }

        return links.map((link, index) => (
            <a key={index} href={link.href} className="hover:text-blue-500">
                {link.label}
            </a>
        ));
    };
    const handleLoginClick = (e) => {
        e.preventDefault();
        navigate("/login");
    };
    const handleLogoutClick = async (e) => {
        e.preventDefault();
        await logout();
        navigate("/");
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

                {/* Navbar for desktop */}
                <nav className="hidden md:flex space-x-6 font-Alata text-lg">
                    {renderLinks()}
                </nav>

                {/* User Profile or Login */}
                <div className="flex items-center space-x-4">
                    {!isLoggedIn ? (
                        <a
                            href="#"
                            onClick={handleLoginClick}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Inloggen
                        </a>
                    ) : (
                        <div className="relative">
                            <img
                                src="src/assets/placeholder.png"
                                alt="User avatar"
                                className="w-10 h-10 rounded-full cursor-pointer"
                                onClick={toggleProfileMenu}
                            />
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border z-50 rounded shadow-md">
                                    <a
                                        href="/profiel"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Profiel
                                    </a>
                                    <a
                                        href="#"
                                        onClick={handleLogoutClick}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Uitloggen
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Navbar for mobile */}
            <div className="block md:hidden px-4 py-2">
                <nav className="flex flex-col space-y-2 font-Alata text-lg">
                    {renderLinks()}
                </nav>
            </div>
        </header>
    );
}
