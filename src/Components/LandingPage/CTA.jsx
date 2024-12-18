// src/components/CTA.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate()
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to take care of your pet?</h2>
      <p className="text-xl mb-6">Sign up today and start booking services!</p>
      <button onClick={()=> navigate('/auth')} className="bg-neutral-800 shadow-xl px-8 py-4  rounded-full text-lg font-semibold hover:-translate-y-0.5 transition">
        Get Started
      </button>
    </section>
  );
};

export default CTA;
