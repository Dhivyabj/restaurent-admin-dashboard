import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <header className="bg-white-700 text-black w-full flex justify-between items-center px-8 py-4">
      {/* Left heading */}
      <h1 className="text-xl font-bold">Restaurant Admin Dashboard</h1>

      {/* Right navigation links */}
      <nav>
        <ul className="flex gap-6 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
          </li>
          <li>
            <Link to="/menu" className="hover:text-yellow-300 transition">Menu Management</Link>
          </li>
          <li>
            <Link to="/orders" className="hover:text-yellow-300 transition">Orders</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}