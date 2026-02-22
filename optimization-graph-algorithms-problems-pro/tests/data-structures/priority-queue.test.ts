```typescript
/**
 * @fileoverview Test suite for the PriorityQueue data structure (Min-Heap).
 */

import { PriorityQueue, Prioritizable } from '../../src/data-structures/priority-queue';

interface TestItem extends Prioritizable {
  value: string;
}

describe('PriorityQueue (Min-Heap)', () => {
  let pq: PriorityQueue<TestItem>;

  beforeEach(() => {
    pq = new PriorityQueue<TestItem>();
  });

  test('should be empty initially', () => {
    expect(pq.isEmpty()).toBe(true);
    expect(pq.size()).toBe(0);
    expect(pq.peek()).toBeUndefined();
    expect(pq.dequeue()).toBeUndefined();
  });

  test('should enqueue elements and maintain min-heap property', () => {
    pq.enqueue({ value: 'A', priority: 3 });
    expect(pq.peek()).toEqual({ value: 'A', priority: 3 });
    pq.enqueue({ value: 'B', priority: 1 });
    expect(pq.peek()).toEqual({ value: 'B', priority: 1 });
    pq.enqueue({ value: 'C', priority: 5 });
    expect(pq.peek()).toEqual({ value: 'B', priority: 1 });
    pq.enqueue({ value: 'D', priority: 2 });
    expect(pq.peek()).toEqual({ value: 'B', priority: 1 });

    expect(pq.size()).toBe(4);
  });

  test('should dequeue elements in priority order', () => {
    pq.enqueue({ value: 'A', priority: 3 });
    pq.enqueue({ value: 'B', priority: 1 });
    pq.enqueue({ value: 'C', priority: 5 });
    pq.enqueue({ value: 'D', priority: 2 });

    expect(pq.dequeue()).toEqual({ value: 'B', priority: 1 });
    expect(pq.size()).toBe(3);
    expect(pq.peek()).toEqual({ value: 'D', priority: 2 });

    expect(pq.dequeue()).toEqual({ value: 'D', priority: 2 });
    expect(pq.size()).toBe(2);
    expect(pq.peek()).toEqual({ value: 'A', priority: 3 });

    expect(pq.dequeue()).toEqual({ value: 'A', priority: 3 });
    expect(pq.size()).toBe(1);
    expect(pq.peek()).toEqual({ value: 'C', priority: 5 });

    expect(pq.dequeue()).toEqual({ value: 'C', priority: 5 });
    expect(pq.size()).toBe(0);
    expect(pq.isEmpty()).toBe(true);
    expect(pq.dequeue()).toBeUndefined();
  });

  test('should handle elements with same priority', () => {
    pq.enqueue({ value: 'A', priority: 5 });
    pq.enqueue({ value: 'B', priority: 2 });
    pq.enqueue({ value: 'C', priority: 5 });
    pq.enqueue({ value: 'D', priority: 1 });
    pq.enqueue({ value: 'E', priority: 2 });

    expect(pq.dequeue()).toEqual({ value: 'D', priority: 1 });
    expect(pq.dequeue()).toEqual({ value: 'B', priority: 2 }); // Order of B and E is not guaranteed, but one of them
    expect(pq.dequeue()).toEqual({ value: 'E', priority: 2 }); // The other one
    expect(pq.dequeue()).toEqual({ value: 'A', priority: 5 }); // Order of A and C is not guaranteed
    expect(pq.dequeue()).toEqual({ value: 'C', priority: 5 });
    expect(pq.isEmpty()).toBe(true);
  });

  test('should work with a single element', () => {
    pq.enqueue({ value: 'X', priority: 10 });
    expect(pq.size()).toBe(1);
    expect(pq.peek()).toEqual({ value: 'X', priority: 10 });
    expect(pq.dequeue()).toEqual({ value: 'X', priority: 10 });
    expect(pq.isEmpty()).toBe(true);
  });

  test('should work with larger number of elements', () => {
    const items = [
      { value: '1', priority: 10 },
      { value: '2', priority: 1 },
      { value: '3', priority: 5 },
      { value: '4', priority: 12 },
      { value: '5', priority: 3 },
      { value: '6', priority: 8 },
      { value: '7', priority: 2 },
      { value: '8', priority: 11 },
      { value: '9', priority: 7 },
      { value: '10', priority: 6 },
    ];

    items.forEach(item => pq.enqueue(item));
    expect(pq.size()).toBe(10);

    const sortedPriorities = items.map(item => item.priority).sort((a, b) => a - b);
    const dequeuedPriorities = [];

    while (!pq.isEmpty()) {
      dequeuedPriorities.push(pq.dequeue()!.priority);
    }

    expect(dequeuedPriorities).toEqual(sortedPriorities);
  });
});
```