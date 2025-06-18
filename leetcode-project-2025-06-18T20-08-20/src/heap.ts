```typescript
// src/heap.ts
class MinHeap {
  heap: number[];

  constructor() {
    this.heap = [];
  }

  // ... (Implementation of heapifyUp, heapifyDown, insert, extractMin, etc.)
  insert(value: number): void {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }


  extractMin(): number | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!; // replace with last element
    this.heapifyDown(0);
    return min;
  }

  private heapifyUp(index: number): void {
    // ... (Implementation)
  }
  private heapifyDown(index: number): void {
    // ... (Implementation)
  }


  // Add peek, size, isEmpty, etc., as needed.
}


// Example usage and problem solutions would go here.  For instance, a solution to "Find Kth Largest Element" might look like this:

function findKthLargest(nums: number[], k: number): number {
  const minHeap = new MinHeap();
  for (const num of nums) {
    minHeap.insert(num);
    if (minHeap.heap.length > k) {
      minHeap.extractMin();
    }
  }
  return minHeap.heap[0]; //Min-heap will have the kth largest at the top
}



// ... (Implement other problem solutions here: Heap Sort, Merge K Sorted Lists, Top K Frequent Elements)

export { MinHeap, findKthLargest }; //Export relevant functions

```