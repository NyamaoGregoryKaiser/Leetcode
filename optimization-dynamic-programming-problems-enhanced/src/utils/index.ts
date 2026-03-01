/**
 * src/utils/index.ts
 *
 * This file can be used for common utility functions across the project.
 * For Dynamic Programming, specific helper functions are often integrated
 * directly within the algorithm for efficiency, but general utilities
 * could include things like array initialization or deep cloning.
 */

/**
 * Initializes a 2D array (matrix) with a specified value.
 * Useful for creating DP tables.
 *
 * @param rows Number of rows.
 * @param cols Number of columns.
 * @param initialValue The value to initialize each cell with.
 * @returns A 2D array filled with initialValue.
 */
export function initializeMatrix<T>(rows: number, cols: number, initialValue: T): T[][] {
    const matrix: T[][] = [];
    for (let i = 0; i < rows; i++) {
        matrix.push(Array(cols).fill(initialValue));
    }
    return matrix;
}

/**
 * Initializes a 1D array with a specified value.
 * Useful for creating 1D DP arrays or memoization caches.
 *
 * @param size The size of the array.
 * @param initialValue The value to initialize each element with.
 * @returns A 1D array filled with initialValue.
 */
export function initializeArray<T>(size: number, initialValue: T): T[] {
    return Array(size).fill(initialValue);
}

// No complex data structures are strictly needed for the chosen DP problems,
// as arrays and maps suffice for memoization/tabulation.