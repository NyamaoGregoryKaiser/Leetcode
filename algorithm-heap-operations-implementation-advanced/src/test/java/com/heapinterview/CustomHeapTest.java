```java
package com.heapinterview.heapinterview;

import com.heapinterview.datastructures.CustomMaxHeap;
import com.heapinterview.datastructures.CustomMinHeap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Custom Heap Tests")
class CustomHeapTest {

    private CustomMinHeap<Integer> minHeap;
    private CustomMaxHeap<Integer> maxHeap;

    @BeforeEach
    void setUp() {
        minHeap = new CustomMinHeap<>();
        maxHeap = new CustomMaxHeap<>();
    }

    // --- CustomMinHeap Tests ---

    @Test
    @DisplayName("MinHeap: should correctly insert and peek smallest element")
    void testMinHeapInsertAndPeek() {
        minHeap.insert(3);
        assertEquals(3, minHeap.peek());
        minHeap.insert(1);
        assertEquals(1, minHeap.peek());
        minHeap.insert(5);
        assertEquals(1, minHeap.peek());
        minHeap.insert(2);
        assertEquals(1, minHeap.peek());
    }

    @Test
    @DisplayName("MinHeap: should correctly poll elements in ascending order")
    void testMinHeapPoll() {
        minHeap.insert(5);
        minHeap.insert(3);
        minHeap.insert(8);
        minHeap.insert(1);
        minHeap.insert(6);

        assertEquals(1, minHeap.poll());
        assertEquals(3, minHeap.poll());
        assertEquals(5, minHeap.poll());
        assertEquals(6, minHeap.poll());
        assertEquals(8, minHeap.poll());
        assertTrue(minHeap.isEmpty());
    }

    @Test
    @DisplayName("MinHeap: should handle duplicate elements correctly")
    void testMinHeapDuplicates() {
        minHeap.insert(5);
        minHeap.insert(1);
        minHeap.insert(5);
        minHeap.insert(1);
        minHeap.insert(3);

        assertEquals(1, minHeap.poll());
        assertEquals(1, minHeap.poll());
        assertEquals(3, minHeap.poll());
        assertEquals(5, minHeap.poll());
        assertEquals(5, minHeap.poll());
    }

    @Test
    @DisplayName("MinHeap: should throw NoSuchElementException on peek/poll from empty heap")
    void testMinHeapEmptyExceptions() {
        assertTrue(minHeap.isEmpty());
        assertThrows(NoSuchElementException.class, () -> minHeap.peek());
        assertThrows(NoSuchElementException.class, () -> minHeap.poll());

        minHeap.insert(10);
        assertDoesNotThrow(() -> minHeap.peek());
        assertDoesNotThrow(() -> minHeap.poll());
        assertTrue(minHeap.isEmpty());
        assertThrows(NoSuchElementException.class, () -> minHeap.peek());
    }

    @Test
    @DisplayName("MinHeap: should maintain correct size")
    void testMinHeapSize() {
        assertEquals(0, minHeap.size());
        minHeap.insert(1);
        assertEquals(1, minHeap.size());
        minHeap.insert(2);
        minHeap.insert(3);
        assertEquals(3, minHeap.size());
        minHeap.poll();
        assertEquals(2, minHeap.size());
        minHeap.poll();
        minHeap.poll();
        assertEquals(0, minHeap.size());
    }

    @Test
    @DisplayName("MinHeap: should work with custom comparator")
    void testMinHeapCustomComparator() {
        // Create a min-heap that stores strings and orders them by length
        CustomMinHeap<String> stringMinHeap = new CustomMinHeap<>(Comparator.comparingInt(String::length));

        stringMinHeap.insert("apple"); // 5
        stringMinHeap.insert("a");     // 1
        stringMinHeap.insert("banana"); // 6
        stringMinHeap.insert("hi");    // 2

        assertEquals("a", stringMinHeap.poll());
        assertEquals("hi", stringMinHeap.poll());
        assertEquals("apple", stringMinHeap.poll());
        assertEquals("banana", stringMinHeap.poll());
    }

    // --- CustomMaxHeap Tests ---

    @Test
    @DisplayName("MaxHeap: should correctly insert and peek largest element")
    void testMaxHeapInsertAndPeek() {
        maxHeap.insert(3);
        assertEquals(3, maxHeap.peek());
        maxHeap.insert(1);
        assertEquals(3, maxHeap.peek());
        maxHeap.insert(5);
        assertEquals(5, maxHeap.peek());
        maxHeap.insert(2);
        assertEquals(5, maxHeap.peek());
    }

    @Test
    @DisplayName("MaxHeap: should correctly poll elements in descending order")
    void testMaxHeapPoll() {
        maxHeap.insert(5);
        maxHeap.insert(3);
        maxHeap.insert(8);
        maxHeap.insert(1);
        maxHeap.insert(6);

        assertEquals(8, maxHeap.poll());
        assertEquals(6, maxHeap.poll());
        assertEquals(5, maxHeap.poll());
        assertEquals(3, maxHeap.poll());
        assertEquals(1, maxHeap.poll());
        assertTrue(maxHeap.isEmpty());
    }

    @Test
    @DisplayName("MaxHeap: should handle duplicate elements correctly")
    void testMaxHeapDuplicates() {
        maxHeap.insert(5);
        maxHeap.insert(1);
        maxHeap.insert(5);
        maxHeap.insert(1);
        maxHeap.insert(3);

        assertEquals(5, maxHeap.poll());
        assertEquals(5, maxHeap.poll());
        assertEquals(3, maxHeap.poll());
        assertEquals(1, maxHeap.poll());
        assertEquals(1, maxHeap.poll());
    }

    @Test
    @DisplayName("MaxHeap: should throw NoSuchElementException on peek/poll from empty heap")
    void testMaxHeapEmptyExceptions() {
        assertTrue(maxHeap.isEmpty());
        assertThrows(NoSuchElementException.class, () -> maxHeap.peek());
        assertThrows(NoSuchElementException.class, () -> maxHeap.poll());

        maxHeap.insert(10);
        assertDoesNotThrow(() -> maxHeap.peek());
        assertDoesNotThrow(() -> maxHeap.poll());
        assertTrue(maxHeap.isEmpty());
        assertThrows(NoSuchElementException.class, () -> maxHeap.peek());
    }

    @Test
    @DisplayName("MaxHeap: should maintain correct size")
    void testMaxHeapSize() {
        assertEquals(0, maxHeap.size());
        maxHeap.insert(1);
        assertEquals(1, maxHeap.size());
        maxHeap.insert(2);
        maxHeap.insert(3);
        assertEquals(3, maxHeap.size());
        maxHeap.poll();
        assertEquals(2, maxHeap.size());
        maxHeap.poll();
        maxHeap.poll();
        assertEquals(0, maxHeap.size());
    }

    @Test
    @DisplayName("MaxHeap: should work with custom comparator (reverse order for strings)")
    void testMaxHeapCustomComparator() {
        // Create a max-heap that stores strings and orders them by length (longest first)
        CustomMaxHeap<String> stringMaxHeap = new CustomMaxHeap<>(Collections.reverseOrder(Comparator.comparingInt(String::length)));

        stringMaxHeap.insert("apple"); // 5
        stringMaxHeap.insert("a");     // 1
        stringMaxHeap.insert("banana"); // 6
        stringMaxHeap.insert("hi");    // 2

        assertEquals("banana", stringMaxHeap.poll());
        assertEquals("apple", stringMaxHeap.poll());
        assertEquals("hi", stringMaxHeap.poll());
        assertEquals("a", stringMaxHeap.poll());
    }
}
```