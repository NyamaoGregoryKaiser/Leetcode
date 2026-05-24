```typescript
import { MinHeap } from '../src/data-structures/min-heap';
import { UnionFind } from '../src/data-structures/union-find';

// --- MinHeap Tests ---
describe('MinHeap', () => {
    let heap: MinHeap<string>;

    beforeEach(() => {
        heap = new MinHeap<string>();
    });

    it('should be empty initially', () => {
        expect(heap.isEmpty()).toBe(true);
        expect(heap.size()).toBe(0);
        expect(heap.peek()).toBeUndefined();
        expect(heap.extractMin()).toBeUndefined();
    });

    it('should insert elements and maintain min-heap property', () => {
        heap.insert('A', 5);
        expect(heap.peek()?.value).toBe('A');
        expect(heap.peek()?.priority).toBe(5);
        expect(heap.size()).toBe(1);

        heap.insert('B', 3);
        expect(heap.peek()?.value).toBe('B');
        expect(heap.peek()?.priority).toBe(3);
        expect(heap.size()).toBe(2);

        heap.insert('C', 7);
        expect(heap.peek()?.value).toBe('B');
        expect(heap.peek()?.priority).toBe(3);
        expect(heap.size()).toBe(3);

        heap.insert('D', 1);
        expect(heap.peek()?.value).toBe('D');
        expect(heap.peek()?.priority).toBe(1);
        expect(heap.size()).toBe(4);
    });

    it('should extract min elements in correct order', () => {
        heap.insert('A', 5);
        heap.insert('B', 3);
        heap.insert('C', 7);
        heap.insert('D', 1);
        heap.insert('E', 4);

        expect(heap.extractMin()?.value).toBe('D'); // Prio 1
        expect(heap.size()).toBe(4);
        expect(heap.peek()?.value).toBe('B'); // Prio 3

        expect(heap.extractMin()?.value).toBe('B'); // Prio 3
        expect(heap.size()).toBe(3);
        expect(heap.peek()?.value).toBe('E'); // Prio 4

        expect(heap.extractMin()?.value).toBe('E'); // Prio 4
        expect(heap.size()).toBe(2);
        expect(heap.peek()?.value).toBe('A'); // Prio 5

        expect(heap.extractMin()?.value).toBe('A'); // Prio 5
        expect(heap.size()).toBe(1);
        expect(heap.peek()?.value).toBe('C'); // Prio 7

        expect(heap.extractMin()?.value).toBe('C'); // Prio 7
        expect(heap.size()).toBe(0);
        expect(heap.isEmpty()).toBe(true);
        expect(heap.extractMin()).toBeUndefined();
    });

    it('should handle duplicate priorities correctly', () => {
        heap.insert('A', 5);
        heap.insert('B', 3);
        heap.insert('C', 5);
        heap.insert('D', 1);

        expect(heap.extractMin()?.value).toBe('D'); // Prio 1
        expect(heap.extractMin()?.value).toBe('B'); // Prio 3
        const next = heap.extractMin(); // Either A or C
        expect(next?.priority).toBe(5);
        expect(['A', 'C']).toContain(next?.value);
        expect(heap.extractMin()?.priority).toBe(5);
    });

    it('should work with custom objects as values', () => {
        interface Item { id: number; data: string; }
        const itemHeap = new MinHeap<Item>();

        itemHeap.insert({ id: 1, data: 'one' }, 10);
        itemHeap.insert({ id: 2, data: 'two' }, 5);
        itemHeap.insert({ id: 3, data: 'three' }, 15);

        expect(itemHeap.extractMin()?.value.id).toBe(2);
        expect(itemHeap.peek()?.value.id).toBe(1);
    });
});

// --- UnionFind Tests ---
describe('UnionFind', () => {
    it('should initialize correctly with N elements', () => {
        const uf = new UnionFind(5); // Elements 0, 1, 2, 3, 4
        expect(uf.countSets()).toBe(5);
        for (let i = 0; i < 5; i++) {
            expect(uf.find(i)).toBe(i); // Each element is its own root
        }
    });

    it('should throw error for out of bounds access', () => {
        const uf = new UnionFind(3);
        expect(() => uf.find(-1)).toThrow();
        expect(() => uf.find(3)).toThrow();
        expect(() => uf.union(0, 3)).toThrow();
    });

    it('should unite two elements into the same set', () => {
        const uf = new UnionFind(5);
        expect(uf.union(0, 1)).toBe(true); // 0 and 1 are now connected
        expect(uf.find(0)).toBe(uf.find(1));
        expect(uf.isConnected(0, 1)).toBe(true);
        expect(uf.countSets()).toBe(4); // 0-1, 2, 3, 4

        expect(uf.union(2, 3)).toBe(true); // 2 and 3 are now connected
        expect(uf.find(2)).toBe(uf.find(3));
        expect(uf.isConnected(2, 3)).toBe(true);
        expect(uf.countSets()).toBe(3); // 0-1, 2-3, 4

        expect(uf.isConnected(0, 2)).toBe(false);
    });

    it('should not unite elements already in the same set', () => {
        const uf = new UnionFind(3);
        uf.union(0, 1);
        expect(uf.union(0, 1)).toBe(false); // Should return false, no change
        expect(uf.countSets()).toBe(2);
    });

    it('should connect multiple components', () => {
        const uf = new UnionFind(5); // 0, 1, 2, 3, 4

        uf.union(0, 1); // {0,1}, {2}, {3}, {4}
        uf.union(2, 3); // {0,1}, {2,3}, {4}
        uf.union(0, 2); // {0,1,2,3}, {4}

        expect(uf.isConnected(0, 1)).toBe(true);
        expect(uf.isConnected(1, 2)).toBe(true);
        expect(uf.isConnected(2, 3)).toBe(true);
        expect(uf.isConnected(0, 3)).toBe(true);
        expect(uf.isConnected(0, 4)).toBe(false);
        expect(uf.countSets()).toBe(2);
    });

    it('should apply path compression during find operations', () => {
        const uf = new UnionFind(5); // 0, 1, 2, 3, 4
        uf.union(0, 1); // 0 -> 1 (assuming 1 becomes root)
        uf.union(1, 2); // 1 -> 2 (assuming 2 becomes root)
        uf.union(2, 3); // 2 -> 3 (assuming 3 becomes root)

        // Path compression will flatten the tree when find(0) is called
        // Initial structure: 0 -> 1 -> 2 -> 3
        // After find(0): 0 -> 3, 1 -> 3, 2 -> 3 (all point directly to root 3)
        const rootOf0 = uf.find(0);
        expect(rootOf0).toBe(uf.find(1));
        expect(rootOf0).toBe(uf.find(2));
        expect(rootOf0).toBe(uf.find(3));
        // We can't directly check parent array without exposing it, but find() should be faster after this.
    });

    it('should handle large number of elements and operations', () => {
        const N = 1000;
        const uf = new UnionFind(N);
        expect(uf.countSets()).toBe(N);

        for (let i = 0; i < N - 1; i++) {
            uf.union(i, i + 1);
        }

        expect(uf.countSets()).toBe(1); // All elements should be connected
        expect(uf.isConnected(0, N - 1)).toBe(true);
        expect(uf.find(0)).toBe(uf.find(N - 1));

        // Random checks
        expect(uf.isConnected(123, 456)).toBe(true);
        expect(uf.isConnected(0, 999)).toBe(true);
    });
});
```