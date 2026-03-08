const { swap } = require('../utils/arrayUtils');
const defaultComparator = require('../utils/comparator');

/**
 * src/problems/kthSmallestElement.js
 *
 * Problem: Kth Smallest Element in an Array
 *
 * Given an array `arr` and an integer `k`, return the k-th smallest element in the array.
 * Assume `k` is always valid, i.e., `1 <= k <= arr.length`.
 *
 * Example:
 * Input: arr = [7, 10, 4, 3, 20, 15], k = 3
 * Output: 7 (The sorted array is [3, 4, 7, 10, 15, 20]. The 3rd smallest element is 7.)
 */

/**
 * Approach 1: Sort the entire array (Brute Force / Simplest)
 *
 * Time Complexity: O(N log N) due to sorting.
 * Space Complexity: O(1) if sorting is in-place (e.g., QuickSort, HeapSort);
 *                   O(N) if sorting uses auxiliary space (e.g., MergeSort, JavaScript's built-in sort).
 *
 * @param {number[]} arr The input array.
 * @param {number} k The desired rank (1-indexed).
 * @returns {number} The k-th smallest element.
 */
function kthSmallest_Sorting(arr, k) {
    if (!arr || arr.length === 0) {
        throw new Error("Input array cannot be empty.");
    }
    // Make a copy to avoid modifying the original array if it's not expected
    const sortedArr = [...arr].sort(defaultComparator);
    // k is 1-indexed, so we access (k-1)-th index
    return sortedArr[k - 1];
}

/**
 * Approach 2: QuickSelect Algorithm (Optimal Average Case)
 *
 * QuickSelect is a selection algorithm to find the k-th smallest element in an unordered list.
 * It is related to the QuickSort sorting algorithm. Like QuickSort, it uses a pivot and partitions
 * the array, but it only recurses into one side of the partition.
 *
 * Time Complexity:
 *   - Average Case: O(N)
 *   - Worst Case: O(N^2) (if pivot selection is consistently poor)
 * Space Complexity: O(log N) on average (recursion stack), O(N) in worst case.
 *
 * @param {number[]} arr The input array.
 * @param {number} k The desired rank (1-indexed).
 * @returns {number} The k-th smallest element.
 */
function kthSmallest_QuickSelect(arr, k) {
    if (!arr || arr.length === 0) {
        throw new Error("Input array cannot be empty.");
    }
    // QuickSelect works on 0-indexed k. If k is 1-indexed, convert it.
    const k_index = k - 1;

    // Use a helper recursive function
    function quickSelect(subArr, low, high, targetIndex) {
        if (low === high) { // Base case: single element
            return subArr[low];
        }

        // Choose a random pivot to mitigate worst-case O(N^2) behavior
        const pivotIndex = randomPartition(subArr, low, high);

        if (pivotIndex === targetIndex) {
            return subArr[pivotIndex];
        } else if (pivotIndex < targetIndex) {
            // Recurse on the right side
            return quickSelect(subArr, pivotIndex + 1, high, targetIndex);
        } else {
            // Recurse on the left side
            return quickSelect(subArr, low, pivotIndex - 1, targetIndex);
        }
    }

    // Helper for partitioning, similar to QuickSort, but picks a random pivot
    function randomPartition(subArr, low, high) {
        // Generate a random index between low and high (inclusive)
        const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
        // Move the random element to the high end to be the pivot
        swap(subArr, randomIndex, high);
        return partition(subArr, low, high);
    }

    // Lomuto Partition Scheme (same as in quickSort.js)
    function partition(subArr, low, high) {
        const pivot = subArr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (subArr[j] <= pivot) {
                i++;
                swap(subArr, i, j);
            }
        }
        swap(subArr, i + 1, high);
        return i + 1;
    }

    // Call quickSelect on a copy of the array to avoid modifying the original
    return quickSelect([...arr], 0, arr.length - 1, k_index);
}


