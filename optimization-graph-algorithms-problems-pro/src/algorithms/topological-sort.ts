```typescript
/**
 * @fileoverview Implementations of Topological Sort for Directed Acyclic Graphs (DAGs).
 * Provides both Kahn's algorithm (BFS-based) and a DFS-based approach.
 */

import { Graph, NodeId } from '../data-structures';

/**
 * Performs Topological Sort using Kahn's algorithm (BFS-based).
 * This algorithm works by iteratively removing nodes with an in-degree of 0.
 *
 * Time Complexity: O(V + E) - Each vertex and edge is processed a constant number of times.
 * Space Complexity: O(V) - For storing in-degrees, queue, and the result list.
 *
 * @param {Graph} graph - The directed acyclic graph (DAG) to sort.
 * @returns {NodeId[] | null} An array of NodeIds representing a valid topological ordering,
 *                            or null if the graph contains a cycle (not a DAG).
 */
export function topologicalSortKahn(graph: Graph): NodeId[] | null {
  if (!graph.isDirected()) {
    console.error("topologicalSortKahn Error: Kahn's algorithm is only applicable to directed graphs.");
    return null;
  }

  const inDegrees = graph.getAllInDegrees(); // Get initial in-degrees for all nodes
  const queue: NodeId[] = []; // Queue for nodes with in-degree 0
  const sortedOrder: NodeId[] = []; // Stores the resulting topological order
  let visitedNodesCount = 0; // To detect cycles

  // 1. Initialize queue with all nodes having an in-degree of 0.
  for (const node of graph.getNodes()) {
    if (inDegrees.get(node) === 0) {
      queue.push(node);
    }
  }

  // 2. Process nodes from the queue
  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    sortedOrder.push(currentNode);
    visitedNodesCount++; // Increment count of nodes added to sorted order

    // For each neighbor of the current node
    for (const edge of graph.getNeighbors(currentNode)) {
      const neighbor = edge.to;
      const currentInDegree = inDegrees.get(neighbor)!;

      // Decrement in-degree of neighbor
      inDegrees.set(neighbor, currentInDegree - 1);

      // If neighbor's in-degree becomes 0, add it to the queue
      if (inDegrees.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // 3. Cycle Detection: If the number of nodes in the sorted order
  //    is less than the total number of nodes in the graph, a cycle exists.
  if (visitedNodesCount !== graph.getNodes().length) {
    console.warn("topologicalSortKahn Warning: Graph contains a cycle. A topological sort is not possible.");
    return null; // Graph has a cycle
  }

  return sortedOrder;
}

/**
 * Node states for DFS-based topological sort.
 * - UNVISITED: Node has not been visited yet.
 * - VISITING: Node is currently in the recursion stack (part of the current DFS path).
 * - VISITED: Node has been fully explored.
 */
enum NodeState {
  UNVISITED,
  VISITING, // For cycle detection
  VISITED,
}

/**
 * Performs Topological Sort using a Depth-First Search (DFS) based approach.
 * The idea is that in a DAG, a node can only be added to the topological sort
 * list after all its dependent nodes (nodes reachable from it) have been processed.
 * This means we add nodes to the front of the list *after* visiting all their children.
 *
 * Time Complexity: O(V + E) - Each vertex and edge is visited at most once.
 * Space Complexity: O(V) - For the recursion stack, `nodeStates` map, and the result list.
 *
 * @param {Graph} graph - The directed acyclic graph (DAG) to sort.
 * @returns {NodeId[] | null} An array of NodeIds representing a valid topological ordering,
 *                            or null if the graph contains a cycle (not a DAG).
 */
export function topologicalSortDFS(graph: Graph): NodeId[] | null {
  if (!graph.isDirected()) {
    console.error("topologicalSortDFS Error: DFS-based topological sort is only applicable to directed graphs.");
    return null;
  }

  const nodeStates = new Map<NodeId, NodeState>();
  // Initialize all nodes as UNVISITED
  for (const node of graph.getNodes()) {
    nodeStates.set(node, NodeState.UNVISITED);
  }

  const sortedOrder: NodeId[] = []; // Stores the resulting topological order

  // Iterate over all nodes. This ensures that disconnected components are also checked.
  for (const node of graph.getNodes()) {
    if (nodeStates.get(node) === NodeState.UNVISITED) {
      // If dfsVisit finds a cycle, it will return false, indicating failure.
      if (!dfsVisitForTopologicalSort(node, graph, nodeStates, sortedOrder)) {
        console.warn("topologicalSortDFS Warning: Graph contains a cycle. A topological sort is not possible.");
        return null; // Cycle detected, cannot perform topological sort
      }
    }
  }

  // The `sortedOrder` is built in reverse during DFS, so we return it as is.
  // The first node pushed to sortedOrder is the one with no dependencies (or its descendants are all sorted).
  // The last node pushed has no dependencies on other nodes in the graph.
  // Alternatively, one could unshift nodes to `sortedOrder` if a standard left-to-right reading is preferred.
  // Common implementations often push and then reverse.
  // E.g., if A -> B, when DFS(B) completes, B is pushed. When DFS(A) completes, A is pushed. Result: [B, A].
  // But for topological order, A must come before B. So we should reverse.
  return sortedOrder.reverse();
}

/**
 * Recursive helper function for DFS-based topological sort.
 * It performs a DFS traversal, adding nodes to the `sortedOrder` list
 * only after all their descendants have been visited.
 *
 * @param {NodeId} currentNode - The node currently being visited.
 * @param {Graph} graph - The graph being traversed.
 * @param {Map<NodeId, NodeState>} nodeStates - Map to keep track of each node's state for cycle detection.
 * @param {NodeId[]} sortedOrder - The list to build the topological order.
 * @returns {boolean} True if the DFS path from `currentNode` is acyclic, false if a cycle is detected.
 */
function dfsVisitForTopologicalSort(
  currentNode: NodeId,
  graph: Graph,
  nodeStates: Map<NodeId, NodeState>,
  sortedOrder: NodeId[]
): boolean {
  // Mark current node as VISITING (in the recursion stack)
  nodeStates.set(currentNode, NodeState.VISITING);

  // Explore neighbors
  for (const edge of graph.getNeighbors(currentNode)) {
    const neighbor = edge.to;
    const neighborState = nodeStates.get(neighbor);

    if (neighborState === NodeState.UNVISITED) {
      // If neighbor is unvisited, recurse. If a cycle is found in deeper recursion, return false.
      if (!dfsVisitForTopologicalSort(neighbor, graph, nodeStates, sortedOrder)) {
        return false; // Cycle detected
      }
    } else if (neighborState === NodeState.VISITING) {
      // If neighbor is VISITING, it means we found a back-edge to a node
      // already in the current recursion stack, hence a cycle.
      return false; // Cycle detected
    }
    // If neighborState is VISITED, it's already processed, ignore.
  }

  // After visiting all neighbors and their subtrees, mark current node as VISITED.
  // Then, add it to the sorted order. This ensures that a node is added *after* all
  // nodes reachable from it have been processed.
  nodeStates.set(currentNode, NodeState.VISITED);
  sortedOrder.push(currentNode); // Add to the end (will be reversed later)

  return true; // No cycle found from this path
}
```