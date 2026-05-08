```javascript
/**
 * src/utils/dataStructures.js
 *
 * This file contains essential data structures used across various graph algorithms.
 * - Graph: A basic graph representation using an adjacency list.
 * - MinPriorityQueue: A min-priority queue implementation for algorithms like Dijkstra's.
 * - DisjointSetUnion: A Union-Find data structure for algorithms like Kruskal's.
 */

/**
 * Represents a graph using an adjacency list.
 * Supports adding nodes and both directed and undirected edges.
 */
class Graph {
    /**
     * @param {boolean} directed - True if the graph is directed, false for undirected.
     */
    constructor(directed = false) {
        this.adjacencyList = new Map();
        this.directed = directed;
    }

    /**
     * Adds a node to the graph. If the node already exists, it does nothing.
     * @param {any} node - The node to add.
     */
    addNode(node) {
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, []);
        }
    }

    /**
     * Adds an edge between two nodes. If nodes don't exist, they are added.
     * @param {any} node1 - The first node.
     * @param {any} node2 - The second node.
     * @param {number} weight - The weight of the edge (defaults to 1 for unweighted graphs).
     */
    addEdge(node1, node2, weight = 1) {
        this.addNode(node1);
        this.addNode(node2);

        this.adjacencyList.get(node1).push({ node: node2, weight });

        if (!this.directed) {
            this.adjacencyList.get(node2).push({ node: node1, weight });
        }
    }

    /**
     * Gets the neighbors of a given node.
     * @param {any} node - The node to get neighbors for.
     * @returns {Array<Object>} An array of objects, each containing { node, weight }.
     */
    getNeighbors(node) {
        return this.adjacencyList.get(node) || [];
    }

    /**
     * Gets all nodes in the graph.
     * @returns {Array<any>} An array of all nodes.
     */
    getNodes() {
        return Array.from(this.adjacencyList.keys());
    }

    /**
     * Gets all edges in the graph as a list of objects { u, v, weight }.
     * For undirected graphs, each edge (u,v) is listed once.
     * @returns {Array<Object>} An array of edge objects.
     */
    getAllEdges() {
        const edges = [];
        const seenEdges = new Set(); // To avoid duplicate edges in undirected graphs

        for (const [u, neighbors] of this.adjacencyList.entries()) {
            for (const { node: v, weight } of neighbors) {
                // For undirected graphs, ensure each edge is added only once (e.g., (A,B) not (B,A))
                if (!this.directed) {
                    const edgeKey1 = `${u}-${v}`;
                    const edgeKey2 = `${v}-${u}`;
                    if (seenEdges.has(edgeKey1) || seenEdges.has(edgeKey2)) {
                        continue;
                    }
                    seenEdges.add(edgeKey1);
                    seenEdges.add(edgeKey2); // Add both to mark as seen
                }
                edges.push({ u, v, weight });
            }
        }
        return edges;
    }

    /**
     * Checks if a node exists in the graph.
     * @param {any} node - The node to check.
     * @returns {boolean} True if the node exists, false otherwise.
     */
    hasNode(node) {
        return this.adjacencyList.has(node);
    }
}


/**
 * A MinPriorityQueue implementation using a min-heap.
 * Stores elements as { value, priority }, where lower priority values are higher priority.
 * Useful for algorithms like Dijkstra's where we need to extract the minimum distance node.
 */
class MinPriorityQueue {
    constructor() {
        this.heap = [];
    }

    /**
     * Returns the number of elements in the queue.
     * @returns {number}
     */
    size() {
        return this.heap.length;
    }

    /**
     * Checks if the queue is empty.
     * @returns {boolean}
     */
    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Inserts a value with a given priority into the queue.
     * @param {any} value - The value to store.
     * @param {number} priority - The priority of the value (lower is higher priority).
     */
    enqueue(value, priority) {
        this.heap.push({ value, priority });
        this._bubbleUp();
    }

    /**
     * Removes and returns the element with the lowest priority.
     * @returns {Object | null} An object { value, priority } or null if the queue is empty.
     */
    dequeue() {
        if (this.isEmpty()) return null;
        if (this.size() === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._sinkDown();
        return min;
    }

    /**
     * Gets the element with the lowest priority without removing it.
     * @returns {Object | null} An object { value, priority } or null if the queue is empty.
     */
    peek() {
        if (this.isEmpty()) return null;
        return this.heap[0];
    }

    /**
     * Helper to maintain heap property after insertion.
     * Bubbles the last element up to its correct position.
     */
    _bubbleUp() {
        let idx = this.heap.length - 1;
        const element = this.heap[idx];

        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.heap[parentIdx];

            if (element.priority >= parent.priority) break; // Correct position found

            // Swap
            this.heap[parentIdx] = element;
            this.heap[idx] = parent;
            idx = parentIdx;
        }
    }

    /**
     * Helper to maintain heap property after removal (dequeue).
     * Sinks the root element down to its correct position.
     */
    _sinkDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null; // Index of the element to swap with

            if (leftChildIdx < length) {
                leftChild = this.heap[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }

            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }

            if (swap === null) break; // Element is in its correct position

            this.heap[idx] = this.heap[swap];
            this.heap[swap] = element;
            idx = swap;
        }
    }
}


/**
 * Disjoint Set Union (DSU) data structure, also known as Union-Find.
 * Used to keep track of a set of elements partitioned into a number of disjoint (non-overlapping) sets.
 * Supports two main operations:
 * - find(i): Determine which set an element i is in.
 * - union(i, j): Merge two sets containing elements i and j.
 * Optimized with path compression and union by rank/size.
 */
class DisjointSetUnion {
    /**
     * @param {Array<any>} elements - An array of elements to initialize the DSU with.
     *                                Each element will initially be in its own set.
     */
    constructor(elements) {
        this.parent = new Map();
        this.rank = new Map(); // Or size, to optimize union operation

        for (const element of elements) {
            this.parent.set(element, element); // Each element is its own parent
            this.rank.set(element, 0);         // Initial rank (or size) is 0
        }
    }

    /**
     * Finds the representative (root) of the set containing element `i`.
     * Applies path compression for optimization.
     * @param {any} i - The element to find the set representative for.
     * @returns {any} The representative of the set.
     */
    find(i) {
        if (!this.parent.has(i)) {
            // Element not initialized. Can choose to throw error,
            // or implicitly add it (less common in DSU usage).
            // For this implementation, we assume all elements are initialized in constructor.
            throw new Error(`Element ${i} not initialized in DSU.`);
        }

        if (this.parent.get(i) === i) {
            return i; // i is the representative of its set
        }

        // Path compression: set parent[i] directly to the root
        const root = this.find(this.parent.get(i));
        this.parent.set(i, root);
        return root;
    }

    /**
     * Unites the sets containing elements `i` and `j`.
     * Applies union by rank for optimization.
     * @param {any} i - An element in the first set.
     * @param {any} j - An element in the second set.
     * @returns {boolean} True if a union was performed, false if i and j were already in the same set.
     */
    union(i, j) {
        const rootI = this.find(i);
        const rootJ = this.find(j);

        if (rootI !== rootJ) {
            // Union by rank: attach smaller rank tree under root of higher rank tree
            // If ranks are equal, choose one root as parent and increment its rank
            const rankI = this.rank.get(rootI);
            const rankJ = this.rank.get(rootJ);

            if (rankI < rankJ) {
                this.parent.set(rootI, rootJ);
            } else if (rankJ < rankI) {
                this.parent.set(rootJ, rootI);
            } else {
                this.parent.set(rootJ, rootI);
                this.rank.set(rootI, rankI + 1);
            }
            return true; // Union performed
        }
        return false; // i and j were already in the same set
    }

    /**
     * Checks if two elements are in the same set.
     * @param {any} i - The first element.
     * @param {any} j - The second element.
     * @returns {boolean} True if i and j are in the same set, false otherwise.
     */
    areConnected(i, j) {
        return this.find(i) === this.find(j);
    }
}

module.exports = {
    Graph,
    MinPriorityQueue,
    DisjointSetUnion,
};
```