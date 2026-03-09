```javascript
/**
 * algorithms/sortingProblems.js
 *
 * This file contains implementations for specific coding interview problems
 * that heavily involve sorting concepts or can be optimally solved using them.
 * Each problem includes:
 * - Problem description.
 * - Multiple approaches (brute-force, optimized).
 * - Detailed comments explaining logic.
 * - Time and Space Complexity analysis for each approach.
 * - Handling of edge cases.
 */

const { swap, getComparator } = require('../utils/sorterUtils');

/**
 * Problem 1: Kth Largest Element in an Array
 *
 * Description:
 *   Given an integer array `nums` and an integer `k`, return the kth largest element in the array.
 *   Note that it is the kth largest element in the sorted order, not the kth distinct element.
 *
 * Example:
 *   Input: nums = [3,2,1,5,6,4], k = 2
 *   Output: 5 (The sorted array is [1,2,3,4,5,6], the 2nd largest is 5)
 *
 *   Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 *   Output: 4 (The sorted array is [1,2,2,3,3,4,5,5,6], the 4th largest is 4)
 */

/**
 * Approach 1.1: Kth Largest Element - Brute Force (Sort and Pick)
 *
 * Logic:
 *   The simplest approach is to sort the entire array and then pick the element
 *   at the `(n - k)`th index (for 0-based indexing) or `k`th element from the end.
 *
 * Time Complexity:
 *   - O(N log N) dominated by the sorting algorithm (e.g., Quick Sort or Merge Sort).
 *   - O(1) after sorting for picking the element.
 *
 * Space Complexity:
 *   - O(log N) to O(N) depending on the sort implementation (in-place Quick Sort vs. Merge Sort).
 *
 * @param {Array<number>} nums The input array of integers.
 * @param {number} k The 'k' for the kth largest element.
 * @returns {number} The kth largest element.
 */
function findKthLargest_BruteForce(nums, k) {
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        throw new Error("Invalid input: nums array is empty, k is out of bounds, or k is non-positive.");
    }

    // Sort the array in ascending order
    // Using Array.prototype.sort() which is typically Timsort (hybrid) O(N log N)
    nums.sort((a, b) => a - b);

    // The kth largest element will be at index (length - k)
    return nums[nums.length - k];
}

/**
 * Approach 1.2: Kth Largest Element - Optimized (QuickSelect Algorithm)
 *
 * Logic:
 *   QuickSelect is a selection algorithm to find the k-th smallest (or largest) element
 *   in an unordered list. It is related to Quick Sort, but instead of sorting both sides
 *   of the partition, it only recurses into the side where the desired element is located.
 *   This reduces the average time complexity from O(N log N) to O(N).
 *
 * Time Complexity:
 *   - Worst Case: O(N^2) (if pivot selection consistently leads to unbalanced partitions, similar to Quick Sort worst case).
 *   - Average Case: O(N)
 *
 * Space Complexity:
 *   - O(log N) average case (for recursion stack).
 *   - O(N) worst case (for recursion stack).
 *
 * @param {Array<number>} nums The input array of integers.
 * @param {number} k The 'k' for the kth largest element.
 * @returns {number} The kth largest element.
 */
function findKthLargest_QuickSelect(nums, k) {
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        throw new Error("Invalid input: nums array is empty, k is out of bounds, or k is non-positive.");
    }

    // We are looking for the kth largest element, which is equivalent to
    // the (n - k)th smallest element in a 0-indexed array.
    const targetIndex = nums.length - k;

    /**
     * Partitions the array around a pivot and returns the pivot's final index.
     * Elements less than pivot go to the left, greater go to the right.
     * This is a standard Lomuto partition scheme for QuickSort.
     * @param {number} left The starting index of the sub-array.
     * @param {number} right The ending index of the sub-array.
     * @returns {number} The final index of the pivot.
     */
    function partition(left, right) {
        // Choose a random pivot to mitigate worst-case performance
        const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
        const pivotValue = nums[pivotIndex];
        swap(nums, pivotIndex, right); // Move pivot to end

        let storeIndex = left;
        for (let i = left; i < right; i++) {
            if (nums[i] < pivotValue) {
                swap(nums, storeIndex, i);
                storeIndex++;
            }
        }
        swap(nums, right, storeIndex); // Move pivot to its final sorted position
        return storeIndex;
    }

    /**
     * Recursive function to find the kth smallest element using QuickSelect.
     * @param {number} left The left boundary of the current sub-array.
     * @param {number} right The right boundary of the current sub-array.
     * @returns {number} The element at targetIndex.
     */
    function quickSelect(left, right) {
        if (left === right) { // Base case: single element
            return nums[left];
        }

        const pivotFinalIndex = partition(left, right);

        if (targetIndex === pivotFinalIndex) {
            return nums[targetIndex];
        } else if (targetIndex < pivotFinalIndex) {
            return quickSelect(left, pivotFinalIndex - 1);
        } else {
            return quickSelect(pivotFinalIndex + 1, right);
        }
    }

    return quickSelect(0, nums.length - 1);
}

/**
 * Approach 1.3: Kth Largest Element - Using Min-Heap (Priority Queue)
 *
 * Logic:
 *   Maintain a min-heap of size `k`. Iterate through the array:
 *   - If the heap size is less than `k`, add the current element.
 *   - If the heap size is equal to `k` and the current element is greater than
 *     the smallest element in the heap (heap's root), remove the root and add
 *     the current element.
 *   After iterating through all elements, the root of the heap will be the
 *   kth largest element.
 *
 *   Note: Javascript does not have a built-in Heap/Priority Queue. A simple
 *   array-based min-heap is implemented here. For a real interview, you might
 *   discuss using a library or sketching the heap structure.
 *
 * Time Complexity:
 *   - O(N log K) because we iterate N elements, and each heap operation (insertion/deletion)
 *     takes O(log K) time for a heap of size K.
 *
 * Space Complexity:
 *   - O(K) for storing the min-heap.
 *
 * @param {Array<number>} nums The input array of integers.
 * @param {number} k The 'k' for the kth largest element.
 * @returns {number} The kth largest element.
 */
function findKthLargest_MinHeap(nums, k) {
    if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
        throw new Error("Invalid input: nums array is empty, k is out of bounds, or k is non-positive.");
    }

    // Simple MinHeap implementation using an array
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        push(val) {
            this.heap.push(val);
            this._bubbleUp(this.heap.length - 1);
        }

        pop() {
            if (this.heap.length === 0) return undefined;
            if (this.heap.length === 1) return this.heap.pop();

            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this._sinkDown(0);
            return min;
        }

        peek() {
            return this.heap.length > 0 ? this.heap[0] : undefined;
        }

        size() {
            return this.heap.length;
        }

        _bubbleUp(idx) {
            let parentIdx = Math.floor((idx - 1) / 2);
            while (idx > 0 && this.heap[idx] < this.heap[parentIdx]) {
                [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
                idx = parentIdx;
                parentIdx = Math.floor((idx - 1) / 2);
            }
        }

        _sinkDown(idx) {
            const leftChildIdx = 2 * idx + 1;
            const rightChildIdx = 2 * idx + 2;
            let smallestIdx = idx;
            const n = this.heap.length;

            if (leftChildIdx < n && this.heap[leftChildIdx] < this.heap[smallestIdx]) {
                smallestIdx = leftChildIdx;
            }
            if (rightChildIdx < n && this.heap[rightChildIdx] < this.heap[smallestIdx]) {
                smallestIdx = rightChildIdx;
            }

            if (smallestIdx !== idx) {
                [this.heap[idx], this.heap[smallestIdx]] = [this.heap[smallestIdx], this.heap[idx]];
                this._sinkDown(smallestIdx);
            }
        }
    }

    const minHeap = new MinHeap();

    for (const num of nums) {
        if (minHeap.size() < k) {
            minHeap.push(num);
        } else if (num > minHeap.peek()) {
            minHeap.pop();
            minHeap.push(num);
        }
    }

    return minHeap.peek();
}

/**
 * Problem 2: Merge Overlapping Intervals
 *
 * Description:
 *   Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all
 *   overlapping intervals, and return an array of the non-overlapping intervals
 *   that cover all the intervals in the input.
 *
 * Example:
 *   Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 *   Output: [[1,6],[8,10],[15,18]]
 *   Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
 *
 *   Input: intervals = [[1,4],[4,5]]
 *   Output: [[1,5]]
 *   Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 */

/**
 * Approach 2.1: Merge Overlapping Intervals - Optimal (Sort by Start Time)
 *
 * Logic:
 *   1. Sort the intervals based on their start times. This is the crucial step
 *      that makes the linear scan possible. If intervals are not sorted, you
 *      might miss overlaps.
 *   2. Initialize a `merged` list with the first interval.
 *   3. Iterate through the rest of the sorted intervals:
 *      a. Get the last interval in the `merged` list.
 *      b. If the current interval overlaps with the last merged interval
 *         (i.e., current_start <= last_merged_end), then merge them by
 *         updating the `last_merged_end` to `max(last_merged_end, current_end)`.
 *      c. If there is no overlap, add the current interval to the `merged` list.
 *
 * Time Complexity:
 *   - O(N log N) due to sorting the intervals.
 *   - O(N) for the single pass to merge.
 *   - Overall: O(N log N).
 *
 * Space Complexity:
 *   - O(N) for storing the `merged` list.
 *   - O(log N) to O(N) for sorting, depending on the sort implementation.
 *   - Overall: O(N).
 *
 * @param {Array<Array<number>>} intervals An array of intervals, where each interval is [start, end].
 * @returns {Array<Array<number>>} A new array with merged, non-overlapping intervals.
 */
function mergeIntervals_Optimal(intervals) {
    if (!intervals || intervals.length < 2) {
        return intervals; // No intervals to merge or only one interval
    }

    // 1. Sort intervals by their start times
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];
    merged.push(intervals[0]); // Add the first interval to the result

    // 2. Iterate through the rest of the intervals
    for (let i = 1; i < intervals.length; i++) {
        const lastMergedInterval = merged[merged.length - 1];
        const currentInterval = intervals[i];

        // Check for overlap: current interval starts before or at the end of the last merged interval
        if (currentInterval[0] <= lastMergedInterval[1]) {
            // Overlap detected, merge them:
            // Update the end of the last merged interval to be the maximum of the two ends.
            lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
        } else {
            // No overlap, add the current interval as a new, distinct interval
            merged.push(currentInterval);
        }
    }

    return merged;
}

/**
 * Problem 3: Wiggle Sort II
 *
 * Description:
 *   Given an integer array `nums`, reorder it such that `nums[0] < nums[1] > nums[2] < nums[3]...`.
 *   You may assume the input array always has a valid answer.
 *
 *   Constraints:
 *     - The length of `nums` is between 1 and 50000.
 *     - `0 <= nums[i] <= 5000`.
 *     - It's guaranteed that there will be an answer for the given test cases.
 *
 * Follow up:
 *   Can you do it in O(N) time complexity?
 *   Can you do it in O(1) extra space complexity?
 *
 * Example:
 *   Input: nums = [1,5,1,1,6,4]
 *   Output: [1,6,1,5,1,4] (or other valid answers like [1,4,1,5,1,6])
 *
 *   Input: nums = [1,3,2,2,3,1]
 *   Output: [2,3,1,3,1,2] (or other valid answers)
 */

/**
 * Approach 3.1: Wiggle Sort II - Optimized (Sort and Distribute)
 *
 * Logic:
 *   The core idea is that if the array is sorted, we can pick elements from
 *   the sorted array and place them into the wiggle pattern.
 *   To achieve `small < large > small < large ...`:
 *   1. Sort the array.
 *   2. Divide the sorted array into two halves (roughly).
 *   3. Place elements from the second half (larger elements) into odd indices,
 *      and elements from the first half (smaller elements) into even indices.
 *      To ensure `A[i] < A[i+1]` and `A[i+1] > A[i+2]`, we fill `... small, LARGE, small, LARGE ...`.
 *      Specifically, the largest elements go to `nums[1]`, `nums[3]`, `nums[5]`, etc.
 *      The smallest elements go to `nums[0]`, `nums[2]`, `nums[4]`, etc.
 *      To prevent equal elements from being adjacent in certain scenarios (e.g., [2,2,2,2]),
 *      we typically take elements from the *end* of the first half and *end* of the second half
 *      when placing into result. This spreads out equal elements.
 *
 *      Correct pattern: `S L S L S L`
 *      Indices:        `0 1 2 3 4 5`
 *      Small elements: `arr[mid-1], arr[mid-2], ... arr[0]` (reversed order)
 *      Large elements: `arr[N-1], arr[N-2], ... arr[mid]` (reversed order)
 *
 *      Place into `res[0] = small`, `res[1] = large`, `res[2] = small`, `res[3] = large`...
 *      This ensures `res[even] < res[odd]` and `res[odd] > res[even+2]`.
 *
 * Time Complexity:
 *   - O(N log N) due to sorting.
 *   - O(N) for distribution.
 *   - Overall: O(N log N).
 *
 * Space Complexity:
 *   - O(N) for the temporary `sorted` array and `result` array.
 *   - O(log N) to O(N) for the sort if it's not strictly in-place.
 *   - Overall: O(N).
 *
 * @param {Array<number>} nums The array to be wiggle-sorted. Modifies in-place.
 * @returns {void}
 */
function wiggleSortII_SortAndDistribute(nums) {
    if (!nums || nums.length < 2) {
        return;
    }

    const n = nums.length;
    // Create a copy and sort it to avoid modifying the array during iteration if not careful
    const sorted = [...nums].sort((a, b) => a - b);
    const result = new Array(n);

    // Calculate mid-point. For odd length, the smaller half has one more element.
    // E.g., N=5: mid = 2. Small elements: sorted[0], sorted[1], sorted[2]. Large: sorted[3], sorted[4]
    // N=6: mid = 3. Small elements: sorted[0], sorted[1], sorted[2]. Large: sorted[3], sorted[4], sorted[5]
    let smallHalfEnd = Math.floor((n - 1) / 2); // Index of the largest element in the smaller half
    let largeHalfEnd = n - 1; // Index of the largest element in the larger half

    // Fill the result array from right to left of both halves to spread out equal elements
    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) { // Even indices get smaller elements
            result[i] = sorted[smallHalfEnd--];
        } else { // Odd indices get larger elements
            result[i] = sorted[largeHalfEnd--];
        }
    }

    // Copy the result back to the original nums array
    for (let i = 0; i < n; i++) {
        nums[i] = result[i];
    }
}

/**
 * Problem 4: Sort Colors (Dutch National Flag Problem)
 *
 * Description:
 *   Given an array `nums` with n objects colored red, white, or blue, sort them
 *   in-place so that objects of the same color are adjacent, with the colors in the
 *   order red, white, and blue.
 *   We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
 *   You must solve this problem without using the library's sort function.
 *
 * Example:
 *   Input: nums = [2,0,2,1,1,0]
 *   Output: [0,0,1,1,2,2]
 *
 * Follow up:
 *   Could you come up with a one-pass algorithm using only O(1) constant extra space?
 */

/**
 * Approach 4.1: Sort Colors - Two-Pass Counting Sort (Brute Force/Simpler)
 *
 * Logic:
 *   1. Count the occurrences of 0s, 1s, and 2s.
 *   2. Overwrite the array with the counted number of 0s, then 1s, then 2s.
 *
 * Time Complexity:
 *   - O(N) for counting.
 *   - O(N) for overwriting.
 *   - Overall: O(N).
 *
 * Space Complexity:
 *   - O(1) for storing counts (fixed size 3 array).
 *
 * @param {Array<number>} nums The array of colors (0, 1, or 2) to be sorted. Modifies in-place.
 * @returns {void}
 */
function sortColors_TwoPass(nums) {
    if (!nums || nums.length < 2) {
        return;
    }

    let count0 = 0;
    let count1 = 0;
    let count2 = 0;

    // First pass: count occurrences
    for (const num of nums) {
        if (num === 0) {
            count0++;
        } else if (num === 1) {
            count1++;
        } else {
            count2++;
        }
    }

    // Second pass: overwrite array
    for (let i = 0; i < nums.length; i++) {
        if (i < count0) {
            nums[i] = 0;
        } else if (i < count0 + count1) {
            nums[i] = 1;
        } else {
            nums[i] = 2;
        }
    }
}

/**
 * Approach 4.2: Sort Colors - One-Pass (Dutch National Flag Algorithm)
 *
 * Logic:
 *   This algorithm uses three pointers: `low`, `mid`, and `high`.
 *   - `low` points to the last known 0. Elements before `low` are all 0s.
 *   - `high` points to the first known 2. Elements after `high` are all 2s.
 *   - `mid` iterates through the array, processing elements.
 *
 *   The invariant is:
 *   - `0` to `low-1`: all 0s
 *   - `low` to `mid-1`: all 1s
 *   - `mid` to `high`: unknown elements
 *   - `high+1` to `N-1`: all 2s
 *
 *   When `nums[mid]` is encountered:
 *   - If `nums[mid]` is 0: Swap `nums[mid]` with `nums[low]`, then increment both `low` and `mid`.
 *   - If `nums[mid]` is 1: Increment `mid`. The element is already in its correct "1s" section.
 *   - If `nums[mid]` is 2: Swap `nums[mid]` with `nums[high]`, then decrement `high`.
 *     Crucially, `mid` is NOT incremented in this case because the element swapped from `high`
 *     is unknown and needs to be processed.
 *
 * Time Complexity:
 *   - O(N) because each element is visited at most twice (once by `mid`, and once if swapped).
 *
 * Space Complexity:
 *   - O(1) auxiliary space (in-place sort).
 *
 * @param {Array<number>} nums The array of colors (0, 1, or 2) to be sorted. Modifies in-place.
 * @returns {void}
 */
function sortColors_OnePass(nums) {
    if (!nums || nums.length < 2) {
        return;
    }

    let low = 0; // Pointer for 0s
    let mid = 0; // Current element pointer
    let high = nums.length - 1; // Pointer for 2s

    while (mid <= high) {
        if (nums[mid] === 0) {
            swap(nums, low, mid);
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else { // nums[mid] === 2
            swap(nums, mid, high);
            high--;
            // Do NOT increment mid, as the element swapped from high
            // could be 0, 1, or 2 and needs to be re-evaluated.
        }
    }
}


/**
 * Problem 5: Find the Smallest K Numbers
 *
 * Description:
 *   Given an integer array `arr` and an integer `k`, return the `k` smallest numbers in the array.
 *   You can return the answer in any order.
 *
 * Example:
 *   Input: arr = [3,2,1], k = 2
 *   Output: [1,2] (or [2,1])
 *
 *   Input: arr = [0,1,2,1], k = 1
 *   Output: [0]
 */

/**
 * Approach 5.1: Smallest K Numbers - Brute Force (Sort and Slice)
 *
 * Logic:
 *   The most straightforward way is to sort the entire array in ascending order
 *   and then take the first `k` elements.
 *
 * Time Complexity:
 *   - O(N log N) for sorting.
 *   - O(K) for slicing.
 *   - Overall: O(N log N).
 *
 * Space Complexity:
 *   - O(N) for storing the sorted array (if `sort` creates a copy or due to Merge Sort).
 *   - O(K) for the result array.
 *   - Overall: O(N).
 *
 * @param {Array<number>} arr The input array of integers.
 * @param {number} k The number of smallest elements to find.
 * @returns {Array<number>} An array containing the k smallest numbers.
 */
function getSmallestKNumbers_BruteForce(arr, k) {
    if (!arr || arr.length === 0 || k === 0) {
        return [];
    }
    if (k >= arr.length) {
        return [...arr]; // If k is greater than or equal to array length, return all elements
    }

    // Sort the array in ascending order
    arr.sort((a, b) => a - b);

    // Return the first k elements
    return arr.slice(0, k);
}


/**
 * Approach 5.2: Smallest K Numbers - Optimized (Using Max-Heap / Priority Queue)
 *
 * Logic:
 *   To find the `k` smallest numbers, we can maintain a max-heap of size `k`.
 *   - Iterate through the array:
 *     - If the heap size is less than `k`, add the current element to the heap.
 *     - If the heap size is equal to `k` and the current element is *smaller* than
 *       the largest element in the heap (heap's root), remove the root (largest)
 *       and add the current element.
 *   After iterating through all elements, the heap will contain the `k` smallest
 *   elements.
 *
 *   Note: A simple array-based max-heap is implemented here.
 *
 * Time Complexity:
 *   - O(N log K) because we iterate N elements, and each heap operation (insertion/deletion)
 *     takes O(log K) time for a heap of size K.
 *
 * Space Complexity:
 *   - O(K) for storing the max-heap.
 *
 * @param {Array<number>} arr The input array of integers.
 * @param {number} k The number of smallest elements to find.
 * @returns {Array<number>} An array containing the k smallest numbers.
 */
function getSmallestKNumbers_MaxHeap(arr, k) {
    if (!arr || arr.length === 0 || k === 0) {
        return [];
    }
    if (k >= arr.length) {
        return [...arr]; // If k is greater than or equal to array length, return all elements
    }

    // Simple MaxHeap implementation using an array
    class MaxHeap {
        constructor() {
            this.heap = [];
        }

        push(val) {
            this.heap.push(val);
            this._bubbleUp(this.heap.length - 1);
        }

        pop() {
            if (this.heap.length === 0) return undefined;
            if (this.heap.length === 1) return this.heap.pop();

            const max = this.heap[0];
            this.heap[0] = this.heap.pop();
            this._sinkDown(0);
            return max;
        }

        peek() {
            return this.heap.length > 0 ? this.heap[0] : undefined;
        }

        size() {
            return this.heap.length;
        }

        _bubbleUp(idx) {
            let parentIdx = Math.floor((idx - 1) / 2);
            while (idx > 0 && this.heap[idx] > this.heap[parentIdx]) {
                [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
                idx = parentIdx;
                parentIdx = Math.floor((idx - 1) / 2);
            }
        }

        _sinkDown(idx) {
            const leftChildIdx = 2 * idx + 1;
            const rightChildIdx = 2 * idx + 2;
            let largestIdx = idx;
            const n = this.heap.length;

            if (leftChildIdx < n && this.heap[leftChildIdx] > this.heap[largestIdx]) {
                largestIdx = leftChildIdx;
            }
            if (rightChildIdx < n && this.heap[rightChildIdx] > this.heap[largestIdx]) {
                largestIdx = rightChildIdx;
            }

            if (largestIdx !== idx) {
                [this.heap[idx], this.heap[largestIdx]] = [this.heap[largestIdx], this.heap[idx]];
                this._sinkDown(largestIdx);
            }
        }
    }

    const maxHeap = new MaxHeap();

    for (const num of arr) {
        if (maxHeap.size() < k) {
            maxHeap.push(num);
        } else if (num < maxHeap.peek()) { // If current num is smaller than the largest in heap
            maxHeap.pop(); // Remove the largest
            maxHeap.push(num); // Add the smaller num
        }
    }

    return maxHeap.heap; // The heap now contains the k smallest elements
}


/**
 * Approach 5.3: Smallest K Numbers - QuickSelect (Partition-based selection)
 *
 * Logic:
 *   Similar to finding the Kth Largest, we can adapt QuickSelect to find the
 *   element that would be at index `k-1` if the array were sorted (i.e., the Kth smallest element).
 *   Once this pivot element is in its correct sorted position, all elements to its
 *   left are smaller than it. We then just collect all elements from index 0 up to
 *   and including the pivot's position.
 *
 * Time Complexity:
 *   - Worst Case: O(N^2) (poor pivot selection).
 *   - Average Case: O(N).
 *
 * Space Complexity:
 *   - O(log N) average for recursion stack.
 *   - O(N) worst for recursion stack.
 *   - O(K) for result.
 *   - Overall: O(N) worst case.
 *
 * @param {Array<number>} arr The input array of integers.
 * @param {number} k The number of smallest elements to find.
 * @returns {Array<number>} An array containing the k smallest numbers.
 */
function getSmallestKNumbers_QuickSelect(arr, k) {
    if (!arr || arr.length === 0 || k === 0) {
        return [];
    }
    if (k >= arr.length) {
        return [...arr]; // If k is greater than or equal to array length, return all elements
    }

    // We want to find the (k-1)-th smallest element (0-indexed)
    // After partitioning, this element will be at its final sorted position.
    const targetIndex = k - 1;

    /**
     * Partitions the array around a pivot.
     * @param {number} left The starting index.
     * @param {number} right The ending index.
     * @returns {number} The final index of the pivot.
     */
    function partition(left, right) {
        const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
        const pivotValue = arr[pivotIndex];
        swap(arr, pivotIndex, right); // Move pivot to end

        let storeIndex = left;
        for (let i = left; i < right; i++) {
            if (arr[i] < pivotValue) {
                swap(arr, storeIndex, i);
                storeIndex++;
            }
        }
        swap(arr, right, storeIndex); // Move pivot to its final sorted position
        return storeIndex;
    }

    /**
     * Recursive function for QuickSelect.
     * @param {number} left The left boundary.
     * @param {number} right The right boundary.
     */
    function quickSelect(left, right) {
        if (left === right) { // Base case: single element
            return;
        }

        const pivotFinalIndex = partition(left, right);

        if (targetIndex === pivotFinalIndex) {
            return; // Found the k-th smallest element at its correct position
        } else if (targetIndex < pivotFinalIndex) {
            quickSelect(left, pivotFinalIndex - 1);
        } else {
            quickSelect(pivotFinalIndex + 1, right);
        }
    }

    quickSelect(0, arr.length - 1);

    // After quickSelect, the first k elements (up to targetIndex) are the smallest k.
    // They might not be fully sorted among themselves, but all of them are smaller
    // than any element from index k to the end.
    return arr.slice(0, k);
}


module.exports = {
    findKthLargest_BruteForce,
    findKthLargest_QuickSelect,
    findKthLargest_MinHeap,
    mergeIntervals_Optimal,
    wiggleSortII_SortAndDistribute,
    sortColors_TwoPass,
    sortColors_OnePass,
    getSmallestKNumbers_BruteForce,
    getSmallestKNumbers_MaxHeap,
    getSmallestKNumbers_QuickSelect
};
```