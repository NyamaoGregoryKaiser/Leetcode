```typescript
/**
 * Represents a generic Graph data structure using an adjacency list.
 *
 * Supports:
 * - Nodes of any comparable type (string, number).
 * - Directed or undirected edges.
 * - Weighted or unweighted edges.
 */
export class Graph<T extends string | number> {
    // Adjacency list: Map a node to a list of its neighbors.
    // For weighted graphs, the neighbor object includes a 'weight'.
    // For unweighted graphs, weight can be implicitly 1 or ignored.
    private adj: Map<T, { neighbor: T; weight: number }[]>;
    private isDirected: boolean;

    /**
     * Initializes a new graph.
     * @param isDirected - True if the graph is directed, false for undirected (default: false).
     */
    constructor(isDirected: boolean = false) {
        this.adj = new Map();
        this.isDirected = isDirected;
    }

    /**
     * Adds a node to the graph. If the node already exists, nothing happens.
     * @param node - The node to add.
     */
    addNode(node: T): void {
        if (!this.adj.has(node)) {
            this.adj.set(node, []);
        }
    }

    /**
     * Adds a directed edge from `source` to `destination` with an optional `weight`.
     * If nodes don't exist, they are added.
     * @param source - The source node.
     * @param destination - The destination node.
     * @param weight - The weight of the edge (default: 1).
     */
    addDirectedEdge(source: T, destination: T, weight: number = 1): void {
        this.addNode(source);
        this.addNode(destination); // Ensure destination node exists
        this.adj.get(source)!.push({ neighbor: destination, weight });
    }

    /**
     * Adds an undirected edge between `node1` and `node2` with an optional `weight`.
     * This adds two directed edges: node1 -> node2 and node2 -> node1.
     * If nodes don't exist, they are added.
     * @param node1 - The first node.
     * @param node2 - The second node.
     * @param weight - The weight of the edge (default: 1).
     * @throws Error if the graph is initialized as directed.
     */
    addUndirectedEdge(node1: T, node2: T, weight: number = 1): void {
        if (this.isDirected) {
            throw new Error("Cannot add undirected edge to a directed graph. Use addDirectedEdge.");
        }
        this.addNode(node1);
        this.addNode(node2);
        this.adj.get(node1)!.push({ neighbor: node2, weight });
        this.adj.get(node2)!.push({ neighbor: node1, weight });
    }

    /**
     * Adds an edge to the graph. If `isDirected` is true, it adds a directed edge.
     * Otherwise, it adds an undirected edge.
     * @param source - The source node (or first node for undirected).
     * @param destination - The destination node (or second node for undirected).
     * @param weight - The weight of the edge (default: 1).
     */
    addEdge(source: T, destination: T, weight: number = 1): void {
        if (this.isDirected) {
            this.addDirectedEdge(source, destination, weight);
        } else {
            this.addUndirectedEdge(source, destination, weight);
        }
    }

    /**
     * Retrieves the neighbors of a given node.
     * @param node - The node whose neighbors to retrieve.
     * @returns An array of neighbor objects, or an empty array if the node doesn't exist.
     */
    getNeighbors(node: T): { neighbor: T; weight: number }[] {
        return this.adj.get(node) || [];
    }

    /**
     * Retrieves all nodes in the graph.
     * @returns An iterable of all nodes.
     */
    getNodes(): IterableIterator<T> {
        return this.adj.keys();
    }

    /**
     * Checks if a node exists in the graph.
     * @param node - The node to check.
     * @returns True if the node exists, false otherwise.
     */
    hasNode(node: T): boolean {
        return this.adj.has(node);
    }

    /**
     * Gets the number of nodes in the graph.
     * @returns The total number of nodes.
     */
    nodeCount(): number {
        return this.adj.size;
    }

    /**
     * Calculates the in-degree of a specified node.
     * This is particularly useful for directed graphs (e.g., Kahn's algorithm for topological sort).
     * @param node - The node to calculate in-degree for.
     * @returns The in-degree of the node, or 0 if the node doesn't exist.
     */
    getInDegree(node: T): number {
        if (!this.adj.has(node)) {
            return 0;
        }
        let inDegree = 0;
        for (const [source, neighbors] of this.adj.entries()) {
            // Avoid counting self-loops if source === node, unless specifically desired
            // For in-degree, we count edges *into* `node`.
            for (const edge of neighbors) {
                if (edge.neighbor === node) {
                    inDegree++;
                }
            }
        }
        return inDegree;
    }

    /**
     * Returns a string representation of the graph.
     */
    toString(): string {
        let result = `Graph (directed: ${this.isDirected}):\n`;
        for (const [node, neighbors] of this.adj.entries()) {
            result += `${node} -> `;
            result += neighbors
                .map(n => `${n.neighbor}${n.weight !== 1 ? `(${n.weight})` : ''}`)
                .join(', ');
            result += '\n';
        }
        return result;
    }
}
```