/**
 * @fileoverview Utility functions for generating arrays for Binary Search problems.
 */

/**
 * Generates a sorted array of a given size with elements within a specified range.
 * @param {number} size The desired size of the array.
 * @param {number} [min=0] The minimum value for elements.
 * @param {number} [max=1000] The maximum value for elements.
 * @param {boolean} [allowDuplicates=true] Whether to allow duplicate numbers.
 * @returns {number[]} A sorted array.
 */
function generateSortedArray(size, min = 0, max = 1000, allowDuplicates = true) {
    if (size <= 0) {
        return [];
    }
    if (min > max) {
        throw new Error("Min cannot be greater than max.");
    }

    const arr = [];
    if (allowDuplicates) {
        for (let i = 0; i < size; i++) {
            arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
    } else {
        // Generate unique numbers if possible, fall back to duplicates if not enough range
        const uniqueSet = new Set();
        while (uniqueSet.size < size) {
            uniqueSet.add(Math.floor(Math.random() * (max - min + 1)) + min);
            if (uniqueSet.size === (max - min + 1) && uniqueSet.size < size) {
                console.warn("Not enough unique numbers in range, allowing duplicates.");
                return generateSortedArray(size, min, max, true); // Fallback to duplicates
            }
        }
        arr.push(...Array.from(uniqueSet));
    }

    arr.sort((a, b) => a - b);
    return arr;
}

/**
 * Generates a sorted array that has been rotated at a random pivot point.
 * @param {number} size The desired size of the array.
 * @param {number} [min=0] The minimum value for elements.
 * @param {number} [max=1000] The maximum value for elements.
 * @param {number} [rotationPoint=null] An optional specific index to rotate the array by. If null, a random point is chosen.
 * @returns {number[]} A rotated sorted array.
 */
function generateRotatedSortedArray(size, min = 0, max = 1000, rotationPoint = null) {
    if (size <= 0) {
        return [];
    }
    if (size === 1) {
        return generateSortedArray(1, min, max);
    }

    const sortedArr = generateSortedArray(size, min, max, true);

    const actualRotationPoint = rotationPoint !== null
        ? Math.max(0, Math.min(size - 1, rotationPoint)) // Clamp rotation point
        : Math.floor(Math.random() * size); // Random point

    // Perform the rotation
    // e.g., [0, 1, 2, 3, 4, 5] rotated by 3 -> [3, 4, 5, 0, 1, 2]
    // The part from rotationPoint to end, followed by the part from start to rotationPoint-1
    return sortedArr.slice(actualRotationPoint).concat(sortedArr.slice(0, actualRotationPoint));
}

/**
 * Creates an array that simulates the `isBadVersion` API.
 * The `badVersion` parameter determines the first bad version.
 * @param {number} n Total number of versions.
 * @param {number} firstBad Version number from which it becomes bad (1-indexed).
 * @returns {function(number): boolean} The `isBadVersion` API function.
 */
function createBadVersionAPI(n, firstBad) {
    if (firstBad < 1 || firstBad > n) {
        throw new Error(`First bad version ${firstBad} must be between 1 and ${n}.`);
    }
    return (version) => {
        return version >= firstBad;
    };
}


module.exports = {
    generateSortedArray,
    generateRotatedSortedArray,
    createBadVersionAPI
};