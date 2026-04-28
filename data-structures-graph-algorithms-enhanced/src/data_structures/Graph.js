```javascript
/**
 * Graph.js
 * Implements a Graph data structure using an Adjacency List.
 * This representation is generally preferred for sparse graphs (fewer edges)
 * as it uses less memory than an Adjacency Matrix.
 */
class Graph {
    /**
     * Initializes a new Graph instance.
     * @param {boolean} directed - True if the graph is directed, false for undirected.
     */
    constructor(directed = false) {
        // Map to store adjacency list: vertex -> List of {vertex, weight} neighbors
        this.adjList = new Map();
        this.directed = directed; // Flag to determine if the graph is directed
    }

    /**
     * Adds a new vertex to the graph.
     * If the vertex already exists, no action is taken.
     * @param {any} vertex - The vertex to add.
     */
    addVertex(vertex) {
        if (!this.adjList.has(vertex)) {
            this.adjList.set(vertex, []); // Initialize with an empty array of neighbors
        }
    }

    /**
     * Adds an edge between two vertices.
     * If the vertices do not exist, they are added to the graph first.
     * For undirected graphs, an edge is added in both directions.
     * For directed graphs, an edge is added only from src to dest.
     * @param {any} src - The source vertex.
     * @param {any} dest - The destination vertex.
     * @param {number} weight - The weight of the edge (defaults to 1 for unweighted graphs).
     */
    addEdge(src, dest, weight = 1) {
        // Ensure both source and destination vertices exist in the graph
        this.addVertex(src);
        this.addVertex(dest);

        // Add edge from src to dest
        this.adjList.get(src).push({
            vertex: dest,
            weight
        });

        // If the graph is undirected, add an edge from dest to src as well
        if (!this.directed) {
            this.adjList.get(dest).push({
                vertex: src,
                weight
            });
        }
    }

    /**
     * Removes an edge between two vertices.
     * @param {any} src - The source vertex.
     * @param {any} dest - The destination vertex.
     */
    removeEdge(src, dest) {
        if (!this.adjList.has(src) || !this.adjList.has(dest)) {
            return; // One or both vertices do not exist
        }

        // Remove edge from src to dest
        let srcNeighbors = this.adjList.get(src);
        this.adjList.set(src, srcNeighbors.filter(neighbor => neighbor.vertex !== dest));

        // If undirected, remove edge from dest to src
        if (!this.directed) {
            let destNeighbors = this.adjList.get(dest);
            this.adjList.set(dest, destNeighbors.filter(neighbor => neighbor.vertex !== src));
        }
    }

    /**
     * Checks if a vertex exists in the graph.
     * @param {any} vertex - The vertex to check.
     * @returns {boolean} - True if the vertex exists, false otherwise.
     */
    hasVertex(vertex) {
        return this.adjList.has(vertex);
    }

    /**
     * Gets all neighbors of a given vertex.
     * @param {any} vertex - The vertex to get neighbors for.
     * @returns {Array<object>} - An array of neighbor objects ({vertex, weight}), or an empty array if vertex not found.
     */
    getNeighbors(vertex) {
        return this.adjList.get(vertex) || [];
    }

    /**
     * Gets all vertices in the graph.
     * @returns {Array<any>} - An array of all vertices.
     */
    getVertices() {
        return Array.from(this.adjList.keys());
    }

    /**
     * Gets the number of vertices in the graph.
     * @returns {number} - The total count of vertices.
     */
    get numVertices() {
        return this.adjList.size;
    }

    /**
     * Prints the adjacency list representation of the graph to the console.
     */
    printGraph() {
        console.log('Graph Adjacency List:');
        for (const [vertex, neighbors] of this.adjList) {
            const neighborsStr = neighbors.map(n => `${n.vertex}(${n.weight})`).join(', ');
            console.log(`${vertex} -> [${neighborsStr}]`);
        }
    }
}

module.exports = Graph;
```