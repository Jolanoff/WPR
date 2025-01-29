import api from "../api";

export const CheckRole = async () => {
    try {
        const response = await api.get("/account/role"); 
        return response.data.roles; 
    } catch (error) {
        console.error("Error bij het ophalen van rollen:", error);
        return [];
    }
};
