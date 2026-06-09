import unittest
from main_algorithms.problem5_next_greater_element import next_greater_elements_optimal

class TestNextGreaterElement(unittest.TestCase):

    def test_basic_cases(self):
        self.assertEqual(next_greater_elements_optimal([1, 2, 1]), [2, -1, 2])
        self.assertEqual(next_greater_elements_optimal([1, 2, 3, 4, 3]), [2, 3, 4, -1, 4])
        self.assertEqual(next_greater_elements_optimal([5, 4, 3, 2, 1]), [-1, 5, 5, 5, 5])

    def test_all_same_elements(self):
        self.assertEqual(next_greater_elements_optimal([1, 1, 1, 1, 1]), [-1, -1, -1, -1, -1])
        self.assertEqual(next_greater_elements_optimal([7, 7, 7]), [-1, -1, -1])

    def test_single_element(self):
        self.assertEqual(next_greater_elements_optimal([7]), [-1])

    def test_empty_array(self):
        self.assertEqual(next_greater_elements_optimal([]), [])

    def test_decreasing_sequence(self):
        self.assertEqual(next_greater_elements_optimal([4, 3, 2, 1]), [-1, 4, 4, 4])
        self.assertEqual(next_greater_elements_optimal([10, 8, 6, 4]), [-1, 10, 10, 10])

    def test_increasing_sequence(self):
        self.assertEqual(next_greater_elements_optimal([1, 2, 3, 4]), [2, 3, 4, 1])

    def test_mixed_elements(self):
        self.assertEqual(next_greater_elements_optimal([100, 1, 11, 1, 120, 111, 123, 1]), [120, 11, 120, 120, 123, 123, -1, 100])
        self.assertEqual(next_greater_elements_optimal([13, 7, 6, 12]), [-1, 12, 12, 13])
        self.assertEqual(next_greater_elements_optimal([2, 1, 2, 4, 3]), [4, 2, 4, -1, 4])

    def test_two_elements(self):
        self.assertEqual(next_greater_elements_optimal([1, 2]), [2, 1])
        self.assertEqual(next_greater_elements_optimal([2, 1]), [-1, 2])

    def test_complex_large_values(self):
        nums = [10, 3, 15, 2, 8, 12, 7, 18, 1, 9, 6]
        expected = [15, 15, 18, 8, 12, 18, 18, -1, 9, 10, 10]
        self.assertEqual(next_greater_elements_optimal(nums), expected)

        nums_reverse = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
        expected_reverse = [-1, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        self.assertEqual(next_greater_elements_optimal(nums_reverse), expected_reverse)


if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)