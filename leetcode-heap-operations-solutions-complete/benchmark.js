// benchmark.js
const {heapSort} = require('./heap');
const {performance} = require('perf_hooks');

function benchmarkHeapSort(arrSize) {
  const arr = Array.from({length: arrSize}, () => Math.floor(Math.random() * 1000));
  const t0 = performance.now();
  heapSort(arr);
  const t1 = performance.now();
  console.log(`Heap Sort (${arrSize} elements): ${t1 - t0} ms`);
}


benchmarkHeapSort(1000);
benchmarkHeapSort(10000);
benchmarkHeapSort(100000);


//Add benchmarking for other algorithms