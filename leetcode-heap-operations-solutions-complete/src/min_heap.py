import heapq

class MinHeap:
    """
    A custom implementation of a Min-Heap.
    This class wraps Python's built-in `heapq` module for easier object-oriented usage,
    and also provides a basic custom implementation for educational purposes
    if `_use_builtin_heapq` is set to False.
    
    For most practical purposes, especially in interviews, using `heapq` directly
    or this wrapper is preferred over a fully manual implementation due to correctness
    and efficiency.
    """

    def __init__(self, initial_elements=None, use_builtin_heapq=True):
        """
        Initializes the MinHeap.
        :param initial_elements: An iterable of elements to initially populate the heap.
        :param use_builtin_heapq: If True, uses Python's `heapq` module.
                                  If False, uses a basic array-based implementation.
                                  For interview purposes, `heapq` is generally sufficient
                                  and highly optimized. The manual implementation is for
                                  demonstrating the underlying mechanism.
        """
        self._use_builtin_heapq = use_builtin_heapq
        if self._use_builtin_heapq:
            self._heap = []
            if initial_elements:
                for element in initial_elements:
                    heapq.heappush(self._heap, element)
        else:
            self._heap = []
            if initial_elements:
                for element in initial_elements:
                    self.push(element) # Use the custom push to build the heap

    def push(self, item):
        """
        Adds an item to the heap.
        Time Complexity: O(log N)
        """
        if self._use_builtin_heapq:
            heapq.heappush(self._heap, item)
        else:
            self._heap.append(item)
            self._sift_up(len(self._heap) - 1)

    def pop(self):
        """
        Removes and returns the smallest item from the heap.
        Raises IndexError if the heap is empty.
        Time Complexity: O(log N)
        """
        if self.is_empty():
            raise IndexError("pop from empty heap")
        
        if self._use_builtin_heapq:
            return heapq.heappop(self._heap)
        else:
            if len(self._heap) == 1:
                return self._heap.pop()
            
            # Move the last element to the root, then sift down
            root = self._heap[0]
            self._heap[0] = self._heap.pop()
            self._sift_down(0)
            return root

    def peek(self):
        """
        Returns the smallest item in the heap without removing it.
        Raises IndexError if the heap is empty.
        Time Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("peek from empty heap")
        return self._heap[0]

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

    def _sift_up(self, index):
        """
        Helper method for custom implementation: Moves an element up the heap
        to maintain the heap property.
        """
        parent_index = (index - 1) // 2
        while index > 0 and self._heap[index] < self._heap[parent_index]:
            self._heap[index], self._heap[parent_index] = self._heap[parent_index], self._heap[index]
            index = parent_index
            parent_index = (index - 1) // 2

    def _sift_down(self, index):
        """
        Helper method for custom implementation: Moves an element down the heap
        to maintain the heap property.
        """
        n = len(self._heap)
        while True:
            left_child_index = 2 * index + 1
            right_child_index = 2 * index + 2
            smallest = index

            # Find the smallest among parent, left child, and right child
            if left_child_index < n and self._heap[left_child_index] < self._heap[smallest]:
                smallest = left_child_index
            if right_child_index < n and self._heap[right_child_index] < self._heap[smallest]:
                smallest = right_child_index

            if smallest != index:
                # Swap with the smallest child
                self._heap[index], self._heap[smallest] = self._heap[smallest], self._heap[index]
                index = smallest # Continue sifting down from the new position
            else:
                break # Heap property restored

    def __len__(self):
        return self.size()

    def __bool__(self):
        return not self.is_empty()

    def __repr__(self):
        return f"MinHeap({self._heap})"

# Example usage (for testing custom implementation)
if __name__ == "__main__":
    print("--- Testing MinHeap with builtin heapq ---")
    min_heap = MinHeap()
    min_heap.push(5)
    min_heap.push(3)
    min_heap.push(8)
    min_heap.push(1)
    print(f"Heap after pushes: {min_heap}") # Expected: MinHeap([1, 3, 8, 5])
    print(f"Peek: {min_heap.peek()}")       # Expected: 1
    print(f"Pop: {min_heap.pop()}")         # Expected: 1
    print(f"Heap after pop: {min_heap}")   # Expected: MinHeap([3, 5, 8])
    print(f"Size: {min_heap.size()}")       # Expected: 3
    print(f"Is empty: {min_heap.is_empty()}") # Expected: False

    min_heap_initial = MinHeap([9, 2, 7, 4])
    print(f"Heap from initial elements: {min_heap_initial}") # Expected: MinHeap([2, 4, 7, 9])
    
    print("\n--- Testing MinHeap with custom implementation ---")
    custom_min_heap = MinHeap(use_builtin_heapq=False)
    custom_min_heap.push(5)
    custom_min_heap.push(3)
    custom_min_heap.push(8)
    custom_min_heap.push(1)
    custom_min_heap.push(10)
    custom_min_heap.push(2)
    print(f"Heap after pushes: {custom_min_heap}") # Should roughly reflect heap property, order might vary
    print(f"Peek: {custom_min_heap.peek()}")       # Expected: 1
    print(f"Pop: {custom_min_heap.pop()}")         # Expected: 1
    print(f"Heap after pop: {custom_min_heap}")    # Should maintain heap property
    print(f"Peek: {custom_min_heap.peek()}")       # Expected: 2
    
    while not custom_min_heap.is_empty():
        print(f"Pop: {custom_min_heap.pop()}")
    
    try:
        custom_min_heap.pop()
    except IndexError as e:
        print(f"Caught expected error: {e}")