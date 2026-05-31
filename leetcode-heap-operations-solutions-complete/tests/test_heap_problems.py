import unittest
import random
from src.heap_problems import KthLargestInStream, MergeKSortedLists, MedianFinder, TopKFrequentElements
from src.utils import ListNode, list_to_linked_list, linked_list_to_list

class TestKthLargestInStream(unittest.TestCase):
    
    def test_example_case(self):
        k_largest = KthLargestInStream(3, [4, 5, 8, 2])
        self.assertEqual(k_largest.add(3), 4)
        self.assertEqual(k_largest.add(5), 5)
        self.assertEqual(k_largest.add(10), 5)
        self.assertEqual(k_largest.add(9), 8)
        self.assertEqual(k_largest.add(4), 8)

    def test_k_is_one(self):
        k_largest = KthLargestInStream(1, [10])
        self.assertEqual(k_largest.add(5), 10)
        self.assertEqual(k_largest.add(15), 15)
        self.assertEqual(k_largest.add(2), 15)

    def test_empty_initial_nums(self):
        k_largest = KthLargestInStream(2, [])
        self.assertEqual(k_largest.add(10), 10)
        self.assertEqual(k_largest.add(5), 5)
        self.assertEqual(k_largest.add(20), 10)
        self.assertEqual(k_largest.add(3), 10)
        self.assertEqual(k_largest.add(12), 12)

    def test_all_same_numbers(self):
        k_largest = KthLargestInStream(3, [7, 7, 7])
        self.assertEqual(k_largest.add(7), 7)
        self.assertEqual(k_largest.add(7), 7)

    def test_large_numbers(self):
        k_largest = KthLargestInStream(5, [10000, 20000, 5000, 15000, 25000])
        self.assertEqual(k_largest.add(12000), 15000)
        self.assertEqual(k_largest.add(30000), 20000)
        self.assertEqual(k_largest.add(1000), 20000) # smaller than current 5th largest
        self.assertEqual(k_largest.add(22000), 22000)

    def test_negative_numbers(self):
        k_largest = KthLargestInStream(2, [-10, -5, -1])
        self.assertEqual(k_largest.add(-7), -5)
        self.assertEqual(k_largest.add(-2), -2)
        self.assertEqual(k_largest.add(0), 0)
        self.assertEqual(k_largest.add(-3), 0)

    def test_k_equal_to_initial_nums_length(self):
        k_largest = KthLargestInStream(4, [1, 2, 3, 4])
        self.assertEqual(k_largest.add(0), 1)
        self.assertEqual(k_largest.add(5), 2)
        self.assertEqual(k_largest.add(-1), 2)

    def test_long_random_stream(self):
        k = 10
        initial_nums = [random.randint(1, 1000) for _ in range(50)]
        k_largest = KthLargestInStream(k, initial_nums)
        
        stream_data = initial_nums[:]
        
        for _ in range(100):
            val = random.randint(1, 1000)
            stream_data.append(val)
            expected_kth_largest = sorted(stream_data, reverse=True)[k-1]
            self.assertEqual(k_largest.add(val), expected_kth_largest)


