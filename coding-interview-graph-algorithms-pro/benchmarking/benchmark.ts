```typescript
import { Graph } from '../src/data-structures/Graph';
import { bfsShortestPath } from '../src/algorithms/bfs-shortest-path';
import { dijkstra } from '../src/algorithms/dijkstra';
import { kahnTopologicalSort } from '../src/algorithms/topological-sort-kahn';
import { detectCycleInDirectedGraphDFS } from '../src/algorithms/detect-cycle-dfs';

// Helper function to generate a random graph (directed or undirected, weighted or unweighted)
function generateRandomGraph<T extends string | number>(
    numNodes: number,
    numEdges: number,
    isDirected: boolean,
    isWeighted: boolean
): Graph<T> {
    const graph = new Graph<T>(isDirected);
    const nodes: T[] = [];

    // Add nodes
    for (let i = 0; i < numNodes; i++) {
        const node = `Node${i}` as T;
        graph.addNode(node);
        nodes.push(node);
    }

    // Add edges
    for (let i = 0; i < numEdges; i++) {
        const sourceIndex = Math.floor(Math.random() * numNodes);
        let destIndex = Math.floor(Math.random() * numNodes);

        // Ensure source and destination are different for most cases, though self-loops are allowed
        // if (sourceIndex === destIndex) {
        //     destIndex = (destIndex + 1) % numNodes; // Ensure different destination
        // }

        const source = nodes[sourceIndex];
        const destination = nodes[destIndex];
        const weight = isWeighted ? Math.floor(Math.random() * 100) + 1 : 1; // Weights 1-100

        if (isDirected) {
            graph.addDirectedEdge(source, destination, weight);
        } else {
            // For undirected, ensure we don't add duplicate edges in opposite directions
            // Simplification: just add it, the Graph class handles distinct nodes for undirected
            // But if source and destination are the same, it would add two edges between them in adjacency list.
            // For benchmarking, this is fine.
            if (source !== destination) { // Avoid self-loops for undirected general case
                graph.addUndirectedEdge(source, destination, weight);
            }
        }
    }

    return graph;
}

// Benchmark runner function
async function runBenchmarks() {
    console.log("--- Performance Benchmarking Graph Algorithms ---");
    console.log("Note: Results may vary based on system load and hardware.");
    console.log("--------------------------------------------------");

    const testCases = [
        { V: 100, E: 500 },     // Small graph
        { V: 1000, E: 5000 },   // Medium sparse
        { V: 1000, E: 20000 },  // Medium dense
        { V: 5000, E: 20000 },  // Large sparse
        { V: 5000, E: 100000 }, // Large dense
    ];

    for (const { V, E } of testCases) {
        console.log(`\nBenchmarking V=${V}, E=${E}:`);

        // --- BFS Shortest Path (Unweighted, Undirected) ---
        const bfsGraph = generateRandomGraph<number>(V, E, false, false); // Undirected, Unweighted
        const startBFS = 0; // Assuming nodes are 0 to V-1
        const endBFS = V - 1; // Last node
        if (!bfsGraph.hasNode(startBFS) || !bfsGraph.hasNode(endBFS)) {
             bfsGraph.addNode(startBFS);
             bfsGraph.addNode(endBFS);
        }

        console.time(`  BFS Shortest Path (undirected, unweighted)`);
        for (let i = 0; i < 5; i++) { // Run multiple times for consistency
            bfsShortestPath(bfsGraph, startBFS, endBFS);
        }
        console.timeEnd(`  BFS Shortest Path (undirected, unweighted)`);

        // --- Dijkstra's Algorithm (Weighted, Directed) ---
        const dijkstraGraph = generateRandomGraph<number>(V, E, true, true); // Directed, Weighted
        const startDijkstra = 0;
        if (!dijkstraGraph.hasNode(startDijkstra)) {
            dijkstraGraph.addNode(startDijkstra);
        }

        console.time(`  Dijkstra's Algorithm (directed, weighted)`);
        for (let i = 0; i < 5; i++) {
            dijkstra(dijkstraGraph, startDijkstra);
        }
        console.timeEnd(`  Dijkstra's Algorithm (directed, weighted)`);

        // --- Topological Sort (Kahn's Algorithm - Directed) ---
        // For topological sort, ensure graph is a DAG or results in null if cycle is formed by random.
        const topoGraph = generateRandomGraph<number>(V, E, true, false); // Directed, Unweighted (weights don't matter)
        console.time(`  Topological Sort (Kahn's, directed)`);
        for (let i = 0; i < 5; i++) {
            kahnTopologicalSort(topoGraph);
        }
        console.timeEnd(`  Topological Sort (Kahn's, directed)`);

        // --- Detect Cycle in Directed Graph (DFS) ---
        const cycleGraph = generateRandomGraph<number>(V, E, true, false); // Directed, Unweighted
        console.time(`  Detect Cycle (DFS, directed)`);
        for (let i = 0; i < 5; i++) {
            detectCycleInDirectedGraphDFS(cycleGraph);
        }
        console.timeEnd(`  Detect Cycle (DFS, directed)`);
    }

    console.log("\n--- Benchmarking Complete ---");
}

