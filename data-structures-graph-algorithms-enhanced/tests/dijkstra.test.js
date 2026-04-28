```javascript
const {
    Graph,
    dijkstra,
    reconstructPath
} = require('../src'); // Adjust path as needed

function run(assert) {
    console.log('Running Dijkstra\'s Algorithm Tests...');

    // Test Case 1: Simple weighted graph
    const graph1 = new Graph(true); // Directed
    graph1.addVertex('A');
    graph1.addVertex('B');
    graph1.addVertex('C');
    graph1.addEdge('A', 'B', 1);
    graph1.addEdge('B', 'C', 2);
    graph1.addEdge('A', 'C', 5);

    const {
        distances: dist1,
        paths: path1
    } = dijkstra(graph1, 'A');
    assert.deepStrictEqualMap(dist1, new Map([
        ['A', 0],
        ['B', 1],
        ['C', 3]
    ]), 'Dijkstra Test 1.1: Simple distances A->C');
    assert.deepStrictEqual(reconstructPath('A', 'C', path1), ['A', 'B', 'C'], 'Dijkstra Test 1.2: Simple path A->C');

    // Test Case 2: Undirected graph with multiple paths
    const graph2 = new Graph(false); // Undirected
    graph2.addVertex('A');
    graph2.addVertex('B');
    graph2.addVertex('C');
    graph2.addVertex('D');
    graph2.addEdge('A', 'B', 4);
    graph2.addEdge('A', 'C', 2);
    graph2.addEdge('B', 'D', 5);
    graph2.addEdge('C', 'D', 1);
    graph2.addEdge('C', 'B', 2);

    const {
        distances: dist2,
        paths: path2
    } = dijkstra(graph2, 'A');
    assert.deepStrictEqualMap(dist2, new Map([
        ['A', 0],
        ['B', 4], // A -> C (2) -> B (2) = 4, A -> B (4) = 4. Both valid.
        ['C', 2],
        ['D', 3] // A -> C (2) -> D (1) = 3
    ]), 'Dijkstra Test 2.1: Undirected graph distances A->D');
    assert.deepStrictEqual(reconstructPath('A', 'D', path2), ['A', 'C', 'D'], 'Dijkstra Test 2.2: Undirected path A->D');
    assert.deepStrictEqual(reconstructPath('A', 'B', path2), ['A', 'C', 'B'], 'Dijkstra Test 2.3: Undirected path A->B via C');


    // Test Case 3: Graph with unreachable nodes
    const graph3 = new Graph(true);
    graph3.addVertex('A');
    graph3.addVertex('B');
    graph3.addVertex('C');
    graph3.addVertex('D');
    graph3.addEdge('A', 'B', 1);
    // C and D are disconnected from A
    const {
        distances: dist3,
        paths: path3
    } = dijkstra(graph3, 'A');
    assert.deepStrictEqualMap(dist3, new Map([
        ['A', 0],
        ['B', 1],
        ['C', Infinity],
        ['D', Infinity]
    ]), 'Dijkstra Test 3.1: Distances with unreachable nodes');
    assert.strictEqual(reconstructPath('A', 'C', path3), null, 'Dijkstra Test 3.2: Path to unreachable node is null');


    // Test Case 4: Start and target are the same
    const graph4 = new Graph(true);
    graph4.addVertex('A');
    graph4.addVertex('B');
    graph4.addEdge('A', 'B', 10);
    const {
        distances: dist4,
        paths: path4
    } = dijkstra(graph4, 'A');
    assert.strictEqual(dist4.get('A'), 0, 'Dijkstra Test 4.1: Distance to self is 0');
    assert.deepStrictEqual(reconstructPath('A', 'A', path4), ['A'], 'Dijkstra Test 4.2: Path to self is just the vertex');

    // Test Case 5: Empty graph
    const graph5 = new Graph(true);
    assert.strictEqual(dijkstra(graph5, 'A'), null, 'Dijkstra Test 5: Empty graph with non-existent start');
    graph5.addVertex('A');
    const {
        distances: dist5_empty,
        paths: path5_empty
    } = dijkstra(graph5, 'A');
    assert.deepStrictEqualMap(dist5_empty, new Map([
        ['A', 0]
    ]), 'Dijkstra Test 5.1: Single vertex graph distance');
    assert.deepStrictEqual(reconstructPath('A', 'A', path5_empty), ['A'], 'Dijkstra Test 5.2: Single vertex graph path');


    // Test Case 6: Non-existent start vertex
    const graph6 = new Graph(true);
    graph6.addVertex('B');
    assert.strictEqual(dijkstra(graph6, 'A'), null, 'Dijkstra Test 6: Non-existent start vertex');

    // Test Case 7: Graph with 0-weight edges
    const graph7 = new Graph(true);
    graph7.addVertex('S');
    graph7.addVertex('A');
    graph7.addVertex('B');
    graph7.addEdge('S', 'A', 0);
    graph7.addEdge('A', 'B', 5);
    graph7.addEdge('S', 'B', 10);
    const {
        distances: dist7,
        paths: path7
    } = dijkstra(graph7, 'S');
    assert.deepStrictEqualMap(dist7, new Map([
        ['S', 0],
        ['A', 0],
        ['B', 5]
    ]), 'Dijkstra Test 7.1: Distances with zero-weight edges');
    assert.deepStrictEqual(reconstructPath('S', 'B', path7), ['S', 'A', 'B'], 'Dijkstra Test 7.2: Path with zero-weight edges');

    // Test Case 8: Larger graph from a textbook example
    // Graph from https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
    // (example for weighted undirected graph)
    const graph8 = new Graph(false); // Undirected
    ['0', '1', '2', '3', '4', '5', '6', '7', '8'].forEach(v => graph8.addVertex(v));
    graph8.addEdge('0', '1', 4);
    graph8.addEdge('0', '7', 8);
    graph8.addEdge('1', '2', 8);
    graph8.addEdge('1', '7', 11);
    graph8.addEdge('2', '3', 7);
    graph8.addEdge('2', '8', 2);
    graph8.addEdge('2', '5', 4);
    graph8.addEdge('3', '4', 9);
    graph8.addEdge('3', '5', 14);
    graph8.addEdge('4', '5', 10);
    graph8.addEdge('5', '6', 2);
    graph8.addEdge('6', '7', 1);
    graph8.addEdge('6', '8', 6);
    graph8.addEdge('7', '8', 7);

    const {
        distances: dist8,
        paths: path8
    } = dijkstra(graph8, '0');
    assert.deepStrictEqualMap(dist8, new Map([
        ['0', 0],
        ['1', 4],
        ['2', 12], // 0-7-6-5-2 (18) vs 0-1-2 (12)
        ['3', 19], // 0-1-2-3 (20) vs 0-7-6-5-3 (18+14=32) vs 0-1-2-5-3 (12+14=26) vs 0-7-6-5-2-3 (8+1+2+4+7=22)
        // Correct path 0-7-6-5-2-3 (8+1+2+4+7 = 22)  No, 0-1-2-3 = 4+8+7 = 19
        ['4', 21], // 0-1-2-3-4 (19+9 = 28) vs 0-7-6-5-4 (8+1+2+10 = 21)
        ['5', 11], // 0-7-6-5 (8+1+2 = 11)
        ['6', 9], // 0-7-6 (8+1 = 9)
        ['7', 8],
        ['8', 14] // 0-7-8 (8+7 = 15) vs 0-1-2-8 (4+8+2 = 14)
    ]), 'Dijkstra Test 8.1: Large graph distances from 0');
    assert.deepStrictEqual(reconstructPath('0', '4', path8), ['0', '7', '6', '5', '4'], 'Dijkstra Test 8.2: Large graph path 0->4');
    assert.deepStrictEqual(reconstructPath('0', '8', path8), ['0', '1', '2', '8'], 'Dijkstra Test 8.3: Large graph path 0->8');
}

module.exports = {
    run
};
```