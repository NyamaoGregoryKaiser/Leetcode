```javascript
/**
 * src/utils/dataStructures.js
 *
 * This file contains fundamental data structures used across the graph algorithms:
 * - Graph: An adjacency list representation for handling nodes and edges.
 * - PriorityQueue: A min-heap implementation crucial for algorithms like Dijkstra's and Prim's.
 */

/**
 * Class representing a Graph using an adjacency list.
 * Supports directed, undirected, weighted, and unweighted graphs.
 */
class Graph {
    /**
     * @property {Map<any, Map<any, number>>} adjList - The adjacency list where
     *                                                  keys are nodes and values are Maps
     *                                                  from neighbor node to edge weight.
     *                                                  e.g., Map { 'A' => Map { 'B' => 1, 'C' => 3 } }
     * @property {Set<any>} nodes - A set of all nodes in the graph.
     */
    constructor() {
        this.adjList = new Map();
        this.nodes = new Set();
    }

    /**
     * Adds a node to the graph.
     * @param {any} node - The node to add.
     * @returns {Graph} - The current graph instance for chaining.
     */
    addNode(node) {
        if (!this.adjList.has(node)) {
            this.adjList.set(node, new Map());
            this.nodes.add(node);
        }
        return this;
    }

    /**
     * Adds an edge between two nodes.
     * If nodes don't exist, they are added automatically.
     * @param {any} node1 - The first node.
     * @param {any} node2 - The second node.
     * @param {number} [weight=1] - The weight of the edge (default to 1 for unweighted).
     * @param {boolean} [isDirected=false] - True if the edge is directed (node1 -> node2), false for undirected.
     * @returns {Graph} - The current graph instance for chaining.
     */
    addEdge(node1, node2, weight = 1, isDirected = false) {
        this.addNode(node1);
        this.addNode(node2);

        this.adjList.get(node1).set(node2, weight);

        if (!isDirected) {
            this.adjList.get(node2).set(node1, weight);
        }
        return this;
    }

    /**
     * Removes an edge between two nodes.
     * @param {any} node1 - The first node.
     * @param {any} node2 - The second node.
     * @param {boolean} [isDirected=false] - True if the edge is directed (node1 -> node2), false for undirected.
     * @returns {boolean} - True if the edge was removed, false otherwise.
     */
    removeEdge(node1, node2, isDirected = false) {
        if (!this.adjList.has(node1) || !this.adjList.has(node2)) {
            return false;
        }

        const removed1 = this.adjList.get(node1).delete(node2);
        let removed2 = true;

        if (!isDirected) {
            removed2 = this.adjList.get(node2).delete(node1);
        }
        return removed1 && removed2;
    }

    /**
     * Removes a node and all its incident edges from the graph.
     * @param {any} nodeToRemove - The node to remove.
     * @returns {boolean} - True if the node was removed, false otherwise.
     */
    removeNode(nodeToRemove) {
        if (!this.adjList.has(nodeToRemove)) {
            return false;
        }

        // Remove all edges pointing TO nodeToRemove
        for (const [node, neighbors] of this.adjList.entries()) {
            neighbors.delete(nodeToRemove);
        }

        // Remove nodeToRemove itself and its outgoing edges
        this.adjList.delete(nodeToRemove);
        this.nodes.delete(nodeToRemove);
        return true;
    }

    /**
     * Gets the neighbors of a given node.
     * @param {any} node - The node to get neighbors for.
     * @returns {Map<any, number> | undefined} - A Map of neighbor nodes to edge weights, or undefined if node not found.
     */
    getNeighbors(node) {
        return this.adjList.get(node);
    }

    /**
     * Gets all nodes in the graph.
     * @returns {Set<any>} - A Set of all nodes.
     */
    getAllNodes() {
        return this.nodes;
    }

    /**
     * Checks if a node exists in the graph.
     * @param {any} node - The node to check.
     * @returns {boolean} - True if the node exists, false otherwise.
     */
    hasNode(node) {
        return this.nodes.has(node);
    }

    /**
     * Checks if an edge exists between two nodes.
     * @param {any} node1 - The first node.
     * @param {any} node2 - The second node.
     * @returns {boolean} - True if an edge exists from node1 to node2, false otherwise.
     */
    hasEdge(node1, node2) {
        return this.adjList.has(node1) && this.adjList.get(node1).has(node2);
    }

    /**
     * Gets the weight of an edge between two nodes.
     * @param {any} node1 - The first node.
     * @param {any} node2 - The second node.
     * @returns {number | undefined} - The weight of the edge, or undefined if no such edge exists.
     */
    getEdgeWeight(node1, node2) {
        return this.adjList.has(node1) ? this.adjList.get(node1).get(node2) : undefined;
    }

    /**
     * Returns the number of nodes in the graph.
     * @returns {number}
     */
    numNodes() {
        return this.nodes.size;
    }

    /**
     * Returns the number of edges in the graph.
     * For an undirected graph, each edge (A,B) counts as one edge, but is stored as two entries (A->B, B->A).
     * This method correctly counts distinct edges.
     * @returns {number}
     */
    numEdges() {
        let count = 0;
        const seenEdges = new Set(); // To avoid double-counting for undirected graphs

        for (const [node, neighbors] of this.adjList.entries()) {
            for (const [neighbor, weight] of neighbors.entries()) {
                // For undirected edges, (A,B) and (B,A) are the same.
                // We need a canonical representation to count them once.
                // Using a string like "min(A,B)-max(A,B)-weight"
                const edgeKey = [node, neighbor].sort().join('-') + '-' + weight;
                if (!seenEdges.has(edgeKey)) {
                    count++;
                    seenEdges.add(edgeKey);
                }
            }
        }
        return count;
    }
}


/**
 * Class representing a Min-Priority Queue (Min-Heap) used for Dijkstra's and Prim's algorithms.
 * Stores elements as { value, priority } objects and prioritizes by the smallest priority.
 */
class PriorityQueue {
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
     * Adds an element with a given priority to the queue.
     * @param {any} value - The actual value to store.
     * @param {number} priority - The priority of the value (lower means higher priority).
     */
    enqueue(value, priority) {
        this.heap.push({ value, priority });
        this._bubbleUp(this.heap.length - 1);
    }

    /**
     * Removes and returns the element with the lowest priority.
     * @returns {{value: any, priority: number} | null} - The element with lowest priority, or null if empty.
     */
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._sinkDown(0);
        return min;
    }

    /**
     * Returns the element with the lowest priority without removing it.
     * @returns {{value: any, priority: number} | null} - The element with lowest priority, or null if empty.
     */
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    /**
     * Helper function to maintain heap property after adding an element.
     * Bubbles up the element at the given index until its priority is correct.
     * @param {number} index - The index of the element to bubble up.
     */
    _bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority < this.heap[parentIndex].priority) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    /**
     * Helper function to maintain heap property after removing the root.
     * Sinks down the element at the given index until its priority is correct.
     * @param {number} index - The index of the element to sink down.
     */
    _sinkDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let swapIndex = null;

            if (leftChildIndex < length) {
                if (this.heap[leftChildIndex].priority < element.priority) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                if (
                    (swapIndex === null && this.heap[rightChildIndex].priority < element.priority) ||
                    (swapIndex !== null && this.heap[rightChildIndex].priority < this.heap[leftChildIndex].priority)
                ) {
                    swapIndex = rightChildIndex;
                }
            }

            if (swapIndex === null) break;

            [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];
            index = swapIndex;
        }
    }

    /**
     * Allows updating the priority of an existing element or adding a new one.
     * This is useful for Dijkstra's and Prim's where distances/weights might decrease.
     * Note: This implementation might be less efficient than a heap that maps values to their indices,
     * requiring a full heap reconstruction (or a more complex find-and-update then bubble/sink).
     * For simplicity, this current update method re-adds and lets duplicate entries exist (handled by visited sets).
     * A more optimized update would require mapping value to index in the heap.
     * For most graph algos, adding a new entry with a better priority and ignoring old entries if visited is sufficient.
     * @param {any} value - The value to update/add.
     * @param {number} newPriority - The new priority for the value.
     */
    updatePriority(value, newPriority) {
        // A simple way without direct index tracking: just enqueue a new entry.
        // The graph algorithms using this queue will handle visited nodes,
        // ensuring that once a node is processed with its true minimum distance,
        // any older, higher-priority entries for it in the queue are ignored.
        this.enqueue(value, newPriority);

        // For a more robust update-in-place, you would need:
        // 1. A map from value to its index in the heap array.
        // 2. When updating, find the index, change priority, then call _bubbleUp or _sinkDown.
        // This current approach is simpler and correct for algorithms that handle "visited" status.
    }
}

module.exports = {
    Graph,
    PriorityQueue
};
```
---