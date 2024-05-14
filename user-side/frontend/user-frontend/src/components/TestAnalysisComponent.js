import React, { useState } from "react";
import axios from "axios";
import '../styles/analysis.css';

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
        formData.append("image_url", "test");
        formData.append("user_id", 3);
        try {
            const response = await axios.post("http://localhost:5000/", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Set the response message in the state
            setResponseMessage(response.data.message);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image. Please try again later.");
        }
    };

    return (
        <div className='analysis'>
            <div className="analysis-form">
                <label htmlFor="image">Upload your test result image</label>
                <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                <button onClick={uploadImage}>Upload</button>
                {responseMessage && <p>{responseMessage}</p>}
                
            </div>
        </div>
    );
};

export default TestAnalysis;