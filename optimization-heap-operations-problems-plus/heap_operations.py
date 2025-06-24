```python
import heapq

class MinHeap:
    def __init__(self):
        self.heap = []

    def push(self, item):
        heapq.heappush(self.heap, item)

    def pop(self):
        return heapq.heappop(self.heap)

    def peek(self):
        return self.heap[0] if self.heap else None

    def __len__(self):
        return len(self.heap)


def heap_sort(arr):
    """Sorts an array using heapsort.  O(n log n) time, O(1) space."""
    heapq.heapify(arr)  # O(n)
    sorted_arr = [heapq.heappop(arr) for _ in range(len(arr))] # O(n log n)
    return sorted_arr


def find_kth_largest(nums, k):
    """Finds the kth largest element in an array using a min-heap. O(n log k) time, O(k) space."""
    min_heap = nums[:k]
    heapq.heapify(min_heap)

    for num in nums[k:]:
        if num > min_heap[0]:
            heapq.heapreplace(min_heap, num)
    return min_heap[0]


# Add implementations for Merge K Sorted Lists and Top K Frequent Elements here.  These will be more involved.

```