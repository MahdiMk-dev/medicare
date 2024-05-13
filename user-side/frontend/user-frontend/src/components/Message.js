import React from "react";
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
import { useSelector } from 'react-redux';
const Message = ({ message }) => {
const userData = useSelector(state => state.user.userData);


  return (
    <div
      className={`chat-bubble ${message.SenderId == userData.id ? "right" : ""}`}>
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
export default Message;