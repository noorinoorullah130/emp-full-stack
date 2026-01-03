import React, { useContext, useEffect, useState } from "react";

// Now the css working on departments css file
import "./Employees.css";
import Pagination from "../../components/Pagination/Pagination";
import { toast } from "react-toastify";
import api from "../../utils/api";
import formatText from "../../utils/formatText";
import { getTokenAndRole } from "../../utils/auth";
import AppContext from "../../context/AppContext";
import ConfirmationBox from "../../components/ConfirmationBox/ConfirmationBox";
import { useNavigate } from "react-router-dom";

const Employees = () => {
    const { role } = getTokenAndRole();

    const {
        showConfirmationBox,
        setShowConfirmationBox,
        setIsEditing,
        setEditingItem,
    } = useContext(AppContext);

    const navigate = useNavigate();

    const [allEmployees, setAllEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [deleteId, setDeleteId] = useState(null);

    const fetchAllEmployees = async () => {
        setLoading(true);

        try {
            const response = await api.get(
                `/employee?page=${currentPage}&limit=${limit}`
            );
            const data = response.data;

            console.log(data);
            setAllEmployees(data.allEmployees);
            setTotalEmployees(data.totalEmployees);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllEmployees();
    }, [currentPage, limit]);

    const handleDelete = (id) => {
        console.log(id);
        setDeleteId(id);
        setShowConfirmationBox(true);
    };

    const confirmDelete = async () => {
        setLoading(true);

        try {
            const response = await api.delete(`/employee/${deleteId}`);
            const data = response.data;
            toast.success(data?.message);

            setShowConfirmationBox(false);
            setDeleteId(null);

            await fetchAllEmployees();
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (emp) => {
        console.log(emp);
        setIsEditing(true);
        setEditingItem(emp);
        navigate("/app/newemployee");
    };

    return (
        <div className="employees">
            <div className="departments-header">
                <h1>All Employees</h1>
                <p>Complete list of all employees and their details</p>
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
                        {role === "admin" && <th>Directorate</th>}
                        <th>Department</th>
                        <th>Hire Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={11} className="no-data">
                                Loading...
                            </td>
                        </tr>
                    ) : allEmployees.length === 0 ? (
                        <tr>
                            <td colSpan={11} className="no-data">
                                No Data Available!
                            </td>
                        </tr>
                    ) : (
                        allEmployees?.map((emp, i) => (
                            <tr key={emp._id}>
                                <td>{i + 1}</td>
                                <td>{formatText(emp.name)}</td>
                                <td>{formatText(emp.fName)}</td>
                                <td>{formatText(emp.grade)}</td>
                                <td>{formatText(emp.step)}</td>
                                <td>{emp.salary.toLocaleString()}</td>
                                <td>{emp.experience}</td>
                                {role === "admin" && (
                                    <td>{formatText(emp.directorate)}</td>
                                )}
                                <td>{formatText(emp.department)}</td>
                                <td>{emp.hireDate}</td>
                                <td className="action-buttons">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(emp)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(emp._id)}
                                    >
                                        delete
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
                totalItems={totalEmployees}
                whichPage="Employees"
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

export default Employees;
