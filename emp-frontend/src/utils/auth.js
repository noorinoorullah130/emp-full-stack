const saveTokenAndRole = (token, role, username, directorate, directorateId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
    localStorage.setItem("directorate", directorate);
    localStorage.setItem("directorateId", directorateId);
};

const getTokenAndRole = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const directorate = localStorage.getItem("directorate");
    const directorateId = localStorage.getItem("directorateId");
    return { token, role, username, directorate, directorateId };
};

const removeTokenAndRole = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("directorate");
    localStorage.removeItem("directorateId");
};

// const isAuthenticated = () => {
//     const { token } = getTokenAndRole();
//     return !!token;
// };

export { saveTokenAndRole, getTokenAndRole, removeTokenAndRole };
