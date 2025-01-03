import React from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[70vh] text-white flex flex-col items-center justify-center" 
           style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2023/07/30/13/04/ai-generated-8158903_1280.png')" }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to CarAndAll
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl">
          test tekst 
        </p>
        <Link to="/dashboard" className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700">
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 md:px-12 bg-white">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Choose from a wide range of cars, from compact to luxury, to fit every need.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p className="text-gray-600">
              Competitive pricing without compromising on quality or service.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Enjoy a hassle-free booking experience with our user-friendly platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
