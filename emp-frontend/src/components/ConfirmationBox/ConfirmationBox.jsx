import React from "react";

import "./ConfirmationBox.css";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmationBox = ({ onConfirm, onCancel }) => {
    return (
        <div className="overlay">
            <div className="confirmation-box">
                <FaExclamationTriangle
                    style={{ color: "orange", fontSize: "75px" }}
                />
                <h2>Are you sure?</h2>
                <p>You won't be able to revert this!</p>
                <div className="actions-btns">
                    <button className="yes-btn" onClick={onConfirm}>
                        Yes, delete it!
                    </button>
                    <button className="no-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationBox;
