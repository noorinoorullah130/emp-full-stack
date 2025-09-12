import React from "react";

import "./Settings.css";

const Settings = () => {
    return (
        <div className="settings">
            <div className="departments-header">
                <h1>Settings</h1>
                <p>You can change your password and more details</p>
            </div>

            <form>
                <label htmlFor="old-password">Old Password:</label>
                <input
                    type="password"
                    id="old-password"
                    placeholder="Enter Old Password"
                    required
                />

                <label htmlFor="new-password">New Password:</label>
                <input
                    type="new-password"
                    id="new-password"
                    placeholder="Enter New Password"
                    required
                />

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default Settings;
