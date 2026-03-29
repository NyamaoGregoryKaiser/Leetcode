import random

def generate_random_array(size: int, min_val: int = 0, max_val: int = 100) -> list[int]:
    """
    Generates an array of random integers.

    Args:
        size: The number of elements in the array.
        min_val: The minimum possible value for an element.
        max_val: The maximum possible value for an element.

    Returns:
        A list of random integers.
    """
    return [random.randint(min_val, max_val) for _ in range(size)]

def generate_sorted_array(size: int) -> list[int]:
    """
    Generates an array of sorted integers in ascending order.

    Args:
        size: The number of elements in the array.

    Returns:
        A list of sorted integers.
    """
    return list(range(size))

def generate_reverse_sorted_array(size: int) -> list[int]:
    """
    Generates an array of sorted integers in descending order.

    Args:
        size: The number of elements in the array.

    Returns:
        A list of reverse-sorted integers.
    """
    return list(range(size - 1, -1, -1))

def generate_array_with_duplicates(size: int, num_unique: int) -> list[int]:
    """
    Generates an array with random integers, but with a limited number of unique values
    to ensure duplicates.

    Args:
        size: The number of elements in the array.
        num_unique: The number of unique values to draw from.
                    Must be less than or equal to `size`.

    Returns:
        A list of integers with duplicates.
    """
    if num_unique > size:
        raise ValueError("num_unique cannot be greater than size")
    unique_values = random.sample(range(max(10, size)), num_unique) # Ensure unique_values are distinct
    return [random.choice(unique_values) for _ in range(size)]

def generate_nearly_sorted_array(size: int, num_swaps: int = 5) -> list[int]:
    """
    Generates an array that is mostly sorted but with a few elements swapped
    to introduce slight disorder.

    Args:
        size: The number of elements in the array.
        num_swaps: The number of random swaps to perform.

    Returns:
        A nearly sorted list of integers.
    """
    arr = list(range(size))
    for _ in range(min(num_swaps, size // 2)): # Don't swap more than half the array
        idx1, idx2 = random.sample(range(size), 2)
        arr[idx1], arr[idx2] = arr[idx2], arr[idx1]
    return arr

def generate_few_unique_elements_array(size: int, values: list[int]) -> list[int]:
    """
    Generates an array where elements are chosen only from a given small set of values.
    Useful for problems like Sort Colors (0s, 1s, 2s).

    Args:
        size: The number of elements in the array.
        values: A list of unique values to populate the array with.

    Returns:
        A list of integers with elements drawn from `values`.
    """
    if not values:
        return []
    return [random.choice(values) for _ in range(size)]