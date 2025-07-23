// ==========================================
// ENTERPRISE FILE PROCESSOR - MAIN SERVER
// Showcasing 10 JavaScript Pillars
// ==========================================

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const os = require('os');


const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// PILLAR 1: BASIC SYNCHRONOUS OPERATIONS
// ==========================================

function createWelcomeMessage(username = 'Guest') {
    const timestamp = new Date().toISOString();
    return `Welcome ${username}! Server started at ${timestamp}`;
}

// ==========================================
// MIDDLEWARE SETUP
// ==========================================

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// ==========================================
// PILLAR 2: ARRAY PROCESSING
// ==========================================

const systemStats = {
    features: ['CLI Interface', 'Web Dashboard', 'File Processing', 'Real-time Updates'],
    technologies: ['Node.js', 'Express', 'EJS', 'Socket.io'],

    getFeatureList() {
        return this.features.map((feature, index) => `${index + 1}. ${feature}`).join(os.EOL);
    },

    getTechStack() {
        return this.technologies.join(' • ');
    }
};

// ==========================================
// ROUTES
// ==========================================

// Home route
app.get('/', (req, res) => {
    const welcomeMsg = createWelcomeMessage('Josh');

    res.render('dashboard', {
        title: 'Enterprise File Processor',
        welcome: welcomeMsg,
        features: systemStats.getFeatureList(),
        techStack: systemStats.getTechStack(),
        layout: 'layouts/main'
    });
});

// API route for system info
app.get('/api/system', (req, res) => {
    res.json({
        status: 'running',
        uptime: process.uptime(),
        features: systemStats.features,
        technologies: systemStats.technologies,
        timestamp: new Date().toISOString()
    });
});

// ==========================================
// SERVER STARTUP
// ==========================================

app.listen(PORT, () => {
    console.log('ENTERPRISE FILE PROCESSOR STARTED!');
    console.log('=======================================');
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Features: ${systemStats.features.length} modules loaded`);
    console.log(`Tech Stack: ${systemStats.getTechStack()}`);
    console.log('======================================');
});

module.exports = app;

