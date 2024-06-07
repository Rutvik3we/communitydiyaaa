import React, { useState } from 'react';
import './LoginRegister.css'; // Import your CSS file for styling
import axios from "axios";

const LoginRegister = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [passwordlogin, setPasswordlogin] = useState('');
  const [error, setError] = useState(null);
  const [firstname, setFirstName] = useState('');
  const [middlename, setMiddleName] = useState('');
  const [lastname, setLastName] = useState('');
  const [countrycode, setCountryCode] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  const [isForgotPasswordActive, setIsForgotPasswordActive] = useState(false);
  const [forgotPasswordLoginName, setForgotPasswordLoginName] = useState('');
  const [isOTPModalActive, setIsOTPModalActive] = useState(false);
  const [OTP, setOTP] = useState('');
  const [isUpdatePasswordModalActive, setIsUpdatePasswordModalActive] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
    // Validation
    if (!firstname || !middlename || !lastname || !countrycode || !phoneno || !emailid || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const data = {
      FirstName: firstname,
      MiddleName: middlename,
      LastName: lastname,
      CountryCode: countrycode,
      MobileNo: phoneno,
      Email: emailid,
      Password: password,
    };
    const url = 'http://localhost:51294/api/Register';
    axios.post(url, data)
      .then((response) => {
        const result = response.data.Data;
        localStorage.setItem('RegisterUserId', result);
        alert("You are Registered Successfully!");
        window.location.href = '/loginregister';

        console.log("Response:", result);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSignInClick = async (e) => {
    setIsSignUpActive(false);
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:51294/api/Login/ValidateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          LoginName: loginName,
          Password: passwordlogin
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      if (data && data.ResponseStatus === 0) {
        alert('Logged in successfully');
        localStorage.setItem('FamilyMemberId', data.Data.user[0].FamilyMemberId);
        localStorage.setItem('FamilyId', data.Data.user[0].FamilyId);
        localStorage.setItem('accessToken', data.Data.accessToken);
        localStorage.setItem('Id', data.Data.user[0].Id);
        localStorage.setItem('UserTypeId', data.Data.user[0].UserTypeId);
        window.location.href = "/afterlogin";
      } else {
        setError('Failed to login. Please try again later.');
      }
    } catch (err) {
      setError('Failed to login. Please try again later.');
      alert('Login failed');
    }
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordActive(true);
  };

  const handleSendOTP = () => {
    if (!forgotPasswordLoginName) {
      alert('Please enter your phone number or email.');
      return;
    }
    const url = 'http://localhost:51294/api/SendOTPForForgetPassword?loginName=' + forgotPasswordLoginName;
    axios.post(url)
      .then(response => {
        alert('OTP sent successfully.');
        setIsForgotPasswordActive(false);
        setIsOTPModalActive(true);
      })
      .catch(error => {
        alert('Failed to send OTP.');
      });
  };

  const handleVerifyOTP = () => {
    if (!OTP) {
      alert('Please enter the OTP.');
      return;
    }

    const url = `http://localhost:51294/api/b?loginName=${forgotPasswordLoginName}&OTPCode=${OTP}`;
    axios.post(url)
      .then(response => {
        if (response.data.ResponseStatus === 0) {
          alert('OTP verified successfully.');
          setIsOTPModalActive(false);
          setIsUpdatePasswordModalActive(true);
        } else {
          alert('Invalid OTP.');
        }
      })
      .catch(error => {
        alert('Failed to verify OTP.');
      });
  };

  const handleUpdatePassword = () => {
    if (!newPassword) {
      alert('Please enter the new password.');
      return;
    }

    const url = `http://localhost:51294/api/User/UpdateUserForgetPassword?loginName=${forgotPasswordLoginName}&password=${newPassword}`;
    axios.put(url)
      .then(response => {
        if (response.data.ResponseStatus === 0) {
          alert('Password updated successfully.');
          setIsUpdatePasswordModalActive(false);
        } else {
          alert('Failed to update password.');
        }
      })
      .catch(error => {
        alert('Failed to update password.');
      });
  };

  return (
    <>
      <div className='containerlogin'>
        <div className='loginregister'>
          <div className={`login ${isSignUpActive ? 'right-panel-active' : ''}`} id="login">
            <div className="form-login sign-up-login">
              <form action="#">
                <h1 style={{ color: "white" }}>Create Account</h1>
                <input className="logininput" name="firstName" id="txtFirstName" placeholder="First Name" required pattern="[A-Za-z]+" title="Please enter a valid first name (only letters)"
                  value={firstname} onChange={(e) => handleInputChange(e, setFirstName)} />
                <input className="logininput" name="middleName" id="txtMiddleName" placeholder="Middle Name" pattern="[A-Za-z]*" title="Please enter a valid middle name (only letters)"
                  value={middlename} onChange={(e) => handleInputChange(e, setMiddleName)} />
                <input className="logininput" name="lastName" id="txtLastName" placeholder="Last Name" required pattern="[A-Za-z]+" title="Please enter a valid last name (only letters)"
                  value={lastname} onChange={(e) => handleInputChange(e, setLastName)} />
                <input className="logininput" name="countrycode" id="txtCountryCode" placeholder="Country Code" required pattern="[0-9]+" title="Please enter a valid country code (only numbers)"
                  value={countrycode} onChange={(e) => handleInputChange(e, setCountryCode)} />
                <input className="logininput" name="mobilenumber" id="txtPhoneNo" placeholder="Phone Number" required pattern="[0-9]+" title="Please enter a valid phone number (only numbers)"
                  value={phoneno} onChange={(e) => handleInputChange(e, setPhoneNo)} />
                <input className="logininput" name="email" id="txtEmail" placeholder="name@example.com" required type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="Please enter a valid email address"
                  value={emailid} onChange={(e) => handleInputChange(e, setEmailId)} />
                <input className="logininput" type="password" name="password" id="txtPassword" placeholder="Password" required minLength="6"
                  value={password} onChange={(e) => handleInputChange(e, setPassword)} />
                <button className='buttons' type="button" onClick={handleSignUpClick}>Sign Up</button>
              </form>
            </div>
            <div className="form-login sign-in-login">
              <form action="#">
                <h1 style={{ color: "#E4E6C3", fontSize: "35px", margin: "20px" }}>Sign in</h1>
                <input className="logininput" type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)} placeholder="PhoneNumber" />
                <input className="logininput" type="password"
                  value={passwordlogin}
                  onChange={(e) => setPasswordlogin(e.target.value)} placeholder="Password" />
                <button type="button" className='fora' onClick={handleForgotPasswordClick}>Forgot your password?</button>
                <button className="buttons" type="button" onClick={handleSignInClick}>Sign In</button>
                {error && <p>{error}</p>}
              </form>
            </div>
            <div className="overlay-login">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p className='forp'>To keep connected with us please login with your personal info</p>
                  <button className="buttonsi" onClick={() => setIsSignUpActive(false)}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button className="buttonsu" onClick={() => setIsSignUpActive(true)}>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isForgotPasswordActive && (
        <div className="forgot-password-modal">
          <div className="forgot-password-content">
            <h2>Forgot Password</h2>
            <input type="text" placeholder="Enter your phone number or email"
              value={forgotPasswordLoginName} onChange={(e) => setForgotPasswordLoginName(e.target.value)} />
            <button type="button" onClick={handleSendOTP}>Send OTP</button>
            <button type="button" onClick={() => setIsForgotPasswordActive(false)}>Cancel</button>
          </div>
        </div>
      )}
      {isOTPModalActive && (
        <div className="otp-modal">
          <div className="otp-content">
            <h2>Enter OTP</h2>
            <input type="text" placeholder="Enter OTP"
              value={OTP} onChange={(e) => setOTP(e.target.value)} />
            <button type="button" onClick={handleVerifyOTP}>Verify OTP</button>
            <button type="button" onClick={() => setIsOTPModalActive(false)}>Cancel</button>
          </div>
        </div>
      )}
      {isUpdatePasswordModalActive && (
        <div className="update-password-modal">
          <div className="update-password-content">
            <h2>Update Password</h2>
            <input type="password" placeholder="Enter new password"
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button type="button" onClick={handleUpdatePassword}>Update Password</button>
            <button type="button" onClick={() => setIsUpdatePasswordModalActive(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginRegister;
