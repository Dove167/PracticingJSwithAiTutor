const os = require('os');

console.log("=== The 'this' Mystery Solved! ===" + os.EOL);

let gym = {
    name: "Champion's Boxing Gym",
    location: "Downtown",
    members: [],

    // Regular function - 'this' points to the gym object
    addMember: function(memberName, wins, losses) {
        let newMember = {
            name: memberName,
            wins: wins,
            losses: losses,
            gym: this.name // <- 'this' refers to the gym object
        };
        this.members.push(newMember); // <- Add to THIS gym's members
        return `${memberName} joined ${this.name}!`;
    },

    // Arrow function - 'this' doesn't work the same way!
    getMemberCount: () => {
        // In arrow functions, 'this' doesn't refer to the object
        return gym.members.length; // <- We have to use 'gym' directly
    },

    //Regular function for comparison
    getMemberCountRegular: function() {
        return this.members.length; // <- 'this' works here!
    }
};

console.log(gym.addMember("Josh", 9, 2));
console.log(gym.addMember("Mike", 12, 1));
console.log(`Total members: ${gym.getMemberCount()}`);
console.log(`Members using 'this': ${gym.getMemberCountRegular()}`);

console.log(os.EOL + "=== Object Destructuring Magic! ===" + os.EOL);

// Extract multiple properties at once!
let { name: gymName, location, members } = gym;
console.log(`${gymName} is located ${location}`);
console.log(`First member: ${members[0].name}`);

// Destructuring with renaming
let { name: fighterName, wins } = members[0];
console.log(`${fighterName} has ${wins} wins`);

console.log(os.EOL + "=== Dynamic Object Creation ===" + os.EOL);

// Function that creates fighter objects
function createFighter(name, wins, losses, division, specialMove) {
    return {
        name: name,
        wins: wins, 
        losses: losses,
        division: division,
        specialMove: specialMove,

        // Calculated properties
        totalFights: wins + losses,
        winRate: ((wins / (wins + losses)) * 100).toFixed(1) + "%",

        // Methods
        introduce: function() {
            return `I'm ${this.name}, ${this.winRate} win rate, signature move: ${this.specialMove}!`;
        },

        fight: function(opponent) {
            let random = Math.random();
            if (random > 0.5) {
                this.wins++;
                return `${this.name} defeats ${opponent.name} with ${this.specialMove}!`;
            } else {
                this.losses++;
                opponent.wins++;
                return `${opponent.name} defeats ${this.name}!`;
            }
        }
    }
}

// Create fighters using our factory function
let josh = createFighter("Josh", 9, 2, "Heavyweight", "Thunder Punch");
let sarah = createFighter("Sarah", 15, 0, "Lightweight", "Lightening Kick");

console.log(josh.introduce());
console.log(sarah.introduce());

console.log(os.EOL + "=== Real-World Example: User Management ===" + os.EOL);

let userDatabase = {
    users: [],

    addUser: function(userData) {
        let user = {
            id: this.users.length + 1,
            ...userData, // <- Spread operator! Copies all properties
            createdAt: new Date().toISOString(),
            active: true
        };
        this.users.push(user);
        return user;
    },

    findUser: function(name) {
        return this.users.find(user => user.name === name);
    },

    getActiveUsers: function() {
        return this.users.filter(user => user.active);
    },

    getUserStats: function() {
        return {
            total: this.users.length,
            active: this.getActiveUsers().length,
            inactive: this.users.filter(user => !user.active).length
        };
    }
};

// Add some users
userDatabase.addUser({ name: "Josh", email: "josh@boxing.com", role: "fighter" });
userDatabase.addUser({ name: "Mike", email: "mike@gym.com", role: "trainer" });

console.log("All users:", userDatabase.users);
console.log("Find Josh:", userDatabase.findUser("Josh"));
console.log("User stats:", userDatabase.getUserStats());

console.log(os.EOL + "=== Your Challenge! ===" + os.EOL);
console.log("1. Create a new fighter using createFighter()");
console.log("2. Add yourself to the userDatabase");
console.log("3. Make two fighters fight each other!");

