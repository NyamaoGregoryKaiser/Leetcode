import heapq
import collections
from src.min_heap import MinHeap
from src.max_heap import MaxHeap
from src.utils import ListNode, list_to_linked_list

class KthLargestInStream:
    """
    Problem 1: Kth Largest Element in a Stream
    
    Design a class that finds the k-th largest element in a stream.
    Note that it is the k-th largest element in the sorted order, not the k-th distinct element.
    
    Implement the `KthLargestInStream` class:
    - `KthLargestInStream(int k, int[] nums)` Initializes the object with the integer `k` and the stream of integers `nums`.
    - `int add(int val)` Appends a new integer `val` to the stream and returns the element representing the k-th largest element.
    
    Example:
    k = 3, nums = [4, 5, 8, 2]
    kthLargest = KthLargestInStream(3, nums)
    kthLargest.add(3);   // return 4
    kthLargest.add(5);   // return 5
    kthLargest.add(10);  // return 5
    kthLargest.add(9);   // return 8
    kthLargest.add(4);   // return 8
    """

    def __init__(self, k: int, nums: list[int]):
        """
        Initializes the KthLargestInStream object.
        
        Args:
            k (int): The k-th position for the largest element.
            nums (list[int]): Initial stream of numbers.
        
        Algorithm:
        We maintain a min-heap of size `k`. This min-heap will always store the `k` largest
        elements seen so far. The root of this min-heap (the smallest element in the heap)
        will be the k-th largest element overall.
        
        If an incoming number `val` is larger than the root of the min-heap,
        it means `val` is potentially one of the `k` largest. We pop the current smallest
        (which is no longer among the `k` largest) and push `val`.
        If `val` is smaller or equal to the root, it cannot be among the `k` largest,
        so we simply ignore it.
        
        Time Complexity: O(N log K) for initialization (N initial elements),
                         O(log K) for each `add` operation.
        Space Complexity: O(K) to store the min-heap.
        """
        self.k = k
        self.min_heap = [] # Using Python's heapq for efficiency
        
        for num in nums:
            self.add(num) # Utilize the add method to populate and maintain heap size

    def add(self, val: int) -> int:
        """
        Adds a new integer to the stream and returns the k-th largest element.
        
        Args:
            val (int): The new integer to add.
            
        Returns:
            int: The k-th largest element in the stream after adding `val`.
        
        Time Complexity: O(log K) - `heappush` and `heappop` operations take logarithmic time
                                    with respect to the heap's size K.
        Space Complexity: O(1) per call, as the heap size is capped at K.
        """
        if len(self.min_heap) < self.k:
            # If heap is not yet full, just add the element
            heapq.heappush(self.min_heap, val)
        elif val > self.min_heap[0]:
            # If heap is full and the new element is larger than the smallest
            # element in the heap (which is the k-th largest so far),
            # remove the smallest and add the new element.
            heapq.heapreplace(self.min_heap, val) # More efficient than pop then push
            
        # The k-th largest element is always at the root of the min-heap
        return self.min_heap[0]

    # Alternative Implementation: Using custom MinHeap class (for demonstration)
    # The performance characteristics are similar to heapq, but heapq is C-optimized.
    # def __init__(self, k: int, nums: list[int]):
    #     self.k = k
    #     self.min_heap = MinHeap()
    #     for num in nums:
    #         self.add(num)

    # def add(self, val: int) -> int:
    #     if self.min_heap.size() < self.k:
    #         self.min_heap.push(val)
    #     elif val > self.min_heap.peek():
    #         self.min_heap.pop()
    #         self.min_heap.push(val)
    #     return self.min_heap.peek()