class TestMergeKSortedLists(unittest.TestCase):
    def setUp(self):
        self.solver = MergeKSortedLists()

    def test_example_case(self):
        lists_arrs = [[1,4,5],[1,3,4],[2,6]]
        lists_nodes = [list_to_linked_list(arr) for arr in lists_arrs]
        merged_head = self.solver.mergeKLists(lists_nodes)
        self.assertEqual(linked_list_to_list(merged_head), [1,1,2,3,4,4,5,6])

    def test_empty_input_list(self):
        lists_nodes = []
        merged_head = self.solver.mergeKLists(lists_nodes)
        self.assertIsNone(merged_head)

    def test_list_of_empty_lists(self):
        lists_arrs = [[], [], []]
        lists_nodes = [list_to_linked_list(arr) for arr in lists_arrs]
        merged_head = self.solver.mergeKLists(lists_nodes)
        self.assertIsNone(merged_head)

    def test_single_list(self):
        lists_arrs = [[1,2,3,4,5]]
        lists_nodes = [list_to_linked_list(arr) for arr in lists_arrs]
        merged_head = self.solver.mergeKLists(lists_nodes)
        self.assertEqual(linked_list_to_list(merged_head), [1,2,3,4,5])

    def test_lists_with_duplicates(self):
        lists_arrs = [[1,1,1], [1,2,2], [3,3,3]]
        lists_nodes = [list_to_linked_list(arr) for arr in lists_arrs]
        merged_head = self.solver.mergeKLists(lists_nodes)
        self.assertEqual(linked_list_to_list(merged_head), [1,1,1,1,2,2,3,3,3])

    def test_mixed_empty_and_non_empty_lists(self):
        lists_arrs = [[], [1, 5, 9], [], [2, 6, 10], [3, 7, 11]]
        lists_nodes = [list_to_linked_list(arr) for arr in lists_arrs]
        merged_head = self.solver.mergeKLists(lists_nodes)
        self.assertEqual(linked_list_to_list(merged_head), [1, 2, 3, 5, 6, 7, 9, 10, 11])
        
    def test_large_number_of_lists_and_elements(self):
        k = 100
        n_per_list = 100
        lists_arrs = []
        for _ in range(k):
            start = random.randint(0, 1000)
            current_list = sorted([random.randint(start, start + 500) for _ in range(n_per_list)])
            lists_arrs.append(current_list)

        lists_nodes = [list_to_linked_list(arr) for arr in lists_arrs]
        merged_head = self.solver.mergeKLists(lists_nodes)
        
        expected_merged = []
        for arr in lists_arrs:
            expected_merged.extend(arr)
        expected_merged.sort()
        
        self.assertEqual(linked_list_to_list(merged_head), expected_merged)

    def test_negative_numbers(self):
        lists_arrs = [[-5,-3,-1], [-4,-2,0], [-6,-0.5]] # Added a float to test general numbers
        lists_nodes = [list_to_linked_list(arr) for arr in lists_arrs]
        merged_head = self.solver.mergeKLists(lists_nodes)
        self.assertEqual(linked_list_to_list(merged_head), [-6,-5,-4,-3,-2,-1,-0.5,0])

    def test_brute_force_alternative(self):
        # Test the brute force method with the same cases
        lists_arrs = [[1,4,5],[1,3,4],[2,6]]
        lists_nodes = [list_to_linked_list(arr) for arr in lists_arrs]
        merged_head = self.solver.mergeKLists_brute_force(lists_nodes)
        self.assertEqual(linked_list_to_list(merged_head), [1,1,2,3,4,4,5,6])

        lists_arrs = [[], [1, 5, 9], [], [2, 6, 10], [3, 7, 11]]
        lists_nodes = [list_to_linked_list(arr) for arr in lists_arrs]
        merged_head = self.solver.mergeKLists_brute_force(lists_nodes)
        self.assertEqual(linked_list_to_list(merged_head), [1, 2, 3, 5, 6, 7, 9, 10, 11])


