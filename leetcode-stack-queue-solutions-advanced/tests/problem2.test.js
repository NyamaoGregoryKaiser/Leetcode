/**
 * @file Test suite for the Implement Queue using Stacks problem.
 * @module tests/problem2.test
 */

const MyQueue = require('../src/problems/problem2-implement-queue-using-stacks/myQueue');

describe('MyQueue', () => {
    let queue;

    beforeEach(() => {
        queue = new MyQueue();
    });

    // Test case 1: Basic push and pop operations
    test('should correctly push and pop elements', () => {
        queue.push(1);
        queue.push(2);
        expect(queue.pop()).toBe(1); // 1st pushed should be 1st popped
        queue.push(3);
        expect(queue.pop()).toBe(2);
        expect(queue.pop()).toBe(3);
    });

    // Test case 2: Check if queue is empty
    test('should correctly report empty status', () => {
        expect(queue.empty()).toBe(true);
        queue.push(1);
        expect(queue.empty()).toBe(false);
        queue.pop();
        expect(queue.empty()).toBe(true);
    });

    // Test case 3: Peek at the front element
    test('should correctly peek at the front element', () => {
        queue.push(1);
        queue.push(2);
        expect(queue.peek()).toBe(1); // Peek should not remove the element
        expect(queue.pop()).toBe(1);
        expect(queue.peek()).toBe(2);
    });

    // Test case 4: Pop from an empty queue
    test('should return undefined when popping from an empty queue', () => {
        expect(queue.pop()).toBeUndefined();
    });

    // Test case 5: Peek from an empty queue
    test('should return undefined when peeking from an empty queue', () => {
        expect(queue.peek()).toBeUndefined();
    });

    // Test case 6: Interleaved push, pop, peek, empty operations
    test('should handle interleaved operations correctly', () => {
        expect(queue.empty()).toBe(true); // []
        queue.push(10); // [10]
        expect(queue.empty()).toBe(false);
        expect(queue.peek()).toBe(10); // [10]
        queue.push(20); // [10, 20]
        expect(queue.peek()).toBe(10); // [10, 20]
        expect(queue.pop()).toBe(10); // [20]
        expect(queue.peek()).toBe(20); // [20]
        queue.push(30); // [20, 30]
        expect(queue.pop()).toBe(20); // [30]
        expect(queue.pop()).toBe(30); // []
        expect(queue.empty()).toBe(true);
        expect(queue.pop()).toBeUndefined();
        expect(queue.peek()).toBeUndefined();
    });

    // Test case 7: Many pushes and pops
    test('should handle many pushes and pops correctly', () => {
        const numElements = 1000;
        for (let i = 0; i < numElements; i++) {
            queue.push(i);
        }
        expect(queue.empty()).toBe(false);
        expect(queue.peek()).toBe(0);

        for (let i = 0; i < numElements / 2; i++) {
            expect(queue.pop()).toBe(i);
        }
        expect(queue.peek()).toBe(numElements / 2);

        for (let i = numElements; i < numElements + 500; i++) {
            queue.push(i);
        }

        for (let i = numElements / 2; i < numElements + 500; i++) {
            expect(queue.pop()).toBe(i);
        }
        expect(queue.empty()).toBe(true);
    });

    // Test case 8: Pushing different data types (if supported by problem context, JS is flexible)
    test('should handle different data types', () => {
        queue.push("hello");
        queue.push(true);
        queue.push(null);
        expect(queue.pop()).toBe("hello");
        expect(queue.pop()).toBe(true);
        expect(queue.pop()).toBeNull();
    });
});