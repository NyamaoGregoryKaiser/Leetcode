def heap_sort(arr):
    """
    Sorts an array using the Heap Sort algorithm.

    Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.
    It's an in-place sorting algorithm and has a time complexity of O(n log n) in all cases.

    The algorithm consists of two main parts:
    1. Build a max-heap from the input data.
    2. One by one, extract elements from the heap. An element is extracted by
       swapping the root of the heap (largest element) with the last element
       of the heap, then reducing the size of the heap by one, and finally
       heapifying the root.

    Args:
        arr (list): The list of comparable elements to be sorted.

    Time Complexity:
        - Worst Case: O(n log n)
        - Average Case: O(n log n)
        - Best Case: O(n log n)

    Space Complexity:
        - O(1) - It sorts the array in-place, requiring no additional storage
                 proportional to the input size.

    Stability:
        - Unstable: It does not preserve the relative order of equal elements
                    due to the swapping operations during heapify.
    """
    n = len(arr)

    # 1. Build a max-heap (rearrange array)
    # The loop runs from the last non-leaf node up to the root.
    # The index of the last non-leaf node is n // 2 - 1.
    for i in range(n // 2 - 1, -1, -1):
        _heapify(arr, n, i)

    # 2. Extract elements one by one from the heap
    for i in range(n - 1, 0, -1):
        # Move current root (largest element) to end of array
        arr[i], arr[0] = arr[0], arr[i]
        # Call max heapify on the reduced heap
        _heapify(arr, i, 0) # i is the new heap_size
    # The function modifies the array in-place.


def _heapify(arr, n, i):
    """
    A helper function to heapify a subtree rooted with node 'i' which is
    an index in arr[]. 'n' is the size of the heap.

    Args:
        arr (list): The array representing the heap.
        n (int): The current size of the heap.
        i (int): The index of the root of the subtree to heapify.
    """
    largest = i  # Initialize largest as root
    left_child = 2 * i + 1  # Left child index
    right_child = 2 * i + 2  # Right child index

    # See if left child of root exists and is greater than root
    if left_child < n and arr[left_child] > arr[largest]:
        largest = left_child

    # See if right child of root exists and is greater than current largest
    if right_child < n and arr[right_child] > arr[largest]:
        largest = right_child

    # Change root, if needed
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # Swap
        # Heapify the root.
        _heapify(arr, n, largest)
```