import React, { useEffect, useState } from "react";

import "./Dashboard.css";
import {
    FaUsers,
    FaBuilding,
    FaCalendarAlt,
    FaUserPlus,
    FaMoneyBill,
} from "react-icons/fa";
import { FaBuildingFlag } from "react-icons/fa6";

import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    ResponsiveContainer,
    Cell,
    LabelList,
    PieChart,
    Pie,
} from "recharts";

import { getTokenAndRole } from "../../utils/auth";
import formatTotalSalary from "../../utils/formatTotalSalary";
import { toast } from "react-toastify";
import api from "../../utils/api";

const Dashboard = () => {
    const { role } = getTokenAndRole();

    const [fullDashboard, setFullDashboard] = useState({
        allDirectorates: 0,
        allUsers: 0,
        allDepartments: 0,
        allEmployees: 0,
        totalSalary: 0,
        averageSalary: 0,
        newEmployeesInLastFiveDays: 0,
        newEmployeesInLastMonth: 0,
        directorateDetailsOfDashboard: [],
        departmentDetailsOfDashboard: [],
        gradesCount: [],
    });
    const [loading, setLoading] = useState(false);

    const fetchDashboardDetails = async () => {
        setLoading(true);

        try {
            const response = await api.get("/dashboard");
            const data = response.data;
            setFullDashboard(data);
            console.log(data);
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardDetails();
    }, []);

    const genderData = [
        { name: "Male", value: 120 },
        { name: "Female", value: 80 },
    ];

    const COLORS = [
        "#6366f1",
        "#22c55e",
        "#f59e0b",
        "#ef4444",
        "#0ea5e9",
        "#8b5cf6",
        "#ec4899",
        "#14b8a6",
        "#1e40af",
        "#7c3aed",
        "#16a34a",
        "#f97316",
        "#db2777",
        "#0284c7",
        "#15803d",
        "#b45309",
        "#dc2626",
        "#4c1d95",
        "#059669",
        "#fbbf24",
        "#2563eb",
        "#34d399",
    ];

    const GENDER_COLORS = {
        Male: "#3b82f6", // Blue
        Female: "#ec4899", // Pink
    };

    const renderLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

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
                                style={{ backgroundColor: "#17dcd6" }}
                            >
                                <FaBuildingFlag />
                            </div>
                            <div className="stat-info">
                                <h3>All Directorates</h3>
                                <p>{fullDashboard.allDirectorates}</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div
                                className="stat-icon"
                                style={{ backgroundColor: "#dc17a1ff" }}
                            >
                                <FaUsers />
                            </div>
                            <div className="stat-info">
                                <h3>All Users</h3>
                                <p>{fullDashboard.allUsers}</p>
                            </div>
                        </div>
                    </>
                )}

                <div className="stat-card">
                    <div
                        className="stat-icon"
                        style={{ backgroundColor: "#1cc88a" }}
                    >
                        <FaBuilding />
                    </div>
                    <div className="stat-info">
                        <h3>All Departments</h3>
                        <p>{fullDashboard.allDepartments}</p>
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
                        <h3>All Employees</h3>
                        <p>{fullDashboard.allEmployees}</p>
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
                        <h3>Total Salary</h3>
                        <p>{formatTotalSalary(fullDashboard.totalSalary)}</p>
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
                        <h3>Average Salary</h3>
                        <p>
                            {formatTotalSalary(fullDashboard.averageSalary) ||
                                0}
                        </p>
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
                        <p>{fullDashboard.newEmployeesInLastFiveDays}</p>
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
                        <h3>New Hires (Last Month)</h3>
                        <p>{fullDashboard.newEmployeesInLastMonth}</p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="charts-container">
                {role === "admin" && (
                    <>
                        {/* Departments by Directorate */}
                        <div className="main-chart">
                            <h2>Departments by Directorate</h2>
                            <ResponsiveContainer width="100%" height={380}>
                                <BarChart
                                    data={
                                        fullDashboard.directorateDetailsOfDashboard
                                    }
                                    barSize={40}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 10,
                                        bottom: 60,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#e0e0e0"
                                    />

                                    <XAxis
                                        dataKey="dirName"
                                        angle={-25}
                                        textAnchor="end"
                                        tick={{ fontSize: 15 }}
                                    />

                                    <YAxis tick={{ fontSize: 15 }} />

                                    <Tooltip
                                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                                        contentStyle={{
                                            borderRadius: "10px",
                                            border: "none",
                                            boxShadow:
                                                "0 4px 10px rgba(0,0,0,0.15)",
                                        }}
                                    />

                                    <Bar
                                        dataKey="dptsPerDir"
                                        radius={[12, 12, 0, 0]}
                                    >
                                        {fullDashboard.directorateDetailsOfDashboard?.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )}

                                        {/* Value on top of bars */}
                                        <LabelList
                                            dataKey="dptsPerDir"
                                            position="top"
                                            style={{
                                                fontSize: 15,
                                                fontWeight: "600",
                                            }}
                                        />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Employees by Directorate */}
                        <div className="main-chart">
                            <h2>Employees by Directorate</h2>
                            <ResponsiveContainer width="100%" height={380}>
                                <BarChart
                                    data={
                                        fullDashboard.directorateDetailsOfDashboard
                                    }
                                    barSize={40}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 10,
                                        bottom: 60,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#e0e0e0"
                                    />

                                    <XAxis
                                        dataKey="dirName"
                                        angle={-25}
                                        textAnchor="end"
                                        tick={{ fontSize: 15 }}
                                    />

                                    <YAxis tick={{ fontSize: 15 }} />

                                    <Tooltip
                                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                                        contentStyle={{
                                            borderRadius: "10px",
                                            border: "none",
                                            boxShadow:
                                                "0 4px 10px rgba(0,0,0,0.15)",
                                        }}
                                    />

                                    <Bar
                                        dataKey="empsPerDir"
                                        radius={[12, 12, 0, 0]}
                                    >
                                        {fullDashboard.directorateDetailsOfDashboard?.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )}

                                        {/* Value on top of bars */}
                                        <LabelList
                                            dataKey="empsPerDir"
                                            position="top"
                                            style={{
                                                fontSize: 15,
                                                fontWeight: "600",
                                            }}
                                        />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}

                {/* Employees by Department */}
                <div className="main-chart">
                    <h2>Employees by Department</h2>
                    <ResponsiveContainer width="100%" height={380}>
                        <BarChart
                            data={fullDashboard.departmentDetailsOfDashboard}
                            barSize={40}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 10,
                                bottom: 60,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e0e0e0"
                            />

                            <XAxis
                                dataKey="dptName"
                                angle={-25}
                                textAnchor="end"
                                tick={{ fontSize: 15 }}
                            />

                            <YAxis tick={{ fontSize: 15 }} />

                            <Tooltip
                                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "none",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                                }}
                            />

                            <Bar dataKey="empsPerDpt" radius={[12, 12, 0, 0]}>
                                {fullDashboard.departmentDetailsOfDashboard.map(
                                    (entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    )
                                )}

                                {/* Value on top of bars */}
                                <LabelList
                                    dataKey="empsPerDpt"
                                    position="top"
                                    style={{ fontSize: 15, fontWeight: "600" }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {role === "admin" && (
                    <>
                        {/* Salary by Directorate */}
                        <div className="main-chart">
                            <h2>Salary by Directorate</h2>
                            <ResponsiveContainer width="100%" height={380}>
                                <BarChart
                                    data={
                                        fullDashboard.directorateDetailsOfDashboard
                                    }
                                    barSize={40}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 10,
                                        bottom: 60,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#e0e0e0"
                                    />

                                    <XAxis
                                        dataKey="dirName"
                                        angle={-25}
                                        textAnchor="end"
                                        tick={{ fontSize: 15 }}
                                    />

                                    <YAxis
                                        tick={{ fontSize: 15 }}
                                        tickFormatter={formatTotalSalary}
                                    />

                                    <Tooltip
                                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                                        contentStyle={{
                                            borderRadius: "10px",
                                            border: "none",
                                            boxShadow:
                                                "0 4px 10px rgba(0,0,0,0.15)",
                                        }}
                                        formatter={(salary) =>
                                            formatTotalSalary(salary)
                                        }
                                    />

                                    <Bar
                                        dataKey="salaryPerDir"
                                        radius={[12, 12, 0, 0]}
                                    >
                                        {fullDashboard.directorateDetailsOfDashboard?.map(
                                            (entry, index) => (
                                                <Cell
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )}

                                        {/* Value on top of bars */}
                                        <LabelList
                                            dataKey="salaryPerDir"
                                            position="top"
                                            style={{
                                                fontSize: 15,
                                                fontWeight: "600",
                                            }}
                                            formatter={formatTotalSalary}
                                        />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}

                {/* Salary by Departments */}
                <div className="main-chart">
                    <h2>Salary by Departments</h2>
                    <ResponsiveContainer width="100%" height={380}>
                        <BarChart
                            data={fullDashboard.departmentDetailsOfDashboard}
                            barSize={40}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 10,
                                bottom: 60,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e0e0e0"
                            />

                            <XAxis
                                dataKey="dptName"
                                angle={-25}
                                textAnchor="end"
                                tick={{ fontSize: 15 }}
                            />

                            <YAxis
                                tick={{ fontSize: 15 }}
                                tickFormatter={formatTotalSalary}
                            />

                            <Tooltip
                                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "none",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                                }}
                                formatter={(salary) =>
                                    formatTotalSalary(salary)
                                }
                            />

                            <Bar dataKey="salaryPerDpt" radius={[12, 12, 0, 0]}>
                                {fullDashboard.departmentDetailsOfDashboard.map(
                                    (entry, index) => (
                                        <Cell
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    )
                                )}

                                {/* Value on top of bars */}
                                <LabelList
                                    dataKey="salaryPerDpt"
                                    position="top"
                                    style={{ fontSize: 15, fontWeight: "600" }}
                                    formatter={formatTotalSalary}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Grades Count */}
                <div className="main-chart">
                    <h2>Grades Count</h2>
                    <ResponsiveContainer width="100%" height={380}>
                        <BarChart
                            data={fullDashboard.gradesCount}
                            barSize={40}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 10,
                                bottom: 60,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e0e0e0"
                            />

                            <XAxis
                                dataKey="grade"
                                angle={-25}
                                textAnchor="end"
                                tick={{ fontSize: 15 }}
                            />

                            <YAxis tick={{ fontSize: 15 }} />

                            <Tooltip
                                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "none",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                                }}
                            />

                            <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                                {fullDashboard.gradesCount.map(
                                    (entry, index) => (
                                        <Cell
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    )
                                )}

                                {/* Value on top of bars */}
                                <LabelList
                                    dataKey="count"
                                    position="top"
                                    style={{ fontSize: 15, fontWeight: "600" }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Employees by Directorate */}
                <div className="main-chart">
                    <h2>Employees Gender</h2>
                    <ResponsiveContainer width="100%" height={380}>
                        <PieChart width={350} height={300}>
                            <Pie
                                data={genderData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={110}
                                innerRadius={60}
                                paddingAngle={3}
                                label={renderLabel}
                                labelLine={false}
                            >
                                {genderData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={GENDER_COLORS[entry.name]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
