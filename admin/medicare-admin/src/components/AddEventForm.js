import React, { useState,useEffect } from 'react';
import '../styles/popup.css'
import axios from 'axios'
const StaffCalendarForm = ({ handleClose, handleFormSubmit }) => {
  const [staffId, setStaffId] = useState();
   const [staffI, setStaffI] = useState();
  const token = localStorage.getItem('admintoken');
  const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          }
        };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(staffId);
  };
  useEffect(() => {
    // Fetch staff schedules from Laravel backend when component mounts

      try {
              axios.get('http://localhost:8000/api/getadminusers', config).then(response => {

              if(response.data.status=='success'){
                if (response.data.users.length>0) {
                        const staffd = response.data.users.map(request => ({
                          id: request.id,
                          name:request.first_name+' '+request.last_name
                        }));
                        setStaffI(staffd);
                    }
                }
              
              else{
               alert('not authorized to add schedule')
              }
            })
          
            } catch (error) {
              console.error('Error:', error);
            }
  }, []);

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={handleClose}>Close</button>
        <h2>Select Staff</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="staffId">Select Staff:</label>
          <select id="staffId" value={staffId} onChange={(e) => setStaffId(e.target.value)}>
            <option value="">Select staff</option>
            {Array.isArray(staffI) ? (
                  staffI.map((s) => (
                      <option key={s.id} value={s.id}>
                          {s.name}
                      </option>
                  ))
              ) : (
                  // If it's not an array or doesn't have the map function, display a default option
                  <option value="">No staff available</option>
              )}   
 
            {/* Add more options for staff members */}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default StaffCalendarForm;
