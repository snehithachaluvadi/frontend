import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import AuctionList from './components/AuctionList';
import CreateAuction from './components/CreateAuction';
import EditAuction from './components/EditAuction';
import ContactUs from './components/ContactUs';


function App() {
    return (
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/auction-list" element={<AuctionList />} />
                <Route path="/create-auction" element={<CreateAuction />} />
                <Route path="/edit-auction/:id" element={<EditAuction />} />
                <Route path="/contactus" element={<ContactUs />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
