import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    
    // In a real application, you'd check credentials here.
    // For the mockup frontend, any login works.
    setError('');
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Admin Login</h1>
          <p className="login-subtitle">Please login to continue</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && (
            <div style={{ color: '#ef4444', fontSize: '14px', fontWeight: '600', textAlign: 'left', marginBottom: '-10px' }}>
              {error}
            </div>
          )}

          <div className="input-group">
            <span className="input-prefix-icon">
              <User size={20} />
            </span>
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <span className="input-prefix-icon">
              <Lock size={20} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="input-suffix-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="login-forgot-pwd">
            <a href="#forgot" className="forgot-pwd-link" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered email.'); }}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
