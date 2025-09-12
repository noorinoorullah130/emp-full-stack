import React from "react";

import {
    FaUsers,
    FaBuilding,
    FaCalendarAlt,
    FaChartLine,
    FaClock,
    FaUserPlus,
} from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
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
                        style={{ backgroundColor: "#4e73df" }}
                    >
                        <FaUsers />
                    </div>
                    <div className="stat-info">
                        <h3>Total Employees</h3>
                        <p>142</p>
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
                        <p>8</p>
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
                        <h3>New Hires</h3>
                        <p>5</p>
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
