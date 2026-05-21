"""
This module provides brute-force (linear scan) solutions for searching in arrays,
primarily for comparison with binary search implementations.
"""

from typing import List, Tuple

def linear_search(arr: List[int], target: int) -> int:
    """
    Performs a linear scan to find the target element in an array.

    Args:
        arr (List[int]): The list of integers to search within.
        target (int): The integer value to search for.

    Returns:
        int: The index of the target if found, otherwise -1.

    Time Complexity: O(N) - In the worst case, it iterates through all elements.
    Space Complexity: O(1) - Uses a constant amount of extra space.
    """
    for i, num in enumerate(arr):
        if num == target:
            return i
    return -1


def bruteforce_find_first_occurrence(arr: List[int], target: int) -> int:
    """
    Finds the first occurrence of the target element in an array using a linear scan.

    Args:
        arr (List[int]): The list of integers to search within.
        target (int): The integer value to search for.

    Returns:
        int: The index of the first occurrence of the target if found, otherwise -1.

    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    for i, num in enumerate(arr):
        if num == target:
            return i
    return -1


def bruteforce_find_last_occurrence(arr: List[int], target: int) -> int:
    """
    Finds the last occurrence of the target element in an array using a linear scan.

    Args:
        arr (List[int]): The list of integers to search within.
        target (int): The integer value to search for.

    Returns:
        int: The index of the last occurrence of the target if found, otherwise -1.

    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    last_occurrence = -1
    for i, num in enumerate(arr):
        if num == target:
            last_occurrence = i
    return last_occurrence


def bruteforce_find_first_and_last_occurrence(arr: List[int], target: int) -> Tuple[int, int]:
    """
    Finds both the first and last occurrences of the target element in an array
    using a single linear scan.

    Args:
        arr (List[int]): The list of integers to search within.
        target (int): The integer value to search for.

    Returns:
        Tuple[int, int]: A tuple containing the index of the first occurrence and
                         the index of the last occurrence. Returns (-1, -1) if
                         the target is not found.

    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    first_occurrence = -1
    last_occurrence = -1
    for i, num in enumerate(arr):
        if num == target:
            if first_occurrence == -1:
                first_occurrence = i
            last_occurrence = i
    return (first_occurrence, last_occurrence)

if __name__ == '__main__':
    # Example usage for comparison
    arr = [1, 2, 3, 3, 3, 4, 5]
    target = 3

    print(f"Array: {arr}, Target: {target}")
    print(f"Linear Search: {linear_search(arr, target)} (Expected: 2)")
    print(f"Brute-force First Occurrence: {bruteforce_find_first_occurrence(arr, target)} (Expected: 2)")
    print(f"Brute-force Last Occurrence: {bruteforce_find_last_occurrence(arr, target)} (Expected: 4)")
    print(f"Brute-force First and Last Occurrence: {bruteforce_find_first_and_last_occurrence(arr, target)} (Expected: (2, 4))")

    arr_no_target = [1, 2, 4, 5]
    target_no_found = 3
    print(f"\nArray: {arr_no_target}, Target: {target_no_found}")
    print(f"Linear Search: {linear_search(arr_no_target, target_no_found)} (Expected: -1)")
    print(f"Brute-force First and Last Occurrence: {bruteforce_find_first_and_last_occurrence(arr_no_target, target_no_found)} (Expected: (-1, -1))")