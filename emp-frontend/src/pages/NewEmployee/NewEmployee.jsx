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
    const [allDepartments, setAllDepartments] = useState([]);

    const { role, directorateId } = getTokenAndRole();

    const [selectedDirId, setSelectedDirId] = useState(
        role === "user" ? directorateId : null
    );

    // ====== ADMIN ======
    // We are using the same api for this as we use for new users directorate
    const fetchAllDirectoratesForNewEmployee = async () => {
        try {
            const response = await api.get("/user/directoratesfornewuser");
            const data = response.data;

            const options = data.map((dir) => {
                return {
                    label: formatText(dir.dirName),
                    value: dir.dirName,
                    dirId: dir._id,
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
            setLoading(true);
            fetchAllDirectoratesForNewEmployee();
        }
    }, [role]);

    // All departments for directorate
    const fetchAllDepartmentsForNewEmployee = async () => {
        try {
            const response = await api.get(
                `/employee/departmentsfornewemployee?directorateId=${selectedDirId}`
            );
            const data = response.data;
            console.log(data);

            const options = data.map((dpt) => {
                return {
                    label: formatText(dpt.dptName),
                    value: dpt.dptName,
                    dptId: dpt._id,
                };
            });

            setAllDepartments(options);
            console.log(options);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something is wrong!");
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!selectedDirId) return;

        setLoading(true);
        fetchAllDepartmentsForNewEmployee();
    }, [selectedDirId]);
    // ====== ADMIN ======

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmpForm((prev) => ({ ...prev, [name]: value }));
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

        if (
            !empForm.name ||
            !empForm.fName ||
            !empForm.grade ||
            !empForm.step ||
            !empForm.experience ||
            !empForm.idNumber ||
            !empForm.directorate ||
            !empForm.department
        ) {
            toast.error("Please fill all required fields");
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
        };

        console.log(preparedData);

        try {
            const response = await api.post("employee", preparedData);

            const data = await response.data;

            toast.success(data?.message);

            console.log(empForm);

            setEmpForm({
                name: "",
                fName: "",
                grade: "",
                step: "",
                experience: "",
                idNumber: "",
                directorate: null,
                department: null,
            });
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error.response);
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
                    required
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
                    required
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
                    required
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
                    disabled={loading}
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
                    disabled={loading}
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
                    options={allDepartments}
                    onChange={handleDepartmentChange}
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
