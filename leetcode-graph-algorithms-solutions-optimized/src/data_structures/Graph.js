```javascript
/**
 * Graph.js
 *
 * Implements an Adjacency List representation for a graph.
 * Supports both directed and undirected graphs, and weighted edges.
 */

class Graph {
    /**
     * @property {Map<any, Map<any, number>>} adj - Adjacency list where
     *                                              key is a vertex, and value is another Map.
     *                                              The inner Map stores neighbors and their weights.
     *                                              e.g., { 'A': { 'B': 1, 'C': 3 }, 'B': { 'A': 1 } }
     */
    constructor(isDirected = false) {
        this.adj = new Map();
        this.isDirected = isDirected;
    }

    /**
     * Adds a vertex to the graph. If the vertex already exists, nothing happens.
     * @param {any} vertex - The vertex to add.
     */
    addVertex(vertex) {
        if (!this.adj.has(vertex)) {
            this.adj.set(vertex, new Map());
        }
    }

    /**
     * Adds an edge between two vertices.
     * Automatically adds vertices if they don't exist.
     * For undirected graphs, adds edges in both directions.
     *
     * @param {any} src - The source vertex.
     * @param {any} dest - The destination vertex.
     * @param {number} [weight=1] - The weight of the edge (default to 1 for unweighted).
     */
    addEdge(src, dest, weight = 1) {
        this.addVertex(src);
        this.addVertex(dest);

        // Add edge from src to dest
        this.adj.get(src).set(dest, weight);

        // If undirected, add edge from dest to src as well
        if (!this.isDirected) {
            this.adj.get(dest).set(src, weight);
        }
    }

    /**
     * Checks if a vertex exists in the graph.
     * @param {any} vertex - The vertex to check.
     * @returns {boolean} True if the vertex exists, false otherwise.
     */
    hasVertex(vertex) {
        return this.adj.has(vertex);
    }

    /**
     * Checks if an edge exists between two vertices.
     * @param {any} src - The source vertex.
     * @param {any} dest - The destination vertex.
     * @returns {boolean} True if the edge exists, false otherwise.
     */
    hasEdge(src, dest) {
        return this.adj.has(src) && this.adj.get(src).has(dest);
    }

    /**
     * Returns the weight of an edge between two vertices.
     * @param {any} src - The source vertex.
     * @param {any} dest - The destination vertex.
     * @returns {number|undefined} The weight of the edge, or undefined if no such edge.
     */
    getEdgeWeight(src, dest) {
        if (this.adj.has(src) && this.adj.get(src).has(dest)) {
            return this.adj.get(src).get(dest);
        }
        return undefined;
    }

    /**
     * Returns an iterable of the neighbors of a given vertex.
     * @param {any} vertex - The vertex to get neighbors for.
     * @returns {IterableIterator<[any, number]>} An iterable of [neighbor, weight] pairs.
     */
    getNeighbors(vertex) {
        if (!this.adj.has(vertex)) {
            return new Map().entries(); // Return empty iterator if vertex not found
        }
        return this.adj.get(vertex).entries();
    }

    /**
     * Returns an array of all vertices in the graph.
     * @returns {Array<any>} An array of vertices.
     */
    getAllVertices() {
        return Array.from(this.adj.keys());
    }

    /**
     * Returns the number of vertices in the graph.
     * @returns {number} The count of vertices.
     */
    get numVertices() {
        return this.adj.size;
    }

    /**
     * Calculates the in-degree for all vertices in a directed graph.
     * @returns {Map<any, number>} A map where key is vertex and value is its in-degree.
     * @throws {Error} If called on an undirected graph.
     */
    getInDegrees() {
        if (!this.isDirected) {
            throw new Error("Cannot calculate in-degrees for an undirected graph.");
        }

        const inDegrees = new Map();
        for (const vertex of this.adj.keys()) {
            inDegrees.set(vertex, 0); // Initialize all vertices with 0 in-degree
        }

        for (const [src, neighbors] of this.adj.entries()) {
            for (const [dest, weight] of neighbors.entries()) {
                if (inDegrees.has(dest)) { // Ensure dest is a known vertex
                    inDegrees.set(dest, inDegrees.get(dest) + 1);
                }
            }
        }
        return inDegrees;
    }

    /**
     * Returns a string representation of the graph.
     * @returns {string} A string describing the graph's vertices and edges.
     */
    toString() {
        let graphString = `Graph (directed: ${this.isDirected}, vertices: ${this.numVertices}):\n`;
        for (const [vertex, neighbors] of this.adj.entries()) {
            graphString += `${vertex} -> [`;
            const neighborStrings = [];
            for (const [neighbor, weight] of neighbors.entries()) {
                neighborStrings.push(`${neighbor} (w:${weight})`);
            }
            graphString += neighborStrings.join(', ') + ']\n';
        }
        return graphString;
    }
}

module.exports = Graph;
```