"""
Problem: Longest Common Subsequence (LCS)

Given two sequences, find the length of the longest subsequence present in both of them.
A subsequence is a sequence that can be derived from another sequence by deleting
some or no elements without changing the order of the remaining elements.

Example:
X = "AGGTAB"
Y = "GXTXAYB"

LCS of X and Y is "GTAB". Its length is 4.

Goal:
1. Find the length of the LCS.
2. (Optional but good for interviews) Reconstruct one such LCS.
"""

def lcs_recursive(s1: str, s2: str) -> int:
    """
    Approach 1: Brute Force Recursion
    Calculates the length of the LCS using direct recursion.

    Logic:
    Consider the last characters of the two strings `s1` and `s2`.
    - If `s1[i-1] == s2[j-1]` (where `i` and `j` are current lengths),
      then these characters match and are part of the LCS. We add 1 to the
      LCS of the remaining strings `s1[:i-1]` and `s2[:j-1]`.
      `LCS(s1, s2) = 1 + LCS(s1[:i-1], s2[:j-1])`
    - If `s1[i-1] != s2[j-1]`, then at least one of them is not part of the LCS.
      We take the maximum of two possibilities:
        1. Exclude `s1[i-1]`: `LCS(s1[:i-1], s2)`
        2. Exclude `s2[j-1]`: `LCS(s1, s2[:j-1])`
      `LCS(s1, s2) = max(LCS(s1[:i-1], s2), LCS(s1, s2[:j-1]))`

    Base cases: If either string is empty, the LCS length is 0.

    This approach recomputes the same subproblems repeatedly, leading to
    exponential time complexity.

    Time Complexity: O(2^(m+n)) in the worst case, where `m` and `n` are lengths of strings.
                     This is because each mismatch branches into two recursive calls.
    Space Complexity: O(m+n) - Due to the recursion stack depth.
    """
    m = len(s1)
    n = len(s2)

    def solve(i: int, j: int) -> int:
        # Base case: If either string becomes empty
        if i == 0 or j == 0:
            return 0

        # If characters match
        if s1[i - 1] == s2[j - 1]:
            return 1 + solve(i - 1, j - 1)
        else:
            # If characters don't match, take max of two options
            return max(solve(i - 1, j), solve(i, j - 1))

    return solve(m, n)


def lcs_memoization(s1: str, s2: str) -> int:
    """
    Approach 2: Memoization (Top-Down Dynamic Programming)
    Calculates the length of the LCS using recursion with memoization.

    Logic:
    Similar to the brute force recursive approach, but we store the results of
    subproblems in a `memo` table (a 2D array or dictionary).
    The state of a subproblem is defined by `(i, j)`, representing the LCS of
    `s1[:i]` and `s2[:j]`.
    Before computing `solve(i, j)`, we check if `memo[i][j]` is already computed.
    If it is, return the stored value. Otherwise, compute it, store it, and then return.

    This avoids redundant computations, significantly reducing time complexity.

    Time Complexity: O(m * n) - Each state `(i, j)` is computed only once.
    Space Complexity: O(m * n) - For the memoization table and the recursion stack.
    """
    m = len(s1)
    n = len(s2)

    # Initialize a 2D memoization table with -1 to indicate uncomputed states
    # memo[i][j] stores the LCS length of s1[:i] and s2[:j]
    memo = [[-1] * (n + 1) for _ in range(m + 1)]

    def solve(i: int, j: int) -> int:
        # Base case: If either string becomes empty
        if i == 0 or j == 0:
            return 0

        # If this state has already been computed, return the cached result
        if memo[i][j] != -1:
            return memo[i][j]

        # If characters match
        if s1[i - 1] == s2[j - 1]:
            memo[i][j] = 1 + solve(i - 1, j - 1)
        else:
            # If characters don't match, take max of two options
            memo[i][j] = max(solve(i - 1, j), solve(i, j - 1))

        return memo[i][j]

    return solve(m, n)


def lcs_tabulation(s1: str, s2: str) -> int:
    """
    Approach 3: Tabulation (Bottom-Up Dynamic Programming)
    Calculates the length of the LCS iteratively using a 2D DP table.

    Logic:
    We create a 2D DP table `dp` where `dp[i][j]` represents the length of the
    LCS of `s1[:i]` and `s2[:j]`.

    The table is filled row by row (for `i`) and column by column (for `j`).
    The recurrence relation is:
    - If `s1[i-1] == s2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]` (characters match, extend LCS)
    - If `s1[i-1] != s2[j-1]`: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (take max of excluding one char)

    Base cases:
    - `dp[0][j] = 0` for all `j` (empty `s1`)
    - `dp[i][0] = 0` for all `i` (empty `s2`)

    The final answer is `dp[m][n]`.

    Time Complexity: O(m * n) - Two nested loops.
    Space Complexity: O(m * n) - For the 2D DP table.
    """
    m = len(s1)
    n = len(s2)

    # dp[i][j] stores the LCS length of s1[:i] and s2[:j]
    # (m+1) rows and (n+1) columns, initialized with 0s
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Fill the DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            # If characters match (s1[i-1] and s2[j-1] are current characters)
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                # If characters don't match, take the maximum from
                # (excluding s1[i-1]) or (excluding s2[j-1])
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]


