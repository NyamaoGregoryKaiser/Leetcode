```javascript
/**
 * @fileoverview Performance benchmarking for Stack and Queue problems.
 * Compares different solutions and scales inputs to measure performance.
 * Uses Node.js `perf_hooks` for high-resolution timing.
 */

import { performance } from 'node:perf_hooks';
import {
    isValidParenthesesOptimal,
    isValidParenthesesBruteForce
} from '../src/problems/problem1_valid_parentheses.js';
import {
    MyQueueOptimal,
    MyQueueEagerTransfer
} from '../src/problems/problem2_implement_queue_using_stacks.js';
import {
    MovingAverageOptimal,
    MovingAverageCircularBuffer
} from '../src/problems/problem3_moving_average_from_data_stream.js';
import {
    largestRectangleAreaOptimal,
    largestRectangleAreaBruteForce
} from '../src/problems/problem4_largest_rectangle_in_histogram.js';
import {
    MinStackOptimal,
    MinStackMemoryOptimized,
    MinStackDiffOptimized
} from '../src/problems/problem5_min_stack.js';

/**
 * Helper function to run a benchmark.
 * @param {string} name The name of the benchmark.
 * @param {Function} func The function to benchmark.
 * @param {Array<any>} args The arguments to pass to the function.
 * @param {number} iterations Number of times to run the function.
 * @returns {number} Average execution time in milliseconds.
 */
function runBenchmark(name, func, args, iterations = 1000) {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        func(...args);
        const end = performance.now();
        totalTime += (end - start);
    }
    const averageTime = totalTime / iterations;
    console.log(`${name}: ${averageTime.toFixed(4)} ms (avg over ${iterations} runs)`);
    return averageTime;
}

/**
 * Generates a string of valid parentheses of a given length.
 * @param {number} length
 * @returns {string}
 */
function generateValidParentheses(length) {
    if (length % 2 !== 0) throw new Error("Length must be even for valid parentheses.");
    let s = '';
    for (let i = 0; i < length / 2; i++) {
        s += '(';
    }
    for (let i = 0; i < length / 2; i++) {
        s += ')';
    }
    return s;
}

/**
 * Generates a random array of heights for the histogram problem.
 * @param {number} count
 * @param {number} max_height
 * @returns {number[]}
 */
function generateRandomHeights(count, max_height) {
    const heights = [];
    for (let i = 0; i < count; i++) {
        heights.push(Math.floor(Math.random() * (max_height + 1)));
    }
    return heights;
}

console.log('--- Stack and Queue Benchmarks ---');
console.log('');

// --- Problem 1: Valid Parentheses ---
console.log('Problem 1: Valid Parentheses (String Length)');
const p1_small = generateValidParentheses(100);
const p1_medium = generateValidParentheses(1000);
const p1_large = generateValidParentheses(10000); // Up to 10^4 as per constraints

console.log('  Optimal Solution (Stack)');
runBenchmark('    Small (N=100)', isValidParenthesesOptimal, [p1_small]);
runBenchmark('    Medium (N=1000)', isValidParenthesesOptimal, [p1_medium]);
runBenchmark('    Large (N=10000)', isValidParenthesesOptimal, [p1_large]);

console.log('  Brute Force Solution (String Replace)');
runBenchmark('    Small (N=100)', isValidParenthesesBruteForce, [p1_small]);
runBenchmark('    Medium (N=1000)', isValidParenthesesBruteForce, [p1_medium]); // This will be significantly slower
// runBenchmark('    Large (N=10000)', isValidParenthesesBruteForce, [p1_large]); // Might take too long, N^2 for replace is N^3 effectively.

console.log('');

// --- Problem 2: Implement Queue using Stacks ---
console.log('Problem 2: Implement Queue using Stacks (Number of Operations)');
const p2_ops_small = Array.from({ length: 100 }, (_, i) => ['push', i % 10]);
p2_ops_small.push(['pop', null]); p2_ops_small.push(['peek', null]); p2_ops_small.push(['empty', null]);
const p2_ops_medium = Array.from({ length: 1000 }, (_, i) => i % 2 === 0 ? ['push', i] : ['pop', null]);
const p2_ops_large = Array.from({ length: 10000 }, (_, i) => i % 2 === 0 ? ['push', i] : ['pop', null]);

function runQueueBench(QueueClass, ops) {
    const myQueue = new QueueClass();
    ops.forEach(([op, arg]) => {
        if (op === 'push') myQueue.push(arg);
        else if (op === 'pop') myQueue.pop();
        else if (op === 'peek') myQueue.peek();
        else if (op === 'empty') myQueue.empty();
    });
}

console.log('  Optimal Solution (Lazy Transfer)');
runBenchmark('    Small (100 ops)', runQueueBench, [MyQueueOptimal, p2_ops_small]);
runBenchmark('    Medium (1000 ops)', runQueueBench, [MyQueueOptimal, p2_ops_medium]);
runBenchmark('    Large (10000 ops)', runQueueBench, [MyQueueOptimal, p2_ops_large]);

console.log('  Eager Transfer Solution (Less Optimal Push)');
runBenchmark('    Small (100 ops)', runQueueBench, [MyQueueEagerTransfer, p2_ops_small]);
runBenchmark('    Medium (1000 ops)', runQueueBench, [MyQueueEagerTransfer, p2_ops_medium]);
// runBenchmark('    Large (10000 ops)', runQueueBench, [MyQueueEagerTransfer, p2_ops_large]); // This will be very slow due to O(N) push.

console.log('');

// --- Problem 3: Moving Average from Data Stream ---
console.log('Problem 3: Moving Average from Data Stream (Number of next() calls, fixed window)');
const p3_window_size = 100;
const p3_data_stream_small = Array.from({ length: 1000 }, (_, i) => i);
const p3_data_stream_medium = Array.from({ length: 10000 }, (_, i) => i);
const p3_data_stream_large = Array.from({ length: 100000 }, (_, i) => i);

function runMovingAverageBench(MovingAverageClass, size, stream) {
    const ma = new MovingAverageClass(size);
    stream.forEach(val => ma.next(val));
}

console.log(`  Optimal Solution (Queue, window_size=${p3_window_size})`);
runBenchmark('    Small (1K calls)', runMovingAverageBench, [MovingAverageOptimal, p3_window_size, p3_data_stream_small]);
runBenchmark('    Medium (10K calls)', runMovingAverageBench, [MovingAverageOptimal, p3_window_size, p3_data_stream_medium]);
runBenchmark('    Large (100K calls)', runMovingAverageBench, [MovingAverageOptimal, p3_window_size, p3_data_stream_large]);

console.log(`  Circular Buffer Solution (window_size=${p3_window_size})`);
runBenchmark('    Small (1K calls)', runMovingAverageBench, [MovingAverageCircularBuffer, p3_window_size, p3_data_stream_small]);
runBenchmark('    Medium (10K calls)', runMovingAverageBench, [MovingAverageCircularBuffer, p3_window_size, p3_data_stream_medium]);
runBenchmark('    Large (100K calls)', runMovingAverageBench, [MovingAverageCircularBuffer, p3_window_size, p3_data_stream_large]);

console.log('');

// --- Problem 4: Largest Rectangle in Histogram ---
console.log('Problem 4: Largest Rectangle in Histogram (Array Length)');
const p4_heights_small = generateRandomHeights(100, 1000);
const p4_heights_medium = generateRandomHeights(1000, 1000);
const p4_heights_large = generateRandomHeights(10000, 1000); // Up to 10^5 as per constraints

console.log('  Optimal Solution (Monotonic Stack)');
runBenchmark('    Small (N=100)', largestRectangleAreaOptimal, [p4_heights_small]);
runBenchmark('    Medium (N=1000)', largestRectangleAreaOptimal, [p4_heights_medium]);
runBenchmark('    Large (N=10000)', largestRectangleAreaOptimal, [p4_heights_large]);

console.log('  Brute Force Solution (N^2)');
runBenchmark('    Small (N=100)', largestRectangleAreaBruteForce, [p4_heights_small]);
runBenchmark('    Medium (N=1000)', largestRectangleAreaBruteForce, [p4_heights_medium]);
// runBenchmark('    Large (N=10000)', largestRectangleAreaBruteForce, [p4_heights_large]); // Will be extremely slow (N^2 or N^3)

console.log('');

// --- Problem 5: Min Stack ---
console.log('Problem 5: Min Stack (Number of Operations)');
const p5_ops_small = []; for (let i = 0; i < 100; i++) { p5_ops_small.push(['push', i % 5]); p5_ops_small.push(['getMin', null]); }
const p5_ops_medium = []; for (let i = 0; i < 1000; i++) { p5_ops_medium.push(['push', i % 10]); p5_ops_medium.push(['pop', null]); p5_ops_medium.push(['push', i % 5]); p5_ops_medium.push(['getMin', null]); }
const p5_ops_large = []; for (let i = 0; i < 10000; i++) { p5_ops_large.push(['push', i % 1000]); if (i % 2 === 0) p5_ops_large.push(['getMin', null]); if (i % 3 === 0 && i > 0) p5_ops_large.push(['pop', null]); }

function runMinStackBench(MinStackClass, ops) {
    const minStack = new MinStackClass();
    ops.forEach(([op, arg]) => {
        if (op === 'push') minStack.push(arg);
        else if (op === 'pop' && !minStack.dataStack.isEmpty()) minStack.pop(); // Ensure not to pop empty stack for benchmark stability
        else if (op === 'top' && !minStack.dataStack.isEmpty()) minStack.top();
        else if (op === 'getMin' && !minStack.dataStack.isEmpty()) minStack.getMin();
    });
}

console.log('  Optimal Solution (Auxiliary Stack)');
runBenchmark('    Small (100 ops)', runMinStackBench, [MinStackOptimal, p5_ops_small]);
runBenchmark('    Medium (1K ops)', runMinStackBench, [MinStackOptimal, p5_ops_medium]);
runBenchmark('    Large (10K ops)', runMinStackBench, [MinStackOptimal, p5_ops_large]);

console.log('  Memory Optimized Solution (Value-Min Pair)');
runBenchmark('    Small (100 ops)', runMinStackBench, [MinStackMemoryOptimized, p5_ops_small]);
runBenchmark('    Medium (1K ops)', runMinStackBench, [MinStackMemoryOptimized, p5_ops_medium]);
runBenchmark('    Large (10K ops)', runMinStackBench, [MinStackMemoryOptimized, p5_ops_large]);

console.log('  Diff Optimized Solution (Advanced Memory Savings)');
runBenchmark('    Small (100 ops)', runMinStackBench, [MinStackDiffOptimized, p5_ops_small]);
runBenchmark('    Medium (1K ops)', runMinStackBench, [MinStackDiffOptimized, p5_ops_medium]);
runBenchmark('    Large (10K ops)', runMinStackBench, [MinStackDiffOptimized, p5_ops_large]);

console.log('\n--- Benchmarks Complete ---');
```