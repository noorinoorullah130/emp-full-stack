import React, { useContext, useEffect, useState } from "react";

import api from "../../utils/api";
import Select from "react-select";
import formatText from "../../utils/formatText";
import { toast } from "react-toastify";
import AppContext from "../../context/AppContext";
import { allRoles } from "../../utils/selectOptions";

const NewUser = () => {
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        password: "",
        role: null,
        directorate: null,
    });

    const [allDirectorates, setAllDirectorates] = useState([]);
    const [loading, setLoading] = useState(false);

    const { isEditing, setIsEditing, editingItem, setEditingItem } =
        useContext(AppContext);

    const fetchDirectoratesForNewUser = async () => {
        setLoading(true);
        try {
            const response = await api.get("/user/directoratesfornewuser");
            const data = response.data;

            const options = data.map((opt) => ({
                value: opt.dirName,
                label: formatText(opt.dirName),
            }));
            setAllDirectorates(options);
        } catch (error) {
            toast.error(
                error.response?.data.message || "Error fetching directorates"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isEditing && editingItem) {
            setUserForm({
                name: editingItem.name,
                email: editingItem.email,
                role: {
                    value: editingItem.role[0],
                    label: formatText(editingItem.role[0]),
                },
                directorate: {
                    value: editingItem.directorate,
                    label: formatText(editingItem.directorate),
                },
            });
        }
    }, [isEditing, editingItem]);

    useEffect(() => {
        fetchDirectoratesForNewUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (selectedOption) => {
        setUserForm((prev) => ({
            ...prev,
            role: selectedOption,
        }));
    };

    const handleDirectorateChange = (selectedOption) => {
        setUserForm((prev) => ({
            ...prev,
            directorate: selectedOption,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (
            !userForm.name ||
            !userForm.email ||
            !userForm.role ||
            !userForm.directorate
        ) {
            toast.error("Please fill all required fields");
            return;
        }

        setLoading(true);
        let response;

        try {
            // Prepare data for API call
            const submitData = {
                name: userForm.name,
                email: userForm.email,
                role: userForm.role.value,
                directorate: userForm.directorate.value,
            };

            if (isEditing && editingItem) {
                response = await api.put(
                    `/user/${editingItem._id}`,
                    submitData
                );
                setIsEditing(false);
                setEditingItem(null);
            } else {
                if (!userForm.password) {
                    toast.error("Please fill all required fields");
                    return;
                }
                (submitData.password = userForm.password),
                    (response = await api.post("/user", submitData));
            }

            const data = await response.data;
            toast.success(data?.message);

            // Reset form
            setUserForm({
                name: "",
                email: "",
                password: "",
                role: null,
                directorate: null,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Error creating user. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingItem(null);
        setUserForm({
            name: "",
            email: "",
            password: "",
            role: null,
            directorate: null,
        });
    };

    // new useEffect for removing the isEditing and editingItem when unmount
    // useEffect(() => {
    //     return () => {
    //         if (!loading) {
    //             setIsEditing(false);
    //             setEditingItem(false);
    //         }
    //     };
    // }, [loading]);

    return (
        <div className="new-user">
            <div className="departments-header">
                <h1>{isEditing ? "Edit User" : "Add New Users"}</h1>
                <p>
                    {isEditing
                        ? "Edit user and their details"
                        : "Add new users and their details"}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={userForm.name}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Enter Name"
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Enter Email"
                    required
                />

                {!isEditing && (
                    <>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userForm.password}
                            onChange={handleInputChange}
                            disabled={loading}
                            placeholder="Enter Password"
                            required
                        />
                    </>
                )}

                <label htmlFor="role">Role:</label>
                <Select
                    isClearable
                    name="role"
                    value={userForm.role}
                    options={allRoles}
                    onChange={handleRoleChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Select user role..."
                    className="react-select"
                    classNamePrefix="react-select"
                />

                <label htmlFor="directorate">Directorate:</label>
                <Select
                    isClearable
                    name="directorate"
                    value={userForm.directorate}
                    options={allDirectorates}
                    onChange={handleDirectorateChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Select user working directorate..."
                    className="react-select"
                    classNamePrefix="react-select"
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

export default NewUser;
