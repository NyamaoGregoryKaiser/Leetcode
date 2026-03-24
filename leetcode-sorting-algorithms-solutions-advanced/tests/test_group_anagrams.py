import unittest
from sorting_problems.group_anagrams import (
    group_anagrams_sort_key,
    group_anagrams_count_key
)

class TestGroupAnagrams(unittest.TestCase):

    def setUp(self):
        self.functions = [
            (group_anagrams_sort_key, "Sort Key"),
            (group_anagrams_count_key, "Count Key")
        ]

    def _assert_equal_unordered_lists(self, actual, expected, msg=""):
        """
        Helper to assert equality of two lists of lists, where the order
        of inner lists and elements within inner lists does not matter.
        """
        self.assertEqual(len(actual), len(expected), msg=f"Number of groups mismatch: {msg}")
        
        # Normalize by sorting inner lists and then sorting the outer list
        normalized_actual = sorted([sorted(group) for group in actual])
        normalized_expected = sorted([sorted(group) for group in expected])
        
        self.assertEqual(normalized_actual, normalized_expected, msg=msg)

    def test_basic_cases(self):
        strs1 = ["eat", "tea", "tan", "ate", "nat", "bat"]
        expected1 = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
        
        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} for {strs1}"):
                result = func(list(strs1))
                self._assert_equal_unordered_lists(result, expected1)

        strs2 = ["a"]
        expected2 = [["a"]]
        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} for {strs2}"):
                result = func(list(strs2))
                self._assert_equal_unordered_lists(result, expected2)

        strs3 = [""]
        expected3 = [[""]]
        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} for {strs3}"):
                result = func(list(strs3))
                self._assert_equal_unordered_lists(result, expected3)

    def test_no_anagrams(self):
        strs = ["hello", "world", "python"]
        expected = [["hello"], ["world"], ["python"]]
        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} for {strs}"):
                result = func(list(strs))
                self._assert_equal_unordered_lists(result, expected)

    def test_all_anagrams(self):
        strs = ["abc", "bca", "cab"]
        expected = [["abc", "bca", "cab"]]
        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} for {strs}"):
                result = func(list(strs))
                self._assert_equal_unordered_lists(result, expected)

    def test_empty_string_mix(self):
        strs = ["", "b", "", "a"]
        expected = [["", ""], ["a"], ["b"]]
        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} for {strs}"):
                result = func(list(strs))
                self._assert_equal_unordered_lists(result, expected)

    def test_longer_strings(self):
        strs = ["listen", "silent", "enlist", "banana", "nanaba"]
        expected = [["listen", "silent", "enlist"], ["banana", "nanaba"]]
        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} for {strs}"):
                result = func(list(strs))
                self._assert_equal_unordered_lists(result, expected)

    def test_case_sensitivity(self):
        # Anagrams typically ignore case, but problem implies exact match
        # Our current solutions are case-sensitive (lowercase a != uppercase A)
        strs = ["Aa", "aa", "aA"]
        expected_sort_key = [["aa"], ["Aa", "aA"]] # sorted(('A','a')) == ('A','a')
        expected_count_key = [["Aa"], ["aa", "aA"]] # counts different for 'A' and 'a'
        
        # Test sort_key
        with self.subTest(msg="Testing Sort Key with case sensitivity"):
            result = group_anagrams_sort_key(list(strs))
            # Sort Key will put "Aa" and "aA" in the same group, "aa" in another
            # Sorted tuple for "Aa" is ('A', 'a')
            # Sorted tuple for "aA" is ('A', 'a')
            # Sorted tuple for "aa" is ('a', 'a')
            self._assert_equal_unordered_lists(result, [["Aa", "aA"], ["aa"]])

        # Test count_key
        with self.subTest(msg="Testing Count Key with case sensitivity"):
            result = group_anagrams_count_key(list(strs))
            # Count Key will treat 'A' and 'a' as different characters,
            # so they will likely be in separate groups based on character codes.
            # "Aa" -> count for 'A', count for 'a'
            # "aA" -> count for 'A', count for 'a' (same key as "Aa")
            # "aa" -> count for 'a', count for 'a' (different key)
            self._assert_equal_unordered_lists(result, [["Aa", "aA"], ["aa"]])
            
        # If problem intends case-insensitivity, strings should be converted to lower/upper case first.

    def test_different_lengths_no_anagrams(self):
        strs = ["a", "ab", "abc"]
        expected = [["a"], ["ab"], ["abc"]]
        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} for {strs}"):
                result = func(list(strs))
                self._assert_equal_unordered_lists(result, expected)

    def test_large_input(self):
        strs = ["".join(sorted("abc" * i)) for i in range(1, 10)] + \
               ["".join(sorted("xyz" * i)) for i in range(1, 10)] + \
               ["random" + str(i) for i in range(10)]
        
        # Expected structure: 9 groups of "abc" anagrams, 9 groups of "xyz" anagrams, 10 unique random strings.
        # But since we generate them with sorted chars, they become canonical and group by length.
        # Let's make a more realistic large input:
        base_words = ["apple", "banana", "cherry", "grape", "orange"]
        test_words = []
        for word in base_words:
            test_words.append(word)
            # Add some anagrams by shuffling
            for _ in range(3):
                shuffled_word = list(word)
                random.shuffle(shuffled_word)
                test_words.append("".join(shuffled_word))
        # Add some unique words
        for i in range(50):
            test_words.append(f"unique{i}")
        
        # Get expected results by using one of the functions
        expected_sort_key = group_anagrams_sort_key(list(test_words))

        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} for large input"):
                result = func(list(test_words))
                self._assert_equal_unordered_lists(result, expected_sort_key)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)