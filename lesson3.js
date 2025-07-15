// Lesson 3: Arrays and Loops - The Power Combo!
let colors = ["Red", "Blue", "Green", "Yellow"];
let numbers = [10, 25, 5, 40, 15];
let myHobbies = ["coding", "gaming", "reading", "boxing"];

console.log("=== Array Basics ===");
console.log("My colors array:", colors);
console.log("Array length:", colors.length);
console.log("First color:", colors[0]);
console.log("Last color:", colors[colors.length - 1]);

// Adding and removing elements
colors.push("Purple"); // Add to end
console.log("After adding Purple:", colors);

let removedColor = colors.pop(); // Remove from end
console.log("Removed color:", removedColor);
console.log("Final colors:", colors);

console.log("\n=== Loop Magic ===");

// For-of loop (modern and clean!)
console.log("Colors using for-of:");
for (let color of colors) {
    console.log(`- ${color}`);
}

//Traditional for loop with index
console.log("\nNumbered list of hobbies:");
for (let i = 0; i < myHobbies.length; i++) {
    console.log(`${i + 1}. ${myHobbies[i]}`);
}

// Array methods (functional programming style)
console.log("\n=== Array Methods ===");

// Map - transform each element
let upperCaseColors = colors.map(color => color.toUpperCase());
console.log("Uppercase colors:", upperCaseColors);

// Filter - find elements that match criteria
let bigNUmbers = numbers.filter(num => num > 20);
console.log("Numbers greater than 20:", bigNUmbers);

// Find the maximum number
let maxNumber = Math.max(...numbers); // The ... is called "spread operator"
console.log("Largest number:", maxNumber);

console.log("\n=== Your Turn! ===");
console.log("Try adding your favorite hobby to myHobbies array!");

