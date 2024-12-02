import React from "react";
import LoginForm from "../components/LoginForm.jsx";
import { RedirectIfLoggedIn } from "../utils/RedirectIfLoggedIn.jsx";


function LoginPage() {


  RedirectIfLoggedIn();

  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-50 shadow">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-center text-4xl py-4 font-semibold text-gray-700">
            Login Pagina
          </h1>
        </div>
      </header>
      <main className="flex-grow flex justify-center items-center bg-gray-100">
        <LoginForm />
      </main>
    </div>
  );
}

export default LoginPage;
