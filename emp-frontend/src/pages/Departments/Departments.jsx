import React, { useEffect, useState } from "react";

import "./Departments.css";
import Pagination from "../../components/Pagination/Pagination";
import api from "../../utils/api";
import formatText from "../../utils/formatText";

const Departments = () => {
    const [allDepartments, setAllDepartments] = useState([]);
    const [allDepartmentsDetail, setAllDepartmentsDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalDepartments, setTotalDepartments] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchAllDepartments = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                `/department?page=${currentPage}&limit${limit}`
            );

            const data = await response.data;
            console.log(data);

            setAllDepartments(data.allDpts);
            setAllDepartmentsDetails(data.empPerDepartments);
            setTotalDepartments(data.totalDpts);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllDepartments();
    }, []);

    const fullAllDepartmentsDetails = allDepartments.map((dpt) => {
        const detail = allDepartmentsDetail.find(
            (dpt) => dpt.dptName === dpt.dptName
        );

        return {
            ...dpt,
            employeeCountPerDpt: detail ? detail.employeeCountPerDpt : 0,
            totalSalaryPerDpt: detail ? detail.totalSalaryPerDpt : 0,
        };
    });

    const handleDelete = (id) => {
        console.log(id);
    };

    const handleEdit = (id) => {
        console.log(id);
    };

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
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="no-data">
                                Loading...
                            </td>
                        </tr>
                    ) : fullAllDepartmentsDetails.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="no-data">
                                No Data Available!
                            </td>
                        </tr>
                    ) : (
                        fullAllDepartmentsDetails.map((dept, i) => (
                            <tr key={dept._id}>
                                <td>{i + 1}</td>
                                <td>{formatText(dept.dptName)}</td>
                                <td>{formatText(dept.dptManager)}</td>
                                <td>{dept.employeeCountPerDpt}</td>
                                <td>{dept.totalSalaryPerDpt}</td>
                                <td className="action-buttons">
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                limit={limit}
                setLimit={setLimit}
                totalItems={totalDepartments}
                whichPage={"Departments"}
            />
        </div>
    );
};

export default Departments;
