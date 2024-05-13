import React, { useState } from "react";
import axios from "axios"; // Import Axios
import '../styles/request.css';

const RequestNurse = () => {
    const [requestData, setRequestData] = useState({
        fromDate: "",
        toDate: "",
        fromTime: "",
        toTime: "",
        genderPreference: "any",
        comments: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequestData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRequest = () => {
        // Make a POST request to the API endpoint with requestData
        axios.post('http://localhost:8000/api/requestNurse', requestData)
            .then(function(response) {
                // Handle success
                console.log('Nurse requested successfully', response.data);
                alert('Nurse requested successfully');
            })
            .catch(function(error) {
                // Handle error
                console.error('Error requesting nurse', error);
                alert('Error requesting nurse');
            });
    };

    return (
        <div className="request">
            <div className="form-bg">
                <h2>Request Nurse</h2>
                <div className="mainn">
                    <div className="form">
                        <div className="form-row">
                            <div className="form-item">
                                <h4>Date</h4>
                            </div>
                            <div className="form-item">
                                <label>From</label>
                                <input type="date" name="fromDate" value={requestData.fromDate} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-item"></div>
                            <div className="form-item">
                                <label>To</label>
                                <input type="date" name="toDate" value={requestData.toDate} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-item">
                                <h4>Time</h4>
                            </div>
                            <div className="form-item">
                                <select id="timeSelect" name="timeSelect" value={requestData.timeSelect} onChange={handleInputChange}>
                                    <option value="24/24">24/24 (All day)</option>
                                    <option value="specific-time">Specific Time</option>
                                </select>
                            </div>
                        </div>
                        {/* Hide or show based on time selection */}
                        {requestData.timeSelect === "24/24" ? null : (
                            <>
                                <div className="form-row">
                                    <div className="form-item"></div>
                                    <div className="form-item">
                                        <label>From</label>
                                        <input type="time" name="fromTime" value={requestData.fromTime} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-item"></div>
                                    <div className="form-item">
                                        <label>To</label>
                                        <input type="time" name="toTime" value={requestData.toTime} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="form-row">
                            <div className="form-item">
                                <h4>Preferred Gender</h4>
                            </div>
                            <div className="form-item">
                                <select id="genderSelect" name="genderPreference" value={requestData.genderPreference} onChange={handleInputChange}>
                                    <option value="any">Any</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                            </div>
                        </div>
                        <h3>Comments</h3>
                        <div className="input-comments">
                            <textarea className="comments" name="comments" value={requestData.comments} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="submit">
                            <button onClick={handleRequest}>Request</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestNurse;
