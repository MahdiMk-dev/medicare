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
function Medications() {

    const[image,setImage]=useState();
    const[file,setFile]=useState();
    const [meddata, setData] = useState({});
    const [message, setMessage] = useState();
    const [sidata, setsideData] = useState({});
    const { medicationId } = useParams(); // Get the userId from URL params
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        const response = await fetch('http://localhost:8000/api/get_medication/'+medicationId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = await response.json();
        if(userData.status=='success'){
          setData(userData.medication);
          setsideData(userData.medication)
      }
      else{
        alert(userData.message)
      }
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);
      const handleChange = (e) => {
        const { id, value } = e.target;
        
        setData({ ...meddata, [id]: value });
    };
 const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(meddata)
     

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
        const response = await axios.post(`http://localhost:8000/api/medication/${medicationId}`,meddata ,config)

  
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
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
          <div dangerouslySetInnerHTML={{ __html: message }}></div>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder={meddata.name}
                  className="userUpdateInput"
                  value={meddata.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Dose</label>
                <input
                  type="text"
                  id="dose"
                  placeholder={meddata.dose}
                  className="userUpdateInput"
                  value={meddata.dose}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Instructions</label>
                <input
                  type="text"
                  id="instructions"
                  placeholder={meddata.instructions}
                  className="userUpdateInput"
                  onChange={handleChange}
                  value={meddata.instructions}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Time</label>
                <input
                  type="time"
                  id="Time"
                  placeholder={meddata.Time}
                  className="userUpdateInput"
                  value={meddata.Time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Comments</label>
                <textarea
                  id="comments"
                  placeholder={meddata.comments}
                  className="userUpdateInput"
                  value={meddata.comments}
                  onChange={handleChange}
                  required
                />
              </div>
              
                
               <button className="userUpdateButton">Update</button>
              
            </div>

          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
export default Medications;