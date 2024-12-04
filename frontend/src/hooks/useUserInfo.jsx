import { useEffect, useState } from "react";
import api from "../api";

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get("/account/Account");
                console.log("User Info Response:", response.data); // Log the response to verify
                setUserInfo(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch user info");
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    return { userInfo, loading, error };
};

export default useUserInfo;
