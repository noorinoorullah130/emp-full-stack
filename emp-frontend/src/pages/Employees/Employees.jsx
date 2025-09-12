import React from "react";

// Now the css working on departments css file
import "./Employees.css";

const Employees = () => {
    const employees = [
        {
            name: "Noorullah",
            fName: "Sohail Badshah",
            grade: 4,
            step: 1,
            salary: 10000,
            experiance: 5 + "Y",
        },
        {
            name: "Abdulrahman",
            fName: "Sohail Badshah",
            grade: 3,
            step: 1,
            salary: 12000,
            experiance: 3 + "Y",
        },
        {
            name: "Khan Mohammad",
            fName: "Mir Mohammad",
            grade: 2,
            step: 5,
            salary: 18000,
            experiance: 8 + "Y",
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
                        <th>Experiance</th>
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
                            <td>{emp.experiance}</td>
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

export default Employees;
