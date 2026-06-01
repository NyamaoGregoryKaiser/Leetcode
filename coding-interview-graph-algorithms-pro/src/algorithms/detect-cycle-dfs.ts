```typescript
import { Graph } from '../data-structures/Graph';

/**
 * Detects if a directed graph contains a cycle using Depth-First Search (DFS).
 *
 * The algorithm uses three states for each node during DFS:
 * 0: Unvisited - The node has not been visited yet.
 * 1: Visiting (Grey) - The node is currently in the recursion stack (part of the current DFS path).
 * 2: Visited (Black) - The node has been completely processed and is no longer in the recursion stack.
 *
 * A cycle is detected if, during DFS, we encounter a node that is currently in the 'visiting' state (state 1).
 *
 * Time Complexity: O(V + E)
 *   - V: Number of vertices, E: Number of edges.
 *   - Each vertex and each edge is visited at most once.
 * Space Complexity: O(V)
 *   - `nodeStates` map: Stores V entries.
 *   - Recursion stack: In the worst case (a long path), it can go up to V depth.
 *
 * @param graph - The directed graph to check for cycles.
 * @returns `true` if a cycle is found, `false` otherwise.
 */
export function detectCycleInDirectedGraphDFS<T extends string | number>(graph: Graph<T>): boolean {
    // Map to store the state of each node: 0 (unvisited), 1 (visiting), 2 (visited).
    const nodeStates: Map<T, 0 | 1 | 2> = new Map();

    // Initialize all nodes as unvisited (state 0).
    for (const node of graph.getNodes()) {
        nodeStates.set(node, 0);
    }

    /**
     * Helper function for performing DFS starting from a given node.
     * @param node - The current node to visit.
     * @returns `true` if a cycle is detected during this DFS path, `false` otherwise.
     */
    const dfs = (node: T): boolean => {
        // Mark the current node as 'visiting' (state 1).
        nodeStates.set(node, 1);

        // Recursively visit all neighbors.
        for (const { neighbor } of graph.getNeighbors(node)) {
            const neighborState = nodeStates.get(neighbor)!;

            if (neighborState === 1) {
                // If a neighbor is in the 'visiting' state, it means we've found a back-edge
                // to a node that is currently in our recursion stack, indicating a cycle.
                return true;
            }

            if (neighborState === 0) {
                // If a neighbor is unvisited, recurse on it.
                if (dfs(neighbor)) {
                    // If a cycle is found in the recursive call, propagate it up.
                    return true;
                }
            }
            // If neighborState is 2 (visited), it means we've already processed this subtree
            // and no cycle was found through it, so we can skip it.
        }

        // After visiting all neighbors and their subtrees, mark the current node as 'visited' (state 2).
        // It's safe to remove it from the current recursion stack (conceptual 'grey' state).
        nodeStates.set(node, 2);
        return false; // No cycle found starting from this node or its descendants.
    };

    // Iterate through all nodes to ensure all connected components are checked.
    // This is important for graphs that might not be fully connected.
    for (const node of graph.getNodes()) {
        if (nodeStates.get(node) === 0) {
            // If the node hasn't been visited yet, start a new DFS traversal from it.
            if (dfs(node)) {
                return true; // A cycle was found.
            }
        }
    }

    // No cycles found in any component of the graph.
    return false;
}
```