import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from "react-router-dom";


import UseSessionRefresh from './hooks/useSessionRefresh';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

function App() {
    const { fetchUserInfo } = useAuthStore();
    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);
    
    UseSessionRefresh();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default App;
