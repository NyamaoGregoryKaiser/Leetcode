```typescript
/**
 * @fileoverview Utility functions for array manipulation.
 */

/**
 * Swaps two elements in an array in-place.
 * @param arr The array.
 * @param i Index of the first element.
 * @param j Index of the second element.
 */
export function swap<T>(arr: T[], i: number, j: number): void {
    if (i < 0 || i >= arr.length || j < 0 || j >= arr.length) {
        throw new Error("Indices out of bounds for swap operation.");
    }
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Reverses a portion of an array in-place.
 * @param arr The array to reverse.
 * @param start The starting index (inclusive).
 * @param end The ending index (inclusive).
 */
export function reverseSubarray<T>(arr: T[], start: number, end: number): void {
    if (start < 0 || end >= arr.length || start > end) {
        throw new Error("Invalid start or end indices for subarray reversal.");
    }
    while (start < end) {
        swap(arr, start, end);
        start++;
        end--;
    }
}

/**
 * Generates an array of unique random numbers within a specified range.
 * @param count The number of unique random numbers to generate.
 * @param min The minimum value (inclusive).
 * @param max The maximum value (inclusive).
 * @returns An array of unique random numbers.
 * @throws Error if count is greater than the available unique numbers in the range.
 */
export function generateUniqueRandomArray(count: number, min: number, max: number): number[] {
    if (count > (max - min + 1)) {
        throw new Error("Cannot generate more unique numbers than the available range.");
    }
    const numbers = new Set<number>();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbers);
}

/**
 * Generates a sorted array of random integers.
 * @param count The number of elements in the array.
 * @param min The minimum value for elements.
 * @param max The maximum value for elements.
 * @returns A sorted array of random integers.
 */
export function generateSortedRandomArray(count: number, min: number, max: number): number[] {
    const arr: number[] = [];
    for (let i = 0; i < count; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr.sort((a, b) => a - b);
}

/**
 * Deep clones an array (handles nested arrays/objects if they are plain).
 * For complex objects, a more robust deep clone might be needed.
 * @param arr The array to clone.
 * @returns A deep clone of the array.
 */
export function deepCloneArray<T>(arr: T[]): T[] {
    return JSON.parse(JSON.stringify(arr));
}
```