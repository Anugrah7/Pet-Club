// src/components/Features.jsx
import React from 'react';

const features = [
  { title: "Book Services", description: "Book grooming, training, and vet services.", icon: "🐶" },
  { title: "Pet Profiles", description: "Manage your pet’s medical history.", icon: "🐾" },
  { title: "Community Forum", description: "Engage with fellow pet owners for advice.", icon: "💬" },
  { title: "Emergency Locator", description: "Find nearby emergency vets and services.", icon: "📍" }
];

const Features = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
      <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:-translate-y-1.5 hover:shadow-xl hover:transition-transform">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
