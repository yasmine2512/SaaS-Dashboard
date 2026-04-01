export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-2xl font-bold">$12,000</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">Users</h3>
          <p className="text-2xl font-bold">1,230</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">Orders</h3>
          <p className="text-2xl font-bold">320</p>
        </div>

      </div>

      {/* Chart placeholder */}
      <div className="bg-white p-6 rounded-2xl shadow h-80 flex items-center justify-center">
        Chart goes here 📈
      </div>

    </div>
  );
}