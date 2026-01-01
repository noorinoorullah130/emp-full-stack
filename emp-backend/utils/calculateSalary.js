function calculateSalary(grade, step) {
    const firstChar = grade.charAt(0);

    const key = `${firstChar} - ${step}`;

    switch (key) {
        // --- Grade 1 ---
        case "a - 1":
            return 38000;
        case "a - 2":
            return 40000;
        case "A-3":
            return 42000;
        case "A-4":
            return 44000;
        case "A-5":
            return 50000;

        // --- Grade 2 ---
        case "2-1":
            return 28000;
        case "2-2":
            return 30000;
        case "2-3":
            return 32000;
        case "2-4":
            return 34000;
        case "2-5":
            return 36000;

        // --- Grade 3 ---
        case "3-1":
            return 18000;
        case "3-2":
            return 20000;
        case "3-3":
            return 22000;
        case "3-4":
            return 24000;
        case "3-5":
            return 26000;

        // --- Grade 4 ---
        case "4-1":
            return 8000;
        case "4-2":
            return 10000;
        case "4-3":
            return 12000;
        case "4-4":
            return 14000;
        case "4-5":
            return 16000;
        default:
            return "Invalid grade or step!";
    }
}

module.exports = calculateSalary;
