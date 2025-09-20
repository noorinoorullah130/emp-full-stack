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
                    max={4}
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

                <label htmlFor="experience">Experience:</label>
                <input
                    type="number"
                    id="experience"
                    placeholder="Enter Experience by number of years"
                    required
                    min={0}
                />

                <label htmlFor="department">Department:</label>
                <select>
                    <option value="main office">Main Office</option>
                    <option value="payroll">Payroll</option>
                </select>

                <label htmlFor="id-number">ID Number:</label>
                <input
                    type="text"
                    id="id-number"
                    placeholder="Enter ID Number"
                    required
                />

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default NewEmployee;
