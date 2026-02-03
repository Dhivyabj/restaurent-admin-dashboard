import api from "../services/api";
import { useState } from "react";

export default function OrderRow({ order, refresh }) {
  const [expanded, setExpanded] = useState(false);

  const updateStatus = async (newStatus) => {
    await api.patch(`/orders/${order._id}/status`, { status: newStatus });
    refresh();
  };

  const statusColors = {
    Pending: "bg-yellow-400",
    Preparing: "bg-blue-400",
    Ready: "bg-purple-400",
    Delivered: "bg-green-500",
    Cancelled: "bg-red-500",
  };

  return (
    <>
      <tr className="border-b">
        <td className="p-2">{order.orderNumber}</td>
        <td className="p-2">{order.customerName}</td>
        <td className="p-2">
          <span
            className={`px-2 py-1 rounded text-white ${statusColors[order.status]}`}
          >
            {order.status}
          </span>
          <select
            value={order.status}
            onChange={(e) => updateStatus(e.target.value)}
            className="ml-2 border p-1 rounded"
          >
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </td>
        <td className="p-2">₹{order.totalAmount}</td>
        <td className="p-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-600 underline"
          >
            {expanded ? "Hide" : "View"}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan="5" className="p-4 bg-gray-50">
            <h4 className="font-bold mb-2">Order Details</h4>
            <ul>
              {order.items.map((i, idx) => (
                <li key={idx}>
                  {i.menuItem?.name} × {i.quantity} — ₹{i.price}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      )}
    </>
  );
}