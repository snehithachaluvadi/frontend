import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css'; // Import the CSS file
import background from "./background.jpg";
import Navbar from './Navbar';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    axios
      .post('http://localhost:8000/signin', { username, password })
      .then((response) => {
        if (response.data === 'Sign-in successful!') {
          // Redirect to the new page after successful sign-in
          navigate("/create-auction")
        } else {
          setErrorMessage(response.data);
          setSuccessMessage('');
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setSuccessMessage('');
      });
  };

  return (
    <div>
      <div className="center-container">
      <img src={background} alt="banner" className="background-image" width="960px"/>
        <div className="form-container">
          <h2>Sign In</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleSignIn}>Sign In</button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;