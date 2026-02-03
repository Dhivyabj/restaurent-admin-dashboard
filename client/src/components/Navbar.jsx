import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Restaurant Admin Dashboard</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/menu" className="hover:underline">Menu Management</Link>
        <Link to="/orders" className="hover:underline">Orders</Link>
      </div>
    </nav>
  );
};

export default Navbar;