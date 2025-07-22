const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

console.log("=== LESSON 14: HTTP SERVERS & WEB APIs ===");
console.log("Building the Web with Node.js!");
console.log();

// ============================================
// PART 1: UNDERSTANDING HTTP BASICS
// ============================================

console.log("--- PART 1: HTTP FUNDAMENTALS ---");
console.log("HTTP = HyperText Transfer Protocol");
console.log("GET = Request data from server");
console.log("POST = Send data to server");
console.log("localhost = 127.0.0.1 = Your computer");
console.log("Port = Door number for your server");
console.log();

// ============================================
// PART 2: BASIC HTTP SERVER
// ============================================

console.log("--- PART 2: BASIC SERVER ---");

function createBasicServer() {
    const server = http.createServer((request, response) => {
        console.log(`${request.method} request to: ${request.url}`);

        // Set response headers 
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        });

        // Send response 
        response.end(`
            <h1> Hello from Node.js Server!</h1>
            <p>Method: ${request.method}</p>
            <p>URL: ${request.url}</p>
            <p>Time: ${new Date().toLocaleString()}</p>
            `);
    });

    return server;
}

// ============================================
// PART 3: ROUTING - Different Pages
// ============================================

console.log("--- PART 3: ROUTING SYSTEM ---");

function createRoutedServer() {
    const server = http.createServer((request, response) => {
        const parsedUrl = url.parse(request.url, true);
        const pathname = parsedUrl.pathname;
        const method = request.method;

        console.log(`Route: ${method} ${pathname}`);

        // Set common headers
        response.setHeader('Content-Type', 'text/html');
        response.setHeader('Access-Control-Allow-Origin', '*');

        // Route handling
        if (pathname === '/' && method === 'GET') {
            response.writeHead(200);
            response.end(`
                <h1> Welcome Home!</h1>
                <nav>
                    <a href="/about">About</a> |
                    <a href="/contact">Contact</a> |
                    <a href="/api/fruits">API</a> 
                </nav>
                <form action="/submit" method="POST">
                    <input type="text" name="message" placeholder="Enter message">
                    <button type="submit">Send</button>
                </form>
                `)
        } else if (pathname === '/about' && method === 'GET') {
            response.writeHead(200);
            response.end(`
                <h1>About Us</h1>
                <p>This is a Node.js server demo!</p>
                <a href="/">← Back Home</a>
            `);
        } else if (pathname === '/contact' && method === 'GET') {
            response.writeHead(200);
            response.end(`
                <h1>Contact</h1>
                <p>Email: josh@nodejs-master.com</p>
                <a href="/">← Back Home</a>
            `);
        } else if (pathname === '/api/fruits' && method === 'GET') {
            // JSON API endpoint
            response.setHeader('Content-Type', 'application/json');
            response.writeHead(200);
            response.end(JSON.stringify({
                fruits: ['Apple', 'Banana', 'Cherry'],
                count: 3,
                timestamp: new Date().toISOString()
            }));
        } else if (pathname === '/submit' && method === 'POST') {
            // Handle form submission
            handleFormSubmission(request, response);
        } else {
            // 404  Not Found
            response.writeHead(404);
            response.end(`
                <h1> 404 - Page Not Found</h1>
                <p>The page ${pathname} doesn't exist!</p>
                <a href="/">← Back Home</a>     
            `);
        }
    });
    return server;
}

// ============================================
// PART 4: FORM DATA PROCESSING (POST)
// ============================================

function handleFormSubmission(request, response) {
    let body = '';

    // Collect data chunks (streams!)
    request.on('data', chunk => {
        body += chunk.toString();
    });

    // Process complete data
    request.on('end', () => {
        const formData = querystring.parse(body);
        console.log('Form data received:', formData);

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(`
            <h1> Message Received!</h1>
            <p><strong>Your message:</strong> ${formData.message}</p>
            <p><strong>Received at:</strong> ${new Date().toLocaleDateString()}</p>
            <a href="/">← Send Another</a>
        `);
    });
}

// ============================================
// PART 5: STATIC FILE SERVER
// ============================================

console.log("--- PART 5: STATIC FILES ---");

// Create some static files first
const staticFiles = {
    'style.css': `
        body { font-family: Arial; background: #f0f8ff; padding: 20px; }
        h1 { color: #333; }
        .container { max-width: 800px; margin: 0 auto; }
        nav a { margin: 10px; padding: 10px; background: #007acc; color: white; text-decoration: none; }
    `,
    'script.js': `
        console.log('🎉 Client-side JavaScript loaded!');
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM ready!');
        });
    `,
    'data.json': JSON.stringify({
        message: "Hello from static JSON file!",
        data: [1, 2, 3, 4, 5],
        timestamp: new Date().toISOString()
    })
};

// Write static files
Object.entries(staticFiles).forEach(([filename, content]) => {
    fs.writeFileSync(filename, content);
    console.log(`Created: ${filename}`);
});

