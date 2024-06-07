
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import "./Profile.css";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function FamilyDataFetcher() {
 //start occupation
const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for controlling the delete confirmation popup
const [memberToDelete, setMemberToDelete] = useState(null); // State to store the member to delete

// Function to handle delete button click
const handleDeleteClick = (education) => {
  setMemberToDelete(education); // Store the member to delete
  setShowDeleteConfirmation(true); // Show the delete confirmation popup
};

const handleDeleteClickoccupation = (education) => {
  setMemberToDelete(education); // Store the member to delete
  setShowDeleteConfirmation(true); // Show the delete confirmation popup
};
// Function to handle delete confirmation
const handleDeleteConfirmation = async() => {
  // Perform delete action here
  // For example, you can make an API call to delete the member
  // and update the UI accordingly
  console.log("Member deleted:", memberToDelete);
  try {
    const response = await fetch(`http://localhost:51294/api/General/SetActiveInactiveStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Id: memberToDelete.Id, TableName: 'Occupation' , StatusFlag : 0})
      
 // Assuming education.id exists
    });
    window.location.reload();

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

  } catch (error) {
    console.error('Error updating education data:', error);
  }


  // After performing the delete action, hide the confirmation popup
  setShowDeleteConfirmation(false);
};

// Function to handle cancel button click in delete confirmation popup
const handleCancelDelete = () => {
  setShowDeleteConfirmation(false); // Hide the delete confirmation popup
  setMemberToDelete(null); // Clear the member to delete
};
//end occupation

//
const [showDeleteConfirmationedu, setShowDeleteConfirmationedu] = useState(false); // State for controlling the delete confirmation popup
const [memberToDeleteedu, setMemberToDeleteedu] = useState(null); // State to store the member to delete

// Function to handle delete button click
const handleDeleteClickedu = (education) => {
  setMemberToDeleteedu(education); // Store the member to delete
  setShowDeleteConfirmationedu(true); // Show the delete confirmation popup
};

const handleDeleteClickEducation = (education) => {
  setMemberToDeleteedu(education); // Store the member to delete
  setShowDeleteConfirmationedu(true); // Show the delete confirmation popup
};
// Function to handle delete confirmation
const handleDeleteConfirmationedu = async() => {
  // Perform delete action here
  // For example, you can make an API call to delete the member
  // and update the UI accordingly
  console.log("Member deleted:", memberToDeleteedu);
  try {
    const response = await fetch(`http://localhost:51294/api/General/SetActiveInactiveStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Id: memberToDeleteedu.Id, TableName: 'Education' , StatusFlag : 0})
 // Assuming education.id exists
    });
    
      window.location.reload();
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

  } catch (error) {
    console.error('Error updating education data:', error);
  }


  // After performing the delete action, hide the confirmation popup
  setShowDeleteConfirmationedu(false);
};

// Function to handle cancel button click in delete confirmation popup
const handleCancelDeleteEducation = () => {
  setShowDeleteConfirmationedu(false); // Hide the delete confirmation popup
  setMemberToDeleteedu(null); // Clear the member to delete
};
//

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);
  const [selectedOc, setSelectedOc] = useState([]);
  const [popupVisibleOc, setPopupVisibleOc] = useState(false);
  const [familyData, setFamilyData] = useState([]);
  const [EducationData, setEducationData] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [popupVisibled, setPopupVisibled] = useState(false);
  const [OccuData, setOccuData] = useState([]);
  const [selectedMember, setSelectedMember] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [popupVisibleedi, setPopupVisibleedi] = useState(false);
  const [popupVisibleocc, setPopupVisibleocc] = useState(false);
  const [educationDataed, setEducationDataedi] = useState([]);
  const [educationDataocc, setEducationDataocc] = useState([]);
const [qualificationOptionsed, setQualificationOptionsed] = useState([]);



