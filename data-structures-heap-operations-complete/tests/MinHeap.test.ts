import { MinHeap } from '../src/algorithms/MinHeap';

describe('MinHeap', () => {
    // Test case 1: Basic functionality with numbers
    it('should correctly insert elements and extract the minimum', () => {
        const heap = new MinHeap<number>();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);
        heap.insert(1);
        heap.insert(7);

        expect(heap.size()).toBe(5);
        expect(heap.peek()).toBe(1);
        expect(heap.extractMin()).toBe(1);
        expect(heap.size()).toBe(4);
        expect(heap.peek()).toBe(3);
        expect(heap.extractMin()).toBe(3);
        expect(heap.extractMin()).toBe(5);
        expect(heap.extractMin()).toBe(7);
        expect(heap.extractMin()).toBe(8);
        expect(heap.isEmpty()).toBe(true);
        expect(heap.size()).toBe(0);
        expect(heap.extractMin()).toBeUndefined();
    });

    // Test case 2: Empty heap
    it('should handle an empty heap correctly', () => {
        const heap = new MinHeap<number>();
        expect(heap.isEmpty()).toBe(true);
        expect(heap.size()).toBe(0);
        expect(heap.peek()).toBeUndefined();
        expect(heap.extractMin()).toBeUndefined();
    });

    // Test case 3: Single element heap
    it('should handle a single element heap correctly', () => {
        const heap = new MinHeap<number>();
        heap.insert(10);
        expect(heap.size()).toBe(1);
        expect(heap.peek()).toBe(10);
        expect(heap.extractMin()).toBe(10);
        expect(heap.isEmpty()).toBe(true);
    });

    // Test case 4: Duplicates
    it('should handle duplicate elements correctly', () => {
        const heap = new MinHeap<number>();
        heap.insert(5);
        heap.insert(1);
        heap.insert(5);
        heap.insert(1);
        heap.insert(10);

        expect(heap.extractMin()).toBe(1);
        expect(heap.extractMin()).toBe(1);
        expect(heap.extractMin()).toBe(5);
        expect(heap.extractMin()).toBe(5);
        expect(heap.extractMin()).toBe(10);
        expect(heap.isEmpty()).toBe(true);
    });

    // Test case 5: Large number of elements
    it('should correctly process a large number of elements', () => {
        const heap = new MinHeap<number>();
        const numbers = Array.from({ length: 1000 }, (_, i) => Math.floor(Math.random() * 10000));
        numbers.forEach(num => heap.insert(num));

        expect(heap.size()).toBe(1000);

        let prevMin = -Infinity; // Using -Infinity as a safe starting point
        while (!heap.isEmpty()) {
            const currentMin = heap.extractMin()!;
            expect(currentMin).toBeGreaterThanOrEqual(prevMin);
            prevMin = currentMin;
        }
        expect(heap.isEmpty()).toBe(true);
    });

    // Test case 6: Custom comparator for objects (e.g., by age)
    it('should work with custom comparator for objects', () => {
        interface Person {
            name: string;
            age: number;
        }

        const personComparator = (a: Person, b: Person) => a.age - b.age;
        const heap = new MinHeap<Person>(personComparator);

        heap.insert({ name: 'Alice', age: 30 });
        heap.insert({ name: 'Bob', age: 25 });
        heap.insert({ name: 'Charlie', age: 35 });
        heap.insert({ name: 'David', age: 20 });

        expect(heap.peek()?.name).toBe('David');
        expect(heap.extractMin()?.name).toBe('David');
        expect(heap.peek()?.name).toBe('Bob');
        expect(heap.extractMin()?.name).toBe('Bob');
        expect(heap.extractMin()?.name).toBe('Alice');
        expect(heap.extractMin()?.name).toBe('Charlie');
        expect(heap.isEmpty()).toBe(true);
    });

    // Test case 7: Negative numbers
    it('should handle negative numbers correctly', () => {
        const heap = new MinHeap<number>();
        heap.insert(-5);
        heap.insert(-10);
        heap.insert(0);
        heap.insert(-1);

        expect(heap.extractMin()).toBe(-10);
        expect(heap.extractMin()).toBe(-5);
        expect(heap.extractMin()).toBe(-1);
        expect(heap.extractMin()).toBe(0);
        expect(heap.isEmpty()).toBe(true);
    });

    // Test case 8: Build heap from array (static method)
    it('should correctly build a heap from an array', () => {
        const numbers = [5, 3, 8, 1, 7, 2, 6, 4];
        const heap = MinHeap.buildHeap(numbers);

        expect(heap.size()).toBe(numbers.length);
        expect(heap.peek()).toBe(1);
        expect(heap.extractMin()).toBe(1);
        expect(heap.extractMin()).toBe(2);
        expect(heap.extractMin()).toBe(3);
        expect(heap.extractMin()).toBe(4);
        expect(heap.extractMin()).toBe(5);
        expect(heap.extractMin()).toBe(6);
        expect(heap.extractMin()).toBe(7);
        expect(heap.extractMin()).toBe(8);
        expect(heap.isEmpty()).toBe(true);
    });

    // Test case 9: Build heap with custom comparator
    it('should correctly build a heap from an array with a custom comparator', () => {
        interface Item {
            id: number;
            value: number;
        }
        const items: Item[] = [
            { id: 1, value: 50 },
            { id: 2, value: 20 },
            { id: 3, value: 80 },
            { id: 4, value: 10 },
        ];
        const itemComparator = (a: Item, b: Item) => a.value - b.value;
        const heap = MinHeap.buildHeap(items, itemComparator);

        expect(heap.peek()?.id).toBe(4);
        expect(heap.extractMin()?.value).toBe(10);
        expect(heap.extractMin()?.value).toBe(20);
        expect(heap.extractMin()?.value).toBe(50);
        expect(heap.extractMin()?.value).toBe(80);
        expect(heap.isEmpty()).toBe(true);
    });
});