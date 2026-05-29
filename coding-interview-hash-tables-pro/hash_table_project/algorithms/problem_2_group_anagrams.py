"""
Problem 2: Group Anagrams

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
typically using all the original letters exactly once.

Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
Input: strs = [""]
Output: [[""]]

Example 3:
Input: strs = ["a"]
Output: [["a"]]
"""
from collections import defaultdict

class GroupAnagrams:
    def __init__(self):
        pass

    # Approach 1: Using Sorted String as Key (Optimal and Common)
    # The idea is that all anagrams will have the same sorted string representation.
    # We use a hash map where the key is the sorted string and the value is a list
    # of strings that are anagrams of each other.
    def group_anagrams_sorted_key(self, strs: list[str]) -> list[list[str]]:
        """
        Groups anagrams using a hash map where the key is the sorted version of the string.

        Time Complexity: O(N * K log K)
            - N is the number of strings in the input list `strs`.
            - K is the maximum length of a string in `strs`.
            - For each of the N strings, we sort it, which takes O(K log K) time.
            - Hash map operations (insertion/lookup) take O(K) time on average
              because the key (sorted string) has length K.
            - Therefore, the dominant operation is sorting each string.

        Space Complexity: O(N * K)
            - In the worst case, all strings are distinct (no anagrams), and each string
              is stored once as a value in the hash map.
            - The keys (sorted strings) also take up O(N * K) space in total.
        """
        anagram_groups = defaultdict(list) # Defaultdict simplifies adding to lists

        for s in strs:
            # Sort the string to create a canonical key for anagrams
            sorted_s = "".join(sorted(s))
            anagram_groups[sorted_s].append(s)

        # Return the values of the hash map, which are the lists of anagrams
        return list(anagram_groups.values())

    # Approach 2: Using Character Count Tuple as Key (Alternative Optimal)
    # Instead of sorting, we can count the occurrences of each character for a string.
    # Since there are only 26 lowercase English letters, a tuple of 26 integers
    # representing character counts can serve as a unique key for anagrams.
    def group_anagrams_count_key(self, strs: list[str]) -> list[list[str]]:
        """
        Groups anagrams using a hash map where the key is a tuple representing
        the character count of each string (e.g., (0,1,0,0,...)).

        Time Complexity: O(N * K)
            - N is the number of strings in the input list `strs`.
            - K is the maximum length of a string in `strs`.
            - For each of the N strings, we iterate through its K characters
              to count character frequencies. This takes O(K) time.
            - Creating the tuple (26 elements) takes O(1) (constant time).
            - Hash map operations (insertion/lookup) take O(1) on average
              because the key (tuple of fixed size 26) has constant length.
            - Therefore, the dominant operation is iterating through each string.
            - This is often faster than O(N * K log K) for larger K values.

        Space Complexity: O(N * K)
            - Similar to the sorted key approach, in the worst case, all strings
              are distinct and stored as values.
            - The keys (count tuples) take up O(N * 26) which simplifies to O(N)
              since 26 is a constant. So total space is O(N * K).
        """
        anagram_groups = defaultdict(list)

        for s in strs:
            # Create a character count array/list (fixed size 26 for 'a' through 'z')
            count = [0] * 26
            for char in s:
                count[ord(char) - ord('a')] += 1
            
            # Use the tuple of counts as the key for the hash map
            # A tuple is immutable and thus hashable, unlike a list.
            anagram_groups[tuple(count)].append(s)
        
        return list(anagram_groups.values())

    # Approach 3: Brute Force (Conceptual - Not Recommended for Interview)
    # This approach would involve iterating through all pairs of strings and checking
    # if they are anagrams. To check if two strings are anagrams, you could sort both
    # and compare them, or count character frequencies for both and compare.
    # This is highly inefficient but demonstrates the "non-hash table" thinking.
    def group_anagrams_brute_force(self, strs: list[str]) -> list[list[str]]:
        """
        Brute force approach to group anagrams. This is primarily for conceptual
        understanding of why hash tables are superior.
        It involves sorting and comparing strings for every pair.

        Time Complexity: O(N^2 * K log K)
            - Outer loop N iterations.
            - Inner loop N iterations.
            - Anagram check for two strings: O(K log K) for sorting two strings of length K.
            - Alternatively, an O(K) check if using char counts for the check,
              leading to O(N^2 * K).

        Space Complexity: O(N * K) for storing results and intermediate sorted strings.
        """
        if not strs:
            return []

        # Keep track of which strings have already been grouped
        grouped_indices = [False] * len(strs)
        result = []

        for i in range(len(strs)):
            if grouped_indices[i]:
                continue

            current_group = [strs[i]]
            grouped_indices[i] = True

            # Sort the current string once for comparison
            sorted_s_i = "".join(sorted(strs[i]))

            for j in range(i + 1, len(strs)):
                if not grouped_indices[j]:
                    # Sort the other string for comparison
                    sorted_s_j = "".join(sorted(strs[j]))
                    if sorted_s_i == sorted_s_j:
                        current_group.append(strs[j])
                        grouped_indices[j] = True
            result.append(current_group)
        return result


# Example Usage:
if __name__ == "__main__":
    solver = GroupAnagrams()

    test_cases = [
        (["eat", "tea", "tan", "ate", "nat", "bat"],
         [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']]), # Order of inner lists doesn't matter
        ([""], [[""]]),
        (["a"], [["a"]]),
        ([], []),
        (["abc", "bca", "xyz"], [["abc", "bca"], ["xyz"]]), # Mixed case - problem implies lowercase
        (["ab", "ba", "xy", "yx", "cd"], [["ab", "ba"], ["xy", "yx"], ["cd"]]),
        (["listen", "silent", "enlist", "hello", "world"],
         [["listen", "silent", "enlist"], ["hello"], ["world"]])
    ]

    # Helper to check if two lists of lists are equivalent, ignoring order
    def compare_groups(result, expected):
        if len(result) != len(expected):
            return False
        # Convert inner lists to sorted tuples for comparison (to ignore order within groups)
        # And outer list to sorted tuple to ignore order of groups
        normalized_result = sorted([tuple(sorted(group)) for group in result])
        normalized_expected = sorted([tuple(sorted(group)) for group in expected])
        return normalized_result == normalized_expected

    print("--- Sorted Key Approach (Optimal) ---")
    for strs, expected_groups in test_cases:
        result = solver.group_anagrams_sorted_key(strs)
        is_match = compare_groups(result, expected_groups)
        print(f"Input: {strs}, Result: {result}, Expected: {expected_groups}, Match: {is_match}")

    print("\n--- Character Count Key Approach (Alternative Optimal) ---")
    for strs, expected_groups in test_cases:
        result = solver.group_anagrams_count_key(strs)
        is_match = compare_groups(result, expected_groups)
        print(f"Input: {strs}, Result: {result}, Expected: {expected_groups}, Match: {is_match}")
    
    # Brute force might be too slow for large inputs, so limit test cases
    print("\n--- Brute Force Approach (Conceptual) ---")
    for strs, expected_groups in test_cases[:3]: # Only test a few small cases
        result = solver.group_anagrams_brute_force(strs)
        is_match = compare_groups(result, expected_groups)
        print(f"Input: {strs}, Result: {result}, Expected: {expected_groups}, Match: {is_match}")