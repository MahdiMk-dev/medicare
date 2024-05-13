import axios from "axios"; // Import Axios
import '../styles/request.css';
import React, { useEffect, useState } from 'react';


const RequestPhlebotomist = () => {
    const [requestData, setRequestData] = useState({
        service_id:3,
        fromDate: "",
        toDate: "",
        fromTime: "",
        toTime: "",
        genderPreference: "any",
        comments: "",
        urgent:"",
        specialty:"",
        img_file:''
    });
    const[file,setFile]=useState()
    const[image,setimage]=useState()
    const [error,setError]=useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    if(name=="img_file"){
    setimage(URL.createObjectURL(e.target.files[0]));
    setRequestData(prevData => ({
      ...prevData,
      [name]: file
    }));
    setFile(e.target.files[0]);
    }
    else{
    
        setRequestData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    };
    const token = localStorage.getItem('token');
   const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          }
        };

 const handleSubmit = async (e) => {
        e.preventDefault();        // Make a POST request to the API endpoint with requestData
        const formData = new FormData();
        formData.append("filename", file);
        formData.append("fromDate", requestData.fromDate);
        formData.append("fromTime", requestData.fromTime);
        formData.append("toTime", requestData.toTime);
        formData.append("genderPreference", requestData.genderPreference);
        formData.append("urgent", requestData.urgent);
        formData.append("comments", requestData.comments);
        formData.append("service_id", requestData.service_id);

        const response = await axios.post('http://localhost:8000/api/create-request', formData,config)
            if(response.data.status=='success'){
              window.location.href = '/';
            }
            
            else if(response.data.status=='error'){
              let d=response.data.message
              setError(d)
            }
            else{
                console.log(response.data.message)
               window.location.href = '/auth'; 
            }
    };
return(
    <div className="request">

    <div class="form-bg">
    <h2>Request Phlebotomist</h2>

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
                    <label>On</label>

                        <input required type="date" name="fromDate" value={requestData.fromDate} onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-item">
                        <h4>Time</h4>
                    </div>
                    <div class="form-item">
                        <select required id="urgent" name="urgent" value={requestData.urgent} onChange={handleInputChange}>
                            <option value="1">Urgent (The soonest)</option>
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
                <div class="form-row">
                    <div class="form-item">
                        <h4>Upload Document</h4>
                    </div>
                    <div class="form-item">
                        <input  type="file" name="img_file" id="file"  onChange={handleInputChange} />
                        {image && (<img src={image} className="userUpdateImg"/> )}
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
export default RequestPhlebotomist;