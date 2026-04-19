"""
Problem: Longest Common Subsequence (LCS)

Given two sequences (strings), find the length of their longest common subsequence.
A subsequence is a sequence that can be derived from another sequence by deleting
some or no elements without changing the order of the remaining elements.
For example, "ACE" is a subsequence of "ABCDE".
The LCS problem is to find the longest sequence that is a subsequence of both given sequences.

Example:
s1 = "AGGTAB"
s2 = "GXTXAYB"

Common subsequences include "GTAB", "GAB", "ATB".
The longest common subsequence is "GTAB", which has a length of 4.

Constraints:
- Input strings can be empty.
- Characters can be any ASCII characters.
"""

def lcs_recursive(s1: str, s2: str, m: int, n: int) -> int:
    """
    Approach 1: Brute Force Recursion

    This approach tries all possible combinations of character matches.

    Logic:
    - Base Case: If either string is empty (m=0 or n=0), the LCS length is 0.
    - Recursive Step:
      - If the last characters of `s1` (s1[m-1]) and `s2` (s2[n-1]) match:
        They are part of the LCS. So, the length is 1 + `lcs(s1, s2, m-1, n-1)`.
      - If the last characters do not match:
        We need to consider two possibilities and take the maximum:
        a) Exclude the last character of `s1`: `lcs(s1, s2, m-1, n)`.
        b) Exclude the last character of `s2`: `lcs(s1, s2, m, n-1)`.

    Time Complexity: O(2^(m+n)) - In the worst case (no matching characters),
                     each call branches into two recursive calls, leading to
                     exponential complexity.
    Space Complexity: O(m+n) - Due to the recursion stack depth.
    """
    # Base Case: If either string is empty, LCS length is 0.
    if m == 0 or n == 0:
        return 0

    # If last characters match
    if s1[m - 1] == s2[n - 1]:
        return 1 + lcs_recursive(s1, s2, m - 1, n - 1)
    else:
        # If last characters don't match, take the maximum of two subproblems
        return max(lcs_recursive(s1, s2, m - 1, n), lcs_recursive(s1, s2, m, n - 1))


def lcs_memo(s1: str, s2: str, m: int, n: int, memo: dict) -> int:
    """
    Approach 2: Memoization (Top-Down Dynamic Programming)

    This approach optimizes the brute-force recursion by storing the results
    of `lcs(m, n)` in a memoization table (dictionary) to avoid recomputing
    overlapping subproblems.

    Logic:
    - The state is defined by `(m, n)`, representing the lengths of prefixes
      of `s1` and `s2` currently being considered.
    - Before computing `lcs(m, n)`, check if `memo[(m, n)]` exists. If yes,
      return the cached value.
    - Otherwise, compute it using the same recursive logic as `lcs_recursive`,
      store the result in `memo`, and then return it.

    Time Complexity: O(m * n) - Each state `(m, n)` is computed only once.
                     There are `m * n` unique subproblems.
    Space Complexity: O(m * n) - For the `memo` dictionary and recursion stack.
    """
    # Check if the result for this subproblem is already computed
    if (m, n) in memo:
        return memo[(m, n)]

    # Base Case: If either string is empty, LCS length is 0.
    if m == 0 or n == 0:
        return 0

    # If last characters match
    if s1[m - 1] == s2[n - 1]:
        result = 1 + lcs_memo(s1, s2, m - 1, n - 1, memo)
    else:
        # If last characters don't match, take the maximum of two subproblems
        result = max(lcs_memo(s1, s2, m - 1, n, memo), lcs_memo(s1, s2, m, n - 1, memo))

    # Store the computed result in memo table
    memo[(m, n)] = result
    return result


