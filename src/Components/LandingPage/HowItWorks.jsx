// src/components/HowItWorks.jsx
import React from 'react';

const steps = [
  { title: "Add Pet Profile", description: "Create and manage your pet's profile." },
  { title: "Book Services", description: "Choose from grooming, vet visits, and more." },
  { title: "Get Reminders", description: "Stay updated with appointment reminders and care tips." }
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0">
        {steps.map((step, index) => (
          <div key={index} className="text-center w-full md:w-1/3">
            <div className="text-4xl mb-4">{`#${index + 1}`}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
