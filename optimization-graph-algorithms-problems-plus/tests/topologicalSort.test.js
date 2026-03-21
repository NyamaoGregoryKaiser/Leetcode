const { topologicalSortKahn, topologicalSortDFS } = require('../src/algorithms/topologicalSort');
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

function assert(condition, message) {
    if (!condition) {
        console.error(`❌ Test failed: ${message}`);
        process.exit(1);
    } else {
        console.log(`✅ Test passed: ${message}`);
    }
}

// Helper to validate a topological sort result
function isValidTopologicalSort(graph, sortResult) {
    if (!sortResult) return false; // Cycle detected, so not valid
    if (sortResult.length !== graph.getVertices().size) return false; // Not all vertices included

    const positionMap = new Map();
    for (let i = 0; i < sortResult.length; i++) {
        positionMap.set(sortResult[i], i);
    }

    for (const [u, edges] of graph.adjacencyList.entries()) {
        for (const { neighbor: v } of edges) {
            if (positionMap.get(u) > positionMap.get(v)) {
                return false; // Found an edge (u -> v) where u appears after v in the sort
            }
        }
    }
    return true;
}


function runTests() {
    console.log("--- Running Topological Sort Tests ---");

    // --- Graph 1: Simple DAG ---
    const graph1 = new Graph(true); // Directed
    graph1.addVertex('A'); graph1.addVertex('B'); graph1.addVertex('C'); graph1.addVertex('D'); graph1.addVertex('E'); graph1.addVertex('F');
    graph1.addEdge('A', 'B');
    graph1.addEdge('A', 'C');
    graph1.addEdge('B', 'D');
    graph1.addEdge('C', 'E');
    graph1.addEdge('D', 'F');
    graph1.addEdge('E', 'F');

    console.log("\nGraph 1 (DAG):");
    console.log(graph1.printGraph());

    const resultKahn1 = topologicalSortKahn(graph1);
    const resultDFS1 = topologicalSortDFS(graph1);

    // Multiple valid topological sorts are possible. We just check if they are valid.
    assert(isValidTopologicalSort(graph1, resultKahn1), `Kahn's 1.1: Topological sort for graph 1 is valid. Result: ${JSON.stringify(resultKahn1)}`);
    assert(isValidTopologicalSort(graph1, resultDFS1), `DFS 1.1: Topological sort for graph 1 is valid. Result: ${JSON.stringify(resultDFS1)}`);

    // Example of a specific valid sort for this graph
    // ['A', 'C', 'E', 'B', 'D', 'F'] or ['A', 'B', 'C', 'D', 'E', 'F'] (if C->E processed before B->D)
    // Kahn's will often produce a lexicographical-like order if vertices are added/processed that way.
    // For this specific graph, a common Kahn's output might be: A, B, C, D, E, F or A, C, B, E, D, F
    // DFS output depends on traversal order, typically reversed post-order traversal.

    // --- Graph 2: Graph with a Cycle ---
    const graph2 = new Graph(true);
    graph2.addVertex('X'); graph2.addVertex('Y'); graph2.addVertex('Z');
    graph2.addEdge('X', 'Y');
    graph2.addEdge('Y', 'Z');
    graph2.addEdge('Z', 'X'); // Cycle Z -> X

    console.log("\nGraph 2 (Cycle):");
    console.log(graph2.printGraph());

    const resultKahn2 = topologicalSortKahn(graph2);
    const resultDFS2 = topologicalSortDFS(graph2);

    assert(resultKahn2 === null, "Kahn's 2.1: Returns null for graph with a cycle");
    assert(resultDFS2 === null, "DFS 2.1: Returns null for graph with a cycle");

    // --- Graph 3: Disconnected DAG ---
    const graph3 = new Graph(true);
    graph3.addEdge('1', '2');
    graph3.addEdge('A', 'B'); // Disconnected component
    graph3.addVertex('C'); // Isolated vertex

    console.log("\nGraph 3 (Disconnected DAG):");
    console.log(graph3.printGraph());

    const resultKahn3 = topologicalSortKahn(graph3);
    const resultDFS3 = topologicalSortDFS(graph3);

    assert(isValidTopologicalSort(graph3, resultKahn3), `Kahn's 3.1: Topological sort for disconnected graph is valid. Result: ${JSON.stringify(resultKahn3)}`);
    assert(isValidTopologicalSort(graph3, resultDFS3), `DFS 3.1: Topological sort for disconnected graph is valid. Result: ${JSON.stringify(resultDFS3)}`);
    assert(resultKahn3.length === 5, "Kahn's 3.2: Contains all 5 vertices");
    assert(resultDFS3.length === 5, "DFS 3.2: Contains all 5 vertices");


    // --- Graph 4: Empty Graph ---
    const graph4 = new Graph(true);
    const resultKahn4 = topologicalSortKahn(graph4);
    const resultDFS4 = topologicalSortDFS(graph4);
    assertDeepEqual(resultKahn4, [], "Kahn's 4.1: Empty graph returns empty array");
    assertDeepEqual(resultDFS4, [], "DFS 4.1: Empty graph returns empty array");

    // --- Graph 5: Single Vertex Graph ---
    const graph5 = new Graph(true);
    graph5.addVertex('S');
    const resultKahn5 = topologicalSortKahn(graph5);
    const resultDFS5 = topologicalSortDFS(graph5);
    assertDeepEqual(resultKahn5, ['S'], "Kahn's 5.1: Single vertex graph returns array with single vertex");
    assertDeepEqual(resultDFS5, ['S'], "DFS 5.1: Single vertex graph returns array with single vertex");

    // --- Graph 6: Undirected Graph (should return null) ---
    const graph6 = new Graph(false); // Undirected
    graph6.addEdge('A', 'B');
    const resultKahn6 = topologicalSortKahn(graph6);
    const resultDFS6 = topologicalSortDFS(graph6);
    assert(resultKahn6 === null, "Kahn's 6.1: Returns null for undirected graph");
    assert(resultDFS6 === null, "DFS 6.1: Returns null for undirected graph");

    // --- Performance Benchmarking (Larger DAG) ---
    console.log("\n--- Benchmarking Topological Sort ---");
    const largeDAG = new Graph(true); // Directed Acyclic Graph

    const numVertices = 1000;
    const numEdges = 3000; // E = 3V for a sparse DAG

    for (let i = 0; i < numVertices; i++) {
        largeDAG.addVertex(i);
    }

    // Add random edges to create a DAG (ensure i < j to avoid cycles)
    let addedEdgesCount = 0;
    while (addedEdgesCount < numEdges) {
        const v1 = Math.floor(Math.random() * numVertices);
        const v2 = Math.floor(Math.random() * numVertices);
        if (v1 === v2) continue;

        // Force an acyclic structure by only adding edges from smaller index to larger index
        if (v1 < v2) {
            // Check if edge already exists to avoid duplicates
            let exists = false;
            const neighbors = largeDAG.getNeighbors(v1);
            if (neighbors) {
                for (const edge of neighbors) {
                    if (edge.neighbor === v2) {
                        exists = true;
                        break;
                    }
                }
            }
            if (!exists) {
                largeDAG.addEdge(v1, v2);
                addedEdgesCount++;
            }
        }
    }

    timeExecution(() => topologicalSortKahn(largeDAG), `Kahn's Algorithm (${numVertices}V, ${numEdges}E)`);
    timeExecution(() => topologicalSortDFS(largeDAG), `DFS-based Topological Sort (${numVertices}V, ${numEdges}E)`);

    console.log("\nAll Topological Sort tests completed.");
}

runTests();