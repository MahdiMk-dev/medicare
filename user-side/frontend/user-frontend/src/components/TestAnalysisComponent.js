import React, { useState } from "react";
import axios from "axios";
import '../styles/analysis.css';
import Navbar from "./navbar";
const TestAnalysis = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [responseMessage, setResponseMessage] = useState(""); // State to hold response message

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const uploadImage = async () => {
        if (!selectedImage) {
            alert("Please select an image to upload.");
            return;
        }

        if (!selectedImage.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("user_id", 3);
        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                    
                },
            });

            // Set the response message in the state
            setResponseMessage(response.data.result);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image. Please try again later.");
        }
    };

    return (
        <div>
        <div className='analysis'>
        <Navbar/>
            <div className="analysis-form">
                <div className="title"><p>Get instant analysis for your medical result!</p></div>
                <div className="analysis-image">
                <label htmlFor="image">Select File</label>
                <input className="analysis-input" type="file" id="image" accept="image/*" onChange={handleImageChange} />
                <button  className='analysis-btn' onClick={uploadImage}>Upload</button>
                </div>  
                <h3 className="response-title">Response</h3>
                <div className="response scrollable-div">
                {responseMessage && <p>{responseMessage}</p>}
                </div>
            </div>
        </div>
        </div>
    );
};

export default TestAnalysis;
