import React from "react";
import '../styles/topbar.css'
import adminImage from '../images/icon-admin-32.png';
// import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Dashboard</span>
        </div>
        
        <div className="topRight">
          <img src={adminImage} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
export default Topbar;