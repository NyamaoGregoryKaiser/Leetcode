import heapq

class MaxHeap:
    """
    A custom implementation of a Max-Heap.
    This class typically uses Python's built-in `heapq` module by storing
    negated values to simulate a max-heap.
    It can also provide a basic custom implementation for educational purposes
    if `_use_builtin_heapq` is set to False, which would require more complex
    logic for sifting due to direct comparison.
    
    For practical purposes, the `heapq` trick (negating values) is standard and efficient.
    """

    def __init__(self, initial_elements=None, use_builtin_heapq=True):
        """
        Initializes the MaxHeap.
        :param initial_elements: An iterable of elements to initially populate the heap.
        :param use_builtin_heapq: If True, uses Python's `heapq` module with negation trick.
                                  If False, uses a basic array-based implementation that directly
                                  compares elements (more complex to implement manually than min-heap).
                                  For simplicity and common practice, True is the default and recommended.
        """
        self._use_builtin_heapq = use_builtin_heapq
        if self._use_builtin_heapq:
            self._heap = []
            if initial_elements:
                for element in initial_elements:
                    heapq.heappush(self._heap, -element) # Store negative values
        else:
            # Custom MaxHeap implementation (more complex to get right than min-heap using array)
            # For brevity and robustness, we'll primarily support the `heapq` trick.
            # A full manual MaxHeap requires modifying sift_up and sift_down to compare > instead of <.
            # For this project, we'll indicate it as an advanced extension if needed.
            # For now, if use_builtin_heapq is False, we will raise an error or fallback to
            # a very basic, non-optimized list for demonstration.
            # A robust custom MaxHeap is quite similar to MinHeap, just with reversed comparisons.
            # To keep this focused on *using* heaps, we'll make the non-builtin path simple or error out.
            raise NotImplementedError("Manual MaxHeap implementation is not provided in this version. Use use_builtin_heapq=True.")


    def push(self, item):
        """
        Adds an item to the heap.
        Time Complexity: O(log N)
        """
        if self._use_builtin_heapq:
            heapq.heappush(self._heap, -item) # Store negative
        else:
             # This branch is not implemented due to NotImplementedError in __init__
            pass # Placeholder for future custom implementation if desired

    def pop(self):
        """
        Removes and returns the largest item from the heap.
        Raises IndexError if the heap is empty.
        Time Complexity: O(log N)
        """
        if self.is_empty():
            raise IndexError("pop from empty heap")
        
        if self._use_builtin_heapq:
            return -heapq.heappop(self._heap) # Convert back to positive
        else:
            # This branch is not implemented due to NotImplementedError in __init__
            pass # Placeholder

    def peek(self):
        """
        Returns the largest item in the heap without removing it.
        Raises IndexError if the heap is empty.
        Time Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("peek from empty heap")
        return -self._heap[0] # Convert back to positive

    def size(self):
        """
        Returns the number of elements in the heap.
        Time Complexity: O(1)
        """
        return len(self._heap)

    def is_empty(self):
        """
        Checks if the heap is empty.
        Time Complexity: O(1)
        """
        return self.size() == 0

    def __len__(self):
        return self.size()

    def __bool__(self):
        return not self.is_empty()

    def __repr__(self):
        # Return positive values for representation
        return f"MaxHeap({sorted([-x for x in self._heap], reverse=True)})"


# Example usage
if __name__ == "__main__":
    print("--- Testing MaxHeap with builtin heapq (negation trick) ---")
    max_heap = MaxHeap()
    max_heap.push(5)
    max_heap.push(3)
    max_heap.push(8)
    max_heap.push(1)
    print(f"Heap after pushes (internal state shows negative): {max_heap._heap}") # Expected: [-8, -5, -3, -1]
    print(f"Heap representation: {max_heap}") # Expected: MaxHeap([8, 5, 3, 1])
    print(f"Peek: {max_heap.peek()}")         # Expected: 8
    print(f"Pop: {max_heap.pop()}")           # Expected: 8
    print(f"Heap after pop: {max_heap}")     # Expected: MaxHeap([5, 3, 1])
    print(f"Size: {max_heap.size()}")         # Expected: 3
    print(f"Is empty: {max_heap.is_empty()}") # Expected: False

    max_heap_initial = MaxHeap([9, 2, 7, 4])
    print(f"Heap from initial elements: {max_heap_initial}") # Expected: MaxHeap([9, 7, 4, 2])
    
    while not max_heap_initial.is_empty():
        print(f"Pop: {max_heap_initial.pop()}")
    
    try:
        max_heap_initial.pop()
    except IndexError as e:
        print(f"Caught expected error: {e}")
        
    print("\n--- Testing custom MaxHeap (should raise NotImplementedError) ---")
    try:
        custom_max_heap = MaxHeap(use_builtin_heapq=False)
    except NotImplementedError as e:
        print(f"Caught expected error: {e}")