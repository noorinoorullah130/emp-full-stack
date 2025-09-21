import React, { useEffect, useState } from "react";

import Pagination from "../../components/Pagination/Pagination";
import api from "../../utils/api";
import { toast } from "react-toastify";

const AllDirectorates = () => {
    const [allDirectorates, setAllDirectorates] = useState([]);
    const [allDirectoratesDetail, setAllDirectoratesDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalDirectorates, setTotalDirectorates] = useState(0);

    const getAllDirectoratesData = async () => {
        try {
            setLoading(true);

            const response = await api.get("/directorate", {
                params: {
                    page: currentPage,
                    limit,
                },
            });

            const data = response.data;

            console.log(data);

            setAllDirectorates(data.allDirectorates);
            setAllDirectoratesDetails(data.empPerDirectorate);
            setTotalPages(data.totalPages);
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

    const fullAllDirectorateDetails = allDirectorates.map((dir) => {
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
                    ) : fullAllDirectorateDetails.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="no-data">
                                No Data Available!
                            </td>
                        </tr>
                    ) : (
                        fullAllDirectorateDetails.map((dir, i) => (
                            <tr key={dir._id || i}>
                                <td>{i + 1}</td>
                                <td>{dir.dirCode}</td>
                                <td>{dir.dirName}</td>
                                <td>{dir.employeeCountPerDirectorate}</td>
                                <td>
                                    {dir.totalSalaryPerDirectorate.toLocaleString()}
                                </td>
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
                totalPages={totalPages}
                totalItems={totalDirectorates}
            />
        </div>
    );
};

export default AllDirectorates;
