```typescript
/**
 * src/utils/data-structures.ts
 *
 * This file contains implementations of common data structures that might be useful
 * for various algorithms, including some greedy ones.
 *
 * For instance, a Priority Queue can be an alternative to sorting for some greedy strategies.
 */

/**
 * A generic Item interface for data structures that might hold items with priority or other properties.
 */
export interface PrioritizedItem<T> {
    value: T;
    priority: number;
}

/**
 * Implements a Min-Priority Queue using a binary heap.
 *
 * A min-priority queue allows efficient extraction of the minimum element
 * and insertion of new elements. This is often useful in greedy algorithms
 * where you continuously need to pick the "best" (e.g., smallest finish time, largest profit, etc.)
 * element available.
 *
 * Operations:
 * - `insert(value, priority)`: Adds an item with its associated priority. O(log N)
 * - `extractMin()`: Removes and returns the item with the smallest priority. O(log N)
 * - `peekMin()`: Returns the item with the smallest priority without removing it. O(1)
 * - `isEmpty()`: Checks if the queue is empty. O(1)
 * - `size()`: Returns the number of elements in the queue. O(1)
 */
export class MinPriorityQueue<T> {
    private heap: PrioritizedItem<T>[] = [];

    /**
     * Returns the number of elements in the priority queue.
     * Time Complexity: O(1)
     */
    public size(): number {
        return this.heap.length;
    }

    /**
     * Checks if the priority queue is empty.
     * Time Complexity: O(1)
     */
    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    /**
     * Inserts a new item with a given value and priority into the queue.
     * Time Complexity: O(log N), where N is the number of elements in the queue.
     * @param value The value to store.
     * @param priority The priority associated with the value (lower value = higher priority).
     */
    public insert(value: T, priority: number): void {
        const item: PrioritizedItem<T> = { value, priority };
        this.heap.push(item);
        this.bubbleUp(this.heap.length - 1);
    }

    /**
     * Returns the item with the smallest priority without removing it.
     * Time Complexity: O(1)
     * @returns The item with the smallest priority, or undefined if the queue is empty.
     */
    public peekMin(): PrioritizedItem<T> | undefined {
        return this.heap.length > 0 ? this.heap[0] : undefined;
    }

    /**
     * Removes and returns the item with the smallest priority.
     * Time Complexity: O(log N), where N is the number of elements in the queue.
     * @returns The item with the smallest priority, or undefined if the queue is empty.
     */
    public extractMin(): PrioritizedItem<T> | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!; // Move last element to root
        this.bubbleDown(0);
        return min;
    }

    /**
     * Moves an element up the heap to maintain the heap property.
     * Time Complexity: O(log N)
     * @param index The index of the element to bubble up.
     */
    private bubbleUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority < this.heap[parentIndex].priority) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    /**
     * Moves an element down the heap to maintain the heap property.
     * Time Complexity: O(log N)
     * @param index The index of the element to bubble down.
     */
    private bubbleDown(index: number): void {
        const lastIndex = this.heap.length - 1;
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex <= lastIndex && this.heap[leftChildIndex].priority < this.heap[smallestIndex].priority) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex <= lastIndex && this.heap[rightChildIndex].priority < this.heap[smallestIndex].priority) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex !== index) {
                this.swap(index, smallestIndex);
                index = smallestIndex;
            } else {
                break;
            }
        }
    }

    /**
     * Swaps two elements in the heap array.
     * Time Complexity: O(1)
     * @param i First index.
     * @param j Second index.
     */
    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

/**
 * A simple Disjoint Set Union (DSU) or Union-Find data structure.
 * Useful for problems involving sets of elements that can be merged,
 * such as optimizing slot allocation in Job Sequencing.
 *
 * Operations:
 * - `makeSet(element)`: Creates a new set containing the element.
 * - `find(element)`: Finds the representative (root) of the set containing the element. O(alpha(N)) with path compression.
 * - `union(element1, element2)`: Merges the sets containing element1 and element2. O(alpha(N)) with union by rank/size.
 * - `connected(element1, element2)`: Checks if two elements are in the same set. O(alpha(N)).
 */
export class DisjointSetUnion<T> {
    private parent: Map<T, T>;
    private rank: Map<T, number>; // Or size, to optimize union

    constructor() {
        this.parent = new Map();
        this.rank = new Map();
    }

    /**
     * Creates a new set for the given element.
     * If the element already exists, nothing happens.
     * Time Complexity: O(1)
     * @param element The element to add to a new set.
     */
    public makeSet(element: T): void {
        if (!this.parent.has(element)) {
            this.parent.set(element, element);
            this.rank.set(element, 0); // Initialize rank to 0
        }
    }

    /**
     * Finds the representative (root) of the set containing the element.
     * Uses path compression for optimization.
     * Time Complexity: Amortized O(alpha(N)), where alpha is the inverse Ackermann function,
     *                  which is practically constant for all realistic N.
     * @param element The element whose set representative is to be found.
     * @returns The representative element of the set.
     * @throws Error if the element is not part of any set.
     */
    public find(element: T): T {
        if (!this.parent.has(element)) {
            throw new Error(`Element ${element} is not part of any set.`);
        }
        let currentParent = this.parent.get(element)!;
        if (currentParent === element) {
            return element;
        }
        // Path compression: set parent of element to the root
        currentParent = this.find(currentParent);
        this.parent.set(element, currentParent);
        return currentParent;
    }

    /**
     * Merges the sets containing element1 and element2.
     * Uses union by rank for optimization.
     * Time Complexity: Amortized O(alpha(N)).
     * @param element1 An element from the first set.
     * @param element2 An element from the second set.
     */
    public union(element1: T, element2: T): void {
        this.makeSet(element1); // Ensure elements exist, though in typical use they should be pre-made
        this.makeSet(element2);

        const root1 = this.find(element1);
        const root2 = this.find(element2);

        if (root1 !== root2) {
            const rank1 = this.rank.get(root1)!;
            const rank2 = this.rank.get(root2)!;

            // Union by rank: attach smaller rank tree under root of higher rank tree
            if (rank1 < rank2) {
                this.parent.set(root1, root2);
            } else if (rank2 < rank1) {
                this.parent.set(root2, root1);
            } else {
                // If ranks are equal, pick one root and increment its rank
                this.parent.set(root2, root1);
                this.rank.set(root1, rank1 + 1);
            }
        }
    }

    /**
     * Checks if two elements belong to the same set.
     * Time Complexity: Amortized O(alpha(N)).
     * @param element1 The first element.
     * @param element2 The second element.
     * @returns True if both elements are in the same set, false otherwise.
     */
    public connected(element1: T, element2: T): boolean {
        // Elements must first exist in the DSU structure to be considered connected.
        // If an element is not present, find will throw or indicate it's not managed.
        if (!this.parent.has(element1) || !this.parent.has(element2)) {
            return false;
        }
        return this.find(element1) === this.find(element2);
    }
}
```