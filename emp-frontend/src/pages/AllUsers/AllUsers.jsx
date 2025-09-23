import React from "react";

// Css Works on the employees and department css files
import Pagination from "../../components/Pagination/Pagination";


const AllUsers = () => {
    const allUsers = [
        {
            name: "Noorullah",
            email: "noori@gmail.com",
            directorate: "Finance and Budget",
            role: "Admin",
        },
        {
            name: "Abdulrahman",
            email: "abd123@gmail.com",
            directorate: "Finance and Budget",
            role: "User",
        },
        {
            name: "Gul Rahman",
            email: "akbari@yahoo.com",
            directorate: "Finance and Budget",
            role: "User",
        },
    ];

    return (
        <div className="all-users">
            <div className="departments-header">
                <h1>All Users</h1>
                <p>Complete list of all users and their details</p>
            </div>

            <table className="departments-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Working Directorate</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user, i) => (
                        <tr key={user.id}>
                            <td>{i + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.directorate}</td>
                            <td>{user.role}</td>
                            <td className="action-buttons">
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination />
        </div>
    );
};

export default AllUsers;
