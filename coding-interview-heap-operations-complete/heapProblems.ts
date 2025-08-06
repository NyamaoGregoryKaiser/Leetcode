```typescript
import { MinHeap } from "./heap";

// Problem 1: Heapify
function heapify(nums: number[]): number[] {
    const heap = new MinHeap();
    nums.forEach(num => heap.insert(num));
    return heap.heap; // Return the internal heap array
}

// Problem 2: Kth Largest Element (using MinHeap)
function findKthLargest(nums: number[], k: number): number {
    const minHeap = new MinHeap();
    for (let num of nums) {
        minHeap.insert(num);
        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }
    return minHeap.extractMin()!;
}


// Problem 4: Top K Frequent Elements (using MinHeap)
function topKFrequent(nums: number[], k: number): number[] {
    const counts = new Map<number, number>();
    for (const num of nums) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    const minHeap = new MinHeap();
    for (const [num, count] of counts) {
        minHeap.insert(count); // Use count as priority
        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }


    const result:number[] = [];
    for (const [num, count] of counts){
        if (minHeap.heap.includes(count)){
            result.push(num);
        }
    }
    return result;
}



// Example usage (add more test cases)
console.log("Heapify:", heapify([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]));
console.log("Kth Largest:", findKthLargest([3, 2, 1, 5, 6, 4], 2));
console.log("Top K Frequent:", topKFrequent([1,1,1,2,2,3], 2));

export { heapify, findKthLargest, topKFrequent };
```