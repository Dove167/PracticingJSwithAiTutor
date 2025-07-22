// =======================================
// Lesson 11: Array Processing Mastery
// =======================================

const fs = require('fs');
const path = require('path');
const os = require('os');

console.log("=== LESSON 11: ARRAY PROCESSING ===");
console.log("Learning the POWER tools: map, filter, reduce, and more!" + os.EOL);

// =======================================
// PART 1: THE BIG 4 ARRAY METHODS
// =======================================

console.log("--- Part 1: The Big 4 Array Power Tools ---");

// Sample data for our examples 
const students = [
    { name: "Josh", grade: 95, subject: "JavaScript", age: 22 },
    { name: "Sarah", grade: 87, subject: "Python", age: 21 },
    { name: "Mike", grade: 92, subject: "JavaScript", age: 23 },
    { name: "Emma", grade: 78, subject: "Java", age: 20 },
    { name: "Alex", grade: 89, subject: "JavaScript", age: 22 },
    { name: "Lisa", grade: 94, subject: "Python", age: 21 }
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const prices = [19.99, 25.50, 12.75, 8.99, 45.00, 33.25];

console.log("📊 Our sample data:");
console.log("Students:", students.length, "records");
console.log("Numbers:", numbers);
console.log("Prices:", prices);
console.log();

// =====================================================
// PART 2: MAP - TRANSFORMING EVERY ELEMENT
// =====================================================

console.log("--- Part 2: MAP - The Transformer ---");
console.log("🎯 Map creates a NEW array by transforming EVERY element");

// Example 1: Double every number
const doubledNumbers = numbers.map(num => num * 2);
console.log("Original numbers:", numbers);
console.log("Doubled numbers:", doubledNumbers);

// Example 2: Extract just student names
const studentNames = students.map(student => student.name);
console.log("Student names:", studentNames);

// Example 3: Create formatted strings
const gradeReports = students.map(student => {
    return `${student.name}: ${student.grade}% in ${student.subject}`;
});
console.log("Grade reports:");
gradeReports.forEach(report => console.log("  " + report));

// Example 4: Transform prices to inclide tax
const pricesWithTax = prices.map(price => {
    const tax = price * 0.13; // 13% tax
    const total = price + tax;
    return {
        original: price,
        tax: parseFloat(tax.toFixed(2)),
        total: parseFloat(total.toFixed(2))
    };
});

console.log("Prices with tax:");
pricesWithTax.forEach(item => {
    console.log(`  $${item.original} + $${item.tax} tax = $${item.total}`);
});

console.log();

// =====================================================
// PART 3: FILTER - SELECTING SPECIFIC ELEMENTS
// =====================================================

console.log("--- Part 3: FILTER - The Selector ---");
console.log("🎯 Filter creates a NEW array with only elements that pass a test");

// Example 1: Only even numbers
const evenNumbers = numbers.filter(num => num% 2 === 0);
console.log("Even numbers:", evenNumbers);

// Example 2: High-performing students (grade >= 90)
const topStudents = students.filter(student => student.grade >= 90);
console.log("Top students (90%+):");
topStudents.forEach(student => {
    console.log(`  ${student.name}: ${student.grade}%`);
});

// Example 3: JavaScript students only
const jsStudents = students.filter(student => student.subject === "JavaScript");
console.log("JavaScript students:", jsStudents.map(s => s.name));

// Example 4: Expensive items (over $20)
const expensiveItems = prices.filter(price => price > 20);
console.log("Expensive items (>$20):", expensiveItems);

// Example 5: Complex filtering - Young JavaScript students with high grades
const youngJSStars = students.filter(student => {
    return student.subject === "JavaScript" &&
            student.age <= 22 &&
            student.grade >= 90;
});
console.log("Young JS stars:", youngJSStars.map(s => `${s.name} (${s.age}, ${s.grade}%)`));

console.log();

// =====================================================
// PART 4: REDUCE - COMBINING ALL ELEMENTS
// =====================================================

console.log("--- Part 4: REDUCE - The Combiner ---");
console.log("🎯 Reduce combines ALL elements into a SINGLE value");

// Example 1: Sum all numbers
const sum = numbers.reduce((accumulator, currentNumber) => {
    console.log(`  Adding ${currentNumber} to ${accumulator} = ${accumulator + currentNumber}`);
    return accumulator + currentNumber;
}, 0); // 0 is the starting value
console.log("Total sum:", sum);

// Example 2: Find the maximum grade
const maxGrade = students.reduce((highest, student) => {
    return student.grade > highest ? student.grade : highest;
}, 0);
console.log("Highest grade:", maxGrade);

// Example 3: Calculate average grade
const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);
const averageGrade = totalGrades / students.length;
console.log("Average grade:", averageGrade.toFixed(1) + "%");

