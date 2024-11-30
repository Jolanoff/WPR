import React from "react";
import useUserInfo from "../hooks/useUserInfo";

function DashboardPage() {
    const { userInfo, loading, error } = useUserInfo();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userInfo) {
        return <div>No user information available.</div>;
    }

    return (
        <div className="dashboard">
            <h1>Welcome, {userInfo?.userName}!</h1>
            <p>You are a {userInfo?.roles?.join(", ")}.</p>
        </div>
    );
}

export default DashboardPage;
