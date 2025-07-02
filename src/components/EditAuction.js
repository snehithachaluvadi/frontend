import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const EditAuction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [auction, setAuction] = useState({
    title: '',
    description: '',
    startingBid: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/auctions/update-auction/${id}`, {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
        const { title, description, startingBid, startDate, endDate } = response.data;
        setAuction({
          title,
          description,
          startingBid,
          startDate: new Date(startDate).toISOString().split('T')[0],
          endDate: new Date(endDate).toISOString().split('T')[0]
        });
      } catch (error) {
        console.error('Error fetching auction:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleEditAuction = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backendURL}/api/auctions/update-auction/${id}`, auction, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      navigate('/auction-list');
    } catch (error) {
      console.error('Error editing auction:', error);
    }
  };

  return (
    <div style={{ maxWidth: "60%", margin: "20px auto", padding: "20px", borderRadius: "5px" }}>
      <h2 style={{ fontWeight: "bold", textAlign: "center" }}>Edit Auction</h2>
      <form onSubmit={handleEditAuction}>
        <label style={{ fontWeight: "bold" }}>Title:</label>
        <input
          type="text"
          value={auction.title}
          onChange={(e) => setAuction({ ...auction, title: e.target.value })}
          style={inputStyle}
          required
        />
        <label style={{ fontWeight: "bold" }}>Description:</label>
        <textarea
          value={auction.description}
          onChange={(e) => setAuction({ ...auction, description: e.target.value })}
          style={inputStyle}
          required
        />
        <label style={{ fontWeight: "bold" }}>Starting Bid:</label>
        <input
          type="number"
          value={auction.startingBid}
          onChange={(e) => setAuction({ ...auction, startingBid: e.target.value })}
          style={inputStyle}
          required
        />
        <label style={{ fontWeight: "bold" }}>Start Date:</label>
        <input
          type="date"
          value={auction.startDate}
          onChange={(e) => setAuction({ ...auction, startDate: e.target.value })}
          style={inputStyle}
          required
        />
        <label style={{ fontWeight: "bold" }}>End Date:</label>
        <input
          type="date"
          value={auction.endDate}
          onChange={(e) => setAuction({ ...auction, endDate: e.target.value })}
          style={inputStyle}
          required
        />
        <button type="submit" style={updateButtonStyle}>
          Update Auction
        </button>
      </form>
    </div>
  );
};

// ✅ Reusing same CSS as CreateAuction
const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const updateButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  margin: "12px 0"
};

export default EditAuction;
