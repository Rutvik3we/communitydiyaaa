import React, { useState } from "react";
import axios from "axios";
import logo from './Images/logo.jpg';
//import img1 from './Images/img1.jpg';

function Register() {
  const [firstname, setFirstName] = useState('');
  const [middlename, setMiddleName] = useState('');
  const [lastname, setLastName] = useState('');
  const [countrycode, setCountryCode] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSave = () => {
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
      .then(() => {
        alert("You are Registered Successfully!");
        window.location.href = '/'; // Redirect to another page
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <header className="showcase">
        <div className="logo">
          <img src={logo} alt="" />
        </div>

        <div className="showcase-content">
          <div className="formm">
            <form>
              <h1>Sign Up</h1>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="info">
                <input className="email" name="firstName" id="txtFirstName" placeholder="First Name" required
                  value={firstname} onChange={(e) => handleInputChange(e, setFirstName)} />
                <input className="email" name="middleName" id="txtMiddleName" placeholder="Middle Name" required
                  value={middlename} onChange={(e) => handleInputChange(e, setMiddleName)} />
                <input className="email" name="lastName" id="txtLastName" placeholder="Last Name" required
                  value={lastname} onChange={(e) => handleInputChange(e, setLastName)} />
                <input className="email" name="countrycode" id="txtCountryCode" placeholder="Country Code" required
                  value={countrycode} onChange={(e) => handleInputChange(e, setCountryCode)} />
                <input className="email" name="mobilenumber" id="txtPhoneNo" placeholder="Phone Number" required
                  value={phoneno} onChange={(e) => handleInputChange(e, setPhoneNo)} />
                <input className="email" name="email" id="txtEmail" placeholder="name@example.com" required
                  value={emailid} onChange={(e) => handleInputChange(e, setEmailId)} />
                <input className="email" name="password" id="txtPassword" placeholder="Password" required
                  value={password} onChange={(e) => handleInputChange(e, setPassword)} />
              </div>
              <div className="btn">
                <button className="btn-primary" type="button" onClick={handleSave}>Sign Up</button>
              </div>
            </form>
          </div>
          <div className="signup">
            <p>New ?</p>
            <a href="/">Sign In</a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Register;