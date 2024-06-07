import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import '../Advertisement/ShowAdvertisement'; // Assuming this is the correct CSS path
import axios from 'axios';
import "../Advertisement/ShowAdvertisement";
function Ads() {
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddAdsPopup, setShowAddAdsPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false); // State for controlling the edit popup display
  const [selectedAdvertisement, setSelectedAdvertisement] = useState(null); // State for storing the selected advertisement

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
      window.location.href = "/showads";
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
        const response = await fetch('http://localhost:51294/api/getAllAdvertisementadmin', {
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

  const handleEditClick = (ad) => {
    setSelectedAdvertisement(ad);
    setShowEditPopup(true); // Set state to true to display the edit popup
  };

  const handleUpdateStatus = async (status) => {
    try {
      await axios.post('http://localhost:51294/api/UpdateAds', {
        Id: selectedAdvertisement.Id,
        IsActive: status
      });
      alert(`Advertisement status updated to ${status === 1 ? 'Active' : 'Inactive'} successfully`);
      setFamilyData((prevData) =>
        prevData.map((ad) =>
          ad.Id === selectedAdvertisement.Id ? { ...ad, IsActive: status } : ad
        )
      );
      setShowEditPopup(false); 
      window.location.reload();// Close the popup
    } catch (error) {
      alert('Error updating advertisement status:', error);
    }
  };

  const token = localStorage.getItem('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
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
      
      {familyData && familyData.length > 0 && (
        <ul className="adscards">
          {familyData.map((member) => (
            <div key={member.Id}>
              <li>
                <a href="#!" className="adscard">
                  <img src={member.AdvImage} className="adscard__image" alt="" />
                  <div className="adscard__overlay">
                    <div className="adscard__header">
                      <svg className="adscard__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                      <img className="adscard__thumb" src={member.AdvImage} alt="" />
                      <div className="adscard__header-text">
                        <h3 className="adscard__title">AdvHeader: {member.AdvHeader}</h3>
                        <h3 className="adscard__title">AdvBody: {member.AdvBody}</h3>
                        <h3 className="adscard__title">Status: {member.IsActive ? 'Active' : 'Inactive'}</h3>
                        <button className="edit-button" onClick={() => handleEditClick(member)}>Edit</button>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </div>
          ))}
        </ul>
      )}

      {showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit Advertisement</h3>
            <p>Are you sure you want to activate this advertisement?</p>
            <button onClick={() => handleUpdateStatus(1)}>Yes</button>
            <button onClick={() => handleUpdateStatus(2)}>No</button>
            <button onClick={() => setShowEditPopup(false)}>Cancel</button> {/* Cancel button to close the popup */}
          </div>
        </div>
      )}
    </>
  );
}

export default Ads;
