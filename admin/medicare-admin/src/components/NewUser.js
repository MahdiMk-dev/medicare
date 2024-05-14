import '../styles/newUser.css';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function NewUser() {
  const { userId } = useParams();
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    status: 'active', // Set default value for status
    type: 'admin', // Set default value for type
    station_id: '0' // Set default value for station
  });

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        const response = await fetch('http://localhost:8000/api/admingetstations/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.status === 'success') {
          setStations(data.stations);
        }

        
        else {
          alert(data.message);
          window.location.href = "/admin_login";
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('admintoken');
      const response = await fetch('http://localhost:8000/api/createadminuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === 'success') {
        alert('created successfully');
        window.location.href = '/admin';
      }
      else if(data.status === 'duplicate') {
        alert(data.message);
        window.location.href = "/users";
      }
       else {
        alert(data.message);
        window.location.href = '/admin_login';
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
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
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
                  <option value="manager">Manager</option>
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
              <div className="userUpdateItem">
                <label>Status</label>
                <select
                  name="status"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Station</label>
                <select
                  name="station_id"
                  className="userUpdateInput"
                  onChange={handleChange}
                  required
                >
                  <option value="0">All</option>
                  {stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="newUserButton">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewUser;