```typescript
import { Heap } from '../data-structures/Heap';
import { defaultCompare } from '../utils/comparator';

/**
 * Finds the K most frequent elements in an array using a frequency map and a Min-Heap.
 *
 * Algorithm:
 * 1. Count frequencies: Iterate through `nums` and store element frequencies in a `Map<number, number>`.
 * 2. Build a Min-Heap:
 *    a. Create a Min-Heap that stores objects of type `{ element: number, frequency: number }`.
 *    b. The comparison function for the heap should prioritize elements with *lower* frequency.
 *    c. Iterate through the `frequencyMap`:
 *       i. Insert each `{ element, frequency }` pair into the heap.
 *       ii. If the heap's size exceeds `k`, remove the element with the smallest frequency (root).
 * 3. Extract results: After processing all elements, the heap will contain the `k` most frequent elements.
 *    Extract them one by one to form the result array.
 *
 * Why this works:
 * A Min-Heap of size `k` storing `[frequency, element]` pairs will always have the *least frequent* of the top `k` elements at its root.
 * When a new element's frequency is encountered:
 * - If the heap size is less than `k`, add it.
 * - If the heap size is `k`, and the new element's frequency is *greater* than the root's frequency,
 *   it means the new element is more frequent than at least one of the current top `k`.
 *   So, we remove the least frequent element from the heap (root) and add the new element.
 * - If the new element's frequency is *less than or equal to* the root's frequency, it's not among the top `k`, so we do nothing.
 *
 * Time Complexity: O(N + M log K)
 *   - O(N) for building the frequency map (where N is the length of `nums`).
 *   - O(M log K) for heap operations, where M is the number of unique elements. Each of M unique elements might be inserted into the heap. Heap operations are O(log K). In the worst case, M can be N. So, O(N log K).
 * Space Complexity: O(M + K)
 *   - O(M) for the frequency map (stores M unique elements).
 *   - O(K) for the heap (stores K elements).
 *   - Total: O(N) in worst case (all elements unique).
 *
 * @param nums The input array of integers.
 * @param k The number of most frequent elements to return.
 * @returns An array containing the k most frequent elements.
 */
export function topKFrequent(nums: number[], k: number): number[] {
    if (!nums || nums.length === 0 || k <= 0) {
        return [];
    }

    // Step 1: Count frequencies of each number
    const frequencyMap = new Map<number, number>();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Step 2: Use a Min-Heap to keep track of the k most frequent elements
    // The heap will store objects { element: number, frequency: number }
    // We want a Min-Heap based on frequency, so the smallest frequency will be at the root.
    const freqComparator = (a: { element: number, frequency: number }, b: { element: number, frequency: number }) => {
        return defaultCompare(a.frequency, b.frequency);
    };
    const minHeap = Heap.createMinHeap<{ element: number, frequency: number }>(freqComparator);

    for (const [element, frequency] of frequencyMap.entries()) {
        minHeap.insert({ element, frequency });
        // If the heap size exceeds k, remove the element with the smallest frequency (the root)
        if (minHeap.size() > k) {
            minHeap.extract();
        }
    }

    // Step 3: Extract elements from the heap
    const result: number[] = [];
    while (!minHeap.isEmpty()) {
        result.push(minHeap.extract()!.element);
    }

    // The elements are extracted in ascending order of frequency (due to min-heap),
    // but the problem doesn't specify order, so this is fine.
    // If order by frequency (descending) was needed, could reverse or use a Max-Heap and extract.
    return result;
}

/**
 * Alternative approach: Finds the K most frequent elements by sorting.
 *
 * Algorithm:
 * 1. Count frequencies: Iterate through `nums` and store element frequencies in a `Map<number, number>`.
 * 2. Convert map to array: Transform the frequency map into an array of `[element, frequency]` pairs.
 * 3. Sort by frequency: Sort this array in descending order of frequency.
 * 4. Extract top K: Take the first `k` elements from the sorted array.
 *
 * Time Complexity: O(N + M log M)
 *   - O(N) for building the frequency map.
 *   - O(M) for converting map to array.
 *   - O(M log M) for sorting the array of M unique elements (M can be up to N).
 * Space Complexity: O(N)
 *   - O(N) for the frequency map (worst case all elements unique).
 *   - O(N) for the array of `[element, frequency]` pairs.
 *
 * This approach is simpler but can be less efficient than the heap approach if M is large
 * (e.g., all elements are unique, M=N), making the sort O(N log N) while the heap is O(N log K).
 * If K is close to N, then both are O(N log N). If K is small, heap is better.
 *
 * @param nums The input array of integers.
 * @param k The number of most frequent elements to return.
 * @returns An array containing the k most frequent elements.
 */
export function topKFrequentSort(nums: number[], k: number): number[] {
    if (!nums || nums.length === 0 || k <= 0) {
        return [];
    }

    // Step 1: Count frequencies
    const frequencyMap = new Map<number, number>();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Step 2 & 3: Convert to array of [element, frequency] pairs and sort by frequency (descending)
    const sortedFrequencies = Array.from(frequencyMap.entries()).sort((a, b) => b[1] - a[1]);

    // Step 4: Extract the top k elements
    const result: number[] = [];
    for (let i = 0; i < k && i < sortedFrequencies.length; i++) {
        result.push(sortedFrequencies[i][0]);
    }

    return result;
}
```