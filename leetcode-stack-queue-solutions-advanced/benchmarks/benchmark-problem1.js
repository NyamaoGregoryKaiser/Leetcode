/**
 * @file Performance benchmark for the Valid Parentheses problem.
 * @module benchmarks/problem1
 */

const { Suite } = require('benchmark');
const validParentheses = require('../src/problems/problem1-valid-parentheses/validParentheses');

// --- Test Cases for Benchmarking ---

// Case 1: Short valid string
const shortValid = "()[]{}";

// Case 2: Short invalid string
const shortInvalid = "([)]";

// Case 3: Long valid string (alternating pairs)
const longValid1 = "()".repeat(10000); // "()()...()"

// Case 4: Long valid string (deeply nested)
let deeplyNestedValid = "";
for (let i = 0; i < 5000; i++) {
    deeplyNestedValid += "[";
}
for (let i = 0; i < 5000; i++) {
    deeplyNestedValid += "]";
} // "[[[...]]]"

// Case 5: Long invalid string (only opening brackets)
const longInvalid1 = "(".repeat(10000);

// Case 6: Long invalid string (only closing brackets)
const longInvalid2 = ")".repeat(10000);

// Case 7: Long complex valid string
let complexValid = "";
for (let i = 0; i < 2500; i++) {
    complexValid += "{([])}";
} // "{([])}{([])}..."

// --- Benchmark Suite ---

const suite = new Suite('Valid Parentheses');

suite
    .add('validParentheses - Short Valid', () => {
        validParentheses(shortValid);
    })
    .add('validParentheses - Short Invalid', () => {
        validParentheses(shortInvalid);
    })
    .add('validParentheses - Long Valid (Alternating)', () => {
        validParentheses(longValid1);
    })
    .add('validParentheses - Long Valid (Deeply Nested)', () => {
        validParentheses(deeplyNestedValid);
    })
    .add('validParentheses - Long Invalid (Only Open)', () => {
        validParentheses(longInvalid1);
    })
    .add('validParentheses - Long Invalid (Only Close)', () => {
        validParentheses(longInvalid2);
    })
    .add('validParentheses - Long Complex Valid', () => {
        validParentheses(complexValid);
    })
    // Add listeners to report results
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('--- Valid Parentheses Benchmark Results ---');
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('-----------------------------------------');
    })
    // Run async
    .run({ 'async': true });