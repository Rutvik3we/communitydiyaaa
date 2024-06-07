import React, { useState, useEffect } from 'react';

const Test = () => {
  const [advertise, setAdvertise] = useState([]);
  const [randomImage, setRandomImage] = useState(null);
  const [showAd, setShowAd] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('FamilyMemberId');
        const response = await fetch('http://localhost:51294/api/GetAdvertisementById', {
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
        setAdvertise(data.Data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const userId = localStorage.getItem('FamilyMemberId');
        const response = await fetch('http://localhost:51294/api/GetAllQuotes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId }) // Adjust the body as per your API requirements
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };
  
    fetchQuotes();
  }, []);
  

  useEffect(() => {
    if (advertise.length > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * advertise.length);
        setRandomImage(advertise[randomIndex]);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [advertise]);

  useEffect(() => {
    if (quotes.length > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex]);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [quotes]);

  const handleCancelAd = () => {
    setShowAd(false);
  };

  return (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px 0', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ display: 'inline-block', marginRight: '20px' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#fff', fontSize: '16px' }}>Home</a>
          </li>
          <li style={{ display: 'inline-block', marginRight: '20px' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#fff', fontSize: '16px' }}>About</a>
          </li>
          <li style={{ display: 'inline-block', marginRight: '20px' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#fff', fontSize: '16px' }}>Services</a>
          </li>
          <li style={{ display: 'inline-block' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#fff', fontSize: '16px' }}>Contact</a>
          </li>
        </ul>
      </div>
      <div style={{ marginTop: '20px', fontSize: '14px' }}>
        &copy; 2024 Your Company Name. All rights reserved.
      </div>
      <section class="vh-100" style={{backgroundColor: "#FFE7C7"}}>
        <div class="containers py-5 h-100">
          <div class="row d-flex align-items-center h-100">
            <div class="col col-lg-6 mb-4 mb-lg-0">
              <figure class="text-center bg-white py-5 px-4 shadow-2" style={{borderradius: ".75rem"}}>
                <i class="far fa-gem fa-lg mb-4" style={{color: "#f9a169"}}></i>
                <blockquote class="blockquote pb-2">
                  <p>
                    <i class="fas fa-angle-double-left" style={{color: "#f9a169"}}></i>
                    <span class="lead font-italic"> 
                      {randomImage && showAd && (
                        <div className="ads-card col-md-4">
                          <button className="" onClick={handleCancelAd}>
                            <i className="fas fa-times"></i>
                          </button>
                          <div>
                            <a href="YOUR_AD_URL" target="_blank">
                              <img className='imgcontainer' src={randomImage.AdvImage} alt="Advertisement" />
                            </a>
                          </div>
                        </div>
                      )}
                    </span>
                    <i class="fas fa-angle-double-right" style={{color: "#f9a169"}}></i>
                  </p>
                </blockquote>
                <figcaption class="blockquote-footer mb-0 font-italic">
                  Ads
                </figcaption>
              </figure>
            </div>
            <div class="col col-lg-6">
              <figure class="text-center bg-white py-5 px-4 shadow-2" style={{borderradius: ".75rem"}}>
                <i class="far fa-gem fa-lg mb-4" style={{color: "#f36f63"}}></i>
                <blockquote class="blockquote pb-2">
                  <p>
                    <i class="fas fa-angle-double-left" style={{color: "#f36f63"}}></i>
                    <span class="lead font-italic">
                      {/* Displaying random quote */}
                      {randomQuote && showAd && (
                        <div className="quote-card col-md-4">
                          <button className="" onClick={handleCancelAd}>
                            <i className="fas fa-times"></i>
                          </button>
                          <div>
                            <p>{randomQuote.Quotes}</p>
                            <p>- {randomQuote.Quotes}</p>
                          </div>
                        </div>
                      )}
                    </span>
                    <i class="fas fa-angle-double-right" style={{color: "#f36f63"}}></i>
                  </p>
                </blockquote>
                <figcaption class="blockquote-footer mb-0 font-italic">
                  Quotes
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Test;
