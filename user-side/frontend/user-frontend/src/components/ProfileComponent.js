import {useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/profile.css';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import ChatBox from './ChatBox';
import { collection, query, where, onSnapshot ,getDocs} from "firebase/firestore";
import { db } from '../firebase'; // Assuming this is the path to your Firebase initialization file
import { useSelector } from 'react-redux';
import { DeleteOutline } from "@mui/icons-material";
import { Button } from '@mui/material';

function ProfileComponent() {
  const [info, setinfo] = useState([]);
  const [medications, setmedications] = useState([]);
  const [requests, setrequests] = useState([]);
  const [unread, setUnread] = useState(0);
   const [showMedications, setShowMedications] = useState(false);
   const [showRequest, setShowRequests] = useState(false);
   const [showProfile, setProfile] = useState(true);
   const [EditProfile, setEditProfile] = useState(false);
   const [showMessages, setShowMessages] = useState(false);

   const [ProfileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email:'',
    phone_number:'',
    dob:'',
    address:''
  });
   const userData = useSelector(state => state.user.userData);
   const [phone_number, setPhoneNumber] = useState('');

  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
    console.log(ProfileData)
  };

   
   const handleeditInfo = async (e) => {
    e.preventDefault();
    const first_name = document.getElementById('first_name').value;
    const address = document.getElementById('address').value;
    const dob = document.getElementById('dob').value;
    const phone_number = document.getElementById('phone_number').value;
    const last_name = document.getElementById('last_name').value;
    const formData = {
            first_name:first_name,
            last_name:last_name,
            dob:dob,
            address:address,
            phone_number:phone_number
    }
   

  }; 
   
    const handleMenuClick = (menuItem) => {
    setShowMedications(menuItem === 'medications');
    setShowRequests(menuItem === 'requests');
    setProfile(menuItem === 'profile');
    setEditProfile(menuItem === 'editprofile');
    setShowMessages(menuItem==='messages')
  };

  const medicationstable = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "name", headerName: "Name", width: 120 },
    { field: "dose", headerName: "Dose", width: 120 },
    { field: "instructions", headerName: "Instructions", width: 120 },
    { field: "comments", headerName: "Comments", width: 120 },
    { field: "Time", headerName: "Time", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          
          <>
            <Link to={"/medications/" + params.row.id}>
              <button className="userEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
            />
          </>
        );
      },
    },
  ];  
  const requeststable = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "service", headerName: "Service", width: 120 },
    { field: "start_time", headerName: "Start Time", width: 120 },
    { field: "end_time", headerName: "End Time", width: 120 },
    { field: "user", headerName: "staff Name ", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <td className={`widgetLgButton ${params.value}`}>
          <Button className={`widgetLgButton ${params.value}`} >{params.value}</Button>
          
        </td>
      ),
    },
  ];

  useEffect(() => {
    async function getUnreadMessagesCount() {
  try {
    // Query messages where read is false (unread messages)
    const q = query(
      collection(db, "messages"),
      where('ReceiverId','==',userData.id),
      where('read', '==', false)
    );

    // Get the documents
    const querySnapshot = await getDocs(q);

    // Return the count of unread messages
    return querySnapshot.size;
  } catch (error) {
    console.error("Error fetching unread messages count:", error);
    return 0; // Return 0 if there's an error
  }
}
function subscribeToMessages() {
  const unsubscribe = onSnapshot(collection(db, "messages"), () => {
    // When new messages are added, update the unread messages count
    getUnreadMessagesCount().then(count => {
      console.log("Updated unread messages count:", count);
      setUnread(count)
      // Do something with the updated count (e.g., update the UI)
    });
  });

  // Return the unsubscribe function
  return unsubscribe;
}
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          }
        };

      // Make the GET request with the configured headers
      const response = await axios.get('http://localhost:8000/api/show', config)

  
        const data = response.data;
  
        if (data.status === 'success') {
          setinfo(data.user);
  
          setProfileData({
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            dob: data.user.dob,
            address: data.user.address,
            phone_number: data.user.phone_number
          });
  
          const medicationsData = data.medications.map(medication => ({
            id: medication.id,
            name: medication.name,
            dose: medication.dose,
            instructions: medication.instructions,
            comments: medication.comments,
            Time: medication.Time,

          }));
          console.log(medications)
  
          const requests = data.requests.map(request => ({
            id: request.id,
            service: request.service.type,
            start_time: request.start,
            end_time: request.end,
            status: request.status,
            user: request.user.first_name,
          }));

  
          
  
          setmedications(medicationsData);
          setrequests(requests);
          console.log(medications)

        } else {
          window.location.href = '/auth';
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
    subscribeToMessages();
  }, []);
  return (
    <div className='page'>
      <div className="sidenav">
        <div className="profile">

          <div className="name">{info.first_name} {info.last_name}</div>
        </div>
        <div className="sidenav-url">
          <div className="url">
            <a href="#settings" className={showProfile ? 'active' : ''} onClick={() => {handleMenuClick('profile');setShowMessages(false);setEditProfile(false);setProfile(true);setShowMedications(false);setShowRequests(false);}}>
            Profile</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={EditProfile ? 'active' : ''} onClick={() => {handleMenuClick('editprofile');setShowMessages(false);setEditProfile(true);setProfile(false);setShowMedications(false);setShowRequests(false);}}>
            Edit Info</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={showMedications ? 'active' : ''} onClick={() => {handleMenuClick('medications');setShowMessages(false);setEditProfile(false);setProfile(false);setShowMedications(true);setShowRequests(false);}}>Medications</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={showRequest ? 'active' : ''} onClick={() => {handleMenuClick('requests');setShowMessages(false);setEditProfile(false);setProfile(false);setShowMedications(false);setShowRequests(true);}}>Requests</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="/live_chat" target="_blank" className={showMessages ? 'active' : ''} onClick={() => {handleMenuClick('messages');setShowMessages(true);setEditProfile(false);setProfile(false);setShowMedications(false);setShowRequests(false);}}>Messages ({unread})</a>
            <hr align="center" />
          </div>

          
        </div>
      </div>
      <div className="mainprofile">
        <h2>Personal Info</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit"></i>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{info.first_name} {info.last_name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{info.email}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>
                  <td>{info.address}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>:</td>
                  <td>{info.gender}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>:</td>
                  <td>{info.dob}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>:</td>
                  <td>{info.phone_number}</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>

        {showMedications && (
          <div className="tripshistory">
          <h2>Medications </h2>
          <div className="table-card">
           
            <DataGrid
              rows={medications}
              disableSelectionOnClick
              columns={medicationstable}
              pageSize={8}
              checkboxSelection
            />
          </div>
          </div>
        )}

        
                {showRequest  && (
        <>
        <div className="coins">
         <h2> Requests</h2>
         <div className="table-card">
           
            <DataGrid
              rows={requests}
              disableSelectionOnClick
              columns={requeststable}
              pageSize={8}
              checkboxSelection
            />
          </div>
          </div>

          </>
        )}
                {showMessages  && (
        <>
        <div className="coins">
         <h2> Messages</h2>
        
          </div>

          </>
        )}
        {EditProfile  && (
        <div className="coins">
         <h2>Edit Profile</h2>
          <div className="form-card">
      
            <form className="coinsForm" onSubmit={handleeditInfo}>
              <div className="coinsFormLeft">
                 <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={ProfileData.first_name}
                    required
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                   <label>Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={ProfileData.last_name}
                    required
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={ProfileData.address}
                    placeholder="Address"
                    required
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={ProfileData.dob}
                    required
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    required
                    value={ProfileData.phone_number}
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                  <button className="requestButton" >Update</button>
              </div>
              </form>

          </div>
          </div>
        )}
         
          </div>
        </div>

  );
}; 

export default ProfileComponent;