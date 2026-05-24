/**
 * tests/algorithms/dfs-cycle-detection.test.ts
 * Tests for directed graph cycle detection using DFS.
 */

import { Graph } from '@data-structures/graph';
import { detectCycleInDirectedGraphDFS, detectCycleInDirectedGraphDFSIterative } from '@algorithms/dfs-cycle-detection';

// Helper to run both recursive and iterative versions
const runTests = (detectCycleFn: (graph: Graph<number>) => boolean, name: string) => {
  describe(`${name} (Cycle Detection in Directed Graph)`, () => {
    test('should detect a simple cycle', () => {
      const graph = new Graph(true, false); // Directed, unweighted
      graph.addEdge(1, 2);
      graph.addEdge(2, 3);
      graph.addEdge(3, 1); // Cycle: 1 -> 2 -> 3 -> 1
      expect(detectCycleFn(graph)).toBe(true);
    });

    test('should detect a self-loop cycle', () => {
      const graph = new Graph(true, false);
      graph.addEdge(1, 1); // Cycle: 1 -> 1
      expect(detectCycleFn(graph)).toBe(true);
    });

    test('should detect a cycle in a larger graph', () => {
      const graph = new Graph(true, false);
      graph.addEdge(1, 2);
      graph.addEdge(2, 3);
      graph.addEdge(3, 4);
      graph.addEdge(4, 2); // Cycle: 2 -> 3 -> 4 -> 2
      graph.addEdge(1, 5);
      graph.addEdge(5, 6);
      expect(detectCycleFn(graph)).toBe(true);
    });

    test('should detect a cycle with multiple paths', () => {
      const graph = new Graph(true, false);
      graph.addEdge(1, 2);
      graph.addEdge(1, 3);
      graph.addEdge(2, 4);
      graph.addEdge(3, 4);
      graph.addEdge(4, 1); // Cycle: 1 -> 2 -> 4 -> 1 AND 1 -> 3 -> 4 -> 1
      expect(detectCycleFn(graph)).toBe(true);
    });

    test('should detect a cycle in a disconnected graph component', () => {
      const graph = new Graph(true, false);
      // Component 1 (acyclic)
      graph.addEdge(1, 2);
      graph.addEdge(2, 3);
      // Component 2 (cyclic)
      graph.addEdge(4, 5);
      graph.addEdge(5, 6);
      graph.addEdge(6, 4);
      expect(detectCycleFn(graph)).toBe(true);
    });

    test('should return false for an acyclic graph (DAG)', () => {
      const graph = new Graph(true, false);
      graph.addEdge(1, 2);
      graph.addEdge(1, 3);
      graph.addEdge(2, 4);
      graph.addEdge(3, 4);
      graph.addEdge(4, 5);
      expect(detectCycleFn(graph)).toBe(false);
    });

    test('should return false for a single node graph', () => {
      const graph = new Graph(true, false);
      graph.addNode(1);
      expect(detectCycleFn(graph)).toBe(false);
    });

    test('should return false for an empty graph', () => {
      const graph = new Graph(true, false);
      expect(detectCycleFn(graph)).toBe(false);
    });

    test('should return false for a graph with no edges', () => {
      const graph = new Graph(true, false);
      graph.addNode(1);
      graph.addNode(2);
      graph.addNode(3);
      expect(detectCycleFn(graph)).toBe(false);
    });

    test('should handle graphs with string node IDs', () => {
      const graph = new Graph<string>(true, false);
      graph.addEdge("A", "B");
      graph.addEdge("B", "C");
      graph.addEdge("C", "A");
      expect(detectCycleFn(graph)).toBe(true);

      const acyclicGraph = new Graph<string>(true, false);
      acyclicGraph.addEdge("X", "Y");
      acyclicGraph.addEdge("Y", "Z");
      expect(detectCycleFn(acyclicGraph)).toBe(false);
    });

    test('should work with a longer cycle', () => {
      const graph = new Graph(true, false);
      graph.addEdge(0, 1);
      graph.addEdge(1, 2);
      graph.addEdge(2, 3);
      graph.addEdge(3, 4);
      graph.addEdge(4, 5);
      graph.addEdge(5, 0); // Long cycle
      expect(detectCycleFn(graph)).toBe(true);
    });

    test('should not mistake divergent paths as cycles', () => {
      const graph = new Graph(true, false);
      graph.addEdge(1, 2);
      graph.addEdge(1, 3);
      graph.addEdge(2, 4);
      graph.addEdge(3, 4);
      // No path from 4 back to 1, 2, or 3
      expect(detectCycleFn(graph)).toBe(false);
    });
  });
};

runTests(detectCycleInDirectedGraphDFS, 'Recursive DFS');
runTests(detectCycleInDirectedGraphDFSIterative, 'Iterative DFS');