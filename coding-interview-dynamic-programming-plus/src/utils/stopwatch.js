/**
 * @fileoverview A simple utility to measure execution time of functions.
 */

class Stopwatch {
    constructor() {
        this.startTime = null;
        this.endTime = null;
    }

    /**
     * Starts the stopwatch.
     */
    start() {
        this.startTime = process.hrtime.bigint();
        this.endTime = null; // Reset end time
    }

    /**
     * Stops the stopwatch and returns the elapsed time in milliseconds.
     * @returns {number} The elapsed time in milliseconds.
     */
    stop() {
        if (this.startTime === null) {
            throw new Error("Stopwatch has not been started.");
        }
        this.endTime = process.hrtime.bigint();
        const nanoseconds = this.endTime - this.startTime;
        return Number(nanoseconds) / 1_000_000; // Convert nanoseconds to milliseconds
    }

    /**
     * Measures the execution time of a given function.
     * @param {function} func The function to measure.
     * @param {Array<any>} args Arguments to pass to the function.
     * @returns {{result: any, time: number}} An object containing the function's return value and execution time in ms.
     */
    measure(func, ...args) {
        this.start();
        const result = func(...args);
        const time = this.stop();
        return { result, time };
    }
}

module.exports = Stopwatch;