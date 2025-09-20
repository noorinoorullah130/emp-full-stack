import React from "react";

// Css works on new employees css file

const NewDirectorate = () => {
    return (
        <div className="new-directorate">
            <div className="departments-header">
                <h1>Add New Directorate</h1>
                <p>Add new directorate and their details</p>
            </div>

            <form>
                <label htmlFor="dir-code">Directorate Code:</label>
                <input
                    type="Number"
                    id="dir-code"
                    placeholder="Enter Directorate Code"
                    required
                />

                <label htmlFor="dir-name">Directorate Name:</label>
                <input
                    type="text"
                    id="dir-name"
                    placeholder="Enter Directorate Name"
                    required
                />

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default NewDirectorate;
