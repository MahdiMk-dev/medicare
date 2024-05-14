import axios from "axios"; // Import Axios
import '../styles/request.css';
import React, { useEffect, useState } from 'react';

const RequestDoctor = () => {
    const [requestData, setRequestData] = useState({
        service_id:3,
        fromDate: "",
        toDate: "",
        fromTime: "",
        toTime: "",
        genderPreference: "any",
        comments: "",
        urgent:"",
        specialty:""
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

    return(
        
    <div className="request">

        <div class="form-bg">
        <h2>Request Doctor</h2>

            <div class="mainn">

                <div class="form">
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
                    <div class="form-row">
                        <div class="form-item">
                            <h4>Date</h4>
                        </div>
                        <div class="form-item">
                            <label>From</label>
                            <input required type="date" name="fromDate" value={requestData.fromDate} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-item">
                            <h4>Time</h4>
                        </div>
                        <div class="form-item">
                            <select required id="urgent" name="urgent" value={requestData.urgent} onChange={handleInputChange}>
                                <option value="" selected disabled>Select Option</option>
                                <option value="1">Urgent (The Soonest)</option>
                                <option value="0">Specific Time</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-item">
                        </div>
                        <div class="form-item">
                            <label>From</label>
                            <input required type="time" name="fromTime" value={requestData.fromTime} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-item">
                        </div>
                        <div class="form-item">
                            <label>To</label>
                            <input required type="time" name="toTime" value={requestData.toTime} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-item">
                            <h4>Speciality</h4>
                        </div>
                        <div class="form-item">
                            <select required id="specialty" name="specialty" value={requestData.specialty} onChange={handleInputChange}>
                                <option value="" selected disabled>Select Option</option>
                                <option value="any">Any</option>
                                <option value="neuro">Neurologist</option>
                                <option value="ortho">Orthopedics</option>
                                <option value="ortho">pediatrics</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-item">
                            <h4>Prefered Gender</h4>
                        </div>
                        <div class="form-item">
                            <select required id="genderSelect" name="genderPreference" value={requestData.genderPreference} onChange={handleInputChange}>
                                <option value="any">Any</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                    </div>
                    <h3>Comments</h3>
                    <div class="input-comments">
                    <textarea required class="comments" name="comments" value={requestData.comments} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="submit">
                        <button >Request</button>
                    </div>
                    </form>
                </div>
            </div>




        </div>
    </div>
    

    )
}
export default RequestDoctor;