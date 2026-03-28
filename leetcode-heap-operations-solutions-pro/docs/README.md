```markdown
# Heap Operations: Comprehensive Coding Interview Project

This project is a detailed exploration of Heap data structures and their applications in solving common coding interview problems. It provides complete, well-commented JavaScript implementations, extensive test cases, performance benchmarks, and thorough documentation, making it an ideal resource for anyone preparing for technical interviews.

## Table of Contents

1.  [Introduction to Heaps](#introduction-to-heaps)
2.  [Project Structure](#project-structure)
3.  [Core Heap Implementations](#core-heap-implementations)
    *   [Generic Heap](#generic-heap)
    *   [Min-Heap](#min-heap)
    *   [Max-Heap](#max-heap)
4.  [Problems and Solutions](#problems-and-solutions)
    *   [Problem 1: Kth Largest Element / K Largest Elements](#problem-1-kth-largest-element--k-largest-elements)
    *   [Problem 2: Merge K Sorted Lists](#problem-2-merge-k-sorted-lists)
    *   [Problem 3: Find Median from Data Stream](#problem-3-find-median-from-data-stream)
    *   [Problem 4: Connect Ropes with Minimum Cost](#problem-4-connect-ropes-with-minimum-cost)
5.  [Setup and Running Tests](#setup-and-running-tests)
6.  [Documentation Links](#documentation-links)
7.  [Key Takeaways for Interviews](#key-takeaways-for-interviews)

---

## Introduction to Heaps

A **Heap** is a specialized tree-based data structure that satisfies the **heap property**:
*   **Min-Heap**: For any given node `i`, the value of node `i` is less than or equal to the value of its children. The smallest element is always at the root.
*   **Max-Heap**: For any given node `i`, the value of node `i` is greater than or equal to the value of its children. The largest element is always at the root.

Heaps are commonly implemented using an array because of their efficient space utilization and fast access to parent/child nodes:
*   Root: index `0`
*   Left child of node `i`: `2*i + 1`
*   Right child of node `i`: `2*i + 2`
*   Parent of node `i`: `floor((i - 1) / 2)`

The primary operations on a heap are `insert` and `extract-min/max` (or `delete-min/max`), both of which have a time complexity of `O(log N)`, where `N` is the number of elements in the heap. `peek` (getting the top element) is `O(1)`. This efficiency makes heaps ideal for problems requiring frequent retrieval of the minimum or maximum element.

---

## Project Structure

```
heap-operations-interview-project/
├── src/                                   # Source code for algorithms and utilities
│   ├── algorithms/                        # Heap implementations and problem solutions
│   │   ├── heap.js                        # Generic Heap base class with comparator
│   │   ├── minHeap.js                     # Min-Heap implementation
│   │   ├── maxHeap.js                     # Max-Heap implementation
│   │   ├── kLargestElements.js            # Problem 1: Kth Largest Element / K Largest Elements
│   │   ├── mergeKSortedLists.js           # Problem 2: Merge K Sorted Lists
│   │   ├── streamMedian.js                # Problem 3: Find Median from Data Stream
│   │   ├── connectRopes.js                # Problem 4: Connect Ropes with Minimum Cost
│   ├── utils/                             # Helper utilities
│   │   ├── performanceBenchmarking.js     # Code for timing function execution
│   │   ├── listNode.js                    # Simple singly linked list node definition
├── tests/                                 # Jest test files for all implementations
│   ├── heap.test.js
│   ├── kLargestElements.test.js
│   ├── mergeKSortedLists.test.js
│   ├── streamMedian.test.js
│   ├── connectRopes.test.js
├── docs/                                  # Comprehensive documentation files
│   ├── README.md                          # This file
│   ├── ALGORITHM_EXPLANATION.md           # Detailed explanation of heap algorithms
│   ├── VISUAL_DIAGRAMS.md                 # ASCII art diagrams for heap operations
│   ├── INTERVIEW_TIPS.md                  # Interview advice, common questions, and variations
├── .gitignore                             # Specifies intentionally untracked files
├── package.json                           # Project metadata and dependencies (Jest)
```

---

## Core Heap Implementations

### Generic Heap
`src/algorithms/heap.js`
This file defines a `Heap` base class that uses an array to store elements and a `comparator` function to define the heap property. This allows for flexible creation of both Min-Heaps and Max-Heaps.

### Min-Heap
`src/algorithms/minHeap.js`
Extends the `Heap` class with a comparator `(a, b) => a < b`, ensuring the smallest element is always at the root.
*   **Operations**: `insert(value)`, `extractMin()`, `peekMin()`, `size()`, `isEmpty()`.
*   **Time Complexity**:
    *   `insert`, `extractMin`: `O(log N)`
    *   `peekMin`, `size`, `isEmpty`: `O(1)`
*   **Space Complexity**: `O(N)` for storing elements.

### Max-Heap
`src/algorithms/maxHeap.js`
Extends the `Heap` class with a comparator `(a, b) => a > b`, ensuring the largest element is always at the root.
*   **Operations**: `insert(value)`, `extractMax()`, `peekMax()`, `size()`, `isEmpty()`.
*   **Time Complexity**: Same as Min-Heap.
*   **Space Complexity**: Same as Min-Heap.

---

## Problems and Solutions

Each problem includes an optimal heap-based solution, detailed comments, time/space complexity analysis, and often a comparison with a brute-force or less optimized alternative.

### Problem 1: Kth Largest Element / K Largest Elements
*   **Description**: Given an unsorted array `nums` and an integer `k`, find the `k`th largest element. A variation is to find all `k` largest elements.
*   **Optimal Solution**: Use a **Min-Heap** of size `k`. Iterate through `nums`, add elements to the heap. If heap size exceeds `k`, remove the smallest element (which is `minHeap.extractMin()`). After iterating, `minHeap.peekMin()` is the `k`th largest, and the heap contains all `k` largest elements.
*   **Time Complexity**: `O(N log K)`
*   **Space Complexity**: `O(K)`
*   **File**: `src/algorithms/kLargestElements.js`

### Problem 2: Merge K Sorted Lists
*   **Description**: Merge `k` sorted linked lists into one sorted linked list.
*   **Optimal Solution**: Use a **Min-Heap** to store the head nodes of all `k` lists. Repeatedly extract the smallest node from the heap, add it to the merged list, and then add its `next` node (if exists) back to the heap.
*   **Time Complexity**: `O(N log K)`, where `N` is the total number of nodes across all lists.
*   **Space Complexity**: `O(K)` for the heap.
*   **File**: `src/algorithms/mergeKSortedLists.js`

### Problem 3: Find Median from Data Stream
*   **Description**: Design a data structure that supports adding new numbers and finding the median of all numbers added so far.
*   **Optimal Solution**: Use two heaps: a **Max-Heap** for the smaller half of numbers and a **Min-Heap** for the larger half. Maintain balance such that the Max-Heap's size is equal to or one greater than the Min-Heap's size.
    *   If total elements are odd, the median is `maxHeap.peekMax()`.
    *   If total elements are even, the median is `(maxHeap.peekMax() + minHeap.peekMin()) / 2`.
*   **Time Complexity**:
    *   `addNum`: `O(log N)`
    *   `findMedian`: `O(1)`
*   **Space Complexity**: `O(N)`
*   **File**: `src/algorithms/streamMedian.js`

### Problem 4: Connect Ropes with Minimum Cost
*   **Description**: Given `n` ropes of different lengths, connect them into a single rope. The cost of connecting two ropes is the sum of their lengths. Find the minimum total cost.
*   **Optimal Solution**: This is a greedy problem best solved with a **Min-Heap**. Repeatedly extract the two smallest ropes from the heap, sum their lengths (this is the cost), add this cost to the total, and insert the new combined rope length back into the heap. Continue until only one rope remains.
*   **Time Complexity**: `O(N log N)`
*   **Space Complexity**: `O(N)`
*   **File**: `src/algorithms/connectRopes.js`

---

## Setup and Running Tests

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd heap-operations-interview-project
    ```
    (Replace `<repository_url>` with the actual URL if this were a GitHub repo).

