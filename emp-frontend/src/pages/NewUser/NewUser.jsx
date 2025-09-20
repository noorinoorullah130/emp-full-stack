import React from "react";

// Css works on new employees and departments css files

const NewUser = () => {
    return (
        <div className="new-user">
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

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    required
                />

                <label htmlFor="pasword">Password:</label>
                <input
                    type="pasword"
                    id="pasword"
                    placeholder="Enter Password"
                    required
                />

                <label htmlFor="role">Role:</label>
                <select required>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>

                <label htmlFor="directorate">Directorate:</label>
                <select required>
                    <option value="" disabled>
                        Select Directorate
                    </option>
                    <option value="Binance and Budget">
                        Finance and Budget
                    </option>
                    <option value="Logistics">Logistics</option>
                    <option value="Precurements">Precurements</option>
                    <option value="Human Resources">Human Resources</option>
                </select>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default NewUser;
