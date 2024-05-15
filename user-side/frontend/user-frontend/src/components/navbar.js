import {useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/nav.css';
import logo from '../images/2-removebg-preview.png'; 
import logoImage2 from '../images/1-removebg-preview.png'; 
import { useSelector } from 'react-redux';
import ChatIcon from '@mui/icons-material/Chat';
import { collection, query, where, onSnapshot ,getDocs} from "firebase/firestore";
import { db } from '../firebase'; // Assuming this is the path to your Firebase initialization file

const Navbar=()=>{
    const userData = useSelector(state => state.user.userData);
    const error = useSelector((state) => state.user);
    const [unread, setUnread] = useState(0);
    useEffect(() => {
        async function getUnreadMessagesCount() {
      try {
        // Query messages where read is false (unread messages)
        const q = query(
          collection(db, "messages"),
          where('ReceiverId','==',userData.id),
          where('read', '==', false)
        );
    
        // Get the documents
        const querySnapshot = await getDocs(q);
    
        // Return the count of unread messages
        return querySnapshot.size;
      } catch (error) {
        console.error("Error fetching unread messages count:", error);
        return 0; // Return 0 if there's an error
      }
    }
    function subscribeToMessages() {
      const unsubscribe = onSnapshot(collection(db, "messages"), () => {
        // When new messages are added, update the unread messages count
        getUnreadMessagesCount().then(count => {
          console.log("Updated unread messages count:", count);
          setUnread(count)
          // Do something with the updated count (e.g., update the UI)
        });
      });
      return unsubscribe;
    }
      subscribeToMessages();
    }, []);
    return(
        <div class="nav">
        <div class="logo">
            <img src={logo} alt="logo image"/>
        </div>
        <div class="nav-items">
            <a href="/">Home</a>
            <a href="/#services">Services</a>
            <a href="/#aboutUs">About Us</a>
            <a href="/#contact">Contact Us</a>
        </div>
        
        {userData ? (
           <div class='profile'> 
                <a href="/live_chat" target="_blank"><ChatIcon />({unread})</a>
                <a href="profile">{userData.first_name} {userData.last_name}</a>
                <Link
                to="/"
                onClick={() => {
                  localStorage.clear();
                  window.location.href="/auth";
                }}
              >
                Logout
              </Link>
            </div>
        ) : (
            <div class="profile">
                <a href="auth">Login</a>       
            </div>

        )}
       
    </div>
    )
}
export default Navbar;