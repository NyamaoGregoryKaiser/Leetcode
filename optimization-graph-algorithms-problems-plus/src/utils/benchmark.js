/**
 * Executes a function and measures its execution time.
 * @param {Function} func - The function to benchmark.
 * @param {string} [description='Function execution'] - A description for the benchmark output.
 * @param {...any} args - Arguments to pass to the function.
 * @returns {*} The return value of the benchmarked function.
 *
 * Example:
 * timeExecution(() => myExpensiveFunction(data), 'My Expensive Function with large data');
 * timeExecution((a, b) => a + b, 'Simple Addition', 1, 2);
 */
function timeExecution(func, description = 'Function execution', ...args) {
    const startTime = process.hrtime.bigint(); // High-resolution timer
    const result = func(...args);
    const endTime = process.hrtime.bigint();
    const durationNs = endTime - startTime;
    const durationMs = Number(durationNs) / 1_000_000;

    console.log(`[BENCHMARK] ${description}: ${durationMs.toFixed(3)} ms`);
    return result;
}

/**
 * Executes a function multiple times and reports average execution time.
 * @param {Function} func - The function to benchmark.
 * @param {number} iterations - Number of times to run the function.
 * @param {string} [description='Function execution (avg)'] - A description for the benchmark output.
 * @param {...any} args - Arguments to pass to the function.
 * @returns {Array<*>} An array of return values from each function call.
 */
function timeExecutionAverage(func, iterations, description = 'Function execution (avg)', ...args) {
    if (iterations <= 0) {
        throw new Error("Iterations must be a positive number.");
    }

    let totalDurationNs = 0n;
    const results = [];

    for (let i = 0; i < iterations; i++) {
        const startTime = process.hrtime.bigint();
        const result = func(...args);
        const endTime = process.hrtime.bigint();
        totalDurationNs += (endTime - startTime);
        results.push(result);
    }

    const averageDurationNs = totalDurationNs / BigInt(iterations);
    const averageDurationMs = Number(averageDurationNs) / 1_000_000;

    console.log(`[BENCHMARK] ${description} (Avg over ${iterations} runs): ${averageDurationMs.toFixed(3)} ms`);
    return results;
}

module.exports = {
    timeExecution,
    timeExecutionAverage,
};