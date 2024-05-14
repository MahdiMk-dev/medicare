import React from "react";
//import { auth } from "../firebase";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  limit,
  getDocs
} from "firebase/firestore";
import { db } from "../firebase";
const AdminMessage = ({ message }) => {


  return (
    <div
      className={`chat-bubble ${message.SenderId == 1 ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};
export default AdminMessage;