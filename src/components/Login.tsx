import React from 'react';
import './Login.css';

interface LoginProps {
  onLogin: () => void;
  isLoading: boolean;
  error: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading, error }) => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🎵 PurpleBeats</h1>
          <p>Stream your favorite music</p>
        </div>
        
        <div className="login-content">
          <p className="login-description">
            Welcome to PurpleBeats! Please authenticate with Pi Network to access your music library.
          </p>
          
          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}
          
          <button 
            className="pi-login-btn" 
            onClick={onLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading">
                <span className="spinner"></span>
                Authenticating...
              </span>
            ) : (
              <span>
                π Login with Pi Network
              </span>
            )}
          </button>
          
          <div className="login-info">
            <small>
              Secure authentication powered by Pi Network
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;