// Example 4: Group students by subject
const studentsBySubject = students.reduce((groups, student) => {
    const subject = student.subject;
    if (!groups[subject]) {
        groups[subject] = [];
    }
    groups[subject].push(student.name);
    return groups;
}, {});
console.log("Students by subject:", studentsBySubject);

// Example 5: Build a summary object
const summary = students.reduce((acc, student) => {
    acc.totalStudents++;
    acc.totalGrades += student.grade;
    acc.subjects.add(student.subject);

    if (student.grade >= 90) {
        acc.topPerformers++;
    }

    return acc;
}, {
    totalStudents: 0,
    totalGrades: 0,
    subjects: new Set(),
    topPerformers: 0
});

console.log("Class summary:");
console.log(`   Total students:  ${summary.totalStudents}`);
console.log(`   Average grade: ${(summary.totalGrades / summary.totalStudents).toFixed(1)}%`);
console.log(`   Subjects taught: ${Array.from(summary.subjects).join(', ')}`);
console.log(`   Top performers: ${summary.topPerformers}`);

console.log();

// =====================================================
// PART 5: CHAINING METHODS - THE POWER COMBO
// =====================================================

console.log("--- Part 5: Method Chaining - The Power Combo ---");
console.log("🎯 Combine map, filter, and reduce for incredible power!");

// Example 1: Get names of JavaScript students with grades over 90
const jsTopPerformers = students
    .filter(student => student.subject === "JavaScript")
    .filter(student => student.grade >= 90)
    .map(student => student.name);

console.log("Top JavaScript performers:", jsTopPerformers);

// Example 2: Calculate average grade of Python students
const pythonAverage = students
    .filter(student => student.subject === "Python")
    .map(student => student.grade)
    .reduce((sum, grade) => sum + grade, 0) /
    students.filter(student => student.subject === "Python").length;

console.log("Python students average:", pythonAverage.toFixed(1) + "%");

// Example 3: Complex transformation and calculation
const processedData = students
    .filter(student => student.age >= 21)
    .map(student => ({
        ...student,
        letterGrade: student.grade >= 90 ? 'A' :
                     student.grade >= 80 ? 'B' :
                     student.grade >= 70 ? 'C' : 'D',
        status: student.grade >= 85 ? 'Excellent' : 'Good'
    }))
    .filter(student => student.letterGrade !== 'D') // Remove failing grades
    .reduce((acc, student) => {
        if (!acc[student.status]) {
            acc[student.status] = [];
        }
        acc[student.status].push(`${student.name} (${student.letterGrade})`);
        return acc;
    }, {});

console.log("Processsed adult students:", processedData);

console.log();

// =====================================================
// PART 6: FOREACH - PERFORMING ACTIONS
// =====================================================

console.log("--- Part 6: FOREACH = The Action Performer ---");
console.log("🎯 ForEach performs an action on every element (doesn't return new array)");

// Example 1: Print formatted student info
console.log("Student roster:");
students.forEach((student, index) => {
    console.log(`${index + 1}. ${student.name} - ${student.grade}% (${student.subject})`);
});

// Example 2: Update grades (modify original array)
const testScores = [85, 92, 78, 96, 88];
console.log("Original test scores:", testScores);

testScores.forEach((score, index, array) => {
    // Add 5 bonus points to each score
    array[index] = score + 5;
});
console.log("After bonus points:", testScores);

console.log();

// =====================================================
// PART 7: JOIN - COMBINING ARRAY ELEMENTS
// =====================================================

