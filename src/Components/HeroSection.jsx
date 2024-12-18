// src/components/HeroSection.jsx
import React from 'react';
import petLanding from '../assets/cuteDog.png'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './LandingPage/Navbar'; // Import the Navbar

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Navbar /> {/* Add the Navbar here */}
      
      <section className="flex flex-col md:flex-row items-center justify-between px-4 py-28 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-white mt-[1%]">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-b from-neutral-900 via-amber-600 to-gray-900 bg-clip-text text-transparent">All-in-One Care for Your Beloved Pets</h1>
          <p className="text-2xl mb-6 bg-gradient-to-b from-neutral-900 via-amber-600 to-gray-900 bg-clip-text text-transparent">Book grooming, training, and vet services in one place while managing your pet's medical history effortlessly.</p>
          <button onClick={() => navigate('/auth')} className="bg-orange-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition">
            View Friends
          </button>
        </div>
        <div className="flex-1 mt-[-25%] md:mt-3">
          <img 
            src={petLanding}  
            alt="Cute Pet"
            className="w-full mt-40 max-w-xl mx-auto md:max-w-3xl"
          />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
