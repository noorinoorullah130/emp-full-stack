const k = 1000;
const m = 1000000;
const b = 1000000000;
const t = 1000000000000;

const formatTotalSalary = (value) => {
    if (value < k) return value;
    if (value < m) return `${(value / k).toFixed(2)}K`;
    if (value < b) return `${(value / m).toFixed(2)}M`;
    if (value < t) return `${(value / b).toFixed(2)}B`;
    return `${(value / t).toFixed(2)}T`;
};

export default formatTotalSalary;
