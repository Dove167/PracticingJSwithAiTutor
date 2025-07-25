// ==========================================
// ENTERPRISE FILE PROCESSOR - MAIN SERVER
// Showcasing 10 JavaScript Pillars
// ==========================================

require('dotenv').config({ path: '.env.local' });
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const os = require('os');
// Authentication & Convex setup
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { ConvexHttpClient } = require('convex/browser');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// PILLAR 1: BASIC SYNCHRONOUS OPERATIONS
// ==========================================

function createWelcomeMessage(username = 'Guest') {
    const timestamp = new Date().toISOString();
    return `Welcome ${username}! Server started at ${timestamp}`;
}

// Cookie parsing and session setup
app.use(cookieParser());
app.use(session({
  store: new SQLiteStore({ db: 'sessions.sqlite' }),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}));
// Initialize Convex client
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

// Expose session user to views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// MIDDLEWARE SETUP - ensure body parsing before routes
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);

// Mount authentication routes
const authModule = require('./routes/auth');
const { requireAuth } = authModule;
app.use(authModule);
// ==========================================
// MIDDLEWARE SETUP
// ==========================================

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
app.get('/', requireAuth, (req, res) => {
    const welcomeMsg = createWelcomeMessage('Josh');

    res.render('dashboard', {
        title: 'Enterprise File Processor',
        welcome: welcomeMsg,
        features: systemStats.getFeatureList(),
        techStack: systemStats.getTechStack(),
        layout: 'layouts/main'
    });
});

// ✅ FIXED API ROUTES
app.get('/api/system', (req, res) => {
    res.json({
        uptime: process.uptime(),
        features: systemStats.features,
        technologies: systemStats.technologies,
        timestamp: new Date().toISOString(),
        status: 'running'
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
    });
});

app.get('/api/stats', (req, res) => {
    res.json({
        requests: Math.floor(Math.random() * 1000),
        activeUsers: Math.floor(Math.random() * 50),
        responseTime: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString() 
    });
});

// ==========================================
// SERVER STARTUP
// ==========================================

app.listen(PORT, () => {
    console.log('🚀 ENTERPRISE FILE PROCESSOR STARTED!');
    console.log('=======================================');
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Features: ${systemStats.features.length} modules loaded`);
    console.log(`Tech Stack: ${systemStats.getTechStack()}`);
    console.log('======================================');
});

module.exports = app;
