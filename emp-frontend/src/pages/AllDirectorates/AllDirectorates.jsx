import React from "react";
import Pagination from "../../components/Pagination/Pagination";

const AllDirectorates = () => {
    const allDirectorates = [
        {
            dirCode: 1,
            dirName: "Finance and Budget",
            totalEmployees: 30,
            totalSalary: 50000,
        },
        {
            dirCode: 1,
            dirName: "Logistics",
            totalEmployees: 30,
            totalSalary: 50000,
        },
        {
            dirCode: 3,
            dirName: "Human Resources",
            totalEmployees: 30,
            totalSalary: 50000,
        },
    ];

    return (
        <div className="all-users">
            <div className="departments-header">
                <h1>All Directorates</h1>
                <p>Complete list of all directorates and their details</p>
            </div>

            <table className="departments-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Directorate Code</th>
                        <th>Directorate Name</th>
                        <th>Total Employees</th>
                        <th>Total Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allDirectorates.map((dir, i) => (
                        <tr key={dir.id}>
                            <td>{i + 1}</td>
                            <td>{dir.dirCode}</td>
                            <td>{dir.dirName}</td>
                            <td>{dir.totalEmployees}</td>
                            <td>{dir.totalSalary}</td>
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

export default AllDirectorates;
