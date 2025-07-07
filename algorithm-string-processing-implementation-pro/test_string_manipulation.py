```python
import unittest
from string_manipulation import reverse_string, is_palindrome, longest_palindrome_substring, string_compression, are_anagrams

class TestStringManipulation(unittest.TestCase):
    def test_reverse_string(self):
        self.assertEqual(reverse_string("hello"), "olleh")
        self.assertEqual(reverse_string(""), "")
        self.assertEqual(reverse_string("a"), "a")

    def test_is_palindrome(self):
        self.assertTrue(is_palindrome("racecar"))
        self.assertTrue(is_palindrome("A man, a plan, a canal: Panama"))
        self.assertFalse(is_palindrome("hello"))

    def test_longest_palindrome_substring(self):
        self.assertEqual(longest_palindrome_substring("babad"), "bab" or "aba") #Multiple possibilities
        self.assertEqual(longest_palindrome_substring("cbbd"), "bb")
        self.assertEqual(longest_palindrome_substring("a"), "a")

    def test_string_compression(self):
        self.assertEqual(string_compression("aabcccccaaa"), "a2b1c5a3")
        self.assertEqual(string_compression("abcd"), "abcd")
        self.assertEqual(string_compression(""), "")

    def test_are_anagrams(self):
        self.assertTrue(are_anagrams("listen", "silent"))
        self.assertTrue(are_anagrams("abc", "bca"))
        self.assertFalse(are_anagrams("abc", "abd"))

if __name__ == '__main__':
    unittest.main()
```