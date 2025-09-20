import React from "react";

import {
    FaTachometerAlt,
    FaUsers,
    FaBuilding,
    FaCog,
    FaSignOutAlt,
    FaUserPlus,
} from "react-icons/fa";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { getTokenAndRole, removeTokenAndRole } from "../../utils/auth";
import { FaBuildingUser } from "react-icons/fa6";

const Sidebar = () => {
    const { role } = getTokenAndRole();

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>EMS</h2>
            </div>

            <nav className="sidebar-menu">
                <ul>
                    <li>
                        <NavLink to="dashboard">
                            <FaTachometerAlt className="icon" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="alldirectorates">
                            <FaBuildingUser className="icon" />
                            <span>All Directorates</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="newdirectorate">
                            <FaBuildingUser className="icon" />
                            <span>New Directorate</span>
                        </NavLink>
                    </li>

                    {role === "admin" && (
                        <>
                            <li>
                                <NavLink to="allusers">
                                    <FaUsers className="icon" />
                                    <span>All Users</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="newuser">
                                    <FaUserPlus className="icon" />
                                    <span>New User</span>
                                </NavLink>
                            </li>
                        </>
                    )}

                    <li>
                        <NavLink to="departments">
                            <FaBuilding className="icon" />
                            <span>All Departments</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="newdepartment">
                            <FaBuilding className="icon" />
                            <span>New Department</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="employees">
                            <FaUsers className="icon" />
                            <span>Employees</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="newemployee">
                            <FaUserPlus className="icon" />
                            <span>New Employee</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="settings">
                            <FaCog className="icon" />
                            <span>Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <NavLink to="/">
                    <FaSignOutAlt className="icon" />
                    <span onClick={() => removeTokenAndRole()}>Logout</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
