// ==========================================
// ENTERPRISE DASHBOARD - FRONTEND JAVASCRIPT
// Showcasing JavaScript Pillars in Browser
// ==========================================

// ==========================================
// PILLAR 1: BASIC SYNCHRONOUS OPERATIONS
// ==========================================
const os = require('os');

class DashboardManager {
    constructor() {
        this.startTime = Date.now();
        this.refreshInterval = null;
        this.init();
    }

    init() {
        console.log('Dashboard Manager Initialized');
        this.startLiveUpdates();
        this.bindEvents();
    }

    // ==========================================
    // PILLAR 2: ARRAY PROCESSING
    // ==========================================
    formatSystemFeatures(features) {
        return features
            .map((feature, index) => `${index + 1}. ${feature}`)
            .join(os.EOL);
    }

    processLiveStats(data) {
        const stats = Object.entries(data)
            .filter(([key, value]) => typeof value === 'number')
            .map(([key, value]) => ({ name: key, value: value.toFixed(2) }));
        return stats;
    }
}

// ==========================================
// PILLAR 3: PROMISE CHAIN (async/await)
// ==========================================

async function refreshStats() {
    try {
        console.log('Refreshing stats...');

        // Chain multiple API calls
        const systemData = await fetchSystemData();
        const processedStats = await processStatsData(systemData);
        const updatedUI = await updateDashboardUI(processedStats);

        showNotification('Stats refreshed successfully!', 'success');
        return updatedUI;
    } catch (error) {
        console.error('Error refreshing stats:', error);
        showNotification('Failed to refresh stats', 'error');
        throw error;
    }
}

async function fetchSystemData() {
    const response = await fetch('/api/system');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function processStatsData(data) {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        uptime: formatUptime(data.uptime),
        features: data.features.length,
        technologies: data.technologies.join(' • '),
        timestamp: new Date(data.timestamp).toLocaleString(),
        status: data.status.toUpperCase()
    };
}

async function updateDashboardUI(stats) {
    const uptimeElement = document.getElementById('uptime');
    if (uptimeElement) {
        uptimeElement.textContent = stats.uptime;
        uptimeElement.classList.add('updated');

        // Remove animation class after animation
        setTimeout(() => uptimeElement.classList.remove('updated'), 1000);
    }

    return stats;
}

// ==========================================
// PILLAR 4: FUNCTIONAL PROGRAMMING
// ==========================================
const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
};

const compose = (...functions) => (data) => 
    functions.reduceRight((acc, fn) => fn(acc), data);

const pipe = (...functions) => (data) => 
    functions.reduce((acc, fn) => fn(acc), data);

// Pure function for calculating stats
const calculatePerformanceScore = (uptime, features, technologies) => {
    const uptimeScore = Math.min(uptime / 86400, 1) * 40; // Max 40 points for 24h uptime
    const featureScore = Math.min(features * 10, 30); // Max 30 points
    const techScore = Math.min(technologies * 5, 30); // Max 30 points
    return Math.round(uptimeScore + featureScore + techScore);
};

// ==========================================
// PILLAR 5: HIGHER-ORDER FUNCTIONS
// ==========================================
const createAPITester = (endpoint) => async (options = {}) => {
    const startTime = performance.now();

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            ...options
        });

        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);

        return {
            success: response.ok,
            status: response.status,
            responseTime,
            data: await response.json()
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            responseTime: performance.now() - startTime
        };

    }
};

// ==========================================
// PILLAR 6: ADVANCED ASYNC (Generators)
// ==========================================

function* notificationGenerator() {
    const notifications = [
        'System running smoothly',
        'Processing data...',
        'All systems operational',
        'Auto-refresh active',
        'Performance optimized'
    ];

    let index = 0;
    while (true) {
        yield notifications[index % notifications.length];
        index++;
    }
}

const notificationIterator = notificationGenerator();

// ==========================================
// PILLAR 7: CALLBACK PATTERN
// ==========================================

function executeWithCallback(operation, callback) {
    setTimeout(() => {
        try {
            const result = operation();
            callback(null, result);
        } catch (error) {
            callback(error, null);
        }
    }, 100);
}

// ==========================================
// PILLAR 8: PROMISE UTILITIES
// ==========================================

