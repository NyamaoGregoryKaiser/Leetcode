```typescript
// src/test/heap.test.ts
import { MinHeap, findKthLargest } from '../heap';

describe('MinHeap', () => {
  it('should insert and extract elements correctly', () => {
    const heap = new MinHeap();
    heap.insert(5);
    heap.insert(3);
    heap.insert(10);
    heap.insert(1);
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(3);
    // ... more assertions
  });
});

describe('findKthLargest', () => {
  it('should find the kth largest element correctly', () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
    expect(findKthLargest([3,2,3,1,2,4,5,5,6], 4)).toBe(4);
    // Add more test cases
  });
});

```