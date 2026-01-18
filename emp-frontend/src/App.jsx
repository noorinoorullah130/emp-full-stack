import React, { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Routing from "./components/Routing/Routing";
import AppContext from "./context/AppContext";

const App = () => {
    const [showConfirmationBox, setShowConfirmationBox] = useState(false);
    const [editingItem, setEditingItem] = useState({
        editDirectorate: null,
        editUser: null,
        editDepartment: null,
        editEmployee: null,
    });

    const value = {
        showConfirmationBox,
        setShowConfirmationBox,
        editingItem,
        setEditingItem,
    };

    return (
        <>
            <AppContext.Provider value={value}>
                <div className="app">
                    <Routing />
                </div>
            </AppContext.Provider>
            <ToastContainer />
        </>
    );
};

export default App;
