import React, { useState, useEffect } from 'react';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.css';

const Footer = () => {
  const [advertise, setAdvertise] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [events, setEvents] = useState([]);
  const [randomImage, setRandomImage] = useState(null);
  const [randomQuote, setRandomQuote] = useState(null);
  const [randomEvent, setRandomEvent] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null); 
  const [showAd, setShowAd] = useState(true);
  const [showQuote, setShowQuote] = useState(true);
  const [showEvent, setShowEvent] = useState(true);
  const [showNumber, setShowNumber] = useState(true);

  useEffect(() => {
    const fetchAdvertisement = async () => {
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
        console.error('Error fetching advertisement:', error);
      }
    };

    fetchAdvertisement();
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('http://localhost:51294/api/GetAllQuotes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setQuotes(data.Data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:51294/api/GetAllEvents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setEvents(data.Data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let interval;
    if (advertise?.length > 0) {
      let currentIndex = 0;
      interval = setInterval(() => {
        if (currentIndex < advertise.length) {
          setRandomImage(advertise[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 5000); // Change the interval time as needed
    }
  
    return () => clearInterval(interval);
  }, [advertise]);

  useEffect(() => {
    let interval;
    if (quotes?.length > 0) {
      const randomIndex = Math.floor(Math.random() * (quotes?.length || 0));
      setRandomQuote(quotes[randomIndex]);
  
      interval = setInterval(() => {
        const newIndex = Math.floor(Math.random() * (quotes?.length || 0));
        setRandomQuote(quotes[newIndex]);
      }, 5000);
    }
  
    return () => clearInterval(interval);
  }, [quotes]);

  useEffect(() => {
    let interval;
    if (events?.length > 0) {
      const randomIndex = Math.floor(Math.random() * (events?.length || 0));
      setRandomEvent(events[randomIndex]);
  
      interval = setInterval(() => {
        const newIndex = Math.floor(Math.random() * (events?.length || 0));
        setRandomEvent(events[newIndex]);
      }, 5000);
    }
  
    return () => clearInterval(interval);
  }, [events]);

  useEffect(() => {
    let interval;
    if (showNumber) {
      let number = 1;
      interval = setInterval(() => {
        if (number <= 100) {
          setRandomNumber(number);
          number++;
        } else {
          clearInterval(interval);
        }
      }, 500);
    }
  
    return () => clearInterval(interval);
  }, [showNumber]);

  const handleCancelAd = () => {
    setShowAd(false);
  };

  const handleCancelQuote = () => {
    setShowQuote(false);
  };

  const handleCancelEvent = () => {
    setShowEvent(false);
  };

  const handleCancelNumber = () => {
    setShowNumber(false);
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

      <div className="row d-flex align-items-center">
       
        
        {showQuote && (
          
           
              
                <p style={{ color: "black" }}>
                  {randomQuote && (
                    <div>
                      
                      <div>
                        <p>*//{randomQuote.Quotes}*//</p>
                      </div>
                    </div>
                  )}
                </p>
          
          
          
        )}

        {showEvent && (
          <div className="col-lg-6">
            <figure className="bg-white p-3 rounded" style={{ borderLeft: ".25rem solid #f68e9d", marginRight: "20px" }}>
              <blockquote className="blockquote pb-2">
                <p style={{ color: "black" }}>
                  {randomEvent && (
                    <div className="event-card col-md-4">
                      <button className="" onClick={handleCancelEvent}>
                        <i className="fas fa-times"></i>
                      </button>
                      <div>
                        <p>{randomEvent.Message}</p>
                      </div>
                    </div>
                  )}
                </p>
              </blockquote>
            </figure>
          </div>
        )}

        {showNumber && (
          <div className="col-lg-6">
            <figure className="bg-white p-3 rounded" style={{ borderLeft: ".25rem solid #f68e9d", marginRight: "20px" }}>
              <blockquote className="blockquote pb-2">
                <p style={{ color: "black" }}>
                  {randomNumber && (
                    <div className="number-card col-md-4">
                      <button className="" onClick={handleCancelNumber}>
                        <i className="fas fa-times"></i>
                      </button>
                      <div>
                        <p>{randomNumber}</p>
                      </div>
                    </div>
                  )}
                </p>
              </blockquote>
            </figure>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
