/**
 * tests/utils/graph-generator.test.ts
 * Tests for the graph-generator utility.
 */

import { Graph } from '@data-structures/graph';
import {
  generateRandomUnweightedGraph,
  generateRandomWeightedGraph,
  generateRandomDirectedGraph,
  getAllEdgesFromWeightedGraph
} from '@utils/graph-generator';

describe('Graph Generator Utilities', () => {

  describe('generateRandomUnweightedGraph', () => {
    test('should generate a graph with the specified number of nodes', () => {
      const numNodes = 5;
      const graph = generateRandomUnweightedGraph(numNodes, 0);
      expect(graph.size()).toBe(numNodes);
      expect(graph.getNodes().sort()).toEqual([0, 1, 2, 3, 4]);
    });

    test('should generate a graph with approximately the specified number of edges', () => {
      const numNodes = 10;
      const numEdges = 15;
      const graph = generateRandomUnweightedGraph(numNodes, numEdges);
      expect(graph.size()).toBe(numNodes);
      // Count actual edges
      let actualEdges = 0;
      const seenEdges = new Set<string>();
      for (let i = 0; i < numNodes; i++) {
        const neighbors = graph.getNeighbors(i) as number[];
        for (const neighbor of neighbors) {
          const edgeKey = `${Math.min(i, neighbor)}-${Math.max(i, neighbor)}`;
          if (!seenEdges.has(edgeKey)) {
            actualEdges++;
            seenEdges.add(edgeKey);
          }
        }
      }
      expect(actualEdges).toBeLessThanOrEqual(numEdges);
      expect(actualEdges).toBeGreaterThan(0); // Should have some edges if numEdges > 0
    });

    test('should generate an undirected graph', () => {
      const graph = generateRandomUnweightedGraph(3, 1);
      const nodes = graph.getNodes();
      let isUndirected = true;
      for (const u of nodes) {
        const neighbors = graph.getNeighbors(u) as number[];
        for (const v of neighbors) {
          if (!graph.hasEdge(v, u)) {
            isUndirected = false;
            break;
          }
        }
        if (!isUndirected) break;
      }
      expect(isUndirected).toBe(true);
      // Graph should not be weighted
      expect(graph['isWeighted']).toBe(false);
    });

    test('should handle edge cases: 0 nodes, 0 edges', () => {
      const graph = generateRandomUnweightedGraph(0, 0);
      expect(graph.size()).toBe(0);
      expect(graph.getNodes()).toEqual([]);
    });

    test('should handle 1 node, 0 edges', () => {
      const graph = generateRandomUnweightedGraph(1, 0);
      expect(graph.size()).toBe(1);
      expect(graph.getNodes()).toEqual([0]);
      expect(graph.getNeighbors(0)).toEqual([]);
    });
  });

  describe('generateRandomWeightedGraph', () => {
    test('should generate a weighted graph', () => {
      const numNodes = 5;
      const numEdges = 5;
      const maxWeight = 50;
      const graph = generateRandomWeightedGraph(numNodes, numEdges, maxWeight);

      expect(graph.size()).toBe(numNodes);
      expect(graph['isWeighted']).toBe(true);

      let edgeCount = 0;
      for (const node of graph.getNodes()) {
        const neighbors = graph.getNeighbors(node) as any[];
        for (const neighbor of neighbors) {
          expect(typeof neighbor.to).toBe('number');
          expect(typeof neighbor.weight).toBe('number');
          expect(neighbor.weight).toBeGreaterThanOrEqual(1);
          expect(neighbor.weight).toBeLessThanOrEqual(maxWeight);
          edgeCount++;
        }
      }
      // For undirected graph, each edge is added twice to adjacency list
      // so divide by 2 for unique edges.
      // This is an approximate count because random generation might fail to add
      // exactly numEdges unique undirected edges if numEdges is large and graph is dense
      expect(edgeCount / 2).toBeLessThanOrEqual(numEdges);
      expect(edgeCount / 2).toBeGreaterThan(0);
    });

    test('should generate an undirected weighted graph', () => {
      const graph = generateRandomWeightedGraph(3, 1, 10);
      let isUndirected = true;
      let weightMatch = true;
      for (const u of graph.getNodes()) {
        const neighbors = graph.getNeighbors(u) as any[];
        for (const { to: v, weight } of neighbors) {
          if (!graph.hasEdge(v, u)) {
            isUndirected = false;
            break;
          }
          if (graph.getEdgeWeight(v, u) !== weight) {
            weightMatch = false;
            break;
          }
        }
        if (!isUndirected || !weightMatch) break;
      }
      expect(isUndirected).toBe(true);
      expect(weightMatch).toBe(true);
    });
  });

  describe('generateRandomDirectedGraph', () => {
    test('should generate a directed graph', () => {
      const numNodes = 5;
      const numEdges = 5;
      const graph = generateRandomDirectedGraph(numNodes, numEdges);

      expect(graph.size()).toBe(numNodes);
      expect(graph['isDirected']).toBe(true);
      expect(graph['isWeighted']).toBe(false);

      let actualEdges = 0;
      const seenEdges = new Set<string>();
      for (let i = 0; i < numNodes; i++) {
        const neighbors = graph.getNeighbors(i) as number[];
        for (const neighbor of neighbors) {
          const edgeKey = `${i}->${neighbor}`;
          if (!seenEdges.has(edgeKey)) { // Count only unique directed edges
            actualEdges++;
            seenEdges.add(edgeKey);
          }
        }
      }
      expect(actualEdges).toBeLessThanOrEqual(numEdges);
      expect(actualEdges).toBeGreaterThan(0);
    });

    test('should ensure it is directed', () => {
      const graph = generateRandomDirectedGraph(3, 1);
      let isDirectedCorrect = false;
      for (const u of graph.getNodes()) {
        const neighbors = graph.getNeighbors(u) as number[];
        for (const v of neighbors) {
          if (!graph.hasEdge(v, u)) { // If v->u doesn't exist when u->v does, it's directed
            isDirectedCorrect = true;
            break;
          }
        }
        if (isDirectedCorrect) break;
      }
      expect(isDirectedCorrect).toBe(true);
    });
  });

  describe('getAllEdgesFromWeightedGraph', () => {
    test('should correctly extract all unique edges from an undirected weighted graph', () => {
      const graph = new Graph<string>(false, true); // Undirected, weighted
      graph.addEdge("A", "B", 10);
      graph.addEdge("A", "C", 5);
      graph.addEdge("B", "C", 3);

      const edges = getAllEdgesFromWeightedGraph(graph);

      expect(edges.length).toBe(3);
      expect(edges).toEqual(expect.arrayContaining([
        { u: "A", v: "B", weight: 10 },
        { u: "A", v: "C", weight: 5 },
        { u: "B", v: "C", weight: 3 },
      ]));

      // Verify no duplicate edges due to undirected nature
      const edgeKeys = edges.map(e => `${e.u}-${e.v}-${e.weight}`);
      expect(new Set(edgeKeys).size).toBe(3);
    });

    test('should correctly extract all edges from a directed weighted graph', () => {
      const graph = new Graph<string>(true, true); // Directed, weighted
      graph.addEdge("A", "B", 10);
      graph.addEdge("B", "A", 2); // Directed edge in opposite direction
      graph.addEdge("A", "C", 5);

      const edges = getAllEdgesFromWeightedGraph(graph);

      expect(edges.length).toBe(3);
      expect(edges).toEqual(expect.arrayContaining([
        { u: "A", v: "B", weight: 10 },
        { u: "B", v: "A", weight: 2 },
        { u: "A", v: "C", weight: 5 },
      ]));
    });

    test('should handle graph with no edges', () => {
      const graph = new Graph<number>(false, true);
      graph.addNode(1);
      graph.addNode(2);
      const edges = getAllEdgesFromWeightedGraph(graph);
      expect(edges).toEqual([]);
    });

    test('should handle graph with a single edge', () => {
      const graph = new Graph<number>(false, true);
      graph.addEdge(1, 2, 7);
      const edges = getAllEdgesFromWeightedGraph(graph);
      expect(edges.length).toBe(1);
      expect(edges).toEqual([{ u: 1, v: 2, weight: 7 }]);
    });
  });
});