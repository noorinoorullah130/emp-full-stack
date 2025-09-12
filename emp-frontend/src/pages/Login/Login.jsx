import React, { useState } from "react";

import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

const Login = () => {
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

                    <form>
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>

                        <div className="login-options">
                            <a href="#">Forgot password?</a>
                        </div>

                        <button type="submit" className="login-btn">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
