import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
    MoreHoriz
  } from "@mui/icons-material";
  import ToggleOnIcon from '@mui/icons-material/ToggleOn';

import { Link } from "react-router-dom";
import '../styles/user.css'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import axios from 'axios';
function RequestView() {

    const[image,setImage]=useState();
    const[file,setFile]=useState();
    const [data, setData] = useState({});
    const [message, setMessage] = useState();
    const [sidata, setsideData] = useState({});
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
          console.log(requests)
          setsideData(requests[0])
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

      </div>
    </div>
    </div>
    </div>
  );
}
export default RequestView;