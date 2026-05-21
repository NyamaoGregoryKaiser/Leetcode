"""
This module contains an optimal binary search solution for finding the k-th smallest element
in an n x n matrix where each row and column are sorted in ascending order.
"""

from typing import List

def count_less_equal(matrix: List[List[int]], value: int) -> int:
    """
    Counts the number of elements in the matrix that are less than or equal to 'value'.
    This helper function is crucial for the binary search on the answer.

    Args:
        matrix (List[List[int]]): The n x n matrix with sorted rows and columns.
        value (int): The value to compare against.

    Returns:
        int: The total count of elements <= value in the matrix.

    Approach:
    For each row, since it's sorted, we can use binary search (or a linear scan
    starting from the rightmost element) to find how many elements are <= `value`.
    A more efficient approach for counting in each row for the overall matrix
    is to start from the top-right corner or bottom-left corner of the matrix.

    Here, we use a slightly optimized approach for a sorted matrix:
    Start from the bottom-left corner `(row=n-1, col=0)`.
    If `matrix[row][col] <= value`, then all elements `matrix[row][0...col]` are
    also <= value (since the row is sorted) AND all elements above `matrix[row][col]`
    in that column (`matrix[0...row-1][col]`) might also be <= value. We count `col + 1`
    elements in the current row and move up to `row-1`.
    If `matrix[row][col] > value`, then elements in this row are too large, so we move
    right to `col+1` to find larger elements. Wait, this logic is incorrect for
    this specific counting method.

    Correct approach for sorted matrix (similar to searching in 2D sorted matrix):
    Start from `(row=0, col=n-1)` (top-right).
    If `matrix[row][col] <= value`: All elements in the current column from `matrix[0][col]`
        to `matrix[row][col]` are less than or equal to `value`. This accounts for `col+1`
        elements. No, this accounts for `row+1` elements in *this* column.
        Actually, `matrix[row][col]` is <= `value`, so all elements to its left in this row `matrix[row][0...col]`
        are also <= `value`. So `col + 1` elements are counted in this row. Then we move to the next row (`row += 1`).
    If `matrix[row][col] > value`: The current element is too large. All elements below it in this column will
        also be too large (column is sorted). So we must move to the left (`col -= 1`).

    This approach counts elements row by row starting from top-right.

    Refined `count_less_equal` (O(N) for N rows):
    Initialize `count = 0`.
    For each `row` in `matrix`:
        Use `bisect_right` on `row` to find how many elements are `<= value`.
        `count += bisect_right(row, value)`
    This makes it `O(N * log M)` where N is rows, M is columns. Since it's N x N, `O(N log N)`.
    
    A more optimal `O(N)` solution for counting in a sorted matrix (for n x n):
    `count = 0`
    `row = n - 1` (start from last row)
    `col = 0` (start from first col)
    While `row >= 0` and `col < n`:
        If `matrix[row][col] <= value`:
            `count += (row + 1)` (all elements in this column from 0 to row are <= value)
            `col += 1` (move to next column, since current column handled)
        Else (`matrix[row][col] > value`):
            `row -= 1` (current element too large, move up in current column)
    This is incorrect for the problem of finding the Kth smallest element.
    The previous approach (`bisect_right`) is conceptually simpler for a clear count,
    though often the "start top-right, move left/down" is used. Let's use `bisect_right`
    for clarity, as it correctly counts per row.

    Alternative (more common for Kth smallest in matrix context, O(N)):
    `count = 0`
    `n = len(matrix)`
    `r, c = 0, n - 1` # Start at top-right
    while `r < n` and `c >= 0`:
        if `matrix[r][c] <= value`:
            `count += (c + 1)` # All elements in this row up to 'c' are <= value
            `r += 1`           # Move to the next row
        else:
            `c -= 1`           # Current element too large, move left in current row
    This `O(N)` logic is specifically for counting.
    Let's implement this efficient `O(N)` counting method.
    """
    n = len(matrix)
    count = 0
    row, col = 0, n - 1  # Start from top-right corner

    while row < n and col >= 0:
        if matrix[row][col] <= value:
            # All elements in this row from index 0 to `col` are <= value.
            # There are `col + 1` such elements.
            # Add them to the count and move to the next row to find more elements.
            count += (col + 1)
            row += 1
        else:
            # The current element matrix[row][col] is greater than value.
            # Since the column is sorted, all elements below it in this column are also > value.
            # So, we need to look for smaller elements in the current row, by moving left.
            col -= 1
    return count


