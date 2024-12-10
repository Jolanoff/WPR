import api from "../api";

export const CheckRole = async (roles) => {
    try {
        const response = await api.get("/account/role"); 
        const userRoles = response.data;
        if (Array.isArray(roles)) {
            return roles.some(role => userRoles.includes(role)); 
        }
        return userRoles.includes(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        return false; 
    }
};
