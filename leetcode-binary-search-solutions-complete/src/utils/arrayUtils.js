```javascript
/**
 * src/utils/arrayUtils.js
 * A collection of utility functions for array manipulation.
 */

class ArrayUtils {

    /**
     * Generates a sorted array of numbers.
     * @param {number} size - The desired size of the array.
     * @param {number} [start=0] - The starting number.
     * @param {number} [step=1] - The step between numbers.
     * @returns {number[]} A sorted array.
     */
    static generateSortedArray(size, start = 0, step = 1) {
        if (size <= 0) return [];
        return Array.from({ length: size }, (_, i) => start + i * step);
    }

    /**
     * Generates a sorted array with a specified number of duplicates.
     * @param {number} size - The total size of the array.
     * @param {number} duplicateValue - The value to duplicate.
     * @param {number} duplicateCount - How many times to duplicate the value.
     * @param {number} [start=0] - The starting number for non-duplicate elements.
     * @returns {number[]} A sorted array with duplicates.
     */
    static generateSortedArrayWithDuplicates(size, duplicateValue, duplicateCount, start = 0) {
        if (size <= 0) return [];
        if (duplicateCount > size) duplicateCount = size;

        let arr = [];
        let uniqueCount = size - duplicateCount;
        let uniqueElements = [];

        // Generate unique elements ensuring `duplicateValue` is not naturally generated
        let current = start;
        while (uniqueElements.length < uniqueCount) {
            if (current !== duplicateValue) {
                uniqueElements.push(current);
            }
            current++;
        }

        // Add duplicate values
        for (let i = 0; i < duplicateCount; i++) {
            arr.push(duplicateValue);
        }

        arr = arr.concat(uniqueElements);
        arr.sort((a, b) => a - b); // Ensure it's sorted after adding duplicates

        return arr;
    }

    /**
     * Generates a rotated sorted array.
     * Example: [0,1,2,4,5,6,7] rotated by 3 -> [4,5,6,7,0,1,2]
     * @param {number} size - The size of the array.
     * @param {number} [pivotIndex] - The index after which the array is rotated.
     *                                 If not provided, a random pivot is chosen.
     * @param {number} [start=0] - The starting value for the sorted sequence.
     * @returns {number[]} A rotated sorted array.
     */
    static generateRotatedSortedArray(size, pivotIndex = null, start = 0) {
        if (size <= 0) return [];
        const originalArray = ArrayUtils.generateSortedArray(size, start);

        if (size < 2) return originalArray;

        const effectivePivotIndex = pivotIndex !== null && pivotIndex >= 0 && pivotIndex < size
            ? pivotIndex
            : Math.floor(Math.random() * (size - 1)) + 1; // Ensure pivot is not 0 or size

        const firstPart = originalArray.slice(effectivePivotIndex);
        const secondPart = originalArray.slice(0, effectivePivotIndex);

        return firstPart.concat(secondPart);
    }

    /**
     * Checks if an array is sorted in ascending order.
     * @param {number[]} arr - The array to check.
     * @returns {boolean} True if sorted, false otherwise.
     */
    static isSorted(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Shuffles an array in place (Fisher-Yates algorithm).
     * @param {Array} arr - The array to shuffle.
     * @returns {Array} The shuffled array (same reference).
     */
    static shuffle(arr) {
        let currentIndex = arr.length;
        let randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }
        return arr;
    }
}

module.exports = ArrayUtils;
```