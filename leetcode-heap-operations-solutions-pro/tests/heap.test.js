```javascript
/**
 * heap.test.js
 *
 * Jest test suite for the MinHeap and MaxHeap implementations.
 */

const MinHeap = require('../src/algorithms/minHeap');
const MaxHeap = require('../src/algorithms/maxHeap');

describe('MinHeap', () => {
    let minHeap;

    beforeEach(() => {
        minHeap = new MinHeap();
    });

    test('should be empty initially', () => {
        expect(minHeap.isEmpty()).toBe(true);
        expect(minHeap.size()).toBe(0);
        expect(minHeap.peekMin()).toBeUndefined();
        expect(minHeap.extractMin()).toBeUndefined();
    });

    test('should insert elements and maintain min-heap property', () => {
        minHeap.insert(10);
        expect(minHeap.peekMin()).toBe(10);
        expect(minHeap.size()).toBe(1);

        minHeap.insert(5);
        expect(minHeap.peekMin()).toBe(5);
        expect(minHeap.size()).toBe(2);

        minHeap.insert(15);
        expect(minHeap.peekMin()).toBe(5);
        expect(minHeap.size()).toBe(3);

        minHeap.insert(3);
        expect(minHeap.peekMin()).toBe(3);
        expect(minHeap.size()).toBe(4);

        minHeap.insert(12);
        expect(minHeap.peekMin()).toBe(3);
        expect(minHeap.size()).toBe(5);
    });

    test('should extract minimum elements in order', () => {
        minHeap.insert(10);
        minHeap.insert(5);
        minHeap.insert(15);
        minHeap.insert(3);
        minHeap.insert(12);

        expect(minHeap.extractMin()).toBe(3);
        expect(minHeap.size()).toBe(4);
        expect(minHeap.peekMin()).toBe(5);

        expect(minHeap.extractMin()).toBe(5);
        expect(minHeap.size()).toBe(3);
        expect(minHeap.peekMin()).toBe(10);

        expect(minHeap.extractMin()).toBe(10);
        expect(minHeap.size()).toBe(2);
        expect(minHeap.peekMin()).toBe(12);

        expect(minHeap.extractMin()).toBe(12);
        expect(minHeap.size()).toBe(1);
        expect(minHeap.peekMin()).toBe(15);

        expect(minHeap.extractMin()).toBe(15);
        expect(minHeap.size()).toBe(0);
        expect(minHeap.isEmpty()).toBe(true);
        expect(minHeap.peekMin()).toBeUndefined();
    });

    test('should handle duplicate values correctly', () => {
        minHeap.insert(5);
        minHeap.insert(2);
        minHeap.insert(5);
        minHeap.insert(1);
        minHeap.insert(2);

        expect(minHeap.extractMin()).toBe(1);
        expect(minHeap.extractMin()).toBe(2);
        expect(minHeap.extractMin()).toBe(2);
        expect(minHeap.extractMin()).toBe(5);
        expect(minHeap.extractMin()).toBe(5);
        expect(minHeap.isEmpty()).toBe(true);
    });

    test('should handle large number of inserts and extracts', () => {
        const numbers = Array.from({ length: 1000 }, (_, i) => Math.floor(Math.random() * 10000));
        numbers.forEach(num => minHeap.insert(num));

        expect(minHeap.size()).toBe(1000);

        const extracted = [];
        while (!minHeap.isEmpty()) {
            extracted.push(minHeap.extractMin());
        }

        const sortedNumbers = [...numbers].sort((a, b) => a - b);
        expect(extracted).toEqual(sortedNumbers);
    });

    test('should correctly handle insertion and extraction of objects with a custom comparator', () => {
        // Our Heap class directly takes a comparator. Let's test with a custom object.
        // For MinHeap, we can wrap the object's property.
        // Note: The base MinHeap uses (a, b) => a < b directly. If we pass objects,
        // we'd need to create a custom Heap directly or modify MinHeap to take a prop.
        // For now, let's assume objects have a 'val' property.
        class ObjectMinHeap extends MinHeap {
            constructor() {
                super(); // Calls Heap constructor with (a, b) => a < b
                this.comparator = (objA, objB) => objA.val < objB.val; // Override comparator for objects
            }
        }
        const objMinHeap = new ObjectMinHeap();

        objMinHeap.insert({ id: 'a', val: 10 });
        objMinHeap.insert({ id: 'b', val: 5 });
        objMinHeap.insert({ id: 'c', val: 15 });
        objMinHeap.insert({ id: 'd', val: 3 });

        expect(objMinHeap.peekMin()).toEqual({ id: 'd', val: 3 });
        expect(objMinHeap.extractMin()).toEqual({ id: 'd', val: 3 });
        expect(objMinHeap.peekMin()).toEqual({ id: 'b', val: 5 });
        expect(objMinHeap.extractMin()).toEqual({ id: 'b', val: 5 });
        expect(objMinHeap.extractMin()).toEqual({ id: 'a', val: 10 });
        expect(objMinHeap.extractMin()).toEqual({ id: 'c', val: 15 });
        expect(objMinHeap.isEmpty()).toBe(true);
    });
});

describe('MaxHeap', () => {
    let maxHeap;

    beforeEach(() => {
        maxHeap = new MaxHeap();
    });

    test('should be empty initially', () => {
        expect(maxHeap.isEmpty()).toBe(true);
        expect(maxHeap.size()).toBe(0);
        expect(maxHeap.peekMax()).toBeUndefined();
        expect(maxHeap.extractMax()).toBeUndefined();
    });

    test('should insert elements and maintain max-heap property', () => {
        maxHeap.insert(10);
        expect(maxHeap.peekMax()).toBe(10);
        expect(maxHeap.size()).toBe(1);

        maxHeap.insert(15);
        expect(maxHeap.peekMax()).toBe(15);
        expect(maxHeap.size()).toBe(2);

        maxHeap.insert(5);
        expect(maxHeap.peekMax()).toBe(15);
        expect(maxHeap.size()).toBe(3);

        maxHeap.insert(20);
        expect(maxHeap.peekMax()).toBe(20);
        expect(maxHeap.size()).toBe(4);

        maxHeap.insert(12);
        expect(maxHeap.peekMax()).toBe(20);
        expect(maxHeap.size()).toBe(5);
    });

    test('should extract maximum elements in order', () => {
        maxHeap.insert(10);
        maxHeap.insert(15);
        maxHeap.insert(5);
        maxHeap.insert(20);
        maxHeap.insert(12);

        expect(maxHeap.extractMax()).toBe(20);
        expect(maxHeap.size()).toBe(4);
        expect(maxHeap.peekMax()).toBe(15);

        expect(maxHeap.extractMax()).toBe(15);
        expect(maxHeap.size()).toBe(3);
        expect(maxHeap.peekMax()).toBe(12);

        expect(maxHeap.extractMax()).toBe(12);
        expect(maxHeap.size()).toBe(2);
        expect(maxHeap.peekMax()).toBe(10);

        expect(maxHeap.extractMax()).toBe(10);
        expect(maxHeap.size()).toBe(1);
        expect(maxHeap.peekMax()).toBe(5);

        expect(maxHeap.extractMax()).toBe(5);
        expect(maxHeap.size()).toBe(0);
        expect(maxHeap.isEmpty()).toBe(true);
        expect(maxHeap.peekMax()).toBeUndefined();
    });

    test('should handle duplicate values correctly', () => {
        maxHeap.insert(5);
        maxHeap.insert(10);
        maxHeap.insert(5);
        maxHeap.insert(12);
        maxHeap.insert(10);

        expect(maxHeap.extractMax()).toBe(12);
        expect(maxHeap.extractMax()).toBe(10);
        expect(maxHeap.extractMax()).toBe(10);
        expect(maxHeap.extractMax()).toBe(5);
        expect(maxHeap.extractMax()).toBe(5);
        expect(maxHeap.isEmpty()).toBe(true);
    });

    test('should handle large number of inserts and extracts', () => {
        const numbers = Array.from({ length: 1000 }, (_, i) => Math.floor(Math.random() * 10000));
        numbers.forEach(num => maxHeap.insert(num));

        expect(maxHeap.size()).toBe(1000);

        const extracted = [];
        while (!maxHeap.isEmpty()) {
            extracted.push(maxHeap.extractMax());
        }

        const sortedNumbers = [...numbers].sort((a, b) => b - a);
        expect(extracted).toEqual(sortedNumbers);
    });

    test('should correctly handle insertion and extraction of objects with a custom comparator', () => {
        class ObjectMaxHeap extends MaxHeap {
            constructor() {
                super();
                this.comparator = (objA, objB) => objA.val > objB.val;
            }
        }
        const objMaxHeap = new ObjectMaxHeap();

        objMaxHeap.insert({ id: 'a', val: 10 });
        objMaxHeap.insert({ id: 'b', val: 5 });
        objMaxHeap.insert({ id: 'c', val: 15 });
        objMaxHeap.insert({ id: 'd', val: 20 });

        expect(objMaxHeap.peekMax()).toEqual({ id: 'd', val: 20 });
        expect(objMaxHeap.extractMax()).toEqual({ id: 'd', val: 20 });
        expect(objMaxHeap.peekMax()).toEqual({ id: 'c', val: 15 });
        expect(objMaxHeap.extractMax()).toEqual({ id: 'c', val: 15 });
        expect(objMaxHeap.extractMax()).toEqual({ id: 'a', val: 10 });
        expect(objMaxHeap.extractMax()).toEqual({ id: 'b', val: 5 });
        expect(objMaxHeap.isEmpty()).toBe(true);
    });
});
```