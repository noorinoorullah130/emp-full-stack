import React, { useContext, useEffect, useState } from "react";

import api from "./../../utils/api";
import { toast } from "react-toastify";
import { getTokenAndRole } from "../../utils/auth";
import Select from "react-select";
import formatText from "../../utils/formatText";
import AppContext from "../../context/AppContext";

const NewDepartment = () => {
    const [dptForm, setDptForm] = useState({
        dptName: "",
        dptManager: "",
        directorate: null,
    });
    const [loading, setLoading] = useState(false);
    const [allDirectorates, setAllDirectorates] = useState([]);
    const { role } = getTokenAndRole();

    const { editingItem, setEditingItem } = useContext(AppContext);

    let isEditing = Boolean(editingItem.editDepartment);

    // For Admin
    const fetchAllDirectoratesForNewDepartment = async () => {
        setLoading(true);
        try {
            const response = await api.get("/user/directoratesfornewuser");
            const data = await response.data;

            const options = data.map((dir) => ({
                label: formatText(dir.dirName),
                value: dir._id,
            }));

            setAllDirectorates(options);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something is wrong!");
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (role === "admin" && !isEditing && !editingItem.editDepartment) {
            fetchAllDirectoratesForNewDepartment();
        }
    }, [role]);

    useEffect(() => {
        if (!editingItem.editDepartment) return;

        console.log(editingItem.editDepartment);
        setDptForm({
            dptName: editingItem.editDepartment.dptName,
            dptManager: editingItem.editDepartment.dptManager,
            directorate: {
                label: formatText(
                    editingItem.editDepartment.directorate[0],
                ),
                value: editingItem.editDepartment.directorate._id,
            },
        });
    }, [editingItem.editDepartment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDptForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleDirectorateChange = (selectedOption) => {
        setDptForm((prev) => ({ ...prev, directorate: selectedOption }));
        console.log(selectedOption);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!dptForm.dptName || !dptForm.dptManager) {
            toast.error("Please fill all required fields with valid data!");
            return;
        }

        const setData = {
            dptName: dptForm.dptName,
            dptManager: dptForm.dptManager,
            directorate: dptForm.directorate?.value,
        };

        setLoading(true);

        try {
            let response;

            if (isEditing && editingItem.editDepartment) {
                response = await api.put(
                    `/department/${editingItem.editDepartment._id}`,
                    setData,
                );
                isEditing = false;
                setEditingItem({
                    editDirectorate: null,
                    editUser: null,
                    editDepartment: null,
                    editEmployee: null,
                });
            } else {
                response = await api.post("/department", setData);
            }

            toast.success(response.data?.message);

            setDptForm({
                dptName: "",
                dptManager: "",
                directorate: null,
            });
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
        setDptForm({
            dptName: "",
            dptManager: "",
            directorate: null,
        });
    };

    return (
        <div className="new-department">
            <div className="departments-header">
                <h1>{isEditing ? "Edit Department" : "Add New Departments"}</h1>
                <p>
                    {isEditing
                        ? "Edit department and their managers"
                        : "Add new departments and their managers"}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="dpt-name">Department Name:</label>
                <input
                    type="text"
                    id="dpt-name"
                    name="dptName"
                    value={dptForm.dptName}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Enter Department Name"
                    required
                />

                <label htmlFor="dpt-manager">Department Manager:</label>
                <input
                    type="text"
                    id="dpt-manager"
                    name="dptManager"
                    value={dptForm.dptManager}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Enter Department Manager"
                    required
                />

                {role === "admin" && !isEditing && (
                    <>
                        <label htmlFor="directorate">Directorate:</label>
                        <Select
                            isClearable
                            name="directorate"
                            value={dptForm.directorate}
                            options={allDirectorates}
                            onChange={handleDirectorateChange}
                            isDisabled={loading}
                            isLoading={loading}
                            placeholder="Select directorate of department..."
                            className="react-select"
                            classNamePrefix="react-select"
                        />
                    </>
                )}

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

export default NewDepartment;
