const { dijkstra, reconstructPath } = require('../src/algorithms/dijkstra');
const { Graph } = require('../src/data-structures/Graph');
const { timeExecution } = require('../src/utils/benchmark');

function assertDeepEqual(actual, expected, message) {
    const areEqual = JSON.stringify(actual) === JSON.stringify(expected);
    if (!areEqual) {
        console.error(`❌ Test failed: ${message}`);
        console.error(`   Actual: ${JSON.stringify(actual)}`);
        console.error(`   Expected: ${JSON.stringify(expected)}`);
        process.exit(1);
    } else {
        console.log(`✅ Test passed: ${message}`);
    }
}

function runTests() {
    console.log("--- Running Dijkstra's Algorithm Tests ---");

    // --- Graph 1: Simple Weighted Directed Graph ---
    const graph1 = new Graph(true); // Directed
    graph1.addVertex('A'); graph1.addVertex('B'); graph1.addVertex('C'); graph1.addVertex('D'); graph1.addVertex('E');
    graph1.addEdge('A', 'B', 4);
    graph1.addEdge('A', 'C', 2);
    graph1.addEdge('B', 'E', 3);
    graph1.addEdge('C', 'D', 2);
    graph1.addEdge('D', 'E', 3);
    graph1.addEdge('B', 'D', 5);

    console.log("\nGraph 1 (Directed, Weighted):");
    console.log(graph1.printGraph());

    const { distances: d1, paths: p1 } = dijkstra(graph1, 'A');

    // Expected distances from A
    assertDeepEqual(d1.get('A'), 0, "Dijkstra 1.1: Distance A to A is 0");
    assertDeepEqual(d1.get('B'), 4, "Dijkstra 1.2: Distance A to B is 4");
    assertDeepEqual(d1.get('C'), 2, "Dijkstra 1.3: Distance A to C is 2");
    assertDeepEqual(d1.get('D'), 4, "Dijkstra 1.4: Distance A to D is 4 (A->C->D)");
    assertDeepEqual(d1.get('E'), 7, "Dijkstra 1.5: Distance A to E is 7 (A->C->D->E)");

    // Expected paths from A
    assertDeepEqual(reconstructPath(p1, 'A', 'E'), ['A', 'C', 'D', 'E'], "Dijkstra 1.6: Path A to E is A->C->D->E");
    assertDeepEqual(reconstructPath(p1, 'A', 'B'), ['A', 'B'], "Dijkstra 1.7: Path A to B is A->B");
    assertDeepEqual(reconstructPath(p1, 'A', 'D'), ['A', 'C', 'D'], "Dijkstra 1.8: Path A to D is A->C->D");
    assertDeepEqual(reconstructPath(p1, 'B', 'A'), null, "Dijkstra 1.9: No path B to A (directed)");

    // --- Graph 2: Undirected Weighted Graph ---
    const graph2 = new Graph(false); // Undirected
    graph2.addVertex('S'); graph2.addVertex('A'); graph2.addVertex('B'); graph2.addVertex('C'); graph2.addVertex('D'); graph2.addVertex('T');
    graph2.addEdge('S', 'A', 10);
    graph2.addEdge('S', 'C', 3);
    graph2.addEdge('A', 'B', 2);
    graph2.addEdge('B', 'T', 7);
    graph2.addEdge('C', 'A', 4);
    graph2.addEdge('C', 'D', 8);
    graph2.addEdge('D', 'T', 5);
    graph2.addEdge('D', 'B', 6);

    console.log("\nGraph 2 (Undirected, Weighted):");
    console.log(graph2.printGraph());

    const { distances: d2, paths: p2 } = dijkstra(graph2, 'S');

    // Expected distances from S
    assertDeepEqual(d2.get('S'), 0, "Dijkstra 2.1: Distance S to S is 0");
    assertDeepEqual(d2.get('A'), 7, "Dijkstra 2.2: Distance S to A is 7 (S->C->A)");
    assertDeepEqual(d2.get('B'), 9, "Dijkstra 2.3: Distance S to B is 9 (S->C->A->B)");
    assertDeepEqual(d2.get('C'), 3, "Dijkstra 2.4: Distance S to C is 3");
    assertDeepEqual(d2.get('D'), 11, "Dijkstra 2.5: Distance S to D is 11 (S->C->D)");
    assertDeepEqual(d2.get('T'), 16, "Dijkstra 2.6: Distance S to T is 16 (S->C->D->T)");

    // Expected paths from S
    assertDeepEqual(reconstructPath(p2, 'S', 'T'), ['S', 'C', 'D', 'T'], "Dijkstra 2.7: Path S to T is S->C->D->T");
    assertDeepEqual(reconstructPath(p2, 'S', 'B'), ['S', 'C', 'A', 'B'], "Dijkstra 2.8: Path S to B is S->C->A->B");

    // --- Graph 3: Graph with disconnected part ---
    const graph3 = new Graph(false);
    graph3.addEdge('X', 'Y', 1);
    graph3.addVertex('Z'); // Disconnected
    const { distances: d3, paths: p3 } = dijkstra(graph3, 'X');
    assertDeepEqual(d3.get('Z'), Infinity, "Dijkstra 3.1: Distance to disconnected Z is Infinity");
    assertDeepEqual(reconstructPath(p3, 'X', 'Z'), null, "Dijkstra 3.2: No path to disconnected Z");

    // --- Graph 4: Empty Graph ---
    const graph4 = new Graph(false);
    const { distances: d4, paths: p4 } = dijkstra(graph4, 'A') || {};
    assertDeepEqual(d4, undefined, "Dijkstra 4.1: Dijkstra returns null for invalid start vertex in empty graph.");
    assertDeepEqual(p4, undefined, "Dijkstra 4.2: Dijkstra returns null for invalid start vertex in empty graph.");


    // --- Graph 5: Single Vertex Graph ---
    const graph5 = new Graph(false);
    graph5.addVertex('Only');
    const { distances: d5, paths: p5 } = dijkstra(graph5, 'Only');
    assertDeepEqual(d5.get('Only'), 0, "Dijkstra 5.1: Distance from single vertex to itself is 0");
    assertDeepEqual(reconstructPath(p5, 'Only', 'Only'), ['Only'], "Dijkstra 5.2: Path from single vertex to itself is just the vertex");


    // --- Performance Benchmarking (Larger Graph) ---
    console.log("\n--- Benchmarking Dijkstra's ---");
    const largeGraph = new Graph(false); // Undirected, Weighted for Dijkstra

    const numVertices = 1000;
    const numEdges = 10000; // E >> V, relatively dense

    for (let i = 0; i < numVertices; i++) {
        largeGraph.addVertex(i);
    }

    // Add random edges with random weights
    const addedEdges = new Set();
    while (addedEdges.size < numEdges) {
        const v1 = Math.floor(Math.random() * numVertices);
        const v2 = Math.floor(Math.random() * numVertices);
        const weight = Math.floor(Math.random() * 100) + 1; // Weights 1-100
        if (v1 === v2) continue;

        const edgeKey = [Math.min(v1, v2), Math.max(v1, v2)].join('-');
        if (!addedEdges.has(edgeKey)) {
            largeGraph.addEdge(v1, v2, weight);
            addedEdges.add(edgeKey);
        }
    }

    const benchStart = 0;

    timeExecution(() => dijkstra(largeGraph, benchStart), `Dijkstra's Algorithm (${numVertices}V, ${numEdges}E)`);

    console.log("\nAll Dijkstra's Algorithm tests completed.");
}

runTests();