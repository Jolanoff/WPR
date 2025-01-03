import React from "react";
import LoginForm from "../components/LoginForm.jsx";
import { RedirectIfLoggedIn } from "../utils/RedirectIfLoggedIn.jsx";


function LoginPage() {


  RedirectIfLoggedIn();

  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex justify-center items-center bg-gray-100">
        <LoginForm />
      </main>
    </div>
  );
}

export default LoginPage;
