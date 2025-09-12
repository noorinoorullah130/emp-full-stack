import React from "react";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employees from "./pages/Employees/Employees";
import Departments from "./pages/Departments/Departments";
import Settings from "./pages/Settings/Settings";
import NewDepartment from "./pages/NewDepartment/NewDepartment";
import NewEmployee from "./pages/NewEmployee/NewEmployee";
import AllUsers from "./pages/AllUsers/AllUsers";
import NewUser from "./pages/NewUser/NewUser";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/app" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="departments" element={<Departments />} />
                    <Route path="newdepartment" element={<NewDepartment />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="newemployee" element={<NewEmployee />} />
                    <Route path="allusers" element={<AllUsers />} />
                    <Route path="newuser" element={<NewUser />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
