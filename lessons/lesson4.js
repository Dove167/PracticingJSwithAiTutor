// Lesson 4: Functions - Build Your Own Tools!

console.log("=== Basic Functions ===");

// Function Declaration - like creating a new tool
function greetPerson(name) {
    return `Hello there, ${name}! Welcome to JavaScript`;
}

let greeting = greetPerson("x");
console.log(greeting);

// Function with multiple parameters
function calculateTip(billAmount, tipPercent) {
    let tip = billAmount * (tipPercent / 100);
    let total = billAmount + tip;
    return {
        tip: tip,
        total: total,
        message: `Tip: $${tip.toFixed(2)}, Total: $${total.toFixed(2)}`
    };
}

let restaurant = calculateTip(50, 18);
console.log(restaurant.message);

console.log("\n=== Arrow Functions (Modern Style) ===");

// Arrow function - shorter way to write functions
let double = (number) => number * 2;
let square = (number) => number * number;

console.log("Double 7:", double(7));
console.log("Square 6:", square(6));

// Arrow function with array methods (POWERFUL COMBO!)
let myNumbers = [1, 2, 3, 4, 5];

let doubled = myNumbers.map(num => num * 2);
let evens = myNumbers.filter(num => num % 2 === 0);
let sum = myNumbers.reduce((total, num) => total + num, 0);

console.log("Original numbers:", myNumbers);
console.log("Doubled:", doubled);
console.log("Even numbers only:", evens);
console.log("Sum of all numbers:", sum);

console.log("\n Your Boxing Sats Function ===");

// Let's create a function  for your boxing hobby!
function boxingStats(wins, losses, knockouts) {
    let totalFights = wins + losses;
    let winRate = (wins / totalFights * 100).toFixed(1);

    return {
        record: `${wins}=${losses}`,
        winRate: `${winRate}%`, 
        knockouts: knockouts,
        summary: `Record: ${wins}-${losses} (${winRate}% win rate) with ${knockouts} KOs!`
    }
}

// Try it out!
let joshStats = boxingStats(8, 2, 3);
console.log(joshStats.summary);

