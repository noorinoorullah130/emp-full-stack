import React, { useState } from "react";

// Css works on new employees css file

import api from "../../utils/api";
import { toast } from "react-toastify";

const NewDirectorate = () => {
    const [dirForm, setDirForm] = useState({
        dirCode: "",
        dirName: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post("/directorate", dirForm);
            toast.success(response.data.message);
            setDirForm({
                dirCode: "",
                dirName: "",
            });
            setLoading(false);
            console.log(response);
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDirForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="new-directorate">
            <div className="departments-header">
                <h1>Add New Directorate</h1>
                <p>Add new directorate and their details</p>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="dir-code">Directorate Code:</label>
                <input
                    type="Number"
                    id="dir-code"
                    name="dirCode"
                    value={dirForm.dirCode}
                    onChange={(e) => handleChange(e)}
                    disabled={loading}
                    placeholder="Enter Directorate Code"
                    required
                />

                <label htmlFor="dir-name">Directorate Name:</label>
                <input
                    type="text"
                    id="dir-name"
                    name="dirName"
                    value={dirForm.dirName}
                    onChange={(e) => handleChange(e)}
                    disabled={loading}
                    placeholder="Enter Directorate Name"
                    required
                />

                <button type="submit" disabled={loading}>
                    {!loading ? "Save" : "Saving..."}
                </button>
            </form>
        </div>
    );
};

export default NewDirectorate;
