```javascript
const {
    Graph,
    detectCycleDirected,
    detectCycleUndirected
} = require('../src'); // Adjust path as needed

function run(assert) {
    console.log('Running Cycle Detection Tests...');

    // --- Directed Graph Cycle Detection (detectCycleDirected) ---

    // Test Case 1: Directed graph with a simple cycle
    const graphD1 = new Graph(true);
    graphD1.addVertex('A');
    graphD1.addVertex('B');
    graphD1.addVertex('C');
    graphD1.addEdge('A', 'B');
    graphD1.addEdge('B', 'C');
    graphD1.addEdge('C', 'A'); // Cycle A -> B -> C -> A
    assert.ok(detectCycleDirected(graphD1), 'Directed Test 1: Simple cycle A-B-C-A');

    // Test Case 2: Directed graph with no cycle (DAG)
    const graphD2 = new Graph(true);
    graphD2.addVertex('A');
    graphD2.addVertex('B');
    graphD2.addVertex('C');
    graphD2.addEdge('A', 'B');
    graphD2.addEdge('A', 'C');
    graphD2.addEdge('B', 'C');
    assert.notOk(detectCycleDirected(graphD2), 'Directed Test 2: No cycle in DAG');

    // Test Case 3: Directed graph with multiple components, one having a cycle
    const graphD3 = new Graph(true);
    graphD3.addVertex('A');
    graphD3.addVertex('B');
    graphD3.addVertex('C');
    graphD3.addVertex('X');
    graphD3.addVertex('Y');
    graphD3.addEdge('A', 'B');
    graphD3.addEdge('B', 'C');
    graphD3.addEdge('C', 'A'); // Cycle A-B-C-A
    graphD3.addEdge('X', 'Y'); // Disconnected component, no cycle
    assert.ok(detectCycleDirected(graphD3), 'Directed Test 3: Cycle in one component');

    // Test Case 4: Directed graph with self-loop
    const graphD4 = new Graph(true);
    graphD4.addVertex('A');
    graphD4.addEdge('A', 'A'); // Self-loop is a cycle
    assert.ok(detectCycleDirected(graphD4), 'Directed Test 4: Self-loop is a cycle');

    // Test Case 5: Directed graph with a cycle through back edge, not direct neighbor
    const graphD5 = new Graph(true);
    graphD5.addVertex('0');
    graphD5.addVertex('1');
    graphD5.addVertex('2');
    graphD5.addVertex('3');
    graphD5.addEdge('0', '1');
    graphD5.addEdge('0', '2');
    graphD5.addEdge('1', '2');
    graphD5.addEdge('2', '0'); // Cycle 0->2->0
    graphD5.addEdge('2', '3');
    graphD5.addEdge('3', '3'); // Another cycle
    assert.ok(detectCycleDirected(graphD5), 'Directed Test 5: Complex cycle with multiple back-edges and self-loop');

    // Test Case 6: Empty directed graph
    const graphD6 = new Graph(true);
    assert.notOk(detectCycleDirected(graphD6), 'Directed Test 6: Empty graph has no cycle');

    // Test Case 7: Single node directed graph
    const graphD7 = new Graph(true);
    graphD7.addVertex('A');
    assert.notOk(detectCycleDirected(graphD7), 'Directed Test 7: Single node graph has no cycle');

    // Test Case 8: Undirected graph passed to directed detector (should warn and return false)
    const graphD8_undirected = new Graph(false);
    graphD8_undirected.addVertex('A');
    graphD8_undirected.addVertex('B');
    graphD8_undirected.addEdge('A', 'B'); // This will add A->B and B->A in adj list
    const consoleWarnD = console.warn;
    let warnMessageD = '';
    console.warn = (message) => {
        warnMessageD = message;
    };
    assert.notOk(detectCycleDirected(graphD8_undirected), 'Directed Test 8: Undirected graph passed to directed detector returns false');
    assert.ok(warnMessageD.includes("detectCycleDirected called on an undirected graph"), 'Directed Test 8.1: Undirected graph passed to directed detector should log warning');
    console.warn = consoleWarnD; // Restore original console.warn


    // --- Undirected Graph Cycle Detection (detectCycleUndirected) ---

    // Test Case 9: Undirected graph with a simple cycle
    const graphU1 = new Graph(false);
    graphU1.addVertex('A');
    graphU1.addVertex('B');
    graphU1.addVertex('C');
    graphU1.addEdge('A', 'B');
    graphU1.addEdge('B', 'C');
    graphU1.addEdge('C', 'A'); // Cycle A-B-C-A
    assert.ok(detectCycleUndirected(graphU1), 'Undirected Test 1: Simple cycle A-B-C-A');

    // Test Case 10: Undirected graph with no cycle (tree)
    const graphU2 = new Graph(false);
    graphU2.addVertex('A');
    graphU2.addVertex('B');
    graphU2.addVertex('C');
    graphU2.addEdge('A', 'B');
    graphU2.addEdge('A', 'C');
    assert.notOk(detectCycleUndirected(graphU2), 'Undirected Test 2: No cycle in a tree');

    // Test Case 11: Undirected graph with multiple components, one having a cycle
    const graphU3 = new Graph(false);
    graphU3.addVertex('A');
    graphU3.addVertex('B');
    graphU3.addVertex('C');
    graphU3.addVertex('X');
    graphU3.addVertex('Y');
    graphU3.addEdge('A', 'B');
    graphU3.addEdge('B', 'C');
    graphU3.addEdge('C', 'A'); // Cycle A-B-C-A
    graphU3.addEdge('X', 'Y'); // Disconnected component, no cycle
    assert.ok(detectCycleUndirected(graphU3), 'Undirected Test 3: Cycle in one component');

    // Test Case 12: Undirected graph with self-loop (should be treated as cycle)
    const graphU4 = new Graph(false);
    graphU4.addVertex('A');
    graphU4.addEdge('A', 'A'); // Self-loop in undirected graph
    assert.ok(detectCycleUndirected(graphU4), 'Undirected Test 4: Self-loop is a cycle');

    // Test Case 13: Empty undirected graph
    const graphU5 = new Graph(false);
    assert.notOk(detectCycleUndirected(graphU5), 'Undirected Test 5: Empty graph has no cycle');

    // Test Case 14: Single node undirected graph
    const graphU6 = new Graph(false);
    graphU6.addVertex('A');
    assert.notOk(detectCycleUndirected(graphU6), 'Undirected Test 6: Single node graph has no cycle');

    // Test Case 15: Directed graph passed to undirected detector (should warn and return false)
    const graphU7_directed = new Graph(true);
    graphU7_directed.addVertex('A');
    graphU7_directed.addVertex('B');
    graphU7_directed.addEdge('A', 'B');
    const consoleWarnU = console.warn;
    let warnMessageU = '';
    console.warn = (message) => {
        warnMessageU = message;
    };
    assert.notOk(detectCycleUndirected(graphU7_directed), 'Undirected Test 7: Directed graph passed to undirected detector returns false');
    assert.ok(warnMessageU.includes("detectCycleUndirected called on a directed graph"), 'Undirected Test 7.1: Directed graph passed to undirected detector should log warning');
    console.warn = consoleWarnU; // Restore original console.warn
}

module.exports = {
    run
};
```