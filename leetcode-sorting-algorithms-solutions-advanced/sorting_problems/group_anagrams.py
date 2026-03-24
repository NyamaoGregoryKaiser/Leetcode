from collections import defaultdict

# Problem: Group Anagrams
# Given an array of strings `strs`, group the anagrams together.
# You can return the answer in any order.
# An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
# typically using all the original letters exactly once.

# --- Approach 1: Sort Characters to Create a Key ---
# Time Complexity: O(N * L log L)
#   N: number of strings in `strs`
#   L: maximum length of a string
#   For each string, we sort its characters, which takes O(L log L).
#   We do this for N strings. Dictionary operations (insertion/lookup) are O(L) on average
#   because the key is a string of length L.
# Space Complexity: O(N * L) in the worst case, where all strings are unique anagrams,
#   and we store all N strings and their sorted keys.

def group_anagrams_sort_key(strs: list[str]) -> list[list[str]]:
    """
    Groups anagrams by sorting the characters of each word to create a canonical key.

    Args:
        strs (list[str]): A list of strings.

    Returns:
        list[list[str]]: A list of lists, where each inner list contains anagrams.
    """
    if not strs:
        return []

    # Use a dictionary where keys are sorted tuples of characters (canonical form)
    # and values are lists of original strings that are anagrams.
    anagram_groups = defaultdict(list)

    for s in strs:
        # Convert string to a list of characters, sort it, then convert back to a tuple.
        # A tuple is used as a dictionary key because lists are mutable and cannot be keys.
        # A string could also be used: `key = "".join(sorted(s))`
        sorted_s_tuple = tuple(sorted(s))
        anagram_groups[sorted_s_tuple].append(s)

    # Convert the dictionary values (lists of anagrams) into a list of lists.
    return list(anagram_groups.values())

# Example: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
# "eat" -> sorted("eat") -> ('a', 'e', 't') -> anagram_groups[('a', 'e', 't')] = ["eat"]
# "tea" -> sorted("tea") -> ('a', 'e', 't') -> anagram_groups[('a', 'e', 't')] = ["eat", "tea"]
# "tan" -> sorted("tan") -> ('a', 'n', 't') -> anagram_groups[('a', 'n', 't')] = ["tan"]
# "ate" -> sorted("ate") -> ('a', 'e', 't') -> anagram_groups[('a', 'e', 't')] = ["eat", "tea", "ate"]
# "nat" -> sorted("nat") -> ('a', 'n', 't') -> anagram_groups[('a', 'n', 't')] = ["tan", "nat"]
# "bat" -> sorted("bat") -> ('a', 'b', 't') -> anagram_groups[('a', 'b', 't')] = ["bat"]
# Result: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]


# --- Approach 2: Count Characters to Create a Key (More efficient for fixed, small alphabet) ---
# Time Complexity: O(N * (L + K)) where K is the size of the alphabet (e.g., 26 for lowercase English).
#   N: number of strings in `strs`
#   L: maximum length of a string
#   For each string, we iterate through its characters to build a count array, which takes O(L).
#   Then we convert this count array (or tuple) to a key, which takes O(K) time.
#   Total for N strings: O(N * (L + K)).
#   This is better than O(N * L log L) if K is significantly smaller than L log L.
#   For English alphabet (K=26), this is effectively O(N * L) as K is a constant.
# Space Complexity: O(N * L) in the worst case (similar to sort_key approach).

def group_anagrams_count_key(strs: list[str]) -> list[list[str]]:
    """
    Groups anagrams by counting character frequencies to create a canonical key.
    This approach is particularly efficient for a fixed, small alphabet like lowercase English letters.

    Args:
        strs (list[str]): A list of strings.

    Returns:
        list[list[str]]: A list of lists, where each inner list contains anagrams.
    """
    if not strs:
        return []

    anagram_groups = defaultdict(list)

    for s in strs:
        # Create a count array (or tuple) for the characters in the string.
        # For lowercase English letters, an array of 26 zeros is sufficient.
        # The index represents 'a' + offset (e.g., 0 for 'a', 1 for 'b', ..., 25 for 'z').
        char_counts = [0] * 26
        for char in s:
            char_counts[ord(char) - ord('a')] += 1

        # Convert the count array to a tuple to use as a dictionary key.
        # Example: "aab" -> (2,1,0,0,...) for ('a','b',...)
        count_tuple_key = tuple(char_counts)
        anagram_groups[count_tuple_key].append(s)

    return list(anagram_groups.values())

# Example: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
# "eat" -> counts[0]=1, counts[4]=1, counts[19]=1 -> (1,0,0,0,1,0,...,0,1,0,0,0,0) -> anagram_groups[...] = ["eat"]
# "tea" -> counts[0]=1, counts[4]=1, counts[19]=1 -> (1,0,0,0,1,0,...,0,1,0,0,0,0) -> anagram_groups[...] = ["eat", "tea"]
# ... and so on.

# Comparing the two approaches:
# - `sort_key`: More general, works for any character set (Unicode, numbers, symbols) without modification.
#   Its performance depends on the efficiency of the sorting algorithm for strings/lists of characters.
# - `count_key`: Optimized for fixed, small alphabets. If the alphabet is very large or unknown,
#   this approach might require a hash map for character counts which would then have different performance
#   characteristics (O(L) to build map, O(K') to convert to tuple where K' is number of unique chars).
#   For standard interview settings (lowercase English), `count_key` is often preferred for its
#   better theoretical time complexity.