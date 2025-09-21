import React from "react";

import "./Header.css";
import { getTokenAndRole } from "../../utils/auth";

const Header = () => {
    const { directorate, role, username } = getTokenAndRole();

    const splitUsername = username.split(" ");
    const userFirstName = splitUsername[0].charAt(0);
    const userLastName = splitUsername[1] ? splitUsername[1].charAt(0) : "";
    const userInitials = userFirstName + userLastName;

    return (
        <header className="main-header">
            <div className="header-content">
                <div className="header-left">
                    <button className="menu-toggle">
                        <span className="hamburger"></span>
                        <span className="hamburger"></span>
                        <span className="hamburger"></span>
                    </button>
                    <h1 className="page-title">
                        Human Resource Management System -{" "}
                        {role === "admin"
                            ? "All Directorates(Admin)"
                            : `Directorate of ${directorate}`}
                    </h1>
                </div>

                <div className="header-right">
                    <div className="user-profile">
                        <div className="avatar">{userInitials}</div>
                        <span className="username">{username}</span>
                        <span className="user-role">{role}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
