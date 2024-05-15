// import "./userList.css";
import '../styles/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import axios from 'axios';
function UserList() {
  const [data, setData] = useState([]);
  const [requestData, serRequestData] = useState([]);
  const token = localStorage.getItem('admintoken');
  const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          }
        };

const handleCancel = async (id) => {
     try {
      
      const response = await axios.get(`http://localhost:8000/api/cancel_request/${id}` ,config)
      const data = await response.data;

      if (data.status === 'success' ) {
        window.location.href="/requests"
        // Optionally, update state or perform any other actions after deletion
      } else {
        alert('Failed to delete user:', data);
        // Handle error response
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }
  };
  useEffect(() => {
        const fetchData = async () => { 
             try {
              axios.get('http://localhost:8000/api/get_requests', config).then(response => {

              if(response.data.status=='success'){
                if (response.data.orders.length>0) {

                        setData(response.data.orders);
                         const requests = response.data.orders.map(request => ({
                          id: request.id,
                          service: request.service.type,
                          start: request.start,
                          end: request.end,
                          urgent: request.urgent,
                          specialty: request.specialty,
                          gender: request.gender,
                          status: request.status,
                          comments:request.comments
                        }));
                         serRequestData(requests)
                    }
                }
              
              else{
          //    window.location.href = '/admin_login';
              }
            })
          
            } catch (error) {
              console.error('Error:', error);
            }
          };
        

        fetchData();
    }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "service", headerName: "Service", width: 100 },
    { field: "start", headerName: "Start Date", width: 120 },
    { field: "end", headerName: "End Date", width: 120 },
    { field: "urgent", headerName: "Urgent", width: 100 },
    { field: "specialty", headerName: "Specialty", width: 120 },
    { field: "gender", headerName: "Preferred Gender", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "comments", headerName: "Comments", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          
          <>
            <Link to={"/request_view/" + params.row.id}>
              <button className="userListEdit">View</button>
            </Link>
             {params.row.status.toLowerCase() !== 'cancelled' && (
            <Link to={"/request_assign/" + params.row.id}>
              <button className="userListassign">Assign</button>
            </Link>
            )}
             {params.row.status.toLowerCase() !== 'cancelled' && (
            <Link to={"/cancel/" + params.row.id}>
              <button className="userListcancel"  onClick={() => handleCancel(params.row.id)}>Cancel</button>
            </Link>
            )}
          </>
        );
      },
    },
  ];
  return (
    <div>
    <Topbar />
      <div className="admincontainer">
        <Sidebar />
    <div className="userList">
    <div className="productTitleContainer">
        <h1 className="productTitle">Requests</h1>
      </div>
      <DataGrid
        rows={requestData}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </div>

</div>

  );
}
export default UserList;