def lcs_reconstruct_path(s1: str, s2: str) -> str:
    """
    Reconstructs one of the Longest Common Subsequences using the filled DP table
    from the tabulation approach.

    Logic:
    After filling the `dp` table as in `lcs_tabulation`, we start from `dp[m][n]`
    and backtrack to `dp[0][0]`.
    - If `s1[i-1] == s2[j-1]`: This character is part of the LCS. Add it to the result
      and move diagonally up-left (`i-1, j-1`).
    - If `s1[i-1] != s2[j-1]`: The characters don't match. Move to the cell that
      gave the maximum value. If `dp[i-1][j]` is greater, move up (`i-1, j`).
      Otherwise, move left (`i, j-1`). (If they are equal, either path works, usually pick one consistently).

    The reconstructed LCS will be in reverse order, so we reverse it at the end.

    Time Complexity: O(m * n) for filling the table + O(m + n) for backtracking = O(m * n).
    Space Complexity: O(m * n) for the DP table and storing the LCS string.
    """
    m = len(s1)
    n = len(s2)

    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Fill the DP table (same as lcs_tabulation)
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Reconstruct the LCS
    lcs_chars = []
    i, j = m, n
    while i > 0 and j > 0:
        if s1[i - 1] == s2[j - 1]:
            # Characters match, it's part of LCS, move diagonally
            lcs_chars.append(s1[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            # Value came from above, move up (exclude s1[i-1])
            i -= 1
        else:
            # Value came from left, move left (exclude s2[j-1])
            j -= 1

    return "".join(lcs_chars[::-1]) # Reverse to get correct order


# Example usage:
if __name__ == "__main__":
    test_cases = [
        ("AGGTAB", "GXTXAYB", 4, "GTAB"),
        ("ABCBDAB", "BDCABA", 4, "BCBA"), # Another valid LCS is BDAB
        ("A", "A", 1, "A"),
        ("A", "B", 0, ""),
        ("", "ABC", 0, ""),
        ("ABC", "", 0, ""),
        ("ABCDEF", "AXBYCZ", 3, "ABC"), # Or AC, or BC
        ("LONGWORD", "LONGTEXT", 4, "LONG"),
        ("GGCATG", "GGAC", 3, "GGC"),
        ("XMJYAUZ", "MZJAWXU", 4, "MJAU"),
        ("STONE", "LONGEST", 3, "ONE"), # (S)T(O)N(E), (L)O(N)G(E)ST -> ONE
    ]

    print("--- Longest Common Subsequence (LCS) ---")

    for s1, s2, expected_len, _ in test_cases:
        print(f"\nS1: '{s1}', S2: '{s2}'")
        print(f"  Expected LCS Length: {expected_len}")
        print(f"  Recursive (Brute Force): {lcs_recursive(s1, s2)}")
        print(f"  Memoization (Top-Down): {lcs_memoization(s1, s2)}")
        print(f"  Tabulation (Bottom-Up): {lcs_tabulation(s1, s2)}")
        print(f"  Reconstructed LCS Path: '{lcs_reconstruct_path(s1, s2)}'")
        assert lcs_tabulation(s1, s2) == expected_len, f"Tabulation failed for {s1}, {s2}"
        # For path reconstruction, we can't assert a specific string as there might be multiple LCSs,
        # but we can assert its length matches.
        assert len(lcs_reconstruct_path(s1, s2)) == expected_len, f"Path reconstruction length failed for {s1}, {s2}"

    # Large strings (recursive will be too slow)
    large_s1 = "AGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTCAGTC" * 2
    large_s2 = "XGTYCXGTYCXGTYCXGTYCXGTYCXGTYCXGTYCXGTYCXGTYCXGTYCXGTYCXGTYCXGTYC" * 2
    large_expected_len = 60 # T, C, G, T, C (5 chars per AGTC/XGTYC * 2) * 15 * 2 is not 60
    # Let's manually verify for AGTCAGTC and XGTYCXGTYC
    # GTCGTC (6 chars) => 6 * 2 = 12
    # AGTCAGTC = A G T C A G T C
    # XGTYCXGTYC = X G T Y C X G T Y C
    # LCS: GTCGTC Length 6.
    # So for `large_s1 = "AGTCAGTC" * 15` and `large_s2 = "XGTYCXGTYC" * 15`
    # Expected length = 6 * 15 = 90
    large_s1 = "AGTC" * 15 # length 60
    large_s2 = "XGTY" * 15 # length 60
    # Common is "GT" repeated 15 times, length 30
    large_s1 = "ABCDEFG" * 10
    large_s2 = "AXBYCZDWEVFUG" * 10 # LCS should be "ABCDEFG" (7 chars) * 10 = 70 chars
    large_s1_len = len(large_s1)
    large_s2_len = len(large_s2)
    large_expected_len_test = 70

    print(f"\n--- Larger Test Case ---")
    print(f"S1 length: {large_s1_len}, S2 length: {large_s2_len}")
    print(f"  Expected LCS Length: {large_expected_len_test}")
    # print(f"  Recursive (Brute Force): {lcs_recursive(large_s1, large_s2)}") # Will be too slow
    print(f"  Memoization (Top-Down): {lcs_memoization(large_s1, large_s2)}")
    print(f"  Tabulation (Bottom-Up): {lcs_tabulation(large_s1, large_s2)}")
    reconstructed_lcs = lcs_reconstruct_path(large_s1, large_s2)
    print(f"  Reconstructed LCS Path Length: {len(reconstructed_lcs)}")
    assert lcs_tabulation(large_s1, large_s2) == large_expected_len_test
    assert len(reconstructed_lcs) == large_expected_len_test