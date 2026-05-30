def bubble_sort(arr):
    """
    Sorts an array using the Bubble Sort algorithm.

    Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
    compares adjacent elements and swaps them if they are in the wrong order.
    The pass through the list is repeated until no swaps are needed, which indicates
    that the list is sorted.

    Args:
        arr (list): The list of comparable elements to be sorted.

    Time Complexity:
        - Worst Case: O(n^2) - When the array is reverse sorted.
        - Average Case: O(n^2) - On average, it requires many comparisons and swaps.
        - Best Case: O(n) - When the array is already sorted (optimization for early exit).

    Space Complexity:
        - O(1) - It sorts the array in-place, requiring no additional storage
                 proportional to the input size.

    Stability:
        - Stable: It preserves the relative order of equal elements.
    """
    n = len(arr)
    # Traverse through all array elements
    for i in range(n - 1):
        # last_i elements are already in place
        # After each pass, the largest unsorted element "bubbles up" to its correct position
        swapped = False
        for j in range(0, n - i - 1):
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # If no two elements were swapped by inner loop, then the array is sorted
        if not swapped:
            break

    # The function modifies the array in-place, so it doesn't explicitly return anything
    # but the array `arr` will be sorted after the call.
```