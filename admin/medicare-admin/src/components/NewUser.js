import '../styles/newUser.css';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@mui/icons-material";
import axios from 'axios';
function NewUser() {
  const { userId } = useParams();
  const [stations, setStations] = useState([]);

    const [message, setMessage] = useState();
   const[image,setImage]=useState();
    const[file,setFile]=useState();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name:'',
    email: '',
    password: '',
    phone_number: '',
    type: '', // Set default value for type
  });


  const handleChange = (e) => {
     const { id, value } = e.target;
    if(id=="file"){
     
    setImage(URL.createObjectURL(e.target.files[0]));
    setFormData(prevData => ({
      ...prevData,
      [id]: e.target.files[0]
    }));
    setFile(e.target.files[0]);
    }
    else
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
        const response = await axios.post('http://localhost:8000/api/create_user',formData ,config)

  
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
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
               <label>Last Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="last_name"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Type</label>
                <select
                  name="type"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                >
                  <option value="admin">Admin</option>
                <option value="Nurse">Nurse</option>
                <option value="Doctor">Doctor</option>
                <option value="Phlebotomist">Phlebotomist</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Phone"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={image} alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} onChange={handleChange} />
                </div>
              <button type="submit" className="newUserButton">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewUser;