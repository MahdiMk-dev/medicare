import React from "react";
import RequestNurseComponent from "../components/RequestDoctorComponent";
import Navbar from "../components/navbar";

function RequestDoctor(){
    return(
        <div>
        <Navbar/>
        <RequestNurseComponent/>
        </div>
    )
}
export default RequestDoctor;