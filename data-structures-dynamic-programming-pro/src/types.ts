/**
 * src/types.ts
 *
 * Defines common types used across the project.
 */

/**
 * Represents a generic cache for memoization.
 * Keys can be strings (e.g., from unique function arguments) and values can be any type.
 */
export type MemoCache<T> = Map<string, T>;

/**
 * Type for an item in the 0/1 Knapsack problem.
 */
export interface KnapsackItem {
    weight: number;
    value: number;
}