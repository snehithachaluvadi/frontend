import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Use backend URL from environment variable
const backendURL = process.env.REACT_APP_BACKEND_URL;

const AuctionForm = ({ isEditMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      const fetchAuction = async () => {
        try {
          const response = await axios.get(`${backendURL}/api/auctions/${id}`, {
            headers: { 'Authorization': localStorage.getItem('token') }
          });
          const auction = response.data;
          setTitle(auction.title);
          setDescription(auction.description);
          setStartingBid(auction.startingBid);
          setStartDate(new Date(auction.startDate).toISOString().substring(0, 10));
          setEndDate(new Date(auction.endDate).toISOString().substring(0, 10));
        } catch (error) {
          console.error('Error fetching auction:', error);
        }
      };
      fetchAuction();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auctionData = {
      title,
      description,
      startingBid,
      startDate,
      endDate
    };

    try {
      if (isEditMode) {
        await axios.put(`${backendURL}/api/auctions/${id}`, auctionData, {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
      } else {
        await axios.post(`${backendURL}/api/auctions`, auctionData, {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
      }
      navigate('/auction-list');
    } catch (error) {
      console.error('Error saving auction:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEditMode ? 'Edit Auction' : 'Create Auction'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Starting Bid</label>
          <input
            type="number"
            className="form-control"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Update Auction' : 'Create Auction'}
        </button>
      </form>
    </div>
  );
};

export default AuctionForm;