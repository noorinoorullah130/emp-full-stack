import React, { useContext, useEffect, useState } from "react";

import Pagination from "../../components/Pagination/Pagination";
import api from "../../utils/api";
import { toast } from "react-toastify";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import formatText from "../../utils/formatText";
import ConfirmationBox from "../../components/ConfirmationBox/ConfirmationBox";

const AllDirectorates = () => {
    const [allDirectorates, setAllDirectorates] = useState([]);
    const [allDirectoratesDetail, setAllDirectoratesDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalDirectorates, setTotalDirectorates] = useState(0);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const navigate = useNavigate();
    
    const {
        showConfirmationBox,
        setShowConfirmationBox,
        setIsEditing,
        setEditingItem,
    } = useContext(AppContext);

    const getAllDirectoratesData = async () => {
        try {
            setLoading(true);
            const response = await api.get("/directorate", {
                params: { page: currentPage, limit },
            });

            const data = response.data;
            setAllDirectorates(data.allDirectorates);
            setAllDirectoratesDetails(data.empPerDirectorate);
            setTotalDirectorates(data.totalDirectorates);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch data"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllDirectoratesData();
    }, [currentPage, limit]);

    const fullAllDirectoratesDetails = allDirectorates.map((dir) => {
        const detail = allDirectoratesDetail.find(
            (dirD) => dirD.directorate === dir.dirName
        );

        return {
            ...dir,
            employeeCountPerDirectorate: detail
                ? detail.employeeCountPerDirectorate
                : 0,
            totalSalaryPerDirectorate: detail
                ? detail.totalSalaryPerDirectorate
                : 0,
        };
    });

    const handleEdit = async (id, dir) => {
        setIsEditing(true);
        setEditingItem({
            dirId: id,
            dirCode: dir.dirCode,
            dirName: dir.dirName,
        });
        navigate("/app/newdirectorate");
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirmationBox(true);
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            const response = await api.delete(`/directorate/${deleteId}`);
            toast.success(response?.data?.message);
            await getAllDirectoratesData();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete directorate!"
            );
        } finally {
            setLoading(false);
            setDeleteId(null);
            setShowConfirmationBox(false);
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
                    ) : fullAllDirectoratesDetails.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="no-data">
                                No Data Available!
                            </td>
                        </tr>
                    ) : (
                        fullAllDirectoratesDetails.map((dir, i) => (
                            <tr key={dir._id || i}>
                                <td>{i + 1}</td>
                                <td>{dir.dirCode}</td>
                                <td>{formatText(dir.dirName)}</td>
                                <td>{dir.employeeCountPerDirectorate}</td>
                                <td>
                                    {dir.totalSalaryPerDirectorate.toLocaleString()}
                                </td>
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
