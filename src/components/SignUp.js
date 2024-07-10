import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate} from 'react-router-dom';
import './SignUp.css'; // Import the CSS file
import Navbar from './Navbar';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Patient');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Client-side validation
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Username and password are required fields.');
      setSuccessMessage('');
      return;
    }

    axios
      .post('http://localhost:8000/signup', { username, password, userType })
      .then((response) => {
        if (response.data === 'User added!') {
          navigate("/create-auction")
          setSuccessMessage(response.data);
          setErrorMessage('');
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
    <div className="center-container background2-image">
      
      <div className="form-container">
        
        <h2>Sign Up</h2>
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
        {/* <label>User Type:</label>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
          <option value="Admin">Admin</option>
        </select> */}
        <button onClick={handleSignUp}>Sign Up</button>
        <p>
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignUp;