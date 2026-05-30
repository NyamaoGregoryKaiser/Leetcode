def selection_sort(arr):
    """
    Sorts an array using the Selection Sort algorithm.

    Selection Sort algorithm sorts an array by repeatedly finding the minimum element
    (considering ascending order) from the unsorted part and putting it at the beginning.
    The algorithm maintains two subarrays in a given array:
    1. The subarray which is already sorted.
    2. The remaining subarray which is unsorted.

    In every iteration of selection sort, the minimum element from the unsorted subarray
    is picked and moved to the sorted subarray.

    Args:
        arr (list): The list of comparable elements to be sorted.

    Time Complexity:
        - Worst Case: O(n^2)
        - Average Case: O(n^2)
        - Best Case: O(n^2)
        Selection sort performs (n-1) swaps and n(n-1)/2 comparisons in all cases
        (worst, average, and best). The number of swaps is minimal, which can be an
        advantage if write operations are expensive.

    Space Complexity:
        - O(1) - It sorts the array in-place, requiring no additional storage
                 proportional to the input size.

    Stability:
        - Unstable: It does not preserve the relative order of equal elements.
                    Consider `[5a, 8, 5b, 2]`. `2` is swapped with `5a`, resulting in
                    `[2, 8, 5b, 5a]`. `5a` and `5b`'s relative order changed.
    """
    n = len(arr)
    # Traverse through all array elements
    for i in range(n):
        # Find the minimum element in remaining unsorted array
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        # Swap the found minimum element with the first element of the unsorted part
        # This places the minimum element at its correct sorted position
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

    # The function modifies the array in-place.
```