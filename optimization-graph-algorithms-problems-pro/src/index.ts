```typescript
/**
 * @fileoverview Main entry point for the graph algorithms project.
 * Exports all algorithms and data structures for easy access.
 * Can also be used to demonstrate a simple example.
 */

import { Graph } from './data-structures';
import { shortestPathBFS, countConnectedComponentsBFS } from './algorithms/bfs';
import { dijkstra, reconstructDijkstraPath } from './algorithms/dijkstra';
import { detectCycleInDirectedGraphDFS, detectCycleInUndirectedGraphDFS } from './algorithms/cycle-detection';
import { topologicalSortKahn, topologicalSortDFS } from './algorithms/topological-sort';

export * from './data-structures';
export * from './algorithms';
export * from './utils';

// Simple demonstration function
function runDemo() {
  console.log("--- Graph Algorithms Demo ---");

  // --- BFS Demo: Shortest Path in Unweighted Graph ---
  console.log("\n--- BFS: Shortest Path (Unweighted) ---");
  const graphBFS = new Graph();
  graphBFS.addEdge('A', 'B');
  graphBFS.addEdge('A', 'C');
  graphBFS.addEdge('B', 'D');
  graphBFS.addEdge('C', 'E');
  graphBFS.addEdge('D', 'E');
  graphBFS.addEdge('D', 'F');
  console.log(graphBFS.toString());

  const path1 = shortestPathBFS(graphBFS, 'A', 'F');
  console.log(`Shortest path from A to F: ${path1 ? path1.join(' -> ') : 'No path'}`); // Expected: A -> B -> D -> F
  const path2 = shortestPathBFS(graphBFS, 'A', 'A');
  console.log(`Shortest path from A to A: ${path2 ? path2.join(' -> ') : 'No path'}`); // Expected: A
  const path3 = shortestPathBFS(graphBFS, 'X', 'F'); // Non-existent start node
  console.log(`Shortest path from X to F: ${path3 ? path3.join(' -> ') : 'No path'}`); // Expected: No path

  // --- BFS Demo: Connected Components ---
  console.log("\n--- BFS: Connected Components (Undirected) ---");
  const componentGraph = new Graph(false); // Undirected
  componentGraph.addEdge(1, 2);
  componentGraph.addEdge(1, 3);
  componentGraph.addEdge(4, 5);
  componentGraph.addNode(6); // Isolated node
  console.log(componentGraph.toString());
  console.log(`Number of connected components: ${countConnectedComponentsBFS(componentGraph)}`); // Expected: 3

  // --- Dijkstra's Demo: Shortest Path in Weighted Graph ---
  console.log("\n--- Dijkstra's Algorithm (Weighted Shortest Path) ---");
  const graphDijkstra = new Graph(true); // Directed
  graphDijkstra.addEdge('A', 'B', 4);
  graphDijkstra.addEdge('A', 'C', 2);
  graphDijkstra.addEdge('B', 'E', 3);
  graphDijkstra.addEdge('C', 'D', 2);
  graphDijkstra.addEdge('C', 'F', 4);
  graphDijkstra.addEdge('D', 'E', 3);
  graphDijkstra.addEdge('F', 'E', 1);
  graphDijkstra.addNode('G'); // Disconnected
  console.log(graphDijkstra.toString());

  const { distances, paths } = dijkstra(graphDijkstra, 'A');
  console.log('Distances from A:', Object.fromEntries(distances));
  // Expected distances: A:0, B:4, C:2, D:4, E:5, F:6, G:Infinity
  console.log('Paths map from A:', Object.fromEntries(paths));

  const dijkstraPath = reconstructDijkstraPath('A', 'E', paths);
  console.log(`Dijkstra Path A to E: ${dijkstraPath ? dijkstraPath.join(' -> ') : 'No path'}`); // Expected: A -> C -> D -> E (or A -> C -> F -> E)
  const dijkstraPathToG = reconstructDijkstraPath('A', 'G', paths);
  console.log(`Dijkstra Path A to G: ${dijkstraPathToG ? dijkstraPathToG.join(' -> ') : 'No path'}`); // Expected: No path

  // --- Cycle Detection Demo ---
  console.log("\n--- Cycle Detection (Directed Graph) ---");
  const graphDirectedCycle = new Graph(true);
  graphDirectedCycle.addEdge('1', '2');
  graphDirectedCycle.addEdge('2', '3');
  graphDirectedCycle.addEdge('3', '1'); // Cycle: 1 -> 2 -> 3 -> 1
  graphDirectedCycle.addEdge('3', '4');
  console.log(graphDirectedCycle.toString());
  console.log(`Cycle detected in directed graph: ${detectCycleInDirectedGraphDFS(graphDirectedCycle)}`); // Expected: true

  const graphDirectedNoCycle = new Graph(true);
  graphDirectedNoCycle.addEdge('1', '2');
  graphDirectedNoCycle.addEdge('2', '3');
  graphDirectedNoCycle.addEdge('1', '3');
  console.log(graphDirectedNoCycle.toString());
  console.log(`Cycle detected in directed graph (no cycle): ${detectCycleInDirectedGraphDFS(graphDirectedNoCycle)}`); // Expected: false

  console.log("\n--- Cycle Detection (Undirected Graph) ---");
  const graphUndirectedCycle = new Graph(false);
  graphUndirectedCycle.addEdge('A', 'B');
  graphUndirectedCycle.addEdge('B', 'C');
  graphUndirectedCycle.addEdge('C', 'A'); // Cycle: A-B-C-A
  graphUndirectedCycle.addEdge('C', 'D');
  console.log(graphUndirectedCycle.toString());
  console.log(`Cycle detected in undirected graph: ${detectCycleInUndirectedGraphDFS(graphUndirectedCycle)}`); // Expected: true

  const graphUndirectedNoCycle = new Graph(false);
  graphUndirectedNoCycle.addEdge('A', 'B');
  graphUndirectedNoCycle.addEdge('B', 'C');
  console.log(graphUndirectedNoCycle.toString());
  console.log(`Cycle detected in undirected graph (no cycle): ${detectCycleInUndirectedGraphDFS(graphUndirectedNoCycle)}`); // Expected: false

  // --- Topological Sort Demo ---
  console.log("\n--- Topological Sort (Kahn's Algorithm - BFS based) ---");
  const graphTS = new Graph(true);
  graphTS.addEdge('A', 'C');
  graphTS.addEdge('B', 'C');
  graphTS.addEdge('C', 'D');
  graphTS.addEdge('C', 'E');
  graphTS.addEdge('D', 'F');
  graphTS.addEdge('E', 'F');
  console.log(graphTS.toString());
  const tsKahn = topologicalSortKahn(graphTS);
  console.log(`Kahn's Topological Sort: ${tsKahn ? tsKahn.join(' -> ') : 'Cycle detected'}`); // Expected: e.g., A -> B -> C -> D -> E -> F (order of A/B, D/E might vary)

  console.log("\n--- Topological Sort (DFS based) ---");
  const tsDFS = topologicalSortDFS(graphTS);
  console.log(`DFS Topological Sort: ${tsDFS ? tsDFS.join(' -> ') : 'Cycle detected'}`); // Expected: e.g., B -> A -> C -> D -> E -> F (order of B/A might vary)

  // Demo cycle in TS
  const graphTSCycle = new Graph(true);
  graphTSCycle.addEdge('1', '2');
  graphTSCycle.addEdge('2', '3');
  graphTSCycle.addEdge('3', '1'); // Cycle
  const tsKahnCycle = topologicalSortKahn(graphTSCycle);
  console.log(`\nKahn's Topological Sort (with cycle): ${tsKahnCycle ? tsKahnCycle.join(' -> ') : 'Cycle detected'}`); // Expected: Cycle detected
  const tsDFSCycle = topologicalSortDFS(graphTSCycle);
  console.log(`DFS Topological Sort (with cycle): ${tsDFSCycle ? tsDFSCycle.join(' -> ') : 'Cycle detected'}`); // Expected: Cycle detected

}

// Run the demo if this file is executed directly
if (require.main === module) {
  runDemo();
}
```