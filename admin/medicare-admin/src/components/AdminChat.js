import React from "react";
import AdminMessage from "./AdminMessage";
import SendAdminMessage from "./SendAdminMessage";
import { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  limit,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import '../styles/chat.css'
import Topbar from './Topbar';
import Sidebar from './Sidebar';

const AdminChat = () => {
  const { patientId } = useParams();
  console.log(patientId)
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  useEffect(() => {

async function getAndListenMessages() {
  const senderQuery = query(
    collection(db, "messages"),
    where('SenderId', '==', parseInt(patientId)), 
    orderBy("createdAt", "desc"),
    limit(50)
  );

  const receiverQuery = query(
    collection(db, "messages"),
    where('ReceiverId', '==', parseInt(patientId)), 
    orderBy("createdAt", "desc"),
    limit(50)
  );

  // Subscribe to real-time updates on both queries
  const unsubscribeSender = onSnapshot(senderQuery, (senderSnapshot) => {
    console.log(senderSnapshot)
    const senderMessages = senderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    updateMessages(senderMessages); // Update messages array with sender messages
  });

  const unsubscribeReceiver = onSnapshot(receiverQuery, (receiverSnapshot) => {
    const receiverMessages = receiverSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    updateMessages(receiverMessages); // Update messages array with receiver messages
  });


  // Return the unsubscribe functions
  return () => {
    unsubscribeSender();
    unsubscribeReceiver();
  };
}
async function markMessageAsRead(messageId) {
  try {
    const messageRef = doc(db, "messages", messageId);
    await updateDoc(messageRef, {
      read: true
    });
    console.log("Message marked as read successfully!");
    return true; // Indicate success
  } catch (error) {
    console.error("Error marking message as read:", error);
    return false; // Indicate failure
  }
}
async function markMessageAsRead(messageId) {
  try {
    const messageRef = doc(db, "messages", messageId);
    await updateDoc(messageRef, { read: true });
    console.log("Message marked as read successfully!");
  } catch (error) {
    console.error("Error marking message as read:", error);
  }
}
// Define a function to update the messages array
function updateMessages(newMessages) {
  setMessages((prevMessages) => {
    // Use a Set to keep track of unique message IDs
    const messageIds = new Set();
    
    // Merge new messages into the existing messages array while filtering out duplicates
    const mergedMessages = [...newMessages,...prevMessages].filter(message => {
      if (!messageIds.has(message.id)) {
        if (!message.read && message.ReceiverId==1) {
          markMessageAsRead(message.id);
        }
        messageIds.add(message.id);
        return true; // Keep the message if it's not a duplicate
      }
      return false; // Skip the message if it's a duplicate
    });
    
    // Sort the merged messages array by createdAt
    return mergedMessages.sort((a, b) => a.createdAt - b.createdAt);
  });
}
// Example usage:
// Call the function to start listening for real-time updates
const unsubscribe = getAndListenMessages();

// Return the unsubscribe function
return () => unsubscribe;


}, []);
  return (
    <div>
    <Topbar />
      <div className="admincontainer">
        <Sidebar />
    <div className="userList">
    <div className="productTitleContainer">
        <h1 className="productTitle">Chats</h1>
      </div>
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <AdminMessage key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendAdminMessage scroll={scroll} />
    </div>
    </div>
  </div>
  );
};

export default AdminChat;