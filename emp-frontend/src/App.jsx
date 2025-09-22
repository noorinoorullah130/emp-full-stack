import React, { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Routing from "./components/Routing/Routing";
import AppContext from "./context/appContext";

const App = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const value = {
        isEditing,
        setIsEditing,
        editingItem,
        setEditingItem,
    };

    return (
        <AppContext.Provider value={value}>
            <div>
                <Routing />
                <ToastContainer />
            </div>
        </AppContext.Provider>
    );
};

export default App;
