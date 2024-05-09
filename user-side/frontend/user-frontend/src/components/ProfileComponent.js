import {useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/profile.css';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';



function ProfileComponent() {
  const [info, setinfo] = useState([]);
  const [infoedit, seteditinfo] = useState([]);
  const [medications, setmedications] = useState([]);
  const [requests, setrequests] = useState([]);
  const [data, setData] = useState([]);
   const [showMedications, setShowMedications] = useState(false);
   const [showRequest, setShowRequests] = useState(false);
   const [showProfile, setProfile] = useState(true);
   const [EditProfile, setEditProfile] = useState(false);
   const handleChange = (e) => {
    const { id, value } = e.target;
    seteditinfo(prevState => ({ ...prevState, [id]: value }));
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
   

  
   
  useEffect(() => {

    setData();
    setupcommingdata()
  }, []);
    const handleMenuClick = (menuItem) => {
    setShowMedications(menuItem === 'medications');
    setShowRequests(menuItem === 'requests');
    setProfile(menuItem === 'profile');
    setEditProfile(menuItem === 'editprofile');
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
          {params.row.status==='completed' && (
            <Link to={"/tripreview/" + params.row.id}>
              <button className="reviewListEdit">edit</button>
            </Link>
          )}
          </>
        );
      },
    },
  ];
    const resultstable = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "Result", headerName: "result", width: 120 },
    { field: "Review", headerName: "Review", width: 120 },
    { field: "Doctor Review", headerName: "Doctor Review", width: 120 },

  ];

  
  const requeststable = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "service", headerName: "Service", width: 120 },
    { field: "startD ", headerName: "Start Date", width: 120 },
    { field: "startT", headerName: "Start Time", width: 120 },
    { field: "staffN", headerName: "staff Name", width: 120 },
    { field: "staffNum", headerName: "staff Number ", width: 120 }


  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
  
        const response = await axios.post('http://localhost:8000/api/show', null, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        const data = response.data;
  
        if (data.status === 'success') {
          setinfo(data.user);
  
          seteditinfo({
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            dob: data.user.dob,
            address: data.user.address,
            phone_number: data.user.phone_number
          });
  
          const medications = data.user.medications.map(medication => ({
            id: medication.id,
            name: medication.user.medication.name,
            dose: medication.user.medication.dose,
            instructions: medication.user.medication.instructions,
            comments: medication.user.medication.comments,
            Time: medication.user.medication.Time,

          }));
  
          const requests = data.requests.map(request => ({
            id: request.id,
            service_id: request.user.request.service_id,
            start: request.user.request.start,
            end: request.user.request.end,
            status: request.user.request.status,
            created_at: request.user.request.created_at,
          }));

  

  
          setmedications([medications]);
          setrequests([requests]);

        } else {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, []);
  const handleSubmitRequest = async (e) => {
    e.preventDefault();


  }; 
   

  


  return (
    <div className='page'>
      <div className="sidenav">
        <div className="profile">

          <div className="name">{info.first_name} {info.last_name}</div>
        </div>
        <div className="sidenav-url">
          <div className="url">
            <a href="#settings" className={showProfile ? 'active' : ''} onClick={() => {handleMenuClick('profile');setEditProfile(false);setProfile(true);setShowMedications(false);setShowRequests(false);}}>
            Profile</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={EditProfile ? 'active' : ''} onClick={() => {handleMenuClick('editprofile');setEditProfile(true);setProfile(false);setShowMedications(false);setShowRequests(false);}}>
            Edit Info</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={showMedications ? 'active' : ''} onClick={() => {handleMenuClick('medications');setEditProfile(false);setProfile(false);setmedications(true);setShowRequests(false);}}>Medications</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={showRequest ? 'active' : ''} onClick={() => {handleMenuClick('requests');setEditProfile(false);setProfile(false);setShowMedications(false);setShowRequests(true);}}>Requests</a>
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
              rows={previous}
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
        {EditProfile  && (
        <div className="coins">
         <h2>Edit Profile</h2>
          <div className="form-card">
      
            <form className="coinsForm" onSubmit={handleeditInfo}>
              <div className="coinsFormLeft">
                 <label>First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    value={info.first_name}
                    required
                    onChange={handleChange}
                  />
                   <label>Name</label>
                  <input
                    type="text"
                    id="last_name"
                    value={info.last_name}
                    required
                    onChange={handleChange}
                  />
                  <label>City</label>
                  <input
                    type="text"
                    id="city"
                    value={info.city}
                    placeholder="city"
                    required
                    onChange={handleChange}
                  />
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    value={info.dob}
                    required
                    onChange={handleChange}
                  />
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={info.phone_number}
                    id="phone_number"
                    required
                    onChange={handleChange}
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