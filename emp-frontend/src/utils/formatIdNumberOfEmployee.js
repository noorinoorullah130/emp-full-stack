const formatIdNumberOfEmployee = (value) => {
    let digits = value.replace(/\D/g, "");
    digits = digits.slice(0, 13);

    if (digits.length <= 4) return digits;
    if (digits.length <= 8) return digits.slice(0, 4) + "-" + digits.slice(4);
    return (
        digits.slice(0, 4) + "-" + digits.slice(4, 8) + "-" + digits.slice(8)
    );
};

export default formatIdNumberOfEmployee;
