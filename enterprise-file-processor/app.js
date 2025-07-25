// ==========================================
// ENTERPRISE FILE PROCESSOR - MAIN SERVER
// Showcasing 10 JavaScript Pillars
// ==========================================

require('dotenv').config({ path: '.env.local' });
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const os = require('os');
const fs = require('fs');

// Authentication & Convex setup
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { ConvexHttpClient } = require('convex/browser');

// Socket.io setup
const { Server } = require('socket.io');
const http = require('http');

// Logger setup
const logger = require('./utils/logger');

// ==========================================
// APP INITIALIZATION (FIXED ORDER)
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

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

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

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

// Body parsing and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    logger.info('Created uploads directory');
}

// ==========================================
// ROUTE MOUNTING
// ==========================================

// Mount authentication routes
const authModule = require('./routes/auth');
const { requireAuth } = authModule;
app.use(authModule);

// Mount upload routes
const uploadRoutes = require('./routes/upload');
app.use(uploadRoutes);

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
// SOCKET.IO REAL-TIME FEATURES
// ==========================================
const connectedUsers = new Map();

io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);
    connectedUsers.set(socket.id, {
        connectedAt: new Date(),
        lastActivity: new Date()
    });

    // Send initial stats
    socket.emit('stats-update', {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        connectedUsers: connectedUsers.size,
        timestamp: new Date().toISOString()
    });

    // Send real-time stats every 5 seconds
    const statsInterval = setInterval(() => {
        socket.emit('stats-update', {
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            connectedUsers: connectedUsers.size,
            timestamp: new Date().toISOString()
        });
    }, 5000);

    // Handle file upload progress
    socket.on('upload-progress', (data) => {
        socket.broadcast.emit('file-upload-update', {
            filename: data.filename,
            progress: data.progress,
            user: data.user
        });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        logger.info(`User disconnected: ${socket.id}`);
        connectedUsers.delete(socket.id);
        clearInterval(statsInterval);
    });
});

// ==========================================
// MAIN ROUTES
// ==========================================

// Home route
app.get('/', requireAuth, (req, res) => {
    const welcomeMsg = createWelcomeMessage(req.session.user?.name || 'User');

    res.render('dashboard', {
        title: 'Enterprise File Processor',
        welcome: welcomeMsg,
        features: systemStats.getFeatureList(),
        techStack: systemStats.getTechStack(),
        layout: 'layouts/main'
    });
});

// ==========================================
// API ROUTES
// ==========================================

app.get('/api/system', (req, res) => {
    const systemInfo = {
        uptime: process.uptime(),
        features: systemStats.features,
        technologies: systemStats.technologies,
        timestamp: new Date().toISOString(),
        status: 'running',
        connectedUsers: connectedUsers.size,
        memory: process.memoryUsage(),
        version: process.version
    };

    logger.info('System info requested', { endpoint: '/api/system' });
    res.json(systemInfo);
});

app.get('/api/health', (req, res) => {
    const healthInfo = {
        status: 'healthy',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString(),
        connectedUsers: connectedUsers.size,
        diskSpace: getDiskSpace()
    };

    res.json(healthInfo);
});

app.get('/api/stats', (req, res) => {
    const stats = {
        requests: Math.floor(Math.random() * 1000),
        activeUsers: connectedUsers.size,
        responseTime: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString(),
        systemLoad: os.loadavg(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem()
    };

    res.json(stats);
});

// Files API - list uploaded files
app.get('/api/files', requireAuth, (req, res) => {
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            logger.error('Error reading uploads directory', { error: err.message });
            return res.status(500).json({ error: 'Unable to read files' });
        }

        const fileList = files.map(filename => {
            const filepath = path.join(uploadsDir, filename);
            const stats = fs.statSync(filepath);
            return {
                name: filename,
                size: stats.size,
                created: stats.birthtime,
                modified: stats.mtime
            };
        });

        res.json({ files: fileList, count: fileList.length });
    });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function getDiskSpace() {
    try {
        const stats = fs.statSync(__dirname);
        return {
            total: 'N/A', // Would need additional package for accurate disk space
            free: 'N/A',
            used: 'N/A'
        };
    } catch (error) {
        return { error: 'Unable to get disk space' };
    }
}

// ==========================================
// ERROR HANDLING MIDDLEWARE
// ==========================================
app.use((err, req, res, next) => {
    logger.error('Unhandled error', {
        error: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method
    });

    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use((req, res) => {
    logger.warn('404 - Page not found', { url: req.url, method: req.method });
    res.status(404).json({ error: 'Page not found' });
});

// ==========================================
// SERVER STARTUP
// ==========================================
server.listen(PORT, () => {
    logger.info('🚀 ENTERPRISE FILE PROCESSOR STARTED!');
    console.log('🚀 ENTERPRISE FILE PROCESSOR STARTED!');
    console.log('=======================================');
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Features: ${systemStats.features.length} modules loaded`);
    console.log(`Tech Stack: ${systemStats.getTechStack()}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Socket.io enabled for real-time features`);
    console.log('=======================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });
});

module.exports = app;
