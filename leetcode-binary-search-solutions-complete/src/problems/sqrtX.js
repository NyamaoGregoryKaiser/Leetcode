```javascript
/**
 * src/problems/sqrtX.js
 * Implements the integer square root function using binary search.
 */

/**
 * Sqrt(x) (Optimized - Binary Search on the Answer)
 *
 * Computes and returns the integer square root of `x`.
 * The decimal digits are truncated, and only the integer part of the result is returned.
 * `x` is guaranteed to be a non-negative integer.
 *
 * This problem is a classic example of "Binary Search on the Answer".
 * We are not searching for an element in a sorted array, but rather for a value `k`
 * such that `k*k <= x` and `(k+1)*(k+1) > x`. The search space for `k` is `[0, x]`.
 *
 * @param {number} x - The non-negative integer for which to compute the square root.
 * @returns {number} The integer part of the square root of x.
 *
 * Time Complexity: O(log X) - The search space is `[0, X]`, and we halve it in each iteration.
 * Space Complexity: O(1) - Uses a constant amount of extra space for pointers.
 */
function mySqrt(x) {
    if (x < 0) {
        throw new Error("Input must be a non-negative integer.");
    }
    if (x === 0 || x === 1) {
        return x;
    }

    let left = 1; // Square root of 0 is 0, handled above. Smallest possible positive root is 1.
    let right = x; // The square root cannot be greater than x itself (unless x < 1).
    let ans = 0;   // Stores the best candidate for the integer square root found so far.

    // Search space is [left, right] (inclusive)
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        // Using mid * mid can cause overflow for very large 'mid' values in some languages.
        // In JavaScript, numbers are floating-point, so it might not directly overflow in the same way,
        // but it can lose precision for extremely large numbers or exceed MAX_SAFE_INTEGER.
        // A safer comparison: mid <= x / mid
        if (mid <= x / mid) {
            // mid*mid is less than or equal to x.
            // This 'mid' could be our answer, or we might find a larger one.
            ans = mid;
            left = mid + 1; // Try to find a larger 'mid' in the right half.
        } else {
            // mid*mid is greater than x.
            // 'mid' is too large, so we need to search in the left half.
            right = mid - 1;
        }
    }

    return ans;
}

/**
 * Sqrt(x) (Brute Force - Linear Scan / Native)
 *
 * This function provides a brute-force or native approach for comparison.
 * It either iterates linearly (less efficient) or uses the native Math.sqrt()
 * (most efficient, but defeats the purpose of the algorithm challenge).
 * For benchmarking, Math.sqrt is used.
 *
 * @param {number} x - The non-negative integer for which to compute the square root.
 * @returns {number} The integer part of the square root of x.
 *
 * Time Complexity: O(1) for Math.sqrt(), O(sqrt(X)) for linear scan.
 * Space Complexity: O(1)
 */
function mySqrtBruteForce(x) {
    if (x < 0) {
        throw new Error("Input must be a non-negative integer.");
    }
    // For a true "brute-force" would iterate from 0 to x:
    /*
    if (x === 0) return 0;
    for (let i = 1; i <= x; i++) {
        if (i * i === x) return i;
        if (i * i > x) return i - 1;
    }
    return x; // Fallback for very large numbers
    */

    // For practical comparison against Math.sqrt() for accuracy and speed:
    return Math.floor(Math.sqrt(x));
}

module.exports = {
    mySqrt,
    mySqrtBruteForce
};
```