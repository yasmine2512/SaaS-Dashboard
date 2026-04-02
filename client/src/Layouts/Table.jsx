export default function Table() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-3">Product A</td>
            <td className="p-3">$100</td>
            <td className="p-3 text-green-500">Active</td>
          </tr>
        </tbody>

      </table>

    </div>
  );
}