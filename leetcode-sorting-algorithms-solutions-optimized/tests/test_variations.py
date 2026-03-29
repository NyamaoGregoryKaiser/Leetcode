import unittest
import random
import copy
from algorithms.variations import (
    Person,
    sort_people_by_age_then_name,
    sort_people_with_custom_cmp,
    find_kth_largest_by_sorting,
    find_kth_largest_by_heap,
    find_kth_largest_by_quickselect,
    sort_colors_dutch_national_flag,
    sort_colors_counting_sort,
    wiggle_sort_sort_then_swap,
    wiggle_sort_linear_pass
)

class TestSortingVariations(unittest.TestCase):

    # --- Test Custom Object Sorting ---
    def test_sort_people_empty(self):
        people = []
        expected = []
        sort_people_by_age_then_name(people)
        self.assertEqual(people, expected)
        sort_people_with_custom_cmp(people) # Test with custom cmp too
        self.assertEqual(people, expected)

    def test_sort_people_single(self):
        people = [Person("Alice", 30)]
        expected = [Person("Alice", 30)]
        sort_people_by_age_then_name(people)
        self.assertEqual(people[0].name, expected[0].name)
        self.assertEqual(people[0].age, expected[0].age)

    def test_sort_people_basic(self):
        people = [
            Person("Bob", 25),
            Person("Alice", 30),
            Person("Charlie", 20),
        ]
        expected = [
            Person("Charlie", 20),
            Person("Bob", 25),
            Person("Alice", 30),
        ]
        sort_people_by_age_then_name(people)
        self.assertEqual([(p.name, p.age) for p in people], [(p.name, p.age) for p in expected])

        people_copy = [
            Person("Bob", 25),
            Person("Alice", 30),
            Person("Charlie", 20),
        ]
        sort_people_with_custom_cmp(people_copy)
        self.assertEqual([(p.name, p.age) for p in people_copy], [(p.name, p.age) for p in expected])

    def test_sort_people_same_age(self):
        people = [
            Person("Bob", 25),
            Person("Alice", 25),
            Person("Charlie", 30),
        ]
        expected = [
            Person("Alice", 25),
            Person("Bob", 25),
            Person("Charlie", 30),
        ]
        sort_people_by_age_then_name(people)
        self.assertEqual([(p.name, p.age) for p in people], [(p.name, p.age) for p in expected])

        people_copy = [
            Person("Bob", 25),
            Person("Alice", 25),
            Person("Charlie", 30),
        ]
        sort_people_with_custom_cmp(people_copy)
        self.assertEqual([(p.name, p.age) for p in people_copy], [(p.name, p.age) for p in expected])

    def test_sort_people_complex(self):
        people = [
            Person("David", 25),
            Person("Charlie", 30),
            Person("Alice", 20),
            Person("Eve", 25),
            Person("Bob", 20),
            Person("Frank", 30),
        ]
        expected = [
            Person("Alice", 20),
            Person("Bob", 20),
            Person("David", 25),
            Person("Eve", 25),
            Person("Charlie", 30),
            Person("Frank", 30),
        ]
        sort_people_by_age_then_name(people)
        self.assertEqual([(p.name, p.age) for p in people], [(p.name, p.age) for p in expected])

        people_copy = [
            Person("David", 25),
            Person("Charlie", 30),
            Person("Alice", 20),
            Person("Eve", 25),
            Person("Bob", 20),
            Person("Frank", 30),
        ]
        sort_people_with_custom_cmp(people_copy)
        self.assertEqual([(p.name, p.age) for p in people_copy], [(p.name, p.age) for p in expected])


    # --- Test Kth Largest Element ---
    def _test_kth_largest(self, func):
        self.assertEqual(func([3,2,1,5,6,4], 2), 5)
        self.assertEqual(func([3,2,3,1,2,4,5,5,6], 4), 4)
        self.assertEqual(func([1], 1), 1)
        self.assertEqual(func([7,6,5,4,3,2,1], 5), 3)
        self.assertEqual(func([10, 5, 2, 8, 1, 9, 3, 7, 4, 6], 3), 8)
        self.assertEqual(func([10, 5, 2, 8, 1, 9, 3, 7, 4, 6], 1), 10)
        self.assertEqual(func([10, 5, 2, 8, 1, 9, 3, 7, 4, 6], 10), 1)

        # Edge cases with duplicates
        self.assertEqual(func([3, 2, 3, 1, 2, 4, 5, 5, 6], 1), 6)
        self.assertEqual(func([3, 2, 3, 1, 2, 4, 5, 5, 6], 9), 1)

        # Large random array
        nums = [random.randint(0, 1000) for _ in range(1000)]
        k_val = random.randint(1, 1000)
        expected = sorted(nums, reverse=True)[k_val - 1]
        self.assertEqual(func(nums, k_val), expected)

    def test_kth_largest_by_sorting(self):
        self._test_kth_largest(find_kth_largest_by_sorting)

    def test_kth_largest_by_heap(self):
        self._test_kth_largest(find_kth_largest_by_heap)

    def test_kth_largest_by_quickselect(self):
        self._test_kth_largest(find_kth_largest_by_quickselect)


    # --- Test Sort Colors ---
    def _test_sort_colors(self, func):
        arr = [2,0,2,1,1,0]
        func(arr)
        self.assertEqual(arr, [0,0,1,1,2,2])

        arr = [2,0,1]
        func(arr)
        self.assertEqual(arr, [0,1,2])

        arr = [0]
        func(arr)
        self.assertEqual(arr, [0])

        arr = [1]
        func(arr)
        self.assertEqual(arr, [1])

        arr = [2]
        func(arr)
        self.assertEqual(arr, [2])

        arr = []
        func(arr)
        self.assertEqual(arr, [])

        arr = [0,0,0,0,0]
        func(arr)
        self.assertEqual(arr, [0,0,0,0,0])

        arr = [1,1,1,1,1]
        func(arr)
        self.assertEqual(arr, [1,1,1,1,1])

        arr = [2,2,2,2,2]
        func(arr)
        self.assertEqual(arr, [2,2,2,2,2])

        arr = [1,0,2,0,1,2,0,1,2]
        func(arr)
        self.assertEqual(arr, [0,0,0,1,1,1,2,2,2])

        # Random large array
        nums = [random.choice([0, 1, 2]) for _ in range(1000)]
        expected = sorted(nums) # Python's sort will produce the expected output
        func(nums)
        self.assertEqual(nums, expected)

    def test_sort_colors_dutch_national_flag(self):
        self._test_sort_colors(sort_colors_dutch_national_flag)

    def test_sort_colors_counting_sort(self):
        self._test_sort_colors(sort_colors_counting_sort)


    # --- Test Wiggle Sort ---
    def _is_wiggle_sorted(self, nums):
        if len(nums) <= 1:
            return True
        for i in range(len(nums) - 1):
            if i % 2 == 0: # Even index, expect nums[i] <= nums[i+1]
                if nums[i] > nums[i+1]:
                    return False
            else: # Odd index, expect nums[i] >= nums[i+1]
                if nums[i] < nums[i+1]:
                    return False
        return True

    def _test_wiggle_sort(self, func):
        test_cases = [
            [],
            [1],
            [1, 2],
            [2, 1],
            [3, 5, 2, 1, 6, 4],
            [1, 2, 3, 4, 5],
            [5, 4, 3, 2, 1],
            [1, 1, 1, 1, 1],
            [1, 5, 1, 6, 4, 2, 8, 9, 7],
            [10, 0, 9, 1, 8, 2, 7, 3, 6, 4, 5]
        ]
        for arr in test_cases:
            with self.subTest(arr=arr, func=func.__name__):
                arr_copy = list(arr)
                func(arr_copy)
                self.assertTrue(self._is_wiggle_sorted(arr_copy), f"Failed for input: {arr}, output: {arr_copy}")

        # Large random arrays
        for _ in range(5):
            nums = [random.randint(0, 100) for _ in range(random.randint(5, 50))]
            with self.subTest(arr=nums, func=func.__name__):
                nums_copy = list(nums)
                func(nums_copy)
                self.assertTrue(self._is_wiggle_sorted(nums_copy), f"Failed for input: {nums}, output: {nums_copy}")

    def test_wiggle_sort_sort_then_swap(self):
        self._test_wiggle_sort(wiggle_sort_sort_then_swap)

    def test_wiggle_sort_linear_pass(self):
        self._test_wiggle_sort(wiggle_sort_linear_pass)


if __name__ == '__main__':
    unittest.main()