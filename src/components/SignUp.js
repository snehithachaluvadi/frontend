import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Username and password are required.');
      setSuccessMessage('');
      return;
    }

    axios
      .post(`${backendURL}/api/auth/signup`, { username, password })
      .then((response) => {
        if (response.data === 'User added!') {
          navigate("/create-auction");
          setSuccessMessage(response.data);
          setErrorMessage('');
        } else {
          setErrorMessage(response.data);
          setSuccessMessage('');
        }
      })
      .catch((error) => {
        setErrorMessage(error.response?.data || 'Signup failed.');
        setSuccessMessage('');
      });
  };

  return (
    <div className="center-container background2-image">
      <div className="form-container">
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button onClick={handleSignUp}>Sign Up</button>
        <p>Already have an account? <Link to="/">Sign In</Link></p>
      </div>
    </div>
  );
};

export default SignUp;