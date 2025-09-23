import React, { useEffect, useState } from "react";

// Css Works on the employees and department css files
import Pagination from "../../components/Pagination/Pagination";
import api from "../../utils/api";
import { toast } from "react-toastify";
import formatText from "../../utils/formatText";

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [allDirectorates, setAllDirectorates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get(
                `/user?page=${currentPage}&limit${limit}`
            );
            const data = await response.data;

            console.log(data);

            setAllUsers(data.allUsers);
            setAllDirectorates(data.allDirectorates);
            setTotalUsers(data.totalUsers);
        } catch (error) {
            toast.error(
                error.response?.data.message || "Something went wrong!"
            );
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fullAllUserDetails = allUsers.map((user) => {
        const isUserHasDirectorate = allDirectorates.find(
            (dir) => dir._id === user.directorate
        );

        return {
            ...user,
            directorate: isUserHasDirectorate
                ? isUserHasDirectorate.dirName
                : "",
        };
    });

    const handleDelete = (id) => {
        console.log(id);
    };

    const handleEdit = (id) => {
        console.log(id);
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
                    ) : fullAllUserDetails.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="no-data">
                                No Data Available!
                            </td>
                        </tr>
                    ) : (
                        fullAllUserDetails.map((user, i) => (
                            <tr key={user._id}>
                                <td>{i + 1}</td>
                                <td>{formatText(user.name)}</td>
                                <td>{user.email}</td>
                                <td>{formatText(user.directorate)}</td>
                                <td>{formatText(user.role[0])}</td>
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
                totalItems={totalUsers}
                whichPage={"Users"}
            />
        </div>
    );
};

export default AllUsers;
