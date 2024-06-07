import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Assuming you have a corresponding CSS file for styling

// Navbar component
const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const isLoggedIn = !!localStorage.getItem('accessToken'); // Check if the user is logged in
  const userTypeId = localStorage.getItem('UserTypeId'); // Get UserTypeId from localStorage

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/loginregister'; // Redirect to the homepage after logout
  };

  // Event listener for scrolling
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  // Attach scroll listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <nav className={isSticky ? 'nav sticky' : 'nav'}>
      <div className="nav-content">
        <div className="logo">
          <a href="/home">My commUnity</a>
        </div>
        <ul className="nav-links">
          <li>
            <a
              href="/profile"
              className={activeLink === '/profile' ? 'active-link' : ''}
              onClick={() => handleLinkClick('/profile')}
            >
              Profile
            </a>
          </li>
          <li>
            <a
              href="/familymembers"
              className={activeLink === '/familymembers' ? 'active-link' : ''}
              onClick={() => handleLinkClick('/familymembers')}
            >
              FamilyMembers
            </a>
          </li>
          <li>
            <a
              href="/communityMembers"
              className={activeLink === '/communityMembers' ? 'active-link' : ''}
              onClick={() => handleLinkClick('/communityMembers')}
            >
              CommunityMembers
            </a>
          </li>
          <li>
            <a
              href="/showads"
              className={activeLink === '/showads' ? 'active-link' : ''}
              onClick={() => handleLinkClick('/showads')}
            >
              ShowAds
            </a>
          </li>
          {/* Show logout button if user is logged in */}
          {isLoggedIn && (
            <li>
              <a
                onClick={handleLogout}
                href="#"
                className="logout-link"
              >
                Logout
              </a>
            </li>
          )}
          <li>
            <a
              href="/changepassword"
              className={activeLink === '/changepassword' ? 'active-link' : ''}
              onClick={() => handleLinkClick('/changepassword')}
            >
              Changepassword
            </a>
          </li>
          {/* Conditionally render Usermanage link */}
          {userTypeId === '1' && (
            <li>
              <a
                href="/Usermanage"
                className={activeLink === '/Usermanage' ? 'active-link' : ''}
                onClick={() => handleLinkClick('/Usermanage')}
              >
                Usermanage
              </a>
            </li>
          )}
          {userTypeId === '1' && (
            <li>
              <a
                href="/ads"
                className={activeLink === '/ads' ? 'active-link' : ''}
                onClick={() => handleLinkClick('/ads')}
              >
                Ads
              </a>
            </li>
          )}
          {userTypeId === '1' && (
            <li>
              <a
                href="/events"
                className={activeLink === '/events' ? 'active-link' : ''}
                onClick={() => handleLinkClick('/events')}
              >
                Events
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

// MainContent component
const MainContent = () => {
  return (
    <div className="main-content">
      <section className="home">
        <div className="text">
          <h2 className='h2fornavbar'>Sticky Navigation Bar</h2>
          {/* Your content here */}
        </div>
      </section>
      <div className="text">
        {/* More content here */}
      </div>
    </div>
  );
};

// App component
const App = () => {
  return (
    <div className="App">
      <Navbar />
      {/* <Home /> */}
    </div>
  );
};

export default App;