class MergeKSortedLists:
    """
    Problem 2: Merge K Sorted Lists
    
    You are given an array of k linked-lists, each sorted in ascending order.
    Merge all the linked-lists into one sorted linked-list and return it.
    
    Example:
    Input: lists = [[1,4,5],[1,3,4],[2,6]]
    Output: [1,1,2,3,4,4,5,6]
    Explanation: The linked-lists are:
    [
      1->4->5,
      1->3->4,
      2->6
    ]
    merging them into one sorted list:
    1->1->2->3->4->4->5->6
    """

    def mergeKLists(self, lists: list[ListNode]) -> ListNode:
        """
        Merges k sorted linked lists into one sorted linked list.
        
        Args:
            lists (list[ListNode]): A list of heads of sorted linked lists.
            
        Returns:
            ListNode: The head of the merged sorted linked list.
            
        Algorithm:
        This problem is a classic application of a min-heap.
        We need to efficiently find the smallest element among the heads of `k` lists.
        A min-heap is perfect for this.
        
        1. Initialize a min-heap.
        2. For each non-empty list in `lists`, push its head node into the min-heap.
           (The ListNode class needs to implement `__lt__` for comparison based on `val`).
        3. Create a dummy head for the merged list and a `current` pointer.
        4. While the min-heap is not empty:
           a. Pop the node with the smallest value from the heap. This node is the next
              element in our merged list.
           b. Append this node to the merged list (`current.next = popped_node`).
           c. Advance the `current` pointer (`current = current.next`).
           d. If the popped node has a `next` element, push that `next` element into the heap.
        5. Return `dummy_head.next`.
        
        Time Complexity: O(N log K), where N is the total number of elements across all lists,
                         and K is the number of linked lists.
                         - Pushing K elements initially: O(K log K)
                         - Each of N elements is pushed and popped once: O(N log K)
        Space Complexity: O(K) for the min-heap, which stores at most K list nodes (one from each list).
        """
        if not lists:
            return None

        # Using Python's `heapq` module directly. `ListNode` needs `__lt__` implemented.
        min_heap = []
        
        # Push the head of each list into the heap if it's not None
        for i, head in enumerate(lists):
            if head:
                heapq.heappush(min_heap, head) # Node with smallest val will be at top

        dummy_head = ListNode(0)
        current = dummy_head

        while min_heap:
            # Pop the smallest node from the heap
            node = heapq.heappop(min_heap)
            
            # Append it to the merged list
            current.next = node
            current = current.next
            
            # If the popped node has a next element, push it to the heap
            if node.next:
                heapq.heappush(min_heap, node.next)
                
        return dummy_head.next

    # Alternative implementation: Using custom MinHeap (requires `__lt__` in ListNode)
    # def mergeKLists_custom_heap(self, lists: list[ListNode]) -> ListNode:
    #     if not lists:
    #         return None

    #     min_heap = MinHeap()
    #     for head in lists:
    #         if head:
    #             min_heap.push(head)

    #     dummy_head = ListNode(0)
    #     current = dummy_head

    #     while not min_heap.is_empty():
    #         node = min_heap.pop()
    #         current.next = node
    #         current = current.next
    #         if node.next:
    #             min_heap.push(node.next)
                
    #     return dummy_head.next

    # Brute Force Alternative (Less Optimal): Concatenate all lists and sort
    # Time Complexity: O(N log N) where N is total number of elements.
    # Space Complexity: O(N) for storing all elements in an array.
    # This is less efficient than the heap approach if K is much smaller than N.
    def mergeKLists_brute_force(self, lists: list[ListNode]) -> ListNode:
        all_nodes = []
        for l in lists:
            current = l
            while current:
                all_nodes.append(current.val)
                current = current.next
        
        all_nodes.sort() # O(N log N)
        
        dummy = ListNode(0)
        current = dummy
        for val in all_nodes:
            current.next = ListNode(val)
            current = current.next
        
        return dummy.next


