/**
 * src/algorithms/dfs-cycle-detection.ts
 * Implements Depth-First Search (DFS) for cycle detection in a directed graph.
 */

import { Graph } from '@data-structures/graph';
import { AdjacencyList } from '@src/types';

/**
 * Enum to represent the state of a node during DFS traversal for cycle detection.
 * - `UNVISITED`: Node has not been visited yet.
 * - `VISITING`: Node is currently in the recursion stack (being visited).
 * - `VISITED`: Node has been fully visited and all its descendants processed.
 */
enum NodeState {
  UNVISITED,
  VISITING,
  VISITED,
}

/**
 * Detects if a directed graph contains a cycle using Depth-First Search (DFS).
 * A cycle exists if, during a DFS traversal, we encounter a `VISITING` node,
 * meaning we've found a back-edge to a node currently in the recursion stack.
 *
 * @template T The type of the node identifiers.
 * @param graph The directed Graph instance (unweighted or weighted).
 * @returns True if a cycle is detected, false otherwise.
 *
 * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
 *   - Each vertex and each edge is processed at most a constant number of times.
 * Space Complexity: O(V)
 *   - `nodeStates`: Stores the state for each vertex.
 *   - Recursion stack: In the worst case (a long path), can be O(V).
 */
export function detectCycleInDirectedGraphDFS<T>(graph: Graph<T>): boolean {
  // Input validation: Ensure the graph is directed.
  // Note: While this algorithm can technically run on undirected,
  // it would typically require a 'parent' check to avoid treating
  // (u, v) and (v, u) as a cycle. For directed graphs, no such check is needed.
  // For undirected graphs, a cycle detection would often check for back-edges
  // to any *non-parent* visited node.
  // For this implementation, we assume a directed graph as the primary use case.

  const nodes = graph.getNodes();
  // Map to store the state of each node (UNVISITED, VISITING, VISITED)
  const nodeStates = new Map<T, NodeState>();
  // Initialize all nodes as UNVISITED
  for (const node of nodes) {
    nodeStates.set(node, NodeState.UNVISITED);
  }

  // Iterate over all nodes. This ensures that disconnected components are also checked for cycles.
  for (const node of nodes) {
    if (nodeStates.get(node) === NodeState.UNVISITED) {
      // If a cycle is found during the DFS from this node, return true immediately.
      if (dfsVisit(node, graph.getAdjacencyList() as AdjacencyList<T>, nodeStates)) {
        return true;
      }
    }
  }

  // No cycle found in any component
  return false;
}

/**
 * Helper function for DFS traversal, used to detect cycles.
 * This is a recursive implementation of DFS.
 *
 * @template T The type of the node identifiers.
 * @param currentNode The node currently being visited.
 * @param adj The adjacency list of the graph.
 * @param nodeStates A map tracking the state of each node.
 * @returns True if a cycle is detected starting from `currentNode`'s path, false otherwise.
 */
function dfsVisit<T>(
  currentNode: T,
  adj: AdjacencyList<T>,
  nodeStates: Map<T, NodeState>,
): boolean {
  // Mark the current node as VISITING (it's in the recursion stack)
  nodeStates.set(currentNode, NodeState.VISITING);

  // Get neighbors of the current node. Ensure it's treated as unweighted for iteration.
  const neighbors = adj.get(currentNode);

  if (neighbors) { // Check if neighbors exist
    for (const neighbor of Array.from(neighbors)) { // Iterate through neighbors (Set for unweighted)
      const neighborState = nodeStates.get(neighbor);

      if (neighborState === NodeState.VISITING) {
        // If a neighbor is currently being visited (in the recursion stack), we found a back-edge.
        // This indicates a cycle.
        return true;
      }
      if (neighborState === NodeState.UNVISITED) {
        // If an unvisited neighbor exists, recursively call DFS on it.
        // If the recursive call finds a cycle, propagate true upwards.
        if (dfsVisit(neighbor, adj, nodeStates)) {
          return true;
        }
      }
      // If neighborState is VISITED, we skip it as it's already processed and guaranteed not to be part of a cycle
      // in the current path.
    }
  }

  // After visiting all neighbors and their descendants, mark the current node as VISITED.
  // It's no longer in the recursion stack.
  nodeStates.set(currentNode, NodeState.VISITED);
  return false; // No cycle found through this path
}

/**
 * Optional variation: Iterative DFS for cycle detection.
 * Avoids recursion stack limits and can sometimes be more efficient in terms of memory overhead
 * for very deep graphs, though the logic is slightly more complex.
 *
 * @template T The type of the node identifiers.
 * @param graph The directed Graph instance.
 * @returns True if a cycle is detected, false otherwise.
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V) (for stack and nodeStates)
 */
export function detectCycleInDirectedGraphDFSIterative<T>(graph: Graph<T>): boolean {
  const nodes = graph.getNodes();
  const nodeStates = new Map<T, NodeState>();
  for (const node of nodes) {
    nodeStates.set(node, NodeState.UNVISITED);
  }

  // Iterate through all nodes to handle disconnected components
  for (const initialNode of nodes) {
    if (nodeStates.get(initialNode) === NodeState.UNVISITED) {
      const stack: T[] = []; // Mimics the recursion stack
      stack.push(initialNode);
      nodeStates.set(initialNode, NodeState.VISITING);

      while (stack.length > 0) {
        const currentNode = stack[stack.length - 1]; // Peek at the top of the stack

        let hasUnvisitedNeighbor = false;
        const neighbors = graph.getAdjacencyList().get(currentNode); // Get neighbors from the map
        const actualNeighbors = neighbors ? (neighbors instanceof Set ? Array.from(neighbors) : neighbors.map((e: any) => e.to)) : [];


        for (const neighbor of actualNeighbors) {
          const neighborState = nodeStates.get(neighbor);

          if (neighborState === NodeState.VISITING) {
            // Found a back-edge! Cycle detected.
            return true;
          }
          if (neighborState === NodeState.UNVISITED) {
            // Found an unvisited neighbor, push it to stack and continue DFS from there
            nodeStates.set(neighbor, NodeState.VISITING);
            stack.push(neighbor);
            hasUnvisitedNeighbor = true;
            break; // Continue DFS from the new node
          }
        }

        if (!hasUnvisitedNeighbor) {
          // No unvisited neighbors, or all neighbors and their subtrees have been fully explored.
          // Pop current node and mark as VISITED.
          stack.pop();
          nodeStates.set(currentNode, NodeState.VISITED);
        }
      }
    }
  }

  return false; // No cycle detected
}