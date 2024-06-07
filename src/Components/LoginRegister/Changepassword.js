import React, { useState, useEffect } from 'react';

const Changepassword = () => {
    const [password, setNewPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');

    const handleChangePassword = async () => {
        // Simulating API call to change password
        try {
            // Your API call to change password here
            // Example:
            const response = await fetch('http://localhost:51294/api/Changepassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Id: localStorage.getItem('Id'),
                    Password: password
                })
            });
            // Handle the response accordingly

            // Simulating success
            setMessage('Password changed successfully.');
        } catch (error) {
            console.error('Error changing password:', error);
            setMessage('Failed to change password. Please try again.');
        }
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
          handleChangePassword();
        }
      }, [token]);
      if (!isLoggedIn) {
        return <p>Page not found</p>;
      }
    

    return (
        <>
            <button onClick={() => setShowPopup(true)}>Change Password</button>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Change Password</h2>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button onClick={handleChangePassword}>Change</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Changepassword;
