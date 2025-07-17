// =======================================
// Lesson 10: File System Operations  
// =======================================

const fs = require('fs');
const path = require('path');
const os = require('os');

console.log("=== LESSON 10: FILE SYSTEM MASTERY ===");
console.log("Learning to read, write, and manage files!" + os.EOL);

// =====================================================
// PART 1: UNDERSTANDING FILE PATHS
// =====================================================

console.log("--- Part 1: File Paths ---");

// Current directory
console.log("Current directory:", __dirname);
console.log("Current file:", __filename);

// Building paths safely (works on Windows, Mac, Linux)
const dataFolder = path.join(__dirname, 'data');
const studentFile = path.join(dataFolder, 'students.txt');
const gradesFile = path.join(dataFolder, 'grades.json');

console.log("Data fodler path:", dataFolder);
console.log("Student file path:", studentFile);
console.log("Grades file path:", gradesFile);
console.log(); // Spacing

// =====================================================
// PART 2: CREATING DIRECTORIES
// =====================================================

console.log("--- Part 2: Creating Directories ---");

// Create data directory if it doesn't exist
try {
    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder);
        console.log("✅ Created 'data' directory");
    } else {
        console.log("📁 'data' directory already exists")
    }
} catch (error) {
    console.log("❌ Error creating directory:", error.message);
}

console.log(); // Spacing

// =====================================================
// PART 3: WRITING FILES (SYNCHRONOUS)
// =====================================================

console.log("--- Part 3: Writing Files ---");

// Write a simple text file
const studentData = `Josh Fajardo - JavaScript Student
Learning Progress:
✅ Variables and Data Types
✅ Control Flow (if/else, loops)
✅ Error Handling (try/catch)
✅ Console.log Techniques
✅ File System Operations (current lesson)

Next Goals:
- Array Processing
- Promise Chains
- Functional Programming
- Advanced Async Operations

Data: ${new Date().toLocaleDateString()}
Status: Actively Learning`;

try {
    fs.writeFileSync(studentFile, studentData);
    console.log("✅ Student data written to file successfully!");
} catch (error) {
    console.log("❌ Error writing student file:", error.message);
}

// Write JSON data 
const gradesData = {
    student: "Josh Fajardo", 
    studentId: "JS2024-001",
    course: "JavaScript Fundamentals",
    lessons: [
        { lesson: 1, topic: "Introduction", score: 95, completed: true },
        { lesson: 2, topic: "Variables", score: 88, completed: true },
        { lesson: 3, topic: "Functions", score: 92, completed: true },
        { lesson: 4, topic: "Arrays", score: 90, completed: true },
        { lesson: 5, topic: "Objects", score: 87, completed: true },
        { lesson: 6, topic: "Loops", score: 93, completed: true },
        { lesson: 7, topic: "Conditionals", score: 91, completed: true },
        { lesson: 8, topic: "Error Handling", score: 89, completed: true },
        { lesson: 9, topic: "Synchronous Foundations", score: 94, completed: true },
        { lesson: 10, topic: "File System", score: null, completed: false }
    ],
    overallAverage: 91.0,
    lastUpdated: new Date().toISOString()
};

try {
    // Convert JavaScript object to JSON string 
    const jsonString = JSON.stringify(gradesData, null, 2); // null, 2 makes it pretty
    fs.writeFileSync(gradesFile, jsonString);
    console.log("✅ Grades data written to JSON file successfully!");
} catch (error) {
    console.log("❌ Error writing grades file:", error.message);
}

console.log(); // Spacing

// =====================================================
// PART 4: READING FILES (SYNCHRONOUS)
// =====================================================

console.log("--- Part 4: Reading Files ---");

// Read the text file
try {
    const readStudentData = fs.readFileSync(studentFile, 'utf8');
    console.log("📖 Student file contents:");
    console.log("-".repeat(50));
    console.log(readStudentData);
    console.log("-", repeat(50));
} catch (error) {
    console.log("❌ Error reading student file:", error.message);
}

// Read and parse JSON file
try {
    const readGradesData = fs.readFileSync(gradesFile, 'utf8');
    const gradeObject = JSON.parse(readGradesData); // Convert JSON string back to object

    console.log(os.EOL + "📊 Grades file contents:");
    console.log("Student:", gradesObject.student);
    console.log("Course:", gradesObject.course);
    console.log("Overall Average:", gradesObject.overallAverage + "%");
    console.log("Completed Lessons:");

    gradesObject.lessons.forEach(lesson => {
        if (lesson.completed) {
            console.log(`  ✅ Lesson ${lesson.lesson}: ${lesson.topic} (${lesson.score}%)`);
        } else {
            console.log(`  ⏳ Lesson ${lesson.lesson}: ${lesson.topic} (In Progress)`);
        }
    });

} catch (error) {
    console.log("❌ Error reading grades file:", error.message);
}

console.log(); //Spacing

// =====================================================
// PART 5: CHECKING FILE EXISTENCE AND STATS
// =====================================================

console.log("--- Part 5: File Information ---");

// Check if files exist
const filesToCheck = [studentFile, gradesFile];

