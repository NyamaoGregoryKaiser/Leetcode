```javascript
/**
 * streamMedian.js
 *
 * Problem: Find Median from Data Stream.
 *
 * Problem Description:
 * The median is the middle value in an ordered integer list. If the size of the list is even,
 * there is no single middle value, and the median is the average of the two middle values.
 * Implement the `MedianFinder` class:
 * - `MedianFinder()` initializes the `MedianFinder` object.
 * - `addNum(int num)` adds an integer `num` from the data stream to the data structure.
 * - `findMedian()` returns the median of all elements so far. Answers within 10^-5 of the actual answer will be accepted.
 *
 * Example:
 * MedianFinder mf = new MedianFinder();
 * mf.addNum(1); // arr = [1]
 * mf.addNum(2); // arr = [1, 2]
 * mf.findMedian(); // return 1.5 ((1 + 2) / 2)
 * mf.addNum(3); // arr = [1, 2, 3]
 * mf.findMedian(); // return 2.0 (middle element)
 */

const MinHeap = require('./minHeap');
const MaxHeap = require('./maxHeap');

/**
 * Implements a MedianFinder using two heaps: a Max-Heap and a Min-Heap.
 *
 * Approach:
 * We maintain two heaps:
 * 1. `maxHeapForSmallerHalf`: Stores the smaller half of the numbers. The root is the largest number in the smaller half.
 * 2. `minHeapForLargerHalf`: Stores the larger half of the numbers. The root is the smallest number in the larger half.
 *
 * This setup ensures that:
 * - All elements in `maxHeapForSmallerHalf` are less than or equal to all elements in `minHeapForLargerHalf`.
 * - The `maxHeapForSmallerHalf.peekMax()` gives us the largest element in the smaller half.
 * - The `minHeapForLargerHalf.peekMin()` gives us the smallest element in the larger half.
 *
 * Balancing the heaps:
 * We aim to keep the sizes of the two heaps balanced.
 * - `maxHeapForSmallerHalf.size()` can be equal to `minHeapForLargerHalf.size()`.
 * - OR `maxHeapForSmallerHalf.size()` can be `minHeapForLargerHalf.size() + 1`.
 *   (This ensures if there's an odd number of elements, the median is always in the max-heap's root).
 *
 * When `addNum(num)`:
 * 1. If `num` is less than or equal to `maxHeapForSmallerHalf.peekMax()` (or `maxHeap` is empty),
 *    insert `num` into `maxHeapForSmallerHalf`.
 * 2. Otherwise, insert `num` into `minHeapForLargerHalf`.
 * 3. Rebalance the heaps:
 *    - If `maxHeapForSmallerHalf.size()` > `minHeapForLargerHalf.size() + 1`:
 *      Move the root of `maxHeapForSmallerHalf` to `minHeapForLargerHalf`.
 *    - If `minHeapForLargerHalf.size()` > `maxHeapForSmallerHalf.size()`:
 *      Move the root of `minHeapForLargerHalf` to `maxHeapForSmallerHalf`.
 *
 * When `findMedian()`:
 * - If total number of elements is even: Median = (`maxHeapForSmallerHalf.peekMax()` + `minHeapForLargerHalf.peekMin()`) / 2.
 * - If total number of elements is odd: Median = `maxHeapForSmallerHalf.peekMax()`.
 *
 * Time Complexity:
 * - `addNum`: O(log N), where N is the number of elements added so far (heap insert/extract operations).
 * - `findMedian`: O(1) (just peeking at heap roots).
 * Space Complexity: O(N) to store all numbers in the heaps.
 */
class MedianFinder {
    constructor() {
        // Max-heap for the smaller half of numbers (stores elements <= median for odd counts)
        this.maxHeapForSmallerHalf = new MaxHeap();
        // Min-heap for the larger half of numbers (stores elements >= median for even counts)
        this.minHeapForLargerHalf = new MinHeap();
    }

    /**
     * Adds a number to the data structure.
     * @param {number} num - The number to add.
     * @returns {void}
     */
    addNum(num) {
        // Rule 1: Always try to add to maxHeapForSmallerHalf first, then balance
        // OR, compare with current medians.
        // A simpler way:
        // Always add to maxHeapForSmallerHalf.
        this.maxHeapForSmallerHalf.insert(num);
        // Then move its largest element to minHeapForLargerHalf to maintain sorted halves.
        this.minHeapForLargerHalf.insert(this.maxHeapForSmallerHalf.extractMax());

        // Now, balance the sizes:
        // If minHeapForLargerHalf becomes larger than maxHeapForSmallerHalf,
        // move its smallest element back to maxHeapForSmallerHalf.
        if (this.minHeapForLargerHalf.size() > this.maxHeapForSmallerHalf.size()) {
            this.maxHeapForSmallerHalf.insert(this.minHeapForLargerHalf.extractMin());
        }
    }

    /**
     * Returns the median of all elements added so far.
     * @returns {number} The median.
     */
    findMedian() {
        if (this.maxHeapForSmallerHalf.isEmpty()) {
            return 0; // Or throw an error, depending on requirements for empty stream
        }

        // If total elements are odd, the median is the root of the maxHeapForSmallerHalf
        if (this.maxHeapForSmallerHalf.size() > this.minHeapForLargerHalf.size()) {
            return this.maxHeapForSmallerHalf.peekMax();
        } else {
            // If total elements are even, the median is the average of the two roots
            return (this.maxHeapForSmallerHalf.peekMax() + this.minHeapForLargerHalf.peekMin()) / 2;
        }
    }
}

/**
 * Alternative Approach: Brute Force (Sorting Array)
 *
 * 1. Store all numbers in an array.
 * 2. When `addNum(num)` is called, push `num` to the array.
 * 3. When `findMedian()` is called, sort the array and find the median.
 *
 * Time Complexity:
 * - `addNum`: O(1) (array push).
 * - `findMedian`: O(N log N) (sorting the array of N elements).
 * Space Complexity: O(N) to store all numbers.
 *
 * This approach is very inefficient for frequent `findMedian` calls, as sorting occurs repeatedly.
 */
class MedianFinder_BruteForce {
    constructor() {
        this.nums = [];
    }

    addNum(num) {
        this.nums.push(num);
    }

    findMedian() {
        if (this.nums.length === 0) {
            return 0; // Or handle as error
        }

        // Must sort a copy, or the original array state changes
        const sortedNums = [...this.nums].sort((a, b) => a - b);
        const n = sortedNums.length;

        if (n % 2 === 1) {
            // Odd number of elements, median is the middle element
            return sortedNums[Math.floor(n / 2)];
        } else {
            // Even number of elements, median is the average of the two middle elements
            const mid1 = sortedNums[n / 2 - 1];
            const mid2 = sortedNums[n / 2];
            return (mid1 + mid2) / 2;
        }
    }
}


module.exports = {
    MedianFinder,
    MedianFinder_BruteForce // For comparison
};
```