```javascript
/**
 * benchmarkRunner.js
 *
 * This script runs performance benchmarks for the implemented graph algorithms.
 * It generates random graphs of varying sizes and measures execution times.
 */

const { PerformanceMonitor, generateRandomGrid, generateRandomGraph } = require('../src/utils/performanceUtils');
const { numberOfIslandsBFS, numberOfIslandsDFS } = require('../src/algorithms/numberOfIslands');
const { dijkstra } = require('../src/algorithms/dijkstra');
const { detectCycleInDirectedGraph } = require('../src/algorithms/detectCycleDirected');
const { topologicalSortKahn, topologicalSortDFS } = require('../src/algorithms/topologicalSort');
const Graph = require('../src/data_structures/Graph');


const monitor = new PerformanceMonitor();

console.log("=======================================");
console.log("       Graph Algorithms Benchmarks       ");
console.log("=======================================\n");

const NUM_ITERATIONS = 5; // Number of times to run each benchmark for averaging

async function runBenchmark(algorithmName, func, generateInput, inputSizes) {
    console.log(`--- Benchmarking: ${algorithmName} ---`);
    for (const size of inputSizes) {
        let totalDuration = 0;
        let successfulRuns = 0;
        const inputs = []; // Store inputs to ensure consistency across iterations if needed

        for (let i = 0; i < NUM_ITERATIONS; i++) {
            // Generate a new input for each iteration to avoid caching effects / in-place modifications
            const input = generateInput(size);
            inputs.push(input);

            try {
                const { durationMs } = monitor.measureSync(func, ...(Array.isArray(input) ? [input.map(row => [...row])] : [input])); // Deep copy for grid
                totalDuration += durationMs;
                successfulRuns++;
            } catch (e) {
                // For algorithms that might throw (e.g., topological sort on cyclic graph)
                // We'll just note it and not include in average, or handle separately.
                // For general benchmarks, assuming valid inputs.
                console.warn(`  Warning: ${algorithmName} failed for size ${size} on iteration ${i + 1}: ${e.message}`);
            }
        }

        if (successfulRuns > 0) {
            const avgDuration = totalDuration / successfulRuns;
            console.log(`  Size ${size}: Average duration over ${successfulRuns} runs: ${avgDuration.toFixed(4)} ms`);
        } else {
            console.log(`  Size ${size}: All runs failed or no successful runs to average.`);
        }
    }
    console.log("-----------------------------------\n");
}

async function main() {
    // 1. Number of Islands (Grid-based BFS/DFS)
    const gridSizes = [
        { rows: 50, cols: 50 },
        { rows: 100, cols: 100 },
        { rows: 200, cols: 200 },
        { rows: 400, cols: 400 },
        // { rows: 800, cols: 800 } // Can be slow, uncomment for thorough testing
    ];

    await runBenchmark(
        "Number of Islands (BFS)",
        numberOfIslandsBFS,
        (size) => generateRandomGrid(size.rows, size.cols, 0.7),
        gridSizes
    );

    await runBenchmark(
        "Number of Islands (DFS)",
        numberOfIslandsDFS,
        (size) => generateRandomGrid(size.rows, size.cols, 0.7),
        gridSizes
    );

    // 2. Dijkstra's Algorithm (Weighted Graph)
    const graphSizesDijkstra = [
        { vertices: 100, edges: 1000 },
        { vertices: 500, edges: 5000 },
        { vertices: 1000, edges: 10000 },
        { vertices: 2000, edges: 20000 },
        // { vertices: 5000, edges: 50000 } // Can be slow
    ];

    await runBenchmark(
        "Dijkstra's Shortest Path",
        (graph) => dijkstra(graph, 'V0'), // Always start from V0
        (size) => generateRandomGraph(size.vertices, size.edges, false, 20), // Undirected, max weight 20
        graphSizesDijkstra
    );

    // 3. Detect Cycle in Directed Graph (DFS-based)
    const graphSizesCycle = [
        { vertices: 100, edges: 500, cycleProb: 0.1 }, // Low cycle probability
        { vertices: 500, edges: 2500, cycleProb: 0.1 },
        { vertices: 1000, edges: 5000, cycleProb: 0.1 },
        { vertices: 2000, edges: 10000, cycleProb: 0.1 },
    ];
    // Need a special graph generator for cycle detection to control 'cycliness'
    const generateCyclicGraph = (size) => {
        const graph = new Graph(true); // Directed
        const vertices = Array.from({ length: size.vertices }, (_, i) => `V${i}`);
        for (const v of vertices) { graph.addVertex(v); }

        let edgesAdded = 0;
        const existingEdges = new Set();
        while (edgesAdded < size.edges) {
            const srcIdx = Math.floor(Math.random() * size.vertices);
            let destIdx = Math.floor(Math.random() * size.vertices);
            while (destIdx === srcIdx && size.vertices > 1) { destIdx = Math.floor(Math.random() * size.vertices); } // Avoid self-loops for random generation if graph is big enough

            const src = vertices[srcIdx];
            const dest = vertices[destIdx];

            const edgeKey = `${src}->${dest}`;
            if (!existingEdges.has(edgeKey)) {
                graph.addEdge(src, dest, 1); // Weight doesn't matter for cycle detection
                existingEdges.add(edgeKey);
                edgesAdded++;
            }
        }
        // Introduce a cycle with some probability if needed for specific tests,
        // but generic random directed graph might naturally have them.
        return graph;
    };

    await runBenchmark(
        "Detect Cycle (Directed Graph)",
        detectCycleInDirectedGraph,
        generateCyclicGraph,
        graphSizesCycle
    );

    // 4. Topological Sort (Kahn's and DFS-based)
    const graphSizesTopo = [
        { vertices: 100, edges: 500 },
        { vertices: 500, edges: 2500 },
        { vertices: 1000, edges: 5000 },
        { vertices: 2000, edges: 10000 },
    ];
    // Generate DAGs for topological sort. Simplest way is to only add edges i -> j where i < j.
    const generateDAG = (size) => {
        const graph = new Graph(true);
        const vertices = Array.from({ length: size.vertices }, (_, i) => `V${i}`);
        for (const v of vertices) { graph.addVertex(v); }

        let edgesAdded = 0;
        const existingEdges = new Set();
        while (edgesAdded < size.edges) {
            const srcIdx = Math.floor(Math.random() * size.vertices);
            let destIdx = Math.floor(Math.random() * size.vertices);

            // Ensure source index is less than destination index to guarantee a DAG
            if (srcIdx >= destIdx) { continue; } // Skip if not satisfying DAG property

            const src = vertices[srcIdx];
            const dest = vertices[destIdx];

            const edgeKey = `${src}->${dest}`;
            if (!existingEdges.has(edgeKey)) {
                graph.addEdge(src, dest, 1);
                existingEdges.add(edgeKey);
                edgesAdded++;
            }
        }
        return graph;
    };

    await runBenchmark(
        "Topological Sort (Kahn's BFS)",
        topologicalSortKahn,
        generateDAG,
        graphSizesTopo
    );

    await runBenchmark(
        "Topological Sort (DFS)",
        topologicalSortDFS,
        generateDAG,
        graphSizesTopo
    );

    console.log("=======================================");
    console.log("      Benchmarks Completed       ");
    console.log("=======================================\n");
}

main();
```