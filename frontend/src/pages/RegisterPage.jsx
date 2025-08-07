import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Optional: for success messages

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous messages
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    // Use a try/catch block to handle the asynchronous API call
    try {
      // 'await' pauses the function until the promise from registerUser is resolved
      const response = await registerUser(formData);

      console.log('Registration successful:', response);
      setSuccess('Registration successful! Please log in.');
      // Optionally, clear the form
      setFormData({ name: '', email: '', password: '' });

    } catch (err) {
      // If the service throws an error, it's caught here
      const errorMessage = err.error || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>
      <p>Join us to start creating your own short links!</p>

      <form onSubmit={handleSubmit}>
        {/* Input fields remain the same */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
            placeholder="Choose a strong password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Register</button>
      </form>

      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;