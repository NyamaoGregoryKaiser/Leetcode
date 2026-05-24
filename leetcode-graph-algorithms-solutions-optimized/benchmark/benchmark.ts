```typescript
import { shortestPathBinaryMatrix } from '../src/algorithms/bfs';
import { numIslands } from '../src/algorithms/dfs';
import { networkDelayTime, networkDelayTimeArrayScan } from '../src/algorithms/dijkstra';
import { minimumCost } from '../src/algorithms/kruskal';

interface BenchmarkResult {
    name: string;
    description: string;
    timeMs: number;
    memoryMb: number;
}

function runBenchmark(
    name: string,
    description: string,
    func: () => void,
    iterations: number = 1
): BenchmarkResult {
    const startMemory = process.memoryUsage().heapUsed;
    const startTime = process.hrtime.bigint();

    for (let i = 0; i < iterations; i++) {
        func();
    }

    const endTime = process.hrtime.bigint();
    const endMemory = process.memoryUsage().heapUsed;

    const timeNs = Number(endTime - startTime) / iterations;
    const timeMs = timeNs / 1_000_000;
    const memoryMb = (endMemory - startMemory) / (1024 * 1024); // Convert bytes to MB

    return { name, description, timeMs, memoryMb };
}

console.log("--- Graph Algorithms Benchmarks ---");
console.log("Running benchmarks for various graph algorithms with large inputs.");
console.log("Note: Memory usage can be noisy due to garbage collection and other process activities.");

const results: BenchmarkResult[] = [];

// --- BFS: Shortest Path in Binary Matrix ---
const largeGridSize = 500; // N x N grid
const largeGrid = Array(largeGridSize).fill(0).map(() => Array(largeGridSize).fill(0));
// Add some obstacles to make it non-trivial but still solvable
for (let i = 0; i < largeGridSize / 5; i++) {
    for (let j = 0; j < largeGridSize / 5; j++) {
        if (i % 2 === 0 && j % 2 === 0) {
            largeGrid[i * 5][j * 5 + 1] = 1; // Create small blockades
        }
    }
}
results.push(runBenchmark(
    "BFS: Shortest Path in Binary Matrix",
    `Grid ${largeGridSize}x${largeGridSize}`,
    () => shortestPathBinaryMatrix(largeGrid),
    1
));

// --- DFS: Number of Islands ---
const islandGridRows = 1000;
const islandGridCols = 1000;
const islandGrid: string[][] = Array(islandGridRows).fill(0).map(() => Array(islandGridCols).fill('0'));
// Create a few large islands and many small ones
for (let r = 0; r < islandGridRows; r++) {
    for (let c = 0; c < islandGridCols; c++) {
        if ((r % 10 === 0 && c % 10 === 0) || (r > 50 && r < 100 && c > 50 && c < 100)) {
            islandGrid[r][c] = '1'; // Sparse '1's and one block
        }
    }
}
results.push(runBenchmark(
    "DFS: Number of Islands",
    `Grid ${islandGridRows}x${islandGridCols} with scattered islands`,
    () => numIslands(JSON.parse(JSON.stringify(islandGrid))), // Deep copy to allow in-place modification
    1
));


// --- Dijkstra's: Network Delay Time ---
const numNodesDijkstra = 500;
const numEdgesDijkstra = 5000;
const dijkstraTimes: [number, number, number][] = [];
for (let i = 0; i < numEdgesDijkstra; i++) {
    const u = Math.floor(Math.random() * numNodesDijkstra) + 1;
    const v = Math.floor(Math.random() * numNodesDijkstra) + 1;
    const w = Math.floor(Math.random() * 100) + 1;
    dijkstraTimes.push([u, v, w]);
}
// Ensure node 1 is connected to at least one node if N > 1
if (numNodesDijkstra > 1 && !dijkstraTimes.some(edge => edge[0] === 1)) {
    dijkstraTimes.push([1, 2, 1]);
}

results.push(runBenchmark(
    "Dijkstra (Min-Heap)",
    `Nodes: ${numNodesDijkstra}, Edges: ${numEdgesDijkstra}`,
    () => networkDelayTime(dijkstraTimes, numNodesDijkstra, 1),
    1
));

results.push(runBenchmark(
    "Dijkstra (Array Scan - Less Optimized)",
    `Nodes: ${numNodesDijkstra}, Edges: ${numEdgesDijkstra}`,
    () => networkDelayTimeArrayScan(dijkstraTimes, numNodesDijkstra, 1),
    1
));


// --- Kruskal's: Connecting Cities With Minimum Cost ---
const numCitiesKruskal = 1000;
const numConnectionsKruskal = 10000;
const kruskalConnections: [number, number, number][] = [];
for (let i = 0; i < numConnectionsKruskal; i++) {
    let u = Math.floor(Math.random() * numCitiesKruskal) + 1;
    let v = Math.floor(Math.random() * numCitiesKruskal) + 1;
    while (u === v) { // Avoid self-loops
        v = Math.floor(Math.random() * numCitiesKruskal) + 1;
    }
    const cost = Math.floor(Math.random() * 1000) + 1;
    kruskalConnections.push([u, v, cost]);
}

results.push(runBenchmark(
    "Kruskal's Algorithm",
    `Cities: ${numCitiesKruskal}, Connections: ${numConnectionsKruskal}`,
    () => minimumCost(numCitiesKruskal, kruskalConnections),
    1
));

// Output results
console.log("\n--- Benchmark Results ---");
results.forEach(res => {
    console.log(`\nAlgorithm: ${res.name}`);
    console.log(`  Description: ${res.description}`);
    console.log(`  Time: ${res.timeMs.toFixed(3)} ms`);
    console.log(`  Memory: ${res.memoryMb.toFixed(3)} MB`);
});

console.log("\n--- Benchmark Complete ---");
```