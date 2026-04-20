```typescript
import { Heap } from '../data-structures/Heap';
import { defaultCompare, reverseComparator } from '../utils/comparator';

/**
 * Finds the Kth largest element in an array using a Min-Heap.
 *
 * Algorithm:
 * 1. Initialize a Min-Heap.
 * 2. Iterate through the array `nums`:
 *    a. Insert the current number into the heap.
 *    b. If the heap's size exceeds `k`, remove the smallest element (root) from the heap.
 * 3. After iterating through all numbers, the root of the Min-Heap will be the Kth largest element.
 *
 * Why this works:
 * The Min-Heap of size `k` always stores the `k` largest elements encountered so far.
 * When a new element comes in, if it's larger than the current smallest among the `k` largest (i.e., `heap.peek()`),
 * it means it should be part of the top `k`. We add it and remove the smallest to maintain size `k`.
 * If it's smaller, it's irrelevant to the top `k`, and we don't add it (or add and immediately remove).
 *
 * Time Complexity: O(N log K)
 *   - N insertions, each taking O(log K) because the heap size is capped at K.
 * Space Complexity: O(K)
 *   - The heap stores at most K elements.
 *
 * @param nums The input array of numbers.
 * @param k The desired Kth largest element.
 * @returns The Kth largest element, or undefined if array is empty or k is invalid.
 */
export function findKthLargestHeap(nums: number[], k: number): number | undefined {
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        return undefined;
    }

    // A Min-Heap of size K will store the K largest elements.
    // The smallest element in this heap (its root) will be the Kth largest.
    const minHeap = Heap.createMinHeap<number>();

    for (const num of nums) {
        minHeap.insert(num);
        if (minHeap.size() > k) {
            minHeap.extract(); // Remove the smallest element if heap exceeds size K
        }
    }

    // The root of the min-heap is the Kth largest element
    return minHeap.peek();
}

/**
 * Finds the Kth smallest element in an array using a Max-Heap.
 *
 * Algorithm:
 * 1. Initialize a Max-Heap.
 * 2. Iterate through the array `nums`:
 *    a. Insert the current number into the heap.
 *    b. If the heap's size exceeds `k`, remove the largest element (root) from the heap.
 * 3. After iterating through all numbers, the root of the Max-Heap will be the Kth smallest element.
 *
 * Why this works:
 * The Max-Heap of size `k` always stores the `k` smallest elements encountered so far.
 * When a new element comes in, if it's smaller than the current largest among the `k` smallest (i.e., `heap.peek()`),
 * it means it should be part of the top `k`. We add it and remove the largest to maintain size `k`.
 * If it's larger, it's irrelevant to the top `k`, and we don't add it (or add and immediately remove).
 *
 * Time Complexity: O(N log K)
 *   - N insertions, each taking O(log K) because the heap size is capped at K.
 * Space Complexity: O(K)
 *   - The heap stores at most K elements.
 *
 * @param nums The input array of numbers.
 * @param k The desired Kth smallest element.
 * @returns The Kth smallest element, or undefined if array is empty or k is invalid.
 */
export function findKthSmallestHeap(nums: number[], k: number): number | undefined {
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        return undefined;
    }

    // A Max-Heap of size K will store the K smallest elements.
    // The largest element in this heap (its root) will be the Kth smallest.
    const maxHeap = Heap.createMaxHeap<number>();

    for (const num of nums) {
        maxHeap.insert(num);
        if (maxHeap.size() > k) {
            maxHeap.extract(); // Remove the largest element if heap exceeds size K
        }
    }

    // The root of the max-heap is the Kth smallest element
    return maxHeap.peek();
}


/**
 * Brute-force approach: Finds the Kth largest element by sorting the array.
 * This is simpler to implement but generally less efficient for large N and small K compared to the heap approach.
 *
 * Time Complexity: O(N log N) due to sorting.
 * Space Complexity: O(1) or O(N) depending on the sorting algorithm used by JavaScript's `sort()`.
 *                   Many modern `sort()` implementations are Timsort/Introsort which can use O(log N) or O(N) auxiliary space.
 *
 * @param nums The input array of numbers.
 * @param k The desired Kth largest element.
 * @returns The Kth largest element, or undefined if array is empty or k is invalid.
 */
export function findKthLargestSort(nums: number[], k: number): number | undefined {
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        return undefined;
    }

    // Sort the array in descending order
    nums.sort((a, b) => b - a);

    // The Kth largest element will be at index k-1 (0-indexed)
    return nums[k - 1];
}

/**
 * Brute-force approach: Finds the Kth smallest element by sorting the array.
 *
 * Time Complexity: O(N log N) due to sorting.
 * Space Complexity: O(1) or O(N) depending on the sorting algorithm.
 *
 * @param nums The input array of numbers.
 * @param k The desired Kth smallest element.
 * @returns The Kth smallest element, or undefined if array is empty or k is invalid.
 */
export function findKthSmallestSort(nums: number[], k: number): number | undefined {
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        return undefined;
    }

    // Sort the array in ascending order
    nums.sort((a, b) => a - b);

    // The Kth smallest element will be at index k-1 (0-indexed)
    return nums[k - 1];
}
```