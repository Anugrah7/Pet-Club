
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full  bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 py-4 z-10">
      <div className="container mx-auto flex justify-center">
        <Link to="/" ><h1 className="text-4xl font-bold  bg-gradient-to-b from-neutral-900 via-amber-800 to-gray-900 bg-clip-text text-transparent">PetClub</h1></Link >
      </div>
    </nav>
  );
};

export default Navbar;
