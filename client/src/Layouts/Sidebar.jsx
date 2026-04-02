import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-4">

      <h1 className="text-2xl font-bold mb-8 !mt-2 !mb-13">My App</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/products" className="hover:bg-gray-700 p-2 rounded">Products</Link>
        <Link to="/orders" className="hover:bg-gray-700 p-2 rounded">Orders</Link>
        <Link to="/users" className="hover:bg-gray-700 p-2 rounded">Users</Link>
        <Link to="/settings" className="hover:bg-gray-700 p-2 rounded">Settings</Link>
      </nav>

      <div className="mt-auto">
        <button className="w-full bg-red-500 hover:bg-red-600 p-2 rounded">
          Logout
        </button>
      </div>

    </div>
  );
}