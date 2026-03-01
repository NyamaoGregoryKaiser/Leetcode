/**
 * @file Performance benchmark for the Sliding Window Maximum problem, comparing brute force vs. optimal.
 * @module benchmarks/problem3
 */

const { Suite } = require('benchmark');
const slidingWindowMaximum = require('../src/problems/problem3-sliding-window-maximum/slidingWindowMaximum');
const slidingWindowMaximumBruteForce = require('../src/problems/problem3-sliding-window-maximum/slidingWindowMaximumBruteForce');

// --- Test Cases for Benchmarking ---

// Generate a large array for testing
function generateArray(size, type = 'random') {
    const arr = new Array(size);
    if (type === 'random') {
        for (let i = 0; i < size; i++) {
            arr[i] = Math.floor(Math.random() * 2 * size) - size; // Numbers between -size and size
        }
    } else if (type === 'increasing') {
        for (let i = 0; i < size; i++) {
            arr[i] = i;
        }
    } else if (type === 'decreasing') {
        for (let i = 0; i < size; i++) {
            arr[i] = size - i;
        }
    } else if (type === 'constant') {
        for (let i = 0; i < size; i++) {
            arr[i] = 100;
        }
    }
    return arr;
}

const N_SMALL = 1000;
const N_MEDIUM = 10000;
const N_LARGE = 100000;

// Benchmarking with varying N and K
const dataSmallN_SmallK = generateArray(N_SMALL); // N=1000
const kSmall = 10;

const dataMediumN_SmallK = generateArray(N_MEDIUM); // N=10000
const kMedium = 100;

const dataLargeN_MediumK = generateArray(N_LARGE); // N=100000
const kLarge = 1000;

// Edge case: k is very small (k=1, should be O(N) for both, or faster if optimized)
const dataSmallN_K1 = generateArray(N_SMALL);
const k1 = 1;

// Edge case: k is very large (k ~ N, should be O(N) for optimal, O(N^2) for brute)
const dataSmallN_LargeK = generateArray(N_SMALL);
const kNearlyN = N_SMALL - 1;


// --- Benchmark Suite ---

const suite = new Suite('Sliding Window Maximum');

suite
    .add(`Brute Force (N=${N_SMALL}, K=${kSmall})`, () => {
        slidingWindowMaximumBruteForce(dataSmallN_SmallK, kSmall);
    })
    .add(`Optimal (N=${N_SMALL}, K=${kSmall})`, () => {
        slidingWindowMaximum(dataSmallN_SmallK, kSmall);
    })
    .add(`Brute Force (N=${N_MEDIUM}, K=${kMedium})`, () => {
        slidingWindowMaximumBruteForce(dataMediumN_SmallK, kMedium);
    })
    .add(`Optimal (N=${N_MEDIUM}, K=${kMedium})`, () => {
        slidingWindowMaximum(dataMediumN_SmallK, kMedium);
    })
    // Add for large N, medium K. Brute force would be too slow here.
    // Commenting out brute force for N_LARGE as it would likely hang or take too long.
    // .add(`Brute Force (N=${N_LARGE}, K=${kLarge})`, () => {
    //     slidingWindowMaximumBruteForce(dataLargeN_MediumK, kLarge);
    // })
    .add(`Optimal (N=${N_LARGE}, K=${kLarge})`, () => {
        slidingWindowMaximum(dataLargeN_MediumK, kLarge);
    })
    .add(`Brute Force (N=${N_SMALL}, K=1)`, () => {
        slidingWindowMaximumBruteForce(dataSmallN_K1, k1);
    })
    .add(`Optimal (N=${N_SMALL}, K=1)`, () => {
        slidingWindowMaximum(dataSmallN_K1, k1);
    })
    .add(`Brute Force (N=${N_SMALL}, K~N)`, () => {
        slidingWindowMaximumBruteForce(dataSmallN_LargeK, kNearlyN);
    })
    .add(`Optimal (N=${N_SMALL}, K~N)`, () => {
        slidingWindowMaximum(dataSmallN_LargeK, kNearlyN);
    })
    // Add listeners to report results
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('--- Sliding Window Maximum Benchmark Results ---');
        console.log('Comparison: Optimal vs. Brute Force');
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('------------------------------------------------');
    })
    // Run async
    .run({ 'async': true });