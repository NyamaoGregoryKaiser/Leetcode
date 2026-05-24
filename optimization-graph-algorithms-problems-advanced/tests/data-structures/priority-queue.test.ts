/**
 * tests/data-structures/priority-queue.test.ts
 * Tests for the PriorityQueue data structure.
 */

import { PriorityQueue } from '@data-structures/priority-queue';

describe('PriorityQueue', () => {
  let pq: PriorityQueue<string>;

  beforeEach(() => {
    pq = new PriorityQueue<string>();
  });

  test('should be empty initially', () => {
    expect(pq.isEmpty()).toBe(true);
    expect(pq.size()).toBe(0);
    expect(pq.peek()).toBeUndefined();
    expect(pq.dequeue()).toBeUndefined();
  });

  test('should enqueue items and maintain size', () => {
    pq.enqueue('taskA', 3);
    expect(pq.size()).toBe(1);
    pq.enqueue('taskB', 1);
    expect(pq.size()).toBe(2);
    pq.enqueue('taskC', 2);
    expect(pq.size()).toBe(3);
    expect(pq.isEmpty()).toBe(false);
  });

  test('should dequeue items in priority order (min-heap)', () => {
    pq.enqueue('taskA', 3);
    pq.enqueue('taskB', 1);
    pq.enqueue('taskC', 2);

    expect(pq.dequeue()?.value).toBe('taskB'); // Priority 1
    expect(pq.dequeue()?.value).toBe('taskC'); // Priority 2
    expect(pq.dequeue()?.value).toBe('taskA'); // Priority 3
    expect(pq.isEmpty()).toBe(true);
  });

  test('should handle equal priorities correctly (order by insertion for same priority is not guaranteed, but any is fine)', () => {
    pq.enqueue('taskA', 5);
    pq.enqueue('taskB', 1);
    pq.enqueue('taskC', 5);
    pq.enqueue('taskD', 2);

    expect(pq.dequeue()?.value).toBe('taskB'); // 1
    expect(pq.dequeue()?.value).toBe('taskD'); // 2
    // Either taskA or taskC can come next, as their priorities are equal
    const next1 = pq.dequeue()?.value;
    const next2 = pq.dequeue()?.value;
    expect([next1, next2]).toEqual(expect.arrayContaining(['taskA', 'taskC']));
    expect(pq.isEmpty()).toBe(true);
  });

  test('should peek at the highest priority item without removing it', () => {
    pq.enqueue('taskA', 3);
    pq.enqueue('taskB', 1);
    pq.enqueue('taskC', 2);

    expect(pq.peek()?.value).toBe('taskB');
    expect(pq.size()).toBe(3); // Should not change size
    expect(pq.peek()?.priority).toBe(1);
  });

  test('should handle mixed operations', () => {
    pq.enqueue('t1', 10);
    pq.enqueue('t2', 20);
    expect(pq.dequeue()?.value).toBe('t1'); // 10
    pq.enqueue('t3', 5);
    pq.enqueue('t4', 15);
    expect(pq.dequeue()?.value).toBe('t3'); // 5
    expect(pq.peek()?.value).toBe('t4'); // 15
    pq.enqueue('t5', 2);
    expect(pq.dequeue()?.value).toBe('t5'); // 2
    expect(pq.dequeue()?.value).toBe('t4'); // 15
    expect(pq.dequeue()?.value).toBe('t2'); // 20
    expect(pq.isEmpty()).toBe(true);
  });

  test('should work with different types of values', () => {
    const numPQ = new PriorityQueue<number>();
    numPQ.enqueue(100, 10);
    numPQ.enqueue(50, 5);
    numPQ.enqueue(200, 20);
    expect(numPQ.dequeue()?.value).toBe(50);
  });

  test('should work with a large number of items', () => {
    const numItems = 1000;
    for (let i = numItems; i > 0; i--) {
      pq.enqueue(`item${i}`, i);
    }
    expect(pq.size()).toBe(numItems);
    for (let i = 1; i <= numItems; i++) {
      expect(pq.dequeue()?.priority).toBe(i);
    }
    expect(pq.isEmpty()).toBe(true);
  });
});