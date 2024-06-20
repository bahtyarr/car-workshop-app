import React from "react";
import "./css/ConfirmationPopup.css";

const ConfirmationPopup = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
