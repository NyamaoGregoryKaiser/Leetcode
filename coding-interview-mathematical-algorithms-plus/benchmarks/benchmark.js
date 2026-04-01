```javascript
/**
 * benchmarks/benchmark.js
 *
 * This script uses the 'benchmark.js' library to compare the performance of
 * optimal algorithms (from src/problems.js) against their brute-force counterparts
 * (from src/bruteForceProblems.js).
 *
 * To run: `npm run benchmark`
 */

const Benchmark = require('benchmark');
const chalk = require('chalk');

// Import optimal solutions
const {
    gcd,
    sieveOfEratosthenes,
    power,
    nthFibonacci,
    combinations
} = require('../src/problems');

// Import brute-force solutions
const {
    gcdBruteForce,
    sieveOfEratosthenesBruteForce,
    powerBruteForce,
    nthFibonacciRecursive,
    combinationsBruteForce
} = require('../src/bruteForceProblems');

console.log(chalk.bold.blue('--- Math Problems Benchmarks (Optimal vs. Brute-Force) ---\n'));

// --- GCD Benchmark ---
console.log(chalk.bold.yellow('Benchmarking GCD (Greatest Common Divisor):\n'));
const gcdSuite = new Benchmark.Suite;

// Test with moderately large, non-trivial numbers
const gcd_a = 9876543210;
const gcd_b = 1234567890;

gcdSuite
    .add('GCD Optimal (Euclidean)', function() {
        gcd(gcd_a, gcd_b);
    })
    .add('GCD Brute Force', function() {
        gcdBruteForce(gcd_a, gcd_b);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log(chalk.green('Fastest is ') + chalk.bold.green(this.filter('fastest').map('name')) + '\n');
    })
    .run({ 'async': true });


// --- Sieve of Eratosthenes Benchmark ---
console.log(chalk.bold.yellow('Benchmarking Sieve of Eratosthenes (Prime Numbers):\n'));
const sieveSuite = new Benchmark.Suite;

const sieve_limit = 10000; // Find primes up to 10,000

sieveSuite
    .add('Sieve Optimal (Eratosthenes)', function() {
        sieveOfEratosthenes(sieve_limit);
    })
    .add('Sieve Brute Force (Trial Division)', function() {
        sieveOfEratosthenesBruteForce(sieve_limit);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log(chalk.green('Fastest is ') + chalk.bold.green(this.filter('fastest').map('name')) + '\n');
    })
    .run({ 'async': true });

// --- Power Function Benchmark ---
console.log(chalk.bold.yellow('Benchmarking Power Function (x^n):\n'));
const powerSuite = new Benchmark.Suite;

const power_base = 2;
const power_exp = 30; // A significant exponent

powerSuite
    .add('Power Optimal (Binary Exponentiation)', function() {
        power(power_base, power_exp);
    })
    .add('Power Brute Force', function() {
        powerBruteForce(power_base, power_exp);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log(chalk.green('Fastest is ') + chalk.bold.green(this.filter('fastest').map('name')) + '\n');
    })
    .run({ 'async': true });


// --- Nth Fibonacci Number Benchmark ---
console.log(chalk.bold.yellow('Benchmarking Nth Fibonacci Number:\n'));
const fibSuite = new Benchmark.Suite;

// Note: nthFibonacciRecursive becomes *extremely* slow for N >= 30-40.
// Choosing a moderate N to allow the recursive version to complete without crashing.
const fib_n = 20;

fibSuite
    .add('Fibonacci Optimal (Iterative DP)', function() {
        nthFibonacci(fib_n);
    })
    .add('Fibonacci Brute Force (Recursive)', function() {
        // For very large N, this will cause stack overflow or take too long.
        // It's intentionally chosen to show the exponential difference.
        nthFibonacciRecursive(fib_n);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log(chalk.green('Fastest is ') + chalk.bold.green(this.filter('fastest').map('name')) + '\n');
    })
    .run({ 'async': true });


// --- Combinations (N choose K) Benchmark ---
console.log(chalk.bold.yellow('Benchmarking Combinations (N choose K):\n'));
const combinationsSuite = new Benchmark.Suite;

const comb_n = 30;
const comb_k = 15; // C(30, 15) is a large number of combinations

combinationsSuite
    .add('Combinations Optimal', function() {
        combinations(comb_n, comb_k);
    })
    .add('Combinations Brute Force (Factorial)', function() {
        // This might exceed MAX_SAFE_INTEGER for intermediate factorials
        // even if the final result fits. For benchmarking, we assume it works.
        combinationsBruteForce(comb_n, comb_k);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log(chalk.green('Fastest is ') + chalk.bold.green(this.filter('fastest').map('name')) + '\n');
    })
    .run({ 'async': true });

console.log(chalk.bold.blue('--- Benchmarking Complete ---\n'));
```