console.log("--- Part 7: JOIN - The String Builder ---");
console.log("🎯 Join combines array elements into a single string");

// Example 1: Simple join
const fruits = ["apple", "banana", "orange", "grape"];
console.log("Fruits list:", fruits.join(", "));
console.log("Fruits with 'and':", fruits.slice(0, -1).join(", ") + " and " + fruits[fruits.length - 1]);

// Example 2: Create HTML list
const htmlList = studentNames
    .map(name => `<li>${name}</li>`)
    .join(os.EOL);
console.log("HTML student list:");
console.log("<ul>");
console.log(htmlList);
console.log("</ul>");

// Example 3: Build file paths
const pathParts = ["data", "students", "grades", "2024.json"];
const fullPath = pathParts.join(path.sep);
console.log("File path:", fullPath);

console.log();

// =====================================================
// PART 8: PRACTICAL REAL-WORLD EXAMPLES
// =====================================================

console.log("--- Part 8: Real-World Applications ---");

// Load our grades data from the previous lesson
const gradesFile = path.join(__dirname, 'data', 'grades.json');
let gradesData = null;

try {
    const jsonData = fs.readFileSync(gradesFile, 'utf8');
    gradesData = JSON.parse(jsonData);
    console.log("✅ Loaded grades data from file");
} catch (error) {
    console.log("⚠️ Could not load grades data, using sample data");
    gradesData = {
        lessons: [
            { lesson: 1, topic: "Introduction", score: 95, completed: true },
            { lesson: 2, topic: "Variables", score: 88, completed: true },
            { lesson: 3, topic: "Functions", score: 92, completed: true },
            { lesson: 4, topic: "Arrays", score: 90, completed: true },
            { lesson: 5, topic: "Objects", score: 87, completed: true }
        ]
    };
}

// Real-world example 1: Calculate statistics
const completedLessons = gradesData.lessons.filter(lesson => lesson.completed);
const scores = completedLessons.map(lesson => lesson.score).filter(score => score !== null);

const stats = {
    totalLessons: gradesData.lessons.length,
    completedLessons: completedLessons.length,
    averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length,
    highestScore: Math.max(...scores),
    lowestScore: Math.min(...scores),
    passingGrade: scores.filter(score => score >= 70).length
};

console.log("📊 Learning Statistics:");
console.log(`  Progress: ${stats.completedLessons}/${stats.totalLessons} lessons completed`);
console.log(`  Average Score: ${stats.averageScore.toFixed(1)}%`);
console.log(`  Score Range: ${stats.lowestScore}% - ${stats.highestScore}%`);
console.log(`  Passing Grades: ${stats.passingGrade}/${scores.length}`);

// Real-world example 2: Generate progress report
const progressReport = completedLessons
    .map(lesson => ({
        ...lesson,
        performance: lesson.score >= 90 ? 'Excellect' :
        lesson.score >= 80 ? 'Good' :
        lesson.score >= 70 ? 'Satisfactory' : 'Needs Improvement'
    }))
    .map(lesson => `Lesson ${lesson.lesson}: ${lesson.topic} - ${lesson.score}% (${lesson.performance})`)
    .join(os.EOL);

console.log(os.EOL + "Progress Report:");
console.log(progressReport);

console.log();

// =====================================================
// PART 9: ADVANCED ARRAY PROCESSING PATTERNS
// =====================================================

console.log("--- Part 9: Advanced Patterns ---");

// Pattern 1: Find and transform
function findTopStudentInSubject(students, subject) {
    return students
        .filter(student => student.subject === subject)
        .reduce((top, student) => 
            student.grade > (top?.grade || 0) ? student : top, null);
}

const topJSStudent = findTopStudentInSubject(students, "JavaScript");
console.log("Top JavaScript student:", topJSStudent ? `${topJSStudent.name} with ${topJSStudent.grade}%` : "None found");

// Pattern 2: Group and count 
function groupAndCount(array, keyFunction) {
    return array.reduce((groups, item) => {
        const key = keyFunction(item);
        groups[key] = (groups[key] || 0) + 1;
        return groups;
    }, {});
}

