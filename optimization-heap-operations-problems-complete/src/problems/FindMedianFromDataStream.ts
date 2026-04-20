```typescript
import { Heap } from '../data-structures/Heap';
import { defaultCompare, reverseComparator } from '../utils/comparator';

/**
 * Implements a data structure that efficiently finds the median from a data stream.
 *
 * This problem is optimally solved using two heaps:
 * 1. `maxHeap`: A Max-Heap that stores the smaller half of the numbers.
 *    The largest element in this heap (its root) is the largest among the smaller half.
 * 2. `minHeap`: A Min-Heap that stores the larger half of the numbers.
 *    The smallest element in this heap (its root) is the smallest among the larger half.
 *
 * Invariant:
 * - `maxHeap.peek()` <= `minHeap.peek()` (if both are not empty)
 * - The size difference between `maxHeap` and `minHeap` is at most 1.
 *   This ensures that the median can be found quickly from their roots.
 */
export class MedianFinder {
    private maxHeap: Heap<number>; // Stores the smaller half of numbers (Max-Heap)
    private minHeap: Heap<number>; // Stores the larger half of numbers (Min-Heap)

    constructor() {
        // Max-Heap: comparator(b, a) for defaultCompare(a, b) means it sorts b-a, so largest is at top.
        this.maxHeap = Heap.createMaxHeap<number>();
        // Min-Heap: defaultCompare(a, b) means it sorts a-b, so smallest is at top.
        this.minHeap = Heap.createMinHeap<number>();
    }

    /**
     * Adds a new number to the data structure.
     *
     * Algorithm:
     * 1. Add the number to `maxHeap` first (assuming it's part of the smaller half).
     * 2. Rebalance:
     *    a. If `maxHeap.peek()` is greater than `minHeap.peek()` (violation of invariant),
     *       move `maxHeap.extract()` to `minHeap.insert()`.
     *    b. Ensure size balance: If `maxHeap` has more than one extra element than `minHeap`,
     *       move `maxHeap.extract()` to `minHeap.insert()`.
     *    c. Ensure size balance: If `minHeap` has more elements than `maxHeap`,
     *       move `minHeap.extract()` to `maxHeap.insert()`.
     *
     * This balancing logic ensures that:
     * - `maxHeap` contains elements `x <= y` for any `x` in `maxHeap` and `y` in `minHeap`.
     * - `maxHeap` always has either the same number of elements as `minHeap` or one more element.
     *   This helps in easily calculating the median.
     *
     * Time Complexity: O(log N), where N is the total number of elements added so far.
     *   - Each insertion involves at most two heap operations (insert, extract), each O(log N).
     * Space Complexity: O(N) to store all numbers across both heaps.
     *
     * @param num The number to add.
     */
    addNum(num: number): void {
        // Always try to add to maxHeap first, assuming it belongs to the smaller half.
        this.maxHeap.insert(num);

        // Balance step 1: Ensure maxHeap's largest element is not greater than minHeap's smallest.
        // If maxHeap's root is greater than minHeap's root, it means an element that should be in minHeap is in maxHeap.
        if (!this.minHeap.isEmpty() && !this.maxHeap.isEmpty() &&
            this.maxHeap.peek()! > this.minHeap.peek()!) {
            this.minHeap.insert(this.maxHeap.extract()!);
        }

        // Balance step 2: Ensure size balance (maxHeap.size() == minHeap.size() or maxHeap.size() == minHeap.size() + 1)
        // If maxHeap becomes too large (more than 1 element larger than minHeap), move its largest to minHeap.
        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.insert(this.maxHeap.extract()!);
        }
        // If minHeap becomes larger than maxHeap, move its smallest to maxHeap.
        else if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.insert(this.minHeap.extract()!);
        }
    }

    /**
     * Finds the median of all numbers added so far.
     *
     * Algorithm:
     * - If the total number of elements is odd, the median is the root of the `maxHeap`
     *   (since `maxHeap` will have one more element than `minHeap`).
     * - If the total number of elements is even, the median is the average of the roots
     *   of `maxHeap` and `minHeap`.
     *
     * Time Complexity: O(1)
     *   - Peeking at the root of a heap is an O(1) operation.
     * Space Complexity: O(1) (excluding space for stored numbers).
     *
     * @returns The median of the numbers.
     */
    findMedian(): number {
        if (this.maxHeap.isEmpty()) {
            return 0; // Or throw an error, depending on requirements for an empty stream
        }

        if (this.maxHeap.size() === this.minHeap.size()) {
            // Even number of elements, median is the average of the two middle elements
            return (this.maxHeap.peek()! + this.minHeap.peek()!) / 2;
        } else {
            // Odd number of elements, median is the single middle element (which is in maxHeap)
            return this.maxHeap.peek()!;
        }
    }
}
```