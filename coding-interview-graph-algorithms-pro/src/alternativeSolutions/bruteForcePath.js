```javascript
/**
 * src/alternativeSolutions/bruteForcePath.js
 *
 * This file demonstrates a brute-force approach to finding ALL simple paths between two nodes.
 * A "simple path" is one that does not repeat any nodes.
 *
 * This approach is exponential in complexity (can be O(V!)) and is generally not practical
 * for large graphs or typical interview settings (unless asked specifically to enumerate all paths).
 * It contrasts sharply with BFS/DFS for finding *a* path or the shortest path.
 */

const { Graph } = require('../utils/dataStructures');

class BruteForcePath {
    /**
     * Finds all simple paths (no repeated nodes) between a start node and an end node.
     * This is a brute-force approach, exploring all possible branches.
     * @param {Graph} graph - The graph to search.
     * @param {any} startNode - The starting node.
     * @param {any} endNode - The target node.
     * @returns {Array<Array<any>>} - An array of arrays, where each inner array is a simple path.
     *
     * Time Complexity: Highly exponential, worst-case O(V!) or O(V * (V-1)! * E) = O(V! * E)
     *                  due to exploring every permutation of nodes in the worst case,
     *                  and iterating over neighbors. Can be O(E * 2^V) in dense graphs.
     * Space Complexity: O(V * P_max) where P_max is the number of paths, or O(V) for current path/visited set.
     *                   Storing all paths can take significant space.
     */
    static findAllSimplePaths(graph, startNode, endNode) {
        if (!graph.hasNode(startNode) || !graph.hasNode(endNode)) {
            return [];
        }
        if (startNode === endNode) {
            return [[startNode]];
        }

        const allPaths = [];
        const currentPath = [];
        const visitedInCurrentPath = new Set(); // Tracks nodes visited *in the current path* to ensure simplicity

        /**
         * Recursive helper function for DFS-like path finding.
         * @param {any} currentNode - The current node being visited.
         */
        function dfs(currentNode) {
            visitedInCurrentPath.add(currentNode);
            currentPath.push(currentNode);

            if (currentNode === endNode) {
                allPaths.push([...currentPath]); // Found a path, add a copy
            } else {
                const neighbors = graph.getNeighbors(currentNode);
                if (neighbors) {
                    for (const neighbor of neighbors.keys()) {
                        if (!visitedInCurrentPath.has(neighbor)) {
                            dfs(neighbor);
                        }
                    }
                }
            }

            currentPath.pop(); // Backtrack: remove current node from path
            visitedInCurrentPath.delete(currentNode); // Backtrack: mark as unvisited for other paths
        }

        dfs(startNode);
        return allPaths;
    }
}

module.exports = { BruteForcePath };
```
---