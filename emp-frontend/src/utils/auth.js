const saveTokenAndRole = (token, role, username, directorate) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
    localStorage.setItem("directorate", directorate);
};

const getTokenAndRole = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const directorate = localStorage.getItem("directorate");
    return { token, role, username, directorate };
};

const removeTokenAndRole = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("directorate");
};

// const isAuthenticated = () => {
//     const { token } = getTokenAndRole();
//     return !!token;
// };

export { saveTokenAndRole, getTokenAndRole, removeTokenAndRole };
