```typescript
/**
 * @fileoverview Test suite for the Graph data structure.
 */

import { Graph, NodeId, Edge } from '../../src/data-structures/graph';

describe('Graph (Undirected)', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph(false); // Undirected graph
  });

  test('should add nodes correctly', () => {
    graph.addNode('A');
    graph.addNode('B');
    expect(graph.hasNode('A')).toBe(true);
    expect(graph.hasNode('B')).toBe(true);
    expect(graph.hasNode('C')).toBe(false);
    expect(graph.getNodes()).toEqual(expect.arrayContaining(['A', 'B']));
    expect(graph.getNodes()).toHaveLength(2);
  });

  test('should add edges correctly for undirected graph', () => {
    graph.addEdge('A', 'B');
    expect(graph.hasEdge('A', 'B')).toBe(true);
    expect(graph.hasEdge('B', 'A')).toBe(true); // Undirected implies reverse edge

    const neighborsA = graph.getNeighbors('A');
    expect(neighborsA).toEqual([{ to: 'B', weight: 1 }]);
    const neighborsB = graph.getNeighbors('B');
    expect(neighborsB).toEqual([{ to: 'A', weight: 1 }]);
  });

  test('should add weighted edges correctly', () => {
    graph.addEdge('A', 'B', 5);
    expect(graph.getEdgeWeight('A', 'B')).toBe(5);
    expect(graph.getEdgeWeight('B', 'A')).toBe(5); // Undirected
  });

  test('should handle multiple edges from a node', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C', 10);
    const neighborsA = graph.getNeighbors('A');
    expect(neighborsA).toEqual(expect.arrayContaining([{ to: 'B', weight: 1 }, { to: 'C', weight: 10 }]));
    expect(neighborsA).toHaveLength(2);
  });

  test('should not add duplicate nodes', () => {
    graph.addNode('A');
    graph.addNode('A');
    expect(graph.getNodes()).toEqual(['A']);
    expect(graph.getNodes()).toHaveLength(1);
  });

  test('should not add duplicate edges between the same two nodes (single edge allowed)', () => {
    graph.addEdge('A', 'B', 5);
    graph.addEdge('A', 'B', 10); // Should not add, or update the existing one based on implementation.
    // Our implementation currently just adds if not present, so second add is ignored.
    expect(graph.getNeighbors('A')).toEqual([{ to: 'B', weight: 5 }]);
    expect(graph.getNeighbors('B')).toEqual([{ to: 'A', weight: 5 }]);
  });

  test('should return empty array for non-existent node neighbors', () => {
    expect(graph.getNeighbors('Z')).toEqual([]);
  });

  test('should return correct edge weight', () => {
    graph.addEdge('A', 'B', 7);
    expect(graph.getEdgeWeight('A', 'B')).toBe(7);
    expect(graph.getEdgeWeight('B', 'A')).toBe(7);
    expect(graph.getEdgeWeight('A', 'C')).toBeUndefined();
  });

  test('should remove node correctly', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('A', 'C');
    expect(graph.hasNode('B')).toBe(true);
    expect(graph.hasEdge('A', 'B')).toBe(true);
    expect(graph.hasEdge('B', 'C')).toBe(true);

    graph.removeNode('B');
    expect(graph.hasNode('B')).toBe(false);
    expect(graph.hasEdge('A', 'B')).toBe(false);
    expect(graph.hasEdge('B', 'A')).toBe(false);
    expect(graph.hasEdge('B', 'C')).toBe(false);
    expect(graph.hasEdge('C', 'B')).toBe(false);
    expect(graph.getNeighbors('A')).toEqual([{ to: 'C', weight: 1 }]);
    expect(graph.getNeighbors('C')).toEqual([{ to: 'A', weight: 1 }]);
  });

  test('should remove edge correctly', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    expect(graph.hasEdge('A', 'B')).toBe(true);
    expect(graph.hasEdge('B', 'A')).toBe(true);

    graph.removeEdge('A', 'B');
    expect(graph.hasEdge('A', 'B')).toBe(false);
    expect(graph.hasEdge('B', 'A')).toBe(false);
    expect(graph.getNeighbors('A')).toEqual([{ to: 'C', weight: 1 }]);
    expect(graph.getNeighbors('B')).toEqual([]);
  });

  test('should return all nodes', () => {
    graph.addNode('A');
    graph.addNode('B');
    graph.addNode('C');
    expect(graph.getNodes().sort()).toEqual(['A', 'B', 'C'].sort());
  });

  test('should return empty nodes array for empty graph', () => {
    expect(graph.getNodes()).toEqual([]);
  });

  test('isDirected should return false for undirected graph', () => {
    expect(graph.isDirected()).toBe(false);
  });

  test('should calculate in-degree for undirected graph', () => {
    graph.addEdge('A', 'B'); // A-B
    graph.addEdge('B', 'C'); // B-C
    graph.addNode('D'); // D (isolated)

    expect(graph.getInDegree('A')).toBe(1); // B -> A, B edges
    expect(graph.getInDegree('B')).toBe(2); // A -> B, C -> B
    expect(graph.getInDegree('C')).toBe(1); // B -> C
    expect(graph.getInDegree('D')).toBe(0); // D has no incoming edges (undirected)
    expect(graph.getInDegree('X')).toBe(0); // Non-existent node
  });

  test('should calculate all in-degrees for undirected graph', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addNode('D'); // Isolated

    const inDegrees = graph.getAllInDegrees();
    expect(inDegrees.get('A')).toBe(1);
    expect(inDegrees.get('B')).toBe(2);
    expect(inDegrees.get('C')).toBe(1);
    expect(inDegrees.get('D')).toBe(0);
    expect(inDegrees.size).toBe(4);
  });
});

describe('Graph (Directed)', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph(true); // Directed graph
  });

  test('should add edges correctly for directed graph', () => {
    graph.addEdge('A', 'B');
    expect(graph.hasEdge('A', 'B')).toBe(true);
    expect(graph.hasEdge('B', 'A')).toBe(false); // Directed implies no reverse edge by default

    const neighborsA = graph.getNeighbors('A');
    expect(neighborsA).toEqual([{ to: 'B', weight: 1 }]);
    const neighborsB = graph.getNeighbors('B');
    expect(neighborsB).toEqual([]); // No outgoing edges from B yet
  });

  test('should add weighted edges correctly', () => {
    graph.addEdge('A', 'B', 5);
    expect(graph.getEdgeWeight('A', 'B')).toBe(5);
    expect(graph.getEdgeWeight('B', 'A')).toBeUndefined(); // Directed
  });

  test('should remove edge correctly', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    expect(graph.hasEdge('A', 'B')).toBe(true);

    graph.removeEdge('A', 'B');
    expect(graph.hasEdge('A', 'B')).toBe(false);
    expect(graph.hasEdge('B', 'A')).toBe(false); // Still false as it was directed
    expect(graph.getNeighbors('A')).toEqual([{ to: 'C', weight: 1 }]);
  });

  test('should remove node correctly in directed graph', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'A'); // Cycle
    graph.addEdge('X', 'B'); // X points to B

    expect(graph.hasNode('B')).toBe(true);
    expect(graph.hasEdge('A', 'B')).toBe(true);
    expect(graph.hasEdge('X', 'B')).toBe(true);

    graph.removeNode('B');

    expect(graph.hasNode('B')).toBe(false);
    expect(graph.hasEdge('A', 'B')).toBe(false);
    expect(graph.hasEdge('B', 'C')).toBe(false);
    expect(graph.hasEdge('X', 'B')).toBe(false);

    expect(graph.getNeighbors('A')).toEqual([]); // B was its only neighbor
    expect(graph.getNeighbors('C')).toEqual([{ to: 'A', weight: 1 }]);
    expect(graph.getNeighbors('X')).toEqual([]);
  });

  test('isDirected should return true for directed graph', () => {
    expect(graph.isDirected()).toBe(true);
  });

  test('should calculate in-degree for directed graph', () => {
    graph.addEdge('A', 'B'); // A -> B
    graph.addEdge('C', 'B'); // C -> B
    graph.addEdge('B', 'D'); // B -> D
    graph.addNode('E'); // E (isolated)

    expect(graph.getInDegree('A')).toBe(0); // No incoming
    expect(graph.getInDegree('B')).toBe(2); // A -> B, C -> B
    expect(graph.getInDegree('C')).toBe(0); // No incoming
    expect(graph.getInDegree('D')).toBe(1); // B -> D
    expect(graph.getInDegree('E')).toBe(0); // Isolated
    expect(graph.getInDegree('X')).toBe(0); // Non-existent node
  });

  test('should calculate all in-degrees for directed graph', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('C', 'B');
    graph.addEdge('B', 'D');
    graph.addNode('E');

    const inDegrees = graph.getAllInDegrees();
    expect(inDegrees.get('A')).toBe(0);
    expect(inDegrees.get('B')).toBe(2);
    expect(inDegrees.get('C')).toBe(0);
    expect(inDegrees.get('D')).toBe(1);
    expect(inDegrees.get('E')).toBe(0);
    expect(inDegrees.size).toBe(5);
  });

  test('should handle self-loops in in-degree calculation (directed)', () => {
    graph.addNode('A');
    graph.addEdge('A', 'A'); // Self-loop
    graph.addEdge('B', 'A'); // Another edge to A

    expect(graph.getInDegree('A')).toBe(2); // A->A and B->A
    expect(graph.getInDegree('B')).toBe(0);

    const inDegrees = graph.getAllInDegrees();
    expect(inDegrees.get('A')).toBe(2);
    expect(inDegrees.get('B')).toBe(0);
  });
});
```