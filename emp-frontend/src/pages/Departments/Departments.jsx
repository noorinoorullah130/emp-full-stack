import React, { useContext, useEffect, useState } from "react";

import "./Departments.css";
import Pagination from "../../components/Pagination/Pagination";
import api from "../../utils/api";
import formatText from "../../utils/formatText";
import AppContext from "../../context/AppContext";
import ConfirmationBox from "../../components/ConfirmationBox/ConfirmationBox";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import formatTotalSalary from "../../utils/formatTotalSalary";

const Departments = () => {
    const [allDepartments, setAllDepartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalDepartments, setTotalDepartments] = useState(0);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const navigate = useNavigate();

    const {
        showConfirmationBox,
        setShowConfirmationBox,
        setIsEditing,
        setEditingItem,
    } = useContext(AppContext);

    const fetchAllDepartments = async () => {
        setLoading(true);
        try {
            const response = await api.get(
                `/department?page=${currentPage}&limit=${limit}`
            );

            const data = await response.data;

            setAllDepartments(data.allDepartmentsWithDetails);
            setTotalDepartments(data.totalDpts);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllDepartments();
    }, [currentPage, limit]);

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirmationBox(true);
        console.log(id);
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            const response = await api.delete(`/department/${deleteId}`);
            toast.success(response?.data?.message);

            setDeleteId(null);
            setShowConfirmationBox(false);

            await fetchAllDepartments();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete Department!"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (dept) => {
        setIsEditing(true);
        setEditingItem(dept);
        navigate("/app/newdepartment");
        console.log(dept);
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
                        <th>Directorate</th>
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
                    ) : allDepartments.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="no-data">
                                No Data Available!
                            </td>
                        </tr>
                    ) : (
                        allDepartments.map((dept, i) => (
                            <tr key={dept._id}>
                                <td>{i + 1}</td>
                                <td>{formatText(dept.dptName)}</td>
                                <td>{formatText(dept.dptManager)}</td>
                                <td>{formatText(dept.dptDirectorate)}</td>
                                <td>{dept.empsInOneDpt}</td>
                                <td>
                                    {formatTotalSalary(dept.totalSalaryOfDpt)}
                                </td>
                                <td className="action-buttons">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(dept)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(dept._id)}
                                    >
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

            {showConfirmationBox && (
                <ConfirmationBox
                    onConfirm={confirmDelete}
                    onCancel={() => setShowConfirmationBox(false)}
                />
            )}
        </div>
    );
};

export default Departments;