function createStaticServer() {
    const server = http.createServer((request, response) => {
        const parsedUrl = url.parse(request.url);
        let pathname = parsedUrl.pathname;

        // Default to index.html
        if (pathname === '/') {
            pathname = '/index.html';
        }

        // Remove leading slash
        const filename = pathname.substring(1);

        console.log(`Static request: ${filename}`);

        // Check if file exists
        if (fs.existsSync(filename)) {
            // Get MIME type
            const mimeType = getMimeType(filename);

            response.writeHead(200, {'Content-Type': mimeType});

            // Stream the file 
            const fileStream = fs.createReadStream(filename);
            fileStream.pipe(response);

        } else if (filename === 'index.html') {
            // Create dynamic index.html
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Static Server Demo</title>
                    <link rel="stylesheet" href="/style.css">
                </head>
                <body>
                    <div class="container">
                        <h1>🌟 Static File Server</h1>
                        <p>This page loads CSS and JavaScript files!</p>
                        <nav>
                            <a href="/style.css">View CSS</a>
                            <a href="/script.js">View JS</a>
                            <a href="/data.json">View JSON</a>
                        </nav>
                    </div>
                    <script src="/script.js"></script>
                </body>
                </html> 
            `);
        } else {
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(`<h1>404 - File Not Found: ${filename}</h1>`);
        }
    });

    return server;
}

// ============================================
// PART 6: MIME TYPES & STATUS CODES
// ============================================

function getMimeType(filename) {
    const ext = path.extname(filename).toLowerCase();

    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.txt': 'text/plain'
    };

    return mimeTypes[ext] || 'application/octet-stream';
}

// ============================================
// PART 7: ADVANCED API SERVER
// ============================================

console.log("--- PART 7: ADVANCED API ---");

function createApiServer() {
    // In-memory database
    let todos = [
        { id: 1, task: 'Learn Node.js', completed: false },
        { id: 2, task: 'Build HTTP server', completed: true },
        { id: 3, task: 'Master async programming', completed: false }
    ];

    const server = http.createServer((request, response) => {
        const parsedUrl = url.parse(request.url, true);
        const pathname = parsedUrl.pathname;
        const method = request.method;

        // CORS headers
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        console.log(`API: ${method} ${pathname}`);

        if (pathname === '/api/todos' && method === 'GET') {
            //GET all todos
            response.writeHead(200, {'Content-Type' : 'application/json'});
            response.end(JSON.stringify({ todos, count: todos.length }));
        } else if (pathname.startsWith('/api/todos/') && method === 'GET') {
            // GET specific todo
            const id = parseInt(pathname.split('/')[3]);
            const todo = todos.find(t => t.id === id);

            if (todo) {
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(todo));
            } else {
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({ error: 'Todo not found' }));
            }
         } else if (pathname === '/api/todos' && method === 'POST') {
            // CREATE new todo
            let body = '';
            request.on('data', chunk => body += chunk);
            request.on('end', () => {
                try {
                    const newTodo = JSON.parse(body);
                    newTodo.id = todos.length + 1;
                    newTodo.completed = false;
                    todos.push(newTodo);

                    response.writeHead(201, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify(newTodo));
                } catch (error) {
                    response.writeHead(400, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify({ error: 'Invalid JSON' }));
                }
            });
        } else {
            response.writeHead(404, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({ error: 'Endpoint not found '}));
        }
    });
    return server;
}

// ============================================
// PART 8: SERVER DEMONSTRATIONS
// ============================================

async function runServerDemos() {
    console.log("Starting server demonstrations...");
    console.log();

    // Demo 1: Basic Sever
    console.log("Basic Server (Port 3001)");
    const basicServer = createBasicServer();
    basicServer.listen(3001, () => {
        console.log("Visit: http://localhost:3001");
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo 2: Routed Server
    console.log("Routed Server (Port 3002)");
    const routedServer = createRoutedServer();
    routedServer.listen(3002, () => {
        console.log("Visit: http://localhost:3002");
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo 3: Static Server
    console.log("Static File Server (Port 3003)");
    const staticServer = createStaticServer();
    staticServer.listen(3003, () => {
        console.log("Visit: http://localhost:3003");
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    //Demo 4: API Server
    console.log("API Server (Port 3004)");
    const apiServer = createApiServer();
    apiServer.listen(3004, () => {
        console.log("Visit: http://localhost:3004/api/todos");
    });

    console.log();
    console.log("ALL SERVERS RUNNING!");
    console.log("Press Ctrl+C to stop all servers");
    console.log();
    console.log("KEY CONCEPTS DEMONSTRATED:");
    console.log("HTTP GET vs POST requests");
    console.log("Routing (different URLs)");
    console.log("Form data processing");
    console.log("Static file serving");
    console.log("MIME types & status codes");
    console.log("JSON APIs");
    console.log("CORS headers");
    console.log("Error handling");
}

// ============================================
// EXECUTION
// ============================================

console.log("LESSON 14 CONCEPTS:");
console.log("HTTP Protocol (GET/POST)");
console.log("Web Servers");
console.log("Routing");
console.log("Form Processing");
console.log("Static Files");
console.log("APIs");
console.log("Status Codes");
console.log("MIME Types");
console.log();

// Start the demo
runServerDemos().catch(console.error);