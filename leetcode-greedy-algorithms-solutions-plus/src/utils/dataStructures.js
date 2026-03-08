```javascript
/**
 * @fileoverview Utility Data Structures for Greedy Algorithms.
 * This file contains implementations of common data structures that can be helpful
 * for optimizing certain greedy algorithms, particularly the Disjoint Set Union (DSU)
 * structure used for Job Sequencing with Deadlines.
 */

/**
 * Disjoint Set Union (DSU) / Union-Find Data Structure
 *
 * This data structure is used to keep track of a set of elements partitioned into
 * a number of disjoint (non-overlapping) subsets. It provides two primary operations:
 *
 * 1.  `find(i)`: Determine which subset a particular element `i` is in. This
 *     is typically done by returning a "representative" (or "root") of the subset.
 * 2.  `union(i, j)`: Merge two subsets that contain elements `i` and `j` into a single subset.
 *
 * It's particularly useful in algorithms where we need to group elements or track
 * connections, like Kruskal's MST algorithm, or in this case, optimizing slot
 * allocation in Job Sequencing.
 *
 * Optimized with Path Compression and Union by Rank/Size for near-constant time operations
 * (amortized O(α(n)), where α is the inverse Ackermann function, which is
 * practically constant).
 */
class DisjointSetUnion {
    /**
     * Initializes the DSU structure for 'n' elements.
     * Each element is initially in its own set.
     * @param {number} n The total number of elements. Elements are 0-indexed.
     */
    constructor(n) {
        // Parent array: parent[i] stores the parent of element i.
        // Initially, each element is its own parent.
        this.parent = Array.from({ length: n }, (_, i) => i);
        // Size array: size[i] stores the size of the set if i is the root.
        // Used for union by size optimization. Initially, each set has size 1.
        this.size = Array.from({ length: n }, () => 1);
    }

    /**
     * Finds the representative (root) of the set containing element 'i'.
     * Applies path compression: makes every node on the path from 'i' to the root
     * point directly to the root, flattening the tree.
     * @param {number} i The element to find the representative for.
     * @returns {number} The representative (root) of the set containing 'i'.
     */
    find(i) {
        if (this.parent[i] === i) {
            return i; // i is the root of its set
        }
        // Path compression: set parent[i] directly to the root
        this.parent[i] = this.find(this.parent[i]);
        return this.parent[i];
    }

    /**
     * Merges the sets containing elements 'i' and 'j'.
     * Applies union by size: always attaches the smaller tree under the root
     * of the larger tree to keep the trees flat.
     * @param {number} i An element in the first set.
     * @param {number} j An element in the second set.
     * @returns {boolean} True if a union occurred, false if i and j were already in the same set.
     */
    union(i, j) {
        let rootI = this.find(i);
        let rootJ = this.find(j);

        if (rootI !== rootJ) {
            // Union by size: attach smaller tree to root of larger tree
            if (this.size[rootI] < this.size[rootJ]) {
                [rootI, rootJ] = [rootJ, rootI]; // Swap to ensure rootI is the larger tree
            }
            this.parent[rootJ] = rootI; // Make rootJ's parent rootI
            this.size[rootI] += this.size[rootJ]; // Update the size of the new combined set
            return true;
        }
        return false; // i and j were already in the same set
    }
}

module.exports = {
    DisjointSetUnion,
};
```