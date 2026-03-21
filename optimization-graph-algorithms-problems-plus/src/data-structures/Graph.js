/**
 * Represents an edge in the graph.
 * @typedef {object} Edge
 * @property {*} neighbor - The neighboring vertex.
 * @property {number} weight - The weight of the edge.
 */

/**
 * Implements a Graph data structure using an Adjacency List.
 * Supports both directed and undirected graphs, and weighted edges.
 */
class Graph {
    /**
     * Initializes a new Graph.
     * @param {boolean} isDirected - True if the graph is directed, false for undirected (default).
     */
    constructor(isDirected = false) {
        /**
         * Adjacency list storing vertices and their neighbors.
         * Each key is a vertex, and its value is an array of {neighbor, weight} objects.
         * @type {Map<*, Edge[]>}
         */
        this.adjacencyList = new Map();
        /**
         * Whether the graph is directed.
         * @type {boolean}
         */
        this.isDirected = isDirected;
        /**
         * Keeps track of all vertices for quick lookup.
         * @type {Set<*>}
         */
        this.vertices = new Set();
    }

    /**
     * Adds a vertex to the graph.
     * @param {*} vertex - The vertex to add.
     * @returns {boolean} True if the vertex was added, false if it already exists.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
            this.vertices.add(vertex);
            return true;
        }
        return false;
    }

    /**
     * Adds an edge between two vertices.
     * If the vertices do not exist, they are added to the graph.
     * For undirected graphs, an edge is added in both directions.
     * @param {*} vertex1 - The first vertex.
     * @param {*} vertex2 - The second vertex.
     * @param {number} [weight=0] - The weight of the edge. Defaults to 0 for unweighted graphs.
     * @returns {boolean} True if the edge was added (or updated), false if an invalid vertex was provided.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addEdge(vertex1, vertex2, weight = 0) {
        // Ensure both vertices exist in the graph
        this.addVertex(vertex1);
        this.addVertex(vertex2);

        // Add edge from vertex1 to vertex2
        this.adjacencyList.get(vertex1).push({ neighbor: vertex2, weight });

        // If undirected, add edge from vertex2 to vertex1
        if (!this.isDirected) {
            this.adjacencyList.get(vertex2).push({ neighbor: vertex1, weight });
        }
        return true;
    }

    /**
     * Checks if a vertex exists in the graph.
     * @param {*} vertex - The vertex to check.
     * @returns {boolean} True if the vertex exists, false otherwise.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    hasVertex(vertex) {
        return this.vertices.has(vertex);
    }

    /**
     * Gets all vertices in the graph.
     * @returns {Set<*>} A set of all vertices.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1) (returns a reference to the existing set)
     */
    getVertices() {
        return this.vertices;
    }

    /**
     * Gets the neighbors of a given vertex.
     * @param {*} vertex - The vertex to get neighbors for.
     * @returns {Edge[] | null} An array of {neighbor, weight} objects, or null if the vertex does not exist.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1) (returns a reference to the existing array)
     */
    getNeighbors(vertex) {
        return this.adjacencyList.get(vertex) || null;
    }

    /**
     * Gets the weight of an edge between two vertices.
     * @param {*} vertex1 - The first vertex.
     * @param {*} vertex2 - The second vertex.
     * @returns {number | null} The weight of the edge, or null if the edge does not exist or vertices are invalid.
     *
     * Time Complexity: O(degree(vertex1)) in the worst case, as it iterates through neighbors.
     * Space Complexity: O(1)
     */
    getWeight(vertex1, vertex2) {
        const neighbors = this.getNeighbors(vertex1);
        if (!neighbors) {
            return null; // vertex1 does not exist
        }
        for (const edge of neighbors) {
            if (edge.neighbor === vertex2) {
                return edge.weight;
            }
        }
        return null; // Edge not found
    }

    /**
     * Calculates the in-degree of a vertex for directed graphs.
     * For undirected graphs, it returns the degree (number of edges).
     * @param {*} vertex - The vertex to calculate in-degree for.
     * @returns {number | null} The in-degree (or degree for undirected) of the vertex, or null if the vertex does not exist.
     *
     * Time Complexity: O(V + E) in worst case as it iterates through all edges to find incoming edges.
     * Space Complexity: O(1)
     */
    getInDegree(vertex) {
        if (!this.hasVertex(vertex)) {
            return null;
        }
        if (!this.isDirected) {
            return this.adjacencyList.get(vertex).length; // For undirected, in-degree is same as degree
        }
        let inDegree = 0;
        for (const [v, edges] of this.adjacencyList.entries()) {
            if (v === vertex) continue; // Don't count self loops (if any, though not explicitly supported here)
            for (const edge of edges) {
                if (edge.neighbor === vertex) {
                    inDegree++;
                }
            }
        }
        return inDegree;
    }

    /**
     * Returns a string representation of the graph.
     * @returns {string} A string representing the graph's adjacency list.
     *
     * Time Complexity: O(V + E)
     * Space Complexity: O(V + E) for the string.
     */
    printGraph() {
        let graphStr = `Graph (Directed: ${this.isDirected}):\n`;
        for (const [vertex, neighbors] of this.adjacencyList.entries()) {
            graphStr += `${vertex} -> `;
            const neighborList = neighbors.map(edge => `${edge.neighbor}(${edge.weight})`).join(', ');
            graphStr += `${neighborList}\n`;
        }
        return graphStr;
    }
}

module.exports = Graph;