```typescript
/**
 * src/problems/editDistance.ts
 *
 * Edit Distance (Levenshtein Distance)
 *
 * Given two strings `word1` and `word2`, return the minimum number of operations
 * required to convert `word1` to `word2`.
 *
 * You have the following three operations permitted on a word:
 * 1. Insert a character
 * 2. Delete a character
 * 3. Replace a character
 */

/**
 * Problem Description: Edit Distance
 *
 * Input: Two strings, `word1` and `word2`.
 * Output: The minimum number of operations (insert, delete, replace) to convert `word1` to `word2`.
 *
 * Example:
 * word1 = "horse", word2 = "ros"   => Output: 3
 *   1. horse -> rorse (replace 'h' with 'r')
 *   2. rorse -> rose  (delete 'r')
 *   3. rose -> ros   (delete 'e')
 *
 * word1 = "intention", word2 = "execution" => Output: 5
 *   1. intention -> execution (replace 'i' with 'e')
 *   2. enxecution -> exection (replace 'n' with 'x')
 *   3. exection -> execution (replace 't' with 'c')
 *   4. exccution -> execution (delete 'i')
 *   5. exccution -> execution (insert 'u')
 *
 * Key Concept: Overlapping subproblems and optimal substructure.
 * - `dp[i][j]` = minimum edit distance to convert `word1[0...i-1]` to `word2[0...j-1]`.
 * - Base cases:
 *   - `dp[i][0] = i` (To convert word1[0...i-1] to an empty string, we need to delete all `i` characters).
 *   - `dp[0][j] = j` (To convert an empty string to word2[0...j-1], we need to insert all `j` characters).
 * - Recurrence:
 *   - If `word1[i-1] == word2[j-1]` (characters match):
 *     `dp[i][j] = dp[i-1][j-1]` (no operation needed for these characters).
 *   - If `word1[i-1] != word2[j-1]` (characters do not match):
 *     `dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])`
 *     where:
 *       - `dp[i-1][j]`: corresponds to deleting `word1[i-1]`.
 *       - `dp[i][j-1]`: corresponds to inserting `word2[j-1]` into `word1`.
 *       - `dp[i-1][j-1]`: corresponds to replacing `word1[i-1]` with `word2[j-1]`.
 *     We add 1 for the operation performed.
 */

// --- 1. Brute Force Recursive Solution ---
/**
 * Implements the Edit Distance problem using a brute-force recursive approach.
 * This solution explores all possible sequences of operations, leading to exponential time complexity.
 * It recomputes the same subproblems many times.
 *
 * Time Complexity: O(3^(m+n)) in the worst case, where m and n are the lengths of word1 and word2.
 *                  This is because for each character pair mismatch, we potentially make three recursive calls.
 * Space Complexity: O(m+n) due to the recursion stack depth.
 *
 * @param {string} word1 - The first string.
 * @param {string} word2 - The second string.
 * @returns {number} The minimum edit distance.
 */
export function editDistance_BruteForce(word1: string, word2: string): number {
    // Helper function for recursion
    // i: current index for word1 (length of prefix considered)
    // j: current index for word2 (length of prefix considered)
    function solve(i: number, j: number): number {
        // Base cases
        // If word1 is empty, we need to insert all remaining characters of word2.
        if (i === 0) {
            return j;
        }
        // If word2 is empty, we need to delete all remaining characters of word1.
        if (j === 0) {
            return i;
        }

        // If the current characters match, no operation is needed for them.
        // Move to the previous characters in both strings.
        if (word1[i - 1] === word2[j - 1]) {
            return solve(i - 1, j - 1);
        } else {
            // If characters do not match, we consider three operations:
            // 1. Delete character from word1: `1 + solve(i - 1, j)`
            //    (Cost 1 for deletion, then solve for word1 without its last char, and full word2)
            // 2. Insert character into word1 (to match word2[j-1]): `1 + solve(i, j - 1)`
            //    (Cost 1 for insertion, word1 remains same, word2 moves past its last char)
            // 3. Replace character in word1: `1 + solve(i - 1, j - 1)`
            //    (Cost 1 for replacement, then solve for word1 without its last char, and word2 without its last char)
            return 1 + Math.min(
                solve(i - 1, j),       // Delete
                solve(i, j - 1),       // Insert
                solve(i - 1, j - 1)    // Replace
            );
        }
    }

    return solve(word1.length, word2.length);
}

// --- 2. Top-Down Dynamic Programming (Memoization) Solution ---
/**
 * Implements the Edit Distance problem using memoization (top-down DP).
 * This optimizes the brute-force approach by storing the results of subproblems
 * in a DP table to avoid recomputation, significantly reducing time complexity.
 *
 * Time Complexity: O(m*n), where m and n are the lengths of word1 and word2.
 *                  Each state (i, j) is computed only once.
 * Space Complexity: O(m*n) for the memoization table + O(m+n) for recursion stack.
 *
 * @param {string} word1 - The first string.
 * @param {string} word2 - The second string.
 * @returns {number} The minimum edit distance.
 */
export function editDistance_Memoized(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;

    // dp table to store results of solve(i, j).
    // Initialize with -1 to indicate not computed yet.
    // dp[i][j] will store min edit distance for word1[0...i-1] and word2[0...j-1].
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(-1));

    function solve(i: number, j: number): number {
        // Base cases
        if (i === 0) {
            return j;
        }
        if (j === 0) {
            return i;
        }

        // If this subproblem has already been solved, return the stored result.
        if (dp[i][j] !== -1) {
            return dp[i][j];
        }

        let result: number;
        if (word1[i - 1] === word2[j - 1]) {
            result = solve(i - 1, j - 1); // Characters match, no operation
        } else {
            // Characters don't match, consider 3 operations with a cost of 1.
            result = 1 + Math.min(
                solve(i - 1, j),       // Delete
                solve(i, j - 1),       // Insert
                solve(i - 1, j - 1)    // Replace
            );
        }

        // Store the computed result before returning.
        dp[i][j] = result;
        return result;
    }

    return solve(m, n);
}

// --- 3. Bottom-Up Dynamic Programming (Tabulation) Solution ---
/**
 * Implements the Edit Distance problem using tabulation (bottom-up DP).
 * This iterative approach builds up the solution from base cases to the final result,
 * explicitly filling a 2D DP table.
 *
 * Time Complexity: O(m*n), where m and n are the lengths of word1 and word2.
 *                  Each cell in the dp table is computed once.
 * Space Complexity: O(m*n) for the dp table.
 *
 * @param {string} word1 - The first string.
 * @param {string} word2 - The second string.
 * @returns {number} The minimum edit distance.
 */
export function editDistance_Tabulated(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;

    // dp[i][j] will store the minimum edit distance to convert word1[0...i-1] to word2[0...j-1].
    // The table size is (m+1) x (n+1) to handle empty string base cases (row/column 0).
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // Initialize base cases:
    // To convert word1[0...i-1] to empty string (word2 prefix of length 0),
    // we need `i` deletions.
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    // To convert empty string (word1 prefix of length 0) to word2[0...j-1],
    // we need `j` insertions.
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    // Fill the dp table
    // i iterates through word1 (from 1 to m, mapping to word1[i-1])
    // j iterates through word2 (from 1 to n, mapping to word2[j-1])
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // If the current characters match, no operation needed.
            // Cost is the same as converting previous substrings.
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // If characters do not match, consider 3 operations, each costing 1.
                // Take the minimum of these three possibilities:
                // 1. Delete: `dp[i-1][j]` (delete word1[i-1])
                // 2. Insert: `dp[i][j-1]` (insert word2[j-1] into word1)
                // 3. Replace: `dp[i-1][j-1]` (replace word1[i-1] with word2[j-1])
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],       // Delete
                    dp[i][j - 1],       // Insert
                    dp[i - 1][j - 1]    // Replace
                );
            }
        }
    }

    // The final result is in the bottom-right corner of the dp table.
    return dp[m][n];
}

// --- 4. Space-Optimized Tabulation Solution ---
/**
 * Implements the Edit Distance problem using space-optimized tabulation.
 * This version reduces the space complexity from O(m*n) to O(min(m, n)) by observing
 * that the current row's computation only depends on the previous row.
 * We can use two rows (current and previous) instead of the entire 2D table.
 *
 * To simplify, we ensure `word2` is the shorter string. Let `m` be `word1.length`
 * and `n` be `word2.length`. Then we use O(n) space.
 *
 * Time Complexity: O(m*n), where m and n are the lengths of word1 and word2.
 * Space Complexity: O(min(m, n)). We use two arrays of size min(m, n) + 1.
 *
 * @param {string} word1 - The first string.
 * @param {string} word2 - The second string.
 * @returns {number} The minimum edit distance.
 */
export function editDistance_SpaceOptimized(word1: string, word2: string): number {
    // Ensure word2 is the shorter string for space optimization to be O(min(m,n))
    // If word1 is shorter, swap them. The edit distance is commutative.
    if (word1.length < word2.length) {
        [word1, word2] = [word2, word1]; // Swap word1 and word2
    }

    const m = word1.length; // Length of the longer string
    const n = word2.length; // Length of the shorter string

    // current_dp stores the results for the current row (current word1 character)
    // prev_dp stores the results for the previous row (previous word1 character)
    // Both arrays are of size n+1, representing edit distance with word2 substrings.
    let prev_dp: number[] = Array(n + 1).fill(0);
    let current_dp: number[] = Array(n + 1).fill(0);

    // Initialize the first row (prev_dp represents dp[0][j])
    // To convert empty string to word2[0...j-1], we need j insertions.
    for (let j = 0; j <= n; j++) {
        prev_dp[j] = j;
    }

    // Iterate through word1 (outer loop, from 1 to m)
    for (let i = 1; i <= m; i++) {
        // Initialize the first element of current_dp (current_dp[0] represents dp[i][0])
        // To convert word1[0...i-1] to empty string, we need i deletions.
        current_dp[0] = i;

        // Iterate through word2 (inner loop, from 1 to n)
        for (let j = 1; j <= n; j++) {
            // If characters match
            if (word1[i - 1] === word2[j - 1]) {
                // No operation needed. Value comes from diagonal element (prev_dp[j-1]).
                current_dp[j] = prev_dp[j - 1];
            } else {
                // Characters don't match, consider 3 operations (cost 1 each):
                // 1. Delete: `prev_dp[j]` (value from row above, same column)
                // 2. Insert: `current_dp[j-1]` (value from current row, previous column)
                // 3. Replace: `prev_dp[j-1]` (value from diagonal, previous row & column)
                current_dp[j] = 1 + Math.min(
                    prev_dp[j],         // Delete (word1[i-1] deleted)
                    current_dp[j - 1],  // Insert (word2[j-1] inserted into word1)
                    prev_dp[j - 1]      // Replace (word1[i-1] replaced by word2[j-1])
                );
            }
        }
        // After computing the current row, it becomes the previous row for the next iteration.
        prev_dp = [...current_dp]; // Deep copy current_dp to prev_dp
    }

    // The final result is the last element of the final prev_dp (which holds the results of the last row).
    return prev_dp[n];
}
```