2.  **Install dependencies:**
    This project uses `Jest` for testing.
    ```bash
    npm install
    ```

3.  **Run tests:**
    ```bash
    npm test
    ```
    This will execute all test files in the `tests/` directory and print results to the console, including performance benchmarks for optimized vs. brute-force solutions where applicable.

---

## Documentation Links

For deeper insights into the project, refer to the following markdown files in the `docs/` directory:

*   **[ALGORITHM_EXPLANATION.md](docs/ALGORITHM_EXPLANATION.md)**: A detailed explanation of heap data structures, their properties, and common operations.
*   **[VISUAL_DIAGRAMS.md](docs/VISUAL_DIAGRAMS.md)**: ASCII art diagrams illustrating heap structure and core operations like `heapifyUp` and `heapifyDown`.
*   **[INTERVIEW_TIPS.md](docs/INTERVIEW_TIPS.md)**: Essential tips for discussing heap-related problems in interviews, common variations, and edge cases to consider.

---

## Key Takeaways for Interviews

*   **Recognize Heap Problems**: Look for problems that require efficiently finding the Kth smallest/largest element, or managing a collection where you always need to access the min/max element (e.g., priority queues, scheduling).
*   **Min-Heap vs. Max-Heap**: Understand when to use which. Min-heap for "K largest" or "smallest of current elements". Max-heap for "K smallest" or "largest of current elements". Two heaps for median-finding.
*   **Complexity**: Be able to quickly state `O(log N)` for insert/extract and `O(1)` for peek. For problems, calculate the overall complexity based on the number of elements processed and heap operations.
*   **Edge Cases**: Always consider empty inputs, single element inputs, duplicate values, and `k` values at boundaries (e.g., `k=1`, `k=N`).
*   **Trade-offs**: Discuss space vs. time complexity trade-offs, especially when comparing heap-based solutions to sorting-based (O(N log N)) or brute-force (O(N^2)) alternatives. Heaps often provide a good balance or optimal performance for specific scenarios.
*   **Implementation Details**: Be ready to explain `heapifyUp` and `heapifyDown` and how array representation works.
```