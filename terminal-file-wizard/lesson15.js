#!/user/bin/env node
/**
 * TERMINAL FILE WIZARD
 * The Grand Synthesis of ALl 10 JavaScript Pillars
 * Lesson 15
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const os = require('os');

class TerminalFileWizard {
    constructor() {
        this.commands = new Map();
        this.startTime = performance.now();
        this.setupCommands();
    }

    // PILLAR 1: Basic Synchronous Operations
    showWelcome() {
        const banner = `
╔═══════════════════════════════════════════╗
║        🧙‍♂️ TERMINAL FILE WIZARD 🧙‍♂️        ║
║     The Grand JavaScript Synthesis        ║
╚═══════════════════════════════════════════╝

🏛️ Available Commands:
   analyze   - File analysis & statistics
   transform - Data transformation magic
   batch     - Async file operations  
   stream    - Large file processing
   api       - JSON data manipulation
   backup    - Advanced async patterns
   monitor   - Real-time file watching

Usage: node lesson15.js <command> [options]
Example: node lesson15.js analyze ./data --recursive
        `;
    console.log(banner);
    }

    // Command Setup
    setupCommands() {
        this.commands.set('analyze', this.analyze.bind(this));
        this.commands.set('transform', this.transform.bind(this));
       this.commands.set('batch', async (options) => {
    console.log('Executing: BATCH');
    console.log(`Start time: ${new Date().toLocaleTimeString()}`);
    console.log('BATCH PROCESSING FILES...');

    const { directory = './test-files' } = this.parseOptions(options);

    try {
        const files = fs.readdirSync(directory);
        const operations = [];

        // Process multiple files concurrently using Promise.all
        for (const file of files) {
            const filePath = path.join(directory, file);
            if (fs.statSync(filePath).isFile()) {
                operations.push(this.processFileAsync(filePath));
            }
        }

        console.log(`Processing ${operations.length} files concurrently...`);
        const results = await Promise.all(operations);

        console.log(`\nBatch Results:`);
        console.log(`Files processed: ${results.length}`);
        console.log(`Average processing time: ${(results.reduce((sum, r) => sum + r.time, 0) / results.length).toFixed(3)}ms`);
        console.log(`Total size processed: ${results.reduce((sum, r) => sum + r.size, 0)} bytes`);

        // Save batch results
        const batchReport = {
            timestamp: new Date().toISOString(),
            directory: directory,
            filesProcessed: results.length,
            totalSize: results.reduce((sum, r) => sum + r.size, 0),
            results: results.map(r => ({
                file: r.file,
                size: r.size,
                type: r.type,
                processingTime: r.time
            }))
        };

        fs.writeFileSync('output/batch-report.json', JSON.stringify(batchReport, null, 2));
        console.log('\n📄 Batch report saved to: output/batch-report.json');

    } catch (error) {
        console.error('❌ Batch processing error:', error.message);
    }

    console.log(`\nCommand completed in ${((performance.now() - this.startTime) / 1000).toFixed(3)}s`);
});

        this.commands.set('stream', this.stream.bind(this));
        this.commands.set('api', this.api.bind(this));
        this.commands.set('backup', this.backup.bind(this));
        this.commands.set('monitor', this.monitor.bind(this));
        this.commands.set('help', this.showWelcome.bind(this));
    }

    // Main Execution Engine
    async execute(args) {
        if (args.length === 0) {
            this.showWelcome();
            return;
        }

        const [command, ...options] = args;

        // Don't show welcome for actual commands
        if (command ==='help') {
            this.showWelcome();
            return;
        }

        const handler = this.commands.get(command);

        if (!handler) {
            console.log(`Unknown command: ${command}`);
            console.log(`Try: node lesson15.js help`);
            return;
        }

        try {
            console.log(os.EOL + `Executing: ${command.toUpperCase()}`);
            console.log(`Start time: ${new Date().toLocaleTimeString()}`);

            await handler(options);

            const endTime = performance.now();
            const duration = ((endTime - this.startTime) / 1000).toFixed(3);
            console.log(os.EOL + `Command completed in ${duration}s`);


        } catch (error) {
            console.error(`Error executing ${command}:`, error.message);
        }
    }

    // COMMAND 1: ANALYZE (Pillars 1, 4, 10)
    async analyze(options) {
        console.log(`ANALYZING FILES...`);

        // Parse options (Pillar 10: Modern ES6+ destrcturing)
        const { directory = './data', recursive = false, output = null } = this.parseOptions(options);

        // Pillar 4: File System Operations
        if (!fs.existsSync(directory)) {
            throw new Error(`Directory not found: ${directory}`);
        }

        // Pillar 1: Synchronous string operations
        const stats = {
            totalFiles: 0, 
            totalSize: 0,
            fileTypes: new Map(),
            largestFile: { name: '', size: 0 },
            oldestFile: { name: '', date: new Date() },
            newestFile: { name: '', date: new Date(0) }
        };

        // Pillar 2: Array processing with forEach
        const files = this.getFiles(directory, recursive);
        files.forEach(filePath => {
            const fileStats = fs.statSync(filePath);
            const ext = path.extname(filePath).toLowerCase() || 'no-extension';

            // Update statistics
            stats.totalFiles++;
            stats.totalSize += fileStats.size;

            //Track file types
            stats.fileTypes.set(ext, (stats.fileTypes.get(ext) || 0) + 1);

            // Find largest file
            if (fileStats.size > stats.largestFile.size) {
                stats.largestFile = { name: filePath, size: fileStats.size};
            }

            // Track oldest/newest
            if (fileStats.mtime < stats.oldestFile.date) {
                stats.oldestFile = { name: filePath, date: fileStats.mtime};
            }
            if (fileStats.mtime > stats.newestFile.date) {
                stats.newestFile = { name: filePath, date: fileStats.mtime};
            }


        });

        // Display results 
        this.displayAnalysisResults(stats);

        // Save to file if requested
        if (output) {
            await this.saveAnalysisResults(stats, output);
        }
    }

    // COMMAND 2: TRANSFORM (PIllats 2, 5, 9)
    async transform(options) {
        console.log(`TRANSFORMING DATA...`);

        const [inputFile, ...transformOptions] = options;

        if (!inputFile || !fs.existsSync(inputFile)) {
            throw new Error(`Input file not found: ${inputFile}`);
        }

        // Read file content
        const content = fs.readFileSync(inputFile, 'utf8');

        // Pillar 2: Array processing - split into lines
        const lines = content.split(/\r?\n/).filter(line => line.trim());

        // Pillar 5: Functional Programming - compose transformations
        const transformations = this.parseTransformations(transformOptions);
        const transformedData = this.applyTransformations(lines, transformations);

        // Pillar 9: Higher-order functions - reduce for statistics
        const stats = transformedData.reduce((acc, line) => {
            acc.lineCount++;
            acc.charCount += line.length;
            acc.wordCount += line.split(' ').length;
            return acc;
        }, { lineCount: 0, charCount: 0, wordCount: 0 });

        console.log(`Transformation Results:`);
        console.log(`Lines processed: ${stats.lineCount}`);
        console.log(`Total characters: ${stats.charCount}`);
        console.log(`Total words: ${stats.wordCount}`);

        // Save transformed data 
        const outputFile = `output/transformed_${path.basename(inputFile)}`;
        fs.writeFileSync(outputFile, transformedData.join(os.EOL));
        console.log(`Saved to: ${outputFile}`);
    }

    // COMMAND 3: BATCH (Pillars 3, 8)
    async batch(options) {
        console.log(`BATCH PROCESSING...`);

        // PLaceholder for now - we'll implement this next
        console.log(`Coming in next part...`);
    }

    // COMMAND 4: STREAM (Pillar 6)
    async stream(options) {
        console.log(`STREAM PROCESSING...`);

        // Placeholder for now
        console.log(`Coming in next part...`);
    }

    // COMMAND 5: API (Pillar 3, 10)
    async api(options) {
        console.log(`API OPERATIONS...`);

        // Placeholder for now 
        console.log(`Coming in next part...`);
    }

    // COMMAND 6: BACKUP (Pillar 6, 7)
    async backup(options) {
        console.log(`BACKUP OPERATIONS...`);

        // Placeholder for now
        console.log(` Coming in next part...`);
    }

    // COMMAND 7: MONITOR (Pillar 6, 10)
    async monitor(options) {
        console.log(`MONITORING FILES...`);

        // PLaceholder for now
        console.log(`Coming in next part...`);
    }

    // UTILITY METHODS

    // Helper method for batch processing
async processFileAsync(filePath) {
    const startTime = performance.now();
    
    return new Promise((resolve) => {
        // Simulate async processing with random delay
        setTimeout(() => {
            const stats = fs.statSync(filePath);
            const ext = path.extname(filePath);
            
            const result = {
                file: path.basename(filePath),
                size: stats.size,
                type: ext || 'no extension',
                modified: stats.mtime,
                time: performance.now() - startTime
            };
            resolve(result);
        }, Math.random() * 50 + 10); // Random delay between 10-60ms
    });
}



    parseOptions(options) {
        const parsed = {};
        options.forEach(option => {
            if (option.startsWith('--')) {
                const [key, value] = option.substring(2).split('=');
                parsed[key] = value || true;
            } else if (!parsed.directory) {
                parsed.directory = option;
            }
        });
        return parsed;
    }

    getFiles(directory, recursive = false) {
        const files = [];
        const items = fs.readdirSync(directory);

        items.forEach(item => {
            const fullPath = path.join(directory, item);
            const stats = fs.statSync(fullPath);

            if (stats.isFile()) {
                files.push(fullPath);
            } else if (stats.isDirectory() && recursive) {
                files.push(...this.getFiles(fullPath, recursive));
            }
        });

        return files;
    }

    displayAnalysisResults(stats) {
        console.log(`Total files: ${stats.totalFiles}`);
        console.log(`Total size: ${this.formatBytes(stats.totalSize)}`);
        console.log(`Largest file: ${stats.largestFile.name}(${this.formatBytes(stats.largestFile.size)})`);

        console.log(os.EOL + `File Types:`);
        [...stats.fileTypes.entries()]
            .sort((a, b) => b[1] - a[1])
            .forEach(([ext, count]) => {
                console.log(`   ${ext}: ${count} files`);
            });
    }

    async saveAnalysisResults(stats, outputFile) {
        const results = {
            timestamp: new Date().toISOString(),
            summary: {
                totalFiles: stats.totalFiles,
                totalSize: stats.totalSize,
                totalSizeFormatted: this.formatBytes(stats.totalSize)
            },
            fileTypes: Object.fromEntries(stats.fileTypes),
            largestFile: stats.largestFile,
            oldestFile: stats.oldestFile,
            newestFile: stats.newestFile
        };

        await fs.promises.writeFile(outputFile, JSON.stringify(results, null, 2));
        console.log(`Analysis saved to: ${outputFile}`);
    }

    parseTransformations(options) {
        const transformations = [];
        options.forEach(option => {
            if (option.includes('uppercase')) transformations.push('uppercase');
            if (option.includes('lowercase')) transformations.push('lowercase');
            if (option.includes('reverse')) transformations.push('reverse');
            if (option.includes('sort')) transformations.push('sort');
        });
        return transformations;
    }

    applyTransformations(lines, transformations) {
        return transformations.reduce((data, transformation) => {
            switch (transformation) {
                case 'uppercase':
                    return data.map(line => line.toUpperCase());
                case 'lowercase':
                    return data.map(line => line.toLowerCase());
                case 'reverse':
                    return data.map(line => line.split('').reverse().join(''));
                case 'sort':
                    return [...data].sort();
                default:
                    return data;
            }
        }, lines);
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes /Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// MAIN EXECUTION
if (require.main === module) {
    const wizard = new TerminalFileWizard();
    wizard.execute(process.argv.slice(2));
}

module.exports = TerminalFileWizard;

