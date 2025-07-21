const fs = require('fs');
const { Transform, pipeline } = require('stream');
const os = require('os');

console.log("=== Lesson 13: ADVANCED ASYNC MASTERY ===");
console.log("Generators + Iterators + File Streams");
console.log();

// ============================================
// PART 1: GENERATORS - Functions That Pause!
// ============================================

console.log("--- PART 1: GENERATORS ---");

// Generator function - notice the *
function* fruitGenerator() {
    console.log("Starting fruit generation...");

    yield "Apple";
    console.log("Generated Apple, pausing...");

    yield "Banana";
    console.log("Generated Banana, pausing...");

    yield "Cherry";
    console.log("All fruits generated!");

    return "Generator complete!";
}

// Using the generator
const fruits = fruitGenerator();

console.log("Generator created, but not running yet!");
console.log();

console.log("Calling next() manually:");
console.log("1:", fruits.next()); // { value: 'Apple', done: false }
console.log("2:", fruits.next()); // { value: 'Banana', done: false }
console.log("3:", fruits.next()); // { value: 'Cherry', done: false }
console.log("4:", fruits.next()); // { value: 'Generator complete!', done: true }

console.log();

// ============================================
// PART 2: ITERATORS - Custom Loop Behavior
// ============================================

console.log("--- PART 2: ITERATORS ---");

// Custom iterator for counting 
function createCounter(max) {
    let current = 0;

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (current < max) {
                return { value: current++, done: false };
            } else {
                return { value: undefined, done: true };
            }
        }
    };
}

const counter = createCounter(5);

console.log("Using for...of with custome iterator:");
for (const num of counter) {
    console.log(`Count: ${num}`);
}

console.log();

// ============================================
// PART 3: ASYNC GENERATORS - The Power Combo!
// ============================================

console.log("--- PART 3: ASYNC GENERATORS ---");

async function* asyncFruitGenerator() {
    const fruits = ['🍎 Apple', '🍌 Banana', '🍒 Cherry', '🥝 Kiwi'];

    for (const fruit of fruits) {
        await new Promise(resolve => setTimeout(resolve, 500));
        yield fruit;
    }
}

async function demonstrateAsyncGenerator() {
    console.log("Generating fruits asynchronously...");

    for await (const fruit of asyncFruitGenerator()) {
        console.log(`Received: ${fruit}`);
    }

    console.log("Async generation complete!");
    console.log();
}

// ============================================
// PART 4: FILE STREAMS - Processing Big Data
// ============================================

console.log("--- PART 4: FILE STREAMS ---");

// Create a sample data file first
const sampleData = [
    "apple,red,sweet", 
    "banana,yellow,sweet",
    "cherry,red,tart",
    "date,brown,sweet",
    "eggplant,purple,savory"
].join(os.EOL);

fs.writeFileSync('fruits_data.csv', sampleData);
console.log("Created fruits_data.csv");

// Custom Transform Stream - converts to uppercase
class UppercaseTransform extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        // Transform each chunk to uppercase
        const transformed = chunk.toString().toUpperCase();
        this.push(transformed);
        callback();
    }
}

// Using streams with pipeline
function processFileWithStreams() {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream('fruits_data.csv');
        const uppercaseTransform = new UppercaseTransform();
        const writeStream = fs.createWriteStream('fruits_uppercase.csv');

        pipeline(
            readStream, 
            uppercaseTransform,
            writeStream,
            (error) => {
                if (error) {
                    console.error('Pipeline failed:', error);
                    reject(error);
                } else {
                    console.log('Pipeline succeeded!');
                    resolve();
                }
            }
        );
    });
}

// ============================================
// PART 5: COMBINING EVERYTHING - The Master Demo
// ============================================

async function* fileLineGenerator(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    const lines = data.split(os.EOL);

    for (const line of lines) {
        if (line.trim()) {
            yield line.trim();
        }
    }
}

async function masterDemo() {
    console.log("--- MASTER DEMO: COMBINING ALL CONCEPTS ---");

    // Step 1: Process file with streams 
    await processFileWithStreams();

    console.log(os.EOL + "Reading processed file with generator:");

    for await (const line of fileLineGenerator('fruits_uppercase.csv')) {
        console.log(`Line: ${line}`);

        // Parse CSV data
        const [name, color, taste] = line.split(',');
        console.log(`  ${name} is ${color} and tastes ${taste}`);
    }

    console.log(os.EOL + "MASTER DEMO COMPLETE!");
}

// ============================================
// EXECUTION SEQUENCE
// ============================================

async function runLesson13() {
    try {
        // Run async generator demo
        await demonstrateAsyncGenerator();

        // Run master demo
        await masterDemo();

        console.log(os.EOL + "LESSON 13 COMPLETE!");
        console.log("You've mastered:");
        console.log("Generators (functions that pause/resume)");
        console.log("Iterators (custom loop behavior)");
        console.log("Async Generators (async + generators)");
        console.log("File Streams (efficient file processing)");
        console.log("Transform Streams (data processing)");
        console.log("Pipeline (handling backpressure)");
    } catch (error) {
        console.error("Error in lesson:", error);
    }
}

// Start the lesson!
runLesson13();