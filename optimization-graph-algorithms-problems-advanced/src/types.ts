/**
 * src/types.ts
 * Defines common TypeScript types and interfaces used across the project.
 */

// --- Graph Types ---

/**
 * Represents an adjacency list for an unweighted graph.
 * Key is the node ID (number or string), value is a set of its neighbors.
 */
export type AdjacencyList<T = number> = Map<T, Set<T>>;

/**
 * Represents an edge in a weighted graph.
 * `to`: The destination node.
 * `weight`: The weight of the edge.
 */
export interface WeightedEdge<T = number> {
  to: T;
  weight: number;
}

/**
 * Represents an adjacency list for a weighted graph.
 * Key is the node ID, value is an array of WeightedEdge objects.
 */
export type WeightedAdjacencyList<T = number> = Map<T, WeightedEdge<T>[]>;

/**
 * Represents a generic edge, used for Kruskal's.
 */
export interface Edge<T = number> {
  u: T; // start node
  v: T; // end node
  weight: number;
}

// --- Priority Queue Types ---

/**
 * Represents an item stored in the Priority Queue.
 * `value`: The actual data stored.
 * `priority`: The priority associated with the value (lower value usually means higher priority).
 */
export interface PriorityQueueItem<T> {
  value: T;
  priority: number;
}