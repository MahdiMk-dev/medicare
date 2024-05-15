import '../styles/newUser.css';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { useState, useEffect } from "react";

import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@mui/icons-material";
import axios from 'axios';
import { useParams } from 'react-router-dom';
function NewMedication() {
    const { patientId } = useParams();
  const [stations, setStations] = useState([]);

    const [message, setMessage] = useState();
   const[image,setImage]=useState();
    const[file,setFile]=useState();
  const [formData, setFormData] = useState({
    user_id:patientId,
    name: '',
    dose:'',
    instructions: '',
    Time: '',
    comments: '',
  });


  const handleChange = (e) => {
     const { id, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('admintoken');
       const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          }
        };
        const response = await axios.post('http://localhost:8000/api/add_medication',formData ,config)

  
        const data = response.data;
  
        if (data.status === 'success'  ) {
         window.location.href = '/admin';

        }
        else if (data.status === 'duplicate'){
          setMessage(`<div className='display-error'>{data.message</div>`)

        } else {
          window.location.href = '/admin';
        }

    } catch (error) {
      console.error('Error:', error);
    }
  }; 

  return (
    <div>
      <Topbar />
      <div className="admincontainer">
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">New User</h1>
          <form className="newUserForm" onSubmit={handleSubmit}>
          <div dangerouslySetInnerHTML={{ __html: message }}></div>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
               <label>Dose</label>
                <input
                  type="text"
                  placeholder="Dose"
                  name="dose"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Instructions</label>
                <input
                  type="text"
                  name="instructions"
                  placeholder="instructions"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Time</label>
                <input
                  type="time"
                  name="Time"
                  placeholder="Time"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Comments</label>
                <textarea
                  name="comments"
                  placeholder="comments"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="newUserButton">Create</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewMedication;