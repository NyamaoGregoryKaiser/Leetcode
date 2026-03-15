import { findKthLargest, findKthLargest_sorting } from '../src/algorithms/KthLargestElement';
import { mergeKLists, mergeKLists_bruteForce, mergeKLists_divideAndConquer, ListNode } from '../src/algorithms/MergeKSortedLists';
import { topKFrequent, topKFrequent_sorting, topKFrequent_bucketSort } from '../src/algorithms/TopKFrequentElements';
import { MedianFinder, MedianFinder_Naive } from '../src/algorithms/MedianFinder';
import { KthLargestInStream } from '../src/algorithms/KthLargestInStream';

console.log('--- Performance Benchmarking ---');

// Helper to generate random array
const generateRandomArray = (size: number, maxVal: number): number[] => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * maxVal));
};

// Helper to convert array to ListNode linked list
const arrayToList = (arr: number[]): ListNode | null => {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
};

// Helper to convert ListNode linked list to array
const listToArray = (head: ListNode | null): number[] => {
    const arr: number[] = [];
    let current = head;
    while (current !== null) {
        arr.push(current.val);
        current = current.next;
    }
    return arr;
};

// --- Problem 1: Kth Largest Element in an Array ---
console.log('\nBenchmarking: Kth Largest Element');
const nums1 = generateRandomArray(100000, 1000000);
const k1 = 5000; // Middle k
const k1_small = 10; // Small k
const k1_large = 95000; // Large k

console.time('KthLargest (Heap, k=5000)');
findKthLargest([...nums1], k1);
console.timeEnd('KthLargest (Heap, k=5000)');

console.time('KthLargest (Heap, k=10)');
findKthLargest([...nums1], k1_small);
console.timeEnd('KthLargest (Heap, k=10)');

console.time('KthLargest (Heap, k=95000)');
findKthLargest([...nums1], k1_large);
console.timeEnd('KthLargest (Heap, k=95000)');

console.time('KthLargest (Sorting)');
findKthLargest_sorting([...nums1], k1);
console.timeEnd('KthLargest (Sorting)');


// --- Problem 2: Merge k Sorted Lists ---
console.log('\nBenchmarking: Merge k Sorted Lists');
const numLists = 100;
const listLength = 1000;
const listsMerge: Array<ListNode | null>[] = [];
for (let i = 0; i < numLists; i++) {
    const arr = generateRandomArray(listLength, listLength * 10);
    arr.sort((a, b) => a - b); // Ensure lists are sorted
    listsMerge.push(arrayToList(arr));
}

// Deep copy for each method to ensure fair comparison
const copyLists = (lists: Array<ListNode | null>): Array<ListNode | null> => {
    return lists.map(list => {
        if (!list) return null;
        let newList = new ListNode(list.val);
        let currentOld = list.next;
        let currentNew = newList;
        while (currentOld) {
            currentNew.next = new ListNode(currentOld.val);
            currentNew = currentNew.next;
            currentOld = currentOld.next;
        }
        return newList;
    });
};

console.time('MergeKLists (Heap)');
listToArray(mergeKLists(copyLists(listsMerge)));
console.timeEnd('MergeKLists (Heap)');

console.time('MergeKLists (Divide and Conquer)');
listToArray(mergeKLists_divideAndConquer(copyLists(listsMerge)));
console.timeEnd('MergeKLists (Divide and Conquer)');

console.time('MergeKLists (Brute Force Sort)');
listToArray(mergeKLists_bruteForce(copyLists(listsMerge)));
console.timeEnd('MergeKLists (Brute Force Sort)');


// --- Problem 3: Find Median from Data Stream ---
console.log('\nBenchmarking: Median Finder');
const streamSize = 50000;
const streamNums = generateRandomArray(streamSize, streamSize * 2);

// Heap-based MedianFinder
const mfHeap = new MedianFinder();
console.time('MedianFinder (Heap-based)');
for (const num of streamNums) {
    mfHeap.addNum(num);
}
mfHeap.findMedian(); // Final median calculation
console.timeEnd('MedianFinder (Heap-based)');

// Naive MedianFinder
const mfNaive = new MedianFinder_Naive();
console.time('MedianFinder (Naive Sorting-based)');
for (const num of streamNums) {
    mfNaive.addNum(num);
}
mfNaive.findMedian(); // Final median calculation
console.timeEnd('MedianFinder (Naive Sorting-based)');


// --- Problem 4: Top K Frequent Elements ---
console.log('\nBenchmarking: Top K Frequent Elements');
const numsFreq = generateRandomArray(100000, 10000); // Many duplicates
const kFreq = 100;

console.time('TopKFrequent (Heap)');
topKFrequent([...numsFreq], kFreq);
console.timeEnd('TopKFrequent (Heap)');

console.time('TopKFrequent (Bucket Sort)');
topKFrequent_bucketSort([...numsFreq], kFreq);
console.timeEnd('TopKFrequent (Bucket Sort)');

console.time('TopKFrequent (Sorting)');
topKFrequent_sorting([...numsFreq], kFreq);
console.timeEnd('TopKFrequent (Sorting)');


// --- Problem 5: Kth Largest in Stream ---
console.log('\nBenchmarking: Kth Largest in Stream (add operations)');
const initialStreamSize = 1000;
const addOperations = 50000;
const streamK = 50;

const initialNumsStream = generateRandomArray(initialStreamSize, initialStreamSize * 2);
const numsToAddStream = generateRandomArray(addOperations, initialStreamSize * 2);

console.time('KthLargestInStream (Heap)');
const klHeap = new KthLargestInStream(streamK, initialNumsStream);
for (const num of numsToAddStream) {
    klHeap.add(num);
}
console.timeEnd('KthLargestInStream (Heap)');
```

```markdown