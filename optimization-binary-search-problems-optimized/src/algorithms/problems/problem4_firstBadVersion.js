/**
 * @fileoverview Problem 4: First Bad Version.
 * You are a product manager and currently leading a team to develop a new product.
 * Unfortunately, the latest version of your product fails the quality check.
 * Since each version is developed based on the previous version, all versions after a bad version are also bad.
 *
 * Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one,
 * which causes all the following ones to be bad.
 *
 * You are given an API `bool isBadVersion(version)` which returns whether `version` is bad.
 * Implement a function to find the first bad version.
 * You should minimize the number of calls to the API.
 */

/**
 * Finds the first bad version using binary search.
 * This is a classic "binary search on the answer" problem where we search for a boundary.
 * The `isBadVersion` API function defines a monotonic property: if a version is bad,
 * all subsequent versions are also bad.
 *
 * Time Complexity: O(log N) - Each call to `isBadVersion` takes O(1) time, and we perform
 *                    log N calls to narrow down the search space.
 * Space Complexity: O(1) - Constant space used.
 *
 * @param {number} n The total number of versions.
 * @param {function(number): boolean} isBadVersion An API function that takes a version number
 *                                                (1-indexed) and returns true if it's bad, false otherwise.
 * @returns {number} The version number of the first bad version.
 */
function firstBadVersion(n, isBadVersion) {
    if (n <= 0) {
        throw new Error("Number of versions must be positive.");
    }

    let low = 1; // Versions are 1-indexed
    let high = n;
    let firstBad = n; // Initialize with a worst-case guess (all versions are good until n-1, n is bad)

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);

        if (isBadVersion(mid)) {
            // `mid` is a bad version. It might be the first bad version,
            // or an earlier version could also be bad.
            firstBad = mid; // Store mid as a potential answer
            high = mid - 1; // Search in the left half for an even earlier bad version
        } else {
            // `mid` is a good version. All versions up to `mid` are good.
            // The first bad version must be after `mid`.
            low = mid + 1; // Search in the right half
        }
    }

    // When the loop terminates, `firstBad` will hold the smallest version number
    // that returned true for `isBadVersion`.
    return firstBad;
}

module.exports = {
    firstBadVersion
};