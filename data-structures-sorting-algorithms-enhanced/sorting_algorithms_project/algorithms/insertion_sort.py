def insertion_sort(arr):
    """
    Sorts an array using the Insertion Sort algorithm.

    Insertion Sort builds the final sorted array (or list) one item at a time.
    It is much less efficient on large lists than more advanced algorithms such as
    quicksort, heapsort, or merge sort. However, it has some advantages:
    1. Simple implementation.
    2. Efficient for small data sets.
    3. Efficient for data sets that are already substantially sorted.
    4. Stable.
    5. In-place.

    Args:
        arr (list): The list of comparable elements to be sorted.

    Time Complexity:
        - Worst Case: O(n^2) - When the array is reverse sorted.
        - Average Case: O(n^2) - On average, it requires many comparisons and shifts.
        - Best Case: O(n) - When the array is already sorted (only n comparisons).

    Space Complexity:
        - O(1) - It sorts the array in-place, requiring no additional storage
                 proportional to the input size.

    Stability:
        - Stable: It preserves the relative order of equal elements because
                  elements are only shifted if the new element is strictly smaller.
    """
    n = len(arr)
    # Traverse through 1 to n-1
    for i in range(1, n):
        key = arr[i]  # The element to be inserted into the sorted part
        j = i - 1     # Start comparing with the element just before 'key'

        # Move elements of arr[0..i-1], that are greater than key,
        # to one position ahead of their current position.
        # This creates space for 'key'.
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key # Place 'key' in its correct position

    # The function modifies the array in-place.
```