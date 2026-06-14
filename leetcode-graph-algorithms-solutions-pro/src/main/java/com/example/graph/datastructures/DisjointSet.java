```java
package com.example.graph.datastructures;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Implements the Disjoint Set Union (DSU) data structure.
 * Also known as Union-Find.
 * Supports path compression and union by rank/size for optimal performance.
 *
 * @param <T> The type of elements stored in the sets.
 */
public class DisjointSet<T> {
    // Stores the parent of each element. parent[i] is parent of i.
    private final Map<T, T> parent;
    // Stores the rank (or size) of the root of each set.
    // Rank is used to keep the tree flat, avoiding tall trees during union operations.
    private final Map<T, Integer> rank;
    // Stores the number of disjoint sets currently in the structure.
    private int numSets;

    /**
     * Initializes a DisjointSet structure.
     * All elements passed in the initial set will be in their own individual sets.
     *
     * @param elements A set of elements to initially add to the DSU.
     */
    public DisjointSet(Set<T> elements) {
        parent = new HashMap<>();
        rank = new HashMap<>();
        numSets = 0;
        for (T element : elements) {
            makeSet(element);
        }
    }

    /**
     * Creates a new set containing only the given element.
     * If the element already exists, it does nothing.
     *
     * @param element The element to create a set for.
     */
    public void makeSet(T element) {
        if (!parent.containsKey(element)) {
            parent.put(element, element); // Each element is its own parent initially
            rank.put(element, 0);         // Initial rank is 0
            numSets++;
        }
    }

    /**
     * Finds the representative (root) of the set containing the given element.
     * Uses path compression to flatten the tree structure for faster future lookups.
     *
     * @param element The element to find the set representative for.
     * @return The representative of the set containing the element.
     * @throws IllegalArgumentException if the element is not part of any set.
     */
    public T find(T element) {
        if (!parent.containsKey(element)) {
            throw new IllegalArgumentException("Element " + element + " not found in any set.");
        }
        // If element is not its own parent, it's not the root.
        // Recursively find the root and apply path compression.
        if (!parent.get(element).equals(element)) {
            parent.put(element, find(parent.get(element))); // Path compression
        }
        return parent.get(element);
    }

    /**
     * Merges the sets containing elementA and elementB into a single set.
     * Uses union by rank to keep the tree flat.
     *
     * @param elementA One element in the first set.
     * @param elementB One element in the second set.
     * @return true if the sets were different and merged, false if they were already in the same set.
     * @throws IllegalArgumentException if either element is not part of any set.
     */
    public boolean union(T elementA, T elementB) {
        T rootA = find(elementA);
        T rootB = find(elementB);

        // If they are already in the same set, do nothing.
        if (rootA.equals(rootB)) {
            return false;
        }

        // Union by rank: attach the smaller rank tree under the root of the larger rank tree.
        // If ranks are equal, pick one as root and increment its rank.
        int rankA = rank.get(rootA);
        int rankB = rank.get(rootB);

        if (rankA < rankB) {
            parent.put(rootA, rootB);
        } else if (rankB < rankA) {
            parent.put(rootB, rootA);
        } else { // Ranks are equal
            parent.put(rootB, rootA);
            rank.put(rootA, rankA + 1); // Increment rank of the new root
        }
        numSets--; // A union operation reduces the total number of disjoint sets
        return true;
    }

    /**
     * Checks if two elements are in the same set.
     *
     * @param elementA The first element.
     * @param elementB The second element.
     * @return true if elementA and elementB belong to the same set, false otherwise.
     * @throws IllegalArgumentException if either element is not part of any set.
     */
    public boolean areInSameSet(T elementA, T elementB) {
        return find(elementA).equals(find(elementB));
    }

    /**
     * Returns the total number of disjoint sets.
     *
     * @return The count of disjoint sets.
     */
    public int getNumSets() {
        return numSets;
    }
}
```