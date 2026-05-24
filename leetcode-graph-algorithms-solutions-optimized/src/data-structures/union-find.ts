```typescript
/**
 * Union-Find (Disjoint Set) data structure with path compression and union by rank/size.
 * Efficiently manages elements partitioned into disjoint sets.
 * Used in algorithms like Kruskal's for Minimum Spanning Tree.
 */
export class UnionFind {
    // `parent[i]` stores the parent of element `i`. If `parent[i] === i`, then `i` is a root.
    private parent: number[];
    // `rank[i]` stores the rank (or size) of the tree rooted at `i`.
    // Used to optimize union operations by attaching the smaller tree under the root of the larger tree.
    private rank: number[];
    // `numSets` tracks the total number of disjoint sets.
    private numSets: number;

    /**
     * Initializes the Union-Find structure with `n` elements.
     * Each element `i` (from 0 to n-1) is initially in its own set.
     * Time Complexity: O(N)
     * Space Complexity: O(N)
     * @param n The number of elements. Elements are assumed to be 0-indexed from 0 to n-1.
     */
    constructor(n: number) {
        this.parent = Array(n).fill(0);
        this.rank = Array(n).fill(0);
        this.numSets = n;

        for (let i = 0; i < n; i++) {
            this.parent[i] = i; // Each element is initially its own parent
        }
    }

    /**
     * Finds the representative (root) of the set that element `i` belongs to.
     * Uses path compression to flatten the tree structure during traversal,
     * which optimizes future `find` operations.
     * Time Complexity: Amortized O(α(N)), where α is the inverse Ackermann function,
     *                  which is practically a very small constant (less than 5 for any realistic N).
     * Space Complexity: O(log N) in worst case for recursion stack, but usually O(1) iterative.
     * @param i The element to find the set representative for.
     * @returns The representative (root) of the set containing `i`.
     * @throws {Error} If `i` is out of bounds.
     */
    find(i: number): number {
        if (i < 0 || i >= this.parent.length) {
            throw new Error(`Element ${i} out of bounds.`);
        }

        // Path compression: if i is not the root of its set,
        // set its parent to the root of its set (found recursively).
        if (this.parent[i] !== i) {
            this.parent[i] = this.find(this.parent[i]);
        }
        return this.parent[i];
    }

    /**
     * Unites the sets containing elements `i` and `j`.
     * Uses union by rank/size to keep trees flat, preventing skewed trees.
     * Time Complexity: Amortized O(α(N)).
     * Space Complexity: O(1).
     * @param i An element in the first set.
     * @param j An element in the second set.
     * @returns True if the two sets were different and were successfully united, false otherwise (they were already in the same set).
     * @throws {Error} If `i` or `j` is out of bounds.
     */
    union(i: number, j: number): boolean {
        const rootI = this.find(i);
        const rootJ = this.find(j);

        if (rootI !== rootJ) {
            // Union by rank: Attach the smaller rank tree under the root of the larger rank tree.
            // This keeps the overall tree height minimal.
            if (this.rank[rootI] < this.rank[rootJ]) {
                this.parent[rootI] = rootJ;
            } else if (this.rank[rootI] > this.rank[rootJ]) {
                this.parent[rootJ] = rootI;
            } else {
                // If ranks are equal, attach one to the other and increment the rank of the new root.
                this.parent[rootJ] = rootI;
                this.rank[rootI]++;
            }
            this.numSets--; // One less disjoint set after a successful union
            return true;
        }
        return false; // i and j are already in the same set
    }

    /**
     * Checks if two elements `i` and `j` are in the same set.
     * Time Complexity: Amortized O(α(N)).
     * Space Complexity: O(1).
     * @param i The first element.
     * @param j The second element.
     * @returns True if `i` and `j` are in the same set, false otherwise.
     */
    isConnected(i: number, j: number): boolean {
        return this.find(i) === this.find(j);
    }

    /**
     * Returns the total number of disjoint sets currently managed by the structure.
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     */
    countSets(): number {
        return this.numSets;
    }
}
```