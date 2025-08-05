import React, { useState } from "react";
import { loginUser } from "../services/authService";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            setError('');
            const userData = { email, password };
            const response = await loginUser(userData);
            console.log("Login successful:", response);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An unexpected error occurred.';
            setError(errorMessage);
            console.error('Error from API:', error);
        }
    };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-input">Email:</label>
          <input
            id="email-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password-input">Password:</label>
          <input
            id="password-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginPage;