import React, { useState, useEffect } from 'react';
import './Afterlogin.css';
import DelayedPageReload from '../DelayedPageReload';
import Home from '../Home/Home';


const Afterlogin = () => {

  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchData();
    
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = localStorage.getItem('FamilyMemberId'); // Retrieve the Id from localStorage
      const response = await fetch('http://localhost:51294/api/GetById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
  
  return (
    <div className='bodycontainer'>
        <aside class="profile-card">
  <header> 
    <a target="_blank" href="#">
      <img src="http://lorempixel.com/150/150/people/" class="hoverZoomLink"/>
    </a>
    {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {familyData && familyData.length > 0 && (
                  <div>
                    {familyData.map((member) => (
            <div key={member.Id}>
                            <h3 style={{color:"black" }}>
                            {`${member.FirstName} ${member.MiddleName} ${member.LastName}`}
                            </h3>                   
                           </div>))}

                            </div>   )}
           {/* <h1>
            John Doe
           </h1>
           <h2>
            Better Visuals
          </h2> */}
  </header>
  <div class="profile-bio">
    <p>
      It takes monumental improvement for us to change how we live our lives. Design is the way we access that improvement.
    </p>
  </div>
  {/* <ul class="profile-social-links">
    <li>
      <a target="_blank" href="https://www.facebook.com/creativedonut">
        <i class="fa fa-facebook"></i>
      </a>
    </li>
    <li>
      <a target="_blank" href="https://twitter.com/dropyourbass">
        <i class="fa fa-twitter"></i>
      </a>
    </li>
    <li>
      <a target="_blank" href="https://github.com/vipulsaxena">
        <i class="fa fa-github"></i>
      </a>
    </li>
    <li>
      <a target="_blank" href="https://www.behance.net/vipulsaxena">
       
        <i class="fa fa-behance"></i>
      </a>
    </li>
  </ul> */}
</aside>
<DelayedPageReload path="/home" delayInSeconds={3} />
    </div>
  )
}

export default Afterlogin