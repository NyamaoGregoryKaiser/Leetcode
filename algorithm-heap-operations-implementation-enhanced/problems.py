import heapq
from heap import MinHeap, MaxHeap

def heap_sort(arr):
    """Sorts an array using a heap.  Time: O(n log n), Space: O(1)"""
    heapq.heapify(arr) #O(n)
    return [heapq.heappop(arr) for _ in range(len(arr))] # O(n log n)


def find_kth_largest(nums, k):
    """Finds the kth largest element in an array. Time: O(n log k), Space: O(k)"""
    return heapq.nlargest(k, nums)[-1]


#  Merge K Sorted Lists (requires ListNode definition - omitted for brevity)
# def merge_k_sorted_lists(lists):
#     ...


def top_k_frequent(nums, k):
    """Finds the top k frequent elements. Time: O(n log k), Space: O(n)"""
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1
    return heapq.nlargest(k, counts.keys(), key=counts.get)


# Meeting Rooms II (requires Interval definition - omitted for brevity)
# def meeting_rooms_ii(intervals):
#     ...