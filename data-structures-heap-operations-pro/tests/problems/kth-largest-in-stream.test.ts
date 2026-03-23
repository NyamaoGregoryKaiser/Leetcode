```typescript
/**
 * tests/problems/kth-largest-in-stream.test.ts
 * 
 * Test suite for the KthLargest class (Problem 1: Kth Largest Element in a Stream).
 * Verifies the correctness of the `add` method across various scenarios,
 * including edge cases and normal operation.
 */

import { KthLargest } from '../../src/problems/kth-largest-in-stream';

describe('KthLargest', () => {
    test('should return the correct Kth largest element after multiple additions (LeetCode example)', () => {
        const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
        expect(kthLargest.add(3)).toBe(4);   // Stream: [2,3,4,5,8], K=3 => 4
        expect(kthLargest.add(5)).toBe(5);   // Stream: [2,3,4,5,5,8], K=3 => 5
        expect(kthLargest.add(10)).toBe(5);  // Stream: [2,3,4,5,5,8,10], K=3 => 5
        expect(kthLargest.add(9)).toBe(8);   // Stream: [2,3,4,5,5,8,9,10], K=3 => 8
        expect(kthLargest.add(4)).toBe(8);   // Stream: [2,3,4,4,5,5,8,9,10], K=3 => 8
    });

    test('should handle k = 1', () => {
        const kthLargest = new KthLargest(1, []);
        expect(kthLargest.add(10)).toBe(10);
        expect(kthLargest.add(5)).toBe(10);
        expect(kthLargest.add(20)).toBe(20);
        expect(kthLargest.add(1)).toBe(20);
    });

    test('should handle initial array with less than k elements', () => {
        const kthLargest = new KthLargest(3, [1, 2]);
        expect(kthLargest.add(3)).toBe(1); // Heap: [1,2,3], k=3, min=1
        expect(kthLargest.add(4)).toBe(2); // Heap: [2,3,4], k=3, min=2
        expect(kthLargest.add(0)).toBe(2); // Heap: [2,3,4], k=3, min=2
    });

    test('should handle initial array with exactly k elements', () => {
        const kthLargest = new KthLargest(3, [7, 8, 9]);
        expect(kthLargest.add(1)).toBe(7); // Heap: [1,7,8,9] -> [7,8,9], k=3, min=7
        expect(kthLargest.add(10)).toBe(8); // Heap: [7,8,9,10] -> [8,9,10], k=3, min=8
    });

    test('should handle duplicate values correctly', () => {
        const kthLargest = new KthLargest(2, [3, 2]);
        expect(kthLargest.add(1)).toBe(2); // Heap: [1,2,3] -> [2,3], k=2, min=2
        expect(kthLargest.add(4)).toBe(3); // Heap: [2,3,4] -> [3,4], k=2, min=3
        expect(kthLargest.add(3)).toBe(3); // Heap: [3,3,4] -> [3,4], k=2, min=3
        expect(kthLargest.add(3)).toBe(3); // Heap: [3,3,3,4] -> [3,4], k=2, min=3
    });

    test('should work with negative numbers', () => {
        const kthLargest = new KthLargest(3, [-1, -2, -3]);
        expect(kthLargest.add(-4)).toBe(-3); // Heap: [-4,-3,-2,-1] -> [-3,-2,-1], k=3, min=-3
        expect(kthLargest.add(0)).toBe(-2);  // Heap: [-3,-2,-1,0] -> [-2,-1,0], k=3, min=-2
        expect(kthLargest.add(-1.5)).toBe(-2); // Heap: [-2,-1.5,-1,0] -> [-2,-1.5,0], k=3, min=-2
    });

    test('should return correct value even if new value is smaller than current k-th largest', () => {
        const kthLargest = new KthLargest(3, [10, 20, 30]); // k=3 largest are [10,20,30], 3rd largest is 10
        expect(kthLargest.add(5)).toBe(10); // 5 is smaller than 10, heap remains [10,20,30]. 3rd largest is 10.
        expect(kthLargest.add(15)).toBe(15); // 15 replaces 10. Heap is [15,20,30]. 3rd largest is 15.
    });

    test('should handle very large numbers for K and nums length (basic check)', () => {
        // This is a conceptual test due to performance considerations in unit tests.
        // Actual large scale testing would be done in benchmarks.
        const largeNums = Array.from({ length: 1000 }, (_, i) => i); // [0, 1, ..., 999]
        const k = 100;
        const kthLargest = new KthLargest(k, largeNums); // Kth largest should be 900 (999 - 100 + 1)
        expect(kthLargest.add(1000)).toBe(901); // Kth largest elements are 901...1000, so min is 901
        expect(kthLargest.add(-1)).toBe(901); // -1 is ignored
        expect(kthLargest.add(900)).toBe(900); // 900 replaces 901
    });
});
```