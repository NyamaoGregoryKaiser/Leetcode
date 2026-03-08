```javascript
/**
 * @fileoverview Performance benchmarking script for Greedy Algorithms.
 * This script generates large random datasets and measures the execution
 * time of the implemented greedy algorithms to assess their performance
 * characteristics.
 */

const {
    activitySelection,
    fractionalKnapsack,
    jobSequencing,
    jobSequencingOptimized,
} = require('../src/greedyAlgorithms');

/**
 * Generates random activities for the Activity Selection Problem.
 * @param {number} count The number of activities to generate.
 * @param {number} maxTime The maximum possible start/end time for an activity.
 * @returns {Array<Object>} An array of random activity objects.
 */
function generateRandomActivities(count, maxTime) {
    const activities = [];
    for (let i = 0; i < count; i++) {
        let start = Math.floor(Math.random() * maxTime);
        let end = start + 1 + Math.floor(Math.random() * (maxTime - start)); // Ensure end > start
        activities.push({ start, end });
    }
    return activities;
}

/**
 * Generates random items for the Fractional Knapsack Problem.
 * @param {number} count The number of items to generate.
 * @param {number} maxValue The maximum value for an item.
 * @param {number} maxWeight The maximum weight for an item.
 * @returns {Array<Object>} An array of random item objects.
 */
function generateRandomKnapsackItems(count, maxValue, maxWeight) {
    const items = [];
    for (let i = 0; i < count; i++) {
        let value = Math.floor(Math.random() * maxValue) + 1; // Ensure value > 0
        let weight = Math.floor(Math.random() * maxWeight) + 1; // Ensure weight > 0
        items.push({ value, weight });
    }
    return items;
}

/**
 * Generates random jobs for the Job Sequencing with Deadlines Problem.
 * @param {number} count The number of jobs to generate.
 * @param {number} maxProfit The maximum profit for a job.
 * @param {number} maxDeadline The maximum deadline for a job.
 * @returns {Array<Object>} An array of random job objects.
 */
function generateRandomJobs(count, maxProfit, maxDeadline) {
    const jobs = [];
    for (let i = 0; i < count; i++) {
        jobs.push({
            id: `J${i}`,
            deadline: Math.floor(Math.random() * maxDeadline) + 1, // Deadline must be at least 1
            profit: Math.floor(Math.random() * maxProfit) + 1, // Profit must be at least 1
        });
    }
    return jobs;
}

/**
 * Runs a benchmark for a given algorithm function.
 * @param {string} name The name of the algorithm being benchmarked.
 * @param {Function} algorithmFn The algorithm function to test.
 * @param {Array<any>} args The arguments to pass to the algorithm function.
 * @param {number} runs The number of times to run the algorithm for averaging.
 */
function runBenchmark(name, algorithmFn, args, runs = 10) {
    let totalTime = 0;
    const startMemory = process.memoryUsage().heapUsed;

    for (let i = 0; i < runs; i++) {
        const startTime = process.hrtime.bigint();
        algorithmFn(...args);
        const endTime = process.hrtime.bigint();
        totalTime += Number(endTime - startTime) / 1_000_000; // Convert nanoseconds to milliseconds
    }

    const endMemory = process.memoryUsage().heapUsed;
    const memoryDiff = (endMemory - startMemory) / (1024 * 1024); // Convert bytes to MB

    console.log(`--- ${name} ---`);
    console.log(`  Average time: ${ (totalTime / runs).toFixed(4) } ms`);
    console.log(`  Memory usage (approx): ${ memoryDiff.toFixed(2) } MB (for data generation + execution)`);
    console.log('');
}

// --- Benchmark Configuration ---
const SMALL_N = 100;
const MEDIUM_N = 1000;
const LARGE_N = 10000;
const EXTRA_LARGE_N = 50000; // For Job Sequencing, max_deadline is often N
const MAX_TIME_ACTIVITY = 100000; // For activity selection, times can be large
const MAX_VALUE_KNAPSACK = 1000;
const MAX_WEIGHT_KNAPSACK = 200;
const MAX_KNAPSACK_CAPACITY_FACTOR = 0.5; // Capacity is X% of total possible weight
const MAX_PROFIT_JOB = 1000;
const MAX_DEADLINE_JOB_FACTOR = 0.5; // Max deadline is X% of N

console.log('Starting Greedy Algorithms Benchmarks...\n');

// --- Activity Selection Benchmarks ---
console.log('1. Activity Selection Problem');
let activitiesSmall = generateRandomActivities(SMALL_N, MAX_TIME_ACTIVITY);
runBenchmark(`Activity Selection (N=${SMALL_N})`, activitySelection, [activitiesSmall]);

let activitiesMedium = generateRandomActivities(MEDIUM_N, MAX_TIME_ACTIVITY);
runBenchmark(`Activity Selection (N=${MEDIUM_N})`, activitySelection, [activitiesMedium]);

let activitiesLarge = generateRandomActivities(LARGE_N, MAX_TIME_ACTIVITY);
runBenchmark(`Activity Selection (N=${LARGE_N})`, activitySelection, [activitiesLarge]);

console.log('---');

// --- Fractional Knapsack Benchmarks ---
console.log('2. Fractional Knapsack Problem');
let itemsSmall = generateRandomKnapsackItems(SMALL_N, MAX_VALUE_KNAPSACK, MAX_WEIGHT_KNAPSACK);
let capacitySmall = itemsSmall.reduce((sum, item) => sum + item.weight, 0) * MAX_KNAPSACK_CAPACITY_FACTOR;
runBenchmark(`Fractional Knapsack (N=${SMALL_N})`, fractionalKnapsack, [itemsSmall, capacitySmall]);

let itemsMedium = generateRandomKnapsackItems(MEDIUM_N, MAX_VALUE_KNAPSACK, MAX_WEIGHT_KNAPSACK);
let capacityMedium = itemsMedium.reduce((sum, item) => sum + item.weight, 0) * MAX_KNAPSACK_CAPACITY_FACTOR;
runBenchmark(`Fractional Knapsack (N=${MEDIUM_N})`, fractionalKnapsack, [itemsMedium, capacityMedium]);

let itemsLarge = generateRandomKnapsackItems(LARGE_N, MAX_VALUE_KNAPSACK, MAX_WEIGHT_KNAPSACK);
let capacityLarge = itemsLarge.reduce((sum, item) => sum + item.weight, 0) * MAX_KNAPSACK_CAPACITY_FACTOR;
runBenchmark(`Fractional Knapsack (N=${LARGE_N})`, fractionalKnapsack, [itemsLarge, capacityLarge]);

console.log('---');

// --- Job Sequencing with Deadlines Benchmarks ---
console.log('3. Job Sequencing with Deadlines Problem');

// Small N, max_deadline proportional to N
let jobsSmall = generateRandomJobs(SMALL_N, MAX_PROFIT_JOB, Math.floor(SMALL_N * MAX_DEADLINE_JOB_FACTOR));
runBenchmark(`Job Sequencing Simple (N=${SMALL_N}, D=${Math.floor(SMALL_N * MAX_DEADLINE_JOB_FACTOR)})`, jobSequencing, [jobsSmall]);
runBenchmark(`Job Sequencing DSU (N=${SMALL_N}, D=${Math.floor(SMALL_N * MAX_DEADLINE_JOB_FACTOR)})`, jobSequencingOptimized, [jobsSmall]);

// Medium N, max_deadline proportional to N
let jobsMedium = generateRandomJobs(MEDIUM_N, MAX_PROFIT_JOB, Math.floor(MEDIUM_N * MAX_DEADLINE_JOB_FACTOR));
runBenchmark(`Job Sequencing Simple (N=${MEDIUM_N}, D=${Math.floor(MEDIUM_N * MAX_DEADLINE_JOB_FACTOR)})`, jobSequencing, [jobsMedium]);
runBenchmark(`Job Sequencing DSU (N=${MEDIUM_N}, D=${Math.floor(MEDIUM_N * MAX_DEADLINE_JOB_FACTOR)})`, jobSequencingOptimized, [jobsMedium]);

// Large N, max_deadline proportional to N
// For large N, the simple job sequencing will likely be too slow (N*D ~ N^2)
console.log('\nBenchmarking Job Sequencing with larger N and D (Simple version might be very slow)...');
let jobsLargeForJS = generateRandomJobs(LARGE_N, MAX_PROFIT_JOB, Math.floor(LARGE_N * MAX_DEADLINE_JOB_FACTOR));
// console.log(`Job Sequencing Simple (N=${LARGE_N}, D=${Math.floor(LARGE_N * MAX_DEADLINE_JOB_FACTOR)})`);
// console.time(`Job Sequencing Simple (N=${LARGE_N})`);
// jobSequencing(jobsLargeForJS); // This might take a very long time (N^2 = 10^8 ops)
// console.timeEnd(`Job Sequencing Simple (N=${LARGE_N})`);
// console.log('  ^ Skipped simple version for N=10000 as it\'s too slow for practical benchmarking.\n');

runBenchmark(`Job Sequencing DSU (N=${LARGE_N}, D=${Math.floor(LARGE_N * MAX_DEADLINE_JOB_FACTOR)})`, jobSequencingOptimized, [jobsLargeForJS]);

// Extreme N for DSU to show its efficiency
let jobsExtraLarge = generateRandomJobs(EXTRA_LARGE_N, MAX_PROFIT_JOB, Math.floor(EXTRA_LARGE_N * MAX_DEADLINE_JOB_FACTOR));
runBenchmark(`Job Sequencing DSU (N=${EXTRA_LARGE_N}, D=${Math.floor(EXTRA_LARGE_N * MAX_DEADLINE_JOB_FACTOR)})`, jobSequencingOptimized, [jobsExtraLarge]);

console.log('\nGreedy Algorithms Benchmarks Complete.');
```