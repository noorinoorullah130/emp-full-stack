import React, { useEffect, useState } from "react";

import {
    FaUsers,
    FaBuilding,
    FaCalendarAlt,
    FaChartLine,
    FaUserPlus,
    FaMoneyBill,
} from "react-icons/fa";
import "./Dashboard.css";
import api from "../../utils/api";
import { FaBuildingFlag } from "react-icons/fa6";

const Dashboard = () => {
    const [dashboardDetails, setDashboardDetails] = useState({
        totalDirectorates: 0,
        totalEmployees: 0,
        totalDepartments: 0,
        newEmpsInTheLastFiveDays: 0,
        totalSalary: 0,
    });

    const getDashboardDetails = async () => {
        const response = await api.get("/dashboard");
        const data = await response.data;
        console.log(data);
        setDashboardDetails({
            totalEmployees: data.totalDirectorates,
            totalEmployees: data.totalEmployees,
            totalDepartments: data.totalDepartments,
            newEmpsInTheLastFiveDays: data.newEmpsInTheLastFiveDays,
            totalSalary: data.totalSalary,
        });
    };

    useEffect(() => {
        // getDashboardDetails();
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard Overview</h1>
                <div className="date-display">
                    <FaCalendarAlt className="icon" />
                    <span>
                        {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div
                        className="stat-icon"
                        style={{ backgroundColor: "#17dcd6" }}
                    >
                        <FaBuildingFlag />
                    </div>
                    <div className="stat-info">
                        <h3>Total Directorates</h3>
                        <p>{dashboardDetails.totalDirectorates}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div
                        className="stat-icon"
                        style={{ backgroundColor: "#4e73df" }}
                    >
                        <FaUsers />
                    </div>
                    <div className="stat-info">
                        <h3>Total Employees</h3>
                        <p>{dashboardDetails.totalEmployees}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div
                        className="stat-icon"
                        style={{ backgroundColor: "#1cc88a" }}
                    >
                        <FaBuilding />
                    </div>
                    <div className="stat-info">
                        <h3>Departments</h3>
                        <p>{dashboardDetails.totalDepartments}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div
                        className="stat-icon"
                        style={{ backgroundColor: "#f6c23e" }}
                    >
                        <FaUserPlus />
                    </div>
                    <div className="stat-info">
                        <h3>New Hires (Last 5 days)</h3>
                        <p>{dashboardDetails.newEmpsInTheLastFiveDays}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div
                        className="stat-icon"
                        style={{ backgroundColor: "#ff6347" }}
                    >
                        <FaMoneyBill />
                    </div>
                    <div className="stat-info">
                        <h3>Total Employees Salary</h3>
                        <p>{dashboardDetails.totalSalary}</p>
                    </div>
                </div>
            </div>

            <div className="charts-container">
                <div className="main-chart">
                    <h2>Employee Growth</h2>
                    <div className="chart-placeholder">
                        <FaChartLine className="chart-icon" />
                        <p>Growth chart visualization</p>
                    </div>
                </div>

                <div className="side-chart">
                    <h2>Department Distribution</h2>
                    <div className="chart-placeholder">
                        <FaChartLine className="chart-icon" />
                        <p>Department chart visualization</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
