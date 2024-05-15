// import "./userList.css";
import '../styles/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import axios from 'axios';
function PatientList() {
  const [data, setData] = useState([]);
    const token = localStorage.getItem('admintoken');
   const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          }
        };

  useEffect(() => {
        const fetchData = async () => { 
          console.log(config)
             try {
              axios.get('http://localhost:8000/api/get_patients', config).then(response => {

              if(response.data.status=='success'){
                if (response.data.users.length>0) {

                        setData(response.data.users);
                    }
                }
              
              else{
               window.location.href = '/admin_login';
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
    { field: "first_name", headerName: "First Name", width: 200 },
    { field: "last_name", headerName: "Last Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone_number", headerName: "Phone", width: 120 },
    { field: "type", headerName: "Type", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          
          <>
            <Link to={"/patient/" + params.row.id}>
              <button className="userListEdit">View</button>
            </Link>

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
        <h1 className="productTitle">Patients</h1>
        
      </div>
      <DataGrid
        rows={data}
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
export default PatientList;