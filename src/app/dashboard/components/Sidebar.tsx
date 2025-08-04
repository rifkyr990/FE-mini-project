export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">MyDashboard</h1>
      <nav>
        <ul className="space-y-4">
          <li className="hover:text-blue-300">Dashboard</li>
          <li className="hover:text-blue-300">Events</li>
          <li className="hover:text-blue-300">Transactions</li>
          <li className="hover:text-blue-300">Settings</li>
        </ul>
      </nav>
    </aside>
  );
}
