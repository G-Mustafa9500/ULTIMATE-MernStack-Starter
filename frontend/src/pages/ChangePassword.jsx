import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const fields = [
  { label: 'Current Password',     key: 'currentPassword' },
  { label: 'New Password',         key: 'newPassword' },
  { label: 'Confirm New Password', key: 'confirmPassword' },
];

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword)
      return toast.error('New passwords do not match');
    if (form.newPassword.length < 6)
      return toast.error('New password must be at least 6 characters');
    setLoading(true);
    try {
      await api.put('/auth/change-password', {
        currentPassword: form.currentPassword,
        newPassword:     form.newPassword,
      });
      toast.success('Password changed successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="auth-card">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Change Password</h1>
        <p className="text-gray-500 text-sm mb-6">Update your current password</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ label, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type="password"
                required
                className="input"
                value={form[key]}
                onChange={set(key)}
                placeholder="••••••••"
              />
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Changing…' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
