/**
 * tests/algorithms/dijkstra.test.ts
 * Tests for Dijkstra's algorithm and path reconstruction.
 */

import { Graph } from '@data-structures/graph';
import { dijkstra, reconstructPath } from '@algorithms/dijkstra';

describe('Dijkstra\'s Algorithm', () => {
  let graph: Graph<number>;

  beforeEach(() => {
    // Example Graph (from Wikipedia, slightly modified)
    // Undirected, Weighted
    // A ---4--- B
    // | \       | \
    // 8  11     2  7
    // |   \     |   \
    // C ---1--- D ---6--- E
    // |       /
    // 7     14
    // |   /
    // F
    // Nodes are 0 to 5 for simplicity: A=0, B=1, C=2, D=3, E=4, F=5
    graph = new Graph(false, true);
    graph.addEdge(0, 1, 4); // A-B 4
    graph.addEdge(0, 2, 8); // A-C 8
    graph.addEdge(0, 3, 11); // A-D 11
    graph.addEdge(1, 3, 2); // B-D 2
    graph.addEdge(2, 3, 1); // C-D 1
    graph.addEdge(3, 4, 6); // D-E 6
    graph.addEdge(1, 4, 7); // B-E 7
    graph.addEdge(2, 5, 7); // C-F 7
    graph.addEdge(3, 5, 14); // D-F 14 (Path C-D-F is 1+14=15. Path C-F is 7. So C-F is better)
  });

  test('should find shortest paths from a start node (node 0)', () => {
    const distances = dijkstra(graph, 0);

    // Expected shortest distances from node 0 (A):
    // A -> A: 0
    // A -> B: 4 (0->1)
    // A -> C: 8 (0->2)
    // A -> D: 7 (0->1->3) (initial 11, then 0->1->3 (4+2=6) but 0->2->3 (8+1=9), actually 0->1->3 is best)
    // A->B (4), B->D (2) => A->D = 6
    // A->C (8), C->D (1) => A->D = 9
    // So shortest to D is 6.
    // A -> E: 12 (0->1->3->4 = 4+2+6=12) or (0->1->4 = 4+7=11)
    // So shortest to E is 11.
    // A -> F: 15 (0->1->3->5 = 4+2+14=20) or (0->2->5 = 8+7=15)
    // So shortest to F is 15.

    expect(distances.get(0)).toBe(0);
    expect(distances.get(1)).toBe(4);
    expect(distances.get(2)).toBe(8);
    expect(distances.get(3)).toBe(6); // 0->1(4)->3(2) = 6
    expect(distances.get(4)).toBe(11); // 0->1(4)->4(7) = 11
    expect(distances.get(5)).toBe(15); // 0->2(8)->5(7) = 15
  });

  test('should handle start node with no outgoing edges', () => {
    const isolatedGraph = new Graph(false, true);
    isolatedGraph.addNode(0);
    isolatedGraph.addNode(1);
    isolatedGraph.addNode(2);
    const distances = dijkstra(isolatedGraph, 0);
    expect(distances.get(0)).toBe(0);
    expect(distances.get(1)).toBe(Infinity);
    expect(distances.get(2)).toBe(Infinity);
  });

  test('should handle disconnected components', () => {
    graph.addNode(10); // Isolated node
    graph.addNode(11);
    graph.addEdge(10, 11, 5);
    const distances = dijkstra(graph, 0);
    expect(distances.get(10)).toBe(Infinity);
    expect(distances.get(11)).toBe(Infinity);
    // Other distances remain correct from previous test
    expect(distances.get(4)).toBe(11);
  });

  test('should return empty map for non-existent start node', () => {
    const distances = dijkstra(graph, 99);
    expect(distances.size).toBe(0);
  });

  test('should work with string node IDs', () => {
    const stringGraph = new Graph<string>(false, true);
    stringGraph.addEdge("A", "B", 1);
    stringGraph.addEdge("B", "C", 2);
    stringGraph.addEdge("A", "C", 10);
    const distances = dijkstra(stringGraph, "A");
    expect(distances.get("A")).toBe(0);
    expect(distances.get("B")).toBe(1);
    expect(distances.get("C")).toBe(3); // A->B->C (1+2=3) is shorter than A->C (10)
  });

  test('should work with directed graph', () => {
    const directedGraph = new Graph(true, true); // Directed, weighted
    directedGraph.addEdge(0, 1, 1);
    directedGraph.addEdge(0, 2, 5);
    directedGraph.addEdge(1, 3, 2);
    directedGraph.addEdge(2, 3, 1);
    directedGraph.addEdge(3, 4, 3);

    const distances = dijkstra(directedGraph, 0);
    expect(distances.get(0)).toBe(0);
    expect(distances.get(1)).toBe(1); // 0->1
    expect(distances.get(2)).toBe(5); // 0->2
    expect(distances.get(3)).toBe(3); // min(0->1->3 (1+2=3), 0->2->3 (5+1=6))
    expect(distances.get(4)).toBe(6); // 0->1->3->4 (1+2+3=6)
  });
});

