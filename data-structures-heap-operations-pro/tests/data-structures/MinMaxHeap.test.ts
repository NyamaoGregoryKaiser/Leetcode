```typescript
/**
 * tests/data-structures/MinMaxHeap.test.ts
 * 
 * Test suite for the MinHeap and MaxHeap data structures.
 * Verifies the correctness of all core heap operations including insertion,
 * extraction, peeking, size, emptiness, and custom comparators.
 */

import { MinHeap, MaxHeap, Comparator } from '../../src/data-structures/MinMaxHeap';

// Helper function to check if an array represents a valid min-heap
function isMinHeap<T>(arr: T[], comparator: Comparator<T>): boolean {
    for (let i = 0; i < arr.length; i++) {
        const leftChildIndex = 2 * i + 1;
        const rightChildIndex = 2 * i + 2;

        if (leftChildIndex < arr.length && comparator(arr[leftChildIndex], arr[i]) < 0) {
            return false; // Left child is smaller than parent
        }
        if (rightChildIndex < arr.length && comparator(arr[rightChildIndex], arr[i]) < 0) {
            return false; // Right child is smaller than parent
        }
    }
    return true;
}

// Helper function to check if an array represents a valid max-heap
function isMaxHeap<T>(arr: T[], comparator: Comparator<T>): boolean {
    for (let i = 0; i < arr.length; i++) {
        const leftChildIndex = 2 * i + 1;
        const rightChildIndex = 2 * i + 2;

        if (leftChildIndex < arr.length && comparator(arr[leftChildIndex], arr[i]) > 0) {
            return false; // Left child is larger than parent
        }
        if (rightChildIndex < arr.length && comparator(arr[rightChildIndex], arr[i]) > 0) {
            return false; // Right child is larger than parent
        }
    }
    return true;
}

describe('MinHeap', () => {
    // Default comparator for numbers: a - b for min-heap (a < b means negative)
    const defaultNumComparator: Comparator<number> = (a, b) => a - b;

    test('should be empty on initialization', () => {
        const heap = new MinHeap<number>();
        expect(heap.isEmpty()).toBe(true);
        expect(heap.size()).toBe(0);
        expect(heap.peek()).toBeUndefined();
        expect(heap.extractMin()).toBeUndefined();
    });

    test('should insert elements and maintain min-heap property', () => {
        const heap = new MinHeap<number>();
        heap.insert(3);
        expect(heap.peek()).toBe(3);
        expect(heap.size()).toBe(1);
        expect(heap.isEmpty()).toBe(false);

        heap.insert(1);
        expect(heap.peek()).toBe(1); // 1 is smaller, should be root
        expect(heap.size()).toBe(2);

        heap.insert(5);
        expect(heap.peek()).toBe(1); // Still 1
        expect(heap.size()).toBe(3);

        heap.insert(2);
        expect(heap.peek()).toBe(1); // Still 1
        expect(heap.size()).toBe(4);

        heap.insert(4);
        expect(heap.peek()).toBe(1); // Still 1
        expect(heap.size()).toBe(5);

        // Internals check (though generally discouraged for data structures, useful here for heap property)
        // Accessing protected member for testing purposes only
        expect(isMinHeap((heap as any).heap, defaultNumComparator)).toBe(true);
    });

    test('should extract min elements in sorted order', () => {
        const heap = new MinHeap<number>();
        heap.insert(3);
        heap.insert(1);
        heap.insert(5);
        heap.insert(2);
        heap.insert(4); // Heap: [1, 2, 5, 3, 4] (conceptual)

        expect(heap.extractMin()).toBe(1); // Heap: [2, 3, 5, 4]
        expect(heap.peek()).toBe(2);
        expect(heap.size()).toBe(4);
        expect(isMinHeap((heap as any).heap, defaultNumComparator)).toBe(true);

        expect(heap.extractMin()).toBe(2); // Heap: [3, 4, 5]
        expect(heap.peek()).toBe(3);
        expect(heap.size()).toBe(3);
        expect(isMinHeap((heap as any).heap, defaultNumComparator)).toBe(true);

        expect(heap.extractMin()).toBe(3); // Heap: [4, 5]
        expect(heap.peek()).toBe(4);
        expect(heap.size()).toBe(2);

        expect(heap.extractMin()).toBe(4); // Heap: [5]
        expect(heap.peek()).toBe(5);
        expect(heap.size()).toBe(1);

        expect(heap.extractMin()).toBe(5); // Heap: []
        expect(heap.peek()).toBeUndefined();
        expect(heap.size()).toBe(0);
        expect(heap.isEmpty()).toBe(true);

        expect(heap.extractMin()).toBeUndefined(); // Empty heap
    });

    test('should handle duplicate values correctly', () => {
        const heap = new MinHeap<number>();
        heap.insert(5);
        heap.insert(1);
        heap.insert(5);
        heap.insert(1);
        heap.insert(3);

        expect(heap.size()).toBe(5);
        expect(heap.extractMin()).toBe(1);
        expect(heap.extractMin()).toBe(1);
        expect(heap.extractMin()).toBe(3);
        expect(heap.extractMin()).toBe(5);
        expect(heap.extractMin()).toBe(5);
        expect(heap.isEmpty()).toBe(true);
    });

    test('should build heap from initial elements in O(N) time', () => {
        const initialElements = [5, 3, 8, 1, 9, 2, 7, 4, 6];
        const heap = new MinHeap<number>(undefined, initialElements);

        expect(heap.size()).toBe(initialElements.length);
        expect(heap.peek()).toBe(1); // Smallest element should be at the root
        expect(isMinHeap((heap as any).heap, defaultNumComparator)).toBe(true);

        const sorted: number[] = [];
        while (!heap.isEmpty()) {
            sorted.push(heap.extractMin()!);
        }
        expect(sorted).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('should work with custom comparator for objects', () => {
        interface Item {
            id: number;
            value: string;
            priority: number;
        }

        // MinHeap based on priority
        const itemComparator: Comparator<Item> = (a, b) => a.priority - b.priority;
        const heap = new MinHeap<Item>(itemComparator);

        heap.insert({ id: 1, value: 'A', priority: 5 });
        heap.insert({ id: 2, value: 'B', priority: 1 });
        heap.insert({ id: 3, value: 'C', priority: 8 });
        heap.insert({ id: 4, value: 'D', priority: 2 });

        expect(heap.peek()?.id).toBe(2);
        expect(heap.extractMin()?.id).toBe(2); // Priority 1
        expect(heap.peek()?.id).toBe(4);
        expect(heap.extractMin()?.id).toBe(4); // Priority 2
        expect(heap.peek()?.id).toBe(1);
        expect(heap.extractMin()?.id).toBe(1); // Priority 5
        expect(heap.peek()?.id).toBe(3);
        expect(heap.extractMin()?.id).toBe(3); // Priority 8
        expect(heap.isEmpty()).toBe(true);
    });
});

describe('MaxHeap', () => {
    // Default comparator for numbers: b - a for max-heap (a > b means negative for MaxHeap comparison, a should bubble up)
    const defaultNumComparator: Comparator<number> = (a, b) => b - a;

    test('should be empty on initialization', () => {
        const heap = new MaxHeap<number>();
        expect(heap.isEmpty()).toBe(true);
        expect(heap.size()).toBe(0);
        expect(heap.peek()).toBeUndefined();
        expect(heap.extractMax()).toBeUndefined();
    });

    test('should insert elements and maintain max-heap property', () => {
        const heap = new MaxHeap<number>();
        heap.insert(3);
        expect(heap.peek()).toBe(3);
        expect(heap.size()).toBe(1);
        expect(heap.isEmpty()).toBe(false);

        heap.insert(1);
        expect(heap.peek()).toBe(3); // Still 3
        expect(heap.size()).toBe(2);

        heap.insert(5);
        expect(heap.peek()).toBe(5); // 5 is larger, should be root
        expect(heap.size()).toBe(3);

        heap.insert(2);
        expect(heap.peek()).toBe(5); // Still 5
        expect(heap.size()).toBe(4);

        heap.insert(4);
        expect(heap.peek()).toBe(5); // Still 5
        expect(heap.size()).toBe(5);

        // Internals check
        expect(isMaxHeap((heap as any).heap, defaultNumComparator)).toBe(true);
    });

    test('should extract max elements in sorted order (descending)', () => {
        const heap = new MaxHeap<number>();
        heap.insert(3);
        heap.insert(1);
        heap.insert(5);
        heap.insert(2);
        heap.insert(4); // Heap: [5, 4, 3, 1, 2] (conceptual)

        expect(heap.extractMax()).toBe(5); // Heap: [4, 2, 3, 1]
        expect(heap.peek()).toBe(4);
        expect(heap.size()).toBe(4);
        expect(isMaxHeap((heap as any).heap, defaultNumComparator)).toBe(true);

        expect(heap.extractMax()).toBe(4); // Heap: [3, 2, 1]
        expect(heap.peek()).toBe(3);
        expect(heap.size()).toBe(3);
        expect(isMaxHeap((heap as any).heap, defaultNumComparator)).toBe(true);

        expect(heap.extractMax()).toBe(3); // Heap: [2, 1]
        expect(heap.peek()).toBe(2);
        expect(heap.size()).toBe(2);

        expect(heap.extractMax()).toBe(2); // Heap: [1]
        expect(heap.peek()).toBe(1);
        expect(heap.size()).toBe(1);

        expect(heap.extractMax()).toBe(1); // Heap: []
        expect(heap.peek()).toBeUndefined();
        expect(heap.size()).toBe(0);
        expect(heap.isEmpty()).toBe(true);

        expect(heap.extractMax()).toBeUndefined(); // Empty heap
    });

    test('should handle duplicate values correctly', () => {
        const heap = new MaxHeap<number>();
        heap.insert(5);
        heap.insert(1);
        heap.insert(5);
        heap.insert(1);
        heap.insert(3);

        expect(heap.size()).toBe(5);
        expect(heap.extractMax()).toBe(5);
        expect(heap.extractMax()).toBe(5);
        expect(heap.extractMax()).toBe(3);
        expect(heap.extractMax()).toBe(1);
        expect(heap.extractMax()).toBe(1);
        expect(heap.isEmpty()).toBe(true);
    });

    test('should build heap from initial elements in O(N) time', () => {
        const initialElements = [5, 3, 8, 1, 9, 2, 7, 4, 6];
        const heap = new MaxHeap<number>(undefined, initialElements);

        expect(heap.size()).toBe(initialElements.length);
        expect(heap.peek()).toBe(9); // Largest element should be at the root
        expect(isMaxHeap((heap as any).heap, defaultNumComparator)).toBe(true);

        const sortedDescending: number[] = [];
        while (!heap.isEmpty()) {
            sortedDescending.push(heap.extractMax()!);
        }
        expect(sortedDescending).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

    test('should work with custom comparator for objects', () => {
        interface Item {
            id: number;
            value: string;
            priority: number;
        }

        // MaxHeap based on priority
        const itemComparator: Comparator<Item> = (a, b) => b.priority - a.priority; // b-a for max heap
        const heap = new MaxHeap<Item>(itemComparator);

        heap.insert({ id: 1, value: 'A', priority: 5 });
        heap.insert({ id: 2, value: 'B', priority: 1 });
        heap.insert({ id: 3, value: 'C', priority: 8 });
        heap.insert({ id: 4, value: 'D', priority: 2 });

        expect(heap.peek()?.id).toBe(3);
        expect(heap.extractMax()?.id).toBe(3); // Priority 8
        expect(heap.peek()?.id).toBe(1);
        expect(heap.extractMax()?.id).toBe(1); // Priority 5
        expect(heap.peek()?.id).toBe(4);
        expect(heap.extractMax()?.id).toBe(4); // Priority 2
        expect(heap.peek()?.id).toBe(2);
        expect(heap.extractMax()?.id).toBe(2); // Priority 1
        expect(heap.isEmpty()).toBe(true);
    });
});
```