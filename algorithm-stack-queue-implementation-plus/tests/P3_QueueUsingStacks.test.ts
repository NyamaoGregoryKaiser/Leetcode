```typescript
/**
 * @fileoverview Test suite for P3_QueueUsingStacks.ts
 */

import { MyQueue } from '../src/problems/P3_QueueUsingStacks';

describe('P3: MyQueue (Implement Queue using Stacks)', () => {
    let myQueue: MyQueue;

    beforeEach(() => {
        myQueue = new MyQueue();
    });

    test('should initialize as empty', () => {
        expect(myQueue.empty()).toBe(true);
    });

    test('should push elements correctly', () => {
        myQueue.push(1);
        expect(myQueue.empty()).toBe(false);
        myQueue.push(2);
        expect(myQueue.empty()).toBe(false);
    });

    test('should peek at the front element correctly', () => {
        myQueue.push(1);
        myQueue.push(2);
        expect(myQueue.peek()).toBe(1); // 1 should be at the front
        myQueue.push(3);
        expect(myQueue.peek()).toBe(1); // Still 1
    });

    test('should pop elements in FIFO order', () => {
        myQueue.push(1);
        myQueue.push(2);
        myQueue.push(3);

        expect(myQueue.pop()).toBe(1); // First in, first out
        expect(myQueue.peek()).toBe(2);
        expect(myQueue.pop()).toBe(2);
        expect(myQueue.peek()).toBe(3);
        expect(myQueue.pop()).toBe(3);
        expect(myQueue.empty()).toBe(true);
    });

    test('should handle alternating push and pop operations', () => {
        myQueue.push(1); // [1]
        expect(myQueue.pop()).toBe(1); // []
        expect(myQueue.empty()).toBe(true);

        myQueue.push(2); // [2]
        myQueue.push(3); // [2,3]
        expect(myQueue.peek()).toBe(2); // [2,3]
        expect(myQueue.pop()).toBe(2); // [3]
        expect(myQueue.empty()).toBe(false);

        myQueue.push(4); // [3,4]
        expect(myQueue.pop()).toBe(3); // [4]
        expect(myQueue.pop()).toBe(4); // []
        expect(myQueue.empty()).toBe(true);
    });

    test('should handle multiple pushes before any pops', () => {
        myQueue.push(10);
        myQueue.push(20);
        myQueue.push(30);
        myQueue.push(40);

        expect(myQueue.peek()).toBe(10);
        expect(myQueue.pop()).toBe(10);
        expect(myQueue.pop()).toBe(20);
        expect(myQueue.peek()).toBe(30);
        expect(myQueue.pop()).toBe(30);
        expect(myQueue.pop()).toBe(40);
        expect(myQueue.empty()).toBe(true);
    });

    test('should handle popping until empty', () => {
        myQueue.push(5);
        expect(myQueue.pop()).toBe(5);
        expect(myQueue.empty()).toBe(true);
        expect(myQueue.peek()).toBeUndefined(); // Should return undefined for empty queue
        expect(myQueue.pop()).toBeUndefined();  // Should return undefined for empty queue
    });

    test('should handle subsequent pushes after becoming empty', () => {
        myQueue.push(1);
        myQueue.pop(); // Empty
        expect(myQueue.empty()).toBe(true);

        myQueue.push(100);
        expect(myQueue.empty()).toBe(false);
        expect(myQueue.peek()).toBe(100);
        expect(myQueue.pop()).toBe(100);
        expect(myQueue.empty()).toBe(true);
    });

    test('LeetCode example test case', () => {
        myQueue.push(1);
        myQueue.push(2);
        expect(myQueue.peek()).toBe(1);
        expect(myQueue.pop()).toBe(1);
        expect(myQueue.empty()).toBe(false);
    });
});
```