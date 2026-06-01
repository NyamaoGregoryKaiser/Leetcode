```typescript
import { PriorityQueue } from '../../src/data-structures/PriorityQueue';

describe('PriorityQueue', () => {
    let pq: PriorityQueue<string>;

    beforeEach(() => {
        pq = new PriorityQueue<string>();
    });

    it('should be empty initially', () => {
        expect(pq.isEmpty()).toBe(true);
        expect(pq.size()).toBe(0);
        expect(pq.peek()).toBeUndefined();
        expect(pq.extractMin()).toBeUndefined();
    });

    it('should insert elements and maintain min-heap property', () => {
        pq.insert('Task C', 3);
        expect(pq.peek()?.value).toBe('Task C');
        expect(pq.peek()?.priority).toBe(3);

        pq.insert('Task A', 1);
        expect(pq.peek()?.value).toBe('Task A');
        expect(pq.peek()?.priority).toBe(1);

        pq.insert('Task B', 2);
        expect(pq.peek()?.value).toBe('Task A');
        expect(pq.peek()?.priority).toBe(1);

        expect(pq.size()).toBe(3);
    });

    it('should extract elements in order of priority (min first)', () => {
        pq.insert('Task E', 5);
        pq.insert('Task A', 1);
        pq.insert('Task C', 3);
        pq.insert('Task B', 2);
        pq.insert('Task D', 4);

        expect(pq.extractMin()?.value).toBe('Task A'); // P=1
        expect(pq.extractMin()?.value).toBe('Task B'); // P=2
        expect(pq.extractMin()?.value).toBe('Task C'); // P=3
        expect(pq.extractMin()?.value).toBe('Task D'); // P=4
        expect(pq.extractMin()?.value).toBe('Task E'); // P=5
        expect(pq.isEmpty()).toBe(true);
    });

    it('should handle elements with same priority', () => {
        pq.insert('Task A1', 1);
        pq.insert('Task A2', 1);
        pq.insert('Task B1', 2);

        const first = pq.extractMin();
        expect(first?.priority).toBe(1);
        // Order of same priority elements is not guaranteed, but one of them should be extracted.
        expect(['Task A1', 'Task A2']).toContain(first?.value);

        const second = pq.extractMin();
        expect(second?.priority).toBe(1);
        expect(['Task A1', 'Task A2']).toContain(second?.value);
        expect(second?.value).not.toBe(first?.value);

        expect(pq.extractMin()?.value).toBe('Task B1');
    });

    it('should peek without removing', () => {
        pq.insert('Task C', 3);
        pq.insert('Task A', 1);

        expect(pq.peek()?.value).toBe('Task A');
        expect(pq.size()).toBe(2);
        expect(pq.peek()?.value).toBe('Task A');
        expect(pq.size()).toBe(2);
    });

    it('should return undefined when extracting from an empty queue', () => {
        pq.insert('Task A', 1);
        pq.extractMin();
        expect(pq.extractMin()).toBeUndefined();
    });

    it('should handle a single element correctly', () => {
        pq.insert('Single Task', 10);
        expect(pq.size()).toBe(1);
        expect(pq.peek()?.value).toBe('Single Task');
        expect(pq.extractMin()?.value).toBe('Single Task');
        expect(pq.isEmpty()).toBe(true);
    });

    it('should work with different data types for value', () => {
        const numPQ = new PriorityQueue<number>();
        numPQ.insert(100, 10);
        numPQ.insert(50, 5);
        expect(numPQ.extractMin()?.value).toBe(50);
    });

    it('should handle large number of elements', () => {
        for (let i = 0; i < 1000; i++) {
            pq.insert(`Task ${i}`, Math.floor(Math.random() * 1000));
        }
        expect(pq.size()).toBe(1000);

        let prevPriority = -1;
        while (!pq.isEmpty()) {
            const extracted = pq.extractMin();
            expect(extracted!.priority).toBeGreaterThanOrEqual(prevPriority);
            prevPriority = extracted!.priority;
        }
        expect(pq.isEmpty()).toBe(true);
    });
});
```