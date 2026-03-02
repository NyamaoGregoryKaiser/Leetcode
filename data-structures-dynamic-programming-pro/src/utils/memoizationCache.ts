/**
 * src/utils/memoizationCache.ts
 *
 * Provides a utility for creating and managing memoization caches.
 */

import { MemoCache } from '../types';

/**
 * Creates a new, empty memoization cache.
 * @returns A Map instance to be used as a cache.
 */
export function createMemoCache<T>(): MemoCache<T> {
    return new Map<string, T>();
}

/**
 * Generates a unique string key from an array of arguments for memoization.
 * This is useful for functions that take multiple primitives as arguments.
 * @param args - An array of arguments.
 * @returns A string representation of the arguments.
 */
export function getMemoKey(...args: (string | number | boolean | null | undefined)[]): string {
    return args.map(arg => String(arg)).join('_');
}