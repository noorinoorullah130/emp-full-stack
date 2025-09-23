import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../../pages/Login/Login";
import MainLayout from "../../layout/MainLayout";
import Dashboard from "../../pages/Dashboard/Dashboard";
import AllDirectorates from "../../pages/AllDirectorates/AllDirectorates";
import NewDirectorate from "../../pages/NewDirectorate/NewDirectorate";
import AllUsers from "../../pages/AllUsers/AllUsers";
import NewUser from "../../pages/NewUser/NewUser";
import Departments from "../../pages//Departments/Departments";
import NewDepartment from "../../pages/NewDepartment/NewDepartment";
import Employees from "../../pages/Employees/Employees";
import NewEmployee from "../../pages/NewEmployee/NewEmployee";
import Settings from "../../pages/Settings/Settings";
import ProtectedRoutes from "./ProtectedRoutes";
import RoleProtectedRoute from "./RoleProtectedRoutes";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/app"
                element={
                    <ProtectedRoutes allowedRoles={["admin", "user"]}>
                        <MainLayout />
                    </ProtectedRoutes>
                }
            >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route
                    path="alldirectorates"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <AllDirectorates />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="newdirectorate"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <NewDirectorate />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="allusers"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <AllUsers />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="newuser"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <NewUser />
                        </RoleProtectedRoute>
                    }
                />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="departments" element={<Departments />} />
                <Route path="newdepartment" element={<NewDepartment />} />
                <Route path="employees" element={<Employees />} />
                <Route path="newemployee" element={<NewEmployee />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
};

export default Routing;
