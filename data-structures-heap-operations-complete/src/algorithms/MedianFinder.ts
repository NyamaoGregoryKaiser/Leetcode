import { MinHeap } from './MinHeap';
import { MaxHeap } from './MaxHeap';

/**
 * Problem: Find Median from Data Stream
 *
 * The median is the middle value in an ordered integer list. If the size of the list is even,
 * there is no single middle value, and the median is the average of the two middle values.
 *
 * Implement the `MedianFinder` class:
 * - `MedianFinder()`: Initializes the `MedianFinder` object.
 * - `void addNum(int num)`: Adds an integer `num` from the data stream to the data structure.
 * - `double findMedian()`: Returns the median of all elements so far. Answers within `10^-5`
 *                          of the actual answer will be accepted.
 *
 * Example:
 * MedianFinder mf = new MedianFinder();
 * mf.addNum(1);    // arr = [1]
 * mf.addNum(2);    // arr = [1, 2]
 * mf.findMedian(); // return 1.5
 * mf.addNum(3);    // arr = [1, 2, 3]
 * mf.findMedian(); // return 2.0
 */

/**
 * Finds the median of a data stream using two heaps.
 *
 * Approach:
 * We use two heaps to maintain the data stream in a balanced way:
 * 1. `maxHeapSmall`: A Max-Heap to store the smaller half of the numbers.
 *    The root of this heap will be the largest number in the smaller half.
 * 2. `minHeapLarge`: A Min-Heap to store the larger half of the numbers.
 *    The root of this heap will be the smallest number in the larger half.
 *
 * Invariant maintained:
 * - All elements in `maxHeapSmall` are less than or equal to all elements in `minHeapLarge`.
 * - The size difference between the two heaps is at most 1.
 *   - If `total_elements` is odd, `maxHeapSmall` will have one more element than `minHeapLarge`.
 *   - If `total_elements` is even, both heaps will have the same number of elements.
 *
 * `addNum(num)`:
 * 1. Add the number `num` to `maxHeapSmall`. This ensures that `maxHeapSmall` always tries to hold
 *    the smaller half of elements.
 * 2. To maintain the invariant that elements in `maxHeapSmall` are <= elements in `minHeapLarge`,
 *    transfer the largest element from `maxHeapSmall` (its root) to `minHeapLarge`.
 *    This effectively means `num` is now in `minHeapLarge` if it was large enough to be extracted
 *    from `maxHeapSmall` and moved.
 * 3. Re-balance the heap sizes: If `maxHeapSmall` has become smaller than `minHeapLarge`
 *    (this happens when `num` was very large and pushed its way through `maxHeapSmall` to `minHeapLarge`,
 *    making `minHeapLarge` bigger), move the smallest element from `minHeapLarge` (its root)
 *    back to `maxHeapSmall`.
 *    This ensures that `maxHeapSmall` always has `floor(N/2)` or `ceil(N/2)` elements.
 *
 * `findMedian()`:
 * - If the total number of elements is odd, the median is the root of `maxHeapSmall`
 *   (which has one more element).
 * - If the total number of elements is even, the median is the average of the root of `maxHeapSmall`
 *   and the root of `minHeapLarge`.
 *
 * Time Complexity:
 * - `addNum`: O(log N), where N is the total number of elements added so far.
 *   Each insertion/extraction operation on a heap takes O(log H) time, where H is heap size.
 *   Since H is roughly N/2, it's O(log N).
 * - `findMedian`: O(1) as it only involves peeking at the roots of the heaps.
 *
 * Space Complexity: O(N), where N is the total number of elements stored across both heaps.
 */
export class MedianFinder {
    private maxHeapSmall: MaxHeap<number>; // Stores smaller half of numbers, root is largest of small half
    private minHeapLarge: MinHeap<number>; // Stores larger half of numbers, root is smallest of large half

