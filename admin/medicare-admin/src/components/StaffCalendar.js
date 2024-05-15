import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEventForm from './AddEventForm'; // Assuming the form is in a separate file
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import dateFormat from 'dateformat';
const localizer = momentLocalizer(moment);

const StaffCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  const token = localStorage.getItem('admintoken');
  const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          }
        };

 const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  useEffect(() => {
    // Fetch staff schedules from Laravel backend when component mounts
    axios.get('http://localhost:8000/api/get_schedule' ,config)
      .then(response => {
        if(response.data.status=='success'){
        const formattedEvents = response.data.schedule.map(event => ({
          id: event.id,
          title: `${event.user.first_name} ${event.user.last_name} - Shift`,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      }
      else
        window.location.href='/admin_login'
      })
      .catch(error => {
        console.error('Error fetching schedules:', error);
      });

  }, []);

   const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowForm(true);
  };

  const handleFormSubmit = (staffId) => {
    setSelectedStaffId(staffId);
    setShowForm(false);
    // Here you can add logic to create the event using the selectedSlot and staffId
    console.log('Selected slot:', selectedSlot);
    console.log('Selected staff ID:', staffId);
    console.log(dateFormat(selectedSlot.start,'yyyy-mm-dd hh:mm:ss'))
    const formData = new FormData();
        formData.append("staff_id", staffId);
        formData.append("start", dateFormat(selectedSlot.start,'yyyy-mm-dd hh:mm:ss'));
        formData.append("end", dateFormat(selectedSlot.end,'yyyy-mm-dd hh:mm:ss'));
        console.log(formData)
     axios.post('http://localhost:8000/api/add_schedule',formData ,config)
      .then(response => {
        if(response.data.status=='success'){
        
      }
      else
        window.location.href='/admin_login'
      })
    // Reset the selectedSlot and selectedStaffId states after form submission
    setSelectedSlot(null);
    setSelectedStaffId(null);
  };


  const handleCloseAddEventForm = () => {
    setSelectedSlot(null);
    setShowAddEventForm(false);
  };
  function handleSelect ({ start, end }) {
        const title = window.prompt('New Event name')
        if (title) {
            var newEvent = {
                start: start,
                end: end,
                title: title 
            }
       
        }
      }



  return (
    <div>
    <Topbar />
      <div className="admincontainer">
        <Sidebar />
    <div className="userList">
    <div style={{ height: '800px' }}>
  <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
      />
       {showForm && (
        <AddEventForm
          handleClose={() => setShowForm(false)}
          handleFormSubmit={handleFormSubmit}
        /> )}
      
    </div>
    </div>
    </div>
    </div>
  );
};

export default StaffCalendar;
