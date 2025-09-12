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

                <label htmlFor="role">Role:</label>
                <select>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default NewUser;
