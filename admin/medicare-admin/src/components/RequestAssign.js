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
function RequestAssign() {

    const[image,setImage]=useState();
    const[file,setFile]=useState();
    const [data, setData] = useState({});
    const [message, setMessage] = useState();
    const [sidata, setsideData] = useState({});
    const [staff, setStaff] = useState({});
    const[typestaff,setType]= useState();
    
    const token = localStorage.getItem('admintoken');
      //  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Make the GET request with the configured headers
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          }
        };
    const { requestId } = useParams(); // Get the userId from URL params
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        const response = await fetch('http://localhost:8000/api/get_request/'+requestId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = await response.json();
        if(userData.status=='success'){
          setData(userData.orders);
          const requests = userData.orders.map(request => ({
                          id: request.id,
                          service: request.service.type,
                          start: request.start,
                          end: request.end,
                          urgent: request.urgent,
                          specialty: request.specialty,
                          gender: request.gender,
                          status: request.status,
                          comments:request.comments
                        }));
          setsideData(requests[0])
          const formData = new FormData();
        formData.append("type", requests[0].service);
        const token = localStorage.getItem('admintoken');
        const responses = await axios.post('http://localhost:8000/api/get_staff',formData ,config)
        const staff = await responses.data;
        if(staff.status=='success'){

          const staffd = staff.users.map(request => ({
                          id: request.id,
                          name:request.first_name+' '+request.last_name
                        }));
          setStaff(staffd)
      }
      else{
        alert(data.message)
      }
          setType(requests[0].service)
          console.log(typestaff)
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
        
        setData({ ...data, [id]: value });
    };
    const handleSubmit = async (e) => {
    e.preventDefault();
     
        const formData = new FormData();
        formData.append("staff_id", data.staff_id);
        formData.append("order_id", requestId);

    try {

        const response = await axios.post('http://localhost:8000/api/duties',formData ,config)

  
        const data = response.data;
  
        if (data.status === 'success'  ) {
         window.location.href = '/requests';

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
        <h1 className="userTitle">View Request</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
           <label>Service </label>
            <div className="userShowTopTitle">

              <span className="userShowUsername">{sidata.service} </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userUpdateItem">Request Status</span>
            <div className="userShowInfo">
              
              <span className="userShowInfoTitle">{sidata.status}</span>
            </div>
            <span className="userUpdateItem">Request Details</span>
            <div className="userUpdateItem">
              <label>Start Date </label>
              <span className="userShowInfoTitle">{sidata.start}</span>
            </div>
            <div className="userUpdateItem">
              <label>End Date </label>
              <span className="userShowInfoTitle">{sidata.end}</span>
            </div>
            <div className="userUpdateItem">
              <label>Preferred Gender </label>
              <span className="userShowInfoTitle">{sidata.gender}</span>
            </div>
            <div className="userUpdateItem">
              <label>Spciality </label>
              <span className="userShowInfoTitle">{sidata.specialty}</span>
            </div>
            <div className="userUpdateItem">
              <label>Comments </label>
              <span className="userShowInfoTitle">{sidata.comments}</span>
            </div>
          </div>
        </div>

        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
          <div dangerouslySetInnerHTML={{ __html: message }}></div>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Staff Name</label>
                <select
                  placeholder="staff_id"
                  id="staff_id"
                  className="userUpdateInput"
                  onChange={handleChange}
                >
                <option value="" disabled selected>Select Staff</option>
                {Array.isArray(staff) ? (
                  staff.map((s) => (
                      <option key={s.id} value={s.id}>
                          {s.name}
                      </option>
                  ))
              ) : (
                  // If it's not an array or doesn't have the map function, display a default option
                  <option value="">No staff available</option>
              )}              
                 </select>
              </div>

              <div className="userUpdateRight">
               <button className="userUpdateButton">Assign</button>
               
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
export default RequestAssign;