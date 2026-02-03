import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/dashboard.jpg')" }}
    >
      <h2 className="text-4xl font-bold mb-4">Dashboard</h2>
      <p className="text-lg mb-6">Welcome to your restaurant admin dashboard!</p>

      <div className="flex gap-6">
        {/* Filled yellow button */}
        <Link
          to="/menu"
          className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500 transition"
        >
          🍽 View Menu
        </Link>

        {/* Outline yellow button */}
        <Link
          to="/orders"
          className="px-6 py-3 rounded-lg border-2 border-yellow-400 text-yellow-400 font-semibold hover:bg-yellow-400 hover:text-black transition"
        >
          📦 Order Now
        </Link>
      </div>
    </div>
  );
}
