/**
 * tests/data-structures/graph.test.ts
 * Tests for the Graph data structure.
 */

import { Graph } from '@data-structures/graph';

describe('Graph (Unweighted, Undirected)', () => {
  let graph: Graph<number>;

  beforeEach(() => {
    graph = new Graph(false, false); // Undirected, unweighted
  });

  test('should initialize correctly with no nodes', () => {
    expect(graph.size()).toBe(0);
    expect(graph.getNodes()).toEqual([]);
  });

  test('should add nodes', () => {
    graph.addNode(1);
    graph.addNode(2);
    expect(graph.size()).toBe(2);
    expect(graph.hasNode(1)).toBe(true);
    expect(graph.hasNode(2)).toBe(true);
    expect(graph.hasNode(3)).toBe(false);
  });

  test('should not add duplicate nodes', () => {
    graph.addNode(1);
    graph.addNode(1);
    expect(graph.size()).toBe(1);
  });

  test('should add undirected, unweighted edges', () => {
    graph.addEdge(1, 2);
    expect(graph.hasEdge(1, 2)).toBe(true);
    expect(graph.hasEdge(2, 1)).toBe(true); // Undirected
    expect(graph.getNeighbors(1)).toEqual([2]);
    expect(graph.getNeighbors(2)).toEqual([1]);

    graph.addEdge(1, 3);
    expect(graph.getNeighbors(1)).toEqual(expect.arrayContaining([2, 3]));
    expect(graph.getNeighbors(3)).toEqual([1]);
  });

  test('should return empty neighbors for non-existent node', () => {
    expect(graph.getNeighbors(99)).toEqual([]);
  });

  test('should handle disconnected nodes', () => {
    graph.addNode(1);
    graph.addNode(2);
    graph.addNode(3);
    graph.addEdge(1, 2);
    expect(graph.getNeighbors(1)).toEqual([2]);
    expect(graph.getNeighbors(2)).toEqual([1]);
    expect(graph.getNeighbors(3)).toEqual([]);
    expect(graph.size()).toBe(3);
  });

  test('should clear the graph', () => {
    graph.addEdge(1, 2);
    graph.addNode(3);
    graph.clear();
    expect(graph.size()).toBe(0);
    expect(graph.getNodes()).toEqual([]);
    expect(graph.hasNode(1)).toBe(false);
  });

  test('should handle string nodes', () => {
    const stringGraph = new Graph<string>(false, false);
    stringGraph.addEdge("A", "B");
    expect(stringGraph.hasNode("A")).toBe(true);
    expect(stringGraph.hasEdge("A", "B")).toBe(true);
    expect(stringGraph.getNeighbors("A")).toEqual(["B"]);
  });
});

describe('Graph (Weighted, Undirected)', () => {
  let graph: Graph<number>;

  beforeEach(() => {
    graph = new Graph(false, true); // Undirected, weighted
  });

  test('should add undirected, weighted edges', () => {
    graph.addEdge(1, 2, 5);
    expect(graph.hasEdge(1, 2)).toBe(true);
    expect(graph.hasEdge(2, 1)).toBe(true);
    expect(graph.getEdgeWeight(1, 2)).toBe(5);
    expect(graph.getEdgeWeight(2, 1)).toBe(5);

    graph.addEdge(1, 3, 10);
    const neighbors1 = graph.getNeighbors(1) as any[];
    expect(neighbors1).toEqual(expect.arrayContaining([{ to: 2, weight: 5 }, { to: 3, weight: 10 }]));
    const neighbors2 = graph.getNeighbors(2) as any[];
    expect(neighbors2).toEqual([{ to: 1, weight: 5 }]);
    expect(graph.getEdgeWeight(1, 4)).toBeUndefined();
  });
});

describe('Graph (Unweighted, Directed)', () => {
  let graph: Graph<number>;

  beforeEach(() => {
    graph = new Graph(true, false); // Directed, unweighted
  });

  test('should add directed, unweighted edges', () => {
    graph.addEdge(1, 2);
    expect(graph.hasEdge(1, 2)).toBe(true);
    expect(graph.hasEdge(2, 1)).toBe(false); // Directed
    expect(graph.getNeighbors(1)).toEqual([2]);
    expect(graph.getNeighbors(2)).toEqual([]);

    graph.addEdge(1, 3);
    expect(graph.getNeighbors(1)).toEqual(expect.arrayContaining([2, 3]));
    expect(graph.getNeighbors(3)).toEqual([]);
  });
});

describe('Graph (Weighted, Directed)', () => {
  let graph: Graph<number>;

  beforeEach(() => {
    graph = new Graph(true, true); // Directed, weighted
  });

  test('should add directed, weighted edges', () => {
    graph.addEdge(1, 2, 5);
    expect(graph.hasEdge(1, 2)).toBe(true);
    expect(graph.hasEdge(2, 1)).toBe(false);
    expect(graph.getEdgeWeight(1, 2)).toBe(5);
    expect(graph.getEdgeWeight(2, 1)).toBeUndefined(); // Directed

    graph.addEdge(1, 3, 10);
    const neighbors1 = graph.getNeighbors(1) as any[];
    expect(neighbors1).toEqual(expect.arrayContaining([{ to: 2, weight: 5 }, { to: 3, weight: 10 }]));
    const neighbors2 = graph.getNeighbors(2) as any[];
    expect(neighbors2).toEqual([]);
  });
});