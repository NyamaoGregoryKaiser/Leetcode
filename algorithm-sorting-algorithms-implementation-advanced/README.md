# Sorting Algorithms Interview Project

This project explores various sorting algorithms and their applications, suitable for coding interview preparation.  It includes implementations in JavaScript, along with comprehensive testing and performance analysis.

## Problems:

1. **Array Sorting:** Implement various sorting algorithms to sort a given array of numbers in ascending order. Explore different approaches (e.g., merge sort, quick sort, heap sort).

2. **Kth Smallest Element:** Find the kth smallest element in an unsorted array.  Analyze time and space complexity for different approaches.

3. **Sorting with Constraints:** Sort an array containing both positive and negative numbers while maintaining the relative order of elements with the same absolute value. (e.g., [-2, 2, -1, 1, 3, -3] -> [-3, -2, -1, 1, 2, 3])

4. **Almost Sorted Array:** Given an array that is almost sorted (at most k elements are out of place), implement an efficient sorting algorithm to sort it.

5. **Sorting a Linked List:** Implement merge sort or other suitable algorithms to sort a singly linked list.


## Project Structure:

* `algorithms.js`: Implementations of sorting algorithms (Merge Sort, Quick Sort, Heap Sort).
* `problems.js`: Solutions to the problems listed above.
* `test.js`: Unit tests using Jest.
* `utils.js`: Helper functions (e.g., swap, array generation).
* `benchmark.js`: Performance benchmarking code.
* `algorithms_doc.md`: Detailed explanation of the algorithms.


## Getting Started:

1. Clone the repository.
2. Run `npm install` to install Jest.
3. Run `npm test` to run the unit tests.
4. Run `node benchmark.js` to run the performance benchmarks.