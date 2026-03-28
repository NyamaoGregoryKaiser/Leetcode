```typescript
/**
 * @file implementations/brute-force-problems.ts
 * @description Contains brute-force (less optimized) solutions for selected
 * hash table problems, primarily for comparison with the optimized hash table
 * approaches.
 */

import { getAnagramKey } from '../src/utils';

/**
 * Brute-force solution for Two Sum.
 * Iterates through all possible pairs of numbers in the array.
 *
 * Time Complexity: O(N^2)
 *   - Nested loops, where N is the length of the array.
 * Space Complexity: O(1)
 *   - No auxiliary data structures are used beyond output storage.
 *
 * @param nums The array of integers.
 * @param target The target sum.
 * @returns An array `[index1, index2]` of the two indices.
 */
export function twoSumBruteForce(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) { // Start j from i+1 to avoid using same element twice
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    // According to problem statement, there's always exactly one solution.
    return [];
}

/**
 * Brute-force solution for Group Anagrams.
 * Compares each string to every other string to check if they are anagrams.
 * This approach can be tricky to implement efficiently without a hash map
 * because once a string is grouped, it shouldn't be processed again.
 *
 * A common brute-force thought process:
 * 1. Initialize an empty list of groups.
 * 2. Keep track of visited strings using a boolean array or set of indices.
 * 3. Iterate through each string `strs[i]`:
 *    a. If `strs[i]` has already been visited, skip.
 *    b. Start a new group `currentGroup` with `strs[i]`. Mark `strs[i]` as visited.
 *    c. Iterate through `strs[j]` (where `j > i`):
 *       i. If `strs[j]` has already been visited, skip.
 *       ii. Check if `strs[i]` and `strs[j]` are anagrams (e.g., by sorting both and comparing).
 *       iii. If they are anagrams, add `strs[j]` to `currentGroup` and mark `strs[j]` as visited.
 *    d. Add `currentGroup` to the list of all groups.
 *
 * Time Complexity: O(N^2 * L log L)
 *   - N: number of strings.
 *   - L: average length of a string.
 *   - Outer loop iterates N times.
 *   - Inner loop iterates N times.
 *   - Anagram check (sorting strings): O(L log L).
 *   - Total: N * N * L log L = O(N^2 * L log L).
 * Space Complexity: O(N * L) for storing results and potentially visited flags,
 *   and O(L) for sorting temporary strings during anagram checks.
 *
 * @param strs The array of strings.
 * @returns A 2D array of strings where each inner array contains anagrams.
 */
export function groupAnagramsBruteForce(strs: string[]): string[][] {
    const n = strs.length;
    if (n === 0) {
        return [];
    }

    const result: string[][] = [];
    const visited: boolean[] = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
        if (visited[i]) {
            continue;
        }

        const currentGroup: string[] = [];
        const currentStrSorted = getAnagramKey(strs[i]); // Canonical form for comparison

        currentGroup.push(strs[i]);
        visited[i] = true;

        for (let j = i + 1; j < n; j++) {
            if (visited[j]) {
                continue;
            }

            const otherStrSorted = getAnagramKey(strs[j]);

            if (currentStrSorted === otherStrSorted) {
                currentGroup.push(strs[j]);
                visited[j] = true;
            }
        }
        result.push(currentGroup);
    }

    return result;
}

/**
 * Brute-force solution for Contains Duplicate.
 * Compares each element with every other element to find duplicates.
 *
 * Time Complexity: O(N^2)
 *   - Nested loops, where N is the length of the array.
 * Space Complexity: O(1)
 *   - No auxiliary data structures are used.
 *
 * @param nums The array of integers.
 * @returns `true` if duplicates exist, `false` otherwise.
 */
export function containsDuplicateBruteForce(nums: number[]): boolean {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] === nums[j]) {
                return true;
            }
        }
    }
    return false;
}
```