def kth_smallest_element(matrix: List[List[int]], k: int) -> int:
    """
    Finds the k-th smallest element in an n x n matrix where each row and column
    are sorted in ascending order.

    This problem uses binary search on the *answer* (the value itself), not on indices.
    The range of possible answers is from the minimum value in the matrix (matrix[0][0])
    to the maximum value (matrix[n-1][n-1]).

    Args:
        matrix (List[List[int]]): The n x n matrix with sorted rows and columns.
        k (int): The k-th smallest element to find.

    Returns:
        int: The k-th smallest element in the matrix.

    Time Complexity: O(N * log(Max - Min))
        N: Number of rows/columns in the matrix (matrix size).
        log(Max - Min): The number of iterations for binary search, where (Max - Min)
                        is the range of values in the matrix.
        In each iteration, `count_less_equal` takes O(N) time.
    Space Complexity: O(1) - Uses a constant amount of extra space.
    """
    n = len(matrix)
    if n == 0 or k == 0:
        raise ValueError("Matrix cannot be empty and k must be positive.")
    if k > n * n:
        raise ValueError("k cannot be greater than the total number of elements.")

    # The search space for binary search is the range of values in the matrix.
    low, high = matrix[0][0], matrix[n-1][n-1]
    ans = -1

    while low <= high:
        mid = low + (high - low) // 2

        # Count how many elements in the matrix are less than or equal to `mid`.
        count = count_less_equal(matrix, mid)

        if count >= k:
            # If `count >= k`, it means `mid` could be the k-th smallest element,
            # or the actual k-th smallest element is smaller than `mid`.
            # So, we try to find a smaller candidate in the left half, but store `mid` as a potential answer.
            ans = mid
            high = mid - 1
        else: # count < k
            # If `count < k`, it means `mid` is too small to be the k-th smallest element.
            # We need to look for larger values in the right half.
            low = mid + 1
            
    return ans


if __name__ == '__main__':
    # Test cases
    print("--- Kth Smallest Element in Sorted Matrix ---")

    # Example 1
    matrix1 = [
       [ 1,  5,  9],
       [10, 11, 13],
       [12, 13, 15]
    ]
    print(f"Matrix: {matrix1}, k=8: {kth_smallest_element(matrix1, 8)} (Expected: 13)") # Elements: 1,5,9,10,11,12,13,13,15

    # Example 2
    matrix2 = [
        [1, 2],
        [1, 3]
    ]
    print(f"Matrix: {matrix2}, k=3: {kth_smallest_element(matrix2, 3)} (Expected: 2)") # Elements: 1,1,2,3

    # Example 3 (Single element matrix)
    matrix3 = [[-5]]
    print(f"Matrix: {matrix3}, k=1: {kth_smallest_element(matrix3, 1)} (Expected: -5)")

    # Example 4 (Larger matrix)
    matrix4 = [
        [ 1,  4,  7, 11],
        [ 2,  5,  8, 12],
        [ 3,  6,  9, 16],
        [10, 13, 14, 17]
    ]
    # Sorted elements: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17
    print(f"Matrix: {matrix4}, k=5: {kth_smallest_element(matrix4, 5)} (Expected: 5)")
    print(f"Matrix: {matrix4}, k=10: {kth_smallest_element(matrix4, 10)} (Expected: 10)")
    print(f"Matrix: {matrix4}, k=16: {kth_smallest_element(matrix4, 16)} (Expected: 17)")

    # Example 5 (Duplicates)
    matrix5 = [
        [1, 1, 3],
        [1, 2, 3],
        [2, 3, 3]
    ]
    # Sorted elements: 1,1,1,2,2,3,3,3,3
    print(f"Matrix: {matrix5}, k=1: {kth_smallest_element(matrix5, 1)} (Expected: 1)")
    print(f"Matrix: {matrix5}, k=3: {kth_smallest_element(matrix5, 3)} (Expected: 1)")
    print(f"Matrix: {matrix5}, k=5: {kth_smallest_element(matrix5, 5)} (Expected: 2)")
    print(f"Matrix: {matrix5}, k=9: {kth_smallest_element(matrix5, 9)} (Expected: 3)")

    # Test edge cases for k
    try:
        kth_smallest_element(matrix1, 0)
    except ValueError as e:
        print(f"Error for k=0: {e}") # Expected: k must be positive.
    
    try:
        kth_smallest_element(matrix1, 10) # 3x3 matrix has 9 elements
    except ValueError as e:
        print(f"Error for k=10 (too large): {e}") # Expected: k cannot be greater than...
    
    try:
        kth_smallest_element([], 1)
    except ValueError as e:
        print(f"Error for empty matrix: {e}") # Expected: Matrix cannot be empty.