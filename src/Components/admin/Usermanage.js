import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import '../Communitymembers/Communitymembers.css'; // Import the CSS file for styling

const Usermanage = () => {
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(2);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch family data from the API
        const response = await fetch('http://localhost:51294/api/GetAllValuesadmin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // Add body data if necessary (e.g., FamilyId)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setFamilyData(data.Data || data.Data[0]);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Logic for displaying current members
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = familyData.slice(indexOfFirstMember, indexOfLastMember);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Edit button click
  const handleEditClick = (member) => {
    setSelectedMember(member);
    setIsActive(member.IsActive === 1);
    setIsPopupOpen(true);
  };

  // Handle Save button click in popup
  const handleSaveClick = async () => {
    try {
      const response = await fetch('http://localhost:51294/api/UpdateMemberStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: selectedMember.Id,
          IsActive: isActive ? 1 : 0
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the local state to reflect the change
      setFamilyData((prevData) =>
        prevData.map((member) =>
          member.Id === selectedMember.Id ? { ...member, IsActive: isActive ? 1 : 0 } : member
        )
      );
      window.location.reload();
      // Close the popup
      setIsPopupOpen(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Handle Cancel button click in popup
  const handleCancelClick = async () => {
    try {
      const response = await fetch('http://localhost:51294/api/UpdateMemberStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: selectedMember.Id,
          IsActive: 2
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the local state to reflect the change
      setFamilyData((prevData) =>
        prevData.map((member) =>
          member.Id === selectedMember.Id ? { ...member, IsActive: 2 } : member
        )
      );
      window.location.reload();
      // Close the popup
      setIsPopupOpen(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Handle Close button click in popup
  const handleCloseClick = () => {
    setIsPopupOpen(false);
    setSelectedMember(null);
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
      <div className='communitybody'>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {currentMembers.map((member) => (
            <div key={member.FamilyMemberId}>
              <div className="card" key={member.Id}>
                <div className="profile-header-img">
                  <img src={member.Photo} alt="Profile" />
                </div>
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td className='fontweight'> Name: </td>
                        <td>{member.FirstName} {member.MiddleName} {member.LastName}</td>
                      </tr>
                      <tr>
                        <td className='fontweight'> Date of Birth: </td>
                        <td>{new Date(member.DateOfBirth).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td className='fontweight'> Blood Group: </td>
                        <td>{member.BloodGroup}</td>
                      </tr>
                      <tr>
                        <td className='fontweight'> Marital Status: </td>
                        <td>{member.MaritalStatus === 0 ? 'Single' : 'Married'}</td>
                      </tr>
                      <tr>
                        <td className='fontweight'> Contact Number: </td>
                        <td>{member.CountryCode} {member.MobileNo}</td>
                      </tr>
                      <tr>
                        <td className='fontweight'> Email Id: </td>
                        <td>{member.Email}</td>
                      </tr>
                      <tr>
                        <td className='fontweight'> Gotra: </td>
                        <td>{member.Gotra}</td>
                      </tr>
                      <tr>
                        <td className='fontweight'> Native Place: </td>
                        <td>{member.NativePlace}</td>
                      </tr>
                      <tr>
                        <td className='fontweight'> Address 1: </td>
                        <td>{member.Address1} {member.City} {member.State} {member.Country} {member.Pincode}</td>
                      </tr>
                      <tr>
                        <td className='fontweight'> Address 2: </td>
                        <td>{member.Address2}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="edit-button" onClick={() => handleEditClick(member)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='page'>
        <div className="pagination">
          {familyData.length > membersPerPage && (
            <div className="pagination">
              {Array(Math.ceil(familyData.length / membersPerPage))
                .fill()
                .map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <a onClick={() => paginate(i + 1)} href="#!" className="page-link">
                      {i + 1}
                    </a>
                  </li>
                ))}
            </div>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit Member</h3>
            <label>
              Is Active:
              <select value={isActive} onChange={(e) => setIsActive(e.target.value === 'true')}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
            <button onClick={handleCloseClick}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Usermanage;
