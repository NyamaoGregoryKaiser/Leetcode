```javascript
/**
 * testTopologicalSort.js
 *
 * Test file for Topological Sort algorithms (Kahn's and DFS-based).
 */

const { topologicalSortKahn, topologicalSortDFS } = require('../src/algorithms/topologicalSort');
const Graph = require('../src/data_structures/Graph');

function runTest(algorithm, name, graph, expectedOrder, expectsError = false) {
    let passed = true;
    let result = [];
    try {
        result = algorithm(graph);
        if (expectsError) {
            passed = false; // Expected an error but didn't get one
            console.log(`  - ${name}: ❌ Failed. Expected error, but got result: [${result.join(', ')}]`);
        } else if (JSON.stringify(result) !== JSON.stringify(expectedOrder)) {
            // For topological sort, multiple valid orders can exist.
            // A more robust check would involve verifying if the result is *a* valid topological order,
            // not just an exact match. But for deterministic simple graphs, exact match is often fine.
            // For now, we'll check validity if exact match fails.
            const isValid = checkTopologicalOrder(graph, result);
            if (!isValid) {
                 passed = false;
            } else {
                console.log(`  - ${name}: ✅ Passed (Valid order, but not exact match as expected: [${result.join(', ')}])`);
            }
        }
    } catch (e) {
        if (!expectsError) {
            passed = false;
            console.log(`  - ${name}: ❌ Failed. Unexpected error: ${e.message}`);
        } else if (!e.message.includes('cycle')) {
            passed = false;
            console.log(`  - ${name}: ❌ Failed. Expected cycle error, but got different error: ${e.message}`);
        }
    }

    if (expectsError && passed) { // Passed only if an error was caught and was a cycle error
        console.log(`  - ${name}: ✅ Passed (Correctly detected cycle)`);
    } else if (!expectsError && !passed) {
        console.log(`  - ${name}: ❌ Failed. Expected: [${expectedOrder.join(', ')}], Got: [${result.join(', ')}]`);
        console.log("    Graph structure:\n" + graph.toString());
    } else if (!expectsError && passed && JSON.stringify(result) === JSON.stringify(expectedOrder)) {
        console.log(`  - ${name}: ✅ Passed. Result: [${result.join(', ')}]`);
    }

    return passed;
}

// Helper function to verify if an order is a valid topological sort
function checkTopologicalOrder(graph, order) {
    if (order.length !== graph.numVertices) {
        console.error("    Validation failed: Order length mismatch.");
        return false;
    }
    const position = new Map();
    for (let i = 0; i < order.length; i++) {
        position.set(order[i], i);
    }
    for (const [u, neighbors] of graph.adj.entries()) {
        for (const [v] of neighbors.entries()) {
            if (position.get(u) > position.get(v)) {
                console.error(`    Validation failed: ${u} appears after ${v}, but ${u} -> ${v} exists.`);
                return false;
            }
        }
    }
    return true;
}

async function runTests() {
    let passedCount = 0;
    let totalCount = 0;

    // Test Case 1: Simple DAG
    const graph1 = new Graph(true);
    graph1.addEdge('A', 'B');
    graph1.addEdge('B', 'C');
    graph1.addEdge('A', 'D');
    graph1.addEdge('D', 'C');
    // Expected: A, D, B, C (Kahn's) or A, B, D, C (DFS)
    const expected1Kahn = ['A', 'B', 'D', 'C']; // Kahn's will process B before D if in-degree is same and A is source
    const expected1DFS = ['A', 'B', 'D', 'C']; // Order depends on iteration, but this is a valid one.
    totalCount++;
    if (runTest(topologicalSortKahn, "Simple DAG (Kahn's)", graph1, expected1Kahn)) {
        passedCount++;
    }
    totalCount++;
    if (runTest(topologicalSortDFS, "Simple DAG (DFS)", graph1, expected1DFS)) {
        passedCount++;
    }


    // Test Case 2: Larger DAG
    // Example from Wikipedia Kahn's algorithm: https://en.wikipedia.org/wiki/Topological_sorting
    const graph2 = new Graph(true);
    graph2.addVertex('5'); graph2.addVertex('7'); graph2.addVertex('3'); graph2.addVertex('8');
    graph2.addVertex('2'); graph2.addVertex('9'); graph2.addVertex('10'); graph2.addVertex('11');
    graph2.addEdge('7', '11');
    graph2.addEdge('5', '11');
    graph2.addEdge('5', '10');
    graph2.addEdge('3', '8');
    graph2.addEdge('3', '10');
    graph2.addEdge('8', '9');
    graph2.addEdge('11', '2');
    graph2.addEdge('11', '9');
    graph2.addEdge('11', '10');
    // Expected Kahn's: 5, 7, 3, 11, 8, 10, 9, 2 (or similar valid order)
    const expected2Kahn = ['5', '7', '3', '11', '8', '10', '9', '2']; // Assuming vertex iteration order 5,7,3,8,2,9,10,11
    const expected2DFS = ['5', '7', '3', '8', '9', '11', '10', '2']; // Assuming DFS exploration order
    totalCount++;
    if (runTest(topologicalSortKahn, "Larger DAG (Kahn's)", graph2, expected2Kahn)) {
        passedCount++;
    }
    totalCount++;
    if (runTest(topologicalSortDFS, "Larger DAG (DFS)", graph2, expected2DFS)) {
        passedCount++;
    }

    // Test Case 3: Graph with a cycle (should throw error)
    const graph3 = new Graph(true);
    graph3.addEdge('A', 'B');
    graph3.addEdge('B', 'C');
    graph3.addEdge('C', 'A'); // Cycle: A -> B -> C -> A
    totalCount++;
    if (runTest(topologicalSortKahn, "Graph with Cycle (Kahn's)", graph3, [], true)) {
        passedCount++;
    }
    totalCount++;
    if (runTest(topologicalSortDFS, "Graph with Cycle (DFS)", graph3, [], true)) {
        passedCount++;
    }

    // Test Case 4: Graph with no edges
    const graph4 = new Graph(true);
    graph4.addVertex('P');
    graph4.addVertex('Q');
    graph4.addVertex('R');
    const expected4 = ['P', 'Q', 'R']; // Order depends on vertex iteration (alphabetical here)
    totalCount++;
    if (runTest(topologicalSortKahn, "No Edges (Kahn's)", graph4, expected4)) {
        passedCount++;
    }
    totalCount++;
    if (runTest(topologicalSortDFS, "No Edges (DFS)", graph4, expected4)) {
        passedCount++;
    }

    // Test Case 5: Complex DAG (courses prerequisites)
    const graph5 = new Graph(true);
    graph5.addEdge('A', 'B'); // A -> B
    graph5.addEdge('A', 'C'); // A -> C
    graph5.addEdge('B', 'D'); // B -> D
    graph5.addEdge('C', 'D'); // C -> D
    graph5.addEdge('D', 'E'); // D -> E
    const expected5Kahn = ['A', 'B', 'C', 'D', 'E']; // One valid order
    const expected5DFS = ['A', 'B', 'C', 'D', 'E']; // One valid order
    totalCount++;
    if (runTest(topologicalSortKahn, "Complex DAG (Kahn's) Courses", graph5, expected5Kahn)) {
        passedCount++;
    }
    totalCount++;
    if (runTest(topologicalSortDFS, "Complex DAG (DFS) Courses", graph5, expected5DFS)) {
        passedCount++;
    }

    // Test Case 6: Graph with self-loop (cycle, should throw error)
    const graph6 = new Graph(true);
    graph6.addVertex('X');
    graph6.addEdge('X', 'X');
    totalCount++;
    if (runTest(topologicalSortKahn, "Self-Loop (Kahn's)", graph6, [], true)) {
        passedCount++;
    }
    totalCount++;
    if (runTest(topologicalSortDFS, "Self-Loop (DFS)", graph6, [], true)) {
        passedCount++;
    }


    console.log(`\nSummary for Topological Sort: ${passedCount}/${totalCount} tests passed.`);
    return { total: totalCount, passed: passedCount, failed: totalCount - passedCount };
}

module.exports = { runTests };
```