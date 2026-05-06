"""
Module for solving the "Kth Smallest Element in a Sorted Matrix" problem.

Problem Description:
Given an `m x n` matrix where each of the rows and columns is sorted in ascending order,
return the `kth` smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.

You must find a solution with better than `O(n^2)` complexity.

This file includes:
1. Optimal O(N log(Max-Min)) solution using binary search on the answer.
2. Brute-force O(N^2 log(N^2)) solution by flattening and sorting.

"""

from typing import List

def _count_less_equal(matrix: List[List[int]], value: int) -> int:
    """
    Counts how many elements in the matrix are less than or equal to `value`.
    This function uses a modified approach similar to searching in a sorted 2D array.
    Starts from the bottom-left corner or top-right corner.
    Here we use bottom-left.

    Args:
        matrix (List[List[int]]): The m x n matrix where rows and columns are sorted.
        value (int): The threshold value to compare against.

    Returns:
        int: The total count of elements <= value in the matrix.

    Time Complexity: O(m + n), where m is the number of rows and n is the number of columns.
                     In the worst case, the pointers traverse the entire row and column.
    Space Complexity: O(1)
    """
    rows = len(matrix)
    cols = len(matrix[0]) if rows > 0 else 0
    
    count = 0
    
    # Start from the bottom-left corner
    r = rows - 1
    c = 0

    while r >= 0 and c < cols:
        if matrix[r][c] <= value:
            # If current element is <= value, all elements above it in this column (matrix[0..r][c])
            # are also <= value because the column is sorted.
            # And we need to check elements to the right.
            count += (r + 1)
            c += 1 # Move right to check elements in the next column
        else:
            # Current element is > value, so all elements to its right in this row are also > value.
            # We need to look in the row above.
            r -= 1 # Move up
            
    return count


def kth_smallest_matrix_optimal(matrix: List[List[int]], k: int) -> int:
    """
    Finds the Kth smallest element in a sorted matrix using binary search on the answer.

    The "answer" space is the range [min_element_in_matrix, max_element_in_matrix].
    We binary search within this range. For any candidate `mid` value, we count
    how many elements in the matrix are less than or equal to `mid`.
    If this count is less than `k`, it means `mid` is too small, and the actual
    kth smallest element must be larger.
    If this count is greater than or equal to `k`, `mid` could be the answer, or
    the answer could be smaller, so we try to find a smaller `mid`.

    Args:
        matrix (List[List[int]]): The m x n matrix where rows and columns are sorted.
        k (int): The desired rank of the element (1-indexed).

    Returns:
        int: The Kth smallest element in the matrix.

    Time Complexity: O(N * log(Max-Min)), where N = max(rows, cols) (since `_count_less_equal` is O(N)),
                     and (Max-Min) is the range of values in the matrix.
                     Specifically, O((rows + cols) * log(max_val - min_val)).
    Space Complexity: O(1)
    """
    rows = len(matrix)
    cols = len(matrix[0]) if rows > 0 else 0
    
    if not matrix or k < 1 or k > rows * cols:
        raise ValueError("Invalid matrix or k value.")

    # The search space for the answer is from the smallest element to the largest element.
    low = matrix[0][0]
    high = matrix[rows - 1][cols - 1]

    ans = high # Initialize ans to a value that will be updated

    while low <= high:
        mid = low + (high - low) // 2
        
        # Count elements in the matrix that are less than or equal to 'mid'
        count = _count_less_equal(matrix, mid)

        if count >= k:
            # If count is >= k, it means 'mid' could be our answer, or
            # the actual Kth smallest element might be even smaller.
            # We save 'mid' as a potential answer and try to find a smaller one.
            ans = mid
            high = mid - 1
        else:
            # If count is < k, it means 'mid' is too small;
            # the actual Kth smallest element must be larger.
            low = mid + 1
            
    return ans


def kth_smallest_matrix_brute_force(matrix: List[List[int]], k: int) -> int:
    """
    Finds the Kth smallest element in a sorted matrix using a brute-force approach.
    This involves flattening the matrix into a 1D array and then sorting it.

    Args:
        matrix (List[List[int]]): The m x n matrix where rows and columns are sorted.
        k (int): The desired rank of the element (1-indexed).

    Returns:
        int: The Kth smallest element in the matrix.

    Time Complexity: O(m*n * log(m*n)), where m*n is the total number of elements.
                     Flattening takes O(m*n), and sorting takes O(P log P) where P=m*n.
    Space Complexity: O(m*n) to store the flattened array.
    """
    if not matrix:
        raise ValueError("Matrix cannot be empty.")

    flattened = []
    for row in matrix:
        flattened.extend(row)
    
    # Sort the flattened array
    flattened.sort()

    if k < 1 or k > len(flattened):
        raise ValueError("Invalid k value.")

    return flattened[k - 1] # k is 1-indexed, so we access k-1 index