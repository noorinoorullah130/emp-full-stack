import React from "react";

import "./NewEmployee.css";

const NewEmployee = () => {
    return (
        <div className="newemployee">
            <div className="departments-header">
                <h1>Add New Employees</h1>
                <p>Add new employees and their details</p>
            </div>

            <form>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    required
                />

                <label htmlFor="fName">Father Name:</label>
                <input
                    type="text"
                    id="fName"
                    placeholder="Enter Father Name"
                    required
                />

                <label htmlFor="grade">Grade:</label>
                <input
                    type="number"
                    id="grade"
                    placeholder="Enter Grade"
                    required
                    min={1}
                    max={6}
                />

                <label htmlFor="step">Step:</label>
                <input
                    type="number"
                    id="step"
                    placeholder="Enter Step"
                    required
                    min={1}
                    max={5}
                />

                <label htmlFor="experiance">Experiance:</label>
                <input
                    type="number"
                    id="experiance"
                    placeholder="Enter Experiance by number of years"
                    required
                    min={0}
                />

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default NewEmployee;
