import React from "react";
import Header from "./../components/Header/Header";
import Sidebar from "./../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="layout">
            <Header />
            <div className="main-content">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
