import { runBenchmark, printBenchmarkResults, BenchmarkResult } from '../src/utils/performance';
import {
    isValidParentheses,
    MinStack,
    MyQueue,
    MyStack,
    slidingWindowMaximum
} from '../src/algorithms/stack-queue-problems';

console.log("Starting benchmarks...");

const results: BenchmarkResult[] = [];
const ITERATIONS = 10000; // Number of times to run each function for average time

// Helper to generate long strings for parentheses
const generateParentheses = (n: number): string => {
    let s = '';
    for (let i = 0; i < n / 2; i++) {
        s += '({[';
    }
    for (let i = 0; i < n / 2; i++) {
        s += ']})';
    }
    return s;
};

// Helper to generate large number arrays
const generateNumbers = (n: number, maxVal: number = 1000): number[] => {
    return Array.from({ length: n }, () => Math.floor(Math.random() * maxVal));
};

// --- Problem 1: Valid Parentheses ---
console.log("\n--- Benchmarking Valid Parentheses ---");
const longValidString = generateParentheses(10000); // 10,000 chars
const mediumValidString = generateParentheses(1000);
const shortValidString = "()[]{}";

results.push(runBenchmark("isValidParentheses (short)", isValidParentheses, ITERATIONS * 10, shortValidString));
results.push(runBenchmark("isValidParentheses (medium)", isValidParentheses, ITERATIONS, mediumValidString));
results.push(runBenchmark("isValidParentheses (long)", isValidParentheses, ITERATIONS / 10, longValidString));


// --- Problem 2: Min Stack ---
console.log("\n--- Benchmarking MinStack ---");
const minStackTest = () => {
    const ms = new MinStack();
    for (let i = 0; i < 1000; i++) {
        ms.push(Math.random() * 100);
    }
    for (let i = 0; i < 500; i++) {
        ms.pop();
        ms.getMin();
        ms.top();
    }
};
results.push(runBenchmark("MinStack Operations (1000 pushes, 500 mixed ops)", minStackTest, ITERATIONS));


// --- Problem 3: Implement Queue using Stacks ---
console.log("\n--- Benchmarking MyQueue ---");
const myQueueTest = () => {
    const mq = new MyQueue<number>();
    for (let i = 0; i < 1000; i++) {
        mq.push(i);
    }
    for (let i = 0; i < 500; i++) {
        mq.pop();
        mq.peek();
    }
};
results.push(runBenchmark("MyQueue Operations (1000 pushes, 500 mixed ops)", myQueueTest, ITERATIONS));


// --- Problem 4: Implement Stack using Queues ---
console.log("\n--- Benchmarking MyStack ---");
// This one is known to be less efficient with O(N) push for efficient pop
// And with our current Queue.dequeue being O(N), it will be O(N^2) for push.
// Let's test with smaller N.
const myStackTest = (size: number) => () => {
    const ms = new MyStack<number>();
    for (let i = 0; i < size; i++) {
        ms.push(i);
    }
    for (let i = 0; i < size / 2; i++) {
        ms.pop();
        ms.top();
    }
};
results.push(runBenchmark("MyStack Operations (50 pushes, 25 mixed ops)", myStackTest(50), ITERATIONS));
results.push(runBenchmark("MyStack Operations (100 pushes, 50 mixed ops)", myStackTest(100), ITERATIONS / 10));


// --- Problem 5: Sliding Window Maximum ---
console.log("\n--- Benchmarking Sliding Window Maximum ---");
const mediumNums = generateNumbers(5000);
const largeNums = generateNumbers(20000);
const kSmall = 10;
const kMedium = 100;
const kLarge = 1000;

results.push(runBenchmark(`SlidingWindowMax (N=5000, k=${kSmall})`, slidingWindowMaximum, ITERATIONS / 10, mediumNums, kSmall));
results.push(runBenchmark(`SlidingWindowMax (N=5000, k=${kMedium})`, slidingWindowMaximum, ITERATIONS / 10, mediumNums, kMedium));
results.push(runBenchmark(`SlidingWindowMax (N=20000, k=${kSmall})`, slidingWindowMaximum, ITERATIONS / 100, largeNums, kSmall));
results.push(runBenchmark(`SlidingWindowMax (N=20000, k=${kLarge})`, slidingWindowMaximum, ITERATIONS / 100, largeNums, kLarge));


// Print all results
printBenchmarkResults(results);

console.log("Benchmarks finished.");