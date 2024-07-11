// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const EditAuction = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [startingBid, setStartingBid] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`https://auc-sys-1.onrender.com/auctionRoute/update-auction/${id}`, {
//           headers: { 'Authorization': localStorage.getItem('token') }
//         });
//         const auction = response.data;
//         setTitle(auction.title);
//         setDescription(auction.description);
//         setStartingBid(auction.startingBid);
//         setStartDate(new Date(auction.startDate).toISOString().substring(0, 10));
//         setEndDate(new Date(auction.endDate).toISOString().substring(0, 10));
//       } catch (error) {
//         console.error('Error fetching auction:', error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const handleEditAuction = async () => {
//     try {
//       await axios.put(`https://auc-sys-1.onrender.com/auctionRoute/update-auction/${id}`, {
//         title,
//         description,
//         startingBid,
//         startDate,
//         endDate
//       }, {
//         headers: { 'Authorization': localStorage.getItem('token') }
//       });
//       navigate('/auction-list');
//     } catch (error) {
//       console.error('Error editing auction:', error);
//     }
//   };

//   return (
//     <div className="center-container">
//       <div className="form-container">
//         <h2>Edit Auction</h2>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Starting Bid"
//           value={startingBid}
//           onChange={(e) => setStartingBid(e.target.value)}
//           required
//         />
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           required
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           required
//         />
//         <button onClick={handleEditAuction}>Update Auction</button>
//       </div>
//     </div>
//   );
// };

// export default EditAuction;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


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
        const response = await axios.get(`https://auc-sys-1.onrender.com/auctionRoute/update-auction/${id}`, {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
        const { title, description, startingBid, startDate, endDate } = response.data;
        setAuction({ title, description, startingBid, startDate, endDate });
      } catch (error) {
        console.error('Error fetching auction:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleEditAuction = async () => {
    try {
      await axios.put(`https://auc-sys-1.onrender.com/auctionRoute/update-auction/${id}`, {
        title: auction.title,
        description: auction.description,
        startingBid: auction.startingBid,
        startDate: auction.startDate,
        endDate: auction.endDate
      }, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      navigate('/auction-list');
    } catch (error) {
      console.error('Error editing auction:', error);
    }
  };

  return (
    <div>
      <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Auction</h2>
        <form onSubmit={handleEditAuction}>
          <div className="form-group">
          <label style={{ fontWeight: "bold" }}>Title:</label>
            <input
              type="text"
              className="form-control"
              value={auction.title}
              onChange={(e) => setAuction({ ...auction, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Description:</label>
            <textarea
              className="form-control"
              value={auction.description}
              onChange={(e) => setAuction({ ...auction, description: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Starting Bid:</label>
            <input
              type="number"
              className="form-control"
              value={auction.startingBid}
              onChange={(e) => setAuction({ ...auction, startingBid: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Start Date:</label>
            <input
              type="date"
              className="form-control"
              value={auction.startDate}
              onChange={(e) => setAuction({ ...auction, startDate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>End Date:</label>
            <input
              type="date"
              className="form-control"
              value={auction.endDate}
              onChange={(e) => setAuction({ ...auction, endDate: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Update Auction</button>
        </form>
      </div>
    </div>
  );
};

export default EditAuction;