class MedianFinder:
    """
    Problem 3: Find Median from Data Stream
    
    The median is the middle value in an ordered integer list. If the size of the list is even,
    there is no single middle value, and the median is the average of the two middle values.
    
    Implement the `MedianFinder` class:
    - `MedianFinder()` initializes the MedianFinder object.
    - `void addNum(int num)` adds an integer number from the data stream to the data structure.
    - `double findMedian()` returns the median of all elements so far. Answers within 10^-5 of the actual answer will be accepted.
    
    Example:
    MedianFinder mf = new MedianFinder();
    mf.addNum(1);    // arr = [1]
    mf.addNum(2);    // arr = [1, 2]
    mf.findMedian(); // return 1.5
    mf.addNum(3);    // arr = [1, 2, 3]
    mf.findMedian(); // return 2.0
    """

    def __init__(self):
        """
        Initializes the MedianFinder object.
        
        Algorithm: Two Heaps (Max-Heap for lower half, Min-Heap for upper half)
        We use two heaps to keep track of the numbers:
        1. `max_heap_lower_half`: A max-heap to store the smaller half of the numbers.
           The largest element in this heap (`max_heap_lower_half.peek()`) will be
           the largest among the smaller half.
        2. `min_heap_upper_half`: A min-heap to store the larger half of the numbers.
           The smallest element in this heap (`min_heap_upper_half.peek()`) will be
           the smallest among the larger half.
        
        The goal is to keep these two heaps balanced such that:
        - `max_heap_lower_half.size()` is either equal to `min_heap_upper_half.size()`,
          or `max_heap_lower_half.size()` is one greater than `min_heap_upper_half.size()`.
        - All elements in `max_heap_lower_half` are less than or equal to all elements
          in `min_heap_upper_half`.
          
        This ensures that the median can be found quickly:
        - If sizes are equal, median is `(max_heap_lower_half.peek() + min_heap_upper_half.peek()) / 2`.
        - If `max_heap_lower_half` has one more element, median is `max_heap_lower_half.peek()`.
        
        Time Complexity: O(1) for initialization.
        Space Complexity: O(N) where N is the total number of elements added.
        """
        # Python's heapq is a min-heap. For max-heap, we store negative values.
        self.max_heap_lower_half = []  # Stores the smaller half of numbers, effectively a max-heap
        self.min_heap_upper_half = []  # Stores the larger half of numbers, effectively a min-heap

    def addNum(self, num: int) -> None:
        """
        Adds an integer number from the data stream to the data structure.
        
        Args:
            num (int): The number to add.
            
        Time Complexity: O(log N), where N is the current number of elements.
                         Each push/pop operation on a heap takes logarithmic time.
        """
        # Step 1: Add the number to one of the heaps.
        # Initially, push to max_heap_lower_half.
        # Use -num for max-heap behavior with heapq.
        heapq.heappush(self.max_heap_lower_half, -num)

        # Step 2: Balance the heaps - ensure max_heap_lower_half.peek() <= min_heap_upper_half.peek()
        # If max_heap_lower_half's top is greater than min_heap_upper_half's top, swap them.
        if (self.max_heap_lower_half and self.min_heap_upper_half and
                (-self.max_heap_lower_half[0] > self.min_heap_upper_half[0])):
            
            # Pop from max_heap_lower_half (get its largest element)
            val = -heapq.heappop(self.max_heap_lower_half)
            # Push to min_heap_upper_half
            heapq.heappush(self.min_heap_upper_half, val)
        
        # Step 3: Balance the sizes - max_heap_lower_half can have at most one more element.
        # If max_heap_lower_half is too large, move its largest to min_heap_upper_half.
        if len(self.max_heap_lower_half) > len(self.min_heap_upper_half) + 1:
            val = -heapq.heappop(self.max_heap_lower_half)
            heapq.heappush(self.min_heap_upper_half, val)
        # If min_heap_upper_half is too large, move its smallest to max_heap_lower_half.
        elif len(self.min_heap_upper_half) > len(self.max_heap_lower_half):
            val = heapq.heappop(self.min_heap_upper_half)
            heapq.heappush(self.max_heap_lower_half, -val)

    def findMedian(self) -> float:
        """
        Returns the median of all elements so far.
        
        Returns:
            float: The median value.
            
        Time Complexity: O(1) - Peeking at the top of heaps is an O(1) operation.
        """
        # If total number of elements is odd, median is the top of the larger heap (max_heap_lower_half).
        if len(self.max_heap_lower_half) > len(self.min_heap_upper_half):
            return -self.max_heap_lower_half[0]
        # If total number of elements is even, median is the average of the two heap tops.
        else: # len(self.max_heap_lower_half) == len(self.min_heap_upper_half)
            if not self.max_heap_lower_half: # Should only happen if no numbers added yet
                return 0.0 # Or raise an error
            return (-self.max_heap_lower_half[0] + self.min_heap_upper_half[0]) / 2.0

    # Alternative Implementation: Using custom MinHeap/MaxHeap classes
    # def __init__(self):
    #     self.max_heap_lower_half = MaxHeap()
    #     self.min_heap_upper_half = MinHeap()

    # def addNum(self, num: int) -> None:
    #     self.max_heap_lower_half.push(num)

    #     if (not self.min_heap_upper_half.is_empty() and 
    #             self.max_heap_lower_half.peek() > self.min_heap_upper_half.peek()):
    #         val = self.max_heap_lower_half.pop()
    #         self.min_heap_upper_half.push(val)
        
    #     if self.max_heap_lower_half.size() > self.min_heap_upper_half.size() + 1:
    #         val = self.max_heap_lower_half.pop()
    #         self.min_heap_upper_half.push(val)
    #     elif self.min_heap_upper_half.size() > self.max_heap_lower_half.size():
    #         val = self.min_heap_upper_half.pop()
    #         self.max_heap_lower_half.push(val)

    # def findMedian(self) -> float:
    #     if self.max_heap_lower_half.size() > self.min_heap_upper_half.size():
    #         return float(self.max_heap_lower_half.peek())
    #     else:
    #         if self.max_heap_lower_half.is_empty():
    #             return 0.0 # Or handle error
    #         return (float(self.max_heap_lower_half.peek()) + self.min_heap_upper_half.peek()) / 2.0


