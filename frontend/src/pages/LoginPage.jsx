import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import the login service function
import { loginUser } from '../services/authService';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Add state for error handling
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Refactor handleSubmit for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      // Call the loginUser service function
      const response = await loginUser(formData);

      if (response.token) {
        localStorage.setItem('token', response.token);
        console.log('Token saved in localStorage successfully');
        navigate('/dashboard'); // Redirect to the dashboard or another page
      }
      else {
        setError('Login failed. Please check your credentials.');
      }

    } catch (err) {
      // Handle login errors, e.g., "Invalid credentials"
      const errorMessage = err.error || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back!</h2>
      <p>Log in to access your dashboard.</p>

      <form onSubmit={handleSubmit}>
        {/* Input fields remain the same */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>

      {/* Conditionally render the error message */}
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

      <p className="auth-switch">
        Don't have an account? <Link to="/register">Register now</Link>
      </p>
    </div>
  );
};

export default LoginPage;