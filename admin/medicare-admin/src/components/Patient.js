import {useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { collection, query, where, onSnapshot ,getDocs} from "firebase/firestore";
import { db } from '../firebase'; // Assuming this is the path to your Firebase initialization file
import { useParams } from 'react-router-dom';
import { DeleteOutline } from "@mui/icons-material";
import { Button } from '@mui/material';
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
    Email,
    Address,
    Home,
    Man3,
    CalendarTodayIcon
  } from "@mui/icons-material";

import '../styles/user.css'
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function Patient() {

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
  const { patientId } = useParams();
   const token = localStorage.getItem('admintoken');
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
              window.location.href = '/patients';
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
              window.location.href = '/patients';
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
        window.location.href="/patients"
        // Optionally, update state or perform any other actions after deletion
      } else {
        window.location.href="/patients"
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
          window.location.href = '/admin_login';
        }
      } catch (error) {
        console.error('Error:', error);
      }
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

              <Link to={"/medication/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
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


    const fetchData = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          }
        };

      // Make the GET request with the configured headers
      const response = await axios.get(`http://localhost:8000/api/get_patient/${patientId}`, config)

  
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
          window.location.href = '/admin_login';
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
      <div>
    <Topbar />
      <div className="admincontainer">
        <Sidebar />
    <div className="user">
    <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{info.first_name} {info.last_name}</span>
              <span className="userShowUserTitle">{info.type}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <Email className="userShowIcon" />
              <span className="userShowInfoTitle">{info.email}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{info.phone_number}</span>
              
            </div>
            <div className="userShowInfo">
              <Home className="userShowIcon" />
              <span className="userShowInfoTitle">{info.address}</span>
              
            </div>
            <div className="userShowInfo">
              <Man3 className="userShowIcon" />
              <span className="userShowInfoTitle">{info.gender}</span>
              
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{info.dob}</span>
              
            </div>


          </div>
        </div>
    <div className="productTitleContainer">
        <h1 className="productTitle">Medications</h1>
        
      </div>
       <div className="createbutton">
            
            <Link to={`/newmedication/${patientId}`}>
              <button className="userListEdit">Create</button>
            </Link>
      
          
          </div>
      <DataGrid
              rows={medications}
              disableSelectionOnClick
              columns={medicationstable}
              pageSize={8}
              checkboxSelection
            />
        <div className="productTitleContainer">
        <h1 className="productTitle">Requests</h1>
        
      </div>
      
       
              
       <DataGrid
              rows={requests}
              disableSelectionOnClick
              columns={requeststable}
              pageSize={8}
              checkboxSelection
            />
          
    </div>
    </div>
    </div>
  );
}
export default Patient;