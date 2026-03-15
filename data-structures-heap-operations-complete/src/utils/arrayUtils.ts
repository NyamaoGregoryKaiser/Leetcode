/**
 * Utility functions for array manipulations, particularly useful for heap implementations.
 */
export class ArrayUtils {

    /**
     * Swaps two elements in an array.
     * @param arr The array.
     * @param i Index of the first element.
     * @param j Index of the second element.
     */
    public static swap<T>(arr: T[], i: number, j: number): void {
        if (i < 0 || i >= arr.length || j < 0 || j >= arr.length) {
            throw new Error("Invalid indices for swap operation.");
        }
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    /**
     * Gets the parent index of a node in a binary heap.
     * @param i The current node's index.
     * @returns The parent's index.
     */
    public static getParentIndex(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    /**
     * Gets the left child index of a node in a binary heap.
     * @param i The current node's index.
     * @returns The left child's index.
     */
    public static getLeftChildIndex(i: number): number {
        return 2 * i + 1;
    }

    /**
     * Gets the right child index of a node in a binary heap.
     * @param i The current node's index.
     * @returns The right child's index.
     */
    public static getRightChildIndex(i: number): number {
        return 2 * i + 2;
    }
}