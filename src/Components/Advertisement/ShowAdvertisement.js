import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './Showadvertisement.css';
import axios from 'axios';
function FamilyDataFetcher() {
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddAdsPopup, setShowAddAdsPopup] = useState(false); // State for controlling the popup display

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const userId = localStorage.getItem('FamilyMemberId');
        const response = await fetch('http://localhost:51294/api/GetAdvertisementById', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ FamilyMemberId: userId })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setFamilyData(data.Data);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddAdsClick = () => {
    setShowAddAdsPopup(true); // Set state to true to display the popup
  };
  const token = localStorage.getItem('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
    } else {
      // fetchData();
      // fetchEdu();
      // fetchOccu();
    }
  }, [token]);
  if (!isLoggedIn) {
    return <p>Page not found</p>;
  }

  return (
    <>
      <div><Navbar /></div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <button className="adsshow" onClick={handleAddAdsClick}>Add Ads</button> {/* Open popup on button click */}
      {showAddAdsPopup && (
        <div className="popup">
          <div class="containeradv">
    <div class="container-close">&times;</div>
    <img
      src="https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      alt="image"/>
    <div class="container-text">
      <h2>Ideas and UI components in your <br/>inbox</h2>
      <p>Sign up to receive ideas, free <br/> components and free resources plus 15% on all of our <br/> pro UI kits.</p>
    
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
      <input type="email" placeholder="Email address"/>
      <button type="submit" on onClick={handleSubmit}>Subscribe</button>
      <span>No spams included</span>
    </div>
</div>
          <button onClick={() => setShowAddAdsPopup(false)}>Close</button> {/* Close popup */}
        </div>
      )}
      {familyData && familyData.length > 0 && (
        <ul className="adscards">
          {familyData.map((member) => (
            <div key={member.Id}>
              <li>
                <a href="" className="adscard">
                  <img src={member.AdvImage} className="adscard__image" alt="" />
                  <div className="adscard__overlay">
                    <div className="adscard__header">
                      <svg className="adscard__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                      <img className="adscard__thumb" src={member.AdvImage} alt="" />
                      <div className="adscard__header-text">
                        <h3 className="adscard__title">AdvHeader: {member.AdvHeader}</h3>
                        <h3 className="adscard__title"> AdvBody: {member.AdvBody}</h3>
                        <h3 className="adscard__title"> Status: {member.Status}</h3>
                        {/* <span className="adscard__status">1 hour ago</span> */}
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}

export default FamilyDataFetcher;
