import '../styles/featuredinfo.css'
import { useState,useEffect } from "react";
import { ArrowDownward, ArrowUpward }  from "@mui/icons-material";

function FeaturedInfo() {
  const[cancel,setcancel]=useState();
  const[complete,setcomplete]=useState();
  const[pending,setpending]=useState();
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
          setcancel(userData.cancelled);
          setcomplete(userData.completed)
          setpending(userData.pending)
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

    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Pending</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{pending}</span>
         
        </div>
        <span className="featuredSub">Pending Requests</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Completed</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{complete}</span>
        </div>
        <span className="featuredSub">Completed Requests</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cancelled</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{cancel}</span>
        </div>
        <span className="featuredSub">Cancelled Requests</span>
      </div>
    </div>
  );
}

export default FeaturedInfo;