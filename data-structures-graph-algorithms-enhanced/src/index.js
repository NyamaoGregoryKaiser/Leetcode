```javascript
/**
 * src/index.js
 * Exports all graph data structures and algorithms for easy access.
 */

// Data Structures
const Graph = require('./data_structures/Graph');
const PriorityQueue = require('./data_structures/PriorityQueue'); // Useful for Dijkstra's

// Algorithms
const bfs = require('./algorithms/bfs');
const topologicalSort = require('./algorithms/topologicalSort');
const { dijkstra, reconstructPath } = require('./algorithms/dijkstra');
const { detectCycleDirected, detectCycleUndirected } = require('./algorithms/cycleDetection');

module.exports = {
    // Data Structures
    Graph,
    PriorityQueue,

    // Algorithms
    bfs,
    topologicalSort,
    dijkstra,
    reconstructPath, // Helper for Dijkstra's
    detectCycleDirected,
    detectCycleUndirected,
};
```