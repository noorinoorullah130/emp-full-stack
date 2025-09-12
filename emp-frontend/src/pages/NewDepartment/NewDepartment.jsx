import React from "react";

import "./NewDepartment.css";

const NewDepartment = () => {
    return (
        <div className="newdepartment">
            <div className="departments-header">
                <h1>Add New Departments</h1>
                <p>Add new departments and their managers</p>
            </div>

            <form>
                <label htmlFor="dpt-name">Department Name:</label>
                <input
                    type="text"
                    id="dpt-name"
                    placeholder="Enter Department Name"
                    required
                />

                <label htmlFor="dpt-manager">Department Manager:</label>
                <input
                    type="text"
                    id="dpt-manager"
                    placeholder="Enter Department Manager"
                    required
                />

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default NewDepartment;
