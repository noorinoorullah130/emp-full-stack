import React, { useEffect, useState } from "react";

import "./NewEmployee.css";
import Select from "react-select";
import { getTokenAndRole } from "../../utils/auth";
import { toast } from "react-toastify";
import api from "../../utils/api";
import formatText from "../../utils/formatText";

const NewEmployee = () => {
    const [empForm, setEmpForm] = useState({
        name: "",
        fName: "",
        grade: "",
        step: "",
        experience: "",
        idNumber: "",
        directorate: null,
        department: null,
    });
    const [loading, setLoading] = useState(false);
    const [allDirectorates, setAllDirectorates] = useState([]);

    const { role } = getTokenAndRole();

    // All directorates for Admin
    // We are using the same api for this as we use for new users directorate
    const fetchAllDirectoratesForNewEmployee = async () => {
        try {
            const response = await api.get("/user/directoratesfornewuser");
            const data = response.data;

            const options = data.map((dir) => {
                return {
                    label: formatText(dir.dirName),
                    value: dir.dirName,
                };
            });

            setAllDirectorates(options);
            console.log(data);
            console.log(options);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something is wrong!");
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (role === "admin") {
            fetchAllDirectoratesForNewEmployee();
        }
    }, [role]);

    // All departments for directorate
    const fetchAllDepartmentsForNewEmployee = async () => {
        try {
            const response = await api.get("/departmentsfornewemployee");
            const data = response.data;
            console.log(data);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmpForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleDirectorateChange = (selectedOption) => {
        setEmpForm((prev) => ({ ...prev, directorate: selectedOption }));
        console.log(selectedOption);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(empForm);
    };

    return (
        <div className="new-employee">
            <div className="departments-header">
                <h1>Add New Employees</h1>
                <p>Add new employees and their details</p>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={empForm.name}
                    onChange={handleInputChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Enter Name"
                    required
                />

                <label htmlFor="fName">Father Name:</label>
                <input
                    type="text"
                    id="fName"
                    name="fName"
                    value={empForm.fName}
                    onChange={handleInputChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Enter Father Name"
                    required
                />

                <label htmlFor="grade">Grade:</label>
                <input
                    type="number"
                    id="grade"
                    name="grade"
                    value={empForm.grade}
                    onChange={handleInputChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Enter Grade"
                    required
                    min={1}
                    max={8}
                />

                <label htmlFor="step">Step:</label>
                <input
                    type="number"
                    id="step"
                    name="step"
                    value={empForm.step}
                    onChange={handleInputChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Enter Step"
                    required
                    min={1}
                    max={5}
                />

                <label htmlFor="experience">Experience:</label>
                <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={empForm.experience}
                    onChange={handleInputChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Enter Experience by number of years"
                    required
                    min={0}
                />

                <label htmlFor="id-number">ID Number:</label>
                <input
                    type="text"
                    id="id-number"
                    name="idNumber"
                    value={empForm.idNumber}
                    onChange={handleInputChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Enter ID Number"
                    required
                />

                {role === "admin" && (
                    <>
                        <label htmlFor="directorate">Directorate:</label>
                        <Select
                            isClearable
                            id="directorate"
                            name="directorate"
                            value={empForm.directorate}
                            options={allDirectorates}
                            onChange={handleDirectorateChange}
                            isDisabled={loading}
                            isLoading={loading}
                            placeholder="Select Employee working Directorate"
                            className="react-select"
                            classNamePrefix="react-select"
                        />
                    </>
                )}

                <label htmlFor="department">Department:</label>
                <Select
                    isClearable
                    id="department"
                    name="department"
                    value={empForm.department}
                    options={allDirectorates}
                    onChange={handleInputChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Select Employee working Department"
                    className="react-select"
                    classNamePrefix="react-select"
                />

                <button type="submit" className="submit-btn">
                    Save
                </button>
            </form>
        </div>
    );
};

export default NewEmployee;
