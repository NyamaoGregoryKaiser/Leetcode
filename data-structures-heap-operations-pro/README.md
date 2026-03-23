```markdown
# Heap Operations Project: Comprehensive Coding Interview Prep

This project provides a deep dive into Heap data structures, their fundamental operations, and their applications in solving common algorithmic problems frequently encountered in coding interviews. It's designed to be a complete resource, offering implemented solutions, extensive tests, performance benchmarks, and detailed documentation.

## Table of Contents

1.  [Project Goals](#project-goals)
2.  [Project Structure](#project-structure)
3.  [Setup and Running](#setup-and-running)
    *   [Installation](#installation)
    *   [Building the Project](#building-the-project)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
4.  [Core Data Structures](#core-data-structures)
    *   [MinHeap](#minheap)
    *   [MaxHeap](#maxheap)
5.  [Problems and Solutions](#problems-and-solutions)
    *   [Problem 1: Kth Largest Element in a Stream](#problem-1-kth-largest-element-in-a-stream)
    *   [Problem 2: Merge K Sorted Lists](#problem-2-merge-k-sorted-lists)
    *   [Problem 3: Find Median from Data Stream](#problem-3-find-median-from-data-stream)
    *   [Problem 4: Top K Frequent Elements](#problem-4-top-k-frequent-elements)
6.  [Documentation and Interview Guide](#documentation-and-interview-guide)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Goals

*   **Implement foundational Heap data structures:** Build `MinHeap` and `MaxHeap` from scratch using an array-based representation.
*   **Solve classic Heap-related problems:** Apply the custom heap implementations to solve 3-5 typical interview problems.
*   **Demonstrate optimal solutions:** Focus on heap-based solutions, which are often the most efficient for these types of problems.
*   **Provide comprehensive testing:** Ensure correctness of both the data structures and problem solutions with a wide range of test cases, including edge cases.
*   **Benchmark performance:** Compare heap-based solutions against brute-force or less optimal approaches to highlight efficiency gains.
*   **Offer detailed documentation:** Explain heap concepts, algorithms, time/space complexity, and provide interview preparation tips.

## Project Structure

```
heap-operations-project/
├── src/
│   ├── data-structures/
│   │   ├── MinMaxHeap.ts             # Generic Heap, MinHeap, MaxHeap implementations
│   │   └── ListNode.ts               # Helper for Merge K Sorted Lists
│   └── problems/
│       ├── kth-largest-in-stream.ts  # Problem 1: Kth Largest Element in a Stream
│       ├── merge-k-sorted-lists.ts   # Problem 2: Merge K Sorted Lists
│       ├── find-median-from-data-stream.ts # Problem 3: Find Median from Data Stream
│       └── top-k-frequent-elements.ts# Problem 4: Top K Frequent Elements
├── tests/
│   ├── data-structures/
│   │   └── MinMaxHeap.test.ts        # Tests for MinHeap and MaxHeap
│   └── problems/
│       ├── kth-largest-in-stream.test.ts
│       ├── merge-k-sorted-lists.test.ts
│       ├── find-median-from-data-stream.test.ts
│       └── top-k-frequent-elements.test.ts
├── benchmarks/
│   ├── kth-largest-benchmark.ts      # Performance comparison for Kth Largest
│   └── top-k-frequent-benchmark.ts   # Performance comparison for Top K Frequent
├── docs/
│   ├── heap-operations-explained.md  # Detailed explanation of Heap algorithms
│   └── interview-guide.md            # Interview tips, variations, and common pitfalls
├── README.md                       # Project overview, setup, problem descriptions
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Project dependencies and scripts
```

## Setup and Running

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/heap-operations-project.git
    cd heap-operations-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Building the Project

Compile the TypeScript code to JavaScript:
```bash
npm run build
```
This will create a `dist/` directory containing the compiled JavaScript files.

### Running Tests

All tests are written using Jest.
```bash
npm test
```
To run tests in watch mode:
```bash
npm test:watch
```

### Running Benchmarks

Benchmarks compare the performance of heap-based solutions against alternative (often brute-force or less optimal) approaches for specific problems.

*   **Kth Largest Element Benchmark:**
    ```bash
    npm run benchmark:kth-largest
    ```
*   **Top K Frequent Elements Benchmark:**
    ```bash
    npm run benchmark:top-k-frequent
    ```

## Core Data Structures

The project starts by implementing generic `MinHeap` and `MaxHeap` classes. These are fundamental building blocks for solving many problems efficiently.

### MinHeap

A binary tree-based data structure where the value of each node is less than or equal to the values of its children. The smallest element is always at the root.

*   **Location:** `src/data-structures/MinMaxHeap.ts`
*   **Key Operations:** `insert`, `extractMin`, `peek`, `size`, `isEmpty`.
*   **Time Complexity:**
    *   `insert`: O(log N)
    *   `extractMin`: O(log N)
    *   `peek`: O(1)
    *   `size`, `isEmpty`: O(1)
*   **Space Complexity:** O(N) for storing N elements.

### MaxHeap

Similar to a MinHeap, but the value of each node is greater than or equal to the values of its children. The largest element is always at the root.

*   **Location:** `src/data-structures/MinMaxHeap.ts`
*   **Key Operations:** `insert`, `extractMax`, `peek`, `size`, `isEmpty`.
*   **Time Complexity:** Same as MinHeap.
*   **Space Complexity:** Same as MinHeap.

Both `MinHeap` and `MaxHeap` support custom comparison functions, making them highly versatile for objects or complex types.

## Problems and Solutions

Here are the specific problems tackled in this project, along with their heap-based solutions.

### Problem 1: Kth Largest Element in a Stream

**Description:**
Design a class to find the `k`-th largest element in a stream. Note that it is the `k`-th largest element in the sorted order, not the `k`-th distinct element. Your `KthLargest` class will have two methods: `KthLargest(int k, int[] nums)` and `int add(int val)`.

**Solution Approach (Optimized - Heap):**
Maintain a `MinHeap` of size `k`. When a new number arrives:
1.  If the heap size is less than `k`, add the number.
2.  If the heap size is `k` and the new number is larger than the heap's minimum (root), remove the minimum and add the new number.
The `k`-th largest element will always be the root of this `MinHeap`.

*   **Location:** `src/problems/kth-largest-in-stream.ts`
*   **Time Complexity:**
    *   `KthLargest` constructor: O(N log k), where N is the initial number of elements.
    *   `add`: O(log k)
*   **Space Complexity:** O(k) for the heap.
*   **Alternative (Brute-Force):** Keep all elements in an array, sort it on each `add` operation, and return `nums[nums.length - k]`.
    *   `add`: O(N log N) (due to sorting) + O(N) (array insertion/resizing). Much slower for frequent `add` operations.

### Problem 2: Merge K Sorted Lists

**Description:**
You are given an array of `k` linked-lists `lists`, each list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

**Solution Approach (Optimized - Heap):**
Use a `MinHeap` to store the *current* smallest element from each of the `k` lists.
1.  Initialize the heap with the first node of each non-empty list.
2.  While the heap is not empty:
    *   Extract the node with the smallest value from the heap. This node becomes the next node in the merged list.
    *   If the extracted node has a `next` element, add that `next` element to the heap.

*   **Location:** `src/problems/merge-k-sorted-lists.ts`
*   **Time Complexity:** O(N log k), where N is the total number of elements across all lists, and k is the number of lists.
    *   Initial heap build: O(k log k)
    *   Each of N extractions/insertions: O(log k)
*   **Space Complexity:** O(k) for the heap (at most k nodes in the heap at any time).
*   **Alternative (Brute-Force / Less Optimal):**
    *   **Concatenate and Sort:** Add all elements to a single array, then sort and build a new linked list. O(N log N) time, O(N) space.
    *   **Pairwise Merge:** Merge list 1 with list 2, then the result with list 3, and so on. O(N * k) in worst case.

### Problem 3: Find Median from Data Stream

**Description:**
The median is the middle value in an ordered integer list. If the size of the list is even, there is no single middle value, and the median is the average of the two middle values.
Implement the `MedianFinder` class:
*   `MedianFinder()` initializes the `MedianFinder` object.
*   `void addNum(int num)` adds an integer `num` from the data stream to the data structure.
*   `double findMedian()` returns the median of all elements so far. Answers within `10^-5` of the actual answer will be accepted.

**Solution Approach (Optimized - Two Heaps):**
Maintain two heaps:
1.  A `MaxHeap` (`smallerHalf`) to store the smaller half of the numbers.
2.  A `MinHeap` (`largerHalf`) to store the larger half of the numbers.
The `MaxHeap`'s top element will be the largest among the smaller half, and the `MinHeap`'s top element will be the smallest among the larger half. These two elements will be crucial for calculating the median.
Balance the heaps such that `smallerHalf.size()` is either equal to `largerHalf.size()` or one greater.

*   **Location:** `src/problems/find-median-from-data-stream.ts`
*   **Time Complexity:**
    *   `addNum`: O(log N)
    *   `findMedian`: O(1)
*   **Space Complexity:** O(N) for storing N elements across both heaps.

### Problem 4: Top K Frequent Elements

**Description:**
Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

**Solution Approach (Optimized - Heap):**
1.  Count the frequency of each element using a hash map (e.g., `Map` in TypeScript).
2.  Iterate through the frequency map and maintain a `MinHeap` of size `k`. The heap will store pairs `[frequency, element]`.
3.  When adding a `[freq, el]` pair to the heap:
    *   If the heap size is less than `k`, simply add it.
    *   If the heap size is `k` and the current pair's frequency is greater than the frequency of the pair at the heap's root (minimum frequency), remove the root and add the new pair.
4.  After processing all elements, the heap will contain the `k` most frequent elements. Extract them.

*   **Location:** `src/problems/top-k-frequent-elements.ts`
*   **Time Complexity:**
    *   Frequency counting: O(N)
    *   Heap operations: O(M log k), where M is the number of unique elements (M <= N). In the worst case, M=N, so O(N log k).
    *   Overall: O(N + M log k) which simplifies to O(N log k) since M <= N.
*   **Space Complexity:** O(M) for the frequency map and O(k) for the heap. Overall O(M + k).
*   **Alternative (Less Optimal):**
    *   **Bucket Sort / Quick Select:** More complex but can achieve O(N) average time complexity for Quick Select, or O(N) worst case with Bucket Sort if frequencies are bounded.
    *   **Sort by Frequency:** Count frequencies, convert to array of `[freq, el]` pairs, sort this array, then take the top `k`. O(N) for counting, O(M log M) for sorting, then O(k) for extraction. Overall O(N + M log M). This is less efficient than the heap if `M` is large.

## Documentation and Interview Guide

*   **`docs/heap-operations-explained.md`**: Provides a detailed theoretical explanation of heaps, including their structure, properties, array representation, and how core operations (`heapifyUp`, `heapifyDown`, `insert`, `extract`) work with illustrative ASCII diagrams. It also covers time and space complexity analysis for heap operations.
*   **`docs/interview-guide.md`**: Offers practical advice for coding interviews involving heaps. It covers common interview questions, strategies for explaining heap concepts, typical follow-up questions, crucial edge cases to consider, and variations of standard heap problems.

## Contributing

Feel free to open issues or submit pull requests to improve this project. Suggestions for additional problems, optimizations, or documentation enhancements are welcome!

## License

This project is licensed under the MIT License. See the `LICENSE` file for details (not included in this generation, but standard practice).
```