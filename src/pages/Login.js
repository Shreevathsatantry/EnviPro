import React, { useState } from 'react';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';
import { account } from '../appwrite/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        await login();
        navigate("/user");
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Please enter both email and password");
    }
  };

  const login = async () => {
    try {
      var x = await account.createEmailPasswordSession(email, password);
      console.log(x); 
    } catch (e) {
      console.error(e); // Log the error for debugging purposes
      throw new Error("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Link to="/register"><p>Create new account?</p></Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
