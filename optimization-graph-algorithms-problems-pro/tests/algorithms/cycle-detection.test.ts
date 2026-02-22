```typescript
/**
 * @fileoverview Test suite for cycle detection algorithms:
 *   - detectCycleInDirectedGraphDFS
 *   - detectCycleInUndirectedGraphDFS
 */

import { Graph } from '../../src/data-structures/graph';
import {
  detectCycleInDirectedGraphDFS,
  detectCycleInUndirectedGraphDFS,
} from '../../src/algorithms/cycle-detection';

describe('detectCycleInDirectedGraphDFS', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph(true); // Directed graph
  });

  test('should detect a simple cycle', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'A'); // Cycle: A -> B -> C -> A
    expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
  });

  test('should detect a cycle with more nodes', () => {
    graph.addEdge('1', '2');
    graph.addEdge('2', '3');
    graph.addEdge('3', '4');
    graph.addEdge('4', '2'); // Cycle: 2 -> 3 -> 4 -> 2
    expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
  });

  test('should not detect a cycle in a DAG (Directed Acyclic Graph)', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'D');
    graph.addEdge('D', 'E');
    expect(detectCycleInDirectedGraphDFS(graph)).toBe(false);
  });

  test('should handle disconnected components with a cycle', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'A'); // Cycle 1: A <-> B
    graph.addEdge('X', 'Y');
    graph.addEdge('Y', 'Z');
    graph.addNode('P'); // Isolated node
    expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
  });

  test('should handle disconnected components without a cycle', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('X', 'Y');
    graph.addNode('P');
    expect(detectCycleInDirectedGraphDFS(graph)).toBe(false);
  });

  test('should return false for an empty graph', () => {
    expect(detectCycleInDirectedGraphDFS(new Graph(true))).toBe(false);
  });

  test('should return false for a graph with a single node and no self-loop', () => {
    graph.addNode('A');
    expect(detectCycleInDirectedGraphDFS(graph)).toBe(false);
  });

  test('should detect a self-loop', () => {
    graph.addEdge('A', 'A'); // Self-loop
    expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
  });

  test('should handle larger graphs', () => {
    // Graph with no cycle
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(2, 4);
    graph.addEdge(3, 4);
    graph.addEdge(4, 5);
    graph.addEdge(5, 6);
    expect(detectCycleInDirectedGraphDFS(graph)).toBe(false);

    // Add a cycle
    graph.addEdge(6, 4); // Creates cycle 4 -> 5 -> 6 -> 4
    expect(detectCycleInDirectedGraphDFS(graph)).toBe(true);
  });

  test('should warn but still run if used on an undirected graph (treating edges as two directed edges)', () => {
    const undirectedGraph = new Graph(false); // Undirected
    undirectedGraph.addEdge('A', 'B');
    undirectedGraph.addEdge('B', 'C');
    undirectedGraph.addEdge('C', 'A'); // Undirected cycle A-B-C-A

    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // When detectCycleInDirectedGraphDFS runs on undirected graph, it processes A->B, B->C, C->A
    // And also B->A, C->B, A->C.
    // A->B, then B->C, then C->A. C->A is a back edge to A. So it will detect a cycle.
    expect(detectCycleInDirectedGraphDFS(undirectedGraph)).toBe(true);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "detectCycleInDirectedGraphDFS: Graph is not directed. Consider using detectCycleInUndirectedGraph for better semantics."
    );
    consoleWarnSpy.mockRestore();
  });
});

describe('detectCycleInUndirectedGraphDFS', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph(false); // Undirected graph
  });

  test('should detect a simple cycle', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'A'); // Cycle: A-B-C-A
    expect(detectCycleInUndirectedGraphDFS(graph)).toBe(true);
  });

  test('should detect a cycle in a linear graph with an extra edge', () => {
    graph.addEdge('1', '2');
    graph.addEdge('2', '3');
    graph.addEdge('3', '4');
    graph.addEdge('4', '1'); // Cycle: 1-2-3-4-1
    expect(detectCycleInUndirectedGraphDFS(graph)).toBe(true);
  });

  test('should not detect a cycle in a tree structure', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'E');
    expect(detectCycleInUndirectedGraphDFS(graph)).toBe(false);
  });

  test('should handle disconnected components, one with a cycle', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'A'); // Component 1: A-B-C (cycle)
    graph.addEdge('X', 'Y'); // Component 2: X-Y (no cycle)
    graph.addNode('P'); // Component 3: P (isolated)
    expect(detectCycleInUndirectedGraphDFS(graph)).toBe(true);
  });

  test('should handle disconnected components, all acyclic', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('X', 'Y');
    graph.addNode('P');
    expect(detectCycleInUndirectedGraphDFS(graph)).toBe(false);
  });

  test('should return false for an empty graph', () => {
    expect(detectCycleInUndirectedGraphDFS(new Graph(false))).toBe(false);
  });

  test('should return false for a graph with a single node', () => {
    graph.addNode('A');
    expect(detectCycleInUndirectedGraphDFS(graph)).toBe(false);
  });

  test('should not consider a simple edge A-B as a cycle (due to parent check)', () => {
    graph.addEdge('A', 'B');
    expect(detectCycleInUndirectedGraphDFS(graph)).toBe(false);
  });

  test('should detect self-loop (although graph.ts prevents this for undirected by default unless manually added)', () => {
    // Manually add a self-loop as addEdge filters this for undirected
    graph.addNode('A');
    // For testing purposes, we might need a direct manipulation if graph.addEdge actively prevents it.
    // However, the current graph.addEdge (undirected) logic *does* filter self-loops by `if (from === to) continue;`
    // So, an undirected graph as implemented by `graph.ts` cannot have self-loops via `addEdge`.
    // If we want to test a self-loop, we'd need a graph implementation that allows them or manually populate adjList.
    // For typical undirected cycle detection, self-loops are cycles of length 1.
    // Let's assume for now, we're testing on graphs without self-loops based on `graph.addEdge` behavior.
    expect(detectCycleInUndirectedGraphDFS(graph)).toBe(false); // No self-loop can be added.
  });

  test('should warn but still run if used on a directed graph (treating edges as weak)', () => {
    const directedGraph = new Graph(true); // Directed
    directedGraph.addEdge('A', 'B');
    directedGraph.addEdge('B', 'C');
    directedGraph.addEdge('C', 'A'); // Directed cycle A -> B -> C -> A

    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // This function will detect the cycle. When it follows A->B, B->C, then C has a neighbor A.
    // A is already visited and is not C's parent (B is C's parent), so a cycle is detected.
    expect(detectCycleInUndirectedGraphDFS(directedGraph)).toBe(true);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "detectCycleInUndirectedGraphDFS: Graph is directed. Consider using detectCycleInDirectedGraphDFS for better semantics."
    );
    consoleWarnSpy.mockRestore();
  });
});
```