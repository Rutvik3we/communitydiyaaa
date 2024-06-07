import React, { useState, useEffect } from 'react';
import './Home.css'; // Import your CSS file with the styles
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Home = () => {
  const [randomQuote, setRandomQuote] = useState('');
  const [advertise, setAdvertise] = useState([]);
  const [randomImage, setRandomImage] = useState(null);
  const [showAd, setShowAd] = useState(true);
//
useEffect(() => {
  const fetchAdvertisement = async () => {
    try {
      const userId = localStorage.getItem('FamilyMemberId');
      const response = await fetch('http://localhost:51294/api/getAllAdvertisement', {
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
//
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

const handleCancelAd = () => {
  setShowAd(false);
};
  // Fetch quotes from C# API
  const fetchQuotes = async () => {
    try {
      const response = await fetch('http://localhost:51294/api/GetAllQuotes');
      if (!response.ok) {
        throw new Error('Failed to fetch quotes');
      }
      const data = await response.json();
      return data.quotes.quotes; // Assuming your API returns an array of quotes
    } catch (error) {
      console.error('Error fetching quotes:', error);
      return [];
    }
  };

  // Function to get a random quote
  const getRandomQuote = async () => {
    const quotesArray = await fetchQuotes();
    if (quotesArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotesArray.length);
      return quotesArray[randomIndex];
    }
    return "No quotes available";
  };

  // Set random quote when component mounts
  useEffect(() => {
    const getQuote = async () => {
      const quote = await getRandomQuote();
      setRandomQuote(quote);
    };
    getQuote();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <div className="home">
          <div className="ad-container">
            {/* Google AdSense ad code */}
            {randomImage && showAd && (
            <div className="ad">
            <a href="YOUR_AD_URL" target="_blank">
                        <img className='imgcontainer' src={randomImage.AdvImage} alt="Advertisement" />
                      </a>
                      <button className="" onClick={handleCancelAd}/>
            </div>)}
          </div>
          <div className="container_content">
            <div className="container_content_inner">
              <div className="title">
                <h1 className='forhomeh1'>KAPADVANJ VISHA KHADYATA COMMUNITY</h1>
                <h2 className='forhomeh2'>Welcomes You!</h2>
              </div>
              <div className="par">
                <p className='pforhome'>
                  "Welcome to the Kapadvanj Visha Khadyata Community! 🏡
                  We're overjoyed to have you here.
                  Take a moment to settle in and feel the warmth of belonging wash over you.
                  Whether you're returning after a while or just discovering us for the first time, know that you're among family.
                  This is your community, and we're thrilled to have you back where you belong.
                  Welcome home!"
                </p>
              </div>
              {/* Display the random quote */}
              <div className="random-quote">
                <p>{randomQuote}</p>
              </div>
            </div>
          </div>
          <div className="container_outer_img">
            <div className="img-inner">
              <img
                src="https://res.cloudinary.com/dnp3ln4s4/image/upload/v1713861338/shreenathji_qsqval.jpg"
                alt=""
                className="container_img" />
            </div>
          </div>
          <div className="overlayhome"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
