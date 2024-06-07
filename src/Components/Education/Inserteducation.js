import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InsertEducation = ({ onClose }) => {
    const [formData, setFormData] = useState({
        FamilyMemberId: localStorage.getItem('FamilyMemberId'),
        Qualification: '',
        PassingYear: '',
        Schooling: '',
        Organisation: '',
        GPA: ''
    });
    const [educationData, setEducationData] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:51294/api/Education/InsEducation', formData);
            alert('Education data added successfully!');
            onClose(); // Close the popup
        } catch (error) {
            alert('Error occurred while adding education data');
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:51294/api/GetEducation');
                setEducationData(response.data);
            } catch (error) {
                console.error('Error fetching education data:', error);
            }
        };

        fetchData();
    }, [formData.FamilyMemberId]);

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Add Education</h2>
                <input type="text" name="Qualification" placeholder="Qualification" onChange={handleChange} />
                <input type="number" name="PassingYear" placeholder="Passing Year" onChange={handleChange} />
                <input type="text" name="Schooling" placeholder="Schooling" onChange={handleChange} />
                <input type="text" name="Organisation" placeholder="Organisation" onChange={handleChange} />
                <input type="number" name="GPA" placeholder="GPA" onChange={handleChange} />
                <button onClick={handleSubmit}>Add</button>
                <button onClick={onClose}>Cancel</button>
            </div>
            
            
        </div>
    );
};

export default InsertEducation;