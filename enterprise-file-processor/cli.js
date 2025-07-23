// Import required modules
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// JavaScript Learning Dashboard CLI
console.log(os.EOL + 'JavaScript Learning Dashboard CLI');
console.log('=============================================');

// Available commands
const commands = {
    'help': showHelp,
    'status': showStatus,
    'create': createFile,
    'read': readFile,
    'list': listFiles,
    'demo': runDemo,
    'exit': exitCLI
};

// Main CLI function
function startCLI() {
    console.log(os.EOL + 'Type "help" to see available commands');
    promptUser();
}

// Prompt user for input
function promptUser() {
    rl.question(os.EOL + 'Enter command: ', (input) => {
        processCommand(input.trim().toLowerCase());
    });
}

// Process user commands
function processCommand(command) {
    const parts = command.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    if (commands[cmd]) {
        commands[cmd](args);
    } else {
        console.log('Unknown command. Type "help" for available commands.');
        promptUser();
    }
}

// Show help menu
function showHelp() {
    console.log(os.EOL + 'Available Commands:');
    console.log('help    - Show this help menu');
    console.log('status    - Show learning progress');
    console.log('create    - Create a new JavaScript file');
    console.log('read    - Read contents of a file');
    console.log('list    - List all JavaScript files');
    console.log('demo    - Run JavaScript concept demos');
    console.log('exit    - Exit the CLI');
    promptUser();
}

// Show learning status
function showStatus() {
    console.log(os.EOL + 'Learning Progress:');
    console.log('Variable & Data Types');
    console.log('Functions & Scope');
    console.log('Async Programming (In Progress)');
    console.log('File System Operations');
    console.log('Advanced Concepts');
    promptUser();
}

// Create a new JavaScript file
function createFile(args) {
    if (args.length === 0) {
        console.log('Usage: create <filename>');
        promptUser();
        return;
    }

    const filename = args[0].endsWith('.js') ? args[0] : args[0] + '.js';
    const filepath = path.join(process.cwd(), filename);

    // Default JavaScript template
    const template = `// ${filename} - Created on ${new Date().toLocaleDateString()}
console.log('Hello from ${filename}!');

// Your JavaScript code here...

`;
    
    fs.writeFile(filepath, template, (err) => {
        if (err) {
            console.log('Error creating file:', err.message);
        } else {
            console.log(`File created: ${filename}`);
        }
        promptUser();
    });
}


// Read contents of a file
function readFile(args) {
    if (args.length === 0) {
        console.log('Usage: read <filename>');
        promptUser();
        return;
    }

    const filename = args[0].endsWith('.js') ? args[0] : args[0] + '.js';
    const filepath = path.join(process.cwd(), filename);

    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err.message);
        } else {
            console.log(os.EOL + `Contents of ${filename}:`);
            console.log('='.repeat(40));
            console.log(data);
            console.log('='.repeat(40));
        }
        promptUser();
    });
}

// List all JavaScript files in current directory
function listFiles() {
    fs.readdir(process.cwd(), (err, files) => {
        if (err) {
            console.log('Error reading directory:', err.message);
            promptUser();
            return;
        }

        const jsFiles = files.filter(file => file.endsWith('.js'));

        if (jsFiles.length === 0) {
            console.log('No JavaScript files found in current directory.');
        } else {
            console.log(os.EOL + 'JavaScript files found:');
            jsFiles.forEach((file, index) => {
                console.log(`${index + 1}. ${file}`);
            });
        }
        promptUser();
    });
}

// Run JavaScript concept demos
function runDemo() {
    console.log(os.EOL + 'JavaScript Concept Demos:');
    console.log('1. Variables and Data Types');
    console.log('2. Functions and Scope');
    console.log('3. Arrays and Objects');
    console.log('4. Async Programming');

    rl.question('Choose demo (1-4):  ', (choice) => {
        switch(choice) {
            case '1':
                demoVariables();
                break;
            case '2':
                demoFunctions();
                break;
            case '3':
                demoArraysObjects();
                break;
            case '4':
                demoAsync();
                break;
            default:
                console.log('Invalid choice.');
                promptUser();
        }
    });
}

// Demo functions
function demoVariables() {
    console.log(os.EOL + 'variables Demo:');
    console.log('let name = "JavaScript";');
    console.log('const year = 2024;');
    console.log('var isAwesome = true;');
    console.log('Result:', `name: JavaScript, year: 2024, isAwesome: true`);
    promptUser();
}

function demoFunctions() {
    console.log(os.EOL + 'Functions Demo:');
    const greet = (name) => `Hello, ${name}!`;
    console.log('const greet = (name) => `Hello, ${name}!`;');
    console.log('Result:', greet('Developer'));
    promptUser();
}

function demoArraysObjects() {
    console.log(os.EOL + 'Arrays & Objects Demo:');
    const skills = ['JavaScript', 'Node.js', 'React'];
    const developer = { name: 'Coder', level: 'Pro' };
    console.log('Array:', skills);
    console.log('Object:', developer);
    promptUser();
}

function demoAsync() {
    console.log(os.EOL + 'Async Demo:');
    console.log('setTimeout(() => console.log("Async!"), 1000);');
    setTimeout(() => {
        console.log('Async operation completed!');
        promptUser();
    }, 1000);
}

// Exit CLI
function exitCLI() {
    console.log(os.EOL + 'Thanks for using JavaScript Learning Dashboard!');
    rl.close();
    process.exit(0);
}

// Start the CLI
startCLI();




