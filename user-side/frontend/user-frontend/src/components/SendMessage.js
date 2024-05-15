import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from 'react-redux';
const SendMessage = () => {
   const userData = useSelector(state => state.user.userData);

   const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    //const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: userData.first_name+' '+userData.last_name,
      avatar: userData.image_url,
      createdAt: serverTimestamp(),
      SenderId:userData.id,
      ReceiverId:2,
      read: false

    });
    setMessage("");
  };
  const [message, setMessage] = useState("");
    
  return (
   <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};
export default SendMessage;