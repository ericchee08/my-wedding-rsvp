import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/RsvpSectionStyle.css";
import emailjs from "emailjs-com";

const RsvpSection = () => {
    const [response, setResponse] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        attending: "",
        preferredDishes: "",
        allergies: "",
        allergiesInfo: "",
        stayingForEveningFood: "",
        additionalInfo: "",
    });

    const handleButtonClick = (responseType) => {
        const updateAttendance = responseType;
        handleInputChange("attending", updateAttendance)
        setResponse(responseType);
    };

    const handleInputChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));

        const requiredFields = ["firstName", "lastName", "attending", "preferredDishes", "stayingForEveningFood", "allergies", "allergiesInfo"];
        const isFormComplete = requiredFields.every((fieldName) => formData[fieldName] !== "");
        setFormValid(isFormComplete);
    };

    const handleFoodPreferenceSelect = (food) => {
        const updatedDishes = food; 

        handleInputChange("preferredDishes", updatedDishes);
    };
  
    const handleSubmit = () => {
        if (formValid) {
            console.log("Form Data:", formData);
            const serviceId = process.env.REACT_APP_SERVICE_ID;
            const templateId = process.env.REACT_APP_TEMPLATE_ID;
            const publicKey = process.env.REACT_APP_PUBLIC_KEY;
            const hiddenForm = document.createElement("form");
    
            for (const key in formData) {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = formData[key];
                hiddenForm.appendChild(input);
            }
    
            document.body.appendChild(hiddenForm);
    
            emailjs.sendForm(serviceId, templateId, hiddenForm, publicKey)
                .then((response) => {console.log("Email sent successfully:", response);})
                .catch((error) => {
                    console.error("Email failed to send:", error);
            });
        } else {
            alert("Please fill out all the fields before submitting.");
        }
    };

    return (
        <div className="rsvp-section-container">
        <div className="rsvp-container">
            <div className="rsvp-headers">
                <p>Eric & Lauren</p>
                <p>Calke Abbey</p>
                <p>Monday, June 10, 2024</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
            <div className="rsvp-input-container">
                <div className="input-names">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}/>
                </div>
                
                <div className="input-names">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}/>
                </div>
            </div>

            <div className="rsvp-buttons">
                <div
                className={`attendance-button ${response === "attending" && "selected"}`}
                onClick={() => handleButtonClick("attending")}>I can attend
                </div>
                <div className={`attendance-button ${response === "notAttending" && "selected"}`}
                onClick={() => handleButtonClick("notAttending")}>Sorry I can not attend
                </div>
            </div>

            {response === "attending" && (
                <div className="attending">
                <label htmlFor="preferredDishes">1. What dishes would you prefer at our wedding?</label>
                <div className="select-container">
                    <div className={`box-select ${formData.preferredDishes.includes("Chicken") && "selected"}`}
                    onClick={() => handleFoodPreferenceSelect("Chicken")}>Chicken
                    </div>
                    <div
                    className={`box-select ${formData.preferredDishes.includes("Duck") && "selected"}`}
                    onClick={() => handleFoodPreferenceSelect("Duck")}>Duck
                    </div>
                    <div
                    className={`box-select ${formData.preferredDishes.includes("Rissotto") && "selected"}`}
                    onClick={() => handleFoodPreferenceSelect("Rissotto")}>Rissotto
                    </div>
                </div>

                <label htmlFor="allergies">2. Do you have any allergies/dietaries requirements?</label>
                <div className="select-container">
                    <div className={`box-select ${formData.allergies === "Yes" && "selected"}`}
                        onClick={() => handleInputChange("allergies", "Yes")}>Yes
                    </div>
                    <div className={`box-select ${formData.allergies === "No" && "selected"}`}
                        onClick={() => handleInputChange("allergies", "No")}>No
                    </div>
                </div>
                <div className="select-container">
                <textarea id="allergiesInfo" className="allergy-input" value={formData.allergiesInfo}
                    onChange={(e) => handleInputChange("allergiesInfo", e.target.value)}/>
                </div>
                <label htmlFor="stayingForEveningFood">3. Will you be staying for evening food?</label>
                <div className="select-container">
                    <div className={`box-select ${formData.stayingForEveningFood === "Yes" && "selected"}`}
                        onClick={() => handleInputChange("stayingForEveningFood", "Yes")}>Yes
                    </div>
                    <div className={`box-select ${formData.stayingForEveningFood === "No" && "selected"}`}
                        onClick={() => handleInputChange("stayingForEveningFood", "No")}>No
                    </div>
                </div>
                <label htmlFor="additionalInfo">4. Additional Information (Optional)</label>
                <div className="select-container">
                    <textarea id="additionalInfo" className="additional-input" value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}/>
                </div>
                <button className="submit-button" onClick={handleSubmit} disabled={!formValid}>
                    Submit
                </button>

                </div>
            )}
            </form>
        </div>
        <div id="back">
            <Link to="/" id="back-button">
            Back
            </Link>
        </div>
        </div>
    );
    };

export default RsvpSection;