    constructor() {
        this.maxHeapSmall = new MaxHeap<number>();
        this.minHeapLarge = new MinHeap<number>();
    }

    /**
     * Adds an integer `num` to the data stream.
     * Time Complexity: O(log N)
     * @param num The number to add.
     */
    addNum(num: number): void {
        // Step 1: Add num to maxHeapSmall first
        // This ensures numbers go to the 'smaller' half initially.
        this.maxHeapSmall.insert(num);

        // Step 2: Balance the heaps - ensure maxHeapSmall.peek() <= minHeapLarge.peek()
        // Transfer the largest element from maxHeapSmall to minHeapLarge
        if (this.maxHeapSmall.size() > 0 && this.minHeapLarge.size() > 0 &&
            this.maxHeapSmall.peek()! > this.minHeapLarge.peek()!) {
            const val = this.maxHeapSmall.extractMax()!;
            this.minHeapLarge.insert(val);
        }

        // Step 3: Balance the heap sizes
        // Maintain the invariant: maxHeapSmall.size() == minHeapLarge.size() or maxHeapSmall.size() == minHeapLarge.size() + 1
        if (this.maxHeapSmall.size() > this.minHeapLarge.size() + 1) {
            const val = this.maxHeapSmall.extractMax()!;
            this.minHeapLarge.insert(val);
        } else if (this.minHeapLarge.size() > this.maxHeapSmall.size()) {
            const val = this.minHeapLarge.extractMin()!;
            this.maxHeapSmall.insert(val);
        }
    }

    /**
     * Returns the median of all elements so far.
     * Time Complexity: O(1)
     * @returns The median as a double.
     */
    findMedian(): number {
        if (this.maxHeapSmall.isEmpty()) {
            return 0; // Or throw an error, depending on problem spec for empty stream
        }

        if (this.maxHeapSmall.size() === this.minHeapLarge.size()) {
            // Even number of elements, median is average of two middle elements
            return (this.maxHeapSmall.peek()! + this.minHeapLarge.peek()!) / 2;
        } else {
            // Odd number of elements, median is the single middle element (from maxHeapSmall)
            return this.maxHeapSmall.peek()!;
        }
    }
}

/**
 * Alternative Approach: Naive Sorting (Brute Force)
 *
 * For each `addNum`, store the number in a list. For `findMedian`, sort the list
 * and calculate the median.
 *
 * Time Complexity:
 * - `addNum`: O(1) (list append)
 * - `findMedian`: O(N log N) (sorting the list), where N is current number of elements.
 *
 * Space Complexity: O(N)
 *
 * This approach is very inefficient for frequent `findMedian` calls on a growing stream.
 * The heap-based solution provides much better average and worst-case performance for `findMedian`.
 */
export class MedianFinder_Naive {
    private data: number[];

    constructor() {
        this.data = [];
    }

    addNum(num: number): void {
        this.data.push(num);
    }

    findMedian(): number {
        if (this.data.length === 0) {
            return 0; // Or handle as an error
        }

        // Sort the array to find median. This is the bottleneck.
        this.data.sort((a, b) => a - b);
        const n = this.data.length;
        if (n % 2 === 0) {
            // Even number of elements
            return (this.data[n / 2 - 1] + this.data[n / 2]) / 2;
        } else {
            // Odd number of elements
            return this.data[Math.floor(n / 2)];
        }
    }
}

/**
 * Alternative Approach 2: Insertion Sort (Still not optimal)
 *
 * For each `addNum`, insert the number into a sorted list using binary search to find the position.
 * `findMedian` would then be O(1).
 *
 * Time Complexity:
 * - `addNum`: O(N) (binary search for insertion point O(log N), but shifting elements O(N)).
 * - `findMedian`: O(1)
 *
 * Space Complexity: O(N)
 *
 * This is better than full sort every time but still worse than two heaps for `addNum`.
 * The two-heap approach is a more balanced solution for both operations.
 */
```

```typescript