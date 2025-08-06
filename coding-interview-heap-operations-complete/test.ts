```typescript
import { heapify, findKthLargest, topKFrequent } from "./heapProblems";

describe("Heap Operations", () => {
    it("should heapify correctly", () => {
        expect(heapify([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])).toEqual([1, 1, 2, 3, 5, 9, 3, 6, 5, 4, 5]); //Result may vary depending on heap implementation.
    });

    it("should find the kth largest element correctly", () => {
        expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
    });


    it("should find top k frequent elements correctly", () => {
        expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toEqual([1,2]);
    });
});
```