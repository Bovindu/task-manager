import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      // Send the credential to your backend for verification
      const response = await axios.post('http://localhost:5000/api/auth/google', {
        token: credentialResponse.credential
      },{
        headers: {
        'Content-Type': 'application/json'
        }
      });
      
      // Store the received token (you might get JWT from your backend)
      localStorage.setItem('token', response.data.token);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check console for details.');
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Task Manager Login</h1>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            theme="filled_blue"
            size="large"
            width="300"
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}