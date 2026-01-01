import React, { useContext, useEffect, useState } from "react";

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
import dayjs from "dayjs";
import AppContext from "../../context/AppContext";
import { allGrades, allSteps } from "../../utils/selectOptions";

const NewEmployee = () => {
    const { role, directorate, directorateId } = getTokenAndRole();

    const { isEditing, setIsEditing, editingItem, setEditingItem } =
        useContext(AppContext);

    const [empForm, setEmpForm] = useState({
        name: "",
        fName: "",
        grade: null,
        step: null,
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

    // EDITING EXSITING EMPLOYEE
    useEffect(() => {
        if ((isEditing, editingItem)) {
            setEmpForm({
                name: editingItem.name,
                fName: editingItem.fName,
                grade: editingItem.grade,
                step: editingItem.step,
                experience: editingItem.experience,
                idNumber: editingItem.idNumber,
                directorate: editingItem.directorate,
                department: editingItem.department,
                hireDate: dayjs(editingItem.hireDate),
            });
        }
    }, [isEditing, editingItem]);

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

    const handleGradeChange = (selectedOption) => {
        setEmpForm((prev) => ({
            ...prev,
            grade: selectedOption,
        }));
    };

    const handleStepChange = (selectedOption) => {
        setEmpForm((prev) => ({
            ...prev,
            step: selectedOption,
        }));
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
            grade: empForm.grade.value,
            step: empForm.step.value,
            experience: empForm.experience,
            idNumber: empForm.idNumber,
            ...(isEditing !== true && {
                directorate: empForm.directorate.dirId,
            }),
            ...(isEditing !== true && { department: empForm.department.dptId }),
            hireDate: empForm.hireDate.format("YYYY-MM-DD"),
        };

        let response;

        try {
            if (isEditing && editingItem) {
                response = await api.put(
                    `/employee/${editingItem._id}`,
                    preparedData
                );

                setIsEditing(false);
                setEditingItem(null);
            } else {
                response = await api.post("employee", preparedData);
            }

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

    const handleCancel = () => {
        setIsEditing(false);
        setEditingItem(null);
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
    };

    return (
        <div className="new-employee">
            <div className="departments-header">
                <h1>{isEditing ? "Edit Employee" : "Add New Employees"}</h1>
                <p>
                    {isEditing
                        ? "Edit employee and details"
                        : "Add new employees and their details"}
                </p>
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
                <Select
                    isClearable
                    name="grade"
                    id="grade"
                    value={empForm.grade}
                    options={allGrades}
                    onChange={handleGradeChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Enter Grade"
                    className="react-select"
                    classNamePrefix="react-select"
                />

                <label htmlFor="step">Step:</label>
                <Select
                    isClearable
                    id="step"
                    name="step"
                    value={empForm.step}
                    options={allSteps}
                    onChange={handleStepChange}
                    isDisabled={loading}
                    isLoading={loading}
                    placeholder="Enter Step"
                    className="react-select"
                    classNamePrefix="react-select"
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

                {role === "admin" && !isEditing && (
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

                {!isEditing && (
                    <>
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
                    </>
                )}

                <label htmlFor="hireDate">Hire Date:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={empForm.hireDate}
                        className="date-picker"
                        onChange={(date) =>
                            setEmpForm((prev) => ({
                                ...prev,
                                hireDate: date,
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

export default NewEmployee;
