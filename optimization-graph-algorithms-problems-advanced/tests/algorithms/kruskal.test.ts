/**
 * tests/algorithms/kruskal.test.ts
 * Tests for Kruskal's algorithm.
 */

import { Graph } from '@data-structures/graph';
import { kruskal, MSTResult } from '@algorithms/kruskal';
import { Edge } from '@src/types';

describe('Kruskal\'s Algorithm', () => {

  // Helper function to check if two MSTs are equivalent (same edges, ignoring order)
  function areMstEdgesEquivalent(mst1: Edge<number>[], mst2: Edge<number>[]): boolean {
    if (mst1.length !== mst2.length) return false;

    const serializeEdge = (edge: Edge<number>) => {
      const u = Math.min(edge.u, edge.v);
      const v = Math.max(edge.u, edge.v);
      return `${u}-${v}-${edge.weight}`;
    };

    const serializedMst1 = new Set(mst1.map(serializeEdge));
    const serializedMst2 = new Set(mst2.map(serializeEdge));

    if (serializedMst1.size !== serializedMst2.size) return false;

    for (const edge of serializedMst1) {
      if (!serializedMst2.has(edge)) return false;
    }
    return true;
  }

  test('should find MST for a simple connected graph', () => {
    const graph = new Graph(false, true); // Undirected, weighted
    graph.addEdge(0, 1, 10);
    graph.addEdge(0, 2, 6);
    graph.addEdge(0, 3, 5);
    graph.addEdge(1, 3, 15);
    graph.addEdge(2, 3, 4);

    const result = kruskal(graph);

    expect(result.mstWeight).toBe(19); // 5 (0-3) + 4 (2-3) + 10 (0-1, or maybe 0-2 (6) if other edges were different)
    // Edges: (0,3,5), (2,3,4). Now 0,2,3 are connected. Need to connect 1.
    // Edge (0,2,6) vs (0,1,10) vs (1,3,15). Smallest is (0,2,6). But 0 and 2 are already connected via 3.
    // So 0-1 (10) or 1-3 (15). (0,1,10) connects {0,2,3} and {1}. Total edges = 3 (V-1).
    // Correct path: (0,3,5), (2,3,4), (0,1,10)
    const expectedEdges: Edge<number>[] = [
      { u: 0, v: 3, weight: 5 },
      { u: 2, v: 3, weight: 4 },
      { u: 0, v: 1, weight: 10 },
    ];
    expect(areMstEdgesEquivalent(result.mstEdges, expectedEdges)).toBe(true);
  });

  test('should handle graphs with only one node', () => {
    const graph = new Graph(false, true);
    graph.addNode(0);
    const result = kruskal(graph);
    expect(result.mstWeight).toBe(0);
    expect(result.mstEdges).toEqual([]);
  });

  test('should handle empty graph', () => {
    const graph = new Graph(false, true);
    const result = kruskal(graph);
    expect(result.mstWeight).toBe(0);
    expect(result.mstEdges).toEqual([]);
  });

  test('should handle a graph that forms a simple path', () => {
    const graph = new Graph(false, true);
    graph.addEdge(0, 1, 1);
    graph.addEdge(1, 2, 2);
    graph.addEdge(2, 3, 3);

    const result = kruskal(graph);
    expect(result.mstWeight).toBe(6);
    const expectedEdges: Edge<number>[] = [
      { u: 0, v: 1, weight: 1 },
      { u: 1, v: 2, weight: 2 },
      { u: 2, v: 3, weight: 3 },
    ];
    expect(areMstEdgesEquivalent(result.mstEdges, expectedEdges)).toBe(true);
  });

  test('should handle a graph with cycles, picking minimum edges', () => {
    const graph = new Graph(false, true);
    graph.addEdge(0, 1, 10);
    graph.addEdge(0, 2, 20);
    graph.addEdge(1, 2, 5); // This edge closes a cycle (0-1-2-0)
    graph.addEdge(2, 3, 15);

    const result = kruskal(graph);
    expect(result.mstWeight).toBe(30); // 5 (1-2) + 10 (0-1) + 15 (2-3)
    const expectedEdges: Edge<number>[] = [
      { u: 1, v: 2, weight: 5 },
      { u: 0, v: 1, weight: 10 },
      { u: 2, v: 3, weight: 15 },
    ];
    expect(areMstEdgesEquivalent(result.mstEdges, expectedEdges)).toBe(true);
  });

  test('should find MSF (Minimum Spanning Forest) for a disconnected graph', () => {
    const graph = new Graph(false, true);
    // Component 1
    graph.addEdge(0, 1, 1);
    graph.addEdge(1, 2, 2);
    graph.addEdge(0, 2, 10); // Cycle edge
    // Component 2 (disconnected)
    graph.addEdge(3, 4, 5);
    graph.addEdge(4, 5, 6);

    const result = kruskal(graph);
    expect(result.mstWeight).toBe(1 + 2 + 5 + 6); // MST for component 1 (3) + MST for component 2 (11) = 14
    const expectedEdges: Edge<number>[] = [
      { u: 0, v: 1, weight: 1 },
      { u: 1, v: 2, weight: 2 },
      { u: 3, v: 4, weight: 5 },
      { u: 4, v: 5, weight: 6 },
    ];
    expect(areMstEdgesEquivalent(result.mstEdges, expectedEdges)).toBe(true);
  });

  test('should work with string node IDs', () => {
    const graph = new Graph<string>(false, true);
    graph.addEdge("A", "B", 1);
    graph.addEdge("B", "C", 2);
    graph.addEdge("A", "C", 3);

    const result = kruskal(graph);
    expect(result.mstWeight).toBe(3); // A-B (1) + B-C (2)
    const expectedEdges: Edge<string>[] = [
      { u: "A", v: "B", weight: 1 },
      { u: "B", v: "C", weight: 2 },
    ];
    expect(areMstEdgesEquivalent(result.mstEdges as Edge<number>[], expectedEdges as Edge<number>[])).toBe(true);
  });

  test('should correctly handle a larger graph (Prim\'s example from Wikipedia)', () => {
    // This is the same graph used for Dijkstra's tests
    // Nodes: A=0, B=1, C=2, D=3, E=4, F=5
    // A ---4--- B ---7--- E
    // | \       |
    // 8  11     2
    // |   \     |
    // C ---1--- D ---6--- E
    // |       /
    // 7     14
    // |   /
    // F
    // Edges (sorted):
    // C-D (1)
    // B-D (2)
    // A-B (4)
    // D-E (6)
    // B-E (7) -- forms cycle B-D-E-B, so skip
    // C-F (7)
    // A-C (8) -- forms cycle A-B-D-C-A, so skip
    // A-D (11) -- forms cycle, so skip
    // D-F (14) -- forms cycle, so skip
    const graph = new Graph(false, true);
    graph.addEdge(0, 1, 4); // A-B 4
    graph.addEdge(0, 2, 8); // A-C 8
    graph.addEdge(0, 3, 11); // A-D 11
    graph.addEdge(1, 3, 2); // B-D 2
    graph.addEdge(2, 3, 1); // C-D 1
    graph.addEdge(3, 4, 6); // D-E 6
    graph.addEdge(1, 4, 7); // B-E 7
    graph.addEdge(2, 5, 7); // C-F 7
    graph.addEdge(3, 5, 14); // D-F 14

    const result = kruskal(graph);

    // Expected MST edges:
    // (2,3,1) C-D
    // (1,3,2) B-D
    // (0,1,4) A-B
    // (3,4,6) D-E
    // (2,5,7) C-F
    // Total nodes = 6. Edges in MST = 5.
    // Total weight = 1 + 2 + 4 + 6 + 7 = 20

    expect(result.mstWeight).toBe(20);
    const expectedEdges: Edge<number>[] = [
      { u: 2, v: 3, weight: 1 },
      { u: 1, v: 3, weight: 2 },
      { u: 0, v: 1, weight: 4 },
      { u: 3, v: 4, weight: 6 },
      { u: 2, v: 5, weight: 7 },
    ];
    expect(areMstEdgesEquivalent(result.mstEdges, expectedEdges)).toBe(true);
  });
});