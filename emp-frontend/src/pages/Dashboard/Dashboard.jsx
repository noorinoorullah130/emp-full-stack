import React, { useEffect, useState } from "react";

import {
    FaUsers,
    FaBuilding,
    FaCalendarAlt,
    FaUserPlus,
    FaMoneyBill,
} from "react-icons/fa";

import { FaBuildingFlag } from "react-icons/fa6";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    AreaChart,
    Area,
} from "recharts";

import "./Dashboard.css";
import api from "../../utils/api";
import { getTokenAndRole } from "../../utils/auth";

const Dashboard = () => {
    const [dashboardDetails, setDashboardDetails] = useState({
        totalDirectorates: 0,
        totalEmployees: 0,
        totalDepartments: 0,
        newEmpsInTheLastFiveDays: 0,
        totalSalary: 0,
    });

    const { role } = getTokenAndRole();

    const getDashboardDetails = async () => {
        const response = await api.get("/dashboard");
        const data = await response.data;
        setDashboardDetails({
            totalDirectorates: data.totalDirectorates,
            totalEmployees: data.totalEmployees,
            totalDepartments: data.totalDepartments,
            newEmpsInTheLastFiveDays: data.newEmpsInTheLastFiveDays,
            totalSalary: data.totalSalary,
        });
        // console.log(data);
    };

    useEffect(() => {
        getDashboardDetails();
    }, []);

    // Charts Data
    const growthData = [
        { day: "Day 1", employees: dashboardDetails.totalEmployees - 5 },
        { day: "Day 2", employees: dashboardDetails.totalEmployees - 3 },
        { day: "Day 3", employees: dashboardDetails.totalEmployees - 2 },
        { day: "Day 4", employees: dashboardDetails.totalEmployees - 1 },
        { day: "Day 5", employees: dashboardDetails.totalEmployees },
    ];

    const newHiresTrend = [
        { day: "Day 1", hires: dashboardDetails.newEmpsInTheLastFiveDays - 4 },
        { day: "Day 2", hires: dashboardDetails.newEmpsInTheLastFiveDays - 3 },
        { day: "Day 3", hires: dashboardDetails.newEmpsInTheLastFiveDays - 2 },
        { day: "Day 4", hires: dashboardDetails.newEmpsInTheLastFiveDays - 1 },
        { day: "Day 5", hires: dashboardDetails.newEmpsInTheLastFiveDays },
    ];

    const salaryData = [
        { category: "Low", value: dashboardDetails.totalSalary * 0.2 },
        { category: "Medium", value: dashboardDetails.totalSalary * 0.5 },
        { category: "High", value: dashboardDetails.totalSalary * 0.3 },
    ];

    const departmentData = [
        { name: "Directorates", value: dashboardDetails.totalDirectorates },
        { name: "Departments", value: dashboardDetails.totalDepartments },
        { name: "New Hires", value: dashboardDetails.newEmpsInTheLastFiveDays },
    ];

    const dirDeptData = [
        {
            directorate: "Directorate 1",
            departments: Math.floor(dashboardDetails.totalDepartments / 3),
        },
        {
            directorate: "Directorate 2",
            departments: Math.floor(dashboardDetails.totalDepartments / 3),
        },
        {
            directorate: "Directorate 3",
            departments:
                dashboardDetails.totalDepartments -
                2 * Math.floor(dashboardDetails.totalDepartments / 3),
        },
    ];

    const COLORS = ["#4e73df", "#1cc88a", "#f6c23e"];

    return (
        <div className="dashboard">
            {/* Header */}
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

            {/* Stat Cards */}
            <div className="stats-grid">
                {role === "admin" && (
                    <>
                        <div className="stat-card">
                            <div
                                className="stat-icon"
                                style={{ backgroundColor: "#dc17a1ff" }}
                            >
                                <FaUsers />
                            </div>
                            <div className="stat-info">
                                <h3>Total Users</h3>
                                <p>{dashboardDetails.totalDirectorates}</p>
                            </div>
                        </div>

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
                    </>
                )}

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
                        <h3>Total Departments</h3>
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
                        <p>
                            {dashboardDetails.totalSalary >= 1000000
                                ? `${(
                                      dashboardDetails.totalSalary / 1000000
                                  ).toFixed(1)}M`
                                : dashboardDetails.totalSalary >= 1000
                                ? `${(
                                      dashboardDetails.totalSalary / 1000
                                  ).toFixed(1)}K`
                                : dashboardDetails.totalSalary}
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="charts-container">
                {/* Employee Growth Line Chart */}
                <div className="main-chart">
                    <h2>Employee Growth (Last 5 Days)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={growthData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient
                                    id="colorEmployees"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#4e73df"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#4e73df"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="employees"
                                stroke="#4e73df"
                                strokeWidth={3}
                                fill="url(#colorEmployees)"
                                activeDot={{ r: 8 }}
                                isAnimationActive
                                animationDuration={1500}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* New Hires Area Chart */}
                <div className="side-chart">
                    <h2>New Hires Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={newHiresTrend}>
                            <defs>
                                <linearGradient
                                    id="colorHires"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#1cc88a"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#1cc88a"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="hires"
                                stroke="#1cc88a"
                                fill="url(#colorHires)"
                                isAnimationActive
                                animationDuration={1200}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Salary Distribution Bar Chart */}
                <div className="main-chart">
                    <h2>Salary Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={salaryData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="value"
                                fill="#ff6347"
                                isAnimationActive
                                animationDuration={1200}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Department Distribution Pie Chart */}
                <div className="side-chart">
                    <h2>Department Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={departmentData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                innerRadius={40}
                                label
                                isAnimationActive
                                animationDuration={1200}
                            >
                                {departmentData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Directorates vs Departments Stacked Bar Chart */}
                <div className="main-chart">
                    <h2>Directorates vs Departments</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dirDeptData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="directorate" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="departments"
                                stackId="a"
                                fill="#1cc88a"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
