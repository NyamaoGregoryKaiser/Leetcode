import heapq

class MaxHeap:
    """
    A custom implementation of a Max-Heap data structure.
    In a Max-Heap, the parent node is always greater than or equal to its children.
    The largest element is always at the root.

    Python's `heapq` module implements a min-heap. This custom class
    provides a true max-heap interface.
    """

    def __init__(self):
        """
        Initializes an empty MaxHeap.
        The heap is represented as a list.
        """
        self.heap = []

    def _parent(self, i):
        """
        Returns the index of the parent of the node at index `i`.
        """
        return (i - 1) // 2

    def _left_child(self, i):
        """
        Returns the index of the left child of the node at index `i`.
        """
        return 2 * i + 1

    def _right_child(self, i):
        """
        Returns the index of the right child of the node at index `i`.
        """
        return 2 * i + 2

    def _swap(self, i, j):
        """
        Swaps the elements at indices `i` and `j` in the heap list.
        """
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    def _heapify_up(self, i):
        """
        Maintains the max-heap property by bubbling up the element at index `i`
        if it's larger than its parent.
        This is called after an insertion.
        """
        while i > 0 and self.heap[i] > self.heap[self._parent(i)]:
            self._swap(i, self._parent(i))
            i = self._parent(i)

    def _heapify_down(self, i):
        """
        Maintains the max-heap property by bubbling down the element at index `i`
        if it's smaller than one of its children.
        This is called after a deletion (pop).
        """
        n = len(self.heap)
        largest = i
        left = self._left_child(i)
        right = self._right_child(i)

        if left < n and self.heap[left] > self.heap[largest]:
            largest = left
        if right < n and self.heap[right] > self.heap[largest]:
            largest = right

        if largest != i:
            self._swap(i, largest)
            self._heapify_down(largest)

    def push(self, item):
        """
        Inserts an item into the max-heap.
        Time Complexity: O(log N) where N is the number of elements in the heap.
        """
        self.heap.append(item)
        self._heapify_up(len(self.heap) - 1)

    def pop(self):
        """
        Removes and returns the largest item from the max-heap.
        Time Complexity: O(log N) where N is the number of elements in the heap.
        Raises IndexError if the heap is empty.
        """
        if not self.heap:
            raise IndexError("pop from empty heap")
        if len(self.heap) == 1:
            return self.heap.pop()

        root = self.heap[0]
        self.heap[0] = self.heap.pop()  # Move the last element to the root
        self._heapify_down(0)           # Restore heap property
        return root

    def peek(self):
        """
        Returns the largest item in the max-heap without removing it.
        Time Complexity: O(1)
        Raises IndexError if the heap is empty.
        """
        if not self.heap:
            raise IndexError("peek from empty heap")
        return self.heap[0]

    def __len__(self):
        """
        Returns the number of items in the heap.
        """
        return len(self.heap)

    def is_empty(self):
        """
        Checks if the heap is empty.
        """
        return len(self.heap) == 0

    def to_list(self):
        """
        Returns a copy of the underlying list representing the heap.
        Note: The list itself is not guaranteed to be sorted, only
              that the heap property is maintained.
        """
        return list(self.heap)

# Example usage (for testing this module itself):
if __name__ == "__main__":
    max_h = MaxHeap()
    items = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
    print(f"Adding items: {items}")
    for item in items:
        max_h.push(item)
        print(f"Heap after pushing {item}: {max_h.to_list()}")

    print("\nPopping items:")
    while not max_h.is_empty():
        print(f"Max element: {max_h.peek()}, Popped: {max_h.pop()}, Heap: {max_h.to_list()}")

    print("\nTesting empty heap operations:")
    empty_heap = MaxHeap()
    try:
        empty_heap.pop()
    except IndexError as e:
        print(f"Caught expected error: {e}")
    try:
        empty_heap.peek()
    except IndexError as e:
        print(f"Caught expected error: {e}")

    # Test with duplicates and negatives
    max_h2 = MaxHeap()
    items2 = [10, -5, 0, 10, 20, -100, 5, 20]
    print(f"\nAdding items2: {items2}")
    for item in items2:
        max_h2.push(item)
    print(f"Final heap: {max_h2.to_list()}")
    print("Popping items2 in descending order:")
    sorted_desc = []
    while not max_h2.is_empty():
        sorted_desc.append(max_h2.pop())
    print(f"Sorted (descending) by popping: {sorted_desc}")
    assert sorted_desc == sorted(items2, reverse=True)

    # Test with Python's heapq by negating values
    # For comparison, how Python's heapq (min-heap) can be used as a max-heap
    py_max_heap = []
    for item in items:
        heapq.heappush(py_max_heap, -item)
    
    popped_py_heap = []
    while py_max_heap:
        popped_py_heap.append(-heapq.heappop(py_max_heap))
    print(f"\nPopped using Python's heapq as max-heap: {popped_py_heap}")
    assert popped_py_heap == sorted(items, reverse=True)