import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const AuctionList = () => {
    const [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/auctionRoute/', {
                    headers: { 'Authorization': localStorage.getItem('token') }
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
            await axios.delete(`http://localhost:8000/auctionRoute/delete-auction/${id}`, {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            setAuctions(auctions.filter(auction => auction._id !== id));
        } catch (error) {
            console.error('Error deleting auction:', error);
        }
    };

    const handleNavigateToCreateAuction = () => {
        navigate('/create-auction');
    };

    return (
        <div className="container mt-5">
            <h2 style={{ textAlign: 'center' }}>Auction List</h2>
            <table style={tableStyle} className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Starting Bid</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {auctions.map((auction) => (
                        <tr key={auction._id}>
                            <td>{auction.title}</td>
                            <td>{auction.description}</td>
                            <td>{auction.startingBid}</td>
                            <td>{new Date(auction.startDate).toLocaleDateString()}</td>
                            <td>{new Date(auction.endDate).toLocaleDateString()}</td>
                            <td style={{ display: 'flex', justifyContent: 'center' }}>
                                <button style={buttonStyle}>
                                    <Link style={linkStyle} to={`/edit-auction/${auction._id}`}>Edit</Link>
                                </button>
                                <button onClick={() => handleDelete(auction._id)} style={{ ...buttonStyle, marginLeft: '5px', backgroundColor: '#dc3545' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={handleNavigateToCreateAuction}
                style={{ ...buttonStyle, backgroundColor: 'grey', display: 'block', margin: '20px auto 0', width: 'auto' }}
            >
                Create Auction
            </button>
        </div>
    );
};


const tableStyle = {
    width: '80%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    border: '2px solid black',
    color: 'black',
    marginLeft: '140px',
};

const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
};

const tableRowStyle = {
    borderBottom: '1px solid black',
};

const tableCellStyle = {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid black',
};

const buttonStyle = {
    padding: '5px 10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
};

export default AuctionList;
