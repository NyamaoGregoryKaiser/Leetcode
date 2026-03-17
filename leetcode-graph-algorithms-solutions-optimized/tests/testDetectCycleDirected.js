```javascript
/**
 * testDetectCycleDirected.js
 *
 * Test file for cycle detection in directed graphs.
 */

const { detectCycleInDirectedGraph } = require('../src/algorithms/detectCycleDirected');
const Graph = require('../src/data_structures/Graph');

function runTest(graph, expected, name) {
    const result = detectCycleInDirectedGraph(graph);
    const passed = result === expected;
    console.log(`  - ${name}: ${passed ? '✅ Passed' : '❌ Failed'}. Expected: ${expected}, Got: ${result}`);
    if (!passed) {
        console.log("    Graph structure:\n" + graph.toString());
    }
    return passed;
}

async function runTests() {
    let passedCount = 0;
    let totalCount = 0;

    // Test Case 1: Simple DAG (No cycle)
    const graph1 = new Graph(true);
    graph1.addEdge('A', 'B');
    graph1.addEdge('B', 'C');
    graph1.addEdge('A', 'D');
    graph1.addEdge('D', 'C');
    totalCount++;
    if (runTest(graph1, false, "Simple DAG")) {
        passedCount++;
    }

    // Test Case 2: Simple Cycle
    const graph2 = new Graph(true);
    graph2.addEdge('A', 'B');
    graph2.addEdge('B', 'C');
    graph2.addEdge('C', 'A'); // Cycle: A -> B -> C -> A
    totalCount++;
    if (runTest(graph2, true, "Simple Cycle")) {
        passedCount++;
    }

    // Test Case 3: Larger graph with a cycle
    const graph3 = new Graph(true);
    graph3.addEdge('0', '1');
    graph3.addEdge('0', '2');
    graph3.addEdge('1', '2');
    graph3.addEdge('2', '0'); // Cycle: 0 -> 2 -> 0
    graph3.addEdge('2', '3');
    graph3.addEdge('3', '3'); // Self-loop cycle
    totalCount++;
    if (runTest(graph3, true, "Larger Graph with Multiple Cycles")) {
        passedCount++;
    }

    // Test Case 4: Another DAG
    const graph4 = new Graph(true);
    graph4.addEdge('5', '2');
    graph4.addEdge('5', '0');
    graph4.addEdge('4', '0');
    graph4.addEdge('4', '1');
    graph4.addEdge('2', '3');
    graph4.addEdge('3', '1');
    totalCount++;
    if (runTest(graph4, false, "Another DAG (from Kahn's example)")) {
        passedCount++;
    }

    // Test Case 5: Graph with multiple components, one having a cycle
    const graph5 = new Graph(true);
    graph5.addVertex('X'); // Isolated vertex
    graph5.addEdge('A', 'B');
    graph5.addEdge('B', 'A'); // Cycle: A <-> B
    graph5.addEdge('C', 'D');
    totalCount++;
    if (runTest(graph5, true, "Multiple Components, One Cycle")) {
        passedCount++;
    }

    // Test Case 6: Graph with no edges (DAG)
    const graph6 = new Graph(true);
    graph6.addVertex('P');
    graph6.addVertex('Q');
    graph6.addVertex('R');
    totalCount++;
    if (runTest(graph6, false, "No Edges (DAG)")) {
        passedCount++;
    }

    // Test Case 7: Graph with only a self-loop
    const graph7 = new Graph(true);
    graph7.addEdge('S', 'S'); // Cycle
    totalCount++;
    if (runTest(graph7, true, "Self-Loop Cycle")) {
        passedCount++;
    }

    // Test Case 8: Complex DAG
    const graph8 = new Graph(true);
    graph8.addEdge('A', 'B');
    graph8.addEdge('A', 'C');
    graph8.addEdge('B', 'D');
    graph8.addEdge('C', 'E');
    graph8.addEdge('D', 'F');
    graph8.addEdge('E', 'F');
    graph8.addEdge('F', 'G');
    graph8.addVertex('H'); // Isolated
    totalCount++;
    if (runTest(graph8, false, "Complex DAG")) {
        passedCount++;
    }

    // Test Case 9: Complex graph with a subtle cycle
    const graph9 = new Graph(true);
    graph9.addEdge('0', '1');
    graph9.addEdge('1', '2');
    graph9.addEdge('2', '3');
    graph9.addEdge('3', '0'); // Cycle: 0->1->2->3->0
    graph9.addEdge('1', '4');
    graph9.addEdge('4', '5');
    totalCount++;
    if (runTest(graph9, true, "Complex Cycle")) {
        passedCount++;
    }


    console.log(`\nSummary for Directed Cycle Detection: ${passedCount}/${totalCount} tests passed.`);
    return { total: totalCount, passed: passedCount, failed: totalCount - passedCount };
}

module.exports = { runTests };
```