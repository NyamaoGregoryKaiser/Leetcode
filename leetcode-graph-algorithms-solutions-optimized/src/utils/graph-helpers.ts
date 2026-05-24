```typescript
import { AdjacencyList, AdjacencyMatrix, Edge, GridCoord } from '../types';

/**
 * Utility functions for graph representation and manipulation.
 */

/**
 * Converts an array of edges into an adjacency list representation.
 * Handles both directed and undirected graphs, and weighted/unweighted edges.
 * If graph is undirected, each edge [u, v, w] becomes u -> [[v,w]] and v -> [[u,w]].
 * Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges.
 * Space Complexity: O(V + E) for the adjacency list.
 * @param n The number of nodes in the graph (0 to n-1, or 1 to n if specified).
 * @param edges An array of edges, where each edge is `[u, v, weight]`.
 *              If `weight` is omitted, it defaults to 1.
 * @param isDirected Boolean indicating if the graph is directed. Defaults to false (undirected).
 * @param isOneIndexed Boolean indicating if nodes are 1-indexed. Defaults to false (0-indexed).
 * @returns An `AdjacencyList` (Map<number, [number, number][]>).
 */
export function buildAdjacencyList(n: number, edges: Edge[], isDirected: boolean = false, isOneIndexed: boolean = false): AdjacencyList {
    const adjList: AdjacencyList = new Map();

    // Initialize all nodes in the adjacency list
    const startNode = isOneIndexed ? 1 : 0;
    const endNode = isOneIndexed ? n : n - 1;
    for (let i = startNode; i <= endNode; i++) {
        adjList.set(i, []);
    }

    for (const [u, v, weight = 1] of edges) {
        // Add edge u -> v
        adjList.get(u)?.push([v, weight]);

        // If undirected, add edge v -> u
        if (!isDirected) {
            adjList.get(v)?.push([u, weight]);
        }
    }

    return adjList;
}

/**
 * Converts an adjacency list to an adjacency matrix.
 * Note: Adjacency matrix is suitable for dense graphs or when quick edge existence check is needed.
 * Time Complexity: O(V^2 + E) where V is the number of vertices and E is the number of edges.
 * Space Complexity: O(V^2) for the adjacency matrix.
 * @param n The number of nodes.
 * @param adjList The adjacency list.
 * @param defaultValue The value to use for non-existent edges (e.g., Infinity for weighted, 0 for unweighted).
 * @param isOneIndexed Boolean indicating if nodes are 1-indexed. Defaults to false (0-indexed).
 * @returns An `AdjacencyMatrix`.
 */
export function adjListToMatrix(n: number, adjList: AdjacencyList, defaultValue: number = Infinity, isOneIndexed: boolean = false): AdjacencyMatrix {
    const startOffset = isOneIndexed ? 1 : 0;
    const matrixSize = n + (isOneIndexed ? 1 : 0); // If 1-indexed, matrix needs n+1 size for indices 1 to n.

    // Initialize matrix with defaultValue
    const adjMatrix: AdjacencyMatrix = Array(matrixSize).fill(0).map(() => Array(matrixSize).fill(defaultValue));

    // Set diagonal to 0 (distance from node to itself)
    for (let i = startOffset; i < matrixSize; i++) {
        adjMatrix[i][i] = 0;
    }

    for (const [u, neighbors] of adjList.entries()) {
        for (const [v, weight] of neighbors) {
            // Adjust indices if 1-indexed for 0-indexed matrix access
            const uIdx = isOneIndexed ? u : u;
            const vIdx = isOneIndexed ? v : v;
            if (uIdx >= startOffset && uIdx < matrixSize && vIdx >= startOffset && vIdx < matrixSize) {
                adjMatrix[uIdx][vIdx] = weight;
            }
        }
    }
    return adjMatrix;
}

/**
 * Generates valid 8-directional neighbors for a given grid coordinate.
 * Used in problems like "Shortest Path in Binary Matrix".
 * Time Complexity: O(1) (fixed 8 directions).
 * Space Complexity: O(1).
 * @param r The row coordinate.
 * @param c The column coordinate.
 * @param maxRows The maximum number of rows in the grid.
 * @param maxCols The maximum number of columns in the grid.
 * @returns An array of valid neighbor `GridCoord` tuples.
 */
export function get8DirectionalNeighbors(r: number, c: number, maxRows: number, maxCols: number): GridCoord[] {
    const neighbors: GridCoord[] = [];
    const dr = [-1, -1, -1, 0, 0, 1, 1, 1]; // Row changes for 8 directions
    const dc = [-1, 0, 1, -1, 1, -1, 0, 1]; // Column changes for 8 directions

    for (let i = 0; i < 8; i++) {
        const newR = r + dr[i];
        const newC = c + dc[i];

        // Check bounds
        if (newR >= 0 && newR < maxRows && newC >= 0 && newC < maxCols) {
            neighbors.push([newR, newC]);
        }
    }
    return neighbors;
}

/**
 * Generates valid 4-directional (horizontal and vertical) neighbors for a given grid coordinate.
 * Used in problems like "Number of Islands".
 * Time Complexity: O(1) (fixed 4 directions).
 * Space Complexity: O(1).
 * @param r The row coordinate.
 * @param c The column coordinate.
 * @param maxRows The maximum number of rows in the grid.
 * @param maxCols The maximum number of columns in the grid.
 * @returns An array of valid neighbor `GridCoord` tuples.
 */
export function get4DirectionalNeighbors(r: number, c: number, maxRows: number, maxCols: number): GridCoord[] {
    const neighbors: GridCoord[] = [];
    const dr = [-1, 1, 0, 0]; // Row changes: up, down, same, same
    const dc = [0, 0, -1, 1]; // Column changes: same, same, left, right

    for (let i = 0; i < 4; i++) {
        const newR = r + dr[i];
        const newC = c + dc[i];

        // Check bounds
        if (newR >= 0 && newR < maxRows && newC >= 0 && newC < maxCols) {
            neighbors.push([newR, newC]);
        }
    }
    return neighbors;
}
```