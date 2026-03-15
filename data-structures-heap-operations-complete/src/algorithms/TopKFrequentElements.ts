import { MinHeap } from './MinHeap';

/**
 * Problem: Top K Frequent Elements
 *
 * Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.
 * You may return the answer in any order.
 *
 * Example 1:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 * Explanation: 1 appears 3 times, 2 appears 2 times, 3 appears 1 time. The top 2 frequent elements are 1 and 2.
 *
 * Example 2:
 * Input: nums = [1], k = 1
 * Output: [1]
 */

/**
 * Finds the K most frequent elements in an array using a Min-Heap.
 *
 * Approach:
 * 1. Count Frequencies:
 *    Use a hash map (Map in TypeScript/JavaScript) to store the frequency of each number in `nums`.
 *    Key: number, Value: frequency count.
 * 2. Maintain a Min-Heap of size K:
 *    Create a Min-Heap that stores pairs `[frequency, number]`.
 *    The heap's comparator should prioritize pairs with smaller frequencies.
 * 3. Iterate through the frequency map:
 *    For each `[number, frequency]` pair:
 *    a. Insert the pair into the Min-Heap.
 *    b. If the heap's size exceeds `k`, remove the element with the smallest frequency
 *       (this will be the root of the Min-Heap).
 *       This ensures that the heap always contains the `k` elements with the highest frequencies
 *       encountered so far.
 * 4. Extract Results:
 *    After processing all frequency pairs, the Min-Heap will contain the `k` elements
 *    with the highest frequencies. Extract the numbers from the heap to form the result array.
 *
 * Time Complexity:
 * - Counting frequencies: O(N), where N is the number of elements in `nums`.
 *   This involves iterating through the array once and performing hash map operations (average O(1)).
 * - Building and maintaining the heap: O(M log K), where M is the number of distinct elements
 *   (at most N) and K is the desired number of frequent elements.
 *   For each distinct element, we perform one heap `insert` (O(log K)) and potentially one `extractMin` (O(log K)).
 *   In the worst case, M could be N (all unique elements). So, O(N log K).
 * - Extracting results: O(K log K) to extract K elements from the heap.
 * Overall Time Complexity: O(N + M log K) or O(N log K) in the worst case (if M ≈ N).
 *
 * Space Complexity:
 * - Frequency map: O(M) to store frequencies of distinct elements.
 * - Min-Heap: O(K) to store `k` pairs.
 * Overall Space Complexity: O(M + K).
 *
 * @param nums The array of numbers.
 * @param k The number of most frequent elements to return.
 * @returns An array containing the k most frequent elements.
 * @throws Error if k is invalid or nums is empty.
 */
export function topKFrequent(nums: number[], k: number): number[] {
    if (!nums || nums.length === 0 || k <= 0) {
        throw new Error("Invalid input: nums array is empty, or k is non-positive.");
    }

    // Edge case: if k is greater than or equal to the number of unique elements, return all unique elements.
    // This is implicitly handled by the algorithm, but good to note.

    // Step 1: Count frequencies using a Map
    const frequencyMap = new Map<number, number>();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Step 2: Initialize a Min-Heap to store [frequency, number] pairs.
    // The comparator prioritizes pairs with smaller frequency.
    const comparator = (a: [number, number], b: [number, number]) => a[0] - b[0];
    const minHeap = new MinHeap<[number, number]>(comparator);

    // Step 3: Iterate through the frequency map and maintain the k most frequent elements
    for (const [num, freq] of frequencyMap.entries()) {
        minHeap.insert([freq, num]); // Insert as [frequency, number]

        // If heap size exceeds k, remove the element with the smallest frequency
        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }

    // Step 4: Extract the numbers from the heap
    const result: number[] = [];
    while (!minHeap.isEmpty()) {
        result.push(minHeap.extractMin()![1]); // Add the number (second element of the pair)
    }

    // The elements are extracted in increasing order of frequency, so reverse if specific order is needed.
    // The problem states "You may return the answer in any order.", so reversing is optional.
    // return result.reverse();
    return result;
}

/**
 * Alternative Approach 1: Sorting (Brute Force)
 *
 * 1. Count frequencies using a hash map.
 * 2. Convert the map entries into an array of `[number, frequency]` pairs.
 * 3. Sort this array in descending order based on frequency.
 * 4. Take the first `k` elements from the sorted array.
 *
 * Time Complexity:
 * - Counting frequencies: O(N)
 * - Converting map to array: O(M), where M is number of distinct elements.
 * - Sorting the array of pairs: O(M log M)
 * - Extracting k elements: O(K)
 * Overall Time Complexity: O(N + M log M). In worst case, M could be N, so O(N log N).
 *
 * Space Complexity: O(M) for the frequency map and the array of pairs.
 *
 * Comparison to Heap:
 * - If M is much larger than K (many distinct elements but we only need a few top ones),
 *   the heap approach (O(N log K)) is better than sorting all M elements (O(N log M)).
 * - If M is close to K, or K is close to N, then both approaches are similar.
 */
export function topKFrequent_sorting(nums: number[], k: number): number[] {
    if (!nums || nums.length === 0 || k <= 0) {
        throw new Error("Invalid input.");
    }

    const frequencyMap = new Map<number, number>();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Convert map entries to an array of [number, frequency] pairs
    const freqPairs: [number, number][] = Array.from(frequencyMap.entries());

    // Sort by frequency in descending order
    freqPairs.sort((a, b) => b[1] - a[1]);

    // Take the top k elements
    const result: number[] = [];
    for (let i = 0; i < k && i < freqPairs.length; i++) {
        result.push(freqPairs[i][0]);
    }

    return result;
}

/**
 * Alternative Approach 2: Bucket Sort (More memory efficient in certain scenarios)
 *
 * This approach is viable when the range of frequencies is not excessively large.
 * 1. Count frequencies using a hash map.
 * 2. Create an array of "buckets" where `buckets[i]` contains a list of numbers that
 *    appear `i` times. The index `i` represents the frequency.
 *    The size of the buckets array will be `N+1` (from frequency 0 to N).
 * 3. Iterate the buckets from the highest frequency down to 1.
 * 4. Collect elements until `k` elements are found.
 *
 * Time Complexity:
 * - Counting frequencies: O(N)
 * - Filling buckets: O(M), where M is number of distinct elements.
 * - Collecting results: O(N) in worst case (if all numbers have low freq)
 * Overall Time Complexity: O(N) (linear time!)
 *
 * Space Complexity: O(N) for the frequency map and the buckets array.
 *
 * This is the most optimal in terms of time complexity but can use more memory if
 * there are many distinct frequencies, or the max frequency is very large (though max freq <= N).
 * It's considered the "gold standard" if an O(N) solution is required.
 */
export function topKFrequent_bucketSort(nums: number[], k: number): number[] {
    if (!nums || nums.length === 0 || k <= 0) {
        throw new Error("Invalid input.");
    }

    const frequencyMap = new Map<number, number>();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Create buckets based on frequency. Max frequency can be nums.length.
    const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);

    for (const [num, freq] of frequencyMap.entries()) {
        buckets[freq].push(num);
    }

    const result: number[] = [];
    // Iterate from highest frequency bucket down
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        if (buckets[i].length > 0) {
            // Add all numbers in this bucket to the result, up to k
            result.push(...buckets[i]);
        }
    }

    // Trim result to exactly k elements if it somehow grew larger (due to spread operator)
    return result.slice(0, k);
}
```
```typescript