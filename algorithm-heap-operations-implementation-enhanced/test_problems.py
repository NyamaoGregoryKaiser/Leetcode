import unittest
from problems import heap_sort, find_kth_largest, top_k_frequent

class TestHeapProblems(unittest.TestCase):
    def test_heap_sort(self):
        self.assertEqual(heap_sort([5, 2, 8, 1, 9, 4]), [1, 2, 4, 5, 8, 9])

    def test_find_kth_largest(self):
        self.assertEqual(find_kth_largest([3,2,1,5,6,4], 2), 5)
        self.assertEqual(find_kth_largest([3,2,3,1,2,4,5,5,6], 4), 4)

    def test_top_k_frequent(self):
        self.assertEqual(top_k_frequent([1,1,1,2,2,3], 2), [1,2])
        self.assertEqual(top_k_frequent([1],1),[1])

if __name__ == '__main__':
    unittest.main()