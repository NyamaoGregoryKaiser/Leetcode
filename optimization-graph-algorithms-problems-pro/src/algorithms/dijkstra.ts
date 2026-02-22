```typescript
/**
 * @fileoverview Implementation of Dijkstra's Shortest Path Algorithm for
 * weighted graphs with non-negative edge weights.
 */

import { Graph, NodeId, Prioritizable, PriorityQueue } from '../data-structures';

/**
 * Represents a node's state in the priority queue for Dijkstra's algorithm.
 */
interface DijkstraNode extends Prioritizable {
  nodeId: NodeId;
  distance: number; // This serves as the priority
}

/**
 * Finds the shortest path from a source node to all other reachable nodes
 * in a weighted graph with non-negative edge weights using Dijkstra's algorithm.
 *
 * Time Complexity: O(E log V) or O(E + V log V) with a binary heap.
 *   - Each of E edges is relaxed once. Relaxation involves a priority queue update/enqueue,
 *     which takes O(log V) time. So, O(E log V).
 *   - Extracting min (dequeue) V times: V * O(log V) = O(V log V).
 *   - Total: O(V log V + E log V) which simplifies to O(E log V) for connected graphs
 *     where E >= V. If E is very small, V log V might dominate.
 *   - For adjacency matrix, it's O(V^2).
 * Space Complexity: O(V + E) - for distances, parent map, visited set, and priority queue.
 *
 * @param {Graph} graph - The graph to traverse. Must have non-negative edge weights.
 * @param {NodeId} startNode - The starting node for shortest path calculation.
 * @returns {{ distances: Map<NodeId, number>, paths: Map<NodeId, NodeId | null> }}
 *   An object containing:
 *     - `distances`: A map from each node to its shortest distance from `startNode`.
 *     - `paths`: A map from each node to its predecessor on the shortest path from `startNode`.
 *                Can be used to reconstruct the full path.
 */
export function dijkstra(
  graph: Graph,
  startNode: NodeId
): { distances: Map<NodeId, number>; paths: Map<NodeId, NodeId | null> } {
  // 1. Input Validation: Check if the start node exists in the graph.
  if (!graph.hasNode(startNode)) {
    console.error(`Dijkstra Error: Start node '${startNode}' not found in the graph.`);
    return {
      distances: new Map(),
      paths: new Map()
    };
  }

  // Initialize data structures
  const distances = new Map<NodeId, number>(); // Stores the shortest distance found so far for each node
  const paths = new Map<NodeId, NodeId | null>(); // Stores the predecessor of each node in the shortest path
  const priorityQueue = new PriorityQueue<DijkstraNode>(); // Min-priority queue to get the node with the smallest distance
  const visited = new Set<NodeId>(); // To keep track of nodes whose shortest path is finalized

  // Initialize distances: All nodes to infinity, startNode to 0
  for (const node of graph.getNodes()) {
    distances.set(node, Infinity);
    paths.set(node, null); // No predecessor initially
  }
  distances.set(startNode, 0);

  // Add the start node to the priority queue
  priorityQueue.enqueue({ nodeId: startNode, distance: 0, priority: 0 });

  // 2. Main Dijkstra Loop
  while (!priorityQueue.isEmpty()) {
    const { nodeId: currentNode, distance: currentDistance } = priorityQueue.dequeue()!;

    // If we've already found the shortest path to this node and processed it, skip.
    // This is important because a node might be enqueued multiple times with different distances,
    // but we only care about the first time we extract it (which means it has the minimum distance).
    if (visited.has(currentNode)) {
      continue;
    }

    visited.add(currentNode);

    // If the distance extracted from PQ is greater than already known shortest distance, skip.
    // This handles stale entries in the priority queue.
    if (currentDistance > distances.get(currentNode)!) {
        continue;
    }

    // Explore neighbors
    for (const edge of graph.getNeighbors(currentNode)) {
      const neighbor = edge.to;
      const weight = edge.weight || 1; // Default to 1 if no weight specified (shouldn't happen in weighted graph context)

      // Dijkstra's requires non-negative edge weights. Warn if negative.
      if (weight < 0) {
        console.warn(`Dijkstra Warning: Negative edge weight detected between ${currentNode} and ${neighbor}. Dijkstra's algorithm may not produce correct results. Consider Bellman-Ford for negative weights.`);
        // For interview, this is a good point to discuss Bellman-Ford.
        // For correctness, we might choose to exit or continue with potentially incorrect results.
      }

      const distanceThroughCurrent = currentDistance + weight;

      // Relaxation step: If a shorter path to `neighbor` is found through `currentNode`
      if (distanceThroughCurrent < distances.get(neighbor)!) {
        distances.set(neighbor, distanceThroughCurrent);
        paths.set(neighbor, currentNode);
        // Enqueue the neighbor with its new, shorter distance as priority
        priorityQueue.enqueue({ nodeId: neighbor, distance: distanceThroughCurrent, priority: distanceThroughCurrent });
      }
    }
  }

  return { distances, paths };
}

/**
 * Reconstructs the shortest path from the start node to a target node
 * using the `paths` map generated by Dijkstra's algorithm.
 *
 * @param {NodeId} startNode - The initial node from which Dijkstra was run.
 * @param {NodeId} targetNode - The node to which the path needs to be reconstructed.
 * @param {Map<NodeId, NodeId | null>} paths - The predecessor map from Dijkstra's result.
 * @returns {NodeId[] | null} An array of node IDs representing the path, or null if no path exists.
 *
 * Time Complexity: O(V) - In the worst case, we traverse back through all V nodes.
 * Space Complexity: O(V) - For storing the path array.
 */
export function reconstructDijkstraPath(
  startNode: NodeId,
  targetNode: NodeId,
  paths: Map<NodeId, NodeId | null>
): NodeId[] | null {
  if (!paths.has(targetNode) || paths.get(targetNode) === undefined && targetNode !== startNode) {
    // Target node was not reached, or doesn't exist in the path map
    return null;
  }
  if (startNode === targetNode) {
    return [startNode];
  }

  const path: NodeId[] = [];
  let currentNode: NodeId | null = targetNode;

  while (currentNode !== null) {
    path.unshift(currentNode);
    if (currentNode === startNode) { // Path found back to start node
      return path;
    }
    currentNode = paths.get(currentNode) || null; // Move to parent

    // Edge case: If current node becomes null before reaching startNode, it means no valid path exists
    // (e.g., target node is in a disconnected component or the path map is corrupted)
    if (currentNode === null && path[0] !== startNode) {
      return null;
    }
  }

  // If loop finishes and start node not reached, something went wrong, or no path.
  // This case implies a target node was in the path map, but not reachable from startNode.
  return null;
}
```