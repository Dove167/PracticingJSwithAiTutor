// Lesson 5: Objects - Organize Your Data Like a Pro!
const os = require('os'); // Built-in Node.js module for EOL

console.log("=== Object Basics ===" + os.EOL);

// Objects are like filing cabinets with labeled drawers
let boxer = {
    name: "Josh",
    age: 25,
    weight: "Heavyweight",
    record: {
        wins: 8,
        losses: 2,
        knockouts: 3
        //record is a key and the wins, losses and knockouts are the keys and values.
    },
    hobbies: ["boxing", "coding", "gaming", "reading"],

    // Methods - functions inside objects!
    getRecord: function() {
        return `${this.record.wins}-${this.record.losses}`;
    },

    //Arrow function method (modern style)
    getWinRate: () => {
        // Note: 'this' works differently in arrow functions!
        let totalFights = boxer.record.wins + boxer.record.losses;
        return ((boxer.record.wins / totalFights) * 100).toFixed(1) + "%";
    }
};

console.log("Boxer name:", boxer["name"]); //dot notation is lcean and direct and bracket notation does the same result
console.log("Boxing record:", boxer.getRecord());
console.log("Win rate:", boxer.getWinRate());
console.log("Favorite hobby:", boxer.hobbies[0]);

console.log(os.EOL + "=== Object Manipulation ===" + os.EOL);

// Adding new properties
boxer.gym = "Champion's Gym";
boxer.nextFight = "December 2024";

// Updating existing properties
boxer.age = 26;
boxer.record.wins = 9; // Won another fight!

console.log("Updated boxer info:");
console.log(`${boxer.name}, age ${boxer.age}, trains at ${boxer.gym}`);
console.log(`Next fight: ${boxer.nextFight}`);
console.log(`New record: ${boxer.getRecord()}`);

console.log(os.EOL + "=== Object Destructuring (Super Cool!) ===" + os.EOL);

// Extract properties into variables
let { name, age, hobbies } = boxer;
let { wins, losses } = boxer.record;

console.log(`Fighter: ${name}, Age: ${age}`);
console.log(`Record: ${wins}-${losses}`);
console.log(`Hobbies: ${hobbies.join(", ")}`);

console.log(os.EOL + "=== Array of Objects (Real-World Stuff!) ===" + os.EOL);

let fighters = [
    { name: "Josh", wins: 9, losses: 2, division: "Heavyweight" },
    { name: "Mike", wins: 12, losses: 1, division: "Middleweight" },
    { name: "Sarah", wins: 15, losses: 0, division: "Lightweight" }
];

// Find the undefeated fighter
let undefeated = fighters.filter(fighter => fighter.losses === 0);
console.log("Undefeated fighters:", undefeated);

// Get all fighter names 
let fighterNames = fighters.map(fighter => fighter.name);
console.log("All fighters:", fighterNames.join(", "));

// CAlculate total wins across all fighters
let totalWins = fighters.reduce((sum, fighter) => sum + fighter.wins, 0);
console.log(`Total wins by all fighters: ${totalWins}`);

console.log(os.EOL + "=== Your Turn! ===" + os.EOL);
console.log("Try adding a new fighter to the fighters array!");


