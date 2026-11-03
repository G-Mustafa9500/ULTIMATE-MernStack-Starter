import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const GoogleAuthButton = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
      if (!response.credential) {
        toast.error('Google authentication failed');
        return;
      }

      await loginWithGoogle(response.credential);

      toast.success('Google login successful!');
      navigate('/dashboard', { replace: true });

    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Google login failed'
      );
    }
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error('Google login failed')}
        text="continue_with"
        shape="rectangular"
        theme="outline"
        size="large"
        width="350"
      />
    </div>
  );
};

export default GoogleAuthButton;