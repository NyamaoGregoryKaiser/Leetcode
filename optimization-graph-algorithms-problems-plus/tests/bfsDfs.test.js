const { bfsPathExists, dfsPathExists, bfsShortestPath } = require('../src/algorithms/bfsDfs');
const { Graph } = require('../src/data-structures/Graph');
const { timeExecution } = require('../src/utils/benchmark');

function assert(condition, message) {
    if (!condition) {
        console.error(`❌ Test failed: ${message}`);
        process.exit(1);
    } else {
        console.log(`✅ Test passed: ${message}`);
    }
}

function runTests() {
    console.log("--- Running BFS/DFS Tests ---");

    // --- Graph 1: Simple Directed Graph ---
    const graph1 = new Graph(true); // Directed
    graph1.addVertex('A');
    graph1.addVertex('B');
    graph1.addVertex('C');
    graph1.addVertex('D');
    graph1.addVertex('E');
    graph1.addEdge('A', 'B');
    graph1.addEdge('A', 'C');
    graph1.addEdge('B', 'D');
    graph1.addEdge('C', 'E');
    graph1.addEdge('D', 'E');

    console.log("\nGraph 1 (Directed):");
    console.log(graph1.printGraph());

    // BFS Path Exists
    assert(bfsPathExists(graph1, 'A', 'E') === true, "BFS 1.1: Path A to E exists");
    assert(bfsPathExists(graph1, 'B', 'A') === false, "BFS 1.2: Path B to A does not exist");
    assert(bfsPathExists(graph1, 'A', 'A') === true, "BFS 1.3: Path A to A exists");
    assert(bfsPathExists(graph1, 'F', 'A') === null, "BFS 1.4: Invalid start vertex F");
    assert(bfsPathExists(graph1, 'A', 'F') === null, "BFS 1.5: Invalid end vertex F");

    // DFS Path Exists
    assert(dfsPathExists(graph1, 'A', 'E') === true, "DFS 1.1: Path A to E exists");
    assert(dfsPathExists(graph1, 'B', 'A') === false, "DFS 1.2: Path B to A does not exist");
    assert(dfsPathExists(graph1, 'A', 'A') === true, "DFS 1.3: Path A to A exists");
    assert(dfsPathExists(graph1, 'F', 'A') === null, "DFS 1.4: Invalid start vertex F");
    assert(dfsPathExists(graph1, 'A', 'F') === null, "DFS 1.5: Invalid end vertex F");

    // BFS Shortest Path (unweighted)
    assert(JSON.stringify(bfsShortestPath(graph1, 'A', 'E')) === JSON.stringify(['A', 'C', 'E']), "BFS SP 1.1: Path A to E is ['A', 'C', 'E']");
    assert(bfsShortestPath(graph1, 'B', 'A') === null, "BFS SP 1.2: No path B to A");
    assert(JSON.stringify(bfsShortestPath(graph1, 'A', 'A')) === JSON.stringify(['A']), "BFS SP 1.3: Path A to A is ['A']");
    assert(bfsShortestPath(graph1, 'F', 'A') === null, "BFS SP 1.4: Invalid start vertex F");

    // --- Graph 2: Undirected Graph with disconnected component ---
    const graph2 = new Graph(false); // Undirected
    graph2.addVertex('1');
    graph2.addVertex('2');
    graph2.addVertex('3');
    graph2.addVertex('4');
    graph2.addVertex('5');
    graph2.addEdge('1', '2');
    graph2.addEdge('1', '3');
    graph2.addEdge('2', '4');
    // Vertex '5' is isolated

    console.log("\nGraph 2 (Undirected):");
    console.log(graph2.printGraph());

    // BFS Path Exists
    assert(bfsPathExists(graph2, '1', '4') === true, "BFS 2.1: Path 1 to 4 exists");
    assert(bfsPathExists(graph2, '4', '1') === true, "BFS 2.2: Path 4 to 1 exists");
    assert(bfsPathExists(graph2, '1', '5') === false, "BFS 2.3: Path 1 to 5 does not exist (disconnected)");

    // DFS Path Exists
    assert(dfsPathExists(graph2, '1', '4') === true, "DFS 2.1: Path 1 to 4 exists");
    assert(dfsPathExists(graph2, '4', '1') === true, "DFS 2.2: Path 4 to 1 exists");
    assert(dfsPathExists(graph2, '1', '5') === false, "DFS 2.3: Path 1 to 5 does not exist (disconnected)");

    // BFS Shortest Path (unweighted)
    assert(JSON.stringify(bfsShortestPath(graph2, '1', '4')) === JSON.stringify(['1', '2', '4']), "BFS SP 2.1: Path 1 to 4 is ['1', '2', '4']");
    assert(JSON.stringify(bfsShortestPath(graph2, '4', '3')) === JSON.stringify(['4', '2', '1', '3']), "BFS SP 2.2: Path 4 to 3 is ['4', '2', '1', '3']");
    assert(bfsShortestPath(graph2, '1', '5') === null, "BFS SP 2.3: No path 1 to 5");

    // --- Graph 3: Linear Graph ---
    const graph3 = new Graph(true);
    graph3.addEdge('X', 'Y');
    graph3.addEdge('Y', 'Z');
    graph3.addEdge('Z', 'W');

    console.log("\nGraph 3 (Linear Directed):");
    console.log(graph3.printGraph());

    assert(bfsPathExists(graph3, 'X', 'W') === true, "BFS 3.1: Path X to W exists");
    assert(dfsPathExists(graph3, 'X', 'W') === true, "DFS 3.1: Path X to W exists");
    assert(JSON.stringify(bfsShortestPath(graph3, 'X', 'W')) === JSON.stringify(['X', 'Y', 'Z', 'W']), "BFS SP 3.1: Path X to W is ['X', 'Y', 'Z', 'W']");
    assert(bfsShortestPath(graph3, 'W', 'X') === null, "BFS SP 3.2: No path W to X (directed)");

    // --- Performance Benchmarking (Larger Graph) ---
    console.log("\n--- Benchmarking BFS/DFS ---");
    const largeGraph = new Graph(false); // Undirected for simplicity in benchmarking pathfinding

    const numVertices = 1000;
    const numEdges = 5000;

    for (let i = 0; i < numVertices; i++) {
        largeGraph.addVertex(i);
    }

    // Add random edges to create a somewhat dense graph
    const addedEdges = new Set();
    while (addedEdges.size < numEdges) {
        const v1 = Math.floor(Math.random() * numVertices);
        const v2 = Math.floor(Math.random() * numVertices);
        if (v1 === v2) continue;

        // Ensure unique undirected edges (pair (u,v) and (v,u) count as one)
        const edgeKey = [Math.min(v1, v2), Math.max(v1, v2)].join('-');
        if (!addedEdges.has(edgeKey)) {
            largeGraph.addEdge(v1, v2);
            addedEdges.add(edgeKey);
        }
    }

    const benchStart = 0;
    const benchEnd = numVertices - 1; // Assuming connected

    timeExecution(() => bfsPathExists(largeGraph, benchStart, benchEnd), `BFS Path Exists (${numVertices}V, ${numEdges}E)`);
    timeExecution(() => dfsPathExists(largeGraph, benchStart, benchEnd), `DFS Path Exists (${numVertices}V, ${numEdges}E)`);
    timeExecution(() => bfsShortestPath(largeGraph, benchStart, benchEnd), `BFS Shortest Path (${numVertices}V, ${numEdges}E)`);

    console.log("\nAll BFS/DFS tests completed.");
}

runTests();