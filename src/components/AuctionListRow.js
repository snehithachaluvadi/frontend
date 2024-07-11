import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const AuctionListRow = (props) => {
  const { _id, title, description, startingBid, startDate, endDate } = props.auction;

  const handleClick = () => {
    console.log("**** Handleclickdelete")
    Axios.delete(`https://auc-sys-1.onrender.com/auctionRoute/delete-auction/${_id}`, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Auction deleted successfully');
          window.location.reload();
        } else {
          return Promise.reject();
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <tr>
      <td>{_id}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{startingBid}</td>
      <td>{new Date(startDate).toLocaleDateString()}</td>
      <td>{new Date(endDate).toLocaleDateString()}</td>
      <td style={{ display: 'flex', justifyContent: 'center' }}>
        <button style={buttonStyle}>
          <Link style={linkStyle} to={`/edit-auction/${_id}`}>Edit</Link>
        </button>
        <button onClick={handleClick} style={{ ...buttonStyle, marginLeft: '5px', backgroundColor: '#dc3545' }}>Delete</button>
      </td>
    </tr>
  );
};

const buttonStyle = {
  padding: '5px 10px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
};

export default AuctionListRow;
