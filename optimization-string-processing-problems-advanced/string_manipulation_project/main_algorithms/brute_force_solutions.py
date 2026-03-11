"""
Brute-force solutions for string manipulation problems, primarily for comparison with optimized versions.
These are less efficient but often simpler to understand initially.
"""

class BruteForceStringProblems:

    @staticmethod
    def _is_palindrome(s: str) -> bool:
        """Helper to check if a string is a palindrome."""
        return s == s[::-1]

    @staticmethod
    def longest_palindromic_substring_brute_force(s: str) -> str:
        """
        Problem 1: Longest Palindromic Substring (Brute Force)

        Checks every possible substring for palindrome property and returns the longest.

        Time Complexity: O(N^3)
            - Generating all substrings: O(N^2)
            - Checking each substring for palindrome: O(N) (due to slicing or iteration)
            - Total: N^2 * N = O(N^3)
        Space Complexity: O(1) (excluding space for the result substring, which is O(N) for string copy)
            - A few variables to store current max length and substring.
        """
        n = len(s)
        if n < 1:
            return ""
        if n == 1:
            return s

        longest_palindrome = s[0] # Initialize with the first character (at least one char is a palindrome)

        # Iterate through all possible starting points
        for i in range(n):
            # Iterate through all possible ending points (from i to n-1)
            for j in range(i, n):
                substring = s[i : j + 1]
                if BruteForceStringProblems._is_palindrome(substring):
                    if len(substring) > len(longest_palindrome):
                        longest_palindrome = substring
        return longest_palindrome

    @staticmethod
    def group_anagrams_brute_force(strs: list[str]) -> list[list[str]]:
        """
        Problem 3: Group Anagrams (Brute Force)

        Compares each string with every other string to check if they are anagrams.
        This involves sorting to check anagram property for each pair.

        Time Complexity: O(N^2 * K log K)
            - N is the number of strings.
            - K is the average length of a string.
            - We iterate through N strings. For each string, we iterate through the remaining N-1 strings.
            - To check if two strings of length K are anagrams, we typically sort them (O(K log K)) or use a character count map (O(K)).
            - Total: O(N * N * K log K) = O(N^2 * K log K) if sorting, or O(N^2 * K) if using char count map for comparison.
              Here, we sort each string for comparison, making it O(N^2 * K log K).
        Space Complexity: O(N * K)
            - Stores a boolean `visited` array (O(N)).
            - Stores groups of strings (O(N * K)).
        """
        n = len(strs)
        if n == 0:
            return []
        if n == 1:
            return [strs]

        result = []
        visited = [False] * n

        for i in range(n):
            if visited[i]:
                continue

            current_group = [strs[i]]
            visited[i] = True

            # Sort the current string to easily compare for anagrams
            s1_sorted = "".join(sorted(strs[i]))

            for j in range(i + 1, n):
                if visited[j]:
                    continue

                # Sort the other string and compare
                s2_sorted = "".join(sorted(strs[j]))

                if s1_sorted == s2_sorted:
                    current_group.append(strs[j])
                    visited[j] = True
            
            result.append(current_group)
        
        return result

# Example usage
if __name__ == "__main__":
    print("--- Longest Palindromic Substring (Brute Force) ---")
    print(f"'babad' -> {BruteForceStringProblems.longest_palindromic_substring_brute_force('babad')}")
    print(f"'cbbd' -> {BruteForceStringProblems.longest_palindromic_substring_brute_force('cbbd')}")
    print(f"'racecar' -> {BruteForceStringProblems.longest_palindromic_substring_brute_force('racecar')}")

    print("\n--- Group Anagrams (Brute Force) ---")
    strs1 = ["eat","tea","tan","ate","nat","bat"]
    print(f"{strs1} -> {BruteForceStringProblems.group_anagrams_brute_force(strs1)}")
    strs2 = [""]
    print(f"{strs2} -> {BruteForceStringProblems.group_anagrams_brute_force(strs2)}")
    strs3 = ["a"]
    print(f"{strs3} -> {BruteForceStringProblems.group_anagrams_brute_force(strs3)}")