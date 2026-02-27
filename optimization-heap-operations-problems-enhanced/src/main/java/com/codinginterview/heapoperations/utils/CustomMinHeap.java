```java
package com.codinginterview.heapoperations.utils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * A custom implementation of a Min-Heap data structure using an ArrayList.
 * This class demonstrates the core mechanics of a heap (add, poll, peek, heapifyUp, heapifyDown)
 * from scratch, serving as an educational utility.
 *
 * @param <T> The type of elements stored in the heap. Must be Comparable or provide a Comparator.
 */
public class CustomMinHeap<T> {

    private final List<T> heap;
    private final Comparator<T> comparator;

    /**
     * Constructs a new CustomMinHeap with the default natural ordering.
     * Elements must implement the Comparable interface.
     */
    public CustomMinHeap() {
        this.heap = new ArrayList<>();
        this.comparator = null; // Use natural ordering
    }

    /**
     * Constructs a new CustomMinHeap with a custom Comparator.
     *
     * @param comparator The comparator to use for ordering elements.
     */
    public CustomMinHeap(Comparator<T> comparator) {
        this.heap = new ArrayList<>();
        this.comparator = comparator;
    }

    /**
     * Returns the size of the heap.
     * Time Complexity: O(1)
     *
     * @return The number of elements in the heap.
     */
    public int size() {
        return heap.size();
    }

    /**
     * Checks if the heap is empty.
     * Time Complexity: O(1)
     *
     * @return true if the heap contains no elements, false otherwise.
     */
    public boolean isEmpty() {
        return heap.isEmpty();
    }

    /**
     * Adds an element to the heap.
     * After adding, the heap property is restored by bubbling up the element.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     *
     * @param element The element to add.
     */
    public void add(T element) {
        if (element == null) {
            throw new IllegalArgumentException("Cannot add null element to the heap.");
        }
        heap.add(element);
        heapifyUp();
    }

    /**
     * Retrieves and removes the smallest element from the heap.
     * The heap property is restored by bubbling down the new root element.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     *
     * @return The smallest element in the heap.
     * @throws NoSuchElementException if the heap is empty.
     */
    public T poll() {
        if (isEmpty()) {
            throw new NoSuchElementException("Heap is empty.");
        }
        T minElement = heap.get(0);
        int lastIndex = heap.size() - 1;
        T lastElement = heap.remove(lastIndex); // Remove last element

        if (!isEmpty()) { // If heap is not empty after removing, place lastElement at root
            heap.set(0, lastElement);
            heapifyDown();
        }
        return minElement;
    }

    /**
     * Retrieves, but does not remove, the smallest element from the heap.
     * Time Complexity: O(1)
     *
     * @return The smallest element in the heap.
     * @throws NoSuchElementException if the heap is empty.
     */
    public T peek() {
        if (isEmpty()) {
            throw new NoSuchElementException("Heap is empty.");
        }
        return heap.get(0);
    }

    /**
     * Restores the heap property by moving the last added element up the tree
     * until its correct position is found.
     * Time Complexity: O(log N)
     */
    private void heapifyUp() {
        int currentIndex = heap.size() - 1;
        while (currentIndex > 0) {
            int parentIndex = (currentIndex - 1) / 2;
            if (compare(heap.get(currentIndex), heap.get(parentIndex)) < 0) {
                swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else {
                break; // Heap property satisfied
            }
        }
    }

    /**
     * Restores the heap property by moving the element at the root down the tree
     * until its correct position is found.
     * Time Complexity: O(log N)
     */
    private void heapifyDown() {
        int currentIndex = 0;
        int lastIndex = heap.size() - 1;

        while (true) {
            int leftChildIndex = 2 * currentIndex + 1;
            int rightChildIndex = 2 * currentIndex + 2;
            int smallestChildIndex = currentIndex;

            // Find the smallest child
            if (leftChildIndex <= lastIndex && compare(heap.get(leftChildIndex), heap.get(smallestChildIndex)) < 0) {
                smallestChildIndex = leftChildIndex;
            }
            if (rightChildIndex <= lastIndex && compare(heap.get(rightChildIndex), heap.get(smallestChildIndex)) < 0) {
                smallestChildIndex = rightChildIndex;
            }

            if (smallestChildIndex != currentIndex) {
                swap(currentIndex, smallestChildIndex);
                currentIndex = smallestChildIndex;
            } else {
                break; // Heap property satisfied
            }
        }
    }

    /**
     * Swaps two elements in the heap's underlying ArrayList.
     * Time Complexity: O(1)
     *
     * @param i Index of the first element.
     * @param j Index of the second element.
     */
    private void swap(int i, int j) {
        T temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }

    /**
     * Compares two elements using the provided comparator or natural ordering.
     *
     * @param a The first element.
     * @param b The second element.
     * @return A negative integer, zero, or a positive integer as the first argument
     *         is less than, equal to, or greater than the second.
     */
    @SuppressWarnings("unchecked")
    private int compare(T a, T b) {
        if (comparator != null) {
            return comparator.compare(a, b);
        } else {
            return ((Comparable<T>) a).compareTo(b);
        }
    }

    /**
     * Returns the heap elements as a List (for debugging/testing purposes).
     *
     * @return A list containing all elements in the heap.
     */
    public List<T> toList() {
        return new ArrayList<>(heap);
    }
}
```