const handleSubmitedocc = async () => {
  try {
      await axios.post('http://localhost:51294/api/InsOccupation', formDataocc);
      alert('Education data added successfully!');
      setPopupVisibleocc(false); // Close the popup after submitting the data
      window.location.href = "/profile";
  } catch (err) {
      alert('Error occurred while adding education data');
      console.error(err);
  }
};
const [formDataocc, setFormDataedocc] = useState({
FamilyMemberId: localStorage.getItem('FamilyMemberId'),
Designation: '',
        NameOfCompany: '',
        Industry: '',
        Category: '',
        StartDate: '',
        EndDate: '',
        Address1: '',
        Address2: '',
        City: '',
        State: '',
        Country: '',
        PinCode: ''
});
useEffect(() => {
const fetchDataocc = async () => {
    try {
        const response = await axios.get(`http://localhost:51294/api/GetOccupationById`);
        setEducationDataocc(response.data);
    } catch (error) {
        console.error('Error fetching education data:', error);
    }
};

fetchDataocc();
}, [formDataocc.FamilyMemberId]);


/////
  const handleEditClickOc = async (education) => {
    try {
      const response = await fetch(`http://localhost:51294/api/GetOquId?Id=${education.Id}`, {
        method: 'POST', // Set the method to GET explicitly
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSelectedOc(data);
      setPopupVisibleOc(true);
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };

  const handleChangeed = (e) => {
    setFormDataed({ ...formDataed, [e.target.name]: e.target.value });
};
const handleChangeocc= (e) => {
  setFormDataedocc({ ...formDataocc, [e.target.name]: e.target.value });
};
useEffect(() => {
  // Fetch qualification options from an API or define them locally
  const qualifications = ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate'];
  setQualificationOptionsed(qualifications);
}, []);
const handleSubmitededi = async () => {
    try {
        await axios.post('http://localhost:51294/api/Education/InsEducation', formDataed);
        alert('Education data added successfully!');
        setPopupVisibleedi(false); // Close the popup after submitting the data
        window.location.href = "/profile";
    } catch (err) {
        alert('Error occurred while adding education data');
        console.error(err);
    }
};
const [formDataed, setFormDataed] = useState({
  FamilyMemberId: localStorage.getItem('FamilyMemberId'),
  Qualification: '',
  PassingYear: '',
  Schooling: '',
  Organisation: '',
  GPA: ''
});
useEffect(() => {
  const fetchDataedi = async () => {
      try {
          const response = await axios.get(`http://localhost:51294/api/Education/GetEducationById`);
          setEducationDataedi(response.data);
      } catch (error) {
          console.error('Error fetching education data:', error);
      }
  };

  fetchDataedi();
}, [formDataed.FamilyMemberId]);
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
    } else {
      fetchData();
      fetchEdu();
      fetchOccu();
    }
  }, [token]);

  const fetchOccu = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = localStorage.getItem('FamilyMemberId'); // Retrieve the Id from localStorage
      const response = await fetch('http://localhost:51294/api/GetOccupationById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FamilyMemberId: userId })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOccuData(data.Data);
    } catch (error) {
      setError('Error fetching data. Please try again.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = localStorage.getItem('FamilyMemberId'); // Retrieve the Id from localStorage
      const response = await fetch('http://localhost:51294/api/GetById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ Id: userId })
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
  const fetchEdu = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = localStorage.getItem('FamilyMemberId'); // Retrieve the Id from localStorage
      const response = await fetch('http://localhost:51294/api/GetEducationById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FamilyMemberId: userId })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setEducationData(data.Data);
    } catch (error) {
      setError('Error fetching data. Please try again.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleEditClick = async (familymember) => {
    try {
      const response = await fetch(`http://localhost:51294/api/FamilyMemberById?Id=${familymember.Id}`, {
        method: 'POST', // Set the method to GET explicitly
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSelectedMember(data);
      setPopupVisible(true);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };

  if (!isLoggedIn) {
    return <p>Page not found</p>;
  }


  const handleEditClickd = async (education) => {
    try {
      const response = await fetch(`http://localhost:51294/api/GetEducationId?Id=${education.Id}`, {
        method: 'POST', // Set the method to GET explicitly
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSelectedEducation(data);
      setPopupVisibled(true);
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };
  const handleDelClickd = async (education) => {
    
    setShowConfirmation(true);
  };
//   const handleDeleteConfirmation = () => {
//     // Perform deletion logic here
//     // For demonstration, let's just show the deleted message
//     setShowConfirmation(false);
//     setShowDeletedMessage(true);

//     // Simulate closing the deleted message after a certain time (e.g., 3 seconds)
//     setTimeout(() => {
//         setShowDeletedMessage(false);
//     }, 3000);
// };

// const handleCancelDelete = () => {
  
//     // If the user cancels deletion, close the confirmation dialog
//     setShowConfirmation(false);
// };


  return (

    <><div><Navbar /></div><div className='profile'>
      <div class="containerprofile">
        <div class="row">
          <div class="col-md-12">
            <div id="content" class="content content-full-width">

              <div >
                <div class="profile-header">

                  <div class="profile-header-cover"></div>

                  <div class="profile-header-content">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {familyData && familyData.length > 0 && (

                      <> {familyData.map((member) => (
                        <div key={member.Id}>
                          {/* <div class="profile-header-img">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" />
                          </div> */}
                          <div class="profile-header-info">
                            <h4 class="m-t-10 m-b-5"  style={{color:"white"}}>{member.FirstName} {member.MiddleName} {member.LastName}</h4>
                            <p class="m-b-10"> </p>
                          </div></div>))}</>
                    )}
                  </div>
                </div>
              </div>

              <div class="profile-content">

                <div class="tab-content p-0">

                  <div class="tab-pane fade active show" id="profile-post">

                    <ul class="timeline">
                      <li>
{/* 
                        <div class="timeline-time">
                          <span class="date">User Information</span>
                         
                        </div> */}
                        {/* <div class="timeline-icon">
                          <a href="javascript:;">&nbsp;</a>
                        </div> */}
                        <div class="icons">
                          <a href="javascript:;">&nbsp;</a>
                        </div>
                        {/*<p>open</p> */}
                        <div class="user-information">
                          {/* <h2>User Information</h2> */}
                          {loading && <p>Loading...</p>}
                          {error && <p>{error}</p>}
                          {familyData && familyData.length > 0 && (

                            <>
                              {familyData.map((member) => (
                                <div key={member.Id}>
                                  <div class="timeline-header">
                                    <span class="userimage">
                                      {/* <img src={member.Photo}alt="" /> */}
                                      </span>

                                  </div>
                                                            <div class="profile-header-img">
                            <img src={member.Photo}/>
                          </div>
                                  <div class="timeline-content">
                                    <div class="grid-container">
                                      
                                      <table>
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
                                          <td>{member.MaritalStatus }</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Contact Number: </td>
                                          <td>{member.CountryCode} {member.MobileNo} </td>
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
                                          <td className='fontweight'> Native Place:: </td>
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
                                      </table>

                                  
                                    </div>

                                  </div>

                                  <div class="timeline-comment-box">

                                    <div class="input">
                                      <form action="">
                                        <div class="input-group">
                                          {/* <input type="text" class="form-control rounded-corner" placeholder="Write a comment..." /> */}
                                          <span class="input-group-btn p-l-10">
                                            <button class="editbutton" onClick={() => handleEditClick(member)} type="button"> <EditIcon></EditIcon></button>
                                          </span>
                                        </div>
                                      </form>
                                    </div>
                                  </div>{popupVisible && selectedMember && (
                                    <Popup
                                      member={selectedMember}
                                      onClose={() => setPopupVisible(false)} />
                                  )}
                                </div>
                              ))}</>
                          )}
                        </div>
                      </li>
                      <li>
                        <div class="timeline-time">
                          <span class="date">Education Details</span>
                          <span class="time"></span>
                        </div>
                        <div class="timeline-icon">
                          <a href="javascript:;">&nbsp;</a>
                        </div>
                        {/*<p>open</p> */}
                        <div class="timeline-body">
                          <h2>Education </h2>
                          <div>
                          {popupVisibleedi && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Add Education</h2>
                        <select name="Qualification" onChange={handleChangeed}>
                            <option value="">Select Qualification</option>
                            {qualificationOptionsed.map((qualification, index) => (
                                <option key={index} value={qualification}>{qualification}</option>
                            ))}
                        </select>
                        <input type="number" name="PassingYear" placeholder="Passing Year" onChange={handleChangeed} />
                        <input type="text" name="Schooling" placeholder="Schooling" onChange={handleChangeed} />
                        <input type="text" name="Organisation" placeholder="Organisation" onChange={handleChangeed} />
                        <input type="number" name="GPA" placeholder="GPA" onChange={handleChangeed} />
                        <button onClick={handleSubmitededi}>Add</button>
                        
                        <a onClick={() => setPopupVisibleedi(false)} class="close"></a>
                     
                    </div>
                </div>
            )}   
                    <button className="btnaddedu" onClick={() => setPopupVisibleedi(true)}>Add Education</button>

                          </div>
                          <a href="/inserteducation"></a>
                          {loading && <p>Loading...</p>}
                          {error && <p>{error}</p>}
                          {EducationData && EducationData.length > 0 && (
                            <>
                              {EducationData.map((education, index) => (
                                <div key={index}>


                                  
                                  <div class="timeline-header">
                                    <span class="userimage"><img src="https://res.cloudinary.com/dnp3ln4s4/image/upload/v1715172500/7acb1e46795813365facc8a9a7ed8e99_g2sjru.jpg" alt="" /></span>
                                    <span class="username"><a href="javascript:;"></a> <small></small></span>
                                  </div>



                                  <div class="timeline-content">
                                    <div class="grid-container">
                                      <table>
                                        <tr>
                                          <td className='fontweight'> Qualification: </td>
                                          <td>{education.Qualification}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> PassingYear: </td>
                                          <td>{education.PassingYear}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Schooling: </td>
                                          <td>{education.Schooling}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Organisation: </td>
                                          <td> {education.Organisation}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> GPA: </td>
                                          <td>{education.GPA} </td>
                                        </tr>
                                      </table>

                                      <div class="button-container">
                                      <button 
                                      // className='eduedit' 
                                       type="submit" onClick={() => handleEditClickd(education)} ><EditIcon></EditIcon></button>
                                      {/* <button 
                                      //  className='edudelete'
                                        type="submit" onClick={() => handleDelClickd(education)} ><DeleteIcon></DeleteIcon></button> */}
                                        <button onClick={() => handleDeleteClickEducation(education)} className='Editbutton'> <DeleteIcon></DeleteIcon></button>
                                       </div>
                                       {showDeleteConfirmationedu && (
  <div style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }}>
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' 
    }}>
      <p>Are you sure you want to delete this member?</p>
      <button onClick={handleDeleteConfirmationedu}>Yes</button>
      <button onClick={handleCancelDeleteEducation}>No</button>
    </div>
  </div>
)}

                                      
                                    </div>
                                  </div>
                                  <div class="timeline-comment-box">

                                    <div class="input">
                                      <form action="">
                                        <div class="input-group">
                                          {/* <input type="text" class="form-control rounded-corner" placeholder="Write a comment..." /> */}
                                          <span class="input-group-btn p-l-10">
                                            {/* <button class="editbutton" onClick={() => handleEditClickd(education)} type="button">Edit Profile</button> */}

                                          </span>

                                        </div>
                                      </form>
                                    </div>
                                  </div>

                                  {popupVisibled && selectedEducation && (
                                    <Popupd
                                      education={selectedEducation}
                                      onClose={() => setPopupVisibled(false)} />
                                  )}
                                </div>
                              ))}</>
                          )}
                        </div>          {/*<p>close</p> */}

                      </li>


                      <li>

                        <div class="timeline-time">
                          <span class="date">Occupation Details</span>
                          <span class="time"></span>
                        </div>

                        <div class="timeline-icon">
                          <a href="javascript:;">&nbsp;</a>
                        </div>
                        {/*<p>open</p> */}
                        <div class="timeline-body">
                          <h2>Occupation</h2>
                          <div>
                          {popupVisibleocc && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Add Occupation</h2>
                        {/* <select name="Qualification" onChange={handleChangeed}>
                            <option value="">Select Qualification</option>
                            {qualificationOptionsed.map((qualification, index) => (
                                <option key={index} value={qualification}>{qualification}</option>
                            ))}
                        </select> */}
                        <input type="text" name="Designation" placeholder="Designation" onChange={handleChangeocc} />
                        <input type="text" name="NameOfCompany" placeholder="NameOfCompany" onChange={handleChangeocc} />
                        <input type="text" name="Industry" placeholder="Industry" onChange={handleChangeocc} />
                        <input type="text" name="Category" placeholder="Category" onChange={handleChangeocc} />
                        <input type="date" name="StartDate" placeholder="StartDate" onChange={handleChangeocc} />
                        <input type="date" name="EndDate" placeholder="EndDate" onChange={handleChangeocc} />
                        <input type="text" name="Address1" placeholder="Address1" onChange={handleChangeocc} />
                        <input type="text" name="Address2" placeholder="Address2" onChange={handleChangeocc} />
                        <input type="text" name="City" placeholder="City" onChange={handleChangeocc} />
                        <input type="text" name="State" placeholder="State" onChange={handleChangeocc} />
                        <input type="text" name="Country" placeholder="Country" onChange={handleChangeocc} />
                        <input type="number" name="PinCode" placeholder="PinCode" onChange={handleChangeocc} />
                        <button onClick={handleSubmitedocc}>Add</button>
                        <a onClick={() => setPopupVisibleocc(false)} class="close"></a>                       
                    </div>
                </div>
            )}   
                    <button className="btnaddedu" onClick={() => setPopupVisibleocc(true)}>Add Occupation</button>

                          </div>
                          {loading && <p>Loading...</p>}
                          {error && <p>{error}</p>}
                          {OccuData && OccuData.length > 0 && (

                            <>
                              {OccuData.map((education, index) => (
                                <div key={index}>
                                  <div class="timeline-header">
                                    <span class="userimage"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></span>
                                    <span class="username"><a href="javascript:;">
                                      {/*Name : {member.FirstName} {member.MiddleName} {member.LastName}*/}</a> <small></small></span>

                                  </div>
                                  <div class="timeline-content">
                                    <div class="grid-container">
                                    <table>
                                        <tr>
                                          <td className='fontweight'> Designation: </td>
                                          <td>{education.Designation}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> NameOfCompany: </td>
                                          <td>{education.NameOfCompany}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Industry: </td>
                                          <td>{education.Industry}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Category: </td>
                                          <td> {education.Category}</td>
                                        </tr>
                                        <tr>
  <td className='fontweight'> StartDate: </td>
  <td>{new Date(education.StartDate).toLocaleDateString()} </td>
</tr>

<tr>
  <td className='fontweight'> EndDate: </td>
  <td>{new Date(education.EndDate).toLocaleDateString()} </td>
</tr>

                                        <tr>
                                          <td className='fontweight'> Address1: </td>
                                          <td>{education.Address1} {education.City} {education.State} {education.Country} {education.Pincode}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Address2: </td>
                                          <td>{education.Address2}</td>
                                        </tr>
                                      </table>



                                      <div class="button-container">
                                      <button  type="submit" onClick={() => handleEditClickOc(education)} ><EditIcon></EditIcon></button>
                                      <button onClick={() => handleDeleteClickoccupation(education)} className='Editbutton'> <DeleteIcon></DeleteIcon></button>
                                      </div>
                                      {/* {showDeleteConfirmation && (
                                        
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this member?</p>
          <button onClick={handleDeleteConfirmation}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>

      )} */}

{showDeleteConfirmation && (
  <div style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }}>
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' 
    }}>
      <p>Are you sure you want to delete this member?</p>
      <button onClick={handleDeleteConfirmation}>Yes</button>
      <button onClick={handleCancelDelete}>No</button>
    </div>
  </div>
)}
                                      
                                      {showConfirmation && (
                <div style={{ backgroundColor: "#fff", border: "1px solid #ccc", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", width: "300px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <p>Are you sure you want to delete this?</p>
                    <div style={{ marginTop: "20px" }}>
                        <button style={{ backgroundColor: "#4CAF50", border: "none", color: "white", padding: "10px 24px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "16px", marginRight: "10px", cursor: "pointer", borderRadius: "5px" }} onClick={handleDeleteConfirmation}>Yes</button>
                        <button style={{ backgroundColor: "#f44336", border: "none", color: "white", padding: "10px 24px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "16px", cursor: "pointer", borderRadius: "5px" }} onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )} {showDeletedMessage && (
              <div style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", borderRadius: "5px", position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                  Deleted!
              </div>
          )}
                                      {/* <RiEdit2Line type="" onClick={() => handleEditClick(member)} /> */}
                                    </div>

                                  </div>

                                  <div class="timeline-comment-box">

                                    <div class="input">
                                      <form action="">
                                        <div class="input-group">
                                          {/* <input type="text" class="form-control rounded-corner" placeholder="Write a comment..." /> */}
                                          <span class="input-group-btn p-l-10">
                                            {/* <button class="editbutton" onClick={() => handleEditClickOc(education)} type="button">Edit Profile</button> */}
                                          </span>
                                        </div>
                                      </form>
                                    </div>
                                  </div>{popupVisibleOc && selectedOc && (
                                    <PopupOc
                                      education={selectedOc}
                                      onClose={() => setPopupVisibleOc(false)} />
                                  )}
                                </div>
                              ))}</>
                          )}
</div>          {/*<p>close</p> */}

                      </li>
                    </ul>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div></>
  );
}

function Popup({ member, onClose }) {
  // State to hold the edited education data
  const [editedMember, setEditedMember] = useState({
    FirstName: member.Data[0].FirstName,
    MiddleName: member.Data[0].MiddleName,
    LastName: member.Data[0].LastName,
    Relationship: member.Data[0].Relationship,
    DateOfBirth:  member.Data[0].DateOfBirth,
    BloodGroup: member.Data[0].BloodGroup,
    MaritalStatus: member.Data[0].MaritalStatus,
    CountryCode: member.Data[0].CountryCode,
    MobileNo: member.Data[0].MobileNo,
    Gotra: member.Data[0].Gotra,
    NativePlace: member.Data[0].NativePlace,
    Email: member.Data[0].Email,
    Photo: member.Data[0].Photo,
    Address1: member.Data[0].Address1,
    Address2: member.Data[0].Address2,
    City: member.Data[0].City,
    Country: member.Data[0].Country,
    Pincode: member.Data[0].Pincode,
    State: member.Data[0].State

  });

  // Function to handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMember(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleImageChangefm = (e) => {
    const file = e.target.files[0];
    readImageAsBase64(file);
  };
  
  // Convert image to Base64 string
  const readImageAsBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setEditedMember({ ...editedMember, Photo: reader.result });
    };
    reader.readAsDataURL(file);
  };
  // Function to handle update button click
  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:51294/api/UpdateFamilyMember", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Id: member.Data[0].Id, ...editedMember }) // Assuming education.id exists
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else {
        onClose();
        window.location.reload();
      }

      // Close the popup after successful update
    } catch (error) {
      console.error('Error updating members data:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit member</h2>
        <div>
  <label htmlFor="Photo">Photo:</label>
  {editedMember.Photo && (
    <img src={editedMember.Photo} alt="User Photo" style={{ maxWidth: '200px' }} />
  )}
  <input 
    type="file" 
    id="Photo" 
    name="Photo" 
    accept="image/*" 
    onChange={handleImageChangefm} 
  />
</div>
        <div>
          <label htmlFor="FirstName">FirstName:</label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={editedMember.FirstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="MiddleName">MiddleName:</label>
          <input
            type="text"
            id="MiddleName"
            name="MiddleName"
            value={editedMember.MiddleName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="LastName">Last Name:</label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={editedMember.LastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Relationship">Relationship:</label>
          <input
            type="text"
            id="Relationship"
            name="Relationship"
            value={editedMember.Relationship}
            onChange={handleInputChange}
          />
        </div>
        <div>
  <label htmlFor="DateOfBirth">Date of Birth:</label>
  <input 
    type="date" 
    id="DateOfBirth" 
    name="DateOfBirth" 
    value={editedMember.DateOfBirth ? editedMember.DateOfBirth.split('T')[0] : ''} 
    onChange={handleInputChange} 
  />
</div>
        <div>
          <label htmlFor="BloodGroup">BloodGroup:</label>
          <input
            type="text"
            id="BloodGroup"
            name="BloodGroup"
            value={editedMember.BloodGroup}
            onChange={handleInputChange}
          />
        </div>
  <div>
  <label htmlFor="MaritalStatus">Marital Status:</label>
  <input
    type="text"
    id="MaritalStatus"
    name="MaritalStatus"
    value={editedMember.MaritalStatus = "0" ? "single" : editedMember.MaritalStatus}
    onChange={handleInputChange}
  />
</div>

        <div>
          <label htmlFor="CountryCode">CountryCode:</label>
          <input
            type="text"
            id="CountryCode"
            name="CountryCode"
            value={editedMember.CountryCode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="MobileNo">MobileNo:</label>
          <input
            type="number"
            id="MobileNo"
            name="MobileNo"
            value={editedMember.MobileNo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Gotra">Gotra:</label>
          <input
            type="text"
            id="Gotra"
            name="Gotra"
            value={editedMember.Gotra}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="NativePlace">NativePlace:</label>
          <input
            type="text"
            id="NativePlace"
            name="NativePlace"
            value={editedMember.NativePlace}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            id="Email"
            name="Email"
            value={editedMember.Email}
            onChange={handleInputChange}
          />
        </div>
       
        <div>
          <label htmlFor="Address1">Address1:</label>
          <input
            type="text"
            id="Address1"
            name="Address1"
            value={editedMember.Address1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Address2">Address2:</label>
          <input
            type="text"
            id="Address2"
            name="Address2"
            value={editedMember.Address2}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="City">City:</label>
          <input
            type="City"
            id="City"
            name="City"
            value={editedMember.City}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="State">State:</label>
          <input
            type="text"
            id="State"
            name="State"
            value={editedMember.State}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Country">Country:</label>
          <input
            type="text"
            id="Country"
            name="Country"
            value={editedMember.Country}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Pincode">Pincode:</label>
          <input
            type="number"
            id="Pincode"
            name="Pincode"
            value={editedMember.Pincode}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={handleUpdate}><EditIcon></EditIcon></button>
   
        <a  onClick={onClose} class="close"></a>
     
      </div>
    </div>
  );
}
function Popupd({ education, onClose }) {
  // State to hold the edited education data
  const [editedEducation, setEditedEducation] = useState({
    Qualification: education.Data[0].Qualification,
    PassingYear: education.Data[0].PassingYear,
    Schooling: education.Data[0].Schooling,
    Organisation: education.Data[0].Organisation,
    GPA: education.Data[0].GPA
  });

  // Function to handle changes in input fields
  const handleInputChanged = (e) => {
    const { name, value } = e.target;
    setEditedEducation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle update button click
  const handleUpdated = async () => {
    try {
      const response = await fetch(`http://localhost:51294/api/UpdateEducation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Id: education.Data[0].Id, ...editedEducation }) // Assuming education.id exists
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else {
        onClose();
        window.location.reload();
      } // Close the popup after successful update
    } catch (error) {
      console.error('Error updating education data:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Education</h2>
        <div>
          <label htmlFor="qualification">Qualification:</label>
          <input
            type="text"
            id="qualification"
            name="Qualification"
            value={editedEducation.Qualification}
            onChange={handleInputChanged}
          />
        </div>
        <div>
          <label htmlFor="passingYear">Passing Year:</label>
          <input
            type="text"
            id="passingYear"
            name="PassingYear"
            value={editedEducation.PassingYear}
            onChange={handleInputChanged}
          />
        </div>
        <div>
          <label htmlFor="schooling">Schooling:</label>
          <input
            type="text"
            id="schooling"
            name="Schooling"
            value={editedEducation.Schooling}
            onChange={handleInputChanged}
          />
        </div>
        <div>
          <label htmlFor="organisation">Organisation:</label>
          <input
            type="text"
            id="organisation"
            name="Organisation"
            value={editedEducation.Organisation}
            onChange={handleInputChanged}
          />
        </div>
        <div>
          <label htmlFor="gpa">GPA:</label>
          <input
            type="text"
            id="gpa"
            name="GPA"
            value={editedEducation.GPA}
            onChange={handleInputChanged}
          />
        </div>
        <button onClick={handleUpdated}><EditIcon></EditIcon></button>
       
        <a onClick={onClose} class="close"> </a>
        
      </div>
    </div>
  );
}
function PopupOc({ education, onClose }) {
  // State to hold the edited education data
  const [editedOc, setEditedOc] = useState({
    Designation: education.Data[0].Designation,
    NameOfCompany: education.Data[0].NameOfCompany,
    Industry: education.Data[0].Industry,
    Category: education.Data[0].Category,
    StartDate: education.Data[0].StartDate,
    EndDate: education.Data[0].EndDate,
    Address1: education.Data[0].Address1,
    Address2: education.Data[0].Address2,
    City: education.Data[0].City,
    State: education.Data[0].State,
    Country: education.Data[0].Country,
    Pincode: education.Data[0].Pincode
  });

  // Function to handle changes in input fields
  const handleInputChangeOc = (e) => {
    const { name, value } = e.target;
    setEditedOc(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle update button click
  const handleUpdateOc = async () => {
    try {
      const response = await fetch('http://localhost:51294/api/UpdateOccupation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Id: education.Data[0].Id, ...editedOc }) // Assuming education.id exists
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else {
        onClose();
        window.location.reload();
      }

    } catch (error) {
      console.error('Error updating education data:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Education</h2>
        <div>
          <label htmlFor="qualification">Designation:</label>
          <input
            type="text"
            id="qualification"
            name="Designation"
            value={editedOc.Designation}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="passingYear">NameOfCompany:</label>
          <input
            type="text"
            id="passingYear"
            name="NameOfCompany"
            value={editedOc.NameOfCompany}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="schooling">Industry:</label>
          <input
            type="text"
            id="schooling"
            name="Industry"
            value={editedOc.Industry}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="organisation">Category:</label>
          <input
            type="text"
            id="organisation"
            name="Category"
            value={editedOc.Category}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
  <label htmlFor="StartDate">StartDate:</label>
  <input 
    type="date" 
    id="StartDate" 
    name="StartDate" 
    value={editedOc.StartDate ? editedOc.StartDate.split('T')[0] : ''} 
    onChange={handleInputChangeOc} 
  />
</div>
<div>
  <label htmlFor="EndDate">EndDate:</label>
  <input 
    type="date" 
    id="EndDate" 
    name="EndDate" 
    value={editedOc.EndDate ? editedOc.EndDate.split('T')[0] : ''} 
    onChange={handleInputChangeOc} 
  />
</div>
        <div>
          <label htmlFor="gpa">Address1:</label>
          <input
            type="text"
            id="gpa"
            name="Address1"
            value={editedOc.Address1}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">Address2:</label>
          <input
            type="text"
            id="gpa"
            name="Address2"
            value={editedOc.Address2}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">City:</label>
          <input
            type="text"
            id="gpa"
            name="City"
            value={editedOc.City}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">State:</label>
          <input
            type="text"
            id="gpa"
            name="State"
            value={editedOc.State}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">Country:</label>
          <input
            type="text"
            id="gpa"
            name="Country"
            value={editedOc.Country}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">Pincode:</label>
          <input
            type="number"
            id="gpa"
            name="Pincode"
            value={editedOc.Pincode}
            onChange={handleInputChangeOc}
          />
        </div>
        <button onClick={handleUpdateOc}><EditIcon></EditIcon></button>
       
        <a onClick={onClose} class="close"> </a>  

      </div>
    </div>
  );
}

{/* <p>education add</p> */ }

export default FamilyDataFetcher;
