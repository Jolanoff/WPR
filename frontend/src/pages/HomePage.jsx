import React from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[70vh] text-white flex flex-col items-center justify-center" 
           style={{ backgroundImage: "url('/src/assets/camper-man-vrouw.png')", backgroundSize: 'cover', backgroundPosition: 'bottom', width: '100%', height: '440px',
           }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welkom bij CarAndAll
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl">
        Flexibel huren, zorgeloos reizen.
        </p>
        <Link to="/dashboard" className="mt-6 px-6 py-3 text-white font-semibold rounded-md shadow-md hover:bg-blue-700" style={{ backgroundColor: '#29A6FF' }}>
          Aan de slag
        </Link>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 md:px-12 bg-white">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
          Waarom ons kiezen?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-semibold mb-2">Breed assortiment</h3>
            <p className="text-gray-600">
              Kies uit een breed assortiment aan voertuigen.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-semibold mb-2">Betaalbare prijzen</h3>
            <p className="text-gray-600">
              Betaalbare prijzen zonder in te leveren op comfort.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-semibold mb-2">Makkelijk te huren</h3>
            <p className="text-gray-600">
              Gemakkelijke huurprocedure dankzij de gebruiksvriendelijke interface.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-semibold mb-2">Altijd in de buurt</h3>
            <p className="text-gray-600">
              Meer dan 100 ophaalplaatsen in Nederland.
            </p>
          </div>
        </div>
      </div>
      <div className="py-16 px-6 md:px-12 bg-white" 
      style={{ backgroundImage: "url('/src/assets/camperstalling.png')", backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100%', height: '430px',}}>
        <h2 className="text-white text-2xl md:text-4xl font-bold text-center mb-8">
          Ons aanbod
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-start items-center text-center h-36">
          <h3 className="text-xl font-semibold mb-1">Auto's</h3>
            <div className="relative bg-cover bg-center h-[70vh] text-white flex flex-col items-center justify-center" 
            style={{ backgroundImage: "url('/src/assets/auto icon.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom', width: '100%', height: '440px',
            }}>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-start items-center text-center h-36">
            <h3 className="text-xl font-semibold mb-1">Campers</h3>
            <div className="relative bg-cover bg-center h-[70vh] text-white flex flex-col items-center justify-center" 
           style={{ backgroundImage: "url('/src/assets/camper icon.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom', width: '100%', height: '440px',
           }}></div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-start items-center text-center h-36">
            <h3 className="text-xl font-semibold mb-1">Caravans</h3>
            <div className="relative bg-cover bg-center h-[70vh] text-white flex flex-col items-center justify-center" 
           style={{ backgroundImage: "url('/src/assets/caravan icon.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom', width: '100%', height: '440px',
           }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
