import React from "react";

// Css Works on the employees and department css files

const AllUsers = () => {
    const allUsers = [
        {
            name: "Noorullah",
            email: "noori@gmail.com",
            role: "Admin",
        },
        {
            name: "Abdulrahman",
            email: "abd123@gmail.com",
            role: "User",
        },
        {
            name: "Gul Rahman",
            email: "akbari@yahoo.com",
            role: "User",
        },
    ];

    return (
        <div className="all-users">
            <div className="departments-header">
                <h1>All Departments</h1>
                <p>Complete list of all departments and their details</p>
            </div>

            <table className="departments-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
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
                            <td>{user.role}</td>
                            <td className="action-buttons">
                                <button className="view-btn">View</button>
                                <button className="edit-btn">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <footer className="pagination-footer">
                <button>Prev</button>
                <p>Page 1 of 10</p>
                <button>Next</button>

                <select className="items-per-page">
                    <option value="" disabled>
                        10
                    </option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </footer>
        </div>
    );
};

export default AllUsers;
