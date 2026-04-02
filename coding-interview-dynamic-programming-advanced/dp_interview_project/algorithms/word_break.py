```python
import functools
from typing import List, Set

class WordBreak:
    """
    Implementations for the Word Break Problem.
    Given a string s and a dictionary of words `word_dict`, determine if `s` can be
    segmented into a space-separated sequence of one or more dictionary words.
    """

    @staticmethod
    def word_break_recursive_bruteforce(s: str, word_dict: Set[str]) -> bool:
        """
        Determines if a string can be segmented using a naive recursive (brute-force) approach.
        Tries every possible split point and recursively checks if both parts can be segmented.

        Args:
            s (str): The input string.
            word_dict (Set[str]): A set of dictionary words.

        Returns:
            bool: True if s can be segmented, False otherwise.

        Time Complexity: O(2^N) - In the worst case, each character could be a split point,
                                   leading to exponential number of calls.
        Space Complexity: O(N) - Due to recursion stack depth.
        """
        n = len(s)

        def solve(start_index):
            # Base Case: If we have successfully segmented the entire string
            if start_index == n:
                return True

            # Try every possible end_index for the current word
            for end_index in range(start_index + 1, n + 1):
                word = s[start_index:end_index]
                if word in word_dict:
                    # If this word is in the dictionary, try to segment the rest of the string
                    if solve(end_index):
                        return True
            return False

        return solve(0)

    @staticmethod
    @functools.lru_cache(maxsize=None)
    def word_break_memoization(s: str, word_dict_frozen: frozenset, start_index: int) -> bool:
        """
        Determines if a string can be segmented using memoization (top-down Dynamic Programming).
        Memoizes the result of whether a substring starting at `start_index` can be segmented.

        Args:
            s (str): The input string.
            word_dict_frozen (frozenset): A frozenset of dictionary words (for hashability with lru_cache).
            start_index (int): The starting index of the current substring to check.

        Returns:
            bool: True if s can be segmented, False otherwise.

        Time Complexity: O(N * L) - Where N is the length of the string `s`, and L is the
                                     average length of words in `word_dict`. Each `start_index`
                                     is visited once, and for each, we iterate up to N-start_index
                                     and perform a dictionary lookup (avg O(L)).
        Space Complexity: O(N) - For the memoization cache and recursion stack.
        """
        n = len(s)
        word_dict = set(word_dict_frozen) # Convert back for dictionary lookups if needed.

        # Base Case: If we have successfully segmented the entire string
        if start_index == n:
            return True

        # Try every possible end_index for the current word
        for end_index in range(start_index + 1, n + 1):
            word = s[start_index:end_index]
            if word in word_dict:
                # If this word is in the dictionary, recursively check the remainder
                # and memoize the result.
                if WordBreak.word_break_memoization(s, word_dict_frozen, end_index):
                    return True
        return False # No valid segmentation found from this start_index

    @staticmethod
    def word_break_tabulation(s: str, word_dict: Set[str]) -> bool:
        """
        Determines if a string can be segmented using tabulation (bottom-up Dynamic Programming).
        Builds a DP array where dp[i] is True if the substring s[0...i-1] can be segmented.

        Args:
            s (str): The input string.
            word_dict (Set[str]): A set of dictionary words.

        Returns:
            bool: True if s can be segmented, False otherwise.

        Time Complexity: O(N * L_max) or O(N^2 * W_avg) depending on word_dict lookup.
                                     More precisely, O(N * L_max), where N is string length,
                                     and L_max is the maximum length of a word in `word_dict`.
                                     The outer loop runs N times. The inner loop runs N times.
                                     Substring slicing is O(L), dictionary lookup is O(L).
                                     Overall O(N^2 * L_max) if implemented naively, but can be O(N*L_max)
                                     if we optimize substring generation or dictionary lookup.
                                     For `word in word_dict`, it's O(length of word) on average for hash set.
                                     So N * (length of word check + N for inner loop) = N * N * L
                                     Better: O(N * min(N, max_word_len)).
                                     Let's use a reasonable max_word_len to bound the inner loop.
                                     If max_word_len is M, then O(N * M * M) where M for substring and M for dict lookup.
                                     A more precise analysis often states O(N^2) if dictionary lookups are O(1)
                                     or O(N^2 * L) if average word length is L.
                                     With maximum word length optimization, it can be O(N * max_len_word * max_len_word).
                                     Or simply O(N^2) for substring & O(L) for lookup -> O(N^2 * L).

        Space Complexity: O(N) - For the 1D DP array.
        """
        n = len(s)
        # dp[i] will be True if s[0...i-1] can be segmented
        # dp[0] is True (empty string can be segmented)
        dp = [False] * (n + 1)
        dp[0] = True

        # Iterate through the string, considering substrings ending at index i
        for i in range(1, n + 1):
            # For each substring s[0...i-1], check if it can be formed by
            # a previous valid segmentation point `j` and a dictionary word `s[j...i-1]`
            for j in range(i): # j goes from 0 to i-1
                # If s[0...j-1] is segmentable (dp[j] is True)
                # AND s[j...i-1] is a word in the dictionary
                if dp[j] and s[j:i] in word_dict:
                    dp[i] = True
                    break # Found a way to segment s[0...i-1], move to next i

        return dp[n]


# Example Usage:
if __name__ == '__main__':
    print("--- Word Break Problem ---")

    # Example 1
    s1 = "leetcode"
    word_dict1 = {"leet", "code"}
    print(f"\nString: '{s1}', Dictionary: {word_dict1}")
    print(f"Brute Force: {WordBreak.word_break_recursive_bruteforce(s1, word_dict1)}")
    # For memoization, word_dict must be hashable, so pass a frozenset
    print(f"Memoization: {WordBreak.word_break_memoization(s1, frozenset(word_dict1), 0)}")
    WordBreak.word_break_memoization.cache_clear()
    print(f"Tabulation: {WordBreak.word_break_tabulation(s1, word_dict1)}")
    # Expected: True ("leet code")

    # Example 2
    s2 = "applepenapple"
    word_dict2 = {"apple", "pen"}
    print(f"\nString: '{s2}', Dictionary: {word_dict2}")
    print(f"Brute Force: {WordBreak.word_break_recursive_bruteforce(s2, word_dict2)}")
    print(f"Memoization: {WordBreak.word_break_memoization(s2, frozenset(word_dict2), 0)}")
    WordBreak.word_break_memoization.cache_clear()
    print(f"Tabulation: {WordBreak.word_break_tabulation(s2, word_dict2)}")
    # Expected: True ("apple pen apple")

    # Example 3
    s3 = "catsandog"
    word_dict3 = {"cats", "dog", "sand", "and", "cat"}
    print(f"\nString: '{s3}', Dictionary: {word_dict3}")
    print(f"Brute Force: {WordBreak.word_break_recursive_bruteforce(s3, word_dict3)}")
    print(f"Memoization: {WordBreak.word_break_memoization(s3, frozenset(word_dict3), 0)}")
    WordBreak.word_break_memoization.cache_clear()
    print(f"Tabulation: {WordBreak.word_break_tabulation(s3, word_dict3)}")
    # Expected: False

    # Edge cases
    print("\n--- Edge Cases ---")
    # Empty string
    print(f"Empty string ('', {{'a'}}): {WordBreak.word_break_tabulation('', {'a'})}") # Expected: True
    # String not in dict
    print(f"No match ('abc', {{'a', 'b'}}): {WordBreak.word_break_tabulation('abc', {'a', 'b'})}") # Expected: False
    # Single character string, not in dict
    print(f"Single char, no match ('a', {{}}): {WordBreak.word_break_tabulation('a', set())}") # Expected: False
    # Single character string, in dict
    print(f"Single char, match ('a', {{'a'}}): {WordBreak.word_break_tabulation('a', {'a'})}") # Expected: True
```