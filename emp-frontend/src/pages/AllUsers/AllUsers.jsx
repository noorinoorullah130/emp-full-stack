import React, { useContext, useEffect, useState } from "react";

// Css Works on the employees and department css files
import Pagination from "../../components/Pagination/Pagination";
import api from "../../utils/api";
import { toast } from "react-toastify";
import formatText from "../../utils/formatText";
import AppContext from "../../context/AppContext";
import ConfirmationBox from "../../components/ConfirmationBox/ConfirmationBox";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { showConfirmationBox, setShowConfirmationBox, setEditingItem } =
        useContext(AppContext);

    const navigate = useNavigate();

    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get(
                `/user?page=${currentPage}&limit=${limit}`,
            );
            const data = await response.data;

            setAllUsers(data.allUsers);
            setTotalUsers(data.totalUsers);
        } catch (error) {
            toast.error(
                error.response?.data.message || "Something went wrong!",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, [currentPage, limit]);

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirmationBox(true);
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            const response = await api.delete(`/user/${deleteId}`);
            toast.success(response?.data?.message);

            setDeleteId(null);
            setShowConfirmationBox(false);

            await fetchAllUsers();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete user!",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setEditingItem({
            editDirectorate: null,
            editUser: user,
            editDepartment: null,
            editEmployee: null,
        });
        console.log(user);
        navigate("/app/newuser");
    };

    return (
        <div className="all-users">
            <div className="departments-header">
                <h1>All Users</h1>
                <p>Complete list of all users and their details</p>
            </div>

            <table className="departments-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Working Directorate</th>
                        <th>Role</th>
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
                    ) : allUsers.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="no-data">
                                No Data Available!
                            </td>
                        </tr>
                    ) : (
                        allUsers.map((user, i) => (
                            <tr key={user._id}>
                                <td>{i + 1}</td>
                                <td>{formatText(user.name)}</td>
                                <td>{user.email}</td>
                                <td>
                                    {formatText(
                                        user?.directorate?.dirName ||
                                            "All Directorates",
                                    )}
                                </td>
                                <td>{formatText(user.role[0])}</td>
                                <td className="action-buttons">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(user._id)}
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
                totalItems={totalUsers}
                whichPage={"Users"}
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

export default AllUsers;
