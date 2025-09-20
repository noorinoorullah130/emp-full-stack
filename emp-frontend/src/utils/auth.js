const saveTokenAndRole = (token, role, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
};

const getTokenAndRole = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    return { token, role, username };
};

const removeTokenAndRole = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
};

// const isAuthenticated = () => {
//     const { token } = getTokenAndRole();
//     return !!token;
// };

export { saveTokenAndRole, getTokenAndRole, removeTokenAndRole };
