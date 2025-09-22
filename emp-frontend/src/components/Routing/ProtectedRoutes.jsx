import React from "react";

import { Navigate } from "react-router-dom";
import { getTokenAndRole } from "../../utils/auth";

const ProtectedRoutes = ({ children, allowedRoles }) => {
    const { token, role } = getTokenAndRole();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoutes;
