```typescript
/**
 * @fileoverview Test suite for Dijkstra's Shortest Path Algorithm.
 */

import { Graph } from '../../src/data-structures/graph';
import { dijkstra, reconstructDijkstraPath } from '../../src/algorithms/dijkstra';

describe('dijkstra', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph(true); // Directed graph
  });

  test('should find shortest paths in a simple directed graph', () => {
    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'D', 5);
    graph.addEdge('C', 'D', 2);
    graph.addEdge('D', 'E', 1);

    const { distances, paths } = dijkstra(graph, 'A');

    expect(distances.get('A')).toBe(0);
    expect(distances.get('B')).toBe(4);
    expect(distances.get('C')).toBe(2);
    expect(distances.get('D')).toBe(4); // A -> C (2) -> D (2) = 4 (shorter than A -> B (4) -> D (5) = 9)
    expect(distances.get('E')).toBe(5); // A -> C (2) -> D (2) -> E (1) = 5
    expect(distances.get('F')).toBe(Infinity); // Non-existent node

    expect(paths.get('A')).toBeNull();
    expect(paths.get('B')).toBe('A');
    expect(paths.get('C')).toBe('A');
    expect(paths.get('D')).toBe('C');
    expect(paths.get('E')).toBe('D');
  });

  test('should find shortest paths in an undirected graph (treated as directed with reverse edges)', () => {
    const undirectedGraph = new Graph(false); // Undirected graph
    undirectedGraph.addEdge('A', 'B', 4);
    undirectedGraph.addEdge('A', 'C', 2);
    undirectedGraph.addEdge('B', 'D', 5);
    undirectedGraph.addEdge('C', 'D', 2);
    undirectedGraph.addEdge('D', 'E', 1);

    const { distances, paths } = dijkstra(undirectedGraph, 'A');

    expect(distances.get('A')).toBe(0);
    expect(distances.get('B')).toBe(4); // A-B(4)
    expect(distances.get('C')).toBe(2); // A-C(2)
    expect(distances.get('D')).toBe(4); // A-C(2)-D(2)
    expect(distances.get('E')).toBe(5); // A-C(2)-D(2)-E(1)

    expect(paths.get('A')).toBeNull();
    expect(paths.get('B')).toBe('A');
    expect(paths.get('C')).toBe('A');
    expect(paths.get('D')).toBe('C');
    expect(paths.get('E')).toBe('D');

    // Test reverse path
    const { distances: distFromE, paths: pathsFromE } = dijkstra(undirectedGraph, 'E');
    expect(distFromE.get('A')).toBe(5); // E-D(1)-C(2)-A(2) or E-D(1)-B(5)-A(4)
    expect(pathsFromE.get('A')).toBe('C');
  });

  test('should handle disconnected nodes', () => {
    graph.addNode('A');
    graph.addNode('B'); // Isolated
    graph.addNode('C'); // Isolated

    const { distances, paths } = dijkstra(graph, 'A');

    expect(distances.get('A')).toBe(0);
    expect(distances.get('B')).toBe(Infinity);
    expect(distances.get('C')).toBe(Infinity);

    expect(paths.get('A')).toBeNull();
    expect(paths.get('B')).toBeNull();
    expect(paths.get('C')).toBeNull();
  });

  test('should handle a graph with a single node', () => {
    graph.addNode('A');
    const { distances, paths } = dijkstra(graph, 'A');
    expect(distances.get('A')).toBe(0);
    expect(paths.get('A')).toBeNull();
  });

  test('should return empty maps for a non-existent start node', () => {
    graph.addNode('A');
    const { distances, paths } = dijkstra(graph, 'X');
    expect(distances.size).toBe(0);
    expect(paths.size).toBe(0);
  });

  test('should handle complex graph with multiple paths', () => {
    graph.addEdge('A', 'B', 1);
    graph.addEdge('A', 'C', 4);
    graph.addEdge('B', 'C', 2);
    graph.addEdge('B', 'D', 5);
    graph.addEdge('C', 'D', 1);
    graph.addEdge('D', 'E', 3);
    graph.addEdge('F', 'E', 1); // F is disconnected from A initially

    // Add F to graph, but not connected to A's component
    graph.addNode('F');

    const { distances, paths } = dijkstra(graph, 'A');

    expect(distances.get('A')).toBe(0);
    expect(distances.get('B')).toBe(1); // A -> B (1)
    expect(distances.get('C')).toBe(3); // A -> B (1) -> C (2) (shorter than A -> C (4))
    expect(distances.get('D')).toBe(4); // A -> B (1) -> C (2) -> D (1)
    expect(distances.get('E')).toBe(7); // A -> B (1) -> C (2) -> D (1) -> E (3)
    expect(distances.get('F')).toBe(Infinity);

    expect(paths.get('A')).toBeNull();
    expect(paths.get('B')).toBe('A');
    expect(paths.get('C')).toBe('B');
    expect(paths.get('D')).toBe('C');
    expect(paths.get('E')).toBe('D');
    expect(paths.get('F')).toBeNull();
  });

  test('should handle graph with zero weight edges (still non-negative)', () => {
    graph.addEdge('A', 'B', 0);
    graph.addEdge('A', 'C', 5);
    graph.addEdge('B', 'C', 1);

    const { distances } = dijkstra(graph, 'A');
    expect(distances.get('A')).toBe(0);
    expect(distances.get('B')).toBe(0); // A -> B (0)
    expect(distances.get('C')).toBe(1); // A -> B (0) -> C (1) (shorter than A -> C (5))
  });

  test('should log a warning for negative edge weights but still attempt to run', () => {
    graph.addEdge('A', 'B', 1);
    graph.addEdge('B', 'C', -3); // Negative weight
    graph.addEdge('A', 'C', 10);

    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const { distances } = dijkstra(graph, 'A');

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Negative edge weight detected")
    );
    // Dijkstra might give incorrect results with negative weights
    expect(distances.get('A')).toBe(0);
    expect(distances.get('B')).toBe(1);
    expect(distances.get('C')).toBe(-2); // Incorrect, Dijkstra doesn't handle negative cycles or paths correctly here

    consoleWarnSpy.mockRestore();
  });
});

describe('reconstructDijkstraPath', () => {
  let graph: Graph;
  let paths: Map<NodeId, NodeId | null>;

  beforeEach(() => {
    graph = new Graph(true);
    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'D', 5);
    graph.addEdge('C', 'D', 2);
    graph.addEdge('D', 'E', 1);
    graph.addEdge('A', 'Z', 10); // Node Z exists but won't be part of some paths
    const result = dijkstra(graph, 'A');
    paths = result.paths;
  });

  test('should reconstruct a simple path correctly', () => {
    expect(reconstructDijkstraPath('A', 'E', paths)).toEqual(['A', 'C', 'D', 'E']);
  });

  test('should reconstruct path for start node to itself', () => {
    expect(reconstructDijkstraPath('A', 'A', paths)).toEqual(['A']);
  });

  test('should return null if target node is not reachable', () => {
    expect(reconstructDijkstraPath('A', 'X', paths)).toBeNull(); // X is not in graph
    expect(reconstructDijkstraPath('A', 'Y', paths)).toBeNull(); // Y is not in graph
  });

  test('should return null if target node is in graph but not reachable from start', () => {
    graph.addNode('F'); // Add isolated node
    const { paths: newPaths } = dijkstra(graph, 'A'); // Recalculate paths
    expect(reconstructDijkstraPath('A', 'F', newPaths)).toBeNull(); // F is isolated
  });

  test('should reconstruct path for a direct neighbor', () => {
    expect(reconstructDijkstraPath('A', 'B', paths)).toEqual(['A', 'B']);
    expect(reconstructDijkstraPath('A', 'C', paths)).toEqual(['A', 'C']);
  });

  test('should return null for non-existent start node (dijkstra would have returned empty maps)', () => {
    const emptyPaths = new Map<NodeId, NodeId | null>();
    expect(reconstructDijkstraPath('X', 'A', emptyPaths)).toBeNull();
  });
});
```