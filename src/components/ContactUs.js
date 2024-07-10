import React from 'react';
import './ContactUs.css';


function ContactUs() {
  const locations = [
    { title: "Ch.V.Snehitha", address: "22BCE1417", phone: "6300384492", email: "ch.vsnehitha2022@vitstudent.ac.in" },
    { title: "Mahathi Ande", address: "22BCE5054", phone: "9381740919", email: "ande.mahathi2022@vitstudent.ac.in" },
    { title: "Ankam Sanjana", address: "22BCE1374", phone: "8977893103", email: "ankam.sanjana2022@vitstudent.ac.in" },
    { title: "Vasu Desai", address: "22BCE1501", phone: "9265866575", email: "vasu.desai2022@vitstudent.ac.in" },
  ];

  const handlePhoneClick = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="contactus">
      <div className="contact-header">
        <h1>Contact Us</h1>
      </div>
      <div className="address-boxes">
        {locations.map((location, index) => (
          <div key={index} className="address-box">
            <div className="doctor-symbol">👨</div>
            <h2>{location.title}</h2>
            <p>{location.address}</p>
            <p className="phone" onClick={() => handlePhoneClick(location.phone)}>
              Phone: {location.phone}
            </p>
            <p className="email" onClick={() => handleEmailClick(location.email)}>
              Email: {location.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactUs;