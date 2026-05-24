```typescript
/**
 * Common TypeScript types used across the graph algorithms project.
 */

/**
 * Type for an adjacency list representation of a graph.
 * Key: node ID (number)
 * Value: array of neighbors, where each neighbor is represented as a tuple [neighborNodeId, weight].
 * For unweighted graphs, weight can be 1 or omitted.
 */
export type AdjacencyList = Map<number, [number, number][]>;

/**
 * Type for an adjacency matrix representation of a graph.
 * A 2D array where matrix[i][j] is the weight of the edge from i to j.
 * Infinity (or a large number) represents no edge.
 */
export type AdjacencyMatrix = number[][];

/**
 * Type for an edge in a graph, typically used in algorithms like Kruskal's.
 * Tuple: [source, destination, weight]
 */
export type Edge = [number, number, number];

/**
 * Type for coordinates in a 2D grid.
 * Tuple: [row, column]
 */
export type GridCoord = [number, number];

/**
 * Interface for a graph node, useful for BFS/DFS when tracking distance or parent.
 */
export interface GraphNode {
    id: number;
    distance: number;
    // Potentially more fields like `parent` for path reconstruction
}

/**
 * Interface for a priority queue element.
 * Used in Dijkstra's Min-Heap, where `priority` is the distance.
 */
export interface PriorityQueueElement<T> {
    value: T;
    priority: number;
}
```