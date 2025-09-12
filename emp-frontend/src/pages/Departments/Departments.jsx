import React from "react";
import "./Departments.css";

const Departments = () => {
    const departments = [
        {
            id: 1,
            name: "Human Resources",
            manager: "Sarah Johnson",
            employees: 24,
            budget: "$1.2M",
        },
        {
            id: 2,
            name: "Engineering",
            manager: "Michael Chen",
            employees: 42,
            budget: "$3.5M",
        },
        {
            id: 3,
            name: "Marketing",
            manager: "Emily Rodriguez",
            employees: 18,
            budget: "$850K",
        },
        {
            id: 4,
            name: "Research & Development",
            manager: "Dr. Robert Smith",
            employees: 15,
            budget: "$2.1M",
        },
        {
            id: 5,
            name: "Operations",
            manager: "David Wilson",
            employees: 32,
            budget: "$1.8M",
        },
        {
            id: 6,
            name: "Sales",
            manager: "Jessica Brown",
            employees: 28,
            budget: "$2.3M",
        },
    ];

    return (
        <div className="departments">
            <div className="departments-header">
                <h1>All Departments</h1>
                <p>Complete list of all departments and their details</p>
            </div>

            <table className="departments-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Department Name</th>
                        <th>Manager</th>
                        <th>Employees</th>
                        <th>Budget</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept, i) => (
                        <tr key={dept.id}>
                            <td>{i + 1}</td>
                            <td>{dept.name}</td>
                            <td>{dept.manager}</td>
                            <td>{dept.employees}</td>
                            <td>{dept.budget}</td>
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

export default Departments;
