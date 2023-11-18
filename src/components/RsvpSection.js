import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/RsvpSectionStyle.css";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

const RsvpSection = () => {
    const [response, setResponse] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        attending: "",
        preferredDishes: "",
        preferredEveningDishes: "",
        allergies: "",
        allergiesInfo: ""
    });
    const navigate = useNavigate();


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

        const requiredFields = ["firstName", "lastName", "attending", "preferredDishes", "allergies", "allergiesInfo"];
        const isFormComplete = requiredFields.every((fieldName) => formData[fieldName] !== "");
        setFormValid(isFormComplete);
    };
  
    const handleSubmit = () => {
        if (formValid) {
            console.log("Form Data:", formData);
            // const serviceId = process.env.REACT_APP_SERVICE_ID;
            // const templateId = process.env.REACT_APP_TEMPLATE_ID;
            // const publicKey = process.env.REACT_APP_PUBLIC_KEY;
            // const hiddenForm = document.createElement("form");
    
            // for (const key in formData) {
            //     const input = document.createElement("input");
            //     input.type = "hidden";
            //     input.name = key;
            //     input.value = formData[key];
            //     hiddenForm.appendChild(input);
            // }
    
            // document.body.appendChild(hiddenForm);
    
            // emailjs.sendForm(serviceId, templateId, hiddenForm, publicKey)
            //     .then((response) => {console.log("Email sent successfully:", response);
            //         navigate("/confirmation");})
            //     .catch((error) => {
            //         console.error("Email failed to send:", error);
            // });
        } else {
            alert("Please fill out all the fields before submitting.");
        }
    };

    return (
        <div className="rsvp-section-container">
        <div className="rsvp-container">
            <div className="rsvp-headers">
                <p className="rsvp-name">Eric & Lauren</p>
                <p>The Riding School, Calke Abbey</p>
                <p>Monday June 10 2024</p>
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
                onClick={() => handleButtonClick("attending")}>Yes, I'll be there! 😄
                </div>
                <div className={`attendance-button ${response === "notAttending" && "selected"}`}
                onClick={() => handleButtonClick("notAttending")}>Sorry, I can't be there 😔
                </div>
            </div>

            {response === "attending" && (
                <div className="attending">
                <label htmlFor="preferredDishes">1. What would you like to eat during the wedding breakfast? 😋</label>
                <div className="select-container">
                    <div className={`box-select ${formData.preferredDishes.includes("Beef") && "selected"}`}
                    onClick={() => handleInputChange("preferredDishes","Beef")}>Beef
                    </div>
                    <div
                    className={`box-select ${formData.preferredDishes.includes("Duck") && "selected"}`}
                    onClick={() => handleInputChange("preferredDishes","Duck")}>Duck
                    </div>
                    <div
                    className={`box-select ${formData.preferredDishes.includes("Risotto") && "selected"}`}
                    onClick={() => handleInputChange("preferredDishes","Risotto")}>Risotto (v)
                    </div>
                </div>

                <label id="choosePizza" htmlFor="allergies">2. Choose your pizza 🍕</label>
                <div className="select-container">
                    <div className={`box-select ${formData.preferredEveningDishes.includes("Margherita") && "selected"}`}
                    onClick={() => handleInputChange("preferredEveningDishes","Margherita")}>Margherita
                    </div>
                    <div
                    className={`box-select ${formData.preferredEveningDishes.includes("BBQChicken") && "selected"}`}
                    onClick={() => handleInputChange("preferredEveningDishes","BBQChicken")}>BBQ Chicken
                    </div>
                    <div
                    className={`box-select ${formData.preferredEveningDishes.includes("Vegetable") && "selected"}`}
                    onClick={() => handleInputChange("preferredEveningDishes","Vegetable")}>Vegetable (v)
                    </div>
                </div>

                <label htmlFor="allergies">3. Do you have any allergies/dietary requirements?</label>
                <div className="select-container">
                    <div className={`box-select ${formData.allergies === "Yes" && "selected"}`}
                        onClick={() => handleInputChange("allergies", "Yes")}>Yes
                    </div>
                    <div className={`box-select ${formData.allergies === "No" && "selected"}`}
                        onClick={() => handleInputChange("allergies", "No")}>No
                    </div>
                </div>
                <div className="select-container">
                <textarea placeholder="Please enter any allergies or dietary requirements we need to know about" id="allergiesInfo" className="allergy-input" value={formData.allergiesInfo}
                    onChange={(e) => handleInputChange("allergiesInfo", e.target.value)}/>
                </div>

                <button className="submit-button" onClick={handleSubmit} disabled={!formValid}>
                    Submit
                </button>
                </div>
            )}
            {response === "notAttending" && (
                <div className="notAttending">
                    <div className="select-container">
                        <label htmlFor="">Leave a message for the bride and groom...</label>
                        <textarea placeholder="This is optional" id="allergiesInfo" className="allergy-input" value={formData.allergiesInfo}
                        onChange={(e) => handleInputChange("allergiesInfo", e.target.value)}/>
                    </div>
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
