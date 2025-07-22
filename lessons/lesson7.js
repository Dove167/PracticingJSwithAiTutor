//My attempt

// let mySelf = (name, age, introduce) => {
//     name: "Josh",
//     age: 25,
//     introduce: "Hello, my name is ${this.name}"
// }

// Correct version:
let mySelf = {
    name: "Josh",
    age: 25, 
    introduce: function() {
        return `Hello, my name is ${this.name}`;
    }
};

console.log(mySelf.introduce()); // output should be: "Hello, my name is Josh"

// What I learned
// - Objects don't need () => they're just {}
// - Methods need function() or arrow functions
// - Template literals need backticks `, not quotes ""


// this refers to the OBJECT it's inside of
let boxer = {
    name: "Josh",
    wins: 9, 
    introduce: function() {
        return `I'm ${this.name}`; // 'this' = the boxer object
    }
};


// My attempt:
// for myNumbers (for of numbers = num > 5)

//Correct syntax:
let myNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let bigNumbers = myNumbers.filter(num => num > 5);
console.log(bigNumbers); // output should be [6, 7, 8, 9]


