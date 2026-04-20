```typescript
import { Heap } from '../../src/data-structures/Heap';
import { defaultCompare, reverseComparator } from '../../src/utils/comparator';

describe('Heap - Generic Implementation', () => {

    describe('Min-Heap (using defaultCompare)', () => {
        let minHeap: Heap<number>;

        beforeEach(() => {
            minHeap = Heap.createMinHeap<number>();
        });

        it('should be empty initially', () => {
            expect(minHeap.isEmpty()).toBe(true);
            expect(minHeap.size()).toBe(0);
            expect(minHeap.peek()).toBeUndefined();
            expect(minHeap.extract()).toBeUndefined();
        });

        it('should insert elements and maintain min-heap property', () => {
            minHeap.insert(10);
            expect(minHeap.peek()).toBe(10);
            expect(minHeap.size()).toBe(1);

            minHeap.insert(5);
            expect(minHeap.peek()).toBe(5);
            expect(minHeap.size()).toBe(2);

            minHeap.insert(20);
            expect(minHeap.peek()).toBe(5);
            expect(minHeap.size()).toBe(3);

            minHeap.insert(2);
            expect(minHeap.peek()).toBe(2);
            expect(minHeap.size()).toBe(4);
        });

        it('should extract elements in ascending order', () => {
            minHeap.insert(10);
            minHeap.insert(5);
            minHeap.insert(20);
            minHeap.insert(2);
            minHeap.insert(15);
            minHeap.insert(3);

            expect(minHeap.extract()).toBe(2);
            expect(minHeap.extract()).toBe(3);
            expect(minHeap.extract()).toBe(5);
            expect(minHeap.extract()).toBe(10);
            expect(minHeap.extract()).toBe(15);
            expect(minHeap.extract()).toBe(20);
            expect(minHeap.isEmpty()).toBe(true);
            expect(minHeap.extract()).toBeUndefined();
        });

        it('should handle duplicate values correctly', () => {
            minHeap.insert(5);
            minHeap.insert(2);
            minHeap.insert(5);
            minHeap.insert(1);

            expect(minHeap.extract()).toBe(1);
            expect(minHeap.extract()).toBe(2);
            expect(minHeap.extract()).toBe(5);
            expect(minHeap.extract()).toBe(5);
            expect(minHeap.isEmpty()).toBe(true);
        });

        it('should handle large number of elements', () => {
            const numElements = 10000;
            const elements = Array.from({ length: numElements }, (_, i) => Math.floor(Math.random() * numElements));
            for (const el of elements) {
                minHeap.insert(el);
            }
            expect(minHeap.size()).toBe(numElements);

            let prev = -Infinity;
            while (!minHeap.isEmpty()) {
                const current = minHeap.extract();
                expect(current).toBeGreaterThanOrEqual(prev);
                prev = current!;
            }
            expect(minHeap.isEmpty()).toBe(true);
        });
    });

    describe('Max-Heap (using reverseComparator)', () => {
        let maxHeap: Heap<number>;

        beforeEach(() => {
            maxHeap = Heap.createMaxHeap<number>();
        });

        it('should be empty initially', () => {
            expect(maxHeap.isEmpty()).toBe(true);
            expect(maxHeap.size()).toBe(0);
            expect(maxHeap.peek()).toBeUndefined();
            expect(maxHeap.extract()).toBeUndefined();
        });

        it('should insert elements and maintain max-heap property', () => {
            maxHeap.insert(10);
            expect(maxHeap.peek()).toBe(10);
            maxHeap.insert(5);
            expect(maxHeap.peek()).toBe(10);
            maxHeap.insert(20);
            expect(maxHeap.peek()).toBe(20);
            maxHeap.insert(2);
            expect(maxHeap.peek()).toBe(20);
        });

        it('should extract elements in descending order', () => {
            maxHeap.insert(10);
            maxHeap.insert(5);
            maxHeap.insert(20);
            maxHeap.insert(2);
            maxHeap.insert(15);
            maxHeap.insert(3);

            expect(maxHeap.extract()).toBe(20);
            expect(maxHeap.extract()).toBe(15);
            expect(maxHeap.extract()).toBe(10);
            expect(maxHeap.extract()).toBe(5);
            expect(maxHeap.extract()).toBe(3);
            expect(maxHeap.extract()).toBe(2);
            expect(maxHeap.isEmpty()).toBe(true);
        });

        it('should handle duplicate values correctly', () => {
            maxHeap.insert(5);
            maxHeap.insert(2);
            maxHeap.insert(5);
            maxHeap.insert(1);

            expect(maxHeap.extract()).toBe(5);
            expect(maxHeap.extract()).toBe(5);
            expect(maxHeap.extract()).toBe(2);
            expect(maxHeap.extract()).toBe(1);
            expect(maxHeap.isEmpty()).toBe(true);
        });

        it('should handle large number of elements', () => {
            const numElements = 10000;
            const elements = Array.from({ length: numElements }, (_, i) => Math.floor(Math.random() * numElements));
            for (const el of elements) {
                maxHeap.insert(el);
            }
            expect(maxHeap.size()).toBe(numElements);

            let prev = Infinity;
            while (!maxHeap.isEmpty()) {
                const current = maxHeap.extract();
                expect(current).toBeLessThanOrEqual(prev);
                prev = current!;
            }
            expect(maxHeap.isEmpty()).toBe(true);
        });
    });

    describe('Heap with custom object comparison', () => {
        type Item = { id: number, value: number };
        let minHeap: Heap<Item>;
        let maxHeap: Heap<Item>;

        const itemComparator = (a: Item, b: Item) => a.value - b.value;

        beforeEach(() => {
            minHeap = Heap.createMinHeap<Item>(itemComparator);
            maxHeap = Heap.createMaxHeap<Item>((a, b) => itemComparator(b, a)); // Reverse for max-heap
        });

        it('should work as a min-heap for custom objects', () => {
            minHeap.insert({ id: 1, value: 10 });
            minHeap.insert({ id: 2, value: 5 });
            minHeap.insert({ id: 3, value: 15 });

            expect(minHeap.peek()).toEqual({ id: 2, value: 5 });
            expect(minHeap.extract()).toEqual({ id: 2, value: 5 });
            expect(minHeap.peek()).toEqual({ id: 1, value: 10 });
            expect(minHeap.extract()).toEqual({ id: 1, value: 10 });
            expect(minHeap.extract()).toEqual({ id: 3, value: 15 });
            expect(minHeap.isEmpty()).toBe(true);
        });

        it('should work as a max-heap for custom objects', () => {
            maxHeap.insert({ id: 1, value: 10 });
            maxHeap.insert({ id: 2, value: 5 });
            maxHeap.insert({ id: 3, value: 15 });

            expect(maxHeap.peek()).toEqual({ id: 3, value: 15 });
            expect(maxHeap.extract()).toEqual({ id: 3, value: 15 });
            expect(maxHeap.peek()).toEqual({ id: 1, value: 10 });
            expect(maxHeap.extract()).toEqual({ id: 1, value: 10 });
            expect(maxHeap.extract()).toEqual({ id: 2, value: 5 });
            expect(maxHeap.isEmpty()).toBe(true);
        });
    });
});
```