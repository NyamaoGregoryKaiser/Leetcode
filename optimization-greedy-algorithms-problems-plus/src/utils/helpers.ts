```typescript
/**
 * src/utils/helpers.ts
 *
 * This file contains various helper utilities that might be useful across different algorithm implementations
 * or testing scenarios.
 */

/**
 * Generates a random integer within a specified range (inclusive).
 * @param min The minimum value (inclusive).
 * @param max The maximum value (inclusive).
 * @returns A random integer.
 */
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffles an array in-place using the Fisher-Yates (Knuth) algorithm.
 * @param array The array to shuffle.
 * @returns The shuffled array.
 */
export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 swap
    }
    return array;
}

/**
 * Creates a deep copy of a JSON-serializable object or array.
 * Useful for ensuring test cases don't mutate original input data.
 * NOTE: This is a simple deep copy and won't work for functions, Dates, Maps, Sets, etc.
 * For complex objects, consider libraries like `lodash.clonedeep`.
 * @param obj The object or array to deep copy.
 * @returns A deep copy of the object/array.
 */
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Measures the execution time of a function.
 * @param func The function to measure.
 * @param args Arguments to pass to the function.
 * @returns An object containing the result of the function and its execution time in milliseconds.
 */
export function measureExecutionTime<T>(func: (...args: any[]) => T, ...args: any[]): { result: T, timeMs: number } {
    const start = process.hrtime.bigint();
    const result = func(...args);
    const end = process.hrtime.bigint();
    const timeMs = Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
    return { result, timeMs };
}

/**
 * Formats a number to a fixed number of decimal places.
 * @param num The number to format.
 * @param decimals The number of decimal places.
 * @returns The formatted string.
 */
export function toFixed(num: number, decimals: number): number {
    return parseFloat(num.toFixed(decimals));
}

/**
 * Generates a range of numbers.
 * @param start The starting number (inclusive).
 * @param end The ending number (exclusive).
 * @returns An array of numbers.
 */
export function range(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, i) => start + i);
}

/**
 * Checks if an array is sorted in ascending order.
 * @param arr The array to check.
 * @param comparator An optional comparator function (like Array.prototype.sort).
 * @returns True if sorted, false otherwise.
 */
export function isSorted<T>(arr: T[], comparator?: (a: T, b: T) => number): boolean {
    if (arr.length <= 1) {
        return true;
    }
    for (let i = 0; i < arr.length - 1; i++) {
        if (comparator) {
            if (comparator(arr[i], arr[i + 1]) > 0) {
                return false;
            }
        } else {
            // Default ascending comparison
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
    }
    return true;
}
```