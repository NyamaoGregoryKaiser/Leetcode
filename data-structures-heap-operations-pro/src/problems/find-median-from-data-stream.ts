```typescript
/**
 * src/problems/find-median-from-data-stream.ts
 * 
 * Problem: Find Median from Data Stream
 * LeetCode: 295
 * 
 * The median is the middle value in an ordered integer list. If the size of the list is even,
 * there is no single middle value and the median is the average of the two middle values.
 * 
 * Implement the MedianFinder class:
 * - `MedianFinder()` initializes the MedianFinder object.
 * - `void addNum(int num)` adds an integer `num` from the data stream to the data structure.
 * - `double findMedian()` returns the median of all elements so far. Answers within `10^-5` of the actual answer will be accepted.
 * 
 * Example:
 * MedianFinder mf = new MedianFinder();
 * mf.addNum(1);    // arr = [1]
 * mf.addNum(2);    // arr = [1, 2]
 * mf.findMedian(); // return 1.5
 * mf.addNum(3);    // arr = [1, 2, 3]
 * mf.findMedian(); // return 2.0
 */

import { MinHeap, MaxHeap } from '../data-structures/MinMaxHeap';

/**
 * MedianFinder class uses two heaps to efficiently find the median of a data stream.
 * 
 * Rationale:
 * We want to keep the data stream conceptually sorted to find the middle element(s).
 * Two heaps can achieve this in an optimized way:
 * 1. `maxHeap` (`smallerHalf`): Stores the smaller half of the numbers.
 *    - It's a MaxHeap because we want to quickly access the *largest* element in the smaller half (which is effectively the "pivot" or upper bound of the smaller half).
 * 2. `minHeap` (`largerHalf`): Stores the larger half of the numbers.
 *    - It's a MinHeap because we want to quickly access the *smallest* element in the larger half (which is the "pivot" or lower bound of the larger half).
 * 
 * Rules for maintaining balance:
 * - The `maxHeap` (smaller half) can have at most one more element than the `minHeap` (larger half).
 *   `maxHeap.size() === minHeap.size()` or `maxHeap.size() === minHeap.size() + 1`.
 * - All elements in `maxHeap` must be less than or equal to all elements in `minHeap`.
 *   `maxHeap.peek() <= minHeap.peek()`.
 * 
 * Adding a number (`addNum`):
 * 1. Insert the number into `maxHeap` first (or `minHeap`, but `maxHeap` is a good starting point for odd counts).
 * 2. Transfer the largest element from `maxHeap` to `minHeap` to ensure `maxHeap.peek() <= minHeap.peek()`.
 * 3. Balance the sizes: If `maxHeap` becomes too small (e.g., `maxHeap.size() < minHeap.size()`), move the smallest from `minHeap` back to `maxHeap`.
 *    This ensures the `smallerHalf` (maxHeap) always holds the potentially extra element for odd total counts.
 * 
 * Finding the median (`findMedian`):
 * - If total count is odd (`maxHeap.size() > minHeap.size()`), the median is simply `maxHeap.peek()`.
 * - If total count is even (`maxHeap.size() === minHeap.size()`), the median is the average of `maxHeap.peek()` and `minHeap.peek()`.
 */
export class MedianFinder {
    // MaxHeap to store the smaller half of numbers.
    // Its top element is the largest in the smaller half.
    private smallerHalf: MaxHeap<number>;
    // MinHeap to store the larger half of numbers.
    // Its top element is the smallest in the larger half.
    private largerHalf: MinHeap<number>;

    /**
     * Constructs a new MedianFinder.
     * Time Complexity: O(1)
     * Space Complexity: O(1) (for initialization)
     */
    constructor() {
        this.smallerHalf = new MaxHeap<number>(); // MaxHeap by default for numbers (b - a)
        this.largerHalf = new MinHeap<number>();  // MinHeap by default for numbers (a - b)
    }

    /**
     * Adds a number to the data structure.
     * @param num The number to add.
     * 
     * Time Complexity: O(log N) - where N is the total count of numbers added so far.
     *                  Each heap operation (insert, extract) is O(log H), where H is heap size.
     *                  Since H is approx N/2, it's O(log N).
     * Space Complexity: O(1) - modifies existing heaps. Total storage O(N).
     */
    addNum(num: number): void {
        // Step 1: Add the new number.
        // Always try to add to the smallerHalf first.
        this.smallerHalf.insert(num);

        // Step 2: Ensure all elements in smallerHalf <= all elements in largerHalf.
        // If the largest element in smallerHalf is greater than the smallest in largerHalf,
        // we need to move it. This also happens if smallerHalf.peek() is undefined when largerHalf exists.
        if (this.smallerHalf.peek() !== undefined && this.largerHalf.peek() !== undefined &&
            this.smallerHalf.peek()! > this.largerHalf.peek()!) {
            // Move largest from smallerHalf to largerHalf
            this.largerHalf.insert(this.smallerHalf.extractMax()!);
        }

        // Step 3: Balance the sizes of the heaps.
        // The smallerHalf (MaxHeap) should either have the same number of elements
        // as largerHalf (MinHeap) or one more. This handles odd total counts.
        if (this.smallerHalf.size() > this.largerHalf.size() + 1) {
            // Move largest from smallerHalf to largerHalf
            this.largerHalf.insert(this.smallerHalf.extractMax()!);
        } else if (this.largerHalf.size() > this.smallerHalf.size()) {
            // Move smallest from largerHalf to smallerHalf
            this.smallerHalf.insert(this.largerHalf.extractMin()!);
        }
    }

    /**
     * Returns the median of all numbers added so far.
     * 
     * Time Complexity: O(1) - Peeking at heap roots.
     * Space Complexity: O(1)
     */
    findMedian(): number {
        if (this.smallerHalf.isEmpty()) {
            return 0; // Or throw error, or handle as per problem spec (e.g., if no numbers added yet).
        }

        // If the total number of elements is odd, the median is the top of the smallerHalf (MaxHeap).
        if (this.smallerHalf.size() > this.largerHalf.size()) {
            return this.smallerHalf.peek()!;
        } else {
            // If the total number of elements is even, the median is the average of
            // the top of smallerHalf (MaxHeap) and the top of largerHalf (MinHeap).
            return (this.smallerHalf.peek()! + this.largerHalf.peek()!) / 2;
        }
    }
}

/*
// --- Alternative Approaches (for discussion, not implemented in full) ---

// 1. Sorted Array / List
//   - On `addNum`, insert the number into a sorted array/list, maintaining sorted order. O(N) for insertion (shift elements).
//   - On `findMedian`, directly access elements by index. O(1).
//   - Overall `addNum` dominates with O(N), making it inefficient for large streams.

// 2. Balanced Binary Search Tree (BST)
//   - On `addNum`, insert into a balanced BST (e.g., AVL tree, Red-Black tree). O(log N).
//   - On `findMedian`, traverse to find the k-th smallest element. If the BST nodes store subtree sizes, this can be O(log N).
//   - This approach is viable and has similar time complexity to two heaps but is generally more complex to implement from scratch.
//   - Two heaps are often preferred for this specific problem due to simpler implementation and constant time median access after insertion.
*/
```