import { useState, useEffect } from "react";
import { CheckRole } from "./CheckRole";

const UseAuthorization = (allowedRoles) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userRoles, setUserRoles] = useState(null); 

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                if (!userRoles) { 
                    const roles = await CheckRole();
                    setUserRoles(roles);
                    if (roles.some((role) => allowedRoles.includes(role))) {
                        setIsAuthorized(true);
                    }
                } else if (userRoles.some((role) => allowedRoles.includes(role))) {
                    setIsAuthorized(true);
                }
            } catch (error) {
                console.error("Error checking roles:", error);
            }
        };

        fetchUserRole();
    }, [allowedRoles, userRoles]); 

    return { isAuthorized, userRoles };
};

export default UseAuthorization;