class TestMedianFinder(unittest.TestCase):
    def test_example_case(self):
        mf = MedianFinder()
        mf.addNum(1)
        self.assertEqual(mf.findMedian(), 1.0)
        mf.addNum(2)
        self.assertEqual(mf.findMedian(), 1.5)
        mf.addNum(3)
        self.assertEqual(mf.findMedian(), 2.0)

    def test_even_number_of_elements(self):
        mf = MedianFinder()
        mf.addNum(10)
        mf.addNum(20)
        self.assertEqual(mf.findMedian(), 15.0)
        mf.addNum(5)
        self.assertEqual(mf.findMedian(), 10.0)
        mf.addNum(25)
        self.assertEqual(mf.findMedian(), 15.0)

    def test_odd_number_of_elements(self):
        mf = MedianFinder()
        mf.addNum(1)
        mf.addNum(5)
        mf.addNum(3)
        self.assertEqual(mf.findMedian(), 3.0)
        mf.addNum(2)
        self.assertEqual(mf.findMedian(), 2.5)
        mf.addNum(4)
        self.assertEqual(mf.findMedian(), 3.0)

    def test_duplicates(self):
        mf = MedianFinder()
        mf.addNum(1)
        mf.addNum(1)
        self.assertEqual(mf.findMedian(), 1.0)
        mf.addNum(2)
        self.assertEqual(mf.findMedian(), 1.0)
        mf.addNum(2)
        self.assertEqual(mf.findMedian(), 1.5)

    def test_negative_numbers(self):
        mf = MedianFinder()
        mf.addNum(-1)
        self.assertEqual(mf.findMedian(), -1.0)
        mf.addNum(-2)
        self.assertEqual(mf.findMedian(), -1.5)
        mf.addNum(0)
        self.assertEqual(mf.findMedian(), -1.0)
        mf.addNum(-10)
        self.assertEqual(mf.findMedian(), -1.5)

    def test_mixed_numbers(self):
        mf = MedianFinder()
        mf.addNum(-10)
        self.assertEqual(mf.findMedian(), -10.0)
        mf.addNum(20)
        self.assertEqual(mf.findMedian(), 5.0)
        mf.addNum(5)
        self.assertEqual(mf.findMedian(), 5.0)
        mf.addNum(-5)
        self.assertEqual(mf.findMedian(), 0.0)
        mf.addNum(15)
        self.assertEqual(mf.findMedian(), 5.0)
        mf.addNum(0)
        self.assertEqual(mf.findMedian(), 2.5)

    def test_large_number_of_additions(self):
        mf = MedianFinder()
        nums = []
        for _ in range(1000):
            num = random.randint(-1000, 1000)
            mf.addNum(num)
            nums.append(num)
            nums.sort()
            
            n = len(nums)
            if n % 2 == 1:
                expected_median = float(nums[n // 2])
            else:
                expected_median = (float(nums[n // 2 - 1]) + float(nums[n // 2])) / 2.0
            
            self.assertAlmostEqual(mf.findMedian(), expected_median, places=5)

    def test_single_element_case(self):
        mf = MedianFinder()
        mf.addNum(7)
        self.assertEqual(mf.findMedian(), 7.0)

    def test_no_elements_case(self):
        mf = MedianFinder()
        # Depending on problem spec, this might raise an error or return 0.0
        # Current implementation returns 0.0
        self.assertEqual(mf.findMedian(), 0.0) 


class TestTopKFrequentElements(unittest.TestCase):
    def setUp(self):
        self.solver = TopKFrequentElements()

    def test_example_case_1(self):
        nums = [1,1,1,2,2,3]
        k = 2
        result = self.solver.topKFrequent(nums, k)
        # Order does not matter, so convert to set for comparison
        self.assertSetEqual(set(result), {1, 2})
        self.assertEqual(len(result), k)

    def test_example_case_2(self):
        nums = [1]
        k = 1
        result = self.solver.topKFrequent(nums, k)
        self.assertSetEqual(set(result), {1})
        self.assertEqual(len(result), k)

    def test_all_elements_same_frequency(self):
        nums = [1,2,3,4,5,6]
        k = 3
        result = self.solver.topKFrequent(nums, k)
        self.assertEqual(len(result), k)
        # All have frequency 1, any 3 elements are valid
        self.assertTrue(set(result).issubset(set(nums)))

    def test_k_equals_number_of_unique_elements(self):
        nums = [1,1,2,2,3,3,4,4]
        k = 4
        result = self.solver.topKFrequent(nums, k)
        self.assertSetEqual(set(result), {1,2,3,4})
        self.assertEqual(len(result), k)

    def test_k_equals_zero(self):
        nums = [1,1,1,2,2,3]
        k = 0
        result = self.solver.topKFrequent(nums, k)
        self.assertEqual(result, [])

    def test_empty_nums(self):
        nums = []
        k = 1
        result = self.solver.topKFrequent(nums, k)
        self.assertEqual(result, [])

    def test_negative_numbers(self):
        nums = [4,1,-1,2,-1,2,3]
        k = 2
        result = self.solver.topKFrequent(nums, k)
        self.assertSetEqual(set(result), {-1, 2})
        self.assertEqual(len(result), k)

    def test_large_input(self):
        nums = [random.randint(1, 1000) for _ in range(10000)]
        k = 50
        result = self.solver.topKFrequent(nums, k)
        self.assertEqual(len(result), k)
        
        # Verify correctness using collections.Counter and sorting
        counts = collections.Counter(nums)
        sorted_counts = sorted(counts.items(), key=lambda item: item[1], reverse=True)
        expected_top_k_elements = {item[0] for item in sorted_counts[:k]}
        self.assertSetEqual(set(result), expected_top_k_elements)

    def test_bucket_sort_alternative(self):
        nums1 = [1,1,1,2,2,3]
        k1 = 2
        result1 = self.solver.topKFrequent_bucket_sort(nums1, k1)
        self.assertSetEqual(set(result1), {1, 2})
        self.assertEqual(len(result1), k1)

        nums3 = [4,1,-1,2,-1,2,3]
        k3 = 2
        result3 = self.solver.topKFrequent_bucket_sort(nums3, k3)
        self.assertSetEqual(set(result3), {-1, 2})
        self.assertEqual(len(result3), k3)
        
        nums_large = [random.randint(1, 1000) for _ in range(10000)]
        k_large = 50
        result_large = self.solver.topKFrequent_bucket_sort(nums_large, k_large)
        self.assertEqual(len(result_large), k_large)
        counts = collections.Counter(nums_large)
        sorted_counts = sorted(counts.items(), key=lambda item: item[1], reverse=True)
        expected_top_k_elements = {item[0] for item in sorted_counts[:k_large]}
        self.assertSetEqual(set(result_large), expected_top_k_elements)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)