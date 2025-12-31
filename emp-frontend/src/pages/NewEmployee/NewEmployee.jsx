import React, { useEffect, useState } from "react";

import "./NewEmployee.css";
import api from "../../utils/api";
import formatText from "../../utils/formatText";
import formatIdNumberOfEmployee from "../../utils/formatIdNumberOfEmployee";

import { getTokenAndRole } from "../../utils/auth";
import Select from "react-select";
import { toast } from "react-toastify";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";

const NewEmployee = () => {
    const { role, directorate, directorateId } = getTokenAndRole();

    const [empForm, setEmpForm] = useState({
        name: "",
        fName: "",
        grade: "",
        step: "",
        experience: "",
        idNumber: "",
        directorate: null,
        department: null,
        hireDate: null,
    });

    const [selectedDirId, setSelectedDirId] = useState(null);
    const [allDirectorates, setAllDirectorates] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    // ====== Prefill directorate for "user" ======
    useEffect(() => {
        if (role === "user" && directorateId && directorate) {
            setEmpForm((prev) => ({
                ...prev,
                directorate: {
                    label: directorate,
                    value: directorate,
                    dirId: directorateId,
                },
            }));
            setSelectedDirId(directorateId);
        }
    }, [role, directorate, directorateId]);

    // ====== Fetch directorates for admin ======
    const fetchAllDirectoratesForNewEmployee = async () => {
        try {
            const response = await api.get("/user/directoratesfornewuser");
            const data = response.data;

            const options = data.map((dir) => ({
                label: formatText(dir.dirName),
                value: dir.dirName,
                dirId: dir._id,
            }));

            setAllDirectorates(options);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
        }
    };

    useEffect(() => {
        if (role === "admin") {
            setLoading(true);
            fetchAllDirectoratesForNewEmployee().finally(() =>
                setLoading(false)
            );
        }
    }, [role]);

    // ====== Fetch departments when directorate changes ======
    const fetchAllDepartmentsForNewEmployee = async (dirId) => {
        try {
            const response = await api.get(
                `/employee/departmentsfornewemployee?directorateId=${dirId}`
            );
            const data = response.data;
            const options = data.map((dpt) => ({
                label: formatText(dpt.dptName),
                value: dpt.dptName,
                dptId: dpt._id,
            }));
            setAllDepartments(options);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
        }
    };

    useEffect(() => {
        if (selectedDirId) {
            setLoading(true);
            fetchAllDepartmentsForNewEmployee(selectedDirId).finally(() =>
                setLoading(false)
            );
        }
    }, [selectedDirId]);

    // ====== Handlers ======
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "idNumber") {
            setEmpForm((prev) => ({
                ...prev,
                idNumber: formatIdNumberOfEmployee(value),
            }));
        } else {
            setEmpForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDirectorateChange = (selectedOption) => {
        setEmpForm((prev) => ({
            ...prev,
            directorate: selectedOption,
            department: null,
        }));
        setSelectedDirId(selectedOption.dirId);
    };

    const handleDepartmentChange = (selectedOption) => {
        setEmpForm((prev) => ({ ...prev, department: selectedOption }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const digitsOnly = empForm.idNumber.replace(/\D/g, "");

        if (
            !empForm.name ||
            !empForm.fName ||
            !empForm.grade ||
            !empForm.step ||
            !empForm.experience ||
            !empForm.idNumber ||
            digitsOnly.length < 13 ||
            !empForm.directorate ||
            !empForm.department ||
            !empForm.hireDate
        ) {
            toast.error("Please fill all required fields with valid data!");
            return;
        }

        setLoading(true);

        const preparedData = {
            name: empForm.name,
            fName: empForm.fName,
            grade: empForm.grade,
            step: empForm.step,
            experience: empForm.experience,
            idNumber: empForm.idNumber,
            directorate: empForm.directorate.dirId,
            department: empForm.department.dptId,
            hireDate: empForm.hireDate
                ? empForm.hireDate.format("YYYY-MM-DD")
                : null,
        };

        try {
            const response = await api.post("employee", preparedData);
            toast.success(response.data?.message);

            // Reset form
            setEmpForm({
                name: "",
                fName: "",
                grade: "",
                step: "",
                experience: "",
                idNumber: "",
                directorate:
                    role === "user"
                        ? {
                              label: formatText(directorate),
                              value: directorate,
                              dirId: directorateId,
                          }
                        : null,
                department: null,
                hireDate: null,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
        } finally {
            setLoading(false);
        }
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
                    disabled={loading}
                    placeholder="Enter Name"
                />

                <label htmlFor="fName">Father Name:</label>
                <input
                    type="text"
                    id="fName"
                    name="fName"
                    value={empForm.fName}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Enter Father Name"
                />

                <label htmlFor="grade">Grade:</label>
                <input
                    type="number"
                    id="grade"
                    name="grade"
                    value={empForm.grade}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Enter Grade"
                    min={1}
                    max={4}
                />

                <label htmlFor="step">Step:</label>
                <input
                    type="number"
                    id="step"
                    name="step"
                    value={empForm.step}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Enter Step"
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
                    disabled={loading}
                    placeholder="Enter Experience by number of years"
                    min={0}
                />

                <label htmlFor="id-number">ID Number:</label>
                <input
                    type="text"
                    id="id-number"
                    name="idNumber"
                    value={empForm.idNumber}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Enter ID Number (1400-0101-12345)"
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
                    options={allDepartments}
                    onChange={handleDepartmentChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Select Employee working Department"
                    className="react-select"
                    classNamePrefix="react-select"
                />

                <label htmlFor="hireDate">Hire Date:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={empForm.hireDate}
                        className="date-picker"
                        onChange={(newValue) =>
                            setEmpForm((prev) => ({
                                ...prev,
                                hireDate: newValue,
                            }))
                        }
                        slotProps={{
                            textField: {
                                placeholder: "Select hire date",
                                sx: {
                                    width: "75%",
                                    marginBottom: "1rem",
                                },
                                InputLabelProps: {
                                    shrink: true,
                                },
                            },
                        }}
                    />
                </LocalizationProvider>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default NewEmployee;
