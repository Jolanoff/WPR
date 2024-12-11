import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

import UseSessionRefresh from "./hooks/useSessionRefresh";

function App() {
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
