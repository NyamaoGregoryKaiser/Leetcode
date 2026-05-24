/**
 * src/algorithms/bfs.ts
 * Implements Breadth-First Search (BFS) to find the shortest path length in an unweighted graph.
 */

import { Graph } from '@data-structures/graph';
import { AdjacencyList } from '@src/types';

/**
 * Finds the shortest path length between a start and end node in an unweighted graph using BFS.
 * BFS guarantees the shortest path in an unweighted graph because it explores the graph layer by layer.
 *
 * @template T The type of the node identifiers.
 * @param graph The Graph instance (must be unweighted).
 * @param startNode The starting node.
 * @param endNode The target node.
 * @returns The length of the shortest path, or -1 if no path exists.
 *
 * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
 *   - Each vertex is visited once.
 *   - Each edge is traversed once (for directed graphs) or twice (for undirected graphs).
 * Space Complexity: O(V)
 *   - `queue`: Stores at most all vertices in the widest part of the BFS level.
 *   - `visited`: Stores all vertices.
 *   - `distance`: Stores distance for all vertices.
 */
export function bfsShortestPath<T>(graph: Graph<T>, startNode: T, endNode: T): number {
  // Input validation
  if (!graph.hasNode(startNode) || !graph.hasNode(endNode)) {
    console.warn(`BFS: Start node ${startNode} or end node ${endNode} not found in graph.`);
    return -1;
  }
  if (startNode === endNode) {
    return 0; // Path length to itself is 0
  }

  // Cast the adjacency list to the unweighted type
  const adj = graph.getAdjacencyList() as AdjacencyList<T>;

  // --- BFS Core Logic ---
  const queue: T[] = []; // Stores nodes to visit
  const visited = new Set<T>(); // Keeps track of visited nodes to prevent cycles and redundant processing
  const distance = new Map<T, number>(); // Stores the shortest distance from startNode to each node

  // Initialize for the start node
  queue.push(startNode);
  visited.add(startNode);
  distance.set(startNode, 0);

  let head = 0; // Pointer for efficient queue operations (avoids costly `shift()`)
  while (head < queue.length) {
    const currentNode = queue[head++];

    // If we reached the end node, return its distance
    if (currentNode === endNode) {
      return distance.get(endNode)!;
    }

    // Explore neighbors
    const neighbors = adj.get(currentNode); // Get neighbors from the (unweighted) adjacency list

    if (neighbors) { // Ensure neighbors exist
      // For unweighted graphs, neighbors is a Set<T>
      for (const neighbor of Array.from(neighbors)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          distance.set(neighbor, distance.get(currentNode)! + 1);
          queue.push(neighbor);
        }
      }
    }
  }

  // If the loop finishes and endNode was not reached, it means there's no path
  return -1;
}

/**
 * Optional variation: BFS to find the actual shortest path (nodes).
 * This typically involves storing predecessors.
 *
 * @template T The type of the node identifiers.
 * @param graph The Graph instance (must be unweighted).
 * @param startNode The starting node.
 * @param endNode The target node.
 * @returns An array of nodes representing the shortest path, or null if no path exists.
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function bfsShortestPathNodes<T>(graph: Graph<T>, startNode: T, endNode: T): T[] | null {
  if (!graph.hasNode(startNode) || !graph.hasNode(endNode)) {
    console.warn(`BFS: Start node ${startNode} or end node ${endNode} not found in graph.`);
    return null;
  }
  if (startNode === endNode) {
    return [startNode];
  }

  const adj = graph.getAdjacencyList() as AdjacencyList<T>;
  const queue: T[] = [];
  const visited = new Set<T>();
  // To reconstruct path, we need to store the predecessor of each node
  const predecessors = new Map<T, T | null>();

  queue.push(startNode);
  visited.add(startNode);
  predecessors.set(startNode, null); // Start node has no predecessor

  let head = 0;
  while (head < queue.length) {
    const currentNode = queue[head++];

    if (currentNode === endNode) {
      // Path found, reconstruct it
      const path: T[] = [];
      let crawl: T | null = endNode;
      while (crawl !== null) {
        path.unshift(crawl); // Add to the beginning of the path
        crawl = predecessors.get(crawl)!;
      }
      return path;
    }

    const neighbors = adj.get(currentNode);
    if (neighbors) {
      for (const neighbor of Array.from(neighbors)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          predecessors.set(neighbor, currentNode); // Store current node as neighbor's predecessor
          queue.push(neighbor);
        }
      }
    }
  }

  return null; // No path found
}