```javascript
const Queue = require('../../src/data-structures/queue');

describe('Queue', () => {
    let queue;

    beforeEach(() => {
        queue = new Queue();
    });

    test('should be empty initially', () => {
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
        expect(queue.peek()).toBeUndefined();
        expect(queue.dequeue()).toBeUndefined();
    });

    test('should enqueue elements correctly', () => {
        queue.enqueue(10);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.size()).toBe(1);
        expect(queue.peek()).toBe(10); // 10 is at front

        queue.enqueue(20);
        expect(queue.size()).toBe(2);
        expect(queue.peek()).toBe(10); // 10 is still at front
    });

    test('should dequeue elements correctly (FIFO)', () => {
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);

        expect(queue.dequeue()).toBe(10);
        expect(queue.size()).toBe(2);
        expect(queue.peek()).toBe(20);

        expect(queue.dequeue()).toBe(20);
        expect(queue.size()).toBe(1);
        expect(queue.peek()).toBe(30);

        expect(queue.dequeue()).toBe(30);
        expect(queue.size()).toBe(0);
        expect(queue.isEmpty()).toBe(true);
        expect(queue.dequeue()).toBeUndefined(); // Should return undefined when empty
    });

    test('should peek at the front element without removing it', () => {
        queue.enqueue('a');
        queue.enqueue('b');

        expect(queue.peek()).toBe('a');
        expect(queue.size()).toBe(2); // Should not change size

        queue.dequeue();
        expect(queue.peek()).toBe('b');
        expect(queue.size()).toBe(1);
    });

    test('should handle mixed operations', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.dequeue()).toBe(1);
        queue.enqueue(3);
        expect(queue.peek()).toBe(2);
        expect(queue.dequeue()).toBe(2);
        expect(queue.dequeue()).toBe(3);
        expect(queue.isEmpty()).toBe(true);
    });

    test('should clear the queue', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.size()).toBe(2);
        queue.clear();
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
        expect(queue.peek()).toBeUndefined();
    });

    test('should convert to string correctly', () => {
        expect(queue.toString()).toBe('');
        queue.enqueue(1);
        expect(queue.toString()).toBe('1');
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.toString()).toBe('1 <- 2 <- 3');
    });

    test('should convert to array correctly', () => {
        expect(queue.toArray()).toEqual([]);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.toArray()).toEqual([1, 2, 3]);

        const arr = queue.toArray();
        arr.push(4); // Modify the array copy
        expect(queue.size()).toBe(3); // Original queue should be unchanged
    });
});
```