// Generate number nodes for easier indexing in generateRandomGraph
function generateRandomGraphNodesAsNumbers(
    numNodes: number,
    numEdges: number,
    isDirected: boolean,
    isWeighted: boolean
): Graph<number> {
    const graph = new Graph<number>(isDirected);
    for (let i = 0; i < numNodes; i++) {
        graph.addNode(i);
    }

    for (let i = 0; i < numEdges; i++) {
        const source = Math.floor(Math.random() * numNodes);
        let destination = Math.floor(Math.random() * numNodes);

        if (source === destination && !isDirected) { // Avoid self-loops for undirected benchmark
            destination = (destination + 1) % numNodes;
        }

        const weight = isWeighted ? Math.floor(Math.random() * 100) + 1 : 1;

        if (isDirected) {
            graph.addDirectedEdge(source, destination, weight);
        } else {
            graph.addUndirectedEdge(source, destination, weight);
        }
    }
    return graph;
}


async function runBenchmarksGenericNodes() {
    console.log("\n--- Performance Benchmarking Graph Algorithms (Numeric Nodes) ---");
    console.log("Note: Using numeric node IDs for potentially better Map/Set performance.");
    console.log("------------------------------------------------------------------");

    const testCases = [
        { V: 100, E: 500 },
        { V: 1000, E: 5000 },
        { V: 1000, E: 20000 },
        { V: 5000, E: 20000 },
        { V: 5000, E: 100000 },
    ];

    for (const { V, E } of testCases) {
        console.log(`\nBenchmarking V=${V}, E=${E}:`);

        // --- BFS Shortest Path (Unweighted, Undirected) ---
        const bfsGraph = generateRandomGraphNodesAsNumbers(V, E, false, false);
        const startBFS = 0;
        const endBFS = V > 0 ? V - 1 : 0;

        console.time(`  BFS Shortest Path (undirected, unweighted)`);
        for (let i = 0; i < 5; i++) {
            bfsShortestPath(bfsGraph, startBFS, endBFS);
        }
        console.timeEnd(`  BFS Shortest Path (undirected, unweighted)`);

        // --- Dijkstra's Algorithm (Weighted, Directed) ---
        const dijkstraGraph = generateRandomGraphNodesAsNumbers(V, E, true, true);
        const startDijkstra = 0;

        console.time(`  Dijkstra's Algorithm (directed, weighted)`);
        for (let i = 0; i < 5; i++) {
            dijkstra(dijkstraGraph, startDijkstra);
        }
        console.timeEnd(`  Dijkstra's Algorithm (directed, weighted)`);

        // --- Topological Sort (Kahn's Algorithm - Directed) ---
        const topoGraph = generateRandomGraphNodesAsNumbers(V, E, true, false);
        console.time(`  Topological Sort (Kahn's, directed)`);
        for (let i = 0; i < 5; i++) {
            kahnTopologicalSort(topoGraph);
        }
        console.timeEnd(`  Topological Sort (Kahn's, directed)`);

        // --- Detect Cycle in Directed Graph (DFS) ---
        const cycleGraph = generateRandomGraphNodesAsNumbers(V, E, true, false);
        console.time(`  Detect Cycle (DFS, directed)`);
        for (let i = 0; i < 5; i++) {
            detectCycleInDirectedGraphDFS(cycleGraph);
        }
        console.timeEnd(`  Detect Cycle (DFS, directed)`);
    }

    console.log("\n--- Benchmarking Complete ---");
}


// Choose which benchmark to run, or run both
runBenchmarksGenericNodes(); // Using number nodes for slightly better performance.
```