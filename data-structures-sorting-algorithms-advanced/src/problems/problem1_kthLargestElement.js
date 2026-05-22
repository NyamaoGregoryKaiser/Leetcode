```javascript
/**
 * @fileoverview Solutions for finding the Kth Largest Element in an Array.
 * Problem Description: Given an integer array `nums` and an integer `k`, return the k-th largest element in the array.
 * Note that it is the k-th largest element in the sorted order, not the k-th distinct element.
 * You must solve it without sorting the array. (This implies for optimal solution)
 */

const quickSort = require('../algorithms/quickSort'); // For an O(N log N) approach
const { swap } = require('../utils/arrayUtils');

/**
 * Approach 1: Sort the array (brute-force / naive approach for comparison).
 * Time Complexity: O(N log N) due to sorting.
 * Space Complexity: O(1) if in-place sort, O(log N) to O(N) for recursive stack or auxiliary array depending on sort.
 * @param {Array<number>} nums The input array of numbers.
 * @param {number} k The k-th largest element to find.
 * @returns {number} The k-th largest element.
 */
function findKthLargest_sort(nums, k) {
  if (!Array.isArray(nums) || nums.length === 0 || k < 1 || k > nums.length) {
    throw new Error('Invalid input: nums must be a non-empty array and k must be within bounds.');
  }
  // Make a copy to avoid modifying the original array if quickSort is not a pure function.
  // If quickSort is guaranteed to be in-place, this copy isn't strictly necessary for correctness,
  // but it's good practice if the original array should remain untouched.
  const arrCopy = [...nums];
  quickSort(arrCopy); // Or use arrCopy.sort((a, b) => a - b);
  return arrCopy[arrCopy.length - k];
}

/**
 * Approach 2: Using a Min-Heap (or Max-Heap).
 * Build a Min-Heap of size k. Iterate through the array. If an element is larger than
 * the heap's root, remove the root and insert the new element.
 * After iterating through all elements, the heap's root is the k-th largest.
 *
 * Time Complexity: O(N log K). Building heap takes O(K), then N-K elements
 *                  take O(log K) each to process.
 * Space Complexity: O(K) for the heap.
 *
 * @param {Array<number>} nums The input array of numbers.
 * @param {number} k The k-th largest element to find.
 * @returns {number} The k-th largest element.
 */
function findKthLargest_minHeap(nums, k) {
  if (!Array.isArray(nums) || nums.length === 0 || k < 1 || k > nums.length) {
    throw new Error('Invalid input: nums must be a non-empty array and k must be within bounds.');
  }

  // Simple Min-Heap implementation using an array
  class MinHeap {
    constructor() {
      this.heap = [];
    }

    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    hasParent(i) { return this.getParentIndex(i) >= 0; }
    hasLeftChild(i) { return this.getLeftChildIndex(i) < this.heap.length; }
    hasRightChild(i) { return this.getRightChildIndex(i) < this.heap.length; }

    getParent(i) { return this.heap[this.getParentIndex(i)]; }
    getLeftChild(i) { return this.heap[this.getLeftChildIndex(i)]; }
    getRightChild(i) { return this.heap[this.getRightChildIndex(i)]; }

    peek() {
      if (this.heap.length === 0) return null;
      return this.heap[0];
    }

    size() {
      return this.heap.length;
    }

    extractMin() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();

      const item = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
      return item;
    }

    insert(item) {
      this.heap.push(item);
      this.heapifyUp();
    }

    swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    heapifyUp() {
      let index = this.heap.length - 1;
      while (this.hasParent(index) && this.getParent(index) > this.heap[index]) {
        this.swap(this.getParentIndex(index), index);
        index = this.getParentIndex(index);
      }
    }

    heapifyDown() {
      let index = 0;
      while (this.hasLeftChild(index)) {
        let smallerChildIndex = this.getLeftChildIndex(index);
        if (this.hasRightChild(index) && this.getRightChild(index) < this.getLeftChild(index)) {
          smallerChildIndex = this.getRightChildIndex(index);
        }

        if (this.heap[index] < this.heap[smallerChildIndex]) {
          break;
        } else {
          this.swap(index, smallerChildIndex);
        }
        index = smallerChildIndex;
      }
    }
  }

  const minHeap = new MinHeap();

  for (const num of nums) {
    minHeap.insert(num);
    if (minHeap.size() > k) {
      minHeap.extractMin(); // Maintain heap size k
    }
  }

  return minHeap.peek();
}

/**
 * Approach 3: QuickSelect (Optimal average-case solution).
 * This algorithm is a variation of QuickSort. Instead of recursing on both sides
 * of the pivot, it only recurses on the side that contains the k-th element.
 *
 * Time Complexity: O(N) on average, O(N^2) worst-case (if poor pivot selection).
 * Space Complexity: O(log N) on average for recursion stack, O(N) worst-case.
 * @param {Array<number>} nums The input array of numbers.
 * @param {number} k The k-th largest element to find.
 * @returns {number} The k-th largest element.
 */
function findKthLargest_quickSelect(nums, k) {
  if (!Array.isArray(nums) || nums.length === 0 || k < 1 || k > nums.length) {
    throw new Error('Invalid input: nums must be a non-empty array and k must be within bounds.');
  }

  // QuickSelect works by finding the element at index `k_smallest` if the array was sorted ascending.
  // If we want the k-th largest, and the array has N elements, the k-th largest element
  // is equivalent to the (N - k)-th smallest element (using 0-based indexing for position).
  const k_smallest_idx = nums.length - k;
  const arr = [...nums]; // Create a copy to avoid modifying the original array.

  function _partition(arr, left, right, pivotIndex) {
    const pivotValue = arr[pivotIndex];
    swap(arr, pivotIndex, right); // Move pivot to end
    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (arr[i] < pivotValue) {
        swap(arr, storeIndex, i);
        storeIndex++;
      }
    }
    swap(arr, right, storeIndex); // Move pivot to its final place
    return storeIndex;
  }

  function select(list, left, right, k_target_index) {
    if (left === right) { // If the list contains only one element, return that element
      return list[left];
    }

    // Select a random pivot index
    // A random pivot helps to achieve O(N) average time complexity and avoids worst-case O(N^2)
    // for already sorted or reverse-sorted arrays, which can happen with a fixed pivot (e.g., last element).
    let pivotIndex = left + Math.floor(Math.random() * (right - left + 1));

    // Partition the list around the pivot
    pivotIndex = _partition(list, left, right, pivotIndex);

    // If the pivot is the k-th smallest element, return its value
    if (k_target_index === pivotIndex) {
      return list[k_target_index];
    } else if (k_target_index < pivotIndex) {
      // If the k-th smallest element is in the left sub-array
      return select(list, left, pivotIndex - 1, k_target_index);
    } else {
      // If the k-th smallest element is in the right sub-array
      return select(list, pivotIndex + 1, right, k_target_index);
    }
  }

  return select(arr, 0, arr.length - 1, k_smallest_idx);
}

module.exports = {
  findKthLargest_sort,
  findKthLargest_minHeap,
  findKthLargest_quickSelect,
};
```