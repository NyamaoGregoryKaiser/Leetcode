"""
Utility module for generating various types of arrays and matrices.
These are useful for testing and benchmarking Binary Search algorithms.
"""

import random
from typing import List

def generate_sorted_array(
    size: int,
    min_val: int = 0,
    max_val: int = 1_000_000,
    allow_duplicates: bool = True
) -> List[int]:
    """
    Generates a sorted array of integers.

    Args:
        size (int): The number of elements in the array.
        min_val (int): The minimum possible value for elements.
        max_val (int): The maximum possible value for elements.
        allow_duplicates (bool): If True, duplicates can be generated.
                                 If False, ensures distinct values (might be slower).

    Returns:
        List[int]: A sorted list of integers.
    """
    if size <= 0:
        return []

    if not allow_duplicates and size > (max_val - min_val + 1):
        raise ValueError("Cannot generate unique values: size is larger than value range.")

    if allow_duplicates:
        arr = [random.randint(min_val, max_val) for _ in range(size)]
    else:
        # Generate unique numbers then sort
        arr = random.sample(range(min_val, max_val + 1), size)
    
    arr.sort()
    return arr


def generate_rotated_sorted_array(
    size: int,
    min_val: int = 0,
    max_val: int = 1_000_000,
    rotate_amount: int = -1, # -1 for random rotation
    allow_duplicates: bool = False # Rotated sorted array problems often assume distinct values
) -> List[int]:
    """
    Generates a sorted array and then rotates it by a given amount.

    Args:
        size (int): The number of elements in the array.
        min_val (int): The minimum possible value for elements.
        max_val (int): The maximum possible value for elements.
        rotate_amount (int): The number of positions to rotate. If -1, a random amount is chosen.
        allow_duplicates (bool): If True, duplicates can be generated (may affect problem specific logic).

    Returns:
        List[int]: A rotated sorted list of integers.
    """
    if size <= 0:
        return []

    # Generate a standard sorted array first
    arr = generate_sorted_array(size, min_val, max_val, allow_duplicates)

    if size == 0: # Handle empty array case after generate_sorted_array
        return []

    if rotate_amount == -1:
        rotate_amount = random.randint(0, size - 1) # Rotate by 0 to size-1 positions

    # Perform the rotation
    # Example: [0,1,2,4,5,6,7] rotated by 3 becomes [4,5,6,7,0,1,2]
    # The pivot is at index `rotate_amount`.
    # Elements from `rotate_amount` to `size-1` come first, then `0` to `rotate_amount-1`.
    rotated_arr = arr[rotate_amount:] + arr[:rotate_amount]
    return rotated_arr


def generate_sorted_matrix(
    rows: int,
    cols: int,
    min_val: int = 0,
    max_val: int = 1_000_000,
    allow_duplicates: bool = True
) -> List[List[int]]:
    """
    Generates an m x n matrix where each row and each column is sorted.

    Args:
        rows (int): Number of rows.
        cols (int): Number of columns.
        min_val (int): Minimum value for elements.
        max_val (int): Maximum value for elements.
        allow_duplicates (bool): If True, duplicates can be generated.

    Returns:
        List[List[int]]: A sorted matrix.
    """
    if rows <= 0 or cols <= 0:
        return []

    # Generate a 1D sorted list of all elements
    total_elements = rows * cols
    all_elements = generate_sorted_array(total_elements, min_val, max_val, allow_duplicates)

    matrix = []
    # Fill the matrix row by row
    for r in range(rows):
        row = []
        for c in range(cols):
            row.append(all_elements[r * cols + c])
        matrix.append(row)
    
    # This construction ensures rows are sorted.
    # To ensure columns are also sorted (which is crucial for the problem),
    # we need to be careful with how the elements are picked.
    # The simple approach above does not guarantee column sorting if elements
    # are just randomly picked into a 1D array then distributed.
    # A more robust approach for a sorted matrix:
    # 1. Generate the first row sorted.
    # 2. For subsequent rows, each element matrix[i][j] >= matrix[i-1][j] and >= matrix[i][j-1].

    # Re-doing with a robust approach to guarantee column sorting.
    # This is more complex than simple flattening and sorting.
    matrix = []
    prev_row_vals = [min_val] * cols # To ensure elements are >= elements in the row above

    for r in range(rows):
        current_row = []
        # Ensure current_row[j] >= prev_row_vals[j]
        # and current_row[j] >= current_row[j-1]
        for c in range(cols):
            # Calculate the minimum possible value for current_row[c]
            # It must be at least the previous element in this row (or min_val for c=0)
            # AND at least the element directly above it.
            min_for_cell = max(prev_row_vals[c], (current_row[c-1] if c > 0 else min_val))
            
            # Generate a random value for the cell, ensuring it's at least min_for_cell
            # and within the overall max_val.
            cell_val = random.randint(min_for_cell, max_val)
            current_row.append(cell_val)
        
        matrix.append(current_row)
        prev_row_vals = current_row # Update previous row for next iteration

    return matrix