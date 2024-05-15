import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@mui/icons-material";
  import ToggleOnIcon from '@mui/icons-material/ToggleOn';

import { Link } from "react-router-dom";
import '../styles/user.css'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import axios from 'axios';
function User() {

    const[image,setImage]=useState();
    const[file,setFile]=useState();
    const [data, setData] = useState({});
    const [message, setMessage] = useState();
    const [sidata, setsideData] = useState({});
    const { userId } = useParams(); // Get the userId from URL params
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        const response = await fetch('http://localhost:8000/api/get_user/'+userId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = await response.json();
        if(userData.status=='success'){
          setData(userData.user);
          setsideData(userData.user)
          setImage(userData.user.image_url)
      }
      else{
        alert(data.message)
      }
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);
      const handleChange = (e) => {
        const { id, value } = e.target;
    if(id=="file"){
      console.log('hi')
    setImage(URL.createObjectURL(e.target.files[0]));
    setData(prevData => ({
      ...prevData,
      [id]: e.target.files[0]
    }));
    setFile(e.target.files[0]);
    }
    else
        
        setData({ ...data, [id]: value });
    };
 const handleSubmit = async (e) => {
    e.preventDefault();
     
        const formData = new FormData();
        if(file)
          formData.append("filename", file);
        formData.append("first_name", data.first_name);
        formData.append("id",userId);
        formData.append("last_name", data.last_name);
        formData.append("email", data.email);
        formData.append("type", data.type);
        formData.append("phone_number", data.phone_number);

    try {
          const token = localStorage.getItem('admintoken');
      //  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Make the GET request with the configured headers
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          }
        };
        const response = await axios.post('http://localhost:8000/api/update_user',formData ,config)

  
        const data = response.data;
  
        if (data.status === 'success'  ) {
         window.location.href = '/admin';

        }
        else if (data.status === 'fail'){
          setMessage(`<div className='display-error'>{data.message</div>`)

        } else {
          window.location.href = '/admin';
        }
      console.log(data); // Handle the response data here
    } catch (error) {
      console.error('Error:', error);
    }
  }; 

  return (
    <div>
    <Topbar />
      <div className="admincontainer">
        <Sidebar />
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{sidata.first_name} {sidata.last_name}</span>
              <span className="userShowUserTitle">{data.type}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{sidata.email}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{sidata.phone_number}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
          <div dangerouslySetInnerHTML={{ __html: message }}></div>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  id="first_name"
                  placeholder={data.first_name}
                  className="userUpdateInput"
                  value={data.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  placeholder={data.last_name}
                  className="userUpdateInput"
                  value={data.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder={data.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                  value={data.email}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Type</label>
                 <select
                  placeholder="type"
                  id="type"
                  className="userUpdateInput"
                  value={data.type}
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
                  id="phone_number"
                  placeholder={data.phone_number}
                  className="userUpdateInput"
                  value={data.phone_number}
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
               <button className="userUpdateButton">Update</button>
               </div>
            </div>

          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
export default User;