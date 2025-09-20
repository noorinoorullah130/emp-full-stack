function calculateSalary(grade, step) {
    switch (`${grade}-${step}`) {
        // --- Grade 1 ---
        case "1-1":
            return 45000;
        case "1-2":
            return 40000;
        case "1-3":
            return 38000;
        case "1-4":
            return 35000;
        case "1-5":
            return 32000;

        // --- Grade 2 ---
        case "2-1":
            return 30000;
        case "2-2":
            return 28000;
        case "2-3":
            return 26000;
        case "2-4":
            return 24000;
        case "2-5":
            return 22600;

        // --- Grade 3 ---
        case "3-1":
            return 20000;
        case "3-2":
            return 18550;
        case "3-3":
            return 16500;
        case "3-4":
            return 15000;
        case "3-5":
            return 14500;

        // --- Grade 4 ---
        case "4-1":
            return 12000;
        case "4-2":
            return 10500;
        case "4-3":
            return 9500;
        case "4-4":
            return 8500;
        case "4-5":
            return 8000;
        default:
            return "Invalid grade or step!";
    }
}

module.exports = calculateSalary;