filesToCheck.forEach(filePath => {
    try {
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            const fileName = path.basename(filePath);

            console.log(`📄 ${fileName}:`)
            console.log(`   Size: ${stats.size} bytes`);
            console.log(`   Created: ${stats.birthtime.toLocaleString()}`);
            console.log(`   Modified: ${stats.mtime.toLocaleString()}`);
            console.log(`   Is File: ${stats.isFile()}`);
            console.log(`   Is Directory: ${stats.isDirectory()}`);
        } else {
            console.log(`❌ File does not exist: ${path.basename(filePath)}`);
        }
    }catch (error) {
        console.log(`❌ Error checking file ${path.basename(filePath)}:`, error.message);
    }
});

console.log(); // Spacing

// =====================================================
// PART 6: APPENDING TO FILES
// =====================================================

console.log("--- Part 6: Appending Data ---");

const newLogEntry = `${os.EOL}${os.EOL}--- LESSON 10 PROGRESS ---
Date: ${new Date().toLocaleDateString()}
Activity: Completed File System Operations lesson
Status: Successfully learned to read, write, and manage files
Confidence Level: High
Next StepL Ready for advanced topics!`;

try {
    fs.appendFileSync(studentFile, newLogEntry);
    console.log("✅ Progress log appended to student file!");
} catch (error) {
    console.log("❌ Error appending to file:", error.message);
}

console.log(); // Spacing

// =====================================================
// PART 7: WORKING WITH DIFFERENT FILE FORMATS
// =====================================================

console.log("--- Part 7: Different File Formats ---");

// Create a CSV file (Comma Seperated Values)
const csvFile = path.join(dataFolder, 'progress.csv');
const csvData = `Lesson, Topic, Score, Date
1,Introduction,95,2024-01-15
2,Variables,88,2024-01-16
3,Functions,92,2024-01-17
4,Arrays,90,2024-01-18
5,Objects,87,2024-01-19
6,Loops,93,2024-01-20
7,Conditionals,91,2024-01-21
8,Error Handling,89,2024-01-22
9,Synchronous Foundations,94,2024-01-23
10,File System,95,${new Date().toISOString().split('T')[0]}`;

try {
    fs.writeFileSync(csvFile, csvData);
    console.log("✅ CSV file created successfully!");

    // Read and process CSV
    const csvContent = fs.readFileSync(csvFile, 'utf8');
    const lines = csvContent.split(os.EOL);
    const headers = lines[0].split(',');

    console.log("📊 CSV Data Preview:");
    console.log("Headers:", headers.join(' | '));
    console.log("-".repeat(50));

    // Process each data row (skip header)
    for (let i = 1; i < lines.length && i <= 3; i++) {
        const values = lines[i].split(',');
        console.log(values.join(' | '));
    }
    console.log("... amd more rows");
} catch (error) {
    console.log("❌ Error with CSV operations:", error.message);
}

console.log(); // Spacing

// =====================================================
// PART 8: PRACTICAL FILE OPERATIONS FUNCTION
// =====================================================

console.log("--- Part 8: Pratical Functions ---");

// Function to safely read JSON files
function readJSONFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  File doesn't exist: ${path.basename(filePath)}`);
            return null;
        }

        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log(`❌ Error reading JSON file: ${error.message}`);
        return null;
    }
}

// Function to safely write JSON files
function writeJSONFile(filePath, data) {
    try {
        const jsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonString);
        console.log(`✅ JSON file written: ${path.basename(filePath)}`);
        return true;
    } catch (error) {
        console.log(`❌ Error writing JSON file: ${error.message}`);
        return false;
    }
}

// Test our functions
console.log("🧪 Testing our utility functions:");

const testData = {
    message: "Hello from our utility function!",
    timestamp: new Date().toISOString(),
    success: true
};

const testFile = path.join(dataFolder, 'test.json');

// Write test data
if (writeJSONFile(testFile, testData)) {
    //Read it back
    const readData = readJSONFile(testFile);
    if (readData) {
        console.log("📖 Read back from file:", readData.message);
    }
}

console.log(); // Spacing 

// =====================================================
// PART 9: FILE SYSTEM SUMMARY
// =====================================================

console.log("--- Part 9: What We've Learned ---");

console.log("🎯 File System Operations Mastered:");
console.log("   ✅ Creating directories with fs.mkdirSync()");
console.log("   ✅ Writing files with fs.writeFileSync()");
console.log("   ✅ Reading files with fs.readFileSync()");
console.log("   ✅ Appending to files with fs.appendFileSync()");
console.log("   ✅ Checking file existence with fs.existsSync()");
console.log("   ✅ Getting file stats with fs.statSync()");
console.log("   ✅ Working with JSON data (JSON.parse/stringify)");
console.log("   ✅ Processing CSV files");
console.log("   ✅ Building safe file paths with path.join()");
console.log("   ✅ Creating utility functions for file operations");

console.log(os.EOL + "🔥 CONGRATULATIONS! You can now:");
console.log("   📁 Create and manage files and folders");
console.log("   📊 Store and retrieve data persistently");
console.log("   🔄 Convert between JavaScript objects and JSON");
console.log("   🛡️  Handle file errors gracefully");
console.log("   🎯 Build practical file-based applications");

console.log(); // Spacing

// =====================================================
// LESSON 10 COMPLETE!
// =====================================================

console.log("=== LESSON 10 COMPLETE! ===");
console.log("Josh, you've entered the world of persistent data!");
console.log("Your JavaScript programs can now remember things between runs!");
console.log(os.EOL + "Next up: Advanced topics await! 🚀");
console.log("You're becoming a real JavaScript developer! 💪");