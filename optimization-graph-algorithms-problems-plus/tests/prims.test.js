const { prims } = require('../src/algorithms/prims');
const { Graph } = require('../src/data-structures/Graph');
const { timeExecution } = require('../src/utils/benchmark');

function assertDeepEqual(actual, expected, message) {
    // Sort edges for consistent comparison
    const sortEdges = (edges) => edges.map(edge => [
        Math.min(edge[0], edge[1]),
        Math.max(edge[0], edge[1]),
        edge[2]
    ]).sort((a, b) => {
        if (a[0] !== b[0]) return String(a[0]).localeCompare(String(b[0]));
        if (a[1] !== b[1]) return String(a[1]).localeCompare(String(b[1]));
        return a[2] - b[2];
    });

    if (Array.isArray(actual.mstEdges) && Array.isArray(expected.mstEdges)) {
        actual.mstEdges = sortEdges(actual.mstEdges);
        expected.mstEdges = sortEdges(expected.mstEdges);
    }

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

function assert(condition, message) {
    if (!condition) {
        console.error(`❌ Test failed: ${message}`);
        process.exit(1);
    } else {
        console.log(`✅ Test passed: ${message}`);
    }
}

function runTests() {
    console.log("--- Running Prim's Algorithm Tests ---");

    // --- Graph 1: Simple Weighted Undirected Graph ---
    const graph1 = new Graph(false); // Undirected
    graph1.addVertex('A'); graph1.addVertex('B'); graph1.addVertex('C'); graph1.addVertex('D'); graph1.addVertex('E'); graph1.addVertex('F');
    graph1.addEdge('A', 'B', 7);
    graph1.addEdge('A', 'C', 9);
    graph1.addEdge('A', 'F', 14);
    graph1.addEdge('B', 'C', 10);
    graph1.addEdge('B', 'D', 15);
    graph1.addEdge('C', 'D', 11);
    graph1.addEdge('C', 'F', 2);
    graph1.addEdge('D', 'E', 6);
    graph1.addEdge('E', 'F', 9);

    console.log("\nGraph 1 (Undirected, Weighted):");
    console.log(graph1.printGraph());

    const result1 = prims(graph1);
    const expected1 = {
        mstWeight: 39,
        mstEdges: [
            ['C', 'F', 2],
            ['A', 'B', 7],
            ['A', 'C', 9], // C already connected to A via 2, but Prim's might pick A-C if C-F wasn't processed yet and C-A was lowest
            // Re-evaluating expected edges from solution:
            // C-F (2)
            // A-B (7)
            // A-C (9) - if C-F is done, C connects to A.
            // A is connected to C (already 2 to F)
            // MST path usually builds from 1st vertex. If A is start:
            // (A,B,7)
            // (A,C,9)
            // From A,B,C,F:
            // (C,F,2)
            // (D,E,6)
            // (C,D,11)
            // Expected MST from known solution for this graph:
            // (C,F,2), (A,B,7), (A,C,9), (D,E,6), (C,D,11)
            // Total weight: 2 + 7 + 9 + 6 + 11 = 35. Wait, the problem graph is standard, let me calculate.
            // Start A:
            // A (0) - B (7) -- C (9) -- F (14)
            // Pick (A,B,7) -> MST: {A,B}, cost 7
            // Unvisited B,C,D,E,F. Candidates: (A,C,9), (A,F,14), (B,C,10), (B,D,15)
            // Pick (A,C,9) -> MST: {A,B,C}, cost 7+9=16
            // Unvisited D,E,F. Candidates: (A,F,14), (B,D,15), (C,D,11), (C,F,2)
            // Pick (C,F,2) -> MST: {A,B,C,F}, cost 16+2=18
            // Unvisited D,E. Candidates: (B,D,15), (C,D,11), (F,E,9)
            // Pick (F,E,9) -> MST: {A,B,C,F,E}, cost 18+9=27
            // Unvisited D. Candidates: (B,D,15), (C,D,11), (D,E,6) - D-E (6) is candidate because E is in MST.
            // Pick (D,E,6) -> MST: {A,B,C,F,E,D}, cost 27+6=33
            // MST weight 33. Edges: (A,B,7), (A,C,9), (C,F,2), (F,E,9), (D,E,6).
            // Let's ensure my expected matches what the code will output, the actual vertex chosen as `parent` might vary.

            ['A', 'B', 7],
            ['A', 'C', 9],
            ['C', 'F', 2],
            ['D', 'E', 6],
            ['E', 'F', 9],
        ]
    };
    expected1.mstWeight = expected1.mstEdges.reduce((acc, edge) => acc + edge[2], 0); // Recalculate based on edges
    // The previous manual calculation was 33. Let's make sure the example graph and expected match a known MST.
    // Prim's can vary the exact edge order but total weight and set of edges should be same.
    // My manual calculation is correct for a common interpretation of Prim's. Let's make the expected output match.
    // The issue might be in `assertDeepEqual` sorting. It sorts based on first vertex, then second, then weight.
    // If Prim's picks an edge like ['F','C',2] but my expected is ['C','F',2], the sort should normalize it.
    // The `sortEdges` function should normalize before stringifying.
    assertDeepEqual(result1, {
        mstWeight: 33, // Corrected
        mstEdges: [
            ['A', 'B', 7],
            ['A', 'C', 9],
            ['C', 'F', 2],
            ['E', 'D', 6], // D-E or E-D, sortEdges handles this.
            ['E', 'F', 9],
        ]
    }, "Prim's 1.1: Correct MST for Graph 1");

    // --- Graph 2: Disconnected Graph ---
    const graph2 = new Graph(false);
    graph2.addEdge('A', 'B', 1);
    graph2.addEdge('C', 'D', 2); // Disconnected component
    const result2 = prims(graph2);
    assert(result2 === null, "Prim's 2.1: Returns null for a disconnected graph");

    // --- Graph 3: Single Vertex Graph ---
    const graph3 = new Graph(false);
    graph3.addVertex('Only');
    const result3 = prims(graph3);
    assertDeepEqual(result3, { mstWeight: 0, mstEdges: [] }, "Prim's 3.1: MST for single vertex is 0 weight, no edges");

    // --- Graph 4: Empty Graph ---
    const graph4 = new Graph(false);
    const result4 = prims(graph4);
    assert(result4 === null, "Prim's 4.1: Returns null for an empty graph");

    // --- Performance Benchmarking (Larger Graph) ---
    console.log("\n--- Benchmarking Prim's Algorithm ---");
    const largeGraph = new Graph(false); // Undirected, Weighted for Prim's

    const numVertices = 500;
    const numEdges = 5000; // E >> V, relatively dense

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

        // Ensure unique undirected edges (pair (u,v) and (v,u) count as one)
        const edgeKey = [Math.min(v1, v2), Math.max(v1, v2)].join('-');
        if (!addedEdges.has(edgeKey)) {
            largeGraph.addEdge(v1, v2, weight);
            addedEdges.add(edgeKey);
        }
    }

    // Note: Ensuring the large graph is connected is important for a valid MST.
    // For random graph generation, it's possible it's disconnected.
    // A robust benchmark would add edges to guarantee connectivity first (e.g., connect each node to its predecessor).
    // For this simple benchmark, we assume it's "mostly" connected for typical random generation.

    timeExecution(() => prims(largeGraph), `Prim's Algorithm (${numVertices}V, ${numEdges}E)`);

    console.log("\nAll Prim's Algorithm tests completed.");
}

runTests();