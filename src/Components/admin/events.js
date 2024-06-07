import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";
import "../admin/events.css";

function Events() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [eventMessage, setEventMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Fetch all events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

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

  const handleAddEventsClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEventMessage('');
    setResponseMessage('');
  };

  const handleMessageChange = (event) => {
    setEventMessage(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:51294/api/Login/InsertEvents', { message: eventMessage });
      setResponseMessage('Event added successfully!');

      // Fetch events again to update the list
      fetchEvents();
    } catch (error) {
      setResponseMessage('Error adding event.');
    }

    setIsPopupOpen(false);
    setEventMessage('');
  };

  const handleEditClick = (event) => {
    setCurrentEvent(event);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setCurrentEvent(null);
  };

  const handleUpdateIsActive = async () => {
    if (!currentEvent) return;

    try {
      await axios.post('http://localhost:51294/api/UpdateEvent', {
        id: currentEvent.Id,
        isActive: currentEvent.IsActive === 1 ? 0 : 1
      });
      setResponseMessage('Event updated successfully!');

      // Fetch events again to update the list
      fetchEvents();
    } catch (error) {
      setResponseMessage('Error updating event.');
    }

    setIsEditPopupOpen(false);
    setCurrentEvent(null);
  };

  return (
    <><div><Navbar /></div><div>
      <button className="eventdd" onClick={handleAddEventsClick}>Add Events</button>

      {isPopupOpen && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2>Insert Message for Event</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                value={eventMessage}
                onChange={handleMessageChange}
                placeholder="Enter your message"
                style={styles.input} />
              <button type="submit">Submit</button>
            </form>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
      {responseMessage && <p>{responseMessage}</p>}

      <h2>All Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index} style={styles.eventItem}>
            {event.Message}
            <button onClick={() => handleEditClick(event)}>Edit</button>
          </li>
        ))}
      </ul>

      {isEditPopupOpen && currentEvent && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2>Edit Event</h2>
            <p>{currentEvent.Message}</p>
            <p>Current Status: {currentEvent.IsActive === 1 ? 'Active' : 'Inactive'}</p>
            <button onClick={handleUpdateIsActive}>
              Set {currentEvent.IsActive === 1 ? 'Inactive' : 'Active'}
            </button>
            <button onClick={handleCloseEditPopup}>Close</button>
          </div>
        </div>
      )}
    </div></>
  );
}

const styles = {
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  eventItem: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
  },
};

export default Events;
