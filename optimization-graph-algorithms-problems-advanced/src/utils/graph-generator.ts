/**
 * src/utils/graph-generator.ts
 * Provides utility functions to generate different types of graphs for testing and benchmarking.
 */

import { Graph } from '@data-structures/graph';
import { Edge } from '@src/types';

/**
 * Generates a random unweighted, undirected graph.
 * @param numNodes The number of nodes in the graph.
 * @param numEdges The number of edges to add.
 * @returns A new Graph instance.
 *
 * Time Complexity: O(numNodes + numEdges) - adding nodes and edges.
 * Space Complexity: O(numNodes + numEdges) - to store the graph.
 */
export function generateRandomUnweightedGraph(numNodes: number, numEdges: number): Graph<number> {
  const graph = new Graph<number>(false, false); // Undirected, unweighted

  // Add nodes
  for (let i = 0; i < numNodes; i++) {
    graph.addNode(i);
  }

  // Add random edges
  let edgesAdded = 0;
  const edgeSet = new Set<string>(); // To prevent duplicate edges for undirected graph (e.g., "0-1" and "1-0" are same)

  while (edgesAdded < numEdges && edgesAdded < numNodes * (numNodes - 1) / 2) { // Max edges in undirected graph
    const u = Math.floor(Math.random() * numNodes);
    const v = Math.floor(Math.random() * numNodes);

    if (u === v) continue;

    // Ensure edge is unique regardless of order for undirected graph
    const edgeKey1 = `${Math.min(u, v)}-${Math.max(u, v)}`;
    const edgeKey2 = `${Math.max(u, v)}-${Math.min(u, v)}`;

    if (!edgeSet.has(edgeKey1) && !edgeSet.has(edgeKey2)) {
      graph.addEdge(u, v);
      edgeSet.add(edgeKey1);
      edgesAdded++;
    }
  }

  return graph;
}

/**
 * Generates a random weighted, undirected graph with non-negative weights.
 * @param numNodes The number of nodes in the graph.
 * @param numEdges The number of edges to add.
 * @param maxWeight The maximum weight for an edge.
 * @returns A new Graph instance.
 *
 * Time Complexity: O(numNodes + numEdges)
 * Space Complexity: O(numNodes + numEdges)
 */
export function generateRandomWeightedGraph(numNodes: number, numEdges: number, maxWeight: number = 100): Graph<number> {
  const graph = new Graph<number>(false, true); // Undirected, weighted

  // Add nodes
  for (let i = 0; i < numNodes; i++) {
    graph.addNode(i);
  }

  // Add random edges
  let edgesAdded = 0;
  const edgeSet = new Set<string>();

  while (edgesAdded < numEdges && edgesAdded < numNodes * (numNodes - 1) / 2) {
    const u = Math.floor(Math.random() * numNodes);
    const v = Math.floor(Math.random() * numNodes);
    const weight = Math.floor(Math.random() * maxWeight) + 1; // Weights are 1 to maxWeight

    if (u === v) continue;

    const edgeKey1 = `${Math.min(u, v)}-${Math.max(u, v)}`;
    const edgeKey2 = `${Math.max(u, v)}-${Math.min(u, v)}`;

    if (!edgeSet.has(edgeKey1) && !edgeSet.has(edgeKey2)) {
      graph.addEdge(u, v, weight);
      edgeSet.add(edgeKey1);
      edgesAdded++;
    }
  }

  return graph;
}

/**
 * Generates a random directed, unweighted graph.
 * @param numNodes The number of nodes in the graph.
 * @param numEdges The number of edges to add.
 * @returns A new Graph instance.
 *
 * Time Complexity: O(numNodes + numEdges)
 * Space Complexity: O(numNodes + numEdges)
 */
export function generateRandomDirectedGraph(numNodes: number, numEdges: number): Graph<number> {
  const graph = new Graph<number>(true, false); // Directed, unweighted

  for (let i = 0; i < numNodes; i++) {
    graph.addNode(i);
  }

  let edgesAdded = 0;
  const edgeSet = new Set<string>(); // To prevent duplicate directed edges

  while (edgesAdded < numEdges && edgesAdded < numNodes * (numNodes - 1)) { // Max edges in directed graph
    const u = Math.floor(Math.random() * numNodes);
    const v = Math.floor(Math.random() * numNodes);

    if (u === v) continue;

    const edgeKey = `${u}->${v}`;
    if (!edgeSet.has(edgeKey)) {
      graph.addEdge(u, v);
      edgeSet.add(edgeKey);
      edgesAdded++;
    }
  }

  return graph;
}

/**
 * Extracts all edges from a weighted graph.
 * Useful for algorithms like Kruskal's that process edges directly.
 * @param graph The weighted graph.
 * @returns An array of all edges in the graph.
 *
 * Time Complexity: O(V + E) where V is nodes, E is edges.
 * Space Complexity: O(E) to store the edges.
 */
export function getAllEdgesFromWeightedGraph<T = number>(graph: Graph<T>): Edge<T>[] {
  const edges: Edge<T>[] = [];
  const processedEdges = new Set<string>(); // To avoid adding undirected edges twice (u-v and v-u)

  for (const u of graph.getNodes()) {
    const neighbors = graph.getNeighbors(u);
    for (const neighbor of neighbors) {
      if (typeof neighbor === 'object' && 'to' in neighbor) { // Check if it's a WeightedEdge
        const v = neighbor.to;
        const weight = neighbor.weight;

        // For undirected graphs, add each edge only once (e.g., from u to v, not v to u)
        const edgeKey = `${JSON.stringify(Math.min(u as any, v as any))}-${JSON.stringify(Math.max(u as any, v as any))}`;
        if (!processedEdges.has(edgeKey)) {
          edges.push({ u, v, weight });
          processedEdges.add(edgeKey);
        }
      }
    }
  }
  return edges;
}