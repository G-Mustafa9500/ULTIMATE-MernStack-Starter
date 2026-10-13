import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate  = useNavigate();
  const [form, setForm]       = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword)
      return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { password: form.password });
      setDone(true);
      toast.success('Password reset! Redirecting…');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed or link expired');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="auth-card">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Reset Password</h1>
        <p className="text-gray-500 text-sm mb-6">Enter your new password below</p>

        {done ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">✅</div>
            <p className="font-semibold text-gray-800">Password reset!</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting to login…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'New Password',     key: 'password' },
              { label: 'Confirm Password', key: 'confirmPassword' },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="input"
                  value={form[key]}
                  onChange={set(key)}
                  placeholder="••••••••"
                />
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Resetting…' : 'Reset Password'}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link to="/login" className="text-indigo-600 hover:underline">← Back to login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
