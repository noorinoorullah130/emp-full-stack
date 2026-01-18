import React, { useContext, useEffect, useState } from "react";

import api from "../../utils/api";
import { toast } from "react-toastify";
import AppContext from "../../context/AppContext";

const NewDirectorate = () => {
    const [dirForm, setDirForm] = useState({ dirCode: "", dirName: "" });
    const [loading, setLoading] = useState(false);

    const { editingItem, setEditingItem } = useContext(AppContext);

    let isEditing = Boolean(editingItem.editDirectorate);

    useEffect(() => {
        if (!editingItem.editDirectorate) return;

        setDirForm({
            dirCode: editingItem.editDirectorate.dirCode,
            dirName: editingItem.editDirectorate.dirName,
        });
    }, [editingItem.editDirectorate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDirForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!dirForm.dirCode || !dirForm.dirName) {
            toast.error("Please fill all required fields with valid data!");
            return;
        }

        let response;

        try {
            if (isEditing && editingItem.editDirectorate) {
                response = await api.put(
                    `/directorate/${editingItem.editDirectorate.dirId}`,
                    dirForm,
                );
                isEditing = false;
                setEditingItem({
                    editDirectorate: null,
                    editUser: null,
                    editDepartment: null,
                    editEmployee: null,
                });
            } else {
                response = await api.post("/directorate", dirForm);
            }

            toast.success(response?.data?.message);
            setDirForm({ dirCode: "", dirName: "" });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        isEditing = false;
        setEditingItem({
            editDirectorate: null,
            editUser: null,
            editDepartment: null,
            editEmployee: null,
        });
        setDirForm({ dirCode: "", dirName: "" });
    };

    return (
        <div className="new-directorate">
            <div className="departments-header">
                <h1>
                    {isEditing ? "Edit Directorate" : "Add New Directorate"}
                </h1>
                <p>
                    {isEditing
                        ? "Edit directorate and their details"
                        : "Add new directorate and their details"}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="dir-code">Directorate Code:</label>
                <input
                    type="number"
                    id="dir-code"
                    name="dirCode"
                    value={dirForm.dirCode}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Enter Directorate Name"
                    required
                />

                <div className="form-actions">
                    <button
                        type="submit"
                        disabled={loading}
                        className="submit-btn"
                    >
                        {!loading
                            ? isEditing
                                ? "Update"
                                : "Save"
                            : "Saving..."}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default NewDirectorate;
