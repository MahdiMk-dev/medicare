import {useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/profile.css';
import { DataGrid } from '@mui/x-data-grid';


function ProfileComponent() {
  const [info, setinfo] = useState([]);
  const [infoedit, seteditinfo] = useState([]);
  const [trips, settrips] = useState([]);
  const [previous, setprev] = useState([]);
  const [messages, setmessage] = useState([]);
  const [coins, setcoins] = useState([]);
  const [data, setData] = useState([]);
   const [upcommingdata, setupcommingdata] = useState([]);
   const [showTripHistory, setShowTripHistory] = useState(false);
   const [showRequestCoins, setShowRequestCoins] = useState(false);
   const [showTripIpcomming, setTripIpcomming] = useState(false);
   const [showProfile, setProfile] = useState(true);
   const [EditProfile, setEditProfile] = useState(false);
   const [showmessages, setshowmessages] = useState(false);
   const handleChange = (e) => {
    const { id, value } = e.target;
    seteditinfo(prevState => ({ ...prevState, [id]: value }));
  };
   
   const handleeditInfo = async (e) => {
    e.preventDefault();
    const first_name = document.getElementById('first_name').value;
    const city = document.getElementById('city').value;
    const dob = document.getElementById('dob').value;
    const phone_number = document.getElementById('phone_number').value;
    const last_name = document.getElementById('last_name').value;
    const formData = {
            first_name:first_name,
            last_name:last_name,
            dob:dob,
            city:city,
            phone_number:phone_number
    }
   

  }; 
   const handleSubmitRequest = async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const formData = {
            amount: amount
    }
   
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await fetch('http://localhost:8000/api/coinRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.status=='success'){
        alert('requested successfully')
        window.location.href='/profile'
      }
      else{
        alert(data.message)
         window.location.href="/login"
      }
      console.log(data); // Handle the response data here
    } catch (error) {
      console.error('Error:', error);
    }
  }; 
   
  useEffect(() => {

    // Simulating data fetching or any asynchronous operation
    // Set data after fetching or any asynchronous operation
    setData();
    setupcommingdata()
  }, []);
    const handleMenuClick = (menuItem) => {
    setShowTripHistory(menuItem === 'tripHistory');
    setShowRequestCoins(menuItem === 'requestCoins');
    setTripIpcomming(menuItem === 'upcomingTrips');
    setProfile(menuItem === 'profile');
    setEditProfile(menuItem === 'editprofile');
  };

  console.log(data)
  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "origin_station", headerName: "Medication", width: 120 },
    { field: "destination_station", headerName: "Dose", width: 120 },
    { field: "price", headerName: "Instructions", width: 120 },
    { field: "status", headerName: "comments", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          {params.row.status==='completed' && (
            <Link to={"/tripreview/" + params.row.id}>
              <button className="reviewListEdit">Add Review</button>
            </Link>
          )}
          </>
        );
      },
    },
  ];
    const upcommingcolumns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "Result", headerName: "result", width: 120 },
    { field: "Review", headerName: "Review", width: 120 },
    { field: "Doctor Review", headerName: "Doctor Review", width: 120 },

  ];

  
  const coinstable = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "amount", headerName: "Service", width: 120 },
    { field: "status", headerName: "Start Date", width: 120 },
    { field: "status", headerName: "Start Time", width: 120 },
    { field: "status", headerName: "staff Name", width: 120 },
    { field: "status", headerName: "staff Number", width: 120 }


  ];

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token)
            const response = await fetch('http://localhost:8000/api/show', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();
            console.log(data)
            if (data.status === 'success') {
              setinfo(data.passenger)
              
              seteditinfo({
                first_name: data.passenger.first_name,
                last_name: data.passenger.last_name,
                dob: data.passenger.dob,
                city: data.passenger.city,
                phone_number: data.passenger.phone_number
              });


                const transformedTrips = data.trips.map(trip => ({
    id: trip.id,
    origin_station: trip.trip.origin_station.name,
    destination_station: trip.trip.destination_station.name,
    price: trip.price,
    status: trip.status,
    departure_time: trip.trip.departure_time,
    arrival_time: trip.trip.arrival_time,
  }));
  const prevoistrips = data.previous.map(trip => ({
    id: trip.id,
    origin_station: trip.trip.origin_station.name,
    destination_station: trip.trip.destination_station.name,
    price: trip.price,
    status: trip.status,
    departure_time: trip.trip.departure_time,
    arrival_time: trip.trip.arrival_time,
  }));


    const messages = data.messages.map(message => ({
    id: message.id,
    name: message.passenger.first_name,
    from: message.user.name,
    content: message.content,
  }));
  const coins = data.coins.map(coin => ({
    id: coin.id,
    amount: coin.amount,
    status:coin.status,
  }));

              settrips([])

              setprev([])
              setcoins([])
              setmessage([])
                console.log(data)

            }
             else {
                alert(data.message);
                window.location.href = '/login';
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchData();
}, []);


  return (
    <div>
      <div className="sidenav">
        <div className="profile">

          <div className="name">{info.first_name} {info.last_name}</div>
        </div>
        <div className="sidenav-url">
          <div className="url">
            <a href="#settings" className={showProfile ? 'active' : ''} onClick={() => {handleMenuClick('profile');setEditProfile(false);setProfile(true);setShowTripHistory(false);setShowRequestCoins(false);setTripIpcomming(false);setshowmessages(false)}}>
            Profile</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={EditProfile ? 'active' : ''} onClick={() => {handleMenuClick('editprofile');setEditProfile(true);setProfile(false);setShowTripHistory(false);setShowRequestCoins(false);setTripIpcomming(false);setshowmessages(false)}}>
            Edit Info</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={showTripHistory ? 'active' : ''} onClick={() => {handleMenuClick('tripHistory');setEditProfile(false);setProfile(false);setShowTripHistory(true);setShowRequestCoins(false);setTripIpcomming(false);setshowmessages(false)}}>Medications</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={showRequestCoins ? 'active' : ''} onClick={() => {handleMenuClick('requestCoins');setEditProfile(false);setProfile(false);setShowRequestCoins(true);setShowTripHistory(false);;setTripIpcomming(false);setshowmessages(false)}}>Requests</a>
            <hr align="center" />
          </div>
           <div className="url">
            <a href="#settings" className={showTripIpcomming ? 'active' : ''} onClick={() => {handleMenuClick('upcomingTrips');setEditProfile(false);setProfile(false);setShowRequestCoins(false);setShowTripHistory(false);;setTripIpcomming(true);setshowmessages(false);}}>Add Result </a>
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
                  <td>{info.city}</td>
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
        {showTripHistory && (
          <div className="tripshistory">
          <h2>Medications </h2>
          <div className="table-card">
           
            <DataGrid
              rows={previous}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
            />
          </div>
          </div>
        )}
        {showTripIpcomming  && (
          <div className="tripshistory">
          <h2>Upcomming Trips</h2>
          <div className="table-card">
           
            <DataGrid
              rows={trips}
              disableSelectionOnClick
              columns={upcommingcolumns}
              pageSize={8}
              checkboxSelection
            />
          </div>
          </div>
        )}
        
                {showRequestCoins  && (
        <>
        <div className="coins">
         <h2> Requests</h2>
         <div className="table-card">
           
            <DataGrid
              rows={coins}
              disableSelectionOnClick
              columns={coinstable}
              pageSize={8}
              checkboxSelection
            />
          </div>
          </div>
        <div className="coins">
         <h2>Request Coins</h2>
          <div className="form-card">
      
            <form className="coinsForm"  onSubmit={handleSubmitRequest}>
              <div className="coinsFormLeft">
                 <label>Amount</label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="amount"
                    required
                  />
                  
                  <button className="requestButton">Request</button>
              </div>
              </form>

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
}
export default ProfileComponent;