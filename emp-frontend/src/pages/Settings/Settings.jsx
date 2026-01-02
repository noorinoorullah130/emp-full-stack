import React, { useState } from "react";

import "./Settings.css";
import { toast } from "react-toastify";
import api from "../../utils/api";

const Settings = () => {
    const [settingsForm, setSettingsForm] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettingsForm((pre) => ({ ...pre, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!settingsForm.oldPassword || !settingsForm.newPassword) {
            return toast.error("Please enter both fields to update!");
        }

        setLoading(true);

        try {
            const response = await api.put(
                "/setting/update-password",
                settingsForm
            );
            const data = response.data;
            toast.success(data?.message);

            console.log(data.message);

            setSettingsForm({
                oldPassword: "",
                newPassword: "",
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings">
            <div className="departments-header">
                <h1>Settings</h1>
                <p>You can change your password and more details</p>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="old-password">Old Password:</label>
                <input
                    type="password"
                    id="old-password"
                    name="oldPassword"
                    value={settingsForm.oldPassword}
                    onChange={handleInputChange}
                    placeholder="Enter Old Password"
                />

                <label htmlFor="new-password">New Password:</label>
                <input
                    type="password"
                    id="new-password"
                    name="newPassword"
                    value={settingsForm.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter New Password"
                />

                <button type="submit">{loading ? "Saving..." : "Save"}</button>
            </form>
        </div>
    );
};

export default Settings;
