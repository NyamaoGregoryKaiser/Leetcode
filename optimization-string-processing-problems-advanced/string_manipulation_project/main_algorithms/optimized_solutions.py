"""
Contains further optimized or alternative optimal solutions for certain problems.
These might be more complex but offer better asymptotic performance.
"""

class OptimizedStringProblems:

    @staticmethod
    def longest_palindromic_substring_manacher(s: str) -> str:
        """
        Problem 1: Longest Palindromic Substring (Manacher's Algorithm)

        Finds the longest palindromic substring in linear time O(N).
        This algorithm handles both odd and even length palindromes uniformly
        by transforming the string.

        Transformation:
        The input string `s` is transformed into `T` by inserting a special character
        (e.g., '#') between every character and at both ends, and surrounding it
        with unique start/end characters (e.g., '^' and '$').
        Example: "babad" -> "^#b#a#b#a#d#$"

        This ensures all palindromes in T have an odd length, simplifying logic.
        `P[i]` stores the length of the palindrome centered at `i` in `T`.
        Specifically, `P[i]` is the radius of the palindrome (half its length).

        Key Idea:
        When computing `P[i]`, we can use information from already computed `P` values.
        If `i` is within the current `center + radius` (i.e., `i < R`, where `R = center + P[center]`),
        then `P[i]` is at least `min(R - i, P[2 * center - i])`.
        `2 * center - i` is the mirror image of `i` with respect to `center`.

        Time Complexity: O(N)
            - Each character is visited a constant number of times (once for processing,
              and its `P` value is updated at most once during expansion).
            - The transformation takes O(N).
        Space Complexity: O(N)
            - The transformed string `T` and the `P` array (radius array) both take O(N) space.
        """
        n = len(s)
        if n == 0:
            return ""

        # Transform S into T. This handles both odd and even length palindromes.
        # Example: "babad" -> "^#b#a#b#a#d#$"
        T = '#'.join('^{}$'.format(s)) # Add '^' at start, '$' at end, '#' between chars
        m = len(T) # Length of transformed string T

        P = [0] * m # P[i] stores the radius of the palindrome centered at i
                    # (length = 2 * P[i] + 1 in T, which is P[i] in original s)

        center = 0  # Center of the palindrome that extends farthest to the right
        right = 0   # Rightmost boundary of this palindrome (center + P[center])

        max_len = 0     # Max palindrome length in original string
        res_center = 0  # Center in T corresponding to max_len

        for i in range(1, m - 1): # Iterate from 1 to m-2, skipping '^' and '$'
            # Calculate mirror index i_mirror of i relative to center
            # i_mirror = center - (i - center) = 2 * center - i
            i_mirror = 2 * center - i

            # If i is within the current palindrome (centered at `center` and extending to `right`),
            # then P[i] is at least the minimum of:
            # 1. The remaining distance to `right` boundary (R - i)
            # 2. The radius of its mirror palindrome P[i_mirror]
            if i < right:
                P[i] = min(right - i, P[i_mirror])

            # Attempt to expand palindrome centered at i
            # T[i - 1 - P[i]] corresponds to character left of the potential palindrome boundary
            # T[i + 1 + P[i]] corresponds to character right of the potential palindrome boundary
            # Note: P[i] is current expansion, we check next characters
            a = i + (1 + P[i])
            b = i - (1 + P[i])
            while a < m and b >= 0 and T[a] == T[b]:
                P[i] += 1
                a += 1
                b -= 1

            # If palindrome centered at i expands past `right`,
            # update `center` and `right` for future calculations.
            if i + P[i] > right:
                center = i
                right = i + P[i]

            # Update max_len and its center if a longer palindrome is found
            # P[i] is the radius. The actual length in original string is P[i].
            if P[i] > max_len:
                max_len = P[i]
                res_center = i

        # Extract the longest palindromic substring from the original string `s`
        # The start index in original string `s` is `(res_center - max_len) // 2`
        # The start index in transformed string `T` is `res_center - max_len`
        # Because we added '#' characters, (res_center - max_len) points to a character in T
        # which corresponds to s[(res_center - max_len) // 2].
        start_index_s = (res_center - max_len) // 2
        return s[start_index_s : start_index_s + max_len]


    @staticmethod
    def group_anagrams_char_count(strs: list[str]) -> list[list[str]]:
        """
        Problem 3: Group Anagrams (Hashing with Character Count Tuple)

        Groups anagrams together using a hash map where the key is a tuple
        representing the character counts of each string. This avoids sorting strings.

        Example: "eat" -> (1,1,1,0,...) for 'a','e','t' -> (1,0,0,0,1,0,...1...) for 0-25 chars
        The tuple key effectively acts as a unique signature for any anagram group.

        Time Complexity: O(N * K)
            - N is the number of strings in 'strs'.
            - K is the average length of a string.
            - For each string, we iterate through its characters once to compute the count array (O(K)).
            - Creating a tuple from the count array is O(26) = O(1).
            - Hash map operations (insertion, lookup) take O(1) on average for a tuple key of fixed size (26).
            - Total: N * O(K) = O(N * K).
        Space Complexity: O(N * K)
            - In the worst case, if all strings are unique anagrams, the hash map
              will store N entries. Each entry's key is a 26-element tuple (O(1))
              and its value is a list of strings (total O(N * K)).
        """
        anagram_groups = {} # Key: tuple of char counts, Value: list of strings

        for s in strs:
            # Create a count array for 26 lowercase English letters
            count = [0] * 26 # a:0, b:1, ..., z:25

            for char in s:
                count[ord(char) - ord('a')] += 1

            # Use the tuple of counts as the hash map key. Tuples are hashable.
            # Example: for "eat", count becomes [1,0,0,0,1,0,...,1,0,0,0] (a:1, e:1, t:1)
            key = tuple(count)

            # Add the original string to the list corresponding to its character count key.
            anagram_groups.setdefault(key, []).append(s)

        # Return the values (lists of anagrams) from the dictionary.
        return list(anagram_groups.values())


