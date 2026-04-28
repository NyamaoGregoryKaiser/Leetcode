```javascript
/**
 * benchmark.js
 * Performance benchmarking script for the graph algorithms.
 * Generates random graphs of varying sizes and measures the execution time
 * of each algorithm.
 */

const {
    Graph,
    bfs,
    dijkstra,
    topologicalSort,
    detectCycleDirected,
    detectCycleUndirected
} = require('../src'); // Adjust path as needed
const {
    performance
} = require('perf_hooks');

// --- Graph Generation Helpers ---

/**
 * Generates a random graph (undirected or directed).
 * @param {number} numVertices - Number of vertices.
 * @param {number} numEdges - Number of edges.
 * @param {boolean} directed - Whether the graph is directed.
 * @returns {Graph} A new Graph instance.
 */
function generateRandomGraph(numVertices, numEdges, directed, maxWeight = 10) {
    const graph = new Graph(directed);
    const vertices = Array.from({
        length: numVertices
    }, (_, i) => `V${i}`);
    vertices.forEach(v => graph.addVertex(v));

    let edgesAdded = 0;
    const existingEdges = new Set(); // To prevent duplicate edges

    while (edgesAdded < numEdges) {
        const srcIndex = Math.floor(Math.random() * numVertices);
        const destIndex = Math.floor(Math.random() * numVertices);
        const src = vertices[srcIndex];
        const dest = vertices[destIndex];

        if (src === dest) continue; // No self-loops for general random graphs

        const edgeKey = directed ? `${src}-${dest}` : [src, dest].sort().join('-');
        if (existingEdges.has(edgeKey)) continue;

        const weight = Math.floor(Math.random() * maxWeight) + 1; // Weights from 1 to maxWeight
        graph.addEdge(src, dest, weight);
        existingEdges.add(edgeKey);
        edgesAdded++;
    }
    return graph;
}

/**
 * Generates a random Directed Acyclic Graph (DAG).
 * Ensures no cycles by only adding edges from lower-indexed vertices to higher-indexed ones.
 * @param {number} numVertices - Number of vertices.
 * @param {number} numEdges - Number of edges.
 * @returns {Graph} A new DAG instance.
 */
function generateRandomDAG(numVertices, numEdges, maxWeight = 10) {
    const graph = new Graph(true); // Must be directed
    const vertices = Array.from({
        length: numVertices
    }, (_, i) => `V${i}`);
    vertices.forEach(v => graph.addVertex(v));

    let edgesAdded = 0;
    const existingEdges = new Set();

    while (edgesAdded < numEdges) {
        const srcIndex = Math.floor(Math.random() * numVertices);
        const destIndex = Math.floor(Math.random() * numVertices);
        const src = vertices[srcIndex];
        const dest = vertices[destIndex];

        // Ensure srcIndex < destIndex to guarantee acyclicity
        if (srcIndex >= destIndex) continue;

        const edgeKey = `${src}-${dest}`;
        if (existingEdges.has(edgeKey)) continue;

        const weight = Math.floor(Math.random() * maxWeight) + 1;
        graph.addEdge(src, dest, weight);
        existingEdges.add(edgeKey);
        edgesAdded++;
    }
    return graph;
}

// --- Benchmarking Logic ---

function runBenchmark(algorithmName, algorithmFn, graphGeneratorFn, graphSizes) {
    console.log(`\n--- Benchmarking ${algorithmName} ---`);
    for (const {
            V,
            E
        } of graphSizes) {
        const graph = graphGeneratorFn(V, E);
        const startVertex = graph.getVertices()[0]; // Use the first vertex as start for BFS/Dijkstra
        const targetVertex = graph.getVertices()[Math.floor(V / 2)]; // Use a middle vertex as target

        let startTime, endTime;
        try {
            startTime = performance.now();
            if (algorithmName === 'BFS') {
                algorithmFn(graph, startVertex, targetVertex);
            } else if (algorithmName === 'Dijkstra') {
                algorithmFn(graph, startVertex); // Dijkstra finds all-paths from source
            } else if (algorithmName === 'Topological Sort') {
                algorithmFn(graph);
            } else if (algorithmName.includes('Cycle Detection')) {
                algorithmFn(graph);
            }
            endTime = performance.now();
            console.log(`  V=${V}, E=${E}: ${(endTime - startTime).toFixed(4)} ms`);
        } catch (error) {
            console.error(`  V=${V}, E=${E}: Error - ${error.message}`);
            // In case of an error in the algorithm (e.g., cycle detected for topological sort where not expected),
            // log the error and move on, don't crash the benchmark.
        }
    }
}

// --- Main Benchmark Execution ---

const graphSizes = [{
    V: 100,
    E: 500
}, {
    V: 500,
    E: 2500
}, {
    V: 1000,
    E: 5000
}, {
    V: 2000,
    E: 10000
}, {
    V: 5000,
    E: 25000
}, ]; // V=vertices, E=edges

console.log('Starting Graph Algorithms Benchmarks...');

// BFS (Unweighted, Undirected)
runBenchmark('BFS', bfs, (V, E) => generateRandomGraph(V, E, false, 1), graphSizes);

// Dijkstra's (Weighted, Undirected)
runBenchmark('Dijkstra', dijkstra, (V, E) => generateRandomGraph(V, E, false, 100), graphSizes);

// Topological Sort (Directed Acyclic Graph)
runBenchmark('Topological Sort', topologicalSort, (V, E) => generateRandomDAG(V, E, 1), graphSizes);

// Cycle Detection - Undirected
runBenchmark('Cycle Detection (Undirected)', detectCycleUndirected, (V, E) => generateRandomGraph(V, E, false), graphSizes);

// Cycle Detection - Directed (using a DAG, should report no cycle)
runBenchmark('Cycle Detection (Directed, on DAG)', detectCycleDirected, (V, E) => generateRandomDAG(V, E), graphSizes);

// Cycle Detection - Directed (using a graph *with* a cycle)
// For this, we'll create a slightly different generator to guarantee a cycle.
function generateRandomGraphWithCycle(numVertices, numEdges, maxWeight = 10) {
    const graph = generateRandomGraph(numVertices, numEdges, true, maxWeight);
    // Add a guaranteed cycle if there are at least 3 vertices
    if (numVertices >= 3) {
        const vertices = graph.getVertices();
        graph.addEdge(vertices[0], vertices[1], 1);
        graph.addEdge(vertices[1], vertices[2], 1);
        graph.addEdge(vertices[2], vertices[0], 1); // Forms a cycle V0 -> V1 -> V2 -> V0
    }
    return graph;
}
runBenchmark('Cycle Detection (Directed, with Cycle)', detectCycleDirected, generateRandomGraphWithCycle, graphSizes);


console.log('\nBenchmarks finished.');
```