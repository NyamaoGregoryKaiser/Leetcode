```typescript
import { Graph } from '../data-structures/Graph';

/**
 * Performs a topological sort on a Directed Acyclic Graph (DAG) using Kahn's algorithm (BFS-based).
 * A topological sort produces a linear ordering of vertices such that for every directed edge
 * u -> v, vertex u comes before vertex v in the ordering.
 *
 * If the graph contains a cycle, a topological sort is not possible, and this function will
 * return null.
 *
 * Time Complexity: O(V + E)
 *   - V: Number of vertices, E: Number of edges.
 *   - Initializing in-degrees: O(V + E) (iterating over all edges).
 *   - Processing queue: Each vertex is enqueued/dequeued once (V operations).
 *     When a vertex is processed, its outgoing edges are traversed (E operations in total).
 * Space Complexity: O(V)
 *   - `inDegrees` map: Stores V entries.
 *   - `queue`: Stores at most V entries.
 *   - `result`: Stores V entries.
 *
 * @param graph - The directed graph to sort.
 * @returns An array of nodes representing a valid topological order, or `null` if the graph contains a cycle.
 */
export function kahnTopologicalSort<T extends string | number>(graph: Graph<T>): T[] | null {
    // 1. Calculate in-degrees for all nodes.
    // The in-degree of a node is the number of incoming edges.
    const inDegrees: Map<T, number> = new Map();
    for (const node of graph.getNodes()) {
        inDegrees.set(node, 0); // Initialize all nodes with 0 in-degree
    }

    // Populate in-degrees by iterating through all edges.
    for (const node of graph.getNodes()) {
        for (const { neighbor } of graph.getNeighbors(node)) {
            inDegrees.set(neighbor, inDegrees.get(neighbor)! + 1);
        }
    }

    // 2. Initialize a queue with all nodes having an in-degree of 0.
    const queue: T[] = [];
    for (const [node, degree] of inDegrees.entries()) {
        if (degree === 0) {
            queue.push(node);
        }
    }

    // 3. Process nodes from the queue.
    const result: T[] = [];
    let head = 0; // Optimization for array-based queue

    while (head < queue.length) {
        const currentNode = queue[head++]; // Dequeue

        result.push(currentNode); // Add current node to the topological order

        // For each neighbor of the current node:
        // Decrement its in-degree. If its in-degree becomes 0, enqueue it.
        for (const { neighbor } of graph.getNeighbors(currentNode)) {
            const currentNeighborInDegree = inDegrees.get(neighbor)!;
            inDegrees.set(neighbor, currentNeighborInDegree - 1);

            if (inDegrees.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // 4. Check for cycles.
    // If the number of nodes in the topological sort result is less than the total number of nodes
    // in the graph, it means there are nodes that could not be processed (they must be part of a cycle).
    if (result.length !== graph.nodeCount()) {
        return null; // A cycle was detected, topological sort is not possible.
    }

    return result; // Return the topological order.
}
```