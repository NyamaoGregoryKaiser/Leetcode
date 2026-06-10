```javascript
/**
 * @fileoverview Performance benchmarking script for selected Greedy Algorithms.
 * This script measures the execution time of different algorithms with varying
 * input sizes to observe their performance characteristics.
 */

import activitySelection from '../src/problems/activitySelection';
import fractionalKnapsack from '../src/problems/fractionalKnapsack';
import coinChangeGreedy from '../src/problems/coinChange'; // Note: Greedy may not be optimal for all systems
import jobSequencing from '../src/problems/jobSequencing';
import canCompleteCircuit from '../src/problems/gasStationProblem';

// --- Helper for generating test data ---

/**
 * Generates an array of random activities.
 * @param {number} count - Number of activities.
 * @param {number} maxTime - Maximum possible start/finish time.
 * @returns {Array<Object>} Array of activity objects.
 */
function generateActivities(count, maxTime) {
  const activities = [];
  for (let i = 0; i < count; i++) {
    const start = Math.floor(Math.random() * maxTime);
    const finish = start + Math.floor(Math.random() * (maxTime / 5)) + 1; // Finish always > start
    activities.push({ id: `A${i}`, start, finish });
  }
  return activities;
}

/**
 * Generates an array of random knapsack items.
 * @param {number} count - Number of items.
 * @param {number} maxWeight - Maximum possible item weight.
 * @param {number} maxValue - Maximum possible item value.
 * @returns {Array<Object>} Array of item objects.
 */
function generateKnapsackItems(count, maxWeight, maxValue) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const weight = Math.floor(Math.random() * maxWeight) + 1;
    const value = Math.floor(Math.random() * maxValue) + 1;
    items.push({ id: `I${i}`, weight, value });
  }
  return items;
}

/**
 * Generates a set of coin denominations (canonical-like for greedy to work better).
 * @param {number} maxDenomination - Maximum value for a denomination.
 * @param {number} count - Number of denominations.
 * @returns {Array<number>} Array of denominations.
 */
function generateDenominations(count, maxDenomination) {
  const denominations = new Set();
  denominations.add(1); // Always include 1 for solvability
  while (denominations.size < count) {
    denominations.add(Math.floor(Math.random() * maxDenomination) + 2);
  }
  return Array.from(denominations).sort((a,b) => b-a); // Sort desc
}

/**
 * Generates an array of random jobs for sequencing.
 * @param {number} count - Number of jobs.
 * @param {number} maxDeadline - Maximum possible deadline.
 * @param {number} maxProfit - Maximum possible profit.
 * @returns {Array<Object>} Array of job objects.
 */
function generateJobs(count, maxDeadline, maxProfit) {
  const jobs = [];
  for (let i = 0; i < count; i++) {
    const deadline = Math.floor(Math.random() * maxDeadline) + 1;
    const profit = Math.floor(Math.random() * maxProfit) + 1;
    jobs.push({ id: `J${i}`, deadline, profit });
  }
  return jobs;
}

/**
 * Generates gas and cost arrays for the Gas Station problem.
 * Ensures a solution exists by balancing total gas and cost.
 * @param {number} count - Number of stations.
 * @param {number} maxAmount - Maximum gas/cost at a station.
 * @returns {Object} { gas: Array<number>, cost: Array<number> }
 */
function generateGasStationData(count, maxAmount) {
  let gas = [];
  let cost = [];
  let totalGas = 0;
  let totalCost = 0;

  for (let i = 0; i < count; i++) {
    const g = Math.floor(Math.random() * maxAmount) + 1;
    const c = Math.floor(Math.random() * maxAmount) + 1;
    gas.push(g);
    cost.push(c);
    totalGas += g;
    totalCost += c;
  }

  // Adjust to ensure totalGas >= totalCost for a solvable problem
  if (totalGas < totalCost) {
    const diff = totalCost - totalGas;
    // Add difference to a random gas station to make it solvable
    const randomIndex = Math.floor(Math.random() * count);
    gas[randomIndex] += diff;
  }

  return { gas, cost };
}

// --- Benchmarking function ---

/**
 * Runs a benchmark for a given algorithm.
 * @param {string} name - Name of the algorithm.
 * @param {function} algorithmFn - The algorithm function to test.
 * @param {Array<Object>} testCases - Array of objects, each containing { size: number, input: Array<any> }.
 */
function runBenchmark(name, algorithmFn, testCases) {
  console.log(`\n--- Benchmarking ${name} ---`);
  testCases.forEach(({ size, input }) => {
    const startTime = process.hrtime.bigint();
    let result;
    try {
      if (Array.isArray(input)) {
        // Handle cases like gas, cost for canCompleteCircuit
        if (name.includes('Gas Station')) {
          result = algorithmFn(input[0], input[1]);
        } else if (name.includes('Fractional Knapsack')) {
          result = algorithmFn(input[0], input[1]);
        } else if (name.includes('Coin Change')) {
          result = algorithmFn(input[0], input[1]);
        }
        else {
          result = algorithmFn(input);
        }
      } else {
        result = algorithmFn(input);
      }
    } catch (e) {
      console.error(`Error during benchmark for ${name} (size ${size}):`, e);
      return;
    }
    const endTime = process.hrtime.bigint();
    const durationNs = endTime - startTime;
    const durationMs = Number(durationNs) / 1_000_000;
    console.log(`Size: ${size} | Time: ${durationMs.toFixed(3)} ms`);
    // Optional: Log a snippet of the result to ensure it ran
    // console.log('  Result sample:', JSON.stringify(result).substring(0, 100) + '...');
  });
}

// --- Define Test Sizes ---
const sizes = [100, 1000, 5000, 10000]; // Adjust as needed for local machine performance

// --- Generate Test Data and Run Benchmarks ---
async function main() {
  console.log('Starting Greedy Algorithms Benchmarks...');

  // 1. Activity Selection
  const activityTestCases = sizes.map(size => ({
    size,
    input: generateActivities(size, size * 2)
  }));
  runBenchmark('Activity Selection', activitySelection, activityTestCases);

  // 2. Fractional Knapsack
  const knapsackTestCases = sizes.map(size => ({
    size,
    input: [size * 100, generateKnapsackItems(size, size / 2, size * 5)] // Capacity depends on size
  }));
  runBenchmark('Fractional Knapsack', fractionalKnapsack, knapsackTestCases);

  // 3. Coin Change (Greedy)
  const denominations = generateDenominations(10, 100); // Fixed denominations
  const coinChangeTestCases = sizes.map(size => ({
    size,
    input: [denominations, size * 1000] // Amount grows with size
  }));
  runBenchmark('Coin Change (Greedy)', coinChangeGreedy, coinChangeTestCases);

  // 4. Job Sequencing with Deadlines
  // Max deadline should ideally be related to N, not too large to avoid O(N*MaxD) slowdown
  const jobTestCases = sizes.map(size => ({
    size,
    input: generateJobs(size, Math.min(size, 500), size * 10) // Max deadline capped
  }));
  runBenchmark('Job Sequencing with Deadlines', jobSequencing, jobTestCases);

  // 5. Gas Station Problem
  const gasStationTestCases = sizes.map(size => ({
    size,
    input: [generateGasStationData(size, size * 5).gas, generateGasStationData(size, size * 5).cost]
  }));
  runBenchmark('Gas Station Problem', canCompleteCircuit, gasStationTestCases);

  console.log('\nBenchmarks finished.');
}

main().catch(console.error);
```