# Example usage
if __name__ == "__main__":
    print("--- Longest Palindromic Substring (Manacher's Algorithm) ---")
    print(f"'babad' -> {OptimizedStringProblems.longest_palindromic_substring_manacher('babad')}") # bab or aba
    print(f"'cbbd' -> {OptimizedStringProblems.longest_palindromic_substring_manacher('cbbd')}")   # bb
    print(f"'a' -> {OptimizedStringProblems.longest_palindromic_substring_manacher('a')}")         # a
    print(f"'ac' -> {OptimizedStringProblems.longest_palindromic_substring_manacher('ac')}")       # a
    print(f"'racecar' -> {OptimizedStringProblems.longest_palindromic_substring_manacher('racecar')}") # racecar
    print(f"'forgeeksskeegfor' -> {OptimizedStringProblems.longest_palindromic_substring_manacher('forgeeksskeegfor')}") # geeksskeeg

    print("\n--- Group Anagrams (Character Count) ---")
    strs1 = ["eat","tea","tan","ate","nat","bat"]
    print(f"{strs1} -> {OptimizedStringProblems.group_anagrams_char_count(strs1)}")
    # Expected: [['bat'], ['nat', 'tan'], ['eat', 'tea', 'ate']] (order may vary)
    strs2 = [""]
    print(f"{strs2} -> {OptimizedStringProblems.group_anagrams_char_count(strs2)}") # [['']]
    strs3 = ["a"]
    print(f"{strs3} -> {OptimizedStringProblems.group_anagrams_char_count(strs3)}") # [['a']]
    strs4 = ["abc", "bca", "cab", "xyz", "zyx"]
    print(f"{strs4} -> {OptimizedStringProblems.group_anagrams_char_count(strs4)}")
    # Expected: [['abc', 'bca', 'cab'], ['xyz', 'zyx']] (order may vary)