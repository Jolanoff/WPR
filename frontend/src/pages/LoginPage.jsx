import Header from "../components/Header.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Footer from "../components/Footer.jsx";

export default function LoginPage() {
    return (
        <>
            <Header />
            <h1 className="font-Alata text-5xl text-center mt-8">
                Inloggen als particulier
            </h1>
            <LoginForm></LoginForm>
            <Footer></Footer>
        </>
    );
}
