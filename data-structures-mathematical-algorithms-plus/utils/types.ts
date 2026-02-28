/**
 * utils/types.ts
 *
 * Defines custom types and interfaces used across the project.
 */

/**
 * Type for a generic square matrix (e.g., 2x2 for Fibonacci problem).
 * Represented as an array of arrays of numbers.
 */
export type Matrix = number[][];

/**
 * Interface for benchmark results.
 */
export interface BenchmarkResult {
    name: string;
    input: any; // Type of input can vary
    durationMs: number;
    error?: string; // For cases where a function might throw
}