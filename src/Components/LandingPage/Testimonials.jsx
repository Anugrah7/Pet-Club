// src/components/Testimonials.jsx
import React from 'react';

const testimonials = [
  { name: "John Doe", text: "This platform is amazing! My pet has never been happier." },
  { name: "Jane Smith", text: "Easy to use and reliable! I highly recommend it." }
];

const Testimonials = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
      <div className="space-y-6 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg italic mb-4">"{testimonial.text}"</p>
            <p className="font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