async function testAPI() {
    console.log('Testing API endpoints...');

    const apiTests = [
        createAPITester('/api/system'),
        createAPITester('/api/health'),
        createAPITester('/api/stats')
    ];

    try {
        // Test all APIs concurrently
        const results = await Promise.allSettled(
            apiTests.map(test => test())
        );

        const summary = results.map((result, index) => ({
            endpoint: ['system', 'health', 'stats'][index],
            status: result.status,
            success: result.status === 'fulfilled' ? result.value.success : false,
            responseTime: result.status === 'fulfilled' ? result.value.responseTime : 'N/A'

        }));

        displayAPIResults(summary);

    } catch (error) {
        console.error('API Test failed:', error);
        showNotification('API tests failed', 'error');

    }
}

// ==========================================
// PILLAR 9: EVENT HANDLING & DOM
// ==========================================

function bindEvents() {
    // Modern event delegation 
    document.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches('.btn-primary')) {
            handlePrimaryAction(target);
        }

        if (target.matches('.btn-secondary')) {
            handleSecondaryAction(target);
        }

        if (target.matches('.stat-card')) {
            animateCard(target);
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'r') {
            event.preventDefault();
            refreshStats();
        }

        if (event.ctrlKey && event.key === 't') {
            event.preventDefault();
            testAPI();
        }
    });
}

function handlePrimaryAction(button) {
    button.textContent = 'Refreshing...';
    button.disabled = true;

    refreshStats().finally(() => {
        button.textContent = 'Refresh Stats';
        button.disabled = false;
    });
}

function handleSecondaryAction(button) {
    button.textContent = 'Testing...';
    button.disabled = true;

    testAPI().finally(() => {
        button.textContent = 'Test API';
        button.disabled = false;
    });
}

// ==========================================
// PILLAR 10: MODERN ES6+ FEATURES
// ==========================================
const { log, error, warn } = console;

// Destructuring and spread 
const updateStats = ({ uptime, features, ...rest }) => ({
    uptime: formatUptime(uptime),
    features: features.length,
    performance: calculatePerformanceScore(uptime, features.length, rest.technologies?.length || 0),
    ...rest
});

// Template literals and arrow functions
const createNotificationHTML = (message, type = 'info') => `
    <div class="notification notification-${type}">
        <span class="notification-icon">${getNotificationIcon(type)}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close"
onclick="this.parentElement.remove()">x</button>
    </div>
`;

const getNotificationIcon = (type) => {
    const icons = new Map([
        ['success', '✅'],
        ['error', '❌'],
        ['warning', '⚠️'],
        ['info', 'ℹ️']
    ]);
    return icons.get(type) || 'ℹ️';
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function showNotification(message, type = 'info') {
    const container = document.querySelector('.notifications') || createNotificationContainer();
    const notification = document.createElement('div');
    notification.innerHTML = createNotificationHTML(message, type);

    container.appendChild(notification.firstElementChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.firstElementChild?.remove();
    }, 5000);
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notifications';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
    `;
    document.body.appendChild(container);
    return container;
}

function animateCard(card) {
    card.style.transform = 'scale(1.02)';
    card.style.transition = 'transform 0.2s ease';

    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 200);
}

function displayAPIResults(results) {
    const resultsHTML = results.map(result => `
        <div class="api-result ${result.success ? 'success' : 'error'}">
            <strong>${result.endpoint}</strong>:
            ${result.success ? '✅' : '❌'}
            (${result.responseTime}ms)
        </div>
    `).join('');

    showNotification(`API Test Results: ${resultsHTML}`, 'info');
}

function startLiveUpdates() {
    // Update every 30 seconds
    this.refreshInterval = setInterval(() => {
        refreshStats();

        // Show random notification
        const message = notificaitonIterator.next().value;
        showNotification(message, 'info');
    }, 30000);
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    log('Dashboard JavaScript Loaded!');

    // Initialize dashboard manager
    window.dashboardManager = new DashboardManager();

    // Bind global functions
    window.refreshStats = refreshStats;
    window.testAPI = testAPI;

    // Initial stats load
    refreshStats();

    log('All 10 JavaScript Pillars Implemented!');
    log('Keyboard shortcuts: Ctrl+R (refresh), Ctrl+T (test API)');
});

// Export for module systems
if (typeofmodule !== 'undefined' && module.exports) {
    module.exports = {
        DashboardManager,
        refreshStats,
        testAPI, 
        formatUptime,
        calculatePerformanceScore
    };
}




