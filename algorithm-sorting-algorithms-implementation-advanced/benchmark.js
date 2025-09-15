// benchmark.js
const { mergeSort } = require('./algorithms'); //Import other algorithms
const { generateRandomArray } = require('./utils');

const n = 10000;
const arr = generateRandomArray(n, 1000);

console.time('mergeSort');
mergeSort(arr.slice()); //Use slice to avoid modifying original array
console.timeEnd('mergeSort');

//Benchmark other algorithms similarly