import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming this is the path to your Firebase initialization file
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import '../styles/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

const DisplayChats = () => {
  const [senderReceiverData, setSenderReceiverData] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "count", headerName: "New Messages", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          
          <>
            <Link to={"/chat/" + params.row.id}>
              <button className="userListEdit">Chat</button>
            </Link>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'messages'), where('SenderId', '!=', 1));
        const senderReceiverData = [];
        const uniqueSenderIds = new Set();
        const unsubscribe = onSnapshot(q, async (snapshot) => {
          const promises = snapshot.docs.map(async (doc) => {
            const data = doc.data();
            // Check if sender ID is unique before processing
           // if (!uniqueSenderIds.has(data.SenderId)) {
              uniqueSenderIds.add(data.SenderId);

            const count = await updateUnreadMessagesCount(data.SenderId);
            return { id: data.SenderId, type: 'Sender', count,name:data.name };
        //  }
          });
          const resolvedPromises = await Promise.all(promises);
           const uniqueData = resolvedPromises.filter((value, index, self) =>
            index === self.findIndex(obj => (
              obj.id === value.id
            ))
          );
          setSenderReceiverData(uniqueData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error listening for messages updates:', error);
      }
    };

    fetchData();
  }, []);

  async function updateUnreadMessagesCount(userId) {
    try {
      const q = query(collection(db, 'messages'), where('SenderId', '==', userId), where('read', '==', false));
      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      console.error(`Error updating unread messages count for sender ID ${userId}:`, error);
      return 0;
    }
  }

  return (
  <div>
    <Topbar />
      <div className="admincontainer">
        <Sidebar />
    <div className="userList">
    <div className="productTitleContainer">
        <h1 className="productTitle">Chats</h1>
      </div>
      <DataGrid
        rows={senderReceiverData}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </div>
  </div>
  );
};

export default DisplayChats;
