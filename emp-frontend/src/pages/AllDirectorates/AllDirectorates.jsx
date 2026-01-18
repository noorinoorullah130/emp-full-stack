import React, { useContext, useEffect, useState } from "react";

import Pagination from "../../components/Pagination/Pagination";
import api from "../../utils/api";
import { toast } from "react-toastify";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import formatText from "../../utils/formatText";
import ConfirmationBox from "../../components/ConfirmationBox/ConfirmationBox";
import formatTotalSalary from "../../utils/formatTotalSalary";

const AllDirectorates = () => {
    const [allDirectorates, setAllDirectorates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalDirectorates, setTotalDirectorates] = useState(0);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const navigate = useNavigate();

    const { setEditingItem, showConfirmationBox, setShowConfirmationBox } =
        useContext(AppContext);

    const getAllDirectoratesData = async () => {
        setLoading(true);
        try {
            const response = await api.get("/directorate", {
                params: { page: currentPage, limit },
            });

            const data = response.data;
            console.log(data);

            setAllDirectorates(data.allDirectorates);
            setTotalDirectorates(data.totalDirectorates);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch data",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllDirectoratesData();
    }, [currentPage, limit]);

    const handleEdit = (id, dir) => {
        setEditingItem({
            editDirectorate: {
                dirId: id,
                dirCode: dir.dirCode,
                dirName: dir.dirName,
            },
            editUser: null,
            editDepartment: null,
            editEmployee: null,
        });

        navigate("/app/newdirectorate");
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirmationBox(true);
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            const response = await api.delete(`/directorate/${deleteId}`);
            toast.success(response?.data?.message);

            setShowConfirmationBox(false);
            setDeleteId(null);

            await getAllDirectoratesData();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to delete directorate!",
            );
        } finally {
            setLoading(false);
        }
    };

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
                        <th>Total Departments</th>
                        <th>Total Employees</th>
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
                    ) : allDirectorates.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="no-data">
                                No Data Available!
                            </td>
                        </tr>
                    ) : (
                        allDirectorates.map((dir, i) => (
                            <tr key={dir._id || i}>
                                <td>{i + 1}</td>
                                <td>{dir.dirCode}</td>
                                <td>{formatText(dir.dirName)}</td>
                                <td>{dir.departmentCount}</td>
                                <td>{dir.employeeCount}</td>
                                <td>{formatTotalSalary(dir.totalSalary)}</td>
                                <td className="action-buttons">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(dir._id, dir)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(dir._id)}
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
                totalItems={totalDirectorates}
                whichPage={"Directorates"}
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

export default AllDirectorates;
