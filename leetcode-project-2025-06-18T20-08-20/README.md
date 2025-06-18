# Heap Operations Coding Interview Project

This project explores various heap operations and provides solutions to several common interview problems.  It includes multiple approaches, performance benchmarks, and detailed explanations.

## Problems:

1. **Heap Sort:** Implement a heap sort algorithm. Analyze its time and space complexity.  Include both Max-Heap and Min-Heap variations.

2. **Find Kth Largest Element:**  Given an array of integers, find the kth largest element using a heap.  Optimize for time complexity.

3. **Merge K Sorted Lists:**  Merge k sorted linked lists into one sorted linked list using a min-heap.

4. **Top K Frequent Elements:** Given an array of integers, find the top k most frequent elements. Use a heap data structure for efficiency.

5. **Sliding Window Maximum:** Given an array of integers and a window size k, find the maximum value within each window of size k as it slides through the array.  Use a deque for an optimized solution. (This problem leverages heap concepts implicitly)

## Project Structure:

* `src/heap.ts`: Main heap implementation and problem solutions.
* `src/test/heap.test.ts`: Unit tests for heap operations.
* `src/utils.ts`: Utility functions (e.g., benchmarking).
* `docs/algorithm_explanation.md`: Detailed explanation of heap algorithms.
* `docs/diagrams.md`: ASCII art diagrams of heap operations.

## Getting Started:

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm test` to run the unit tests.
4. Explore the `src` and `docs` folders for code and documentation.