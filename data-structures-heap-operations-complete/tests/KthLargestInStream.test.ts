import { KthLargestInStream } from '../src/algorithms/KthLargestInStream';

describe('KthLargestInStream', () => {
    // Test case 1: Example from problem description
    it('should pass the example test case', () => {
        const kthLargest = new KthLargestInStream(3, [4, 5, 8, 2]);
        expect(kthLargest.add(3)).toBe(4);    // stream: [2,3,4,5,8], 3rd largest is 4
        expect(kthLargest.add(5)).toBe(5);    // stream: [2,3,4,5,5,8], 3rd largest is 5
        expect(kthLargest.add(10)).toBe(5);   // stream: [2,3,4,5,5,8,10], 3rd largest is 5
        expect(kthLargest.add(9)).toBe(8);    // stream: [2,3,4,5,5,8,9,10], 3rd largest is 8
        expect(kthLargest.add(4)).toBe(8);    // stream: [2,3,4,4,5,5,8,9,10], 3rd largest is 8
    });

    // Test case 2: k = 1 (finding the largest element)
    it('should find the largest element when k = 1', () => {
        const kthLargest = new KthLargestInStream(1, []);
        expect(kthLargest.add(5)).toBe(5);
        expect(kthLargest.add(2)).toBe(5);
        expect(kthLargest.add(10)).toBe(10);
        expect(kthLargest.add(1)).toBe(10);
    });

    // Test case 3: Initial array has fewer than k elements
    it('should handle initial array with fewer than k elements', () => {
        const kthLargest = new KthLargestInStream(4, [3, 2]);
        expect(kthLargest.add(1)).toBe(1);    // heap: [1,2,3] (size 3)
        expect(kthLargest.add(4)).toBe(1);    // heap: [1,2,3,4] (size 4), 4th largest is 1
        expect(kthLargest.add(5)).toBe(2);    // heap: [2,3,4,5] (size 4), 4th largest is 2
        expect(kthLargest.add(0)).toBe(2);    // heap: [2,3,4,5] (size 4), 4th largest is 2
    });

    // Test case 4: Negative numbers
    it('should handle negative numbers correctly', () => {
        const kthLargest = new KthLargestInStream(2, [-5, -1, -10]);
        expect(kthLargest.add(-3)).toBe(-3);  // stream: [-10, -5, -3, -1], 2nd largest is -3
        expect(kthLargest.add(-2)).toBe(-2);  // stream: [-10, -5, -3, -2, -1], 2nd largest is -2
    });

    // Test case 5: All elements are the same
    it('should handle all elements being the same', () => {
        const kthLargest = new KthLargestInStream(2, [7, 7, 7]);
        expect(kthLargest.add(7)).toBe(7);
        expect(kthLargest.add(7)).toBe(7);
    });

    // Test case 6: Large stream of numbers
    it('should handle a large stream of numbers', () => {
        const initialNums = Array.from({ length: 100 }, (_, i) => i + 1); // 1..100
        const k = 10;
        const kthLargest = new KthLargestInStream(k, initialNums); // Heap has 91..100
        expect(kthLargest.add(0)).toBe(91); // 0 is smaller, heap unchanged
        expect(kthLargest.add(101)).toBe(92); // 101 pushes out 91, heap has 92..101
        expect(kthLargest.add(50)).toBe(92); // 50 is smaller, heap unchanged
        expect(kthLargest.add(95)).toBe(95); // Already in heap (or replaces itself effectively), still 92 if unique elements not strictly enforced
        expect(kthLargest.add(91)).toBe(92); // 91 is smaller than current min(92), so 92 should be returned
    });

    // Test case 7: k is invalid (non-positive)
    it('should throw an error if k is non-positive', () => {
        expect(() => new KthLargestInStream(0, [1, 2, 3])).toThrow("k must be a positive integer.");
        expect(() => new KthLargestInStream(-1, [1, 2, 3])).toThrow("k must be a positive integer.");
    });
});