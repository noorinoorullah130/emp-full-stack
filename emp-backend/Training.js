const array = [
    {
        name: "Noorullah",
        salary: 10000,
    },
    {
        name: "abdulrahman",
        salary: 20000,
    },
    {
        name: "kahn",
        salary: 12000,
    },
];

let totalSalary = 0;

array.forEach((emp) => {
    return (totalSalary = totalSalary + emp.salary);
});

console.log(totalSalary);
