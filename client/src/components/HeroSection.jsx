// src/components/HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white flex flex-col md:flex-row items-center justify-between p-10">
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold mb-4">GOOD TIMES<br/>GREAT TASTES</h1>
        <button className="bg-pink-500 px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 transition">
          VIEW MORE
        </button>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="/images/featured-dish.jpg"
          alt="Featured Dish"
          className="rounded-full shadow-lg w-80 h-80 object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;