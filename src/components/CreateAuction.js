import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './CreateAuction.css'; // Make sure this path is correct
// import 'bootstrap/dist/css/bootstrap.min.css';

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
      const response = await axios.post('https://auc-sys-1.onrender.com/auctionRoute/create-auction', {
        title,
        description,
        startingBid,
        startDate,
        endDate
      }, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      console.log(response.data);
      navigate('/auction-list'); // Navigate to auction list after creation
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
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "8px 0", borderRadius: "5px", border: "1px solid #ccc" }}
        required
      />
      <label style={{ fontWeight: "bold" }}>Description:</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "8px 0", borderRadius: "5px", border: "1px solid #ccc" }}
        required
      />
      <label style={{ fontWeight: "bold" }}>Starting Bid:</label>
      <input
        type="number"
        placeholder="Starting Bid"
        value={startingBid}
        onChange={(e) => setStartingBid(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "8px 0", borderRadius: "5px", border: "1px solid #ccc" }}
        required
      />
      <label style={{ fontWeight: "bold" }}>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "8px 0", borderRadius: "5px", border: "1px solid #ccc" }}
        required
      />
      <label style={{ fontWeight: "bold" }}>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "8px 0", borderRadius: "5px", border: "1px solid #ccc" }}
        required
      />
      <button
        onClick={handleCreateAuction}
        style={{ width: "100%", padding: "12px", backgroundColor: "green", color: "white", border: "none", borderRadius: "20px", cursor: "pointer", margin: "12px 0" }}
        type="submit"
      >
        Create Auction
      </button>
      <button
        onClick={handleNavigateToAuctionList}
        style={{ width: "100%", padding: "12px", backgroundColor: "grey", color: "white", border: "none", borderRadius: "20px", cursor: "pointer", margin: "12px 0" }}
      >
        Auction List
      </button>
    </div>
  );
};

export default CreateAuction;
