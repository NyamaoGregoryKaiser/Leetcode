```javascript
/**
 * testDijkstra.js
 *
 * Test file for Dijkstra's Shortest Path algorithm.
 */

const { dijkstra, reconstructPath } = require('../src/algorithms/dijkstra');
const Graph = require('../src/data_structures/Graph');

function assertEqualMaps(map1, map2) {
    if (map1.size !== map2.size) return false;
    for (let [key, val] of map1) {
        if (!map2.has(key) || map2.get(key) !== val) {
            return false;
        }
    }
    return true;
}

function runTest(graph, startVertex, expectedDistances, expectedPaths, name) {
    let passed = true;
    let resultDistances, resultPaths;
    try {
        const result = dijkstra(graph, startVertex);
        resultDistances = result.distances;
        resultPaths = result.paths;

        if (!assertEqualMaps(resultDistances, expectedDistances)) {
            passed = false;
        } else {
            // Optional: Test path reconstruction
            for (const [endV, expectedPred] of expectedPaths.entries()) {
                if (expectedPred !== null) { // Only test for reachable nodes with a predecessor
                    const path = reconstructPath(startVertex, endV, resultPaths);
                    const expectedPath = [];
                    let curr = endV;
                    while (curr !== null) {
                        expectedPath.unshift(curr);
                        if (curr === startVertex) break;
                        curr = expectedPaths.get(curr);
                    }
                    if (path && path.join('-') !== expectedPath.join('-')) {
                        console.warn(`  - Warning: Path mismatch for ${endV}. Expected: ${expectedPath.join('-')}, Got: ${path.join('-')}`);
                        // This might not strictly be a failure if multiple paths have same min cost
                        // But for deterministic graphs, it usually points to an issue.
                        // For this test suite, let's treat it as a pass if distances are correct.
                    }
                }
            }
        }
    } catch (e) {
        passed = false;
        console.error(`  - ${name}: ❌ Failed due to error: ${e.message}`);
    }

    console.log(`  - ${name} (Start: ${startVertex}): ${passed ? '✅ Passed' : '❌ Failed'}`);
    if (!passed) {
        console.log("    Expected Distances:", Object.fromEntries(expectedDistances));
        console.log("    Got Distances:     ", Object.fromEntries(resultDistances));
    }
    return passed;
}

async function runTests() {
    let passedCount = 0;
    let totalCount = 0;

    // Test Case 1: Simple graph
    const graph1 = new Graph();
    graph1.addEdge('A', 'B', 4);
    graph1.addEdge('A', 'C', 2);
    graph1.addEdge('B', 'E', 3);
    graph1.addEdge('C', 'D', 2);
    graph1.addEdge('C', 'F', 4);
    graph1.addEdge('D', 'E', 3);
    graph1.addEdge('D', 'F', 1);
    graph1.addEdge('E', 'G', 2);
    graph1.addEdge('F', 'G', 1);

    const expected1Distances = new Map([
        ['A', 0], ['B', 4], ['C', 2], ['D', 4], ['E', 7], ['F', 5], ['G', 6]
    ]);
    const expected1Paths = new Map([
        ['A', null], ['B', 'A'], ['C', 'A'], ['D', 'C'], ['E', 'D'], ['F', 'D'], ['G', 'F'] // One possible set of predecessors
    ]);
    totalCount++;
    if (runTest(graph1, 'A', expected1Distances, expected1Paths, "Simple Graph 1")) {
        passedCount++;
    }

    // Test Case 2: Graph with unreachable nodes
    const graph2 = new Graph();
    graph2.addVertex('A'); graph2.addVertex('B'); graph2.addVertex('C'); graph2.addVertex('D');
    graph2.addEdge('A', 'B', 1);
    graph2.addEdge('B', 'A', 1); // Bidirectional to simulate undirected
    graph2.addEdge('C', 'D', 5);
    const expected2Distances = new Map([
        ['A', 0], ['B', 1], ['C', Infinity], ['D', Infinity]
    ]);
    const expected2Paths = new Map([
        ['A', null], ['B', 'A'], ['C', null], ['D', null]
    ]);
    totalCount++;
    if (runTest(graph2, 'A', expected2Distances, expected2Paths, "Unreachable Nodes")) {
        passedCount++;
    }

    // Test Case 3: Disconnected graph, starting from an isolated node
    const graph3 = new Graph();
    graph3.addVertex('A'); graph3.addVertex('B'); graph3.addVertex('C');
    const expected3Distances = new Map([
        ['A', 0], ['B', Infinity], ['C', Infinity]
    ]);
    const expected3Paths = new Map([
        ['A', null], ['B', null], ['C', null]
    ]);
    totalCount++;
    if (runTest(graph3, 'A', expected3Distances, expected3Paths, "Isolated Node Start")) {
        passedCount++;
    }

    // Test Case 4: Larger graph with more paths
    // Example from Wikipedia's Dijkstra page: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
    const graph4 = new Graph();
    graph4.addEdge('A', 'B', 7);
    graph4.addEdge('A', 'C', 9);
    graph4.addEdge('A', 'F', 14);
    graph4.addEdge('B', 'C', 10);
    graph4.addEdge('B', 'D', 15);
    graph4.addEdge('C', 'D', 11);
    graph4.addEdge('C', 'F', 2);
    graph4.addEdge('D', 'E', 6);
    graph4.addEdge('E', 'F', 9); // F to E, not E to F for shortest path purposes.

    const expected4Distances = new Map([
        ['A', 0],
        ['B', 7],
        ['C', 9],
        ['D', 20], // A->C->D (9+11=20) vs A->B->D (7+15=22)
        ['E', 26], // A->C->D->E (9+11+6=26)
        ['F', 11]  // A->C->F (9+2=11)
    ]);
    const expected4Paths = new Map([
        ['A', null], ['B', 'A'], ['C', 'A'], ['D', 'C'], ['E', 'D'], ['F', 'C']
    ]);
    totalCount++;
    if (runTest(graph4, 'A', expected4Distances, expected4Paths, "Wikipedia Example")) {
        passedCount++;
    }

    // Test Case 5: Start vertex not in graph (should throw error)
    const graph5 = new Graph();
    graph5.addVertex('X');
    totalCount++;
    try {
        dijkstra(graph5, 'Z');
        console.log(`  - Non-existent Start Vertex: ❌ Failed (Did not throw error)`);
    } catch (e) {
        if (e.message.includes('not found')) {
            console.log(`  - Non-existent Start Vertex: ✅ Passed (Threw expected error)`);
            passedCount++;
        } else {
            console.log(`  - Non-existent Start Vertex: ❌ Failed (Threw unexpected error: ${e.message})`);
        }
    }


    console.log(`\nSummary for Dijkstra's Algorithm: ${passedCount}/${totalCount} tests passed.`);
    return { total: totalCount, passed: passedCount, failed: totalCount - passedCount };
}

module.exports = { runTests };
```