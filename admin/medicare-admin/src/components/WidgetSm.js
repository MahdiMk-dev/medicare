import '../styles//widget.css'

import { Visibility } from "@mui/icons-material";
import { useState,useEffect } from "react";
function WidgetSm() {
  const[patientss,setPatients]=useState();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        const response = await fetch('http://localhost:8000/api/get_dashboard/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = await response.json();
        if(userData.status=='success'){
          setPatients(userData.patients);
          console.log(userData.patients)
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
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Patients</span>
      <ul className="widgetSmList">
        {patientss && patientss.length > 0 && patientss.map((patient) => (
        <li key={patient.id} className="widgetSmListItem">
          <img
            src={patient.image_url} // Assuming each patient object has a profileImageUrl property
            alt={patient.first_name} // Assuming each patient object has a name property
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{patient.first_name} {patient.last_name}</span>
            <span className="widgetSmUserTitle">{patient.type}</span> {/* Assuming each patient object has a title property */}
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default WidgetSm;