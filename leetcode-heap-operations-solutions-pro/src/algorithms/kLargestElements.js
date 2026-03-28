```javascript
/**
 * kLargestElements.js
 *
 * Problem: Find the Kth largest element in an unsorted array, or return the K largest elements.
 *
 * This problem can be solved efficiently using a Min-Heap.
 *
 * Problem Description:
 * Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.
 * Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element.
 * (Variations: return all k largest elements).
 *
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5 (The 2nd largest element)
 *
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4 (The 4th largest element)
 */

const MinHeap = require('./minHeap');

/**
 * Finds the Kth largest element in an array using a Min-Heap.
 *
 * Approach:
 * 1. Initialize a Min-Heap.
 * 2. Iterate through the input array `nums`:
 *    a. Insert the current number into the heap.
 *    b. If the heap size exceeds `k`, remove the smallest element from the heap (which is at the root).
 * 3. After iterating through all numbers, the heap will contain the `k` largest elements.
 *    The smallest element in this heap will be the Kth largest element overall.
 *
 * Why a Min-Heap of size K?
 * We want to keep track of the largest elements. If we have a Min-Heap of size K,
 * its root is the Kth largest element *among the elements currently in the heap*.
 * When we encounter a new number:
 * - If the new number is larger than the root of our Min-Heap, it means this new number
 *   is among the top K largest elements seen so far. We add it and remove the current
 *   smallest (Kth largest) to maintain size K.
 * - If the new number is smaller, it's not among the top K, so we ignore it.
 * This naturally filters out smaller numbers and keeps the K largest.
 *
 * Time Complexity: O(N log K)
 *   - N iterations, each involving a heap insertion (log K) and potentially an extraction (log K).
 * Space Complexity: O(K)
 *   - The heap stores at most K elements.
 *
 * @param {number[]} nums - The input array of numbers.
 * @param {number} k - The 'k' for the Kth largest element.
 * @returns {number} The Kth largest element.
 */
function findKthLargest(nums, k) {
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        throw new Error("Invalid input: nums must be a non-empty array and k must be between 1 and nums.length.");
    }

    const minHeap = new MinHeap();

    for (const num of nums) {
        minHeap.insert(num);
        if (minHeap.size() > k) {
            minHeap.extractMin(); // Remove the smallest element
        }
    }

    // The root of the min-heap is the Kth largest element
    return minHeap.peekMin();
}

/**
 * Finds the K largest elements in an array using a Min-Heap.
 *
 * Similar logic to `findKthLargest`, but instead of just returning the peeked value,
 * we extract all elements from the heap.
 *
 * Time Complexity: O(N log K) to build the heap, then O(K log K) to extract all. Dominant is O(N log K).
 * Space Complexity: O(K)
 *
 * @param {number[]} nums - The input array of numbers.
 * @param {number} k - The number of largest elements to find.
 * @returns {number[]} An array containing the K largest elements.
 */
function findKLargestElements(nums, k) {
    if (!nums || nums.length === 0 || k <= 0) {
        return [];
    }
    if (k >= nums.length) {
        // If k is greater than or equal to array length, just sort and return all or throw error based on spec.
        // For this problem, let's assume k will not exceed array length for meaningful 'k largest'.
        // Or if it does, it means return all elements sorted descending.
        // Let's stick to the problem's spirit: k <= nums.length
        return nums.slice().sort((a, b) => b - a); // Return all sorted descending
    }

    const minHeap = new MinHeap();

    for (const num of nums) {
        minHeap.insert(num);
        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }

    // The heap now contains the K largest elements. Extract them to an array.
    const result = [];
    while (!minHeap.isEmpty()) {
        result.unshift(minHeap.extractMin()); // Unshift to get them in descending order
    }
    return result;
}

/**
 * Alternative approach (Brute Force/Sorting):
 * 1. Sort the array in descending order.
 * 2. Return the element at index k-1 (for Kth largest) or the first K elements.
 *
 * Time Complexity: O(N log N) for sorting.
 * Space Complexity: O(log N) or O(N) depending on the sort implementation (for JavaScript, usually O(N)).
 *
 * This is simpler for small N but less efficient than the heap approach for large N and small K.
 * For example, if N = 1,000,000 and K = 10, N log K is much faster than N log N.
 */
function findKthLargest_BruteForce(nums, k) {
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        throw new Error("Invalid input: nums must be a non-empty array and k must be between 1 and nums.length.");
    }
    nums.sort((a, b) => b - a); // Sort in descending order
    return nums[k - 1];
}


module.exports = {
    findKthLargest,
    findKLargestElements,
    findKthLargest_BruteForce // For comparison
};
```