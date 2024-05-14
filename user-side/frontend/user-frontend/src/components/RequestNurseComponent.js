import axios from "axios"; // Import Axios
import '../styles/request.css';
import React, { useEffect, useState } from 'react';

const RequestNurse = () => {
    const [requestData, setRequestData] = useState({
        service_id:1,
        fromDate: "",
        toDate: "",
        fromTime: "",
        toTime: "",
        genderPreference: "any",
        comments: "",
        timeSelect:""
    });
    const [error,setError]=useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequestData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const token = localStorage.getItem('token');
   const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          }
        };

 const handleSubmit = async (e) => {
        e.preventDefault();        // Make a POST request to the API endpoint with requestData
        const response = await axios.post('http://localhost:8000/api/create-request', requestData,config)
            if(response.data.status=='success'){
              window.location.href = '/';
            }
            
            else if(response.data.status=='error'){
              let d=response.data.message
              setError(d)
            }
            else{
               window.location.href = '/auth'; 
            }
    };

    return (
        <div className="request">
            <div className="form-bg">
                <div className="mainn">
               <div className="separate"></div>
                    <div className="form">
                    <h2>Request Nurse</h2>

                    <form onSubmit={handleSubmit}>
                        <div className='display-error'> 
                            <ul>
                                {Object.entries(error).map(([key, value]) => (
                                  <li key={key}>
                                    <strong>{key}:</strong> {value}
                                  </li>
                                ))}
                            </ul>
                        </div>
                        <div className="form-row">
                            <div className="form-item">
                                <h4>Date</h4>
                            </div>
                            <div className="form-item">
                                <label>From</label>
                                <input required type="date" name="fromDate" value={requestData.fromDate} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-item"></div>
                            <div className="form-item">
                                <label>To</label>
                                <input required type="date" name="toDate" value={requestData.toDate} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-item">
                                <h4>Time</h4>
                            </div>
                            <div className="form-item">
                                <select required id="timeSelect" name="timeSelect" value={requestData.timeSelect} onChange={handleInputChange}>
                                     <option value="" selected disabled>Select Option</option>
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
                                        <input required type="time" name="fromTime" value={requestData.fromTime} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-item"></div>
                                    <div className="form-item">
                                        <label>To</label>
                                        <input required type="time" name="toTime" value={requestData.toTime} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="form-row">
                            <div className="form-item">
                                <h4>Preferred Gender</h4>
                            </div>
                            <div className="form-item">
                                <select required id="genderSelect" name="genderPreference" value={requestData.genderPreference} onChange={handleInputChange}>
                                    <option value="any">Any</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                            </div>
                        </div>
                        <h3>Comments</h3>
                        <div className="input-comments">
                            <textarea required className="comments" name="comments" value={requestData.comments} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="submit">
                            <button >Request</button>
                        </div>
                        </form>
                    </div>
                
                </div>

            </div>
        </div>
    );
};

export default RequestNurse;
