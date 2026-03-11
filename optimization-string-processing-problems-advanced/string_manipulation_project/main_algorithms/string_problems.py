"""
Core string manipulation problems with optimal solutions typically expected in interviews.
Each solution includes detailed comments, time, and space complexity analysis.
"""

class StringProblems:

    @staticmethod
    def longest_palindromic_substring_expand_around_center(s: str) -> str:
        """
        Problem 1: Longest Palindromic Substring (Expand Around Center)

        Finds the longest palindromic substring in 's' using the "expand around center" approach.
        This method considers every single character and every pair of adjacent characters
        as potential centers of a palindrome and expands outwards.

        Time Complexity: O(N^2)
            - We iterate through N characters as potential centers (N-1 for odd length, N-1 for even length).
            - For each center, in the worst case (e.g., "aaaaa"), expanding outwards can take O(N) time.
            - Total: N * O(N) = O(N^2).
        Space Complexity: O(1)
            - We only use a few variables to store the current longest palindrome's start and end indices.
        """
        n = len(s)
        if n < 1:
            return ""
        if n == 1:
            return s

        start = 0  # Starting index of the longest palindrome found
        max_len = 1  # Length of the longest palindrome found

        def expand_around_center(left: int, right: int) -> tuple[int, int]:
            """
            Helper function to expand outwards from a given center.
            Returns the length of the palindrome found and its start index.
            """
            while left >= 0 and right < n and s[left] == s[right]:
                left -= 1
                right += 1
            # After the loop, (left, right) are outside the palindrome.
            # The actual palindrome is s[left + 1 ... right - 1].
            return right - (left + 1), left + 1

        for i in range(n):
            # Case 1: Odd length palindrome (center is s[i])
            len1, start1 = expand_around_center(i, i)
            if len1 > max_len:
                max_len = len1
                start = start1

            # Case 2: Even length palindrome (center is between s[i] and s[i+1])
            # Only proceed if i+1 is a valid index to avoid IndexError
            if i + 1 < n:
                len2, start2 = expand_around_center(i, i + 1)
                if len2 > max_len:
                    max_len = len2
                    start = start2

        return s[start : start + max_len]

    @staticmethod
    def longest_palindromic_substring_dp(s: str) -> str:
        """
        Problem 1: Longest Palindromic Substring (Dynamic Programming)

        Finds the longest palindromic substring in 's' using dynamic programming.
        A 2D boolean array `dp[i][j]` is used to store whether `s[i...j]` is a palindrome.

        The state transition is:
        dp[i][j] = (s[i] == s[j]) AND dp[i+1][j-1]

        Base cases:
        - Substrings of length 1 are palindromes: `dp[i][i] = true`
        - Substrings of length 2 are palindromes if `s[i] == s[i+1]`: `dp[i][i+1] = (s[i] == s[i+1])`

        Time Complexity: O(N^2)
            - The DP table has N*N cells.
            - Each cell takes O(1) time to compute.
            - Total: O(N^2).
        Space Complexity: O(N^2)
            - A 2D boolean array of size N*N is used.
        """
        n = len(s)
        if n < 1:
            return ""
        if n == 1:
            return s

        # dp[i][j] will be True if substring s[i...j] is a palindrome, False otherwise.
        dp = [[False] * n for _ in range(n)]

        start = 0      # Starting index of the longest palindrome found
        max_len = 1    # Length of the longest palindrome found

        # All substrings of length 1 are palindromes
        for i in range(n):
            dp[i][i] = True

        # Check for substrings of length 2
        for i in range(n - 1):
            if s[i] == s[i+1]:
                dp[i][i+1] = True
                start = i
                max_len = 2

        # Check for substrings of length 3 or more
        # `length` represents the current substring length
        for length in range(3, n + 1):
            # `i` is the starting index
            for i in range(n - length + 1):
                j = i + length - 1  # `j` is the ending index

                # A substring s[i...j] is a palindrome if:
                # 1. The characters at the ends (s[i] and s[j]) are the same.
                # 2. The inner substring s[i+1...j-1] is also a palindrome.
                if s[i] == s[j] and dp[i+1][j-1]:
                    dp[i][j] = True
                    # If this palindrome is longer than the current max_len, update.
                    if length > max_len:
                        max_len = length
                        start = i

        return s[start : start + max_len]

    @staticmethod
    def is_valid_parentheses(s: str) -> bool:
        """
        Problem 2: Valid Parentheses

        Determines if the input string 's' contains valid parentheses using a stack.

        Time Complexity: O(N)
            - We iterate through the string once.
            - Each character involves a constant number of stack operations (push/pop).
        Space Complexity: O(N)
            - In the worst case (e.g., "((((("), the stack can store up to N/2 opening brackets.
        """
        stack = []
        # Define a mapping of closing brackets to their corresponding opening brackets.
        bracket_map = {")": "(", "}": "{", "]": "["}

        for char in s:
            if char in bracket_map:  # If it's a closing bracket
                # If the stack is empty, there's no opening bracket to match.
                # Or if the top of the stack does not match the expected opening bracket.
                if not stack or stack.pop() != bracket_map[char]:
                    return False
            else:  # If it's an opening bracket, push it onto the stack.
                stack.append(char)

        # After iterating through the string, if the stack is empty, all brackets
        # were properly closed. Otherwise, there are unmatched opening brackets.
        return not stack

    @staticmethod
    def group_anagrams(strs: list[str]) -> list[list[str]]:
        """
        Problem 3: Group Anagrams

        Groups anagrams together from a list of strings. Uses a hash map where
        the key is the sorted version of a string (canonical representation of an anagram).

        Time Complexity: O(N * K log K)
            - N is the number of strings in 'strs'.
            - K is the average length of a string.
            - Sorting each string takes O(K log K).
            - We do this N times.
            - Hash map operations (insertion, lookup) take O(K) on average due to string hashing/comparison,
              but sorting dominates the time complexity.
        Space Complexity: O(N * K)
            - In the worst case, if all strings are unique anagrams, the hash map
              will store N entries. Each entry's key is a sorted string (O(K))
              and its value is a list of strings (total O(N * K)).
        """
        # A dictionary to store groups of anagrams.
        # Key: sorted string (e.g., "aet" for "eat", "tea", "ate")
        # Value: a list of original strings that are anagrams
        anagram_groups = {}

        for s in strs:
            # Sort the string to create a canonical key for anagrams.
            # Example: "eat" -> "aet", "tea" -> "aet", "tan" -> "ant"
            sorted_s = "".join(sorted(s))

            # Add the original string to the list corresponding to its sorted key.
            # If the key doesn't exist, create a new list.
            if sorted_s not in anagram_groups:
                anagram_groups[sorted_s] = []
            anagram_groups[sorted_s].append(s)
            # A more concise way: anagram_groups.setdefault(sorted_s, []).append(s)

        # Return the values (lists of anagrams) from the dictionary.
        return list(anagram_groups.values())

    @staticmethod
    def string_to_integer_atoi(s: str) -> int:
        """
        Problem 4: String to Integer (atoi)

        Converts a string to a 32-bit signed integer according to the `atoi` rules.

        Time Complexity: O(N)
            - We iterate through the string at most twice (once for leading whitespace,
              then once for digits).
        Space Complexity: O(1)
            - We only use a few variables to store state and the result.
        """
        n = len(s)
        if n == 0:
            return 0

        # Define 32-bit signed integer range
        INT_MAX = 2**31 - 1
        INT_MIN = -2**31

        i = 0
        # 1. Read and ignore leading whitespace
        while i < n and s[i] == ' ':
            i += 1

        # If after skipping whitespace, we're at the end of the string, return 0.
        if i == n:
            return 0

        # 2. Check for sign
        sign = 1  # Default positive
        if s[i] == '-':
            sign = -1
            i += 1
        elif s[i] == '+':
            i += 1

        # 3. Read digits and 4. Convert to integer
        result = 0
        while i < n and s[i].isdigit():
            digit = int(s[i])

            # 6. Handle overflow before adding the current digit
            # Check for potential positive overflow
            # If current result is already > INT_MAX // 10, or
            # if current result == INT_MAX // 10 and current digit > 7 (last digit of INT_MAX)
            if sign == 1 and (result > INT_MAX // 10 or (result == INT_MAX // 10 and digit > 7)):
                return INT_MAX
            # Check for potential negative overflow
            # If current result is already > INT_MAX // 10 (since result is stored as positive), or
            # if current result == INT_MAX // 10 and current digit > 8 (last digit of INT_MIN, which is 8, but -8 for negative comparison)
            if sign == -1 and (result > INT_MAX // 10 or (result == INT_MAX // 10 and digit > 8)):
                return INT_MIN # INT_MIN is -2147483648, INT_MAX is 2147483647

            result = result * 10 + digit
            i += 1

        # 5. Apply sign and 7. Return the integer
        return sign * result

# Example usage (not part of the class, just for demonstration)
if __name__ == "__main__":
    print("--- Longest Palindromic Substring (Expand Around Center) ---")
    print(f"'babad' -> {StringProblems.longest_palindromic_substring_expand_around_center('babad')}") # bab or aba
    print(f"'cbbd' -> {StringProblems.longest_palindromic_substring_expand_around_center('cbbd')}")   # bb
    print(f"'a' -> {StringProblems.longest_palindromic_substring_expand_around_center('a')}")         # a
    print(f"'ac' -> {StringProblems.longest_palindromic_substring_expand_around_center('ac')}")       # a
    print(f"'racecar' -> {StringProblems.longest_palindromic_substring_expand_around_center('racecar')}") # racecar

    print("\n--- Longest Palindromic Substring (DP) ---")
    print(f"'babad' -> {StringProblems.longest_palindromic_substring_dp('babad')}") # bab or aba
    print(f"'cbbd' -> {StringProblems.longest_palindromic_substring_dp('cbbd')}")   # bb
    print(f"'a' -> {StringProblems.longest_palindromic_substring_dp('a')}")         # a
    print(f"'ac' -> {StringProblems.longest_palindromic_substring_dp('ac')}")       # a
    print(f"'racecar' -> {StringProblems.longest_palindromic_substring_dp('racecar')}") # racecar

    print("\n--- Valid Parentheses ---")
    print(f"'()' -> {StringProblems.is_valid_parentheses('()')}")        # True
    print(f"'()[]{{}}' -> {StringProblems.is_valid_parentheses('()[]{}')}")  # True
    print(f"'(]' -> {StringProblems.is_valid_parentheses('(]')}")        # False
    print(f"'([)]' -> {StringProblems.is_valid_parentheses('([)]')}")    # False
    print(f"'{{[]}}' -> {StringProblems.is_valid_parentheses('{[]}')}")  # True
    print(f"'' -> {StringProblems.is_valid_parentheses('')}")            # True
    print(f"'{{' -> {StringProblems.is_valid_parentheses('{')}")          # False

    print("\n--- Group Anagrams ---")
    strs1 = ["eat","tea","tan","ate","nat","bat"]
    print(f"{strs1} -> {StringProblems.group_anagrams(strs1)}")
    # Expected: [['bat'], ['nat', 'tan'], ['eat', 'tea', 'ate']] (order may vary)
    strs2 = [""]
    print(f"{strs2} -> {StringProblems.group_anagrams(strs2)}") # [['']]
    strs3 = ["a"]
    print(f"{strs3} -> {StringProblems.group_anagrams(strs3)}") # [['a']]
    strs4 = ["abc", "bca", "cab", "xyz", "zyx"]
    print(f"{strs4} -> {StringProblems.group_anagrams(strs4)}")
    # Expected: [['abc', 'bca', 'cab'], ['xyz', 'zyx']] (order may vary)

    print("\n--- String to Integer (atoi) ---")
    print(f"'42' -> {StringProblems.string_to_integer_atoi('42')}")                 # 42
    print(f"'   -42' -> {StringProblems.string_to_integer_atoi('   -42')}")         # -42
    print(f"'4193 with words' -> {StringProblems.string_to_integer_atoi('4193 with words')}") # 4193
    print(f"'words and 987' -> {StringProblems.string_to_integer_atoi('words and 987')}") # 0
    print(f"'-91283472332' -> {StringProblems.string_to_integer_atoi('-91283472332')}") # -2147483648
    print(f"'2147483647' -> {StringProblems.string_to_integer_atoi('2147483647')}")     # 2147483647
    print(f"'2147483648' -> {StringProblems.string_to_integer_atoi('2147483648')}")     # 2147483647 (clamped)
    print(f"'-2147483648' -> {StringProblems.string_to_integer_atoi('-2147483648')}")   # -2147483648
    print(f"'-2147483649' -> {StringProblems.string_to_integer_atoi('-2147483649')}")   # -2147483648 (clamped)
    print(f"'  -0012a42' -> {StringProblems.string_to_integer_atoi('  -0012a42')}")   # -12
    print(f"'' -> {StringProblems.string_to_integer_atoi('')}")                     # 0
    print(f"'+-12' -> {StringProblems.string_to_integer_atoi('+-12')}")             # 0
    print(f"'   +0 123' -> {StringProblems.string_to_integer_atoi('   +0 123')}")   # 0