class TopKFrequentElements:
    """
    Problem 4: Top K Frequent Elements
    
    Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.
    You may return the answer in any order.
    
    Example:
    Input: nums = [1,1,1,2,2,3], k = 2
    Output: [1,2]
    
    Input: nums = [1], k = 1
    Output: [1]
    """

    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        """
        Finds the k most frequent elements in an array.
        
        Args:
            nums (list[int]): The input integer array.
            k (int): The number of most frequent elements to return.
            
        Returns:
            list[int]: A list containing the k most frequent elements.
            
        Algorithm:
        1. Count Frequencies: Use a hash map (dictionary in Python) to store the frequency
           of each number in `nums`. This takes O(N) time.
        2. Use a Min-Heap: Iterate through the frequency map. For each `(number, frequency)` pair:
           a. Push the pair `(frequency, number)` into a min-heap.
           b. If the heap's size exceeds `k`, pop the smallest element (i.e., the element
              with the lowest frequency among the top `k` candidates).
           This ensures that the heap always contains the `k` elements with the highest frequencies
           seen so far. The root of the min-heap will have the smallest frequency among these `k` elements.
        3. Extract Results: Once all frequencies are processed, the heap contains `k` elements.
           Pop all elements from the heap to get the top `k` frequent elements.
           
        Time Complexity: O(N + M log K), where N is the number of elements in `nums`,
                         and M is the number of unique elements in `nums` (M <= N).
                         - Counting frequencies: O(N)
                         - Pushing/Popping M elements from heap, each O(log K): O(M log K)
        Space Complexity: O(M) for the frequency map, and O(K) for the min-heap.
                          Overall: O(M) (since K <= M).
        """
        if k == 0:
            return []
            
        # Step 1: Count frequencies
        # Time: O(N), Space: O(M) where M is number of unique elements
        freq_map = collections.Counter(nums)
        
        # Step 2: Use a min-heap to keep track of the k most frequent elements
        # The heap will store tuples of (frequency, number).
        # Python's heapq is a min-heap, so it will naturally prioritize smaller frequencies.
        # Time: O(M log K), Space: O(K)
        min_heap = []
        for num, freq in freq_map.items():
            heapq.heappush(min_heap, (freq, num))
            if len(min_heap) > k:
                heapq.heappop(min_heap) # Remove the element with the smallest frequency
                
        # Step 3: Extract results from the heap
        # Time: O(K log K) or O(K) if just iterating through existing heap items
        # Pop all elements from the heap to get the numbers
        result = [item[1] for item in min_heap]
        
        return result

    # Alternative implementation using a custom MinHeap
    # def topKFrequent_custom_heap(self, nums: list[int], k: int) -> list[int]:
    #     if k == 0:
    #         return []
            
    #     freq_map = collections.Counter(nums)
    #     min_heap = MinHeap()

    #     for num, freq in freq_map.items():
    #         # Push (frequency, number) tuple. MinHeap will sort by frequency by default.
    #         min_heap.push((freq, num))
    #         if min_heap.size() > k:
    #             min_heap.pop()
                
    #     result = []
    #     while not min_heap.is_empty():
    #         result.append(min_heap.pop()[1])
        
    #     # Elements popped from a min-heap will be in ascending order of frequency.
    #     # The problem allows any order, so this is fine.
    #     # If specific order is required (e.g., descending frequency), we would need to reverse or use a max-heap.
    #     return result

    # Alternative: Bucket Sort (more efficient for specific constraints)
    # Time Complexity: O(N) because counting and bucket filling/iterating are linear.
    # Space Complexity: O(N) for frequency map and buckets.
    # This is often considered the most optimal if max frequency is not excessively large.
    def topKFrequent_bucket_sort(self, nums: list[int], k: int) -> list[int]:
        if k == 0:
            return []

        freq_map = collections.Counter(nums)
        # Create buckets where index is frequency and value is a list of numbers
        # The maximum possible frequency is len(nums)
        buckets = [[] for _ in range(len(nums) + 1)] # bucket[0] is unused

        for num, freq in freq_map.items():
            buckets[freq].append(num)

        result = []
        # Iterate from highest possible frequency down to 1
        for i in range(len(nums), 0, -1):
            for num in buckets[i]:
                result.append(num)
                if len(result) == k:
                    return result
        return result

