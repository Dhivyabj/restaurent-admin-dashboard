import api from "../services/api";

export default function MenuCard({ item, refresh }) {
  const toggleAvailability = async () => {
    try {
      await api.patch(`/menu/${item._id}/availability`);
      refresh(); // re-fetch menu items after toggle
    } catch (err) {
      console.error("Failed to toggle availability:", err.message);
    }
  };

  return (
    <div className="border p-4 rounded shadow flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <p className="mt-2">₹{item.price} • {item.category}</p>
        <p className="mt-1">
          {item.isAvailable ? "Available ✅" : "Unavailable ❌"}
        </p>
      </div>
      <button
        onClick={toggleAvailability}
        className={`mt-4 px-3 py-1 rounded ${
          item.isAvailable ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}
      >
        {item.isAvailable ? "Mark Unavailable" : "Mark Available"}
      </button>
    </div>
  );
}