```javascript
const {
    Graph,
    topologicalSort
} = require('../src'); // Adjust path as needed

function run(assert) {
    console.log('Running Topological Sort Tests...');

    // Test Case 1: Simple DAG
    const graph1 = new Graph(true); // Directed
    graph1.addVertex('A');
    graph1.addVertex('B');
    graph1.addVertex('C');
    graph1.addEdge('A', 'B');
    graph1.addEdge('A', 'C');
    const result1 = topologicalSort(graph1);
    assert.deepStrictEqual(result1 && result1[0], 'A', 'Topo Sort Test 1: Simple DAG (A must be first)');
    // A -> B, A -> C. A must be first. B and C can be in any order after A.
    // So [A, B, C] or [A, C, B] are valid. We'll check the first element specifically.

    // Test Case 2: More complex DAG
    const graph2 = new Graph(true);
    graph2.addVertex('5');
    graph2.addVertex('7');
    graph2.addVertex('3');
    graph2.addVertex('11');
    graph2.addVertex('8');
    graph2.addVertex('2');
    graph2.addVertex('9');
    graph2.addVertex('10');
    graph2.addEdge('5', '11');
    graph2.addEdge('7', '11');
    graph2.addEdge('7', '8');
    graph2.addEdge('3', '8');
    graph2.addEdge('3', '10');
    graph2.addEdge('11', '2');
    graph2.addEdge('11', '9');
    graph2.addEdge('11', '10');
    graph2.addEdge('8', '9');
    const result2 = topologicalSort(graph2);
    // There can be multiple valid topological sorts.
    // Example valid: [7, 5, 3, 11, 8, 2, 9, 10] or [3, 7, 5, 8, 11, 10, 9, 2] etc.
    // Check key properties:
    assert.ok(result2, 'Topo Sort Test 2: Complex DAG should return a result');
    if (result2) {
        // '5' and '7' must come before '11'
        assert.ok(result2.indexOf('5') < result2.indexOf('11'), 'Topo Sort Test 2.1: 5 before 11');
        assert.ok(result2.indexOf('7') < result2.indexOf('11'), 'Topo Sort Test 2.2: 7 before 11');
        // '3' must come before '8' and '10'
        assert.ok(result2.indexOf('3') < result2.indexOf('8'), 'Topo Sort Test 2.3: 3 before 8');
        assert.ok(result2.indexOf('3') < result2.indexOf('10'), 'Topo Sort Test 2.4: 3 before 10');
        // '11' must come before '2', '9', '10'
        assert.ok(result2.indexOf('11') < result2.indexOf('2'), 'Topo Sort Test 2.5: 11 before 2');
        assert.ok(result2.indexOf('11') < result2.indexOf('9'), 'Topo Sort Test 2.6: 11 before 9');
        assert.ok(result2.indexOf('11') < result2.indexOf('10'), 'Topo Sort Test 2.7: 11 before 10');
        // '8' must come before '9'
        assert.ok(result2.indexOf('8') < result2.indexOf('9'), 'Topo Sort Test 2.8: 8 before 9');
    }

    // Test Case 3: Graph with a cycle (should return null)
    const graph3 = new Graph(true);
    graph3.addVertex('A');
    graph3.addVertex('B');
    graph3.addVertex('C');
    graph3.addEdge('A', 'B');
    graph3.addEdge('B', 'C');
    graph3.addEdge('C', 'A'); // Cycle A-B-C-A
    assert.strictEqual(topologicalSort(graph3), null, 'Topo Sort Test 3: Graph with cycle (A-B-C-A)');

    // Test Case 4: Disconnected DAG
    const graph4 = new Graph(true);
    graph4.addVertex('A');
    graph4.addVertex('B');
    graph4.addVertex('C');
    graph4.addVertex('D');
    graph4.addEdge('A', 'B');
    graph4.addEdge('C', 'D');
    const result4 = topologicalSort(graph4);
    assert.ok(result4, 'Topo Sort Test 4: Disconnected DAG should return a result');
    if (result4) {
        assert.ok(result4.indexOf('A') < result4.indexOf('B'), 'Topo Sort Test 4.1: A before B');
        assert.ok(result4.indexOf('C') < result4.indexOf('D'), 'Topo Sort Test 4.2: C before D');
    }

    // Test Case 5: Empty graph
    const graph5 = new Graph(true);
    assert.deepStrictEqual(topologicalSort(graph5), [], 'Topo Sort Test 5: Empty graph');

    // Test Case 6: Single vertex
    const graph6 = new Graph(true);
    graph6.addVertex('X');
    assert.deepStrictEqual(topologicalSort(graph6), ['X'], 'Topo Sort Test 6: Single vertex');

    // Test Case 7: Linear DAG
    const graph7 = new Graph(true);
    graph7.addVertex('1');
    graph7.addVertex('2');
    graph7.addVertex('3');
    graph7.addVertex('4');
    graph7.addEdge('1', '2');
    graph7.addEdge('2', '3');
    graph7.addEdge('3', '4');
    assert.deepStrictEqual(topologicalSort(graph7), ['1', '2', '3', '4'], 'Topo Sort Test 7: Linear DAG');

    // Test Case 8: Graph with self-loop (should be treated as a cycle)
    const graph8 = new Graph(true);
    graph8.addVertex('A');
    graph8.addEdge('A', 'A'); // Self-loop
    assert.strictEqual(topologicalSort(graph8), null, 'Topo Sort Test 8: Graph with self-loop');

    // Test Case 9: Undirected graph (should warn and return null)
    const graph9 = new Graph(false); // Undirected
    graph9.addVertex('A');
    graph9.addVertex('B');
    graph9.addEdge('A', 'B');
    // We expect an error message and null return because it's undirected
    const consoleError = console.error;
    let errorMessage = '';
    console.error = (message) => {
        errorMessage = message;
    };
    assert.strictEqual(topologicalSort(graph9), null, 'Topo Sort Test 9: Undirected graph returns null');
    assert.strictEqual(errorMessage, "Topological sort is applicable only to Directed Acyclic Graphs (DAGs). The provided graph is undirected.", 'Topo Sort Test 9.1: Undirected graph should log error');
    console.error = consoleError; // Restore original console.error

    // Test Case 10: DAG with a fork and join
    const graph10 = new Graph(true);
    graph10.addVertex('A');
    graph10.addVertex('B');
    graph10.addVertex('C');
    graph10.addVertex('D');
    graph10.addVertex('E');
    graph10.addEdge('A', 'B');
    graph10.addEdge('A', 'C');
    graph10.addEdge('B', 'D');
    graph10.addEdge('C', 'D');
    graph10.addEdge('D', 'E');
    const result10 = topologicalSort(graph10);
    assert.ok(result10, 'Topo Sort Test 10: Fork and Join DAG should return a result');
    if (result10) {
        assert.ok(result10.indexOf('A') < result10.indexOf('B'), 'Topo Sort Test 10.1: A before B');
        assert.ok(result10.indexOf('A') < result10.indexOf('C'), 'Topo Sort Test 10.2: A before C');
        assert.ok(result10.indexOf('B') < result10.indexOf('D'), 'Topo Sort Test 10.3: B before D');
        assert.ok(result10.indexOf('C') < result10.indexOf('D'), 'Topo Sort Test 10.4: C before D');
        assert.ok(result10.indexOf('D') < result10.indexOf('E'), 'Topo Sort Test 10.5: D before E');
    }
}

module.exports = {
    run
};
```