"""
Utility functions for generating various types of arrays, useful for testing and benchmarking.
"""

import random
from typing import List, Tuple

def generate_sorted_array(size: int, min_val: int = 0, max_val: int = 1000, allow_duplicates: bool = True) -> List[int]:
    """
    Generates a sorted array of integers.

    Args:
        size (int): The number of elements in the array.
        min_val (int): The minimum possible value for an element.
        max_val (int): The maximum possible value for an element.
        allow_duplicates (bool): If False, ensures all elements are unique.

    Returns:
        List[int]: A sorted list of integers.
    """
    if size <= 0:
        return []
    if not allow_duplicates and size > (max_val - min_val + 1):
        raise ValueError("Cannot generate unique elements if size exceeds range of values.")

    if allow_duplicates:
        arr = [random.randint(min_val, max_val) for _ in range(size)]
    else:
        arr = random.sample(range(min_val, max_val + 1), size)
        
    arr.sort()
    return arr

def generate_rotated_array(size: int, min_val: int = 0, max_val: int = 1000, rotation_point: int = None, allow_duplicates: bool = False) -> List[int]:
    """
    Generates a sorted array and then rotates it at a random or specified point.

    Args:
        size (int): The number of elements in the array.
        min_val (int): The minimum possible value for an element.
        max_val (int): The maximum possible value for an element.
        rotation_point (int, optional): The index at which to rotate the array.
                                       If None, a random point is chosen.
        allow_duplicates (bool): If True, elements might be duplicated.
                                 Note: For rotated arrays, duplicates can make binary search harder
                                 (e.g., [1,1,1,1,1,0,1,1]). Default to False for typical rotated array problems.

    Returns:
        List[int]: A sorted array rotated at some pivot.
    """
    if size <= 0:
        return []
    
    # Ensure values are unique if duplicates are not allowed
    base_arr = generate_sorted_array(size, min_val, max_val, allow_duplicates=allow_duplicates)
    
    if size < 2: # No rotation possible or meaningful for 0/1 element
        return base_arr

    if rotation_point is None:
        # Rotate by 1 to size-1, so it's actually rotated.
        # A rotation of 0 or size means no effective rotation.
        pivot_idx = random.randint(1, size - 1)
    else:
        if not (0 <= rotation_point < size):
            raise ValueError("Rotation point must be a valid index.")
        pivot_idx = rotation_point

    # Perform the rotation
    rotated_arr = base_arr[pivot_idx:] + base_arr[:pivot_idx]
    return rotated_arr

def generate_matrix(rows: int, cols: int, min_val: int = 0, max_val: int = 1000, sorted_rows_cols: bool = True) -> List[List[int]]:
    """
    Generates a 2D matrix. Can optionally ensure rows and columns are sorted.

    Args:
        rows (int): Number of rows.
        cols (int): Number of columns.
        min_val (int): Minimum value for elements.
        max_val (int): Maximum value for elements.
        sorted_rows_cols (bool): If True, ensures each row and column is sorted.
                                 This is more complex to generate, so a simpler
                                 approach of filling and then sorting might be used,
                                 or a method specific to such matrices.
                                 For competitive programming problems, this type of
                                 matrix generation is often fixed or pre-generated.
                                 Here, we implement a simple way that may not be
                                 perfectly random but satisfies the sorted property.

    Returns:
        List[List[int]]: The generated matrix.
    """
    if rows <= 0 or cols <= 0:
        return []

    if not sorted_rows_cols:
        return [[random.randint(min_val, max_val) for _ in range(cols)] for _ in range(rows)]
    
    # Generation for sorted rows and columns is harder than just `generate_sorted_array` per row.
    # A simple but effective way is to generate a fully sorted 1D array and then fill the matrix,
    # or ensure that each cell is greater than or equal to its top and left neighbors.
    
    # Method 1: Generate values ensuring increasing pattern
    matrix = []
    prev_row_max = min_val # Max value from previous row used to ensure current row values are >= previous row's
    for r in range(rows):
        row = []
        current_row_min = min_val
        if r > 0:
            current_row_min = matrix[r-1][0] # ensure current row starts at least as high as previous's start
        
        for c in range(cols):
            # Ensure current value is >= left neighbor (if any) and >= top neighbor (if any)
            left_val = row[-1] if c > 0 else current_row_min
            top_val = matrix[r-1][c] if r > 0 else min_val
            
            # The value must be at least max(left_val, top_val)
            # And also, it must be within min_val and max_val overall.
            cell_min = max(left_val, top_val)
            
            # To ensure proper sortedness with duplicates, use a range for random.
            # This is a simplified generation that tends to produce valid sorted matrices.
            # A more rigorous method would involve filling a 1D array and converting.
            val = random.randint(max(cell_min, min_val), max_val)
            row.append(val)
        matrix.append(row)
    
    return matrix

if __name__ == '__main__':
    print("--- Array Generator Tests ---")

    # Sorted Array
    arr_sorted = generate_sorted_array(10, 0, 20)
    print(f"Sorted Array (10, 0-20): {arr_sorted}")
    assert len(arr_sorted) == 10
    assert all(arr_sorted[i] <= arr_sorted[i+1] for i in range(len(arr_sorted) - 1))

    arr_unique = generate_sorted_array(5, 10, 15, allow_duplicates=False)
    print(f"Sorted Unique Array (5, 10-15): {arr_unique}")
    assert len(set(arr_unique)) == 5

    try:
        generate_sorted_array(10, 0, 5, allow_duplicates=False)
    except ValueError as e:
        print(f"Error generating unique array: {e}")

    # Rotated Array
    arr_rotated = generate_rotated_array(10, 0, 20)
    print(f"Rotated Array (10, 0-20): {arr_rotated}")
    assert len(arr_rotated) == 10
    # Basic check for rotated property (at most one "drop")
    drops = sum(1 for i in range(len(arr_rotated) - 1) if arr_rotated[i] > arr_rotated[i+1])
    assert drops <= 1

    arr_rotated_specific = generate_rotated_array(7, 0, 10, rotation_point=3)
    print(f"Rotated Array (7, 0-10, pivot 3): {arr_rotated_specific}")
    
    # Matrix
    matrix_random = generate_matrix(3, 4, 1, 10, sorted_rows_cols=False)
    print(f"Random Matrix (3x4, 1-10):")
    for row in matrix_random:
        print(row)

    matrix_sorted = generate_matrix(3, 3, 1, 10)
    print(f"Sorted Matrix (3x3, 1-10):")
    for row in matrix_sorted:
        print(row)
    # Basic check for sorted rows/cols
    for r in range(len(matrix_sorted)):
        assert all(matrix_sorted[r][c] <= matrix_sorted[r][c+1] for c in range(len(matrix_sorted[r]) - 1))
    for c in range(len(matrix_sorted[0])):
        assert all(matrix_sorted[r][c] <= matrix_sorted[r+1][c] for r in range(len(matrix_sorted) - 1))