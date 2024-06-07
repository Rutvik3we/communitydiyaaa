import React, { useState } from 'react';
import './Popup.css'; // Import CSS for styling the popup

const Popup = ({ userId }) => {
  const [newPassword, setNewPassword] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      const response = await fetch('http://localhost:51294/api/General/Changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UsersId: userId,
          NewPassword: newPassword
        })
      });

      if (response.ok) {
        setMessage('Password changed successfully.');
      } else {
        setMessage('Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={`popup ${popupVisible ? 'open' : ''}`}>
      <div className="popup-inner">
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change</button>
        <button onClick={() => setPopupVisible(false)}>Cancel</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Popup;


//http://localhost:51294/api/General/Changepassword