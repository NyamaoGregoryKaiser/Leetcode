```python
import functools
from typing import List

class LongestCommonSubsequence:
    """
    Implementations for finding the Longest Common Subsequence (LCS) of two strings.
    A subsequence is a sequence that can be derived from another sequence by deleting
    some or no elements without changing the order of the remaining elements.
    """

    @staticmethod
    def lcs_recursive_bruteforce(text1: str, text2: str) -> int:
        """
        Calculates the length of the LCS using a naive recursive (brute-force) approach.
        At each pair of characters (text1[i], text2[j]), we have two choices:
        1. If characters match: Increment count and recurse for (i-1, j-1).
        2. If characters don't match: Recurse for (i-1, j) and (i, j-1) and take max.

        Args:
            text1 (str): The first input string.
            text2 (str): The second input string.

        Returns:
            int: The length of the LCS.

        Time Complexity: O(2^(m+n)) - In the worst case (no common characters), it explores
                                       all possible subsequences.
        Space Complexity: O(m+n) - Due to the recursion stack depth, where m and n are string lengths.
        """
        m, n = len(text1), len(text2)

        def solve(i, j):
            # Base Case: If either string is exhausted
            if i == 0 or j == 0:
                return 0

            # If characters match, they are part of the LCS
            if text1[i - 1] == text2[j - 1]:
                return 1 + solve(i - 1, j - 1)
            # If characters don't match, explore both options and take the maximum
            else:
                return max(solve(i - 1, j), solve(i, j - 1))

        return solve(m, n)

    @staticmethod
    @functools.lru_cache(maxsize=None)
    def lcs_memoization(text1_tuple: str, text2_tuple: str, i: int, j: int) -> int:
        """
        Calculates the length of the LCS using memoization (top-down Dynamic Programming).
        Stores the results of subproblems (i, j) to avoid redundant computations.

        Args:
            text1_tuple (str): The first input string (as a tuple of chars for hashability if needed,
                                but strings are hashable directly).
            text2_tuple (str): The second input string.
            i (int): Current index in text1 (length of prefix considered).
            j (int): Current index in text2 (length of prefix considered).

        Returns:
            int: The length of the LCS.

        Time Complexity: O(m * n) - Each state (i, j) is computed only once.
        Space Complexity: O(m * n) - For the memoization table (cache) and recursion stack.
        """
        text1 = text1_tuple # Renaming for clarity if originally intended as tuple
        text2 = text2_tuple

        # Base Case: If either string prefix is exhausted
        if i == 0 or j == 0:
            return 0

        # If characters match
        if text1[i - 1] == text2[j - 1]:
            return 1 + LongestCommonSubsequence.lcs_memoization(text1, text2, i - 1, j - 1)
        # If characters don't match
        else:
            return max(
                LongestCommonSubsequence.lcs_memoization(text1, text2, i - 1, j),
                LongestCommonSubsequence.lcs_memoization(text1, text2, i, j - 1)
            )

    @staticmethod
    def lcs_tabulation(text1: str, text2: str) -> int:
        """
        Calculates the length of the LCS using tabulation (bottom-up Dynamic Programming).
        Builds a DP table where dp[i][j] represents the length of the LCS of
        text1[0...i-1] and text2[0...j-1].

        Args:
            text1 (str): The first input string.
            text2 (str): The second input string.

        Returns:
            int: The length of the LCS.

        Time Complexity: O(m * n) - Two nested loops iterate m*n times.
        Space Complexity: O(m * n) - For the 2D DP table.
        """
        m, n = len(text1), len(text2)

        # dp[i][j] stores the LCS length of text1[0...i-1] and text2[0...j-1]
        # Table size: (m+1) rows, (n+1) columns
        dp = [[0 for _ in range(n + 1)] for _ in range(m + 1)]

        # Fill the dp table
        # i iterates through text1 (from 1 to m, 0-indexed char is i-1)
        # j iterates through text2 (from 1 to n, 0-indexed char is j-1)
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                # If characters match, extend the LCS from (i-1, j-1)
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                # If characters don't match, take the maximum of
                #  1. LCS of text1[0...i-2] and text2[0...j-1] (moving up in table)
                #  2. LCS of text1[0...i-1] and text2[0...j-2] (moving left in table)
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

        return dp[m][n]

    @staticmethod
    def lcs_space_optimized(text1: str, text2: str) -> int:
        """
        Calculates the length of the LCS using space-optimized tabulation (bottom-up DP).
        Reduces space complexity from O(m*n) to O(n) by only storing two rows (current and previous)
        of the DP table. Assuming `text2` is the shorter string for better space optimization.

        Args:
            text1 (str): The first input string.
            text2 (str): The second input string.

        Returns:
            int: The length of the LCS.

        Time Complexity: O(m * n) - Two nested loops iterate m*n times.
        Space Complexity: O(min(m, n)) - Uses two 1D arrays of size min(m, n) + 1.
                                          We ensure text2 is the shorter one for optimal space.
        """
        # Ensure text2 is the shorter string to optimize space effectively.
        if len(text1) < len(text2):
            text1, text2 = text2, text1

        m, n = len(text1), len(text2) # m >= n now

        # dp_prev and dp_curr will store LCS lengths for previous and current row (of text1)
        # Each array has size (n+1) for text2's length
        dp_prev = [0] * (n + 1)
        dp_curr = [0] * (n + 1)

        # Iterate through text1 (as rows)
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                # If characters match
                if text1[i - 1] == text2[j - 1]:
                    dp_curr[j] = 1 + dp_prev[j - 1]
                # If characters don't match
                else:
                    dp_curr[j] = max(dp_prev[j], dp_curr[j - 1])
            
            # After filling dp_curr for the current row (i),
            # it becomes dp_prev for the next iteration.
            dp_prev = list(dp_curr) # Copy content

        return dp_prev[n] # The last computed row's last element is the result


# Example Usage:
if __name__ == '__smain__':
    print("--- Longest Common Subsequence ---")

    # Example 1
    s1_1, s1_2 = "ABCBDAB", "BDCABA"
    print(f"\nStrings: '{s1_1}', '{s1_2}'")
    print(f"Brute Force: {LongestCommonSubsequence.lcs_recursive_bruteforce(s1_1, s1_2)}")
    print(f"Memoization: {LongestCommonSubsequence.lcs_memoization(s1_1, s1_2, len(s1_1), len(s1_2))}")
    LongestCommonSubsequence.lcs_memoization.cache_clear() # Clear cache for next calls if needed
    print(f"Tabulation: {LongestCommonSubsequence.lcs_tabulation(s1_1, s1_2)}")
    print(f"Space Optimized Tabulation: {LongestCommonSubsequence.lcs_space_optimized(s1_1, s1_2)}")
    # Expected: 4 (e.g., "BDAB" or "BCBA")

    # Example 2
    s2_1, s2_2 = "AGGTAB", "GXTXAYB"
    print(f"\nStrings: '{s2_1}', '{s2_2}'")
    print(f"Brute Force: {LongestCommonSubsequence.lcs_recursive_bruteforce(s2_1, s2_2)}")
    print(f"Memoization: {LongestCommonSubsequence.lcs_memoization(s2_1, s2_2, len(s2_1), len(s2_2))}")
    LongestCommonSubsequence.lcs_memoization.cache_clear()
    print(f"Tabulation: {LongestCommonSubsequence.lcs_tabulation(s2_1, s2_2)}")
    print(f"Space Optimized Tabulation: {LongestCommonSubsequence.lcs_space_optimized(s2_1, s2_2)}")
    # Expected: 4 (e.g., "GTAB")

    # Edge cases
    print("\n--- Edge Cases ---")
    print(f"Empty strings ('', ''): {LongestCommonSubsequence.lcs_tabulation('', '')}") # Expected: 0
    print(f"One empty string ('ABC', ''): {LongestCommonSubsequence.lcs_tabulation('ABC', '')}") # Expected: 0
    print(f"No common characters ('ABC', 'DEF'): {LongestCommonSubsequence.lcs_tabulation('ABC', 'DEF')}") # Expected: 0
    print(f"Identical strings ('ABC', 'ABC'): {LongestCommonSubsequence.lcs_tabulation('ABC', 'ABC')}") # Expected: 3
    print(f"Different lengths ('ABCDGH', 'AEDFHR'): {LongestCommonSubsequence.lcs_tabulation('ABCDGH', 'AEDFHR')}") # Expected: 3 (ADH)
```