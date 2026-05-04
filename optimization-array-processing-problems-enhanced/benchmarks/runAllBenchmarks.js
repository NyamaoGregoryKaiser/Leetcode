```javascript
/**
 * benchmarks/runAllBenchmarks.js
 *
 * This script orchestrates the running of all individual benchmark files
 * and aggregates their results.
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const benchmarkFilesDir = __dirname;
const benchmarkFiles = fs.readdirSync(benchmarkFilesDir)
    .filter(file => file.startsWith('benchmark_') && file.endsWith('.js'));

async function runBenchmark(filePath) {
    console.log(`\n--- Running benchmark: ${path.basename(filePath)} ---`);
    try {
        // Use require to load the benchmark module.
        // It's expected to export a function named `run` or similar.
        const benchmarkModule = require(filePath);
        if (typeof benchmarkModule.run === 'function') {
            await benchmarkModule.run(); // Benchmarks might be async
        } else {
            console.error(`Error: ${path.basename(filePath)} does not export a 'run' function.`);
        }
    } catch (error) {
        console.error(`Error running benchmark ${path.basename(filePath)}:`, error);
    }
}

async function runAllBenchmarks() {
    console.log("--- Starting All Benchmarks ---");
    const startTime = performance.now();

    for (const file of benchmarkFiles) {
        if (file === 'runAllBenchmarks.js') continue; // Skip itself
        await runBenchmark(path.join(benchmarkFilesDir, file));
    }

    const endTime = performance.now();
    console(`\n--- All Benchmarks Finished ---`);
    console(`Total benchmark execution time: ${(endTime - startTime).toFixed(2)} ms`);
}

if (require.main === module) {
    runAllBenchmarks();
}
```