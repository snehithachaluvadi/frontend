import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const CreateAuction = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateAuction = async () => {
    if (!title || !description || !startingBid || !startDate || !endDate) {
      setError('All fields are required');
      return;
    }
    setError('');

    try {
      const response = await axios.post(`${backendURL}/api/auctions/create-auction`, {
        title,
        description,
        startingBid,
        startDate,
        endDate
      }, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      console.log(response.data);
      navigate('/auction-list');
    } catch (error) {
      console.error('There was an error creating the auction!', error);
      setError('Failed to create auction. Please try again.');
    }
  };

  const handleNavigateToAuctionList = () => {
    navigate('/auction-list');
  };

  return (
    <div style={{ maxWidth: "60%", margin: "20px auto", padding: "20px", borderRadius: "5px" }}>
      <h2 style={{ fontWeight: "bold", textAlign: "center" }}>Create Auction</h2>
      {error && <div className="error">{error}</div>}

      <label style={{ fontWeight: "bold" }}>Title:</label>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} required />

      <label style={{ fontWeight: "bold" }}>Description:</label>
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} required />

      <label style={{ fontWeight: "bold" }}>Starting Bid:</label>
      <input type="number" placeholder="Starting Bid" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} style={inputStyle} required />

      <label style={{ fontWeight: "bold" }}>Start Date:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} required />

      <label style={{ fontWeight: "bold" }}>End Date:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} required />

      <button onClick={handleCreateAuction} style={createButtonStyle} type="submit">Create Auction</button>

      <button onClick={handleNavigateToAuctionList} style={listButtonStyle}>Auction List</button>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const createButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  margin: "12px 0"
};

const listButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "grey",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  margin: "12px 0"
};

export default CreateAuction;