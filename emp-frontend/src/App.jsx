import React, { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Routing from "./components/Routing/Routing";
import AppContext from "./context/appContext";

const App = () => {
    const [showConfirmationBox, setShowConfirmationBox] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const value = {
        showConfirmationBox,
        setShowConfirmationBox,
        isEditing,
        setIsEditing,
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
