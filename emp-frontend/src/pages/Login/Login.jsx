import React, { useState } from "react";

import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../utils/api";
import { saveTokenAndRole } from "../../utils/auth";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post("/auth", form);
            saveTokenAndRole(
                response.data.token,
                response.data.role,
                response.data.username,
                response.data.directorate?.dirName,
                response.data.directorate?._id
            );

            navigate("/app");
        } catch (error) {
            if (error.response) {
                toast.error(
                    error.response.data?.message ||
                        `Server Error: ${error.response?.status} ${error.response?.statusText}`
                );
            } else if (error.request) {
                toast.error(
                    "No response from server. Please check your connection."
                );
            } else {
                toast.error(`Unexpected Error: ${error?.message}`);
            }
            console.error("Login error details:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-left">
                    <h1>Employee Management System</h1>
                    <p>Streamline your workforce management</p>
                </div>

                <div className="login-right">
                    <div className="login-header">
                        <h2>Sign In</h2>
                        <p>Enter your credentials to access the system</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={form.email}
                                onChange={(e) => handleChange(e)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={form.password}
                                onChange={(e) => handleChange(e)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="login-options">
                            <a href="#">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span> Logging
                                    in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