describe('reconstructPath', () => {
  let graph: Graph<number>;
  let previousNodes: Map<number, number | null>;

  beforeEach(() => {
    // Re-run Dijkstra to get previousNodes map
    graph = new Graph(false, true);
    graph.addEdge(0, 1, 4);
    graph.addEdge(0, 2, 8);
    graph.addEdge(0, 3, 11);
    graph.addEdge(1, 3, 2);
    graph.addEdge(2, 3, 1);
    graph.addEdge(3, 4, 6);
    graph.addEdge(1, 4, 7);
    graph.addEdge(2, 5, 7);
    graph.addEdge(3, 5, 14);

    // To get `previousNodes`, we need to inspect Dijkstra's internal state or modify it to return previousNodes.
    // For simplicity, we'll run dijkstra and mock a `previousNodes` map based on expected shortest paths.
    // In a real scenario, dijkstra function would return this map along with distances.
    // For testing, let's create the expected map for startNode 0.
    const nodes = graph.getNodes();
    const distances = new Map<number, number>();
    previousNodes = new Map<number, number | null>();

    // Initial values
    for (const node of nodes) {
      distances.set(node, Infinity);
      previousNodes.set(node, null);
    }
    distances.set(0, 0);

    // Simulate Dijkstra's update
    // from 0:
    // 0->1 (4), prev[1]=0
    // 0->2 (8), prev[2]=0
    // 0->3 (11), prev[3]=0

    // Process 1 (dist 4):
    // 1->3 (2) => new dist[3]=4+2=6. prev[3]=1
    // 1->4 (7) => new dist[4]=4+7=11. prev[4]=1

    // Process 2 (dist 8):
    // 2->3 (1) => new dist[3]=8+1=9. (But current dist[3] is 6, so no update)
    // 2->5 (7) => new dist[5]=8+7=15. prev[5]=2

    // Process 3 (dist 6, from node 3):
    // 3->4 (6) => new dist[4]=6+6=12. (But current dist[4] is 11, so no update)
    // 3->5 (14) => new dist[5]=6+14=20. (But current dist[5] is 15, so no update)

    previousNodes.set(0, null);
    previousNodes.set(1, 0);   // Path: 0 -> 1
    previousNodes.set(2, 0);   // Path: 0 -> 2
    previousNodes.set(3, 1);   // Path: 0 -> 1 -> 3
    previousNodes.set(4, 1);   // Path: 0 -> 1 -> 4
    previousNodes.set(5, 2);   // Path: 0 -> 2 -> 5
  });

  test('should reconstruct a simple path', () => {
    expect(reconstructPath(previousNodes, 0, 1)).toEqual([0, 1]);
  });

  test('should reconstruct a longer path', () => {
    expect(reconstructPath(previousNodes, 0, 3)).toEqual([0, 1, 3]);
  });

  test('should reconstruct the longest path from source', () => {
    expect(reconstructPath(previousNodes, 0, 5)).toEqual([0, 2, 5]);
  });

  test('should return [startNode] if startNode === endNode', () => {
    expect(reconstructPath(previousNodes, 0, 0)).toEqual([0]);
  });

  test('should return null if endNode is unreachable', () => {
    const unreachablePreviousNodes = new Map<number, number | null>();
    unreachablePreviousNodes.set(10, null); // Node 10 is isolated
    unreachablePreviousNodes.set(0, null); // Assume 0 is start

    expect(reconstructPath(previousNodes, 0, 99)).toBeNull(); // 99 not in map
    expect(reconstructPath(unreachablePreviousNodes, 0, 10)).toBeNull(); // Path to 10 from 0 not possible
  });

  test('should return null if path ends abruptly not at start', () => {
    const partialPath = new Map<number, number | null>();
    partialPath.set(3, 10); // Node 10 is not reachable from 0 via recorded path
    partialPath.set(10, null); // Simulate 10 is start of its component.
    expect(reconstructPath(partialPath, 0, 3)).toBeNull();
  });
});