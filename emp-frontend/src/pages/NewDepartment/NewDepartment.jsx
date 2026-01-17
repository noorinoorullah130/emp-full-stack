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

    const { isEditing, setIsEditing, editingItem, setEditingItem } =
        useContext(AppContext);

    // For Admin
    const fetchAllDirectoratesForNewDepartment = async () => {
        setLoading(true);
        try {
            const response = await api.get("/user/directoratesfornewuser");
            const data = await response.data;

            const options = data.map((dir) => {
                return {
                    label: formatText(dir.dirName),
                    value: dir.dirName,
                };
            });
            setAllDirectorates(options);
            // console.log(data);
            // console.log(options);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something is wrong!");
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (role === "admin" && !isEditing && !editingItem) {
            fetchAllDirectoratesForNewDepartment();
        }
    }, [role]);

    useEffect(() => {
        if (isEditing && editingItem) {
            setDptForm({
                dptName: editingItem.dptName,
                dptManager: editingItem.dptManager,
            });
        }
    }, [isEditing, editingItem]);

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

        // Prepare the data
        const setData = {
            dptName: dptForm.dptName,
            dptManager: dptForm.dptManager,
            directorate: dptForm?.directorate?.value,
        };

        setLoading(true);

        let response;

        try {
            if (isEditing && editingItem) {
                response = await api.put(
                    `/department/${editingItem._id}`,
                    setData
                );
                setIsEditing(false);
                setEditingItem(null);
            } else {
                response = await api.post("/department", setData);
            }

            const data = await response.data;
            toast.success(data?.message);

            setDptForm({
                dptName: "",
                dptManager: "",
                directorate: null,
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something is wrong!");
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingItem(null);
        setDptForm({
            dptName: "",
            dptManager: "",
            directorate: null,
        });
    };

    // new useEffect for removing the isEditing and editingItem when unmount
    useEffect(() => {
        return () => {
            if (!loading) {
                setIsEditing(false);
                setEditingItem(false);
            }
        };
    }, [loading]);

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
