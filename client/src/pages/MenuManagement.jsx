// import { useState, useEffect } from "react";
// import { useAppContext } from "../context/AppContext";
// import {
//   getMenu,
//   createMenuItem,
//   updateMenuItem,
//   deleteMenuItem,
//   toggleAvailability,
// } from "../services/api";
// import MenuFormModal from "../components/MenuFormModal";

// export default function MenuManagement() {
//   const { menuItems, setMenuItems } = useAppContext();
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [editItem, setEditItem] = useState(null);

//   useEffect(() => {
//     getMenu().then((res) => setMenuItems(res.data));
//   }, [setMenuItems]);

//   const handleAdd = () => {
//     setEditItem(null);
//     setModalOpen(true);
//   };

//   const handleEdit = (item) => {
//     setEditItem(item);
//     setModalOpen(true);
//   };

//   const handleSubmit = async (formData) => {
//     if (editItem) {
//       await updateMenuItem(editItem._id, formData);
//     } else {
//       await createMenuItem(formData);
//     }
//     const res = await getMenu();
//     setMenuItems(res.data);
//     setModalOpen(false);
//   };

//   const handleDelete = async (id) => {
//     await deleteMenuItem(id);
//     setMenuItems(menuItems.filter((item) => item._id !== id));
//   };

//   const handleToggleAvailability = async (id) => {
//     await toggleAvailability(id);
//     setMenuItems(
//       menuItems.map((item) =>
//         item._id === id ? { ...item, available: !item.available } : item
//       )
//     );
//   };

//   return (
//     <div className="p-6 bg-pink-100 min-h-screen">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-2xl font-bold">Menu Management</h2>
//         <button
//           onClick={handleAdd}
//           className="px-4 py-2 border-2 border-pink-500 text-pink-500 rounded hover:bg-pink-500 hover:text-white"
//         >
//           + Add Item
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-6">
//         {menuItems.map((item) => (
//           <div key={item._id} className="p-4 bg-white rounded shadow">
//             <h3 className="font-bold">{item.name}</h3>
//             <p>{item.category}</p>
//             <p>₹{item.price}</p>
//             <p>
//               {item.available ? (
//                 <span className="text-green-600">Available</span>
//               ) : (
//                 <span className="text-red-600">Unavailable</span>
//               )}
//             </p>
//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={() => handleEdit(item)}
//                 className="px-3 py-1 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(item._id)}
//                 className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => handleToggleAvailability(item._id)}
//                 className="px-3 py-1 border border-indigo-500 text-indigo-500 rounded hover:bg-indigo-500 hover:text-white"
//               >
//                 Toggle
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <MenuFormModal
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         onSubmit={handleSubmit}
//         initialData={editItem}
//       />
//     </div>
//   );
// }

import { useState } from "react";
import Slider from "react-slick";
import axios from "axios";


export default function MenuManagement() {
  const initialItems = [
    { name: "Margherita Pizza", category: "Main Course", price: "$8.99", img: "/images/pizza.jpg" },
    { name: "Veggie Burger", category: "Main Course", price: "$6.49", img: "/images/burger.jpg" },
    { name: "Caesar Salad", category: "Starters", price: "$5.99", img: "/images/salad.jpg" },
    { name: "Pasta Alfredo", category: "Main Course", price: "$9.99", img: "/images/pasta.jpg" },
    { name: "French Fries", category: "Starters", price: "$3.99", img: "/images/fries.jpg" },
    { name: "Grilled Sandwich", category: "Snacks", price: "$4.99", img: "/images/sandwich.jpg" },
    { name: "Chocolate Cake", category: "Desserts", price: "$4.49", img: "/images/cake.jpg" },
    { name: "Ice Cream Sundae", category: "Desserts", price: "$3.99", img: "/images/icecream.jpg" },
    { name: "Lemonade", category: "Drinks", price: "$2.49", img: "/images/lemonade.jpg" },
    { name: "Coffee", category: "Drinks", price: "$2.99", img: "/images/coffee.jpg" },
  ];

  const categories = ["All", "Starters", "Snacks", "Main Course", "Desserts", "Drinks"];
  const [menuItems, setMenuItems] = useState(initialItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", category: "Starters", price: "", img: "" });
  
  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter(item => item.category === selectedCategory);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  // Add new item via backend
  const handleAddItem = async () => {
    try {
      const response = await axios.post("/api/menu", newItem);
      setMenuItems([...menuItems, response.data]); // update state with new item
      setShowModal(false);
      setNewItem({ name: "", category: "Starters", price: "", img: "" });
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200 via-orange-300 to-red-200 pt-24 text-gray-900">
      <h2 className="text-4xl font-bold mb-6 text-center">Menu Management</h2>

      {/* Category Filter Buttons  */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-800 hover:bg-indigo-100"
            }`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
        >
          + Add Item
        </button>
      </div>

      {/* Carousel */}
      <div className="px-10">
        <Slider {...settings}>
          {filteredItems.map((item, index) => (
            <div key={index} className="p-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                  <p className="text-indigo-600 font-semibold">{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal for Adding New Item */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Add New Menu Item</h3>
            <input
              type="text"
              placeholder="Name"
              value={newItem.name}
              onChange={e => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            />
            <select
              value={newItem.category}
              onChange={e => setNewItem({ ...newItem, category: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            >
              {categories.filter(c => c !== "All").map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Price"
              value={newItem.price}
              onChange={e => setNewItem({ ...newItem, price: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newItem.img}
              onChange={e => setNewItem({ ...newItem, img: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
     </div>
  );
} 