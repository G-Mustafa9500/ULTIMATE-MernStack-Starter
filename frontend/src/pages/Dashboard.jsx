import { useAuth } from '../context/AuthContext';

// ═══════════════════════════════════════════════════════════════════════════════
//  DASHBOARD  —  Replace this with your hackathon app's main UI
// ═══════════════════════════════════════════════════════════════════════════════
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Welcome Banner */}
        <div className="bg-indigo-600 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold">
            Welcome, {user?.name}! 👋
          </h1>
          <p className="text-indigo-200 mt-1 text-sm">
            Your dashboard is ready — customize it for your hackathon app.
          </p>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '📧', label: 'Email',  value: user?.email },
            { icon: '🔑', label: 'Role',   value: user?.role },
            { icon: '✅', label: 'Status', value: user?.isVerified ? 'Verified' : 'Active' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="text-3xl mb-2">{card.icon}</div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{card.label}</p>
              <p className="text-gray-800 font-semibold mt-0.5 truncate">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Customization Zone */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <p className="text-amber-700 font-semibold text-lg">🛠 Customization Zone</p>
          <p className="text-amber-600 text-sm mt-2">
            Yahan apni hackathon app ki main functionality dalo.
            User schema extend karna ho tu <code className="bg-amber-100 px-1 rounded">backend/src/models/User.js</code> mein
            comment ke neche fields add karo — automatically save ho jaye ga.
          </p>
          <ul className="mt-4 text-sm text-amber-700 list-disc list-inside space-y-1">
            <li>New routes → <code className="bg-amber-100 px-1 rounded">backend/src/routes/</code> mein file banao</li>
            <li>New pages → <code className="bg-amber-100 px-1 rounded">frontend/src/pages/</code> mein add karo</li>
            <li>Auth already done — bas feature build karo 🚀</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
