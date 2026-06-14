```java
package com.example.graph.datastructures;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class DisjointSetTest {

    private DisjointSet<Integer> dsu;
    private Set<Integer> initialElements;

    @BeforeEach
    void setUp() {
        initialElements = new HashSet<>();
        initialElements.add(1);
        initialElements.add(2);
        initialElements.add(3);
        initialElements.add(4);
        initialElements.add(5);
        dsu = new DisjointSet<>(initialElements);
    }

    @Test
    void testMakeSetAndFind() {
        // Initially, each element should be in its own set
        assertEquals(1, dsu.find(1));
        assertEquals(2, dsu.find(2));
        assertEquals(3, dsu.find(3));
        assertEquals(4, dsu.find(4));
        assertEquals(5, dsu.find(5));
        assertEquals(5, dsu.getNumSets());
    }

    @Test
    void testUnion() {
        // Union 1 and 2
        assertTrue(dsu.union(1, 2));
        assertTrue(dsu.areInSameSet(1, 2));
        assertFalse(dsu.areInSameSet(1, 3));
        assertEquals(dsu.find(1), dsu.find(2));
        assertEquals(4, dsu.getNumSets());

        // Union 3 and 4
        assertTrue(dsu.union(3, 4));
        assertTrue(dsu.areInSameSet(3, 4));
        assertFalse(dsu.areInSameSet(1, 3));
        assertEquals(dsu.find(3), dsu.find(4));
        assertEquals(3, dsu.getNumSets());

        // Union 1 and 3 (merges {1,2} with {3,4})
        assertTrue(dsu.union(1, 3));
        assertTrue(dsu.areInSameSet(1, 2));
        assertTrue(dsu.areInSameSet(3, 4));
        assertTrue(dsu.areInSameSet(1, 3));
        assertTrue(dsu.areInSameSet(2, 4));
        assertEquals(dsu.find(1), dsu.find(3));
        assertEquals(2, dsu.getNumSets()); // {1,2,3,4} and {5}

        // Union an element with itself or already in the same set
        assertFalse(dsu.union(1, 2)); // Already in same set
        assertEquals(2, dsu.getNumSets());
    }

    @Test
    void testAreInSameSet() {
        dsu.union(1, 2);
        dsu.union(3, 4);
        dsu.union(1, 3); // {1,2,3,4}, {5}

        assertTrue(dsu.areInSameSet(1, 4));
        assertTrue(dsu.areInSameSet(2, 3));
        assertFalse(dsu.areInSameSet(1, 5));
        assertFalse(dsu.areInSameSet(4, 5));
    }

    @Test
    void testNumSets() {
        assertEquals(5, dsu.getNumSets());
        dsu.union(1, 2);
        assertEquals(4, dsu.getNumSets());
        dsu.union(2, 3);
        assertEquals(3, dsu.getNumSets());
        dsu.union(4, 5);
        assertEquals(2, dsu.getNumSets());
        dsu.union(1, 5);
        assertEquals(1, dsu.getNumSets()); // All elements in one set
    }

    @Test
    void testNewElementAddsToOwnSet() {
        assertThrows(IllegalArgumentException.class, () -> dsu.find(10));
        assertThrows(IllegalArgumentException.class, () -> dsu.union(1, 10));

        dsu.makeSet(10);
        assertEquals(dsu.find(10), 10);
        assertEquals(6, dsu.getNumSets());
        assertFalse(dsu.areInSameSet(1, 10));
    }

    @Test
    void testPathCompression() {
        dsu.union(1, 2); // {1,2}
        dsu.union(3, 4); // {3,4}
        dsu.union(1, 3); // {1,2,3,4}

        // Before find, parent(2) might be 1, parent(4) might be 3.
        // After find(2), parent(2) should point directly to the root of {1,2,3,4}.
        // After find(4), parent(4) should point directly to the root of {1,2,3,4}.
        Integer root = dsu.find(1);
        assertEquals(root, dsu.find(2));
        assertEquals(root, dsu.find(3));
        assertEquals(root, dsu.find(4));

        // Internally, the parent map should reflect path compression.
        // This is hard to test directly without exposing internals, but
        // repeated finds should be faster. The correctness of find() is sufficient.
    }

    @Test
    void testEmptySetConstruction() {
        DisjointSet<String> emptyDsu = new DisjointSet<>(new HashSet<>());
        assertEquals(0, emptyDsu.getNumSets());
        assertThrows(IllegalArgumentException.class, () -> emptyDsu.find("A"));
        emptyDsu.makeSet("A");
        assertEquals(1, emptyDsu.getNumSets());
        assertEquals("A", emptyDsu.find("A"));
    }
}
```