// const name = "noorullah noori";
const name = "noorullah";

const nameArr = name.split(" ");

const newName = nameArr.map(
    (n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
);

console.log(nameArr);
console.log(newName);
