```java
package com.heapinterview.datastructures;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Comparator;

/**
 * CustomMinHeap: An array-based implementation of a Min-Heap.
 * A Min-Heap is a complete binary tree where the value of each node
 * is less than or equal to the value of its children. The smallest
 * element is always at the root.
 *
 * @param <T> The type of elements stored in the heap, must be comparable.
 */
public class CustomMinHeap<T> {

    private List<T> heap; // Internal list to store heap elements
    private Comparator<? super T> comparator; // Comparator for custom ordering

    /**
     * Constructs an empty CustomMinHeap using natural ordering.
     * Elements must implement the Comparable interface.
     */
    public CustomMinHeap() {
        this.heap = new ArrayList<>();
        this.comparator = null; // Use natural ordering if comparator is null
    }

    /**
     * Constructs an empty CustomMinHeap with a custom comparator.
     *
     * @param comparator The comparator to use for ordering elements.
     */
    public CustomMinHeap(Comparator<? super T> comparator) {
        this.heap = new ArrayList<>();
        this.comparator = comparator;
    }

    /**
     * Returns the number of elements in the heap.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @return The size of the heap.
     */
    public int size() {
        return heap.size();
    }

    /**
     * Checks if the heap is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @return True if the heap is empty, false otherwise.
     */
    public boolean isEmpty() {
        return heap.isEmpty();
    }

    /**
     * Compares two elements using the configured comparator or natural ordering.
     *
     * @param a The first element.
     * @param b The second element.
     * @return A negative integer, zero, or a positive integer as the first
     *         argument is less than, equal to, or greater than the second.
     */
    @SuppressWarnings("unchecked")
    private int compare(T a, T b) {
        if (comparator != null) {
            return comparator.compare(a, b);
        } else {
            return ((Comparable<T>) a).compareTo(b);
        }
    }

    // --- Heap Utility Methods ---

    /**
     * Gets the index of the parent of the node at `index`.
     *
     * @param index The index of the child node.
     * @return The index of the parent node.
     */
    private int getParentIndex(int index) {
        return (index - 1) / 2;
    }

    /**
     * Gets the index of the left child of the node at `index`.
     *
     * @param index The index of the parent node.
     * @return The index of the left child node.
     */
    private int getLeftChildIndex(int index) {
        return 2 * index + 1;
    }

    /**
     * Gets the index of the right child of the node at `index`.
     *
     * @param index The index of the parent node.
     * @return The index of the right child node.
     */
    private int getRightChildIndex(int index) {
        return 2 * index + 2;
    }

    /**
     * Checks if the node at `index` has a parent.
     *
     * @param index The index of the node.
     * @return True if a parent exists, false otherwise.
     */
    private boolean hasParent(int index) {
        return getParentIndex(index) >= 0;
    }

    /**
     * Checks if the node at `index` has a left child.
     *
     * @param index The index of the node.
     * @return True if a left child exists, false otherwise.
     */
    private boolean hasLeftChild(int index) {
        return getLeftChildIndex(index) < heap.size();
    }

    /**
     * Checks if the node at `index` has a right child.
     *
     * @param index The index of the node.
     * @return True if a right child exists, false otherwise.
     */
    private boolean hasRightChild(int index) {
        return getRightChildIndex(index) < heap.size();
    }

    /**
     * Swaps the elements at `index1` and `index2` in the heap.
     *
     * @param index1 The first index.
     * @param index2 The second index.
     */
    private void swap(int index1, int index2) {
        T temp = heap.get(index1);
        heap.set(index1, heap.get(index2));
        heap.set(index2, temp);
    }

    // --- Heap Operations ---

    /**
     * Inserts a new element into the heap.
     * After insertion, it performs heapify-up to maintain the heap property.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     * Space Complexity: O(1) (amortized O(1) for ArrayList resizing).
     *
     * @param item The element to insert.
     */
    public void insert(T item) {
        heap.add(item); // Add to the end
        heapifyUp();    // Restore heap property
    }

    /**
     * Retrieves (but does not remove) the minimum element in the heap.
     * This is the root element.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @return The minimum element.
     * @throws NoSuchElementException if the heap is empty.
     */
    public T peek() {
        if (isEmpty()) {
            throw new NoSuchElementException("Heap is empty.");
        }
        return heap.get(0); // The root is always the minimum
    }

    /**
     * Removes and returns the minimum element from the heap.
     * It replaces the root with the last element, then performs heapify-down.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     * Space Complexity: O(1)
     *
     * @return The minimum element.
     * @throws NoSuchElementException if the heap is empty.
     */
    public T poll() {
        if (isEmpty()) {
            throw new NoSuchElementException("Heap is empty.");
        }
        T item = heap.get(0); // Store the root element to return
        // Move the last element to the root
        heap.set(0, heap.get(heap.size() - 1));
        heap.remove(heap.size() - 1); // Remove the last element
        heapifyDown();                // Restore heap property
        return item;
    }

    /**
     * Restores the heap property by moving the last inserted element up the tree.
     * This is called after inserting an element.
     * It compares the element at the current index with its parent and swaps
     * them if the parent is larger (for a min-heap), continuing until the
     * heap property is satisfied or the root is reached.
     * Time Complexity: O(log N)
     */
    private void heapifyUp() {
        int currentIndex = heap.size() - 1; // Start from the last element
        while (hasParent(currentIndex) && compare(heap.get(currentIndex), heap.get(getParentIndex(currentIndex))) < 0) {
            swap(currentIndex, getParentIndex(currentIndex));
            currentIndex = getParentIndex(currentIndex);
        }
    }

    /**
     * Restores the heap property by moving the root element down the tree.
     * This is called after removing the root element.
     * It compares the element at the current index with its children and swaps
     * it with the smaller child (for a min-heap), continuing until the heap
     * property is satisfied or it becomes a leaf node.
     * Time Complexity: O(log N)
     */
    private void heapifyDown() {
        int currentIndex = 0; // Start from the root
        while (hasLeftChild(currentIndex)) {
            int smallerChildIndex = getLeftChildIndex(currentIndex);
            // Check if right child exists and is smaller than left child
            if (hasRightChild(currentIndex) && compare(heap.get(getRightChildIndex(currentIndex)), heap.get(smallerChildIndex)) < 0) {
                smallerChildIndex = getRightChildIndex(currentIndex);
            }

            // If the current element is smaller than or equal to its smallest child,
            // heap property is satisfied.
            if (compare(heap.get(currentIndex), heap.get(smallerChildIndex)) <= 0) {
                break;
            } else {
                // Otherwise, swap with the smaller child and continue down
                swap(currentIndex, smallerChildIndex);
                currentIndex = smallerChildIndex;
            }
        }
    }

    /**
     * Returns a string representation of the heap (internal list).
     * For debugging purposes.
     *
     * @return String representation of the heap.
     */
    @Override
    public String toString() {
        return heap.toString();
    }
}
```