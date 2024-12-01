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


            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Three Column Layout</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-2">sam</h2>
                        <p className="text-gray-600">hello hello hello</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-2">sam</h2>
                        <p className="text-gray-600">hello hello hello</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-2">sam</h2>
                        <p className="text-gray-600">hello hello hello</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-2">sam</h2>
                        <p className="text-gray-600">hello hello hello</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-2">sam</h2>
                        <p className="text-gray-600">hello hello hello</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-2">sam</h2>
                        <p className="text-gray-600">hello hello hello</p>
                    </div>

                </div>
            </div>
        </div>

            );
}

export default DashboardPage;
