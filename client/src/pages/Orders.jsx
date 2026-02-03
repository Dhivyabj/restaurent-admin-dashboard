
export default function Orders() {
  const orders = [
    { id: "ORD001", customer: "John Doe", status: "Ready", total: "₹650" },
    { id: "ORD002", customer: "Jane Smith", status: "Delivered", total: "₹340" },
    { id: "ORD003", customer: "Michael Lee", status: "Pending", total: "₹420" },
    { id: "ORD004", customer: "Sara Khan", status: "Cancelled", total: "₹210" },
    { id: "ORD005", customer: "David Brown", status: "Ready", total: "₹780" },
  ];

  return (
    <div className="min-h-screen bg-pink-100 text-gray-900">
      <div className="max-w-5xl mx-auto py-8 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-700">
          Orders
        </h2>

        {/* Filter dropdown */}
        <div className="flex justify-end mb-4">
          <select className="px-4 py-2 rounded-lg border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="bg-pink-500 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Order #</th>
                <th className="py-2 px-4 text-left">Customer</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-pink-50">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.customer}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Ready"
                          ? "bg-purple-200 text-purple-800"
                          : order.status === "Delivered"
                          ? "bg-green-200 text-green-800"
                          : order.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">{order.total}</td>
                  <td className="py-2 px-4">
                    <button className="px-4 py-2 rounded-lg border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="px-6 py-2 rounded-lg border-2 border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white transition">
            Prev
          </button>
          <button className="px-6 py-2 rounded-lg border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}