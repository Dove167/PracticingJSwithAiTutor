// Lesson 2: String Power!
let myName = "Josh";
let favoriteColor = "Blue";
let message = "JavaScript is awesome!";

console.log("=== String Methods Demo ===");

// Length property
console.log("My name has", myName.length, "characters");

// Case methods
console.log("Uppercase name:", myName.toUpperCase());
console.log("Lowercase color:", favoriteColor.toLowerCase());

// Finding things in strings
console.log("Does message include 'Script'?", message.includes("Script"));
console.log("Position of 'awesome':", message.indexOf("awesome"));

// Extracting parts of strings
console.log("First 4 characters of message:", message.substring(0, 4));
console.log("Character at position 0 in my name:", myName.charAt(0));

// Replacing text
let newMessage = message.replace("awesome", "AMAZING");
console.log("Modified message:", newMessage);

// String concatenation (joining)
let fullIntro = "Hi, I'm " + myName + " and my favorite color is " + favoriteColor;
console.log("Full introduction:", fullIntro);

// Template literals (modern way)
let modernIntro = `Hi, I'm ${myName} and my favorite color is ${favoriteColor}`;
console.log("Modern introduction:", modernIntro);