const gradeDistribution = groupAndCount(students, student => 
    student.grade >= 90 ? 'A' :
    student.grade >= 80 ? 'B' :
    student.grade >= 70 ? 'C' : 'D'
);
console.log("Grade distribution:", gradeDistribution);

// Pattern 3: Flatten and process
const allTopics = [
    ["Variables", "Functions"],
    ["Arrays", "Objects"],
    ["Loops", "Conditionals"]
];

const topicList = allTopics
    .flat() // Flatten nested arrays
    .map(topic => topic.toLowerCase())
    .filter(topic => topic.includes('a'))
    .join(', ');

console.log("Topics containing 'a':", topicList);

console.log();

// =====================================================
// PART 10: CREATING UTILITY FUNCTIONS
// =====================================================

console.log("--- Part 10: Your Array Processing Toolkit ---");

// Utility functino 1: Safe array operations
function safeArrayOperation(array, operation, defaultValue = []) {
    try {
        if (!Array.isArray(array) || array.length === 0) {
            return defaultValue;
        }
        return operation(array);
    } catch (error) {
        console.log("Array operation error:", error.message);
        return defaultValue;
    }
}

// Utility function 2: Array statistics
function getArrayStats(numbers) {
    return safeArrayOperation(numbers, arr => ({
        count: arr.length,
        sum: arr.reduce((sum, num) => sum + num, 0),
        average: arr.reduce((sum, num) => sum + num, 0) / arr.length,
        min: Math.min(...arr),
        max: Math.max(...arr),
        median: arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)]
    }), { error: "Invalid array" });
}

const numberStats = getArrayStats([1, 5, 3, 9, 2, 7, 4]);
console.log("Number statistics:", numberStats);

// Utility function 3: Data processor
function processStudentData(students, filters = {}) {
    let result = [...students]; //Create a copy

    if (filters.subject) {
        result = result.filter(s => s.subject === filters.subject);
    }

    if (filters.minGrade) {
        result = result.filter(s => s.grade >= filters.minGrade);
    }

    if (filters.maxAge) {
        result = result.filter(s => s.age <= filters.maxAge);
    }

    return result.map(student => ({
        name: student.name,
        grade: student.grade,
        performance: student.grade >= 90 ? 'Excellent' : student.grade >= 80 ? 'Good' : 'Average'
    }));
}

const filteredStudents = processStudentData(students, {
    subject: "JavaScript",
    minGrade: 85
});

console.log();

// =====================================================
// PART 11: LESSON SUMMARY
// =====================================================

console.log("--- Part 11: Array Processing Mastery Summary ---");

console.log("🎯 Array Processing Methods Mastered:");
console.log("   ✅ MAP - Transform every element into something new");
console.log("   ✅ FILTER - Select only elements that pass a test");
console.log("   ✅ REDUCE - Combine all elements into a single value");
console.log("   ✅ FOREACH - Perform actions on every element");
console.log("   ✅ JOIN - Combine array elements into strings");
console.log("   ✅ METHOD CHAINING - Combine methods for powerful operations");

console.log(os.EOL + "🔥 You can now:");
console.log("   📊 Transform data with map()");
console.log("   🔍 Filter data with complex conditions");
console.log("   📈 Calculate statistics with reduce()");
console.log("   🔗 Chain methods for powerful data processing");
console.log("   🛠️ Build reusable utility functions");
console.log("   📋 Process real-world data efficiently");

console.log(os.EOL + "💡 Key Insights:");
console.log("   • Arrays are your data processing powerhouse");
console.log("   • Method chaining creates elegant, readable code");
console.log("   • These methods don't modify original arrays (except forEach)");
console.log("   • Combine with file operations for real applications");

console.log();

// =====================================================
// LESSON 11 COMPLETE!
// =====================================================

console.log("=== LESSON 11 COMPLETE! ===");
console.log("Josh, you've unlocked the POWER of array processing!");
console.log("You can now manipulate data like a professional developer!");
console.log(os.EOL + "Next up: Promise Chains - where JavaScript gets MAGICAL! ✨");
console.log("You're becoming unstoppable! 🚀");

