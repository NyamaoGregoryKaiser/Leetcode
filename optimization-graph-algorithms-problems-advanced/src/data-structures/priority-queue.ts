/**
 * src/data-structures/priority-queue.ts
 * Implements a Min-Priority Queue using a binary heap.
 * Crucial for algorithms like Dijkstra's.
 */

import { PriorityQueueItem } from '@src/types';

/**
 * A Min-Priority Queue implementation using a binary heap.
 * Elements are extracted based on their priority, with lower priority values being higher priority.
 * @template T The type of the value stored in the queue.
 */
export class PriorityQueue<T> {
  private heap: PriorityQueueItem<T>[];

  constructor() {
    this.heap = [];
  }

  /**
   * Returns the number of elements in the priority queue.
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  public size(): number {
    return this.heap.length;
  }

  /**
   * Checks if the priority queue is empty.
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Inserts an item into the priority queue.
   * The item is placed at the end and then 'bubbled up' to maintain heap property.
   * @param value The value to be stored.
   * @param priority The priority of the value (lower value = higher priority).
   * Time Complexity: O(log N), where N is the number of elements in the heap.
   * Space Complexity: O(1) (amortized)
   */
  public enqueue(value: T, priority: number): void {
    const item: PriorityQueueItem<T> = { value, priority };
    this.heap.push(item);
    this.bubbleUp();
  }

  /**
   * Extracts the item with the highest priority (lowest priority value).
   * The root (highest priority) is removed, the last element replaces it,
   * and then it 'sinks down' to maintain heap property.
   * @returns The item with the highest priority, or undefined if the queue is empty.
   * Time Complexity: O(log N), where N is the number of elements in the heap.
   * Space Complexity: O(1)
   */
  public dequeue(): PriorityQueueItem<T> | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.pop();
    }

    // Store the root to return later
    const min = this.heap[0];
    // Replace the root with the last element
    this.heap[0] = this.heap.pop()!;
    // Sink down the new root to its correct position
    this.sinkDown();

    return min;
  }

  /**
   * Returns the item with the highest priority without removing it.
   * @returns The item with the highest priority, or undefined if the queue is empty.
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  public peek(): PriorityQueueItem<T> | undefined {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  /**
   * Restores the heap property by moving the last inserted element up the heap.
   * Time Complexity: O(log N)
   * Space Complexity: O(1)
   */
  private bubbleUp(): void {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      if (element.priority >= parent.priority) {
        break; // Correct position found
      }

      // Swap parent and element
      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  /**
   * Restores the heap property by moving the root element down the heap.
   * Time Complexity: O(log N)
   * Space Complexity: O(1)
   */
  private sinkDown(): void {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swapIndex = null; // Index to swap with

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

      if (swapIndex === null) {
        break; // Element is in its correct position
      }

      // Perform swap
      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = element;
      index = swapIndex;
    }
  }
}