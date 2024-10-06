import React from "react";
import "./EmergencyContactsPopup.css";
const EmergencyContactsPopup = ({ typeOfRequest, onClose }) => {
  const emergencyContacts = {
    "Food and Water": "1-800-FOOD-WTR",
    "Shelter": "1-800-SHELTER",
    "Financial Assistance": "1-800-FIN-ASST",
    "Emotional Support": "1-800-EMO-SUPT",
    "Home Repairs": "1-800-HOME-REP",
    "Transportation": "1-800-TRANS",
    "Job Assistance": "1-800-JOB-ASST",
    "Other": "1-800-HELP",
  };

  const contactNumber = emergencyContacts[typeOfRequest] || "1-800-HELP";

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Emergency Services Contact</h3>
        <p><strong>Type of Assistance:</strong> {typeOfRequest}</p>
        <p><strong>Contact Number:</strong> {contactNumber}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EmergencyContactsPopup;