/**
 * Approach 3: Using a Min-Heap (or Max-Heap)
 *
 * To find the Kth smallest element:
 * 1. Build a Min-Heap from the entire array (O(N) time).
 * 2. Extract the minimum element K times (K * O(log N) time).
 * Total Time: O(N + K log N)
 * Space: O(N) for the heap.
 *
 * Alternatively, use a Max-Heap of size K:
 * 1. Insert the first K elements into a Max-Heap (O(K log K) time).
 * 2. For the remaining (N-K) elements, if an element is smaller than the heap's root (max element),
 *    remove the root and insert the new element (O(log K) for each element).
 * 3. After processing all elements, the root of the Max-Heap will be the Kth smallest element.
 * Total Time: O(K + (N-K)log K) which simplifies to O(N log K) in the worst case.
 * Space Complexity: O(K) for the heap.
 * This is generally better if K is much smaller than N.
 *
 * For simplicity and common interview scenarios, implementing a basic Max-Heap and using the
 * N log K approach is often preferred.
 *
 * Here, we will implement the Max-Heap of size K approach.
 *
 * Time Complexity: O(N log K)
 * Space Complexity: O(K)
 *
 * @param {number[]} arr The input array.
 * @param {number} k The desired rank (1-indexed).
 * @returns {number} The k-th smallest element.
 */
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // Get parent index
    _parent(i) { return Math.floor((i - 1) / 2); }
    // Get left child index
    _leftChild(i) { return 2 * i + 1; }
    // Get right child index
    _rightChild(i) { return 2 * i + 2; }

    // Swap elements in the heap array
    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Insert an element into the heap
    insert(value) {
        this.heap.push(value);
        this._heapifyUp();
    }

    // Extract the maximum element (root)
    extractMax() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const max = this.heap[0];
        this.heap[0] = this.heap.pop(); // Move last element to root
        this._heapifyDown(); // Restore heap property
        return max;
    }

    // Get the maximum element without removing it
    peek() {
        return this.isEmpty() ? undefined : this.heap[0];
    }

    // Get current size of the heap
    size() {
        return this.heap.length;
    }

    // Check if heap is empty
    isEmpty() {
        return this.heap.length === 0;
    }

    // Restore max-heap property upwards from the last inserted element
    _heapifyUp() {
        let currentIndex = this.heap.length - 1;
        while (currentIndex > 0 && this.heap[this._parent(currentIndex)] < this.heap[currentIndex]) {
            this._swap(currentIndex, this._parent(currentIndex));
            currentIndex = this._parent(currentIndex);
        }
    }

    // Restore max-heap property downwards from the root
    _heapifyDown() {
        let currentIndex = 0;
        const n = this.heap.length;

        while (true) {
            const left = this._leftChild(currentIndex);
            const right = this._rightChild(currentIndex);
            let largest = currentIndex;

            if (left < n && this.heap[left] > this.heap[largest]) {
                largest = left;
            }
            if (right < n && this.heap[right] > this.heap[largest]) {
                largest = right;
            }

            if (largest !== currentIndex) {
                this._swap(currentIndex, largest);
                currentIndex = largest;
            } else {
                break;
            }
        }
    }
}

function kthSmallest_MaxHeap(arr, k) {
    if (!arr || arr.length === 0) {
        throw new Error("Input array cannot be empty.");
    }
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds.");
    }

    const maxHeap = new MaxHeap();

    for (const num of arr) {
        // If heap size is less than k, just add the element
        if (maxHeap.size() < k) {
            maxHeap.insert(num);
        } else if (num < maxHeap.peek()) {
            // If current element is smaller than the largest in the heap (the root),
            // remove the largest and add the current element.
            maxHeap.extractMax();
            maxHeap.insert(num);
        }
    }

    // After processing all elements, the root of the max-heap is the k-th smallest element.
    return maxHeap.peek();
}


module.exports = {
    kthSmallest_Sorting,
    kthSmallest_QuickSelect,
    kthSmallest_MaxHeap
};