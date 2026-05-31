import collections
from src.utils import ListNode, list_to_linked_list, linked_list_to_list

"""
This file contains brute-force or less optimized solutions for some of the problems.
These are provided for comparison purposes, to highlight the efficiency gains
of the heap-based approaches.
"""

class KthLargestInStreamBruteForce:
    """
    Brute-force implementation for Kth Largest Element in a Stream.
    Stores all elements and sorts them on each `add` call.
    """
    def __init__(self, k: int, nums: list[int]):
        self.k = k
        self.stream = sorted(nums) # Keep initial nums sorted

    def add(self, val: int) -> int:
        # For simplicity, we'll just append and re-sort.
        # A proper insertion in sorted list would be O(N) but still slow for many adds.
        # This implementation just demonstrates the N log N sorting on demand.
        self.stream.append(val)
        self.stream.sort() # O(N log N) where N is current stream size
        
        # The k-th largest element is at index len(stream) - k
        return self.stream[len(self.stream) - self.k]

    # Another approach: Keep stream sorted using bisect for O(N) add
    # def __init__(self, k: int, nums: list[int]):
    #     self.k = k
    #     self.stream = sorted(nums)

    # def add(self, val: int) -> int:
    #     import bisect
    #     bisect.insort_left(self.stream, val) # O(N) to insert and shift
    #     return self.stream[len(self.stream) - self.k]


class MergeKSortedListsBruteForce:
    """
    Brute-force implementation for Merge K Sorted Lists.
    Collects all elements, sorts them, then reconstructs the linked list.
    """
    def mergeKLists(self, lists: list[ListNode]) -> ListNode:
        all_nodes_values = []
        for l in lists:
            current = l
            while current:
                all_nodes_values.append(current.val)
                current = current.next
        
        # Sort all elements. This is the bottleneck O(N log N)
        all_nodes_values.sort() 
        
        # Reconstruct the linked list O(N)
        dummy = ListNode(0)
        current = dummy
        for val in all_nodes_values:
            current.next = ListNode(val)
            current = current.next
        
        return dummy.next


class MedianFinderBruteForce:
    """
    Brute-force implementation for Find Median from Data Stream.
    Stores all elements in a list, sorts on demand to find median.
    """
    def __init__(self):
        self.data = []

    def addNum(self, num: int) -> None:
        self.data.append(num)

    def findMedian(self) -> float:
        if not self.data:
            return 0.0 # Or raise an error
        
        self.data.sort() # O(N log N) where N is current count of numbers
        n = len(self.data)
        
        if n % 2 == 1:
            return float(self.data[n // 2])
        else:
            mid1 = self.data[n // 2 - 1]
            mid2 = self.data[n // 2]
            return (float(mid1) + float(mid2)) / 2.0


class TopKFrequentElementsBruteForce:
    """
    Brute-force implementation for Top K Frequent Elements.
    Counts frequencies, then sorts all unique elements by frequency.
    """
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        if k == 0:
            return []
            
        freq_map = collections.Counter(nums) # O(N)
        
        # Convert to a list of (value, frequency) tuples and sort by frequency.
        # Sorting is O(M log M) where M is the number of unique elements.
        # This is the bottleneck if M is large.
        sorted_freq = sorted(freq_map.items(), key=lambda item: item[1], reverse=True)
        
        # Extract the top k elements. O(K)
        result = [item[0] for item in sorted_freq[:k]]
        
        return result

if __name__ == "__main__":
    print("--- Kth Largest Element in a Stream (Brute Force) ---")
    k_largest_bf = KthLargestInStreamBruteForce(3, [4, 5, 8, 2])
    print(f"Add 3: {k_largest_bf.add(3)}")   # Expected: 4
    print(f"Add 5: {k_largest_bf.add(5)}")   # Expected: 5
    
    print("\n--- Merge K Sorted Lists (Brute Force) ---")
    mkl_solver_bf = MergeKSortedListsBruteForce()
    lists_arrs = [[1,4,5],[1,3,4],[2,6]]
    lists_nodes = [list_to_linked_list(arr) for arr in lists_arrs]
    merged_head_bf = mkl_solver_bf.mergeKLists(lists_nodes)
    print(f"Merged List: {linked_list_to_list(merged_head_bf)}")
    # Expected: [1, 1, 2, 3, 4, 4, 5, 6]

    print("\n--- Find Median from Data Stream (Brute Force) ---")
    mf_bf = MedianFinderBruteForce()
    mf_bf.addNum(1)
    print(f"Add 1, Median: {mf_bf.findMedian()}") # Expected: 1.0
    mf_bf.addNum(2)
    print(f"Add 2, Median: {mf_bf.findMedian()}") # Expected: 1.5
    mf_bf.addNum(3)
    print(f"Add 3, Median: {mf_bf.findMedian()}") # Expected: 2.0

    print("\n--- Top K Frequent Elements (Brute Force) ---")
    tkf_solver_bf = TopKFrequentElementsBruteForce()
    nums1 = [1,1,1,2,2,3]
    k1 = 2
    print(f"Top {k1} frequent in {nums1}: {tkf_solver_bf.topKFrequent(nums1, k1)}") # Expected: [1, 2] or [2, 1]