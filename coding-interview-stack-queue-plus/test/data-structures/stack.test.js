```javascript
const Stack = require('../../src/data-structures/stack');

describe('Stack', () => {
    let stack;

    beforeEach(() => {
        stack = new Stack();
    });

    test('should be empty initially', () => {
        expect(stack.isEmpty()).toBe(true);
        expect(stack.size()).toBe(0);
        expect(stack.peek()).toBeUndefined();
        expect(stack.pop()).toBeUndefined();
    });

    test('should push elements correctly', () => {
        stack.push(10);
        expect(stack.isEmpty()).toBe(false);
        expect(stack.size()).toBe(1);
        expect(stack.peek()).toBe(10);

        stack.push(20);
        expect(stack.size()).toBe(2);
        expect(stack.peek()).toBe(20); // 20 is on top
    });

    test('should pop elements correctly (LIFO)', () => {
        stack.push(10);
        stack.push(20);
        stack.push(30);

        expect(stack.pop()).toBe(30);
        expect(stack.size()).toBe(2);
        expect(stack.peek()).toBe(20);

        expect(stack.pop()).toBe(20);
        expect(stack.size()).toBe(1);
        expect(stack.peek()).toBe(10);

        expect(stack.pop()).toBe(10);
        expect(stack.size()).toBe(0);
        expect(stack.isEmpty()).toBe(true);
        expect(stack.pop()).toBeUndefined(); // Should return undefined when empty
    });

    test('should peek at the top element without removing it', () => {
        stack.push('a');
        stack.push('b');

        expect(stack.peek()).toBe('b');
        expect(stack.size()).toBe(2); // Should not change size

        stack.pop();
        expect(stack.peek()).toBe('a');
        expect(stack.size()).toBe(1);
    });

    test('should handle mixed operations', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.pop()).toBe(2);
        stack.push(3);
        expect(stack.peek()).toBe(3);
        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(1);
        expect(stack.isEmpty()).toBe(true);
    });

    test('should clear the stack', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.size()).toBe(2);
        stack.clear();
        expect(stack.isEmpty()).toBe(true);
        expect(stack.size()).toBe(0);
        expect(stack.peek()).toBeUndefined();
    });

    test('should convert to string correctly', () => {
        expect(stack.toString()).toBe('');
        stack.push(1);
        expect(stack.toString()).toBe('1');
        stack.push(2);
        stack.push(3);
        expect(stack.toString()).toBe('1 -> 2 -> 3');
    });

    test('should convert to array correctly', () => {
        expect(stack.toArray()).toEqual([]);
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.toArray()).toEqual([1, 2, 3]);

        const arr = stack.toArray();
        arr.push(4); // Modify the array copy
        expect(stack.size()).toBe(3); // Original stack should be unchanged
    });
});
```