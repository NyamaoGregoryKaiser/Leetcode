```typescript
/**
 * @fileoverview Main entry point for running examples and benchmarks.
 *
 * This file serves as a demonstration of how to use the implemented algorithms
 * and data structures, and how to perform performance benchmarking.
 *
 * To run this file: `npm start`
 */

import { isValidParenthesesOptimal, isValidParenthesesNativeArray } from './problems/P1_ValidParentheses';
import { MinStackOptimal, MinStackTwoStacks } from './problems/P2_MinStack';
import { MyQueue } from './problems/P3_QueueUsingStacks';
import { wallsAndGates, INF } from './problems/P4_WallsAndGates';
import { maxSlidingWindowOptimal, maxSlidingWindowBruteForce, maxSlidingWindowTwoPasses } from './problems/P5_SlidingWindowMaximum';
import { benchmarkAverage, generateRandomArray } from './utils/benchmark';
import { Stack } from './data-structures/Stack';
import { Queue, OptimizedQueue } from './data-structures/Queue';
import { Deque } from './data-structures/Deque';


console.log("--- Stack and Queue Interview Project ---");
console.log("\n");

// --- 1. Data Structure Demonstrations ---
console.log("--- 1. Data Structure Demonstrations ---");

// Stack
console.log("\nStack Demo:");
const myStack = new Stack<number>();
console.log(`Is stack empty? ${myStack.isEmpty()}`); // true
myStack.push(10);
myStack.push(20);
myStack.push(30);
console.log(`Stack size: ${myStack.size()}`); // 3
console.log(`Stack peek: ${myStack.peek()}`); // 30
console.log(`Stack pop: ${myStack.pop()}`);   // 30
console.log(`Stack peek: ${myStack.peek()}`); // 20
console.log(`Stack toArray: ${myStack.toArray()}`); // [10, 20]

// Queue (basic)
console.log("\nQueue Demo (Basic):");
const myQueue = new Queue<string>();
console.log(`Is queue empty? ${myQueue.isEmpty()}`); // true
myQueue.enqueue("apple");
myQueue.enqueue("banana");
myQueue.enqueue("cherry");
console.log(`Queue size: ${myQueue.size()}`); // 3
console.log(`Queue peek: ${myQueue.peek()}`); // apple
console.log(`Queue dequeue: ${myQueue.dequeue()}`); // apple
console.log(`Queue peek: ${myQueue.peek()}`); // banana
console.log(`Queue toArray: ${myQueue.toArray()}`); // ["banana", "cherry"]

// Optimized Queue
console.log("\nOptimized Queue Demo:");
const optQueue = new OptimizedQueue<number>();
optQueue.enqueue(1);
optQueue.enqueue(2);
optQueue.enqueue(3);
optQueue.dequeue(); // 1
optQueue.dequeue(); // 2
optQueue.enqueue(4);
optQueue.enqueue(5);
console.log(`Optimized Queue peek: ${optQueue.peek()}`); // 3
console.log(`Optimized Queue toArray: ${optQueue.toArray()}`); // [3, 4, 5]

// Deque
console.log("\nDeque Demo:");
const myDeque = new Deque<number>();
myDeque.addBack(1);   // [1]
myDeque.addFront(0);  // [0, 1]
myDeque.addBack(2);   // [0, 1, 2]
myDeque.removeFront(); // 0, deque is [1, 2]
myDeque.removeBack();  // 2, deque is [1]
console.log(`Deque peekFront: ${myDeque.peekFront()}`); // 1
console.log(`Deque peekBack: ${myDeque.peekBack()}`);   // 1
console.log(`Deque toArray: ${myDeque.toArray()}`);     // [1]


// --- 2. Problem Demonstrations ---
console.log("\n--- 2. Problem Demonstrations ---");

// P1: Valid Parentheses
console.log("\nP1: Valid Parentheses");
console.log(`"()[]{}" is valid: ${isValidParenthesesOptimal("()[]{}")}`); // true
console.log(`"([{}])" is valid: ${isValidParenthesesOptimal("([{}])")}`); // true
console.log(`"({[)]" is valid: ${isValidParenthesesOptimal("({[)]")}`);   // false
console.log(`"[" is valid: ${isValidParenthesesOptimal("[")}`);         // false
console.log(`"]" is valid: ${isValidParenthesesOptimal("]")}`);         // false
console.log(`"" is valid: ${isValidParenthesesOptimal("")}`);           // true

// P2: Min Stack
console.log("\nP2: Min Stack");
const minStack = new MinStackOptimal();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(`MinStack current min: ${minStack.getMin()}`); // -3
minStack.pop();
console.log(`MinStack top: ${minStack.top()}`);          // 0
console.log(`MinStack current min: ${minStack.getMin()}`); // -2

// P3: Implement Queue using Stacks
console.log("\nP3: Implement Queue using Stacks");
const myQueueP3 = new MyQueue();
myQueueP3.push(1);
myQueueP3.push(2);
console.log(`Queue (using stacks) peek: ${myQueueP3.peek()}`); // 1
console.log(`Queue (using stacks) pop: ${myQueueP3.pop()}`);   // 1
console.log(`Queue (using stacks) empty: ${myQueueP3.empty()}`); // false
myQueueP3.pop();
console.log(`Queue (using stacks) empty: ${myQueueP3.empty()}`); // true

// P4: Walls and Gates
console.log("\nP4: Walls and Gates");
const grid: number[][] = [
    [INF, -1, 0, INF],
    [INF, INF, INF, -1],
    [INF, -1, INF, -1],
    [0, -1, INF, INF]
];
console.log("Original Grid:");
grid.forEach(row => console.log(row.map(val => val === INF ? "INF".padStart(3) : String(val).padStart(3)).join(' ')));
wallsAndGates(grid);
console.log("\nModified Grid:");
grid.forEach(row => console.log(row.map(val => val === INF ? "INF".padStart(3) : String(val).padStart(3)).join(' ')));
// Expected:
//   3  -1   0   1
//   2   2   1  -1
//   1  -1   2  -1
//   0  -1   3   4

// P5: Sliding Window Maximum
console.log("\nP5: Sliding Window Maximum");
const numsP5 = [1, 3, -1, -3, 5, 3, 6, 7];
const kP5 = 3;
console.log(`Nums: [${numsP5}], k: ${kP5}`);
console.log(`Max sliding window (Optimal): [${maxSlidingWindowOptimal(numsP5, kP5)}]`); // [3,3,5,5,6,7]
console.log(`Max sliding window (Brute Force): [${maxSlidingWindowBruteForce(numsP5, kP5)}]`); // [3,3,5,5,6,7]
console.log(`Max sliding window (Two Passes): [${maxSlidingWindowTwoPasses(numsP5, kP5)}]`); // [3,3,5,5,6,7]


// --- 3. Performance Benchmarking ---
console.log("\n--- 3. Performance Benchmarking ---");

// P1 Valid Parentheses Benchmark
console.log("\nBenchmarking P1: Valid Parentheses");
const longValidString = "(((((()))))))".repeat(50000); // Length 1.2M
const longInvalidString = "(((((()))))))(".repeat(50000); // Length 1.2M + 1
const iterations = 50;

let resultOptimal = benchmarkAverage(isValidParenthesesOptimal, iterations, longValidString);
console.log(`isValidParenthesesOptimal (valid, len=${longValidString.length}): Avg Time: ${resultOptimal.averageTimeMs.toFixed(3)} ms, Result: ${resultOptimal.lastResult}`);

resultOptimal = benchmarkAverage(isValidParenthesesOptimal, iterations, longInvalidString);
console.log(`isValidParenthesesOptimal (invalid, len=${longInvalidString.length}): Avg Time: ${resultOptimal.averageTimeMs.toFixed(3)} ms, Result: ${resultOptimal.lastResult}`);

let resultNative = benchmarkAverage(isValidParenthesesNativeArray, iterations, longValidString);
console.log(`isValidParenthesesNativeArray (valid, len=${longValidString.length}): Avg Time: ${resultNative.averageTimeMs.toFixed(3)} ms, Result: ${resultNative.lastResult}`);

// P5 Sliding Window Maximum Benchmark
console.log("\nBenchmarking P5: Sliding Window Maximum");
const largeNums = generateRandomArray(100000, -10000, 10000); // 100,000 elements
const largeK = 1000;
const p5_iterations = 5; // Fewer iterations for O(N*K) brute force to avoid extremely long run times

console.log(`Array size: ${largeNums.length}, Window size: ${largeK}`);

// Optimal (Deque)
const p5_resultOptimal = benchmarkAverage(maxSlidingWindowOptimal, p5_iterations, largeNums, largeK);
console.log(`maxSlidingWindowOptimal: Avg Time: ${p5_resultOptimal.averageTimeMs.toFixed(3)} ms`);

// Two Passes
const p5_resultTwoPasses = benchmarkAverage(maxSlidingWindowTwoPasses, p5_iterations, largeNums, largeK);
console.log(`maxSlidingWindowTwoPasses: Avg Time: ${p5_resultTwoPasses.averageTimeMs.toFixed(3)} ms`);

// Brute Force (will be significantly slower for large inputs)
// Uncomment with caution for very large inputs, as it might take a long time.
// const p5_resultBruteForce = benchmarkAverage(maxSlidingWindowBruteForce, p5_iterations, largeNums, largeK);
// console.log(`maxSlidingWindowBruteForce: Avg Time: ${p5_resultBruteForce.averageTimeMs.toFixed(3)} ms`);
// Example output for above, expect ~500-1000x slower for N=10^5, K=10^3:
// maxSlidingWindowBruteForce: Avg Time: 1700.000 ms (vs Optimal: 2-3ms)
console.log("\nNote: Brute force for P5 is commented out by default due to very high time complexity (O(N*K)) for large inputs.");
console.log("For N=100k, K=1k, it implies ~10^8 operations, which would take seconds to minutes. Optimal is ~10^5 ops, ms range.");
```