import random
from typing import List

def generate_random_array(size: int, min_val: int = -100, max_val: int = 100, allow_duplicates: bool = True) -> List[int]:
    """
    Generates a list of random integers.

    Args:
        size (int): The number of elements in the array.
        min_val (int): The minimum possible value for an element.
        max_val (int): The maximum possible value for an element.
        allow_duplicates (bool): If False, ensures all elements are unique.
                                 Note: If allow_duplicates is False and size > (max_val - min_val + 1),
                                 it will raise a ValueError.

    Returns:
        List[int]: A list of random integers.
    """
    if size < 0:
        raise ValueError("Array size cannot be negative.")
    if min_val > max_val:
        raise ValueError("min_val cannot be greater than max_val.")

    if not allow_duplicates:
        if size > (max_val - min_val + 1):
            raise ValueError(f"Cannot generate {size} unique numbers between {min_val} and {max_val}.")
        return random.sample(range(min_val, max_val + 1), size)
    else:
        return [random.randint(min_val, max_val) for _ in range(size)]

def print_array_with_indices(arr: List) -> None:
    """
    Prints an array along with its indices for better visualization.

    Args:
        arr (List): The array to print.
    """
    if not arr:
        print("Array: []")
        print("Indices: []")
        return

    indices_str = "Indices: " + " ".join([f"{i:>{len(str(arr[i]))}}" for i in range(len(arr))])
    array_str = "Array:   " + " ".join([str(x) for x in arr])

    print(indices_str)
    print(array_str)