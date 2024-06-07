import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './Advertisement.css'; // Import your CSS file for styling

const Advertise = () => {
  const [advertisement, setAdvertisement] = useState({
    FamilyMemberId: localStorage.getItem('FamilyMemberId'),
    FamilyId: 0,
    AdvHeader: '',
    AdvBody: '',
    AdvImage: '', // Assuming this is a string to store the image
    AdvertisementPriceMatrix: 0,
    DisplayDate: '',
    IsActive: true,
    DateAdded: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdvertisement({ ...advertisement, [name]: value });
  };

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    readImageAsBase64(file);
  };

  // Convert image to Base64 string
  const readImageAsBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setAdvertisement({ ...advertisement, AdvImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:51294/api/Login/InsAdvertisement', advertisement);
      alert('Advertisement added successfully');
      window.location.href ="/showads"
    } catch (error) {
      alert('Error adding advertisement:', error);
    }
  };

  return (
   
      <><div><Navbar /></div><div className="ads">
      <div className="advertise-container">
        <h2>Advertisement Form</h2>
        <form  className='advform' onSubmit={handleSubmit}>
          <div className="form-group">
            <label>AdvHeader:</label>
            <input type="text" name="AdvHeader" value={advertisement.AdvHeader} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>AdvBody:</label>
            <input type="text" name="AdvBody" value={advertisement.AdvBody} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>AdvImage:</label>
            <input type="file" name="AdvImage" onChange={handleImageChange} />
          </div>
          <div className="form-group">
            <label>AdvertisementPriceMatrix:</label>
            <input type="number" name="AdvertisementPriceMatrix" value={advertisement.AdvertisementPriceMatrix} onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div></>
   
  );
};

export default Advertise;