# Example usage for testing purposes
if __name__ == "__main__":
    print("--- Kth Largest Element in a Stream ---")
    k_largest = KthLargestInStream(3, [4, 5, 8, 2])
    print(f"Add 3: {k_largest.add(3)}")   # Expected: 4
    print(f"Add 5: {k_largest.add(5)}")   # Expected: 5
    print(f"Add 10: {k_largest.add(10)}") # Expected: 5
    print(f"Add 9: {k_largest.add(9)}")   # Expected: 8
    print(f"Add 4: {k_largest.add(4)}")   # Expected: 8

    print("\n--- Merge K Sorted Lists ---")
    mkl_solver = MergeKSortedLists()
    lists_arrs = [[1,4,5],[1,3,4],[2,6]]
    lists_nodes = [list_to_linked_list(arr) for arr in lists_arrs]
    merged_head = mkl_solver.mergeKLists(lists_nodes)
    print(f"Merged List: {list_to_linked_list(lists_arrs)} -> {list_to_linked_list_to_list(merged_head)}")
    # Expected: [1, 1, 2, 3, 4, 4, 5, 6]

    lists_arrs_empty = [[], [-1, 0, 5], [10, 11]]
    lists_nodes_empty = [list_to_linked_list(arr) for arr in lists_arrs_empty]
    merged_head_empty = mkl_solver.mergeKLists(lists_nodes_empty)
    print(f"Merged List (with empty): {list_to_linked_list_to_list(merged_head_empty)}")
    # Expected: [-1, 0, 5, 10, 11]

    print("\n--- Find Median from Data Stream ---")
    mf = MedianFinder()
    mf.addNum(1)
    print(f"Add 1, Median: {mf.findMedian()}") # Expected: 1.0
    mf.addNum(2)
    print(f"Add 2, Median: {mf.findMedian()}") # Expected: 1.5
    mf.addNum(3)
    print(f"Add 3, Median: {mf.findMedian()}") # Expected: 2.0
    mf.addNum(0)
    print(f"Add 0, Median: {mf.findMedian()}") # Expected: 1.5
    mf.addNum(5)
    print(f"Add 5, Median: {mf.findMedian()}") # Expected: 2.0

    print("\n--- Top K Frequent Elements ---")
    tkf_solver = TopKFrequentElements()
    nums1 = [1,1,1,2,2,3]
    k1 = 2
    print(f"Top {k1} frequent in {nums1}: {tkf_solver.topKFrequent(nums1, k1)}") # Expected: [1, 2] or [2, 1]

    nums2 = [1]
    k2 = 1
    print(f"Top {k2} frequent in {nums2}: {tkf_solver.topKFrequent(nums2, k2)}") # Expected: [1]

    nums3 = [4,1,-1,2,-1,2,3]
    k3 = 2
    print(f"Top {k3} frequent in {nums3}: {tkf_solver.topKFrequent(nums3, k3)}") # Expected: [-1, 2] or [2, -1]

    nums4 = [1,2,3,4,5,6]
    k4 = 3
    print(f"Top {k4} frequent in {nums4}: {tkf_solver.topKFrequent(nums4, k4)}") # Expected: Any 3 unique elements, e.g., [1,2,3] (order can vary)

    print("\n--- Top K Frequent Elements (Bucket Sort) ---")
    print(f"Top {k1} frequent in {nums1} (Bucket Sort): {tkf_solver.topKFrequent_bucket_sort(nums1, k1)}") # Expected: [1, 2] or [2, 1]
    print(f"Top {k3} frequent in {nums3} (Bucket Sort): {tkf_solver.topKFrequent_bucket_sort(nums3, k3)}") # Expected: [-1, 2] or [2, -1]