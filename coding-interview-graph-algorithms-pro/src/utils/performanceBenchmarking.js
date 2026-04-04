```javascript
/**
 * src/utils/performanceBenchmarking.js
 *
 * This script provides a simple framework for benchmarking the performance
 * of the implemented graph algorithms. It generates graphs of varying sizes
 * and measures the execution time for key algorithms.
 */

const { Graph, PathFinding, Dijkstra, Prim, TopologicalSort } = require('../graphAlgorithms');

/**
 * Generates a random undirected, weighted graph.
 * @param {number} numNodes - Number of nodes in the graph.
 * @param {number} numEdges - Number of edges in the graph.
 * @param {number} maxWeight - Maximum weight for an edge.
 * @returns {Graph}
 */
function generateRandomGraph(numNodes, numEdges, maxWeight, isDirected = false) {
    const graph = new Graph();
    const nodes = Array.from({ length: numNodes }, (_, i) => `Node${i}`);
    nodes.forEach(node => graph.addNode(node));

    let edgesAdded = 0;
    while (edgesAdded < numEdges && edgesAdded < numNodes * (numNodes - 1) / (isDirected ? 1 : 2)) {
        const node1 = nodes[Math.floor(Math.random() * numNodes)];
        const node2 = nodes[Math.floor(Math.random() * numNodes)];

        if (node1 === node2) continue; // No self-loops

        const weight = Math.floor(Math.random() * maxWeight) + 1; // Weights from 1 to maxWeight

        // Check if edge already exists (or its reverse for undirected)
        if (!graph.hasEdge(node1, node2) && (!isDirected && !graph.hasEdge(node2, node1))) {
            graph.addEdge(node1, node2, weight, isDirected);
            edgesAdded++;
        }
    }
    return graph;
}

/**
 * Generates a random DAG (Directed Acyclic Graph).
 * @param {number} numNodes - Number of nodes.
 * @param {number} numEdges - Number of edges.
 * @param {number} maxWeight - Max edge weight.
 * @returns {Graph}
 */
function generateRandomDAG(numNodes, numEdges, maxWeight) {
    const graph = new Graph();
    const nodes = Array.from({ length: numNodes }, (_, i) => `Node${i}`);
    nodes.forEach(node => graph.addNode(node));

    let edgesAdded = 0;
    while (edgesAdded < numEdges) {
        // Ensure that node1's index is less than node2's index to guarantee acyclicity
        const idx1 = Math.floor(Math.random() * numNodes);
        const idx2 = Math.floor(Math.random() * numNodes);

        if (idx1 >= idx2) continue; // Ensures node1 comes before node2, preventing back-edges

        const node1 = nodes[idx1];
        const node2 = nodes[idx2];
        const weight = Math.floor(Math.random() * maxWeight) + 1;

        if (!graph.hasEdge(node1, node2)) {
            graph.addEdge(node1, node2, weight, true); // Directed edge
            edgesAdded++;
        }
    }
    return graph;
}


/**
 * Runs a benchmark for a given algorithm.
 * @param {string} algorithmName - Name of the algorithm.
 * @param {function} algorithmFn - The algorithm function to benchmark.
 * @param {Graph} graph - The graph to use for benchmarking.
 * @param {any} startNode - The starting node for the algorithm.
 * @param {any} endNode - The ending node for pathfinding algorithms (optional).
 */
function benchmarkAlgorithm(algorithmName, algorithmFn, graph, startNode, endNode = null) {
    const startTime = process.hrtime.bigint();
    try {
        if (algorithmName.includes("PathFinding")) {
            algorithmFn(graph, startNode, endNode);
        } else if (algorithmName.includes("TopologicalSort")) {
            algorithmFn(graph);
        } else {
            algorithmFn(graph, startNode);
        }
    } catch (e) {
        // Suppress errors for benchmarking purposes, e.g., disconnected graph warnings
        // console.error(`Error during benchmark of ${algorithmName}:`, e.message);
    }
    const endTime = process.hrtime.bigint();
    const durationMs = Number(endTime - startTime) / 1_000_000;
    return durationMs;
}

// --- Main Benchmarking Logic ---
console.log('--- Graph Algorithms Performance Benchmark ---');
console.log('Note: Times are in milliseconds. V=Vertices, E=Edges.');
console.log('--------------------------------------------');

const graphSizes = [
    { V: 10, E: 20 },
    { V: 50, E: 200 },
    { V: 200, E: 1000 },
    { V: 500, E: 5000 },
    { V: 1000, E: 10000 } // Larger graph, might take longer
];

const MAX_WEIGHT = 100; // Max edge weight for weighted graphs
const NUM_RUNS = 5;     // Number of runs to average for each test

for (const { V, E } of graphSizes) {
    console.log(`\nBenchmarking for V=${V}, E=${E}:`);

    // --- Undirected, Weighted Graph for Dijkstra and Prim ---
    const undirectedWeightedGraph = generateRandomGraph(V, E, MAX_WEIGHT, false);
    const startNodeUW = `Node0`; // A consistent start node for algorithms
    const endNodeUW = `Node${V - 1}`; // A consistent end node for pathfinding

    // Ensure start/end nodes exist, if V is small and E is too sparse, they might not be connected.
    if (!undirectedWeightedGraph.hasNode(startNodeUW)) undirectedWeightedGraph.addNode(startNodeUW);
    if (!undirectedWeightedGraph.hasNode(endNodeUW)) undirectedWeightedGraph.addNode(endNodeUW);


    let avgDijkstra = 0;
    let avgPrim = 0;
    let avgBFSPath = 0;
    let avgDFSPath = 0;

    for (let i = 0; i < NUM_RUNS; i++) {
        avgDijkstra += benchmarkAlgorithm('Dijkstra', Dijkstra.dijkstra, undirectedWeightedGraph, startNodeUW);
        avgPrim += benchmarkAlgorithm('Prim', Prim.prim, undirectedWeightedGraph, startNodeUW);
        avgBFSPath += benchmarkAlgorithm('PathFinding.BFS', PathFinding.findShortestPathBFS, undirectedWeightedGraph, startNodeUW, endNodeUW);
        avgDFSPath += benchmarkAlgorithm('PathFinding.DFS', PathFinding.findAnyPathDFS, undirectedWeightedGraph, startNodeUW, endNodeUW);
    }

    console.log(`  Dijkstra's (V=${V}, E=${undirectedWeightedGraph.numEdges()}): ${ (avgDijkstra / NUM_RUNS).toFixed(3) } ms`);
    console.log(`  Prim's (V=${V}, E=${undirectedWeightedGraph.numEdges()}): ${ (avgPrim / NUM_RUNS).toFixed(3) } ms`);
    console.log(`  PathFinding.BFS (V=${V}, E=${undirectedWeightedGraph.numEdges()}): ${ (avgBFSPath / NUM_RUNS).toFixed(3) } ms`);
    console.log(`  PathFinding.DFS (V=${V}, E=${undirectedWeightedGraph.numEdges()}): ${ (avgDFSPath / NUM_RUNS).toFixed(3) } ms`);


    // --- Directed Acyclic Graph for Topological Sort ---
    const dagGraph = generateRandomDAG(V, E, MAX_WEIGHT);
    let avgTopoSort = 0;
    for (let i = 0; i < NUM_RUNS; i++) {
        avgTopoSort += benchmarkAlgorithm('TopologicalSort', TopologicalSort.topologicalSort, dagGraph);
    }
    console.log(`  Topological Sort (V=${V}, E=${dagGraph.numEdges()}): ${ (avgTopoSort / NUM_RUNS).toFixed(3) } ms`);
}

console.log('\n--- Benchmarking Complete ---');
```
---