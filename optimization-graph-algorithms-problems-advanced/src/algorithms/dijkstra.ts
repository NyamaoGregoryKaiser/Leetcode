/**
 * src/algorithms/dijkstra.ts
 * Implements Dijkstra's Algorithm to find the shortest paths from a single source
 * to all other nodes in a weighted graph with non-negative edge weights.
 */

import { Graph } from '@data-structures/graph';
import { PriorityQueue } from '@data-structures/priority-queue';
import { WeightedAdjacencyList, WeightedEdge } from '@src/types';

/**
 * Runs Dijkstra's algorithm to find the shortest distances from a start node to all other nodes
 * in a weighted graph with non-negative edge weights.
 *
 * @template T The type of the node identifiers.
 * @param graph The weighted Graph instance (must have non-negative edge weights).
 * @param startNode The starting node for finding shortest paths.
 * @returns A Map where keys are node IDs and values are their shortest distances from `startNode`.
 *          If a node is unreachable, its distance is `Infinity`.
 *
 * Time Complexity: O(E log V)
 *   - E: number of edges, V: number of vertices.
 *   - Each edge relaxation (updating neighbor's distance and enqueueing) takes O(log V) due to priority queue operations.
 *   - Each vertex is dequeued once (O(log V)).
 *   - Total: V * O(log V) + E * O(log V) => O((V + E) log V). If E >> V, this simplifies to O(E log V).
 * Space Complexity: O(V + E)
 *   - `distances`: Stores distance for all V nodes (O(V)).
 *   - `priorityQueue`: Stores up to V elements (O(V)).
 *   - `previousNodes`: Stores predecessor for all V nodes (O(V)).
 *   - `adj`: Adjacency list (O(V + E)).
 */
export function dijkstra<T>(graph: Graph<T>, startNode: T): Map<T, number> {
  // Input validation
  if (!graph.hasNode(startNode)) {
    console.warn(`Dijkstra: Start node ${startNode} not found in graph.`);
    return new Map();
  }
  // This algorithm assumes non-negative edge weights. Negative weights require Bellman-Ford.

  // Cast the adjacency list to the weighted type
  const adj = graph.getAdjacencyList() as WeightedAdjacencyList<T>;
  const nodes = graph.getNodes();

  // --- Initialization ---
  // `distances`: Stores the shortest distance from `startNode` to every other node.
  // Initialized to Infinity for all nodes, 0 for the start node.
  const distances = new Map<T, number>();
  // `previousNodes`: Stores the predecessor of each node in the shortest path,
  // useful for reconstructing the actual path.
  const previousNodes = new Map<T, T | null>();
  // `priorityQueue`: Stores nodes to visit, ordered by their current shortest distance.
  const priorityQueue = new PriorityQueue<T>();

  // Initialize all distances to Infinity, previous to null
  for (const node of nodes) {
    distances.set(node, Infinity);
    previousNodes.set(node, null);
  }

  // Set distance of startNode to 0 and add it to the priority queue
  distances.set(startNode, 0);
  priorityQueue.enqueue(startNode, 0);

  // --- Dijkstra's Core Logic ---
  while (!priorityQueue.isEmpty()) {
    // Extract the node with the smallest distance from the priority queue
    const { value: currentNode, priority: currentDistance } = priorityQueue.dequeue()!;

    // Optimization: If we've already found a shorter path to currentNode, skip.
    // This can happen because we might enqueue a node multiple times with different distances.
    if (currentDistance > distances.get(currentNode)!) {
      continue;
    }

    // Iterate over all neighbors of the current node
    const neighbors = adj.get(currentNode);

    if (neighbors) { // Ensure neighbors exist
      for (const edge of neighbors) {
        const neighborNode = edge.to;
        const edgeWeight = edge.weight;

        // Calculate the distance to the neighbor through the current node
        const newDistance = currentDistance + edgeWeight;

        // If this new path is shorter than the previously known shortest path to the neighbor
        if (newDistance < distances.get(neighborNode)!) {
          // Update the shortest distance
          distances.set(neighborNode, newDistance);
          // Set the current node as the predecessor for the neighbor
          previousNodes.set(neighborNode, currentNode);
          // Add/update the neighbor in the priority queue with its new shortest distance
          priorityQueue.enqueue(neighborNode, newDistance);
        }
      }
    }
  }

  return distances;
}

/**
 * Reconstructs the shortest path from `startNode` to `endNode` using the `previousNodes` map.
 * This function is typically called after `dijkstra` has been run.
 *
 * @template T The type of the node identifiers.
 * @param previousNodes A map of nodes to their predecessors in the shortest path.
 * @param startNode The original start node of Dijkstra's algorithm.
 * @param endNode The target node for which to reconstruct the path.
 * @returns An array of nodes representing the shortest path from `startNode` to `endNode`,
 *          or null if `endNode` is unreachable or not found.
 *
 * Time Complexity: O(L), where L is the length of the path. In the worst case, O(V).
 * Space Complexity: O(L) to store the path.
 */
export function reconstructPath<T>(
  previousNodes: Map<T, T | null>,
  startNode: T,
  endNode: T
): T[] | null {
  const path: T[] = [];
  let currentNode: T | null = endNode;

  // Traverse backwards from endNode to startNode using predecessors
  while (currentNode !== null) {
    path.unshift(currentNode); // Add to the beginning of the path
    currentNode = previousNodes.get(currentNode)!;
  }

  // If the path starts with endNode but not startNode (meaning endNode was unreachable
  // or no path was found back to startNode), return null.
  // Exception: if startNode == endNode, path will be [startNode], which is correct.
  if (path[0] !== startNode && path.length > 0) {
    return null; // Path does not start with the startNode, indicating unreachable.
  }
  if (path.length === 0 && startNode !== endNode) { // No path if empty and not same start/end
    return null;
  }
  if (path.length === 1 && path[0] === startNode && startNode === endNode) {
    return path; // Path to self
  }
  if (path.length === 1 && path[0] === endNode && startNode !== endNode) {
    return null; // Only endNode is in path, meaning it's unreachable from startNode
  }

  return path;
}