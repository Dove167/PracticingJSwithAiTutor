// ==========================================
// ENTERPRISE DASHBOARD - CLIENT SIDE JS
// Pillar 3: Promise Chain & Async Operations
// ==========================================

// Pillar 3: Promise Chain
async function refreshStats() {
    try {
        console.log('Refreshing stats...');

        const response = await fetch('/api/system');
        const data = await response.json();

        // Update uptime
        document.getElementById('uptime').textContent = `${Math.floor(data.uptime)} seconds`;

        console.log('Stats refreshed:', data);

        // Show success feedback
        showNotification('Stats refreshed successfully!', 'success');
    } catch (error) {
        console.error('Error refreshing stats:', error);
        showNotification('Failed to refresh stats', 'error');
    }
}

// Pillar 3: Promise utilities 
async function testAPI() {
    const startTime = performance.now();

    try {
        const [systemInfo, healthCheck] = await Promise.all([
            fetch('/api/system').then(r => r.json()),
            new Promise(resolve => setTimeout(() => resolve({status: 'ok'}), 100))
        ]);

        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);

        console.log('API Test: Results:');
        console.log('System Info:', systemInfo);
        console.log('Health Check:', healthCheck);
        console.log(`Response Time: ${responseTime}ms`);

        showNotification(`API test completed in ${responseTime}ms`, 'success');
    } catch (error) {
        console.error('API test failed:', error);
        showNotification('API test failed', 'error');
    }
}

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        backgroundL ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff' };
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);



}

// Auto-refresh stats every 10 seconds 
setInterval(refreshStats, 10000);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Enterprise Dashboard Loaded!');
    refreshStats();
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translate(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

