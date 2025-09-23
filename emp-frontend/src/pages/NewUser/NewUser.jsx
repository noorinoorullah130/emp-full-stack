import React, { useEffect, useState } from "react";

import api from "../../utils/api";
import Select from "react-select";
import formatText from "../../utils/formatText";
import { toast } from "react-toastify";

const NewUser = () => {
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        password: "",
        role: null,
        directorate: null,
    });
    const allRoles = [
        {
            value: "user",
            label: "User",
        },
        {
            value: "admin",
            label: "Admin",
        },
    ];
    const [allDirectorates, setAllDirectorates] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDirectoratesForNewUser = async () => {
        try {
            setLoading(true);
            const response = await api.get("/user/directoratesfornewuser");
            const data = response.data;

            const options = data.map((opt) => ({
                value: opt.dirName,
                label: formatText(opt.dirName).join(" "),
            }));

            console.log(data);
            console.log(options);

            setAllDirectorates(options);
        } catch (error) {
            console.error("Error fetching directorates:", error);
            toast.error("Error fetching directorates");
        } finally {
            setLoading(false);
        }
    };

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
        if (!userForm.directorate) {
            toast.error("Please select user directorate");
            return;
        }
        if (!userForm.role) {
            toast.error("Please select user role");
            return;
        }
        if (!userForm.name || !userForm.email || !userForm.password) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);

            // Prepare data for API call
            const submitData = {
                name: userForm.name,
                email: userForm.email,
                password: userForm.password,
                role: userForm.role.value,
                directorate: userForm.directorate.value,
            };

            console.log("Submitting:", submitData);

            // TODO: Uncomment when ready to send to API
            // const response = await api.post("/user/create", submitData);
            // toast.success("User created successfully!");

            // Reset form
            setUserForm({
                name: "",
                email: "",
                password: "",
                role: null,
                directorate: null,
            });

            toast.success("User created successfully!");
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("Error creating user. Please try again.");
        } finally {
            setLoading(false); // Fixed: should be setLoading(false)
        }
    };

    return (
        <div className="new-user">
            <div className="departments-header">
                <h1>Add New Users</h1>
                <p>Add new users and their details</p>
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

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default NewUser;
