```typescript
import { Graph } from '../data-structures/Graph';

/**
 * Finds the shortest path (in terms of number of edges) between a start node
 * and an end node in an unweighted graph using Breadth-First Search (BFS).
 *
 * Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
 *   - Each vertex is visited once.
 *   - Each edge is traversed once.
 * Space Complexity: O(V)
 *   - `queue`: Stores at most V nodes.
 *   - `visited`: Stores V nodes.
 *   - `parentMap`: Stores V nodes.
 *
 * @param graph - The graph to search within (can be directed or undirected, but should be unweighted for shortest path by edge count).
 * @param startNode - The starting node for the path.
 * @param endNode - The target node for the path.
 * @returns An object containing:
 *   - `path`: An array of nodes representing the shortest path from startNode to endNode.
 *             Returns an empty array if no path exists.
 *   - `distance`: The number of edges in the shortest path. Returns -1 if no path exists.
 */
export function bfsShortestPath<T extends string | number>(
    graph: Graph<T>,
    startNode: T,
    endNode: T
): { path: T[]; distance: number } {
    // 1. Validate start and end nodes
    if (!graph.hasNode(startNode) || !graph.hasNode(endNode)) {
        console.warn(`BFS: Start node ${startNode} or end node ${endNode} not found in graph.`);
        return { path: [], distance: -1 };
    }

    // If start and end nodes are the same, the path is just the node itself, distance 0.
    if (startNode === endNode) {
        return { path: [startNode], distance: 0 };
    }

    // Queue for BFS traversal: stores nodes to visit.
    const queue: T[] = [];
    // Set to keep track of visited nodes to avoid cycles and redundant processing.
    const visited: Set<T> = new Set();
    // Map to reconstruct the path: maps a node to its parent in the BFS tree.
    const parentMap: Map<T, T | null> = new Map();
    // Map to store distances from the start node.
    const distances: Map<T, number> = new Map();

    // Initialize BFS for the start node.
    queue.push(startNode);
    visited.add(startNode);
    parentMap.set(startNode, null); // Start node has no parent
    distances.set(startNode, 0);

    let head = 0; // Optimization for array-based queue in JS/TS
    while (head < queue.length) {
        const currentNode = queue[head++]; // Dequeue
        const currentDistance = distances.get(currentNode)!;

        // If we reached the end node, we can stop and reconstruct the path.
        if (currentNode === endNode) {
            return reconstructPath(startNode, endNode, parentMap, distances.get(endNode)!);
        }

        // Explore neighbors
        for (const { neighbor } of graph.getNeighbors(currentNode)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parentMap.set(neighbor, currentNode);
                distances.set(neighbor, currentDistance + 1);
                queue.push(neighbor); // Enqueue neighbor
            }
        }
    }

    // If the loop finishes and endNode was not reached, no path exists.
    return { path: [], distance: -1 };
}

/**
 * Helper function to reconstruct the path from the parent map.
 * @param startNode - The starting node.
 * @param endNode - The destination node.
 * @param parentMap - A map storing the parent of each node in the BFS tree.
 * @param finalDistance - The distance to the end node.
 * @returns An object containing the path array and its distance.
 */
function reconstructPath<T extends string | number>(
    startNode: T,
    endNode: T,
    parentMap: Map<T, T | null>,
    finalDistance: number
): { path: T[]; distance: number } {
    const path: T[] = [];
    let currentNode: T | null = endNode;

    // Traverse back from endNode to startNode using parentMap
    while (currentNode !== null) {
        path.unshift(currentNode); // Add to the beginning of the path
        currentNode = parentMap.get(currentNode) || null;
    }

    // If the path doesn't start with the startNode, it means no valid path was found (e.g., disconnected graph part)
    // This check is mainly for robustness, as the BFS loop should prevent this if endNode was reachable.
    if (path[0] !== startNode) {
        return { path: [], distance: -1 };
    }

    return { path, distance: finalDistance };
}

```