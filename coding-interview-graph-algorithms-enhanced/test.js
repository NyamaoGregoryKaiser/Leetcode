```javascript
const Graph = require('./graph');
const {createGraphFromAdjacencyList} = require('./utils');

test('BFS finds shortest paths', () => {
  const adjList = {
    'A': [{vertex: 'B', weight:1}, {vertex: 'C', weight:1}],
    'B': [{vertex: 'D', weight:1}],
    'C': [{vertex: 'D', weight:1}],
    'D': []
  };
  const graph = createGraphFromAdjacencyList(adjList);
  const distances = graph.bfs('A');
  expect(distances['A']).toBe(0);
  expect(distances['B']).toBe(1);
  expect(distances['C']).toBe(1);
  expect(distances['D']).toBe(2);
});

// Add more tests for DFS, Dijkstra's, etc.

```