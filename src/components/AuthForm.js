import React, { useState } from 'react';
import api from '../api';

export default function AuthForm({ mode = 'login', onClose, onAuthSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const path = mode === 'login' ? '/auth/login' : '/auth/register';
      const res = await api.post(`/auth/${mode}`, { username, password });
      // res.data should include { token, user }
      const auth = res.data;
      if (auth && auth.token) {
        localStorage.setItem('auth', JSON.stringify(auth));
        // set axios header is handled by api interceptor
        onAuthSuccess(auth);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Auth failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2), 0 0 60px rgba(139, 92, 246, 0.1); }
          50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3), 0 0 90px rgba(139, 92, 246, 0.2); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .backdrop {
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
        }
        
        .backdrop::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
          top: -250px;
          left: -250px;
          animation: float 8s ease-in-out infinite;
        }
        
        .backdrop::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%);
          bottom: -200px;
          right: -200px;
          animation: float 10s ease-in-out infinite;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 48px 40px;
          min-width: 380px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          position: relative;
          z-index: 10000;
          animation: glow 3s ease-in-out infinite;
        }
        
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5), rgba(59, 130, 246, 0.5));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        .title {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 12px 0;
          text-align: center;
          letter-spacing: -0.5px;
        }
        
        .subtitle {
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          margin: 0 0 32px 0;
          font-size: 14px;
        }
        
        .error-box {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 12px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 14px;
          text-align: center;
        }
        
        .form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .input-group {
          position: relative;
        }
        
        .input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #fff;
          font-size: 15px;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        
        .input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
        }
        
        .input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        
        .input-focused {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
        }
        
        .button-group {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }
        
        .btn-primary {
          flex: 1;
          background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
          color: #fff;
          border: none;
          padding: 14px 24px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .btn-primary:hover::before {
          left: 100%;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
        }
        
        .btn-primary:active {
          transform: translateY(0);
        }
        
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .btn-secondary {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 14px 24px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .btn-secondary:active {
          transform: translateY(0);
        }
        
        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div className="glass-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="title">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
        <p className="subtitle">{mode === 'login' ? 'Enter your credentials to continue' : 'Sign up to get started'}</p>
        
        {error && <div className="error-box">{error}</div>}
        
        <form onSubmit={submit} className="form">
          <div className="input-group">
            <input
              className={`input ${focusedInput === 'username' ? 'input-focused' : ''}`}
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          
          <div className="input-group">
            <input
              className={`input ${focusedInput === 'password' ? 'input-focused' : ''}`}
              placeholder="Password"
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          
          <div className="button-group">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading && <span className="loading-spinner"></span>}
              {loading ? 'Please wait...' : (mode === 'login' ? 'Login' : 'Register')}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}