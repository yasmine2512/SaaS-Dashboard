export default function Topbar() {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative">
          🔔
          <span className="absolute -top-1 -right-2 bg-red-500 text-xs px-1 rounded-full">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>

    </div>
  );
}