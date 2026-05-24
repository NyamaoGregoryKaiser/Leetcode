/**
 * tests/algorithms/bfs.test.ts
 * Tests for the BFS shortest path algorithms.
 */

import { Graph } from '@data-structures/graph';
import { bfsShortestPath, bfsShortestPathNodes } from '@algorithms/bfs';

describe('BFS Shortest Path Length (Unweighted Graph)', () => {
  let graph: Graph<number>;

  beforeEach(() => {
    graph = new Graph(false, false); // Undirected, unweighted
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(2, 4);
    graph.addEdge(3, 4);
    graph.addEdge(4, 5);
  });

  test('should find the shortest path length in a simple graph', () => {
    expect(bfsShortestPath(graph, 1, 5)).toBe(3); // Path: 1 -> 2 -> 4 -> 5 or 1 -> 3 -> 4 -> 5
  });

  test('should return 0 for startNode === endNode', () => {
    expect(bfsShortestPath(graph, 1, 1)).toBe(0);
    expect(bfsShortestPath(graph, 5, 5)).toBe(0);
  });

  test('should return 1 for direct neighbors', () => {
    expect(bfsShortestPath(graph, 1, 2)).toBe(1);
    expect(bfsShortestPath(graph, 4, 5)).toBe(1);
  });

  test('should return -1 if endNode is unreachable', () => {
    graph.addNode(6); // Disconnected node
    expect(bfsShortestPath(graph, 1, 6)).toBe(-1);

    const newGraph = new Graph(false, false);
    newGraph.addNode(1);
    newGraph.addNode(2);
    expect(bfsShortestPath(newGraph, 1, 2)).toBe(-1);
  });

  test('should handle graph with a single node', () => {
    const singleNodeGraph = new Graph(false, false);
    singleNodeGraph.addNode(1);
    expect(bfsShortestPath(singleNodeGraph, 1, 1)).toBe(0);
  });

  test('should handle empty graph', () => {
    const emptyGraph = new Graph(false, false);
    expect(bfsShortestPath(emptyGraph, 1, 2)).toBe(-1); // Nodes not found
  });

  test('should return -1 if startNode or endNode does not exist', () => {
    expect(bfsShortestPath(graph, 1, 99)).toBe(-1);
    expect(bfsShortestPath(graph, 99, 1)).toBe(-1);
    expect(bfsShortestPath(graph, 99, 100)).toBe(-1);
  });

  test('should work with a more complex graph', () => {
    const complexGraph = new Graph(false, false);
    complexGraph.addEdge(0, 1);
    complexGraph.addEdge(0, 2);
    complexGraph.addEdge(1, 3);
    complexGraph.addEdge(2, 3);
    complexGraph.addEdge(3, 4);
    complexGraph.addEdge(4, 5);
    complexGraph.addEdge(0, 5); // Direct path for 0 to 5 of length 1

    expect(bfsShortestPath(complexGraph, 0, 5)).toBe(1);
    expect(bfsShortestPath(complexGraph, 0, 4)).toBe(2); // 0 -> 1 -> 3 -> 4 (length 3, but 0->2->3->4 is also length 3)
    // Wait, 0 -> 5 is length 1. 0 -> 1 -> 3 -> 4. Or 0 -> 2 -> 3 -> 4. Both are length 3.
    // My previous assumption was 0->5. Let's trace.
    // 0 -> 5 (distance 1)
    // 0 -> 1 -> 3 -> 4 (distance 3)
    // 0 -> 2 -> 3 -> 4 (distance 3)
    expect(bfsShortestPath(complexGraph, 0, 4)).toBe(3);
    expect(bfsShortestPath(complexGraph, 1, 5)).toBe(2); // 1 -> 0 -> 5
  });

  test('should work with directed graph (shortest path length)', () => {
    const directedGraph = new Graph(true, false); // Directed, unweighted
    directedGraph.addEdge(1, 2);
    directedGraph.addEdge(2, 3);
    directedGraph.addEdge(1, 4);
    directedGraph.addEdge(4, 3);
    directedGraph.addEdge(3, 5);

    expect(bfsShortestPath(directedGraph, 1, 5)).toBe(3); // 1->2->3->5 or 1->4->3->5
    expect(bfsShortestPath(directedGraph, 5, 1)).toBe(-1); // No path back
    expect(bfsShortestPath(directedGraph, 1, 3)).toBe(2); // 1->2->3 or 1->4->3
  });
});

describe('BFS Shortest Path Nodes (Unweighted Graph)', () => {
  let graph: Graph<number>;

  beforeEach(() => {
    graph = new Graph(false, false); // Undirected, unweighted
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(2, 4);
    graph.addEdge(3, 4);
    graph.addEdge(4, 5);
    graph.addEdge(1, 6); // Node 6 is 1's neighbor
    graph.addEdge(6, 7);
  });

  test('should find the shortest path nodes in a simple graph', () => {
    // Expected path could be [1, 2, 4, 5] or [1, 3, 4, 5]
    const path = bfsShortestPathNodes(graph, 1, 5);
    expect(path).not.toBeNull();
    expect(path?.length).toBe(4);
    expect(path![0]).toBe(1);
    expect(path![3]).toBe(5);

    // Test a known path
    expect(bfsShortestPathNodes(graph, 1, 2)).toEqual([1, 2]);
    expect(bfsShortestPathNodes(graph, 1, 4)).toEqual(expect.arrayContaining([[1, 2, 4], [1, 3, 4]]));
    // Due to Set iteration order, it could be either. Let's make it robust.
    const path1_4 = bfsShortestPathNodes(graph, 1, 4)!;
    expect(path1_4[0]).toBe(1);
    expect(path1_4[1]).toBeOneOf([2, 3]);
    expect(path1_4[2]).toBe(4);
  });

  test('should return [startNode] for startNode === endNode', () => {
    expect(bfsShortestPathNodes(graph, 1, 1)).toEqual([1]);
  });

  test('should return null if endNode is unreachable', () => {
    graph.addNode(99); // Disconnected node
    expect(bfsShortestPathNodes(graph, 1, 99)).toBeNull();

    const newGraph = new Graph(false, false);
    newGraph.addNode(1);
    newGraph.addNode(2);
    expect(bfsShortestPathNodes(newGraph, 1, 2)).toBeNull();
  });

  test('should return null if startNode or endNode does not exist', () => {
    expect(bfsShortestPathNodes(graph, 1, 99)).toBeNull();
    expect(bfsShortestPathNodes(graph, 99, 1)).toBeNull();
  });

  test('should work with a complex graph (path reconstruction)', () => {
    const complexGraph = new Graph(false, false);
    complexGraph.addEdge(0, 1);
    complexGraph.addEdge(0, 2);
    complexGraph.addEdge(1, 3);
    complexGraph.addEdge(2, 3);
    complexGraph.addEdge(3, 4);
    complexGraph.addEdge(4, 5);
    complexGraph.addEdge(0, 5); // Shortest path 0 -> 5

    expect(bfsShortestPathNodes(complexGraph, 0, 5)).toEqual([0, 5]);
    expect(bfsShortestPathNodes(complexGraph, 0, 4)).toEqual(expect.arrayContaining([[0, 1, 3, 4], [0, 2, 3, 4]]));
    const path0_4 = bfsShortestPathNodes(complexGraph, 0, 4)!;
    expect(path0_4[0]).toBe(0);
    expect(path0_4[path0_4.length - 1]).toBe(4);
    expect(path0_4.length).toBe(4); // 0 -> X -> 3 -> 4

    expect(bfsShortestPathNodes(complexGraph, 1, 5)).toEqual([1, 0, 5]);
  });
});