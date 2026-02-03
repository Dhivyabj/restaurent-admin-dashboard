import { useEffect, useState } from "react";
import { getOrder } from "../services/api";

export default function OrderDetailsModal({ isOpen, onClose, orderId }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && orderId) {
      setLoading(true);
      getOrder(orderId)
        .then((res) => setOrder(res.data))
        .finally(() => setLoading(false));
    }
  }, [isOpen, orderId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Customer:</strong> {order.customer}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
            <ul className="space-y-2">
              {order.menuItems.map((item) => (
                <li
                  key={item._id}
                  className="border rounded p-2 flex justify-between"
                >
                  <span>{item.name} ({item.category})</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-pink-500 text-pink-500 rounded hover:bg-pink-500 hover:text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}