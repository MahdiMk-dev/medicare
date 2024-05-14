import '../styles/sidebar.css'

import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney, 
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('usertype');
    setIsAdmin(userType === 'admin');
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
           {isAdmin && (
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Staff
              </li>
            </Link>
            )}
            <Link to="/patients" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Patients
              </li>
            </Link>
            {isAdmin && (
            <Link to="/requests" className="link">
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
                Requests
            </li>
            </Link>
            )}
             <Link to="/duties" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Duties
              </li>
            </Link>
             <Link to="/schedules" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Schedules
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
          <Link to="/displaychats" className="link">
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Chats
            </li>
          </Link>
          </ul>
        </div>
       
      </div>
    </div>
  );
}
export default Sidebar;