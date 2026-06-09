import unittest
from main_algorithms.problem1_valid_parentheses import is_valid_parentheses_optimal, is_valid_parentheses_alternative

class TestValidParentheses(unittest.TestCase):

    def test_optimal_valid_cases(self):
        self.assertTrue(is_valid_parentheses_optimal("()"))
        self.assertTrue(is_valid_parentheses_optimal("()[]{}"))
        self.assertTrue(is_valid_parentheses_optimal("{[]}"))
        self.assertTrue(is_valid_parentheses_optimal("([{}])"))
        self.assertTrue(is_valid_parentheses_optimal("((()))"))
        self.assertTrue(is_valid_parentheses_optimal("")) # Empty string is valid

    def test_optimal_invalid_cases(self):
        self.assertFalse(is_valid_parentheses_optimal("("))
        self.assertFalse(is_valid_parentheses_optimal("]"))
        self.assertFalse(is_valid_parentheses_optimal(")(("))
        self.assertFalse(is_valid_parentheses_optimal("([)]"))
        self.assertFalse(is_valid_parentheses_optimal("{[}]"))
        self.assertFalse(is_valid_parentheses_optimal("{{{"))
        self.assertFalse(is_valid_parentheses_optimal(")))"))
        self.assertFalse(is_valid_parentheses_optimal("(()"))
        self.assertFalse(is_valid_parentheses_optimal("()))"))
        self.assertFalse(is_valid_parentheses_optimal("(((())))("))

    def test_alternative_valid_cases(self):
        self.assertTrue(is_valid_parentheses_alternative("()"))
        self.assertTrue(is_valid_parentheses_alternative("()[]{}"))
        self.assertTrue(is_valid_parentheses_alternative("{[]}"))
        self.assertTrue(is_valid_parentheses_alternative("([{}])"))
        self.assertTrue(is_valid_parentheses_alternative("((()))"))
        self.assertTrue(is_valid_parentheses_alternative("")) # Empty string is valid

    def test_alternative_invalid_cases(self):
        self.assertFalse(is_valid_parentheses_alternative("("))
        self.assertFalse(is_valid_parentheses_alternative("]"))
        self.assertFalse(is_valid_parentheses_alternative(")(("))
        self.assertFalse(is_valid_parentheses_alternative("([)]"))
        self.assertFalse(is_valid_parentheses_alternative("{[}]"))
        self.assertFalse(is_valid_parentheses_alternative("{{{"))
        self.assertFalse(is_valid_parentheses_alternative(")))"))
        self.assertFalse(is_valid_parentheses_alternative("(()"))
        self.assertFalse(is_valid_parentheses_alternative("()))"))
        self.assertFalse(is_valid_parentheses_alternative("(((())))("))

    def test_mixed_brackets(self):
        self.assertTrue(is_valid_parentheses_optimal("{([])}"))
        self.assertFalse(is_valid_parentheses_optimal("(()("))
        self.assertTrue(is_valid_parentheses_alternative("{([])}"))
        self.assertFalse(is_valid_parentheses_alternative("(()("))

    def test_long_string(self):
        long_valid = "({[]})" * 1000
        self.assertTrue(is_valid_parentheses_optimal(long_valid))
        long_invalid_unclosed = long_valid + "("
        self.assertFalse(is_valid_parentheses_optimal(long_invalid_unclosed))
        long_invalid_mismatched = long_valid[:-1] + "]" # Change ')' to ']'
        self.assertFalse(is_valid_parentheses_optimal(long_invalid_mismatched))

        self.assertTrue(is_valid_parentheses_alternative(long_valid))
        self.assertFalse(is_valid_parentheses_alternative(long_invalid_unclosed))
        self.assertFalse(is_valid_parentheses_alternative(long_invalid_mismatched))

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)