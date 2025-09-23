const formatText = (names) => {
    const newArr = names.split(" ");
    let toUpperCase = newArr.map(
        (n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
    );
    return toUpperCase;
};

// console.log(formatText("finance and budget"));

export default formatText;
