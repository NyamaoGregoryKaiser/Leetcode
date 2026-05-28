```javascript
const Deque = require('../../src/data-structures/deque');

describe('Deque', () => {
    let deque;

    beforeEach(() => {
        deque = new Deque();
    });

    test('should be empty initially', () => {
        expect(deque.isEmpty()).toBe(true);
        expect(deque.size()).toBe(0);
        expect(deque.peekFront()).toBeUndefined();
        expect(deque.peekBack()).toBeUndefined();
        expect(deque.removeFront()).toBeUndefined();
        expect(deque.removeBack()).toBeUndefined();
    });

    // --- Add Front Tests ---
    test('should add elements to the front correctly', () => {
        deque.addFront(10);
        expect(deque.isEmpty()).toBe(false);
        expect(deque.size()).toBe(1);
        expect(deque.peekFront()).toBe(10);
        expect(deque.peekBack()).toBe(10);

        deque.addFront(20);
        expect(deque.size()).toBe(2);
        expect(deque.peekFront()).toBe(20); // New front
        expect(deque.peekBack()).toBe(10); // Old front is now back
    });

    // --- Add Back Tests ---
    test('should add elements to the back correctly', () => {
        deque.addBack(10);
        expect(deque.isEmpty()).toBe(false);
        expect(deque.size()).toBe(1);
        expect(deque.peekFront()).toBe(10);
        expect(deque.peekBack()).toBe(10);

        deque.addBack(20);
        expect(deque.size()).toBe(2);
        expect(deque.peekFront()).toBe(10); // Old front
        expect(deque.peekBack()).toBe(20); // New back
    });

    // --- Remove Front Tests ---
    test('should remove elements from the front correctly', () => {
        deque.addFront(10); // [10]
        deque.addBack(20); // [10, 20]
        deque.addFront(5); // [5, 10, 20]

        expect(deque.removeFront()).toBe(5);
        expect(deque.size()).toBe(2);
        expect(deque.peekFront()).toBe(10);

        expect(deque.removeFront()).toBe(10);
        expect(deque.size()).toBe(1);
        expect(deque.peekFront()).toBe(20);

        expect(deque.removeFront()).toBe(20);
        expect(deque.size()).toBe(0);
        expect(deque.isEmpty()).toBe(true);
        expect(deque.removeFront()).toBeUndefined();
    });

    // --- Remove Back Tests ---
    test('should remove elements from the back correctly', () => {
        deque.addFront(10); // [10]
        deque.addBack(20); // [10, 20]
        deque.addFront(5); // [5, 10, 20]

        expect(deque.removeBack()).toBe(20);
        expect(deque.size()).toBe(2);
        expect(deque.peekBack()).toBe(10);

        expect(deque.removeBack()).toBe(10);
        expect(deque.size()).toBe(1);
        expect(deque.peekBack()).toBe(5);

        expect(deque.removeBack()).toBe(5);
        expect(deque.size()).toBe(0);
        expect(deque.isEmpty()).toBe(true);
        expect(deque.removeBack()).toBeUndefined();
    });

    // --- Peek Tests ---
    test('should peek at front/back without removing', () => {
        deque.addFront(5); // [5]
        deque.addBack(15); // [5, 15]
        deque.addFront(1); // [1, 5, 15]

        expect(deque.peekFront()).toBe(1);
        expect(deque.peekBack()).toBe(15);
        expect(deque.size()).toBe(3); // Size should remain unchanged
    });

    // --- Mixed Operations Tests ---
    test('should handle mixed operations correctly', () => {
        deque.addBack(1); // [1]
        deque.addFront(2); // [2, 1]
        deque.addBack(3); // [2, 1, 3]
        expect(deque.peekFront()).toBe(2);
        expect(deque.peekBack()).toBe(3);

        expect(deque.removeFront()).toBe(2); // [1, 3]
        expect(deque.removeBack()).toBe(3); // [1]
        expect(deque.size()).toBe(1);
        expect(deque.peekFront()).toBe(1);
        expect(deque.peekBack()).toBe(1);

        deque.addBack(4); // [1, 4]
        deque.addFront(0); // [0, 1, 4]
        expect(deque.removeFront()).toBe(0); // [1, 4]
        expect(deque.removeFront()).toBe(1); // [4]
        expect(deque.removeBack()).toBe(4); // []
        expect(deque.isEmpty()).toBe(true);
    });

    // --- Clear Test ---
    test('should clear the deque', () => {
        deque.addFront(1);
        deque.addBack(2);
        expect(deque.size()).toBe(2);
        deque.clear();
        expect(deque.isEmpty()).toBe(true);
        expect(deque.size()).toBe(0);
        expect(deque.peekFront()).toBeUndefined();
        expect(deque.peekBack()).toBeUndefined();
    });

    // --- To Array / To String Test ---
    test('should convert to array and string correctly', () => {
        expect(deque.toArray()).toEqual([]);
        expect(deque.toString()).toBe('');

        deque.addBack(1);
        deque.addFront(0);
        deque.addBack(2); // [0, 1, 2]
        expect(deque.toArray()).toEqual([0, 1, 2]);
        expect(deque.toString()).toBe('0 <-> 1 <-> 2');

        deque.removeFront(); // [1, 2]
        expect(deque.toArray()).toEqual([1, 2]);
        expect(deque.toString()).toBe('1 <-> 2');
    });
});
```