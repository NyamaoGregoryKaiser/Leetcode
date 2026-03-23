```typescript
/**
 * src/problems/top-k-frequent-elements.ts
 * 
 * Problem: Top K Frequent Elements
 * LeetCode: 347
 * 
 * Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.
 * You may return the answer in any order.
 * 
 * Example 1:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 * 
 * Example 2:
 * Input: nums = [1], k = 1
 * Output: [1]
 */

import { MinHeap, Comparator } from '../data-structures/MinMaxHeap';

/**
 * Finds the K most frequent elements in an array.
 * 
 * Solution Approach: Using a MinHeap (Priority Queue)
 * 
 * 1. Frequency Counting: First, count the frequency of each number in `nums` using a hash map (Map in TS).
 *    This will give us a mapping of `number -> frequency`.
 *    Example: `[1,1,1,2,2,3]` -> `Map { 1 => 3, 2 => 2, 3 => 1 }`
 * 
 * 2. Maintain a MinHeap of size `k`: The heap will store `[frequency, element]` pairs.
 *    The custom comparator for the MinHeap will prioritize pairs with *smaller* frequencies.
 *    - Iterate through the `frequencyMap`. For each `[element, frequency]` pair:
 *      a. Insert the pair into the `MinHeap`.
 *      b. If the `MinHeap` size exceeds `k`, remove the element with the smallest frequency (which is the root of the MinHeap).
 *         This ensures the heap always contains the `k` pairs with the highest frequencies seen so far.
 * 
 * 3. Extract Results: After processing all unique elements, the `MinHeap` will contain the `k` most frequent elements.
 *    Extract the `element` values from these pairs.
 * 
 * Time Complexity: O(N + M log k)
 *   - N is the number of elements in `nums`.
 *   - M is the number of unique elements in `nums` (M <= N).
 *   - Step 1 (Frequency Counting): O(N) to iterate through `nums`.
 *   - Step 2 (Heap Operations): O(M log k). For each of the M unique elements, we perform at most one heap insertion and one potential extraction, each taking O(log k) time.
 *   - Step 3 (Extract Results): O(k log k) to extract k elements, or O(k) if we just iterate the internal array.
 *   - Overall: O(N + M log k). Since M <= N, this can be simplified to O(N log k) in the worst case (all elements unique).
 * Space Complexity: O(M + k)
 *   - O(M) for the frequency map (stores M unique elements).
 *   - O(k) for the MinHeap (stores k `[frequency, element]` pairs).
 *   - Overall: O(M + k).
 */
export function topKFrequent(nums: number[], k: number): number[] {
    // Edge cases
    if (!nums || nums.length === 0 || k <= 0) {
        return [];
    }
    if (k === nums.length) {
        // If k is equal to the total number of elements, all elements are top k frequent.
        // We can just return unique elements, or all elements if order doesn't matter and duplicates are allowed
        // in the result (problem implies distinct elements for the 'top k').
        return Array.from(new Set(nums));
    }

    // Step 1: Count frequency of each number
    // Map stores: number -> frequency
    const frequencyMap = new Map<number, number>();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Step 2: Use a MinHeap to maintain the k most frequent elements.
    // The heap will store pairs [frequency, element].
    // Custom comparator for MinHeap: compares based on frequency (the first element of the pair).
    // A pair `[freqA, elA]` is 'smaller' than `[freqB, elB]` if `freqA < freqB`.
    const minHeapComparator: Comparator<[number, number]> = (a, b) => a[0] - b[0];
    const minHeap = new MinHeap<[number, number]>(minHeapComparator);

    // Iterate through the frequency map
    for (const [element, frequency] of frequencyMap.entries()) {
        // If the heap has less than k elements, just add the current element-frequency pair.
        if (minHeap.size() < k) {
            minHeap.insert([frequency, element]);
        } else {
            // If the heap is full (size k)
            // Compare the current element's frequency with the smallest frequency in the heap (heap.peek()).
            // If the current element is more frequent, it belongs in our top k.
            if (frequency > minHeap.peek()![0]) { // minHeap.peek()![0] is the frequency of the least frequent element in the heap
                // Remove the least frequent element from the heap.
                minHeap.extractMin();
                // Add the current more frequent element.
                minHeap.insert([frequency, element]);
            }
        }
    }

    // Step 3: Extract the k elements from the heap.
    // The heap now contains the k pairs with the highest frequencies.
    const result: number[] = [];
    while (!minHeap.isEmpty()) {
        result.push(minHeap.extractMin()![1]); // Extract the element (second part of the pair)
    }

    // The result array is currently in ascending order of frequency (due to MinHeap extraction).
    // The problem states "You may return the answer in any order", so this is fine.
    // If specific order (e.g., decreasing frequency) was required, we would reverse the array here.
    return result;
}

/*
// --- Alternative Approaches (for discussion, not implemented in full) ---

// 1. Sort by Frequency (Less Optimal than Heap for specific K)
//   - Count frequencies into a Map (O(N)).
//   - Convert Map entries into an array of [frequency, element] pairs (O(M)).
//   - Sort this array in descending order of frequency (O(M log M)).
//   - Take the first k elements (O(k)).
//   - Total Time: O(N + M log M). This is less optimal than O(N + M log k) if k << M.
//     For example, if M=1000 and k=10, log M is ~10, log k is ~3. The heap is faster.

// 2. Bucket Sort (Optimal for specific constraints)
//   - Count frequencies into a Map (O(N)).
//   - Create an array of "buckets" where index `i` stores a list of numbers that appear `i` times.
//     The size of this array would be `N+1` (max frequency can be N).
//   - Populate the buckets: Iterate through the frequency map and place each element into its corresponding frequency bucket (O(M)).
//   - Iterate buckets from `max_frequency` down to `1`, collecting elements until `k` elements are found. (O(N) in worst case).
//   - Total Time: O(N). This is the most optimal approach in terms of worst-case time complexity,
//     but involves creating an array of lists of size N, which can be memory-intensive and slightly
//     more complex to implement than the heap.
//   - Space Complexity: O(N) for frequency map and buckets.

// 3. Quick Select (Optimal Average Case)
//   - Count frequencies into a Map (O(N)).
//   - Convert Map entries into an array of [frequency, element] pairs (O(M)).
//   - Use the Quick Select algorithm to find the (M-k)-th smallest frequency (or k-th largest) in O(M) average time.
//     This partitions the array such that all elements more frequent than the k-th are on one side.
//   - Collect the k most frequent elements.
//   - Total Time: O(N + M) on average. Worst case O(N + M^2) but can be mitigated with good pivot selection.
//   - This is generally faster than the heap-based approach on average, but requires a more complex algorithm implementation.
*/
```