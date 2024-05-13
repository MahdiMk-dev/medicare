import React from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
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
import '../styles/chat.css'
import { useSelector } from 'react-redux';
import Navbar from './navbar';

const ChatBox = () => {
  const userData = useSelector(state => state.user.userData);

  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  useEffect(() => {

async function getAndListenMessages() {
  const senderQuery = query(
    collection(db, "messages"),
    where('SenderId', '==', userData.id), // Assuming '1' is the user ID
    orderBy("createdAt", "desc"),
    limit(50)
  );

  const receiverQuery = query(
    collection(db, "messages"),
    where('ReceiverId', '==', userData.id), // Assuming '1' is the receiver ID
    orderBy("createdAt", "desc"),
    limit(50)
  );

  // Subscribe to real-time updates on both queries
  const unsubscribeSender = onSnapshot(senderQuery, (senderSnapshot) => {
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
        if (!message.read && message.ReceiverId==userData.id) {
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






 


/*  const q = query(
                    collection(db, "messages"),
                   // where('SenderId', '==', '1','||','ReceiverId', '==', '1'), // Assuming '1' is the user ID
                    //where('ReceiverId', '==', '1')), // Assuming '1' is the receiver ID
                    orderBy("createdAt", "desc"),
                    limit(50)
  );
  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    const fetchedMessages = [];
    QuerySnapshot.forEach((doc) => {
      fetchedMessages.push({ ...doc.data(), id: doc.id });
    });
    const sortedMessages = fetchedMessages.sort(
      (a, b) => a.createdAt - b.createdAt
    );
    setMessages(sortedMessages);
  });
  return () => unsubscribe;*/
}, []);
  return (
   <div>
     <Navbar/>
   
   <main className="chat-box">
    
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
    </div>
  );
};

export default ChatBox;