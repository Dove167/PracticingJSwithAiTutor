// =======================================
// Lesson 9: Synchronous Javascript fundamentals
// ========================================
const os = require('os');


console.log("=== LESSON 9: SYNCHRONOUS FOUNDATIONS ===");
console.log("Starting our JavaScript journey..." + os.EOL);

// =====================================================
// PART 1: VARIABLES AND DATA TYPES
// =====================================================

console.log("--- Part 1: Variables and Data Types ---");

// Different ways to declare variables
let studentName = "Josh";         // Can be changed later
const maxScore = 100;             // Cannot be changed
var oldStyle = "avoid this";      // Old way, avoid it

// Data types in action
let age = 25;                     // Number
let isLearning = true;            // Boolean
let favoriteFood = null;          // Null (intentionally empty)
let undefinedValue;               // Undefined (not assigned)
let skills = ["JavaScript", "HTML"];     // Array (object type)

console.log("Student:", studentName);
console.log("Max Score:", maxScore);
console.log("Age:", age, "Type:", typeof age);
console.log("Is Learning:", isLearning, "Type:", typeof isLearning);
console.log("Skills:", skills, "Type:", typeof skills);
console.log(); //Empty line for spacing

// =====================================================
// PART 2: CONDITIONAL STATEMENTS (IF/ELSE)
// =====================================================

console.log("--- Part 2: Conditional Logic ---");

let currentScore = 85;

// Basic if-else
if (currentScore >= 90) {
    console.log("Grade: A - Excellent work!");
} else if (currentScore >= 80) {
    console.log("Grade: B - Good job!");
} else if (currentScore >= 70) {
    console.log("Grade C - Keep improving!");
} else {
    console.log("Grade: F - Need more practice!");
}

// Ternary operator (shorthanf if-else)
let status = (currentScore >= 70) ? "PASSED" : "FAILED";
console.log("Status:", status);

// Multiple conditions
let hasHomework = true;
let hasAttended = true;

if (hasHomework && hasAttended) {
    console.log("Student is doing great!");
} else if (hasHomework || hasAttended) {
    console.log("Student needs to improve one area.");
} else {
    console.log("Student needs help!");
}

console.log(); // Spacing

// =====================================================
// PART 3: LOOPS - THE WORKHORSES
// =====================================================

console.log("--- Part 3: Loops ---");

// FOR LOOP - when you know how many times
console.log("FOR LOOP - Counting 1 to 5:");
for (let i = 1; i <= 5; i++) {
    console.log(`Count: ${i}`);
}

// WHILE LOOP - when condition-based
console.log(os.EOL + "WHILE LOOP - Countdown from 5:");
let countdown = 5;
while (countdown > 0) {
    console.log(`Countdown: ${countdown}`);
    countdown--; // Same as countdown = countdown - 1
}

// FOR...OF LOOP - for arrays (gets values)
console.log(os.EOL + "FOR...OF LOOP - Going through subjects:");
let subjects = ["Math", "Science", "History", "Art"];
for (let subject of subjects) {
    console.log(`Subject: ${subject}`);
}

// FOR...IN LOOP - for objects (get keys)
console.log(os.EOL + "FOR...IN LOOP - Student info:");
let student = {
    name: "Josh",
    grade: "A",
    year: 2024,
    active: true
};

for (let key in student) {
    console.log(`${key}: ${student[key]}`);
}

// FOREACH - array method (more functional style)
console.log(os.EOL + "FOREACH - Modern array iteration:");
subjects.forEach(function(subject, index) {
    console.log(`${index + 1}. ${subject}`);
});

console.log(); // Spacing

// =====================================================
// PART 4: TRY-CATCH ERROR HANDLING
// =====================================================

console.log("--- Part 4: Error Handling ---");

// Basic try-catch
try {
    console.log("Attempting risky operation...");

    //This will cause an error
    let result = someUndefinedFunction();
    console.log("This won't print because error happened above");
} catch (error) {
    console.log("Caught an error:", error.message);
    console.log("But our program continues running!");
}

//Try-catch with different error types
function divideNumbers(a, b) {
    try {
        if (b === 0) {
            throw new Error("Cannot divide by zero!");
        }
        return a / b;
    } catch (error) {
        console.log("Math error:", error.message);
        return null;
    }
}

console.log("10 divided by 2 =", divideNumbers(10, 2));
console.log("10 divided by 0 =", divideNumbers(10, 0));

// Try-catch-finally
try {
    console.log("Trying something...");
    // Simulate success this time
    console.log("Success!");
} catch (error) {
    console.log("Error occured:", error.message);
} finally {
    console.log("This ALWAYS runs, error or no error");
}

console.log(); // Spacing

// =====================================================
// PART 5: CONSOLE.LOG TECHNIQUES
// =====================================================

console.log("--- Part 5: Console.log Mastery ---");

// Basic console.log
console.log("Simple message");

// Multiple values
console.log("Name:", studentName, "Score:", currentScore);

// Template literals (modern way)
console.log(`Student ${studentName} scored ${currentScore}/100`);

// Different console methods
console.log("Regular log");
console.warn("This is a warning");
console.error("This is an error message");
console.info("This is info");

// Console.log with objects 
console.log("Student object:", student);

// Console.table for arrays/objects (fancy!)
console.table(subjects);
console.table(student);

console.log(); // Spacing

// =====================================================
// PART 6: PUTTING IT ALL TOGETHER
// =====================================================

console.log("--- Part 6: Real Example - Grade Calculator ---");

function calculateGrades() {
    let students = [
        { name: "Alice", scores: [85, 92, 78] },
        { name: "Bob", scores: [76, 81, 90] },
        { name: "Charlie", scores: [95, 88, 92] }
    ];

    console.log("=== GRADE REPORT ===");

    for (let student of students) {
        try {
            //Calculate average 
            let total = 0;
            for (let score of student.scores) {
                total += score;
            }
            let average = total / student.scores.length;

            //Determine grade
            let letterGrade;
            if (average >= 90) {
                letterGrade = "A";
            } else if (average >= 80) {
                letterGrade = "B";
            } else if (average >= 70) {
                letterGrade = "C";
            } else {
                letterGrade = "F";
            }

            //Display results
            console.log(`${student.name}: ${average.toFixed(1)}% (${letterGrade})`);


        } catch (error) {
            console.log(`Error calculating grade for ${student.name}:`, error.message);
        }
    }
}


// Run the grade calculator
calculateGrades();

console.log() // Spacing

// =====================================================
// LESSON 9 COMPLETE!
// =====================================================

console.log("=== LESSO 9 COMPLETE! ===");
console.log("You've mastered:");
console.log("Variables and data types");
console.log("If/else statements");
console.log("All types of loops");
console.log("Try-catch error handling");
console.log("Console.log techniques");
console.log(os.EOL + "Next up: Lesson 10 - File System Operations!");
console.log("Great work, Josh!");


