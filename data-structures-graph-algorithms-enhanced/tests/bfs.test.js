```javascript
const {
    Graph,
    bfs
} = require('../src'); // Adjust path as needed

function run(assert) {
    console.log('Running BFS Tests...');

    // Test Case 1: Simple path
    const graph1 = new Graph();
    graph1.addVertex('A');
    graph1.addVertex('B');
    graph1.addVertex('C');
    graph1.addVertex('D');
    graph1.addEdge('A', 'B');
    graph1.addEdge('B', 'C');
    graph1.addEdge('C', 'D');
    assert.deepStrictEqual(bfs(graph1, 'A', 'D'), ['A', 'B', 'C', 'D'], 'BFS Test 1: Simple path A-D');

    // Test Case 2: No path
    const graph2 = new Graph();
    graph2.addVertex('A');
    graph2.addVertex('B');
    graph2.addVertex('C');
    graph2.addEdge('A', 'B');
    assert.strictEqual(bfs(graph2, 'A', 'C'), null, 'BFS Test 2: No path A-C');

    // Test Case 3: Start and target are the same
    const graph3 = new Graph();
    graph3.addVertex('A');
    assert.deepStrictEqual(bfs(graph3, 'A', 'A'), ['A'], 'BFS Test 3: Start and target are same');

    // Test Case 4: Disconnected graph
    const graph4 = new Graph();
    graph4.addVertex('A');
    graph4.addVertex('B');
    graph4.addVertex('X');
    graph4.addVertex('Y');
    graph4.addEdge('A', 'B');
    graph4.addEdge('X', 'Y');
    assert.strictEqual(bfs(graph4, 'A', 'X'), null, 'BFS Test 4: Disconnected components');

    // Test Case 5: Complex graph with multiple paths, ensuring shortest
    const graph5 = new Graph();
    graph5.addVertex('A');
    graph5.addVertex('B');
    graph5.addVertex('C');
    graph5.addVertex('D');
    graph5.addVertex('E');
    graph5.addEdge('A', 'B');
    graph5.addEdge('A', 'C');
    graph5.addEdge('B', 'D');
    graph5.addEdge('C', 'E');
    graph5.addEdge('D', 'E'); // A -> B -> D -> E (length 3), A -> C -> E (length 2)
    assert.deepStrictEqual(bfs(graph5, 'A', 'E'), ['A', 'C', 'E'], 'BFS Test 5: Complex path, shortest A-E');

    // Test Case 6: Graph with a cycle (should still find shortest path)
    const graph6 = new Graph();
    graph6.addVertex('A');
    graph6.addVertex('B');
    graph6.addVertex('C');
    graph6.addVertex('D');
    graph6.addEdge('A', 'B');
    graph6.addEdge('B', 'C');
    graph6.addEdge('C', 'A'); // Cycle A-B-C-A
    graph6.addEdge('C', 'D');
    assert.deepStrictEqual(bfs(graph6, 'A', 'D'), ['A', 'B', 'C', 'D'], 'BFS Test 6: Graph with cycle, A-D');

    // Test Case 7: Larger graph
    const graph7 = new Graph();
    ['0', '1', '2', '3', '4', '5'].forEach(v => graph7.addVertex(v));
    graph7.addEdge('0', '1');
    graph7.addEdge('0', '2');
    graph7.addEdge('1', '3');
    graph7.addEdge('2', '4');
    graph7.addEdge('3', '5');
    graph7.addEdge('4', '5');
    assert.deepStrictEqual(bfs(graph7, '0', '5'), ['0', '1', '3', '5'], 'BFS Test 7: Larger graph 0-5');

    // Test Case 8: Non-existent start vertex
    const graph8 = new Graph();
    graph8.addVertex('A');
    graph8.addVertex('B');
    graph8.addEdge('A', 'B');
    assert.strictEqual(bfs(graph8, 'X', 'B'), null, 'BFS Test 8: Non-existent start vertex');

    // Test Case 9: Non-existent target vertex
    const graph9 = new Graph();
    graph9.addVertex('A');
    graph9.addVertex('B');
    graph9.addEdge('A', 'B');
    assert.strictEqual(bfs(graph9, 'A', 'X'), null, 'BFS Test 9: Non-existent target vertex');

    // Test Case 10: Linear graph
    const graph10 = new Graph();
    ['1', '2', '3', '4', '5'].forEach(v => graph10.addVertex(v));
    graph10.addEdge('1', '2');
    graph10.addEdge('2', '3');
    graph10.addEdge('3', '4');
    graph10.addEdge('4', '5');
    assert.deepStrictEqual(bfs(graph10, '1', '5'), ['1', '2', '3', '4', '5'], 'BFS Test 10: Linear graph 1-5');

    // Test Case 11: Star graph
    const graph11 = new Graph();
    ['center', 'A', 'B', 'C', 'D'].forEach(v => graph11.addVertex(v));
    graph11.addEdge('center', 'A');
    graph11.addEdge('center', 'B');
    graph11.addEdge('center', 'C');
    graph11.addEdge('center', 'D');
    assert.deepStrictEqual(bfs(graph11, 'center', 'D'), ['center', 'D'], 'BFS Test 11: Star graph center-D');
    assert.deepStrictEqual(bfs(graph11, 'A', 'D'), ['A', 'center', 'D'], 'BFS Test 11.2: Star graph A-D');
}

module.exports = {
    run
};
```