```python
import unittest
from sorting_algorithms import merge_sort, quick_sort, heap_sort, bubble_sort, kth_smallest

class TestSortingAlgorithms(unittest.TestCase):
    def test_merge_sort(self):
        arr = [3, 1, 4, 1, 5, 9, 2, 6]
        self.assertEqual(merge_sort(arr), sorted(arr))
        self.assertEqual(merge_sort([]), [])
        self.assertEqual(merge_sort([1]), [1])

    def test_quick_sort(self):
        arr = [3, 1, 4, 1, 5, 9, 2, 6]
        self.assertEqual(quick_sort(arr), sorted(arr))
        self.assertEqual(quick_sort([]), [])
        self.assertEqual(quick_sort([1]), [1])

    def test_heap_sort(self):
        arr = [3, 1, 4, 1, 5, 9, 2, 6]
        self.assertEqual(heap_sort(arr), sorted(arr))
        self.assertEqual(heap_sort([]), [])
        self.assertEqual(heap_sort([1]), [1])

    def test_bubble_sort(self): #Test for bubble sort (less efficient)
        arr = [3, 1, 4, 1, 5, 9, 2, 6]
        self.assertEqual(bubble_sort(arr), sorted(arr))
        self.assertEqual(bubble_sort([]), [])
        self.assertEqual(bubble_sort([1]), [1])


    def test_kth_smallest(self):
        arr = [3, 1, 4, 1, 5, 9, 2, 6]
        self.assertEqual(kth_smallest(arr, 1), 1)
        self.assertEqual(kth_smallest(arr, 3), 2)
        self.assertEqual(kth_smallest(arr, 8), 9)


if __name__ == '__main__':
    unittest.main()
```