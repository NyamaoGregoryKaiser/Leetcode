```typescript
/**
 * @fileoverview Min-Priority Queue implementation using a binary heap.
 * This is essential for algorithms like Dijkstra's and Prim's.
 */

/**
 * Interface for elements stored in the Priority Queue.
 * Elements must have a 'priority' property, used for ordering.
 */
export interface Prioritizable {
  priority: number;
  [key: string]: any; // Allow other properties
}

/**
 * Implements a Min-Priority Queue using a binary heap.
 * The element with the lowest priority is always at the front.
 */
export class PriorityQueue<T extends Prioritizable> {
  private heap: T[];

  constructor() {
    this.heap = [];
  }

  /**
   * Returns the number of elements in the priority queue.
   * @returns {number} The size of the queue.
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Checks if the priority queue is empty.
   * @returns {boolean} True if empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Inserts an element into the priority queue.
   * The element is placed in its correct position to maintain the heap property.
   * @param {T} item - The element to insert.
   *
   * Time Complexity: O(log N) where N is the number of elements in the heap.
   * Space Complexity: O(1) for the operation itself, O(N) for storing the heap.
   */
  enqueue(item: T): void {
    this.heap.push(item);
    this.bubbleUp();
  }

  /**
   * Removes and returns the element with the highest priority (lowest priority value for min-heap).
   * @returns {T | undefined} The element with the lowest priority, or undefined if the queue is empty.
   *
   * Time Complexity: O(log N) where N is the number of elements in the heap.
   * Space Complexity: O(1) for the operation itself.
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    if (this.size() === 1) return this.heap.pop();

    // Swap the root with the last element
    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.sinkDown();
    return min;
  }

  /**
   * Returns the element with the highest priority (lowest priority value for min-heap) without removing it.
   * @returns {T | undefined} The element with the lowest priority, or undefined if the queue is empty.
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  peek(): T | undefined {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  /**
   * Helper function to maintain heap property after an insertion.
   * Bubbles up the last element to its correct position.
   */
  private bubbleUp(): void {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element.priority >= parent.priority) break; // Correct position found

      // Swap with parent
      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  /**
   * Helper function to maintain heap property after a removal (dequeue).
   * Sinks down the new root to its correct position.
   */
  private sinkDown(): void {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let leftChild: T | undefined, rightChild: T | undefined;
      let swapIndex: number | null = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.priority < element.priority) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === null && rightChild.priority < element.priority) ||
          (swapIndex !== null && rightChild.priority < leftChild!.priority)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break; // Correct position found

      // Swap
      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = element;
      index = swapIndex;
    }
  }
}
```