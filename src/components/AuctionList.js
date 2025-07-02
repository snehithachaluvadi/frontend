import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/auctions`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setAuctions(response.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };
    fetchAuctions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendURL}/api/auctions/delete-auction/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setAuctions(auctions.filter((auction) => auction._id !== id));
    } catch (error) {
      console.error('Error deleting auction:', error);
    }
  };

  const handleNavigateToCreateAuction = () => {
    navigate('/create-auction');
  };

  return (
    <div className="container mt-5">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Auction List</h2>
      <table style={tableStyle}>
        <thead>
          <tr style={theadRowStyle}>
            <th style={thTdStyle}>Title</th>
            <th style={thTdStyle}>Description</th>
            <th style={thTdStyle}>Starting Bid</th>
            <th style={thTdStyle}>Start Date</th>
            <th style={thTdStyle}>End Date</th>
            <th style={thTdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((auction) => (
            <tr key={auction._id} style={rowStyle}>
              <td style={thTdStyle}>{auction.title}</td>
              <td style={thTdStyle}>{auction.description}</td>
              <td style={thTdStyle}>{auction.startingBid}</td>
              <td style={thTdStyle}>{new Date(auction.startDate).toLocaleDateString()}</td>
              <td style={thTdStyle}>{new Date(auction.endDate).toLocaleDateString()}</td>
              <td style={{ ...thTdStyle, ...actionCellStyle }}>
                <Link
                  to={`/edit-auction/${auction._id}`}
                  style={{ ...buttonBase, textDecoration: "none", backgroundColor: '#28a745' }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(auction._id)}
                  style={{ ...buttonBase, backgroundColor: '#dc3545' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleNavigateToCreateAuction}
        style={{ ...listButtonStyle }}
      >
        Create Auction
      </button>
    </div>
  );
};

// ✅ Styles

const tableStyle = {
  width: '90%',
  margin: '20px auto',
  borderCollapse: 'collapse',
  fontFamily: 'Segoe UI, sans-serif',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const theadRowStyle = {
  backgroundColor: '#f5f5f5',
  borderBottom: '2px solid #ccc',
};

const rowStyle = {
  borderBottom: '1px solid #ddd',
};

const thTdStyle = {
  padding: '12px 10px',
  textAlign: 'center',
  border: '1px solid #ccc',
};

const actionCellStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
};

const buttonBase = {
  width: "100%",
  padding: "12px",
  backgroundColor: "grey",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  margin: "12px 0"
};

const listButtonStyle = {
  display: "block",           // makes it a block element
  width: "fit-content",       // button fits the text + padding
  padding: "12px 120px",       // more space inside the button
  backgroundColor: "grey",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  margin: "20px auto",        // centers horizontally
};

export default AuctionList;
