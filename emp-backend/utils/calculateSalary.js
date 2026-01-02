function calculateSalary(grade, step) {
    const firstChar = grade.charAt(0);

    const key = `${firstChar} - ${step}`;

    switch (key) {
        // --- Grade 1 ---
        case "a - 1":
            return 38000;
        case "a - 2":
            return 40000;
        case "a - 3":
            return 42000;
        case "a - 4":
            return 44000;
        case "a - 5":
            return 50000;

        // --- Grade 2 ---
        case "b - 1":
            return 28000;
        case "b - 2":
            return 30000;
        case "b - 3":
            return 32000;
        case "b - 4":
            return 34000;
        case "b - 5":
            return 36000;

        // --- Grade 3 ---
        case "c - 1":
            return 18000;
        case "c - 2":
            return 20000;
        case "c - 3":
            return 22000;
        case "c - 4":
            return 24000;
        case "c - 5":
            return 26000;

        // --- Grade 4 ---
        case "d - 1":
            return 8000;
        case "d - 2":
            return 10000;
        case "d - 3":
            return 12000;
        case "d - 4":
            return 14000;
        case "d - 5":
            return 16000;

        // Support Grades
        case "e - 1":
            return 12000;
        case "e - 2":
            return 14000;
        case "e - 3":
            return 16000;
        case "e - 4":
            return 18000;
        case "e - 5":
            return 20000;
        default:
            return "Invalid grade or step!";
    }
}

module.exports = calculateSalary;
