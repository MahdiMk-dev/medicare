import React from "react";
import '../styles/requestDoctor.css';
const RequestDoctor=()=>{
    return(
        
    <div className="request">

        <div class="form-bg">
        <h2>Request Doctor</h2>

            <div class="main">

                <div class="form">
                    <div class="form-row">
                        <div class="form-item">
                            <h4>Date</h4>
                        </div>
                        <div class="form-item">
                            <label>From</label>
                            <input type="date"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-item">
                            <h4>Time</h4>
                        </div>
                        <div class="form-item">
                            <select id="timeSelect">
                                <option value="urgent">Urgent (The Soonest)</option>
                                <option value="specific-time">Specific Time</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-item">
                        </div>
                        <div class="form-item">
                            <label>From</label>
                            <input type="time"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-item">
                        </div>
                        <div class="form-item">
                            <label>To</label>
                            <input type="time"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-item">
                            <h4>Speciality</h4>
                        </div>
                        <div class="form-item">
                            <select id="specialty">
                                <option value="any">Any</option>
                                <option value="neuro">Neurologist</option>
                                <option value="ortho">Orthopedics</option>
                                <option value="ortho">pediatrics</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-item">
                            <h4>Prefered Gender</h4>
                        </div>
                        <div class="form-item">
                            <select id="genderSelect">
                                <option value="any">Any</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                    </div>
                    <h3>Comments</h3>
                    <div class="input-comments">
                    <textarea class="comments"></textarea>
                    </div>
                    <div className="submit">
                        <button>Request</button>
                    </div>
                </div>
            </div>




        </div>
    </div>
    

    )
}
export default RequestDoctor;