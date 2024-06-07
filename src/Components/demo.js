import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Showadvertisement.css';

function FamilyDataFetcher() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for controlling the delete confirmation popup
  const [memberToDelete, setMemberToDelete] = useState(null); // State to store the member to delete

  // Function to handle delete button click
  const handleDeleteClick = (member) => {
    setMemberToDelete(member); // Store the member to delete
    setShowDeleteConfirmation(true); // Show the delete confirmation popup
  };

  // Function to handle delete confirmation
  const handleDeleteConfirmation = async () => {
    try {
      // Make an API call to update the member's IsActive status to 0
      const response = await fetch(`http://localhost:51294/api/UpdateFamilyMemberIsActive/${memberToDelete.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ IsActive: 0 })
      });

      if (response.ok) {
        // If the update is successful, remove the deleted member from the UI
        const updatedMembers = currentMembers.filter(member => member.Id !== memberToDelete.Id);
        setCurrentMembers(updatedMembers);
        setShowDeleteConfirmation(false); // Hide the delete confirmation popup
      } else {
        console.error('Failed to update member status');
      }
    } catch (error) {
      console.error('Error updating member status:', error);
    }
  };

  // Function to handle cancel button click in delete confirmation popup
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false); // Hide the delete confirmation popup
    setMemberToDelete(null); // Clear the member to delete
  };

  return (
    <>
      <div><Navbar /></div>
      <div className="courses-container">
        <button className="familymem" onClick={togglePopupfm}>Add Member</button>
        {currentMembers.map((member) => (
          <div className="course" key={member.Id}>
            <div className="course-preview">
              {/* Member details */}
            </div>
            <div className="course-info">
              {/* Member info */}
              <button onClick={() => handleDeleteClick(member)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation popup */}
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this member?</p>
          <button onClick={handleDeleteConfirmation}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </>
  );
}

export default FamilyDataFetcher;
