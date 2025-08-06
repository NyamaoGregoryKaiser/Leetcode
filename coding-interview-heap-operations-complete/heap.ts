```typescript
// Helper class for MinHeap
class MinHeap {
    heap: number[];

    constructor() {
        this.heap = [];
    }

    getParentIndex(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    getLeftChildIndex(i: number): number {
        return 2 * i + 1;
    }

    getRightChildIndex(i: number): number {
        return 2 * i + 2;
    }

    swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    heapifyUp(i: number): void {
        while (i > 0 && this.heap[i] < this.heap[this.getParentIndex(i)]) {
            this.swap(i, this.getParentIndex(i));
            i = this.getParentIndex(i);
        }
    }

    heapifyDown(i: number): void {
        let smallest = i;
        const left = this.getLeftChildIndex(i);
        const right = this.getRightChildIndex(i);

        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        if (smallest !== i) {
            this.swap(i, smallest);
            this.heapifyDown(smallest);
        }
    }


    insert(value: number): void {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMin(): number | null {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown(0);
        return min;
    }

    size(): number {
        return this.heap.length;
    }
}


export { MinHeap };
```