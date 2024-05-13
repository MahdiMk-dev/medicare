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
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@mui/icons-material";

function ProfileComponent() {
  const [info, setinfo] = useState([]);
  const[medform,setShowMedForm]=useState(false)
  const [medications, setmedications] = useState([]);
  const [requests, setrequests] = useState([]);
  const [unread, setUnread] = useState(0);
   const [showMedications, setShowMedications] = useState(false);
   const [showRequest, setShowRequests] = useState(false);
   const [showProfile, setProfile] = useState(true);
   const [EditProfile, setEditProfile] = useState(false);
   const [showMessages, setShowMessages] = useState(false);
   const [message, setMessage] = useState();
   const [file, setFile] = useState();
   const[image,setimage]=useState();
   const[error,setError]=useState();
const[medicationId,setMedicationId]=useState();
  const [medicationData, setMedicationData] = useState({
    name: '',
    dose: '',
    instructions:'',
    comments:'',
    Time:''
  });
   const token = localStorage.getItem('token');
   const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          }
        };
        function handleeditMed(id){
          setMedicationId(id);
          fetchmedData();
          setShowMedForm(true);
        }
  const handleSubmit = async (e) => {
        e.preventDefault();
        if (!medicationId) {
      // Make the GET request with the configured headers
      const response = await axios.post('http://localhost:8000/api/add_medication',medicationData, config)
            if(response.data.status=='success'){
                setShowMedForm(false);
              window.location.href = '/profile';
            }
            
            else{
              let d=response.data.message
              setError(d)
            }
        }
        else{
          console.log(medicationData)
           const response = await axios.post(`http://localhost:8000/api/medication/${medicationId}`,medicationData, config)
            if(response.data.status=='success'){
              setMedicationId();
              window.location.href = '/profile';
            }
            
            else{
              let d=response.data.message
              setError(d)
            }
        }
    };



   const [ProfileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email:'',
    phone_number:'',
    dob:'',
    address:'',
    img_file:''
  });

   const userData = useSelector(state => state.user.userData);
  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;

    if(name=="img_file"){
    setimage(URL.createObjectURL(e.target.files[0]));
    setData(prevData => ({
      ...prevData,
      [name]: e.target.files[0]
    }));
    setFile(e.target.files[0]);
    }
    else
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleDeleteMedication = async (id) => {
    try {
      
      const response = await axios.delete(`http://localhost:8000/api/delete_medication/${id}` ,config)
      const data = await response.data;

      if (data.status === 'success' ) {
        console.log('medication deleted successfully:', data);
        window.location.href="/profile"
        // Optionally, update state or perform any other actions after deletion
      } else {
        window.location.href="/profile"
        console.error('Failed to delete user:', data);
        // Handle error response
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }
  };
  function handleshowform(){
    setMedicationId();
    setMedicationData({name: '',
    dose: '',
    instructions:'',
    comments:'',
    Time:''})
  setShowMedForm(true);
  }
   const fetchmedData = async () => {
      try {

      // Make the GET request with the configured headers
      const response = await axios.get(`http://localhost:8000/api/get_medication/${medicationId}`, config)

  
        const data = response.data;
  
        if (data.status === 'success') {
          setMedicationData({
            name: data.medication.name,
            dose: data.medication.dose,
            instructions: data.medication.instructions,
            comments: data.medication.comments,
            Time:data.medication.Time
          });

        } else {
          window.location.href = '/auth';
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
   
   const handleeditInfo = async (e) => {
    e.preventDefault();
    console.log(ProfileData);
     try {
        const token = localStorage.getItem('token');
      //  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Make the GET request with the configured headers
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          }
        };
        const formData = new FormData();
        formData.append("filename", file);
        formData.append("first_name", ProfileData.first_name);
        formData.append("last_name", ProfileData.last_name);
        formData.append("dob", ProfileData.dob);
        formData.append("address", ProfileData.address);
        formData.append("phone_number", ProfileData.phone_number);
        console.log(ProfileData)
      const response = await axios.post('http://localhost:8000/api/edit_profile',formData ,config)

  
        const data = response.data;
  
        if (data.status === 'success'  ) {
          setMessage(`<div className='display-success'>{data.message</div>`)

        }
        else if (data.status === 'fail'){
          setMessage(`<div className='display-error'>{data.message</div>`)

        } else {
          window.location.href = '/auth';
        }
      } catch (error) {
        console.error('Error:', error);
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

              <button className="userEdit" onClick={()=>handleeditMed(params.row.id)}>Edit</button>

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDeleteMedication(params.row.id)}
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
     
   if (medicationId) {
    fetchmedData();
  }
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

          setFile(data.user.image_url);
          setimage(data.user.image_url)
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

          
          <div className="userShowInfo">
              <div className="name">{info.first_name} {info.last_name}</div>
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{info.email}</span>
            </div>
          <img className="profileImage" src={info.image_url}  alt="" width="100" height="100" />
        </div>
        <div className="sidenav-url">
          <div className="url">
            <a href="#settings" className={showProfile ? 'active' : ''} onClick={() => {handleMenuClick('profile');setShowMedForm(false);;setShowMessages(false);setEditProfile(false);setProfile(true);setShowMedications(false);setShowRequests(false);}}>
            Profile</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={EditProfile ? 'active' : ''} onClick={() => {handleMenuClick('editprofile');setShowMedForm(false);setShowMessages(false);setEditProfile(true);setProfile(false);setShowMedications(false);setShowRequests(false);}}>
            Edit Info</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={showMedications ? 'active' : ''} onClick={() => {handleMenuClick('medications');setShowMedForm(false);setShowMessages(false);setEditProfile(false);setProfile(false);setShowMedications(true);setShowRequests(false);}}>Medications</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={showRequest ? 'active' : ''} onClick={() => {handleMenuClick('requests');setShowMedForm(false);setShowMessages(false);setEditProfile(false);setProfile(false);setShowMedications(false);setShowRequests(true);}}>Requests</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="/live_chat" target="_blank" className={showMessages ? 'active' : ''} onClick={() => {handleMenuClick('messages');setShowMedForm(false);setShowMessages(true);setEditProfile(false);setProfile(false);setShowMedications(false);setShowRequests(false);}}>Messages ({unread})</a>
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
          <div className="createbutton">
            <button className="addMedications" onClick={handleshowform}>Create</button>
          </div>
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
             <div dangerouslySetInnerHTML={{ __html: message }}></div>
            <form className="coinsForm" onSubmit={handleeditInfo}>
              <div className="coinsFormLeft">
                 <label>First Name</label>
                  <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    value={ProfileData.first_name}
                    required
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                   <label>Last Name</label>
                  <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={ProfileData.last_name}
                    required
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                  <label>Address</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={ProfileData.address}
                    placeholder="Address"
                    required
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                  <label>Date of Birth</label>
                  <input
                     id="dob"
                    type="date"
                    name="dob"
                    value={ProfileData.dob}
                    required
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                  <label>Phone Number</label>
                  <input
                    id="phone_number"
                    type="text"
                    name="phone_number"
                    required
                    value={ProfileData.phone_number}
                    onChange={(e) => handleInputChange(e, setProfileData)}
                  />
                  <input type="file" name="img_file" id="file"  onChange={(e) => handleInputChange(e, setProfileData)} />
                  <img src={image} className="userUpdateImg"/>
                  <button className="requestButton" >Update</button>
              </div>
              </form>

          </div>
          </div>
        )}
        {medform &&(
        <div className="coins">
          <h2>Medication</h2>
          <div className="form-card">
            <form className="coinsForm" onSubmit={handleSubmit}>
             <div className='display-error'> {error && <p>{error}</p>} </div>
              <div className="requestFormLeft">
                <label>Name</label>
                  <input id="name" name="name" type="text" value={medicationData.name}
                    onChange={(e) => handleInputChange(e, setMedicationData)}  required/>
                 <label>Dose</label>
                  <input id="dose" name="dose" type="text" value={medicationData.dose}
                    onChange={(e) => handleInputChange(e, setMedicationData)} required />
                   <label>Instructions</label>
                  <input id="instructions" name="instructions" type="text" value={medicationData.instructions}
                    onChange={(e) => handleInputChange(e, setMedicationData)}  required />
                <label>Time</label>
                <input type="time" id="time" name="Time" value={medicationData.Time}
                    onChange={(e) => handleInputChange(e, setMedicationData)} required/>
                <label>Comments</label>
                <textarea
                  id="comments"
                  name="comments"
                  rows={5}
                  value={medicationData.comments}
                  onChange={(e) => handleInputChange(e, setMedicationData)} 
                  required
                />
                <button className="requestButton">Request</button>
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