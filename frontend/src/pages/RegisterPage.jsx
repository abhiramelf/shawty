import React, {useState} from "react";
import { registerUser } from "../services/authService"; // Adjust the import path as necessary

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please enter all fields.");
      return;
    }

    try {
      setError('');
      const userData = { name, email, password };
      const response = await registerUser(userData);
      console.log("Registration successful:", response);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred.';
      setError(errorMessage);
      console.error('Error from API:', error);
    }
  };
 
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default RegisterPage;