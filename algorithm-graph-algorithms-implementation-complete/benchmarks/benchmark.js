```javascript
/**
 * benchmarks/benchmark.js
 *
 * This file contains performance benchmarking code for selected graph algorithms.
 * It compares different approaches or evaluates the performance characteristics
 * with varying input sizes.
 *
 * To run: `npm run benchmark`
 */

const {
    shortestPathUnweighted,
    hasCycleDirected,
    dijkstra,
    kruskal,
    numIslandsBFS,
    numIslandsDFS,
} = require('../src/graph-problems');
const { Graph } = require('../src/utils/dataStructures');

// --- Helper for deep copying grid ---
const deepCopyGrid = (grid) => grid.map(row => [...row]);

/**
 * Generates a random unweighted graph.
 * @param {number} numNodes - Number of nodes.
 * @param {number} numEdges - Number of edges.
 * @returns {Graph}
 */
function generateRandomUnweightedGraph(numNodes, numEdges) {
    const graph = new Graph(false); // Undirected
    const nodes = Array.from({ length: numNodes }, (_, i) => `N${i}`);
    nodes.forEach(node => graph.addNode(node));

    let edgesAdded = 0;
    const maxPossibleEdges = numNodes * (numNodes - 1) / 2;
    if (numEdges > maxPossibleEdges) {
        console.warn(`Requested ${numEdges} edges for ${numNodes} nodes, but max possible is ${maxPossibleEdges}. Capping edges.`);
        numEdges = maxPossibleEdges;
    }

    const edgeSet = new Set(); // To prevent duplicate edges in undirected graph

    while (edgesAdded < numEdges) {
        const uIdx = Math.floor(Math.random() * numNodes);
        let vIdx = Math.floor(Math.random() * numNodes);
        while (uIdx === vIdx) { // Ensure no self-loops
            vIdx = Math.floor(Math.random() * numNodes);
        }

        const u = nodes[uIdx];
        const v = nodes[vIdx];

        // Ensure unique undirected edge
        const edgeKey = u < v ? `${u}-${v}` : `${v}-${u}`;
        if (!edgeSet.has(edgeKey)) {
            graph.addEdge(u, v);
            edgeSet.add(edgeKey);
            edgesAdded++;
        }
    }
    return graph;
}

/**
 * Generates a random weighted directed graph.
 * @param {number} numNodes - Number of nodes.
 * @param {number} numEdges - Number of edges.
 * @param {number} maxWeight - Maximum edge weight.
 * @param {boolean} allowCycles - If true, cycles can be generated.
 * @returns {Graph}
 */
function generateRandomWeightedDirectedGraph(numNodes, numEdges, maxWeight = 100, allowCycles = true) {
    const graph = new Graph(true); // Directed
    const nodes = Array.from({ length: numNodes }, (_, i) => `N${i}`);
    nodes.forEach(node => graph.addNode(node));

    let edgesAdded = 0;
    const edgeSet = new Set();

    while (edgesAdded < numEdges) {
        const uIdx = Math.floor(Math.random() * numNodes);
        let vIdx = Math.floor(Math.random() * numNodes);
        
        // Prevent self-loops
        while (uIdx === vIdx) {
            vIdx = Math.floor(Math.random() * numNodes);
        }

        const u = nodes[uIdx];
        const v = nodes[vIdx];
        const weight = Math.floor(Math.random() * maxWeight) + 1; // Weights >= 1

        const edgeKey = `${u}->${v}`;
        if (!edgeSet.has(edgeKey)) {
            graph.addEdge(u, v, weight);
            edgeSet.add(edgeKey);
            edgesAdded++;
        }
    }
    return graph;
}

/**
 * Generates a random 2D binary grid for Number of Islands problem.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 * @param {number} landDensity - Probability (0 to 1) of a cell being land ('1').
 * @returns {string[][]}
 */
function generateRandomGrid(rows, cols, landDensity = 0.5) {
    const grid = [];
    for (let r = 0; r < rows; r++) {
        grid.push([]);
        for (let c = 0; c < cols; c++) {
            grid[r].push(Math.random() < landDensity ? '1' : '0');
        }
    }
    return grid;
}

console.log('--- Graph Algorithms Benchmarks ---');

// --- Benchmark for Shortest Path in Unweighted Graph (BFS) ---
function benchmarkShortestPathUnweighted() {
    console.log('\nBenchmarking Shortest Path Unweighted (BFS)...');
    const scenarios = [
        { nodes: 100, edges: 500, label: 'Small Graph' },
        { nodes: 1000, edges: 5000, label: 'Medium Graph' },
        { nodes: 5000, edges: 20000, label: 'Large Graph' },
    ];

    for (const s of scenarios) {
        const graph = generateRandomUnweightedGraph(s.nodes, s.edges);
        const startNode = `N${Math.floor(Math.random() * s.nodes)}`;
        const endNode = `N${Math.floor(Math.random() * s.nodes)}`;
        
        console.time(`${s.label} (${s.nodes} nodes, ${s.edges} edges)`);
        shortestPathUnweighted(graph, startNode, endNode);
        console.timeEnd(`${s.label} (${s.nodes} nodes, ${s.edges} edges)`);
    }
}
// benchmarkShortestPathUnweighted(); // Uncomment to run

// --- Benchmark for Cycle Detection in Directed Graph (DFS) ---
function benchmarkCycleDetectionDirected() {
    console.log('\nBenchmarking Cycle Detection Directed (DFS)...');
    const scenarios = [
        { nodes: 100, edges: 200, label: 'Small Graph' },
        { nodes: 1000, edges: 2000, label: 'Medium Graph' },
        { nodes: 5000, edges: 10000, label: 'Large Graph' },
    ];

    for (const s of scenarios) {
        // Create a graph likely to have cycles for a realistic test
        const graphWithCycles = generateRandomWeightedDirectedGraph(s.nodes, s.edges, 100, true);
        console.time(`${s.label} (with cycles) (${s.nodes} nodes, ${s.edges} edges)`);
        hasCycleDirected(graphWithCycles);
        console.timeEnd(`${s.label} (with cycles) (${s.nodes} nodes, ${s.edges} edges)`);
    }
}
// benchmarkCycleDetectionDirected(); // Uncomment to run

// --- Benchmark for Dijkstra's Algorithm ---
function benchmarkDijkstra() {
    console.log('\nBenchmarking Dijkstra\'s Algorithm...');
    const scenarios = [
        { nodes: 100, edges: 500, label: 'Small Graph' },
        { nodes: 1000, edges: 5000, label: 'Medium Graph' },
        { nodes: 5000, edges: 20000, label: 'Large Graph' },
    ];

    for (const s of scenarios) {
        const graph = generateRandomWeightedDirectedGraph(s.nodes, s.edges, 100, true);
        const startNode = `N${Math.floor(Math.random() * s.nodes)}`;

        console.time(`${s.label} (${s.nodes} nodes, ${s.edges} edges)`);
        dijkstra(graph, startNode);
        console.timeEnd(`${s.label} (${s.nodes} nodes, ${s.edges} edges)`);
    }
}
// benchmarkDijkstra(); // Uncomment to run

// --- Benchmark for Kruskal's Algorithm (MST) ---
function benchmarkKruskal() {
    console.log('\nBenchmarking Kruskal\'s Algorithm (MST)...');
    const scenarios = [
        { nodes: 100, edges: 1000, label: 'Small Graph' }, // For Kruskal, E >> V often
        { nodes: 500, edges: 5000, label: 'Medium Graph' },
        { nodes: 2000, edges: 20000, label: 'Large Graph' },
    ];

    for (const s of scenarios) {
        const graph = generateRandomWeightedDirectedGraph(s.nodes, s.edges, 100, false); // Kruskal for undirected. Using directed generator and just converting edges.
        const undirectedGraph = new Graph(false); // Make truly undirected by converting
        graph.getNodes().forEach(n => undirectedGraph.addNode(n));
        graph.getAllEdges().forEach(e => {
            // Add unique undirected edges only
            if (!undirectedGraph.getNeighbors(e.u).some(n => n.node === e.v)) {
                undirectedGraph.addEdge(e.u, e.v, e.weight);
            }
        });

        console.time(`${s.label} (${s.nodes} nodes, ${s.edges} edges)`);
        kruskal(undirectedGraph);
        console.timeEnd(`${s.label} (${s.nodes} nodes, ${s.edges} edges)`);
    }
}
// benchmarkKruskal(); // Uncomment to run

// --- Benchmark for Number of Islands (BFS vs DFS) ---
function benchmarkNumIslands() {
    console.log('\nBenchmarking Number of Islands (BFS vs DFS)...');
    const scenarios = [
        { rows: 100, cols: 100, density: 0.3, label: 'Small Grid' },
        { rows: 500, cols: 500, density: 0.3, label: 'Medium Grid' },
        { rows: 1000, cols: 1000, density: 0.3, label: 'Large Grid' },
    ];

    for (const s of scenarios) {
        const grid = generateRandomGrid(s.rows, s.cols, s.density);
        
        console.time(`${s.label} BFS (${s.rows}x${s.cols})`);
        numIslandsBFS(deepCopyGrid(grid));
        console.timeEnd(`${s.label} BFS (${s.rows}x${s.cols})`);

        console.time(`${s.label} DFS (${s.rows}x${s.cols})`);
        numIslandsDFS(deepCopyGrid(grid));
        console.timeEnd(`${s.label} DFS (${s.rows}x${s.cols})`);
    }
}
// benchmarkNumIslands(); // Uncomment to run


// --- Run all benchmarks ---
function runAllBenchmarks() {
    benchmarkShortestPathUnweighted();
    benchmarkCycleDetectionDirected();
    benchmarkDijkstra();
    benchmarkKruskal();
    benchmarkNumIslands();
}

runAllBenchmarks();
```