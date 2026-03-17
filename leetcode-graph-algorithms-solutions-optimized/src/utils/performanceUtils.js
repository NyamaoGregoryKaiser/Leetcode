```javascript
/**
 * performanceUtils.js
 *
 * Provides utility functions for measuring code execution time.
 */

class PerformanceMonitor {
    constructor() {
        this.startTimes = new Map();
    }

    /**
     * Starts a timer for a given label.
     * @param {string} label - A unique label for the timer.
     */
    start(label) {
        if (this.startTimes.has(label)) {
            console.warn(`Warning: Timer "${label}" already started. Restarting.`);
        }
        this.startTimes.set(label, process.hrtime.bigint());
    }

    /**
     * Stops a timer and returns the elapsed time in milliseconds.
     * @param {string} label - The label of the timer to stop.
     * @returns {number | null} The elapsed time in milliseconds, or null if timer not found.
     */
    stop(label) {
        if (!this.startTimes.has(label)) {
            console.error(`Error: Timer "${label}" was not started.`);
            return null;
        }
        const endTime = process.hrtime.bigint();
        const startTime = this.startTimes.get(label);
        this.startTimes.delete(label); // Clean up
        const durationNs = endTime - startTime;
        return Number(durationNs) / 1_000_000; // Convert nanoseconds to milliseconds
    }

    /**
     * Measures the execution time of a synchronous function.
     * @param {function} func - The function to measure.
     * @param {Array<any>} args - Arguments to pass to the function.
     * @returns {{result: any, durationMs: number}} An object containing the function's return value and its execution duration.
     */
    measureSync(func, ...args) {
        const label = `func_${func.name || 'anonymous'}_${Date.now()}`;
        this.start(label);
        const result = func(...args);
        const durationMs = this.stop(label);
        return { result, durationMs };
    }

    /**
     * Measures the execution time of an asynchronous function.
     * @param {function} func - The async function to measure.
     * @param {Array<any>} args - Arguments to pass to the function.
     * @returns {Promise<{result: any, durationMs: number}>} A promise that resolves to an object
     *          containing the function's return value and its execution duration.
     */
    async measureAsync(func, ...args) {
        const label = `func_${func.name || 'anonymous'}_${Date.now()}`;
        this.start(label);
        const result = await func(...args);
        const durationMs = this.stop(label);
        return { result, durationMs };
    }

    /**
     * Runs a function multiple times and calculates average execution time.
     * @param {function} func - The function to benchmark.
     * @param {Array<any>} args - Arguments for the function.
     * @param {number} iterations - Number of times to run the function.
     * @returns {{avgDurationMs: number, results: Array<any>}} Average duration and all results.
     */
    benchmarkFunction(func, args, iterations = 100) {
        let totalDuration = 0;
        const results = [];
        for (let i = 0; i < iterations; i++) {
            const { result, durationMs } = this.measureSync(func, ...args);
            totalDuration += durationMs;
            results.push(result);
        }
        return { avgDurationMs: totalDuration / iterations, results };
    }
}

// Helper to generate a random grid for Number of Islands
function generateRandomGrid(rows, cols, landProbability = 0.5) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Math.random() < landProbability ? '1' : '0');
        }
        grid.push(row);
    }
    return grid;
}

// Helper to generate a random graph (adjacency list format) for Dijkstra/Cycle Detection/Topological Sort
function generateRandomGraph(numVertices, numEdges, isDirected = false, maxWeight = 10) {
    const vertices = Array.from({ length: numVertices }, (_, i) => `V${i}`);
    const graph = new (require('../data_structures/Graph'))(isDirected);

    for (const v of vertices) {
        graph.addVertex(v);
    }

    let edgesAdded = 0;
    const existingEdges = new Set(); // To prevent duplicate edges

    while (edgesAdded < numEdges) {
        const srcIndex = Math.floor(Math.random() * numVertices);
        let destIndex = Math.floor(Math.random() * numVertices);

        // Ensure source and destination are different for non-self-looping graphs
        if (numVertices > 1) {
            while (destIndex === srcIndex) {
                destIndex = Math.floor(Math.random() * numVertices);
            }
        }


        const src = vertices[srcIndex];
        const dest = vertices[destIndex];

        let edgeKey;
        if (isDirected) {
            edgeKey = `${src}->${dest}`;
        } else {
            edgeKey = [src, dest].sort().join('--'); // Canonical representation for undirected
        }

        if (!existingEdges.has(edgeKey)) {
            const weight = Math.floor(Math.random() * maxWeight) + 1; // Weights from 1 to maxWeight
            graph.addEdge(src, dest, weight);
            existingEdges.add(edgeKey);
            edgesAdded++;
        }
    }
    return graph;
}


module.exports = {
    PerformanceMonitor,
    generateRandomGrid,
    generateRandomGraph
};
```