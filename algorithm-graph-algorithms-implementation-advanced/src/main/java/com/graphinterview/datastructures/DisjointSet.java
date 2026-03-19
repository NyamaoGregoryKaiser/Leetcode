```java
package com.graphinterview.datastructures;

/**
 * Implements the Disjoint Set Union (DSU) data structure, also known as Union-Find.
 * It is used to keep track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets.
 * Key operations are `find` (determine which subset an element is in) and `union` (merge two subsets into one).
 * This implementation uses both path compression and union by rank/size for optimal performance.
 */
public class DisjointSet {
    private int[] parent; // parent[i] stores the parent of element i
    private int[] rank;   // rank[i] stores the rank (or size) of the tree rooted at i

    /**
     * Initializes the Disjoint Set structure with `n` elements.
     * Each element is initially in its own set.
     *
     * @param n The number of elements.
     */
    public DisjointSet(int n) {
        parent = new int[n];
        rank = new int[n];
        // Initially, each element is its own parent (represents a set of size 1)
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0; // Or 1 if using size
        }
    }

    /**
     * Finds the representative (root) of the set containing element `i`.
     * Uses path compression to flatten the tree structure, making future finds faster.
     *
     * @param i The element to find the set representative for.
     * @return The representative of the set containing `i`.
     */
    public int find(int i) {
        if (parent[i] == i) { // If i is its own parent, it's the representative of its set
            return i;
        }
        // Path compression: set parent[i] directly to the root
        parent[i] = find(parent[i]);
        return parent[i];
    }

    /**
     * Merges the sets containing elements `i` and `j`.
     * Uses union by rank (or size) to keep the tree shallow, improving performance.
     *
     * @param i An element in the first set.
     * @param j An element in the second set.
     * @return True if the sets were different and merged, false if they were already in the same set.
     */
    public boolean union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);

        if (rootI != rootJ) { // If they are in different sets, merge them
            // Union by rank: attach the smaller rank tree under the root of the higher rank tree
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootJ] < rank[rootI]) {
                parent[rootJ] = rootI;
            } else { // Ranks are equal, pick one as root and increment its rank
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
            return true;
        }
        return false; // Elements i and j are already in the same set
    }

    /**
     * Checks if two elements are in the same set.
     *
     * @param i An element.
     * @param j Another element.
     * @return True if `i` and `j` belong to the same set, false otherwise.
     */
    public boolean inSameSet(int i, int j) {
        return find(i) == find(j);
    }

    // Optional: for debugging or internal state inspection
    public int[] getParent() {
        return parent;
    }

    public int[] getRank() {
        return rank;
    }

    // Example Usage
    public static void main(String[] args) {
        int n = 7; // Elements 0, 1, 2, 3, 4, 5, 6
        DisjointSet ds = new DisjointSet(n);

        System.out.println("Initial state (each in its own set):");
        for (int i = 0; i < n; i++) {
            System.out.println("Element " + i + " is in set " + ds.find(i));
        }
        System.out.println();

        System.out.println("Union (0, 1): " + ds.union(0, 1)); // Should be true
        System.out.println("Union (2, 3): " + ds.union(2, 3)); // Should be true
        System.out.println("Union (4, 5): " + ds.union(4, 5)); // Should be true
        System.out.println("Union (1, 2): " + ds.union(1, 2)); // Should be true (0,1,2,3 are now connected)
        System.out.println("Union (5, 6): " + ds.union(5, 6)); // Should be true

        System.out.println("\nAfter unions:");
        System.out.println("0 and 3 in same set? " + ds.inSameSet(0, 3)); // True
        System.out.println("0 and 4 in same set? " + ds.inSameSet(0, 4)); // False
        System.out.println("4 and 6 in same set? " + ds.inSameSet(4, 6)); // True
        System.out.println("0 and 0 in same set? " + ds.inSameSet(0, 0)); // True

        System.out.println("\nFind operations after compression:");
        for (int i = 0; i < n; i++) {
            System.out.println("Element " + i + " root: " + ds.find(i));
        }

        System.out.println("\nUnion (0, 5): " + ds.union(0, 5)); // Should be true (all elements now connected)
        System.out.println("0 and 4 in same set (after merging 0's and 4's set)? " + ds.inSameSet(0, 4)); // True
    }
}

```