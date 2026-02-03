import React, { useEffect, useState } from "react";
import axios from "axios";

const MenuGallery = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get("/api/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.error("Failed to fetch menu:", err));
  }, []);

  return (
    <section className="p-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Our Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {menu.map(item => (
          <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-500">{item.category}</p>
              <p className="text-indigo-600 font-bold">${item.price}</p>
              <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuGallery;