import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/RsvpSectionStyle.css";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

const RsvpSection = () => {
    const [attendanceResponse, setAttendanceResponse] = useState("");
    const [dayOption, setDayOption] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        attending: "",
        dayOption: "",
        preferredDishes: "",
        preferredEveningDishes: "",
        allergies: "",
        allergiesInfo: "",
        message: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const validateForm = () => {
            const requiredFields = getRequiredFields(dayOption, formData.attending);
            const isFormValid = requiredFields.every(field => {
                if (field === 'allergiesInfo' && formData.allergies === 'No') {
                    return true;
                }
                return formData[field] !== "";
            });
            setFormValid(isFormValid);
        };
    
        validateForm();
    }, [formData, dayOption]);

    const getRequiredFields = (dayOption, attending) => {
        if (dayOption === "fullDay" && attending === "attending") {
            return ["firstName", "lastName", "attending", "preferredDishes", "preferredEveningDishes", "allergies", "allergiesInfo"];
        } else if (dayOption === "day" && attending === "attending") {
            return ["firstName", "lastName", "attending", "preferredDishes", "allergies", "allergiesInfo"];
        } else if (dayOption === "evening" && attending === "attending") {
            return ["firstName", "lastName", "attending", "preferredEveningDishes", "allergies", "allergiesInfo"];
        } else {
            return [];
        }
    };
    
    const resetFields = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            allergiesInfo: "",
            allergies: "",
            preferredEveningDishes: "",
            preferredDishes: "",
            message: ""
        }));
    };

    const handleAttendanceButtonClick = (responseType) => {
        if (formData.firstName && formData.lastName) {
            handleInputChange("attending", responseType)
            setAttendanceResponse(responseType);
            resetFields();
        } else {
            alert("Please enter your first name and last name before selecting attendance.");
        }
    };

    const handleDayOptionButtonClick = (responseType) => {
        handleInputChange("dayOption", responseType);
        setDayOption(responseType);
        resetFields();
    };

    const handleInputChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        if (formValid) {
            // console.log("Form Data:", formData);
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
                .then((attendanceResponse) => {console.log("Email sent successfully:", attendanceResponse);
                    navigate("/confirmation");})
                .catch((error) => {
                    console.error("Email failed to send:", error);
            });
        } else {
            console.log("form invalid")
            alert("Please fill out all the fields before submitting.");
        }
    };

    const renderPreferredDishes = (order, header, mealType, ...meals) => (
        <div className="attending">
          <label htmlFor={mealType}>{order}. {header}</label>
          <div className="select-container">
            {meals.map((meal, index) => (
              <div key={index} className={`box-select ${formData[mealType].includes(meal) && "selected"}`}
                onClick={() => handleInputChange(mealType, meal)}>{meal}
              </div>
            ))}
          </div>
        </div>
      );
      
      const renderAllergies = (order) => (
        <div className="attending">
          <label htmlFor="allergies">{order}. Do you have any allergies/dietary requirements?</label>
          <div className="select-container">
            {["Yes", "No"].map((option) => (
              <div key={option} className={`box-select ${formData.allergies === option && "selected"}`}
                onClick={() => handleInputChange("allergies", option)}
              >
                {option}
              </div>
            ))}
          </div>
      
          {formData.allergies === "Yes" && (
            <div className="select-container">
              <textarea
                placeholder="Please enter any allergies or dietary requirements we need to know about"
                id="allergiesInfo"
                className="text-area-input"
                value={formData.allergiesInfo}
                onChange={(e) => handleInputChange("allergiesInfo", e.target.value)}
              />
            </div>
          )}
        </div>
      );

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
                className={`attendance-button ${attendanceResponse === "attending" && "selected"}`}
                onClick={() => handleAttendanceButtonClick("attending")}>Yes, I'll be there! 😄
                </div>
                <div className={`attendance-button ${attendanceResponse === "notAttending" && "selected"}`}
                onClick={() => handleAttendanceButtonClick("notAttending")}>Sorry, I can't be there 😔
                </div>
            </div>

            {attendanceResponse === "attending" && (
                <div className="select-container">
                    <label htmlFor="dayOption">Will you be joining us for the:</label>
                    <div className="rsvp-buttons">
                        <div
                        className={`day-option-button ${dayOption === "fullDay" && "selected"}`}
                        onClick={() => handleDayOptionButtonClick("fullDay")}>Full Day
                        </div>
                        <div className={`day-option-button ${dayOption === "day" && "selected"}`}
                        onClick={() => handleDayOptionButtonClick("day")}>Ceremony & Wedding Breakfast
                        </div>
                        <div className={`day-option-button ${dayOption === "evening" && "selected"}`}
                        onClick={() => handleDayOptionButtonClick("evening")}>Evening Food & Party
                        </div>
                    </div>
                </div>
            )}

            {dayOption === "fullDay" && attendanceResponse === "attending" && (renderPreferredDishes(1, "What would you like to eat during the wedding breakfast? 😋", "preferredDishes", "Beef", "Duck", "Risotto (v)"))}
            {dayOption === "day" && attendanceResponse === "attending" && renderPreferredDishes(1, "What would you like to eat during the wedding breakfast? 😋", "preferredDishes", "Beef", "Duck", "Risoto (v)")}

            {dayOption === "fullDay" && attendanceResponse === "attending" && renderPreferredDishes(2, "Choose your pizza 🍕", "preferredEveningDishes", "Margherita", 'BBQ Chicken', 'Vegetable (v)')}
            {dayOption === "evening" && attendanceResponse === "attending" && renderPreferredDishes(1, "Choose your pizza 🍕", "preferredEveningDishes", "Margherita", 'BBQ Chicken', 'Vegetable (v)')}

            {dayOption === "fullDay" && attendanceResponse === "attending" && renderAllergies(3)}
            {dayOption === "day" && attendanceResponse === "attending" && renderAllergies(2)}
            {dayOption === "evening" && attendanceResponse === "attending" && renderAllergies(2)}

            {attendanceResponse === "attending" &&  (
                <div className="attending">
                    <div className="submit-button" onClick={handleSubmit}>
                        Submit
                    </div>
                </div>
            )}

            {attendanceResponse === "notAttending" && (
                <div className="notAttending">
                    <div className="select-container">
                        <label htmlFor="">Leave a message for the bride and groom...</label>
                        <textarea placeholder="This is optional" value={formData.message} className="text-area-input"
                        onChange={(e) => handleInputChange("message", e.target.value)}/>
                    </div>
                    <div className="submit-button" onClick={handleSubmit}>
                        Submit
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
