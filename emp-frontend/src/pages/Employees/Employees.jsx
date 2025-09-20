import React from "react";

// Now the css working on departments css file
import "./Employees.css";
import Pagination from "../../components/Pagination/Pagination";

const Employees = () => {
    const employees = [
        {
            name: "Noorullah",
            fName: "Sohail Badshah",
            grade: 4,
            step: 1,
            salary: 10000,
            experience: 5 + "Y",
        },
        {
            name: "Abdulrahman",
            fName: "Sohail Badshah",
            grade: 3,
            step: 1,
            salary: 12000,
            experience: 3 + "Y",
        },
        {
            name: "Khan Mohammad",
            fName: "Mir Mohammad",
            grade: 2,
            step: 5,
            salary: 18000,
            experience: 8 + "Y",
        },
    ];

    return (
        <div className="employees">
            <div className="departments-header">
                <h1>All Departments</h1>
                <p>Complete list of all departments and their details</p>
            </div>

            <table className="departments-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Grade</th>
                        <th>Step</th>
                        <th>Salary</th>
                        <th>Experience</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp, i) => (
                        <tr key={emp.id}>
                            <td>{i + 1}</td>
                            <td>{emp.name}</td>
                            <td>{emp.fName}</td>
                            <td>{emp.grade}</td>
                            <td>{emp.step}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.experience}</td>
                            <td className="action-buttons">
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination />
        </div>
    );
};

export default Employees;
