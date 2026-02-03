import { useState } from "react";
import api from "../services/api";

export default function FormModal({ isOpen, onClose, refresh }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Main Course",
    price: "",
    ingredients: "",
    preparationTime: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        preparationTime: Number(formData.preparationTime),
        ingredients: formData.ingredients.split(",").map((i) => i.trim()),
      };
      await api.post("/menu", payload);
      refresh(); // re-fetch menu items
      onClose(); // close modal
    } catch (err) {
      console.error("Failed to create menu item:", err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add New Menu Item</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option>Main Course</option>
            <option>Appetizer</option>
            <option>Dessert</option>
            <option>Beverage</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            value={formData.ingredients}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="number"
            name="preparationTime"
            placeholder="Preparation Time (minutes)"
            value={formData.preparationTime}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}