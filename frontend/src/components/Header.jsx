import { Login } from './buttons/Login';

export default function Header() {
  
    return (
      <>
        <div className="h-40 w-full bg-gray-50 shadow">
          <div className="h-28 flex justify-center items-start relative">
            <img
              src="src/assets/carandall.svg"
              alt="CarAndAll logo"
              className="mt-4"
            />
            <img
              src="src/assets/placeholder.png"
              alt="User avatar"
              className="w-16 h-auto rounded-full absolute right-0 mr-12 mt-8"
            />
          </div>
          <div className="flex h-12 justify-center space-x-8 mt-2 font-Alata text-2xl">
            <a href="#" className="hover:text-blue-500">
              Home
            </a>
            <a href="#" className="hover:text-blue-500">
              Contact
            </a>

            {/* inloggen button */}
            <Login />

            <a href="#" className="hover:text-blue-500">
              Aanbod
            </a>
            <a href="#" className="hover:text-blue-500">
              Abonnementbeheer
            </a>
          </div>
        </div>
      </>
    );
  }
  