```typescript
/**
 * @fileoverview Implementation of cycle detection in a directed graph using DFS.
 * Also includes cycle detection for undirected graphs (where cycles are more common).
 */

import { Graph, NodeId } from '../data-structures';

/**
 * Node states for DFS-based cycle detection in directed graphs.
 * - UNVISITED: Node has not been visited yet.
 * - VISITING: Node is currently in the recursion stack (part of the current DFS path).
 * - VISITED: Node has been fully explored (all its descendants visited).
 */
enum NodeState {
  UNVISITED,
  VISITING,
  VISITED,
}

/**
 * Detects if a directed graph contains any cycles using Depth-First Search (DFS).
 *
 * A cycle exists if, during a DFS traversal, we encounter a node that is currently
 * in the recursion stack (i.e., its state is `VISITING`). This indicates a back-edge.
 *
 * Time Complexity: O(V + E) - Each vertex and each edge is visited at most once.
 * Space Complexity: O(V) - For the recursion stack (call stack) and the `nodeStates` map.
 *
 * @param {Graph} graph - The directed graph to check for cycles.
 * @returns {boolean} True if a cycle is detected, false otherwise.
 */
export function detectCycleInDirectedGraphDFS(graph: Graph): boolean {
  if (!graph.isDirected()) {
    console.warn("detectCycleInDirectedGraphDFS: Graph is not directed. Consider using detectCycleInUndirectedGraph for better semantics.");
    // This algorithm *can* be used on an undirected graph, but it will detect cycles
    // from any two-way edge (u-v is considered u->v and v->u), which is often not the
    // intended "cycle" for undirected graphs in an interview context (where a cycle is
    // typically a path that starts and ends at the same vertex, visiting other vertices,
    // and not simply traversing an edge back to its immediate parent).
  }

  const nodeStates = new Map<NodeId, NodeState>();
  // Initialize all nodes as UNVISITED
  for (const node of graph.getNodes()) {
    nodeStates.set(node, NodeState.UNVISITED);
  }

  // Iterate over all nodes. This ensures that disconnected components are also checked.
  for (const node of graph.getNodes()) {
    if (nodeStates.get(node) === NodeState.UNVISITED) {
      if (dfsVisitForDirectedCycle(node, graph, nodeStates)) {
        return true; // Cycle found
      }
    }
  }

  return false; // No cycle found after checking all components
}

/**
 * Recursive helper function for DFS-based cycle detection in directed graphs.
 *
 * @param {NodeId} currentNode - The node currently being visited.
 * @param {Graph} graph - The graph being traversed.
 * @param {Map<NodeId, NodeState>} nodeStates - Map to keep track of each node's state.
 * @returns {boolean} True if a cycle is detected from `currentNode` onwards, false otherwise.
 */
function dfsVisitForDirectedCycle(
  currentNode: NodeId,
  graph: Graph,
  nodeStates: Map<NodeId, NodeState>
): boolean {
  // Mark current node as VISITING (in the recursion stack)
  nodeStates.set(currentNode, NodeState.VISITING);

  // Explore neighbors
  for (const edge of graph.getNeighbors(currentNode)) {
    const neighbor = edge.to;
    const neighborState = nodeStates.get(neighbor);

    if (neighborState === NodeState.UNVISITED) {
      // If neighbor is unvisited, recurse
      if (dfsVisitForDirectedCycle(neighbor, graph, nodeStates)) {
        return true; // Cycle found in a deeper recursion
      }
    } else if (neighborState === NodeState.VISITING) {
      // If neighbor is VISITING, it means we found a back-edge to a node
      // already in the current recursion stack, hence a cycle.
      return true;
    }
    // If neighborState is VISITED, it means that node and its subtree have already
    // been processed and no cycle was found there, so we can ignore it.
  }

  // After visiting all neighbors, mark current node as VISITED (out of recursion stack)
  nodeStates.set(currentNode, NodeState.VISITED);
  return false; // No cycle found from this path
}

/**
 * Detects if an UNDIRECTED graph contains any cycles using Depth-First Search (DFS).
 *
 * In an undirected graph, an edge `(u, v)` means `u -> v` and `v -> u`.
 * A cycle exists if, during DFS, we encounter a visited node that is *not* the direct parent
 * of the current node in the DFS tree.
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V) - For the recursion stack and `visited` set.
 *
 * @param {Graph} graph - The undirected graph to check for cycles.
 * @returns {boolean} True if a cycle is detected, false otherwise.
 */
export function detectCycleInUndirectedGraphDFS(graph: Graph): boolean {
  if (graph.isDirected()) {
    console.warn("detectCycleInUndirectedGraphDFS: Graph is directed. Consider using detectCycleInDirectedGraphDFS for better semantics.");
  }

  const visited = new Set<NodeId>();

  for (const node of graph.getNodes()) {
    if (!visited.has(node)) {
      if (dfsVisitForUndirectedCycle(node, null, graph, visited)) {
        return true; // Cycle found
      }
    }
  }
  return false; // No cycle found
}

/**
 * Recursive helper function for DFS-based cycle detection in undirected graphs.
 *
 * @param {NodeId} currentNode - The node currently being visited.
 * @param {NodeId | null} parentNode - The node from which `currentNode` was visited. Used to avoid trivial back-edges.
 * @param {Graph} graph - The graph being traversed.
 * @param {Set<NodeId>} visited - Set to keep track of visited nodes.
 * @returns {boolean} True if a cycle is detected from `currentNode` onwards, false otherwise.
 */
function dfsVisitForUndirectedCycle(
  currentNode: NodeId,
  parentNode: NodeId | null,
  graph: Graph,
  visited: Set<NodeId>
): boolean {
  visited.add(currentNode);

  for (const edge of graph.getNeighbors(currentNode)) {
    const neighbor = edge.to;

    // If neighbor is the parent, this is a trivial back-edge in an undirected graph (just traversing back the edge we came from). Ignore it.
    if (neighbor === parentNode) {
      continue;
    }

    // If neighbor is already visited and is not the parent, then a cycle is detected.
    // This is because we found another path to a node that's already part of the current component,
    // but not via the immediate parent.
    if (visited.has(neighbor)) {
      return true;
    }

    // If neighbor is unvisited, recurse. If a cycle is found in the subtree, propagate true.
    if (dfsVisitForUndirectedCycle(neighbor, currentNode, graph, visited)) {
      return true;
    }
  }

  return false; // No cycle found from this path
}
```