def lcs_tabulation(s1: str, s2: str) -> int:
    """
    Approach 3: Tabulation (Bottom-Up Dynamic Programming)

    This approach builds a 2D DP table `dp` where `dp[i][j]` stores the length
    of the LCS of `s1[0...i-1]` and `s2[0...j-1]`.

    DP Table: `dp[i][j]`
        `i`: Represents the length of the prefix of `s1` (from 0 to `m`).
        `j`: Represents the length of the prefix of `s2` (from 0 to `n`).

    Logic:
    - Initialize a `dp` table of size `(m+1) x (n+1)` with zeros.
      `dp[0][...]` and `dp[...][0]` are 0 because an empty string has no common subsequence.
    - Iterate `i` from 1 to `m` (for characters in s1):
      - Iterate `j` from 1 to `n` (for characters in s2):
        - If `s1[i-1]` == `s2[j-1]` (current characters match):
          `dp[i][j] = 1 + dp[i-1][j-1]` (add 1 to LCS of shorter prefixes)
        - Else (current characters do not match):
          `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (take the max of excluding one char from either string)

    Visualizing the DP table:
    (Example: s1="AGGTAB", s2="GXTXAYB")

          "" G X T X A Y B
        "" 0  0 0 0 0 0 0 0
        A  0  0 0 0 0 1 1 1
        G  0  1 1 1 1 1 1 1
        G  0  1 1 1 1 1 1 1
        T  0  1 1 2 2 2 2 2
        A  0  1 1 2 2 3 3 3
        B  0  1 1 2 2 3 3 4  <- Final answer dp[m][n]

    The final answer is `dp[m][n]`.

    Time Complexity: O(m * n) - Two nested loops.
    Space Complexity: O(m * n) - For the `dp` table.
    """
    m = len(s1)
    n = len(s2)

    # dp[i][j] will store the length of LCS of s1[0...i-1] and s2[0...j-1]
    dp = [[0 for _ in range(n + 1)] for _ in range(m + 1)]

    # Build dp table in a bottom-up manner
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]

# Note: A space-optimized version for LCS is also possible, reducing O(M*N) to O(min(M,N))
# by only storing two rows (current and previous) of the DP table.
# For simplicity, and because the O(M*N) space is a common and clear implementation,
# it's not included here, but it's a good interview follow-up.

if __name__ == "__main__":
    print("--- Longest Common Subsequence (LCS) ---")

    test_cases = [
        ("AGGTAB", "GXTXAYB", 4),
        ("ABCDGH", "AEDFHR", 3), # ADH
        ("ABC", "ACB", 2),      # AB or AC
        ("ABC", "ABC", 3),      # ABC
        ("ABC", "DEF", 0),      # No common characters
        ("", "ABC", 0),         # Empty string 1
        ("ABC", "", 0),         # Empty string 2
        ("A", "A", 1),          # Single char match
        ("A", "B", 0),          # Single char mismatch
        ("ABAZDC", "BACBAD", 4), # ABAD or ACAD or BCAD etc.
        ("LONGWORD", "ANOTHER", 3), # ONR, OTR
    ]

    for s1, s2, expected in test_cases:
        m, n = len(s1), len(s2)
        print(f"\nString 1: '{s1}', String 2: '{s2}'")

        # Recursive (Brute Force) - For larger strings, this will be too slow
        if m < 15 and n < 15: # Heuristic to avoid excessively long runs
            res_recursive = lcs_recursive(s1, s2, m, n)
            print(f"  Recursive: {res_recursive}")
            assert res_recursive == expected, f"Recursive failed for ('{s1}', '{s2}'). Expected {expected}, got {res_recursive}"
        else:
            print("  Recursive: Skipped (inputs too large for brute force)")

        # Memoization (Top-Down DP)
        memo = {}
        res_memo = lcs_memo(s1, s2, m, n, memo)
        print(f"  Memoization: {res_memo}")
        assert res_memo == expected, f"Memoization failed for ('{s1}', '{s2}'). Expected {expected}, got {res_memo}"

        # Tabulation (Bottom-Up DP)
        res_tab = lcs_tabulation(s1, s2)
        print(f"  Tabulation: {res_tab}")
        assert res_tab == expected, f"Tabulation failed for ('{s1}', '{s2}'). Expected {expected}, got {res_tab}"

        print(f"  All optimized methods match expected result {expected}")