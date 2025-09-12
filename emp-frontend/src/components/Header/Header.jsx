import React from "react";
import "./Header.css";

const Header = () => {
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
                        Human Resource Management System
                    </h1>
                </div>

                <div className="header-right">
                    <div className="user-profile">
                        <div className="avatar">JD</div>
                        <span className="username">John Doe</span>
                        <span className="user-role">Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
