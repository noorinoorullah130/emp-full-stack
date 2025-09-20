import React from "react";
import "./Departments.css";
import Pagination from "../../components/Pagination/Pagination";

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
                        <th>Total Salary</th>
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

export default Departments;
