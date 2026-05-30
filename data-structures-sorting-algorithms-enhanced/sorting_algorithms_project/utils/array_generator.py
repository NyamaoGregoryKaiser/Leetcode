import random

def generate_random_array(size, min_val=0, max_val=100):
    """
    Generates an array of random integers.

    Args:
        size (int): The number of elements in the array.
        min_val (int): The minimum possible value for an element.
        max_val (int): The maximum possible value for an element.

    Returns:
        list: A list of random integers.
    """
    if size < 0:
        raise ValueError("Size cannot be negative.")
    if min_val > max_val:
        raise ValueError("min_val cannot be greater than max_val.")
    return [random.randint(min_val, max_val) for _ in range(size)]

def generate_sorted_array(size, min_val=0, max_val=100):
    """
    Generates an array of sorted integers.

    Args:
        size (int): The number of elements in the array.
        min_val (int): The minimum possible value for an element.
        max_val (int): The maximum possible value for an element.

    Returns:
        list: A list of sorted integers.
    """
    if size < 0:
        raise ValueError("Size cannot be negative.")
    if size == 0:
        return []
    
    # Generate random numbers and sort them
    arr = [random.randint(min_val, max_val) for _ in range(size)]
    arr.sort()
    return arr

def generate_reverse_sorted_array(size, min_val=0, max_val=100):
    """
    Generates an array of reverse-sorted integers.

    Args:
        size (int): The number of elements in the array.
        min_val (int): The minimum possible value for an element.
        max_val (int): The maximum possible value for an element.

    Returns:
        list: A list of reverse-sorted integers.
    """
    if size < 0:
        raise ValueError("Size cannot be negative.")
    if size == 0:
        return []
    
    arr = [random.randint(min_val, max_val) for _ in range(size)]
    arr.sort(reverse=True)
    return arr

def generate_array_with_duplicates(size, min_val=0, max_val=10):
    """
    Generates an array with a high probability of duplicates by
    limiting the range of possible values.

    Args:
        size (int): The number of elements in the array.
        min_val (int): The minimum possible value for an element.
        max_val (int): The maximum possible value for an element.
                        (defaulted to a small range to ensure duplicates).

    Returns:
        list: A list of integers likely containing duplicates.
    """
    if size < 0:
        raise ValueError("Size cannot be negative.")
    if min_val > max_val:
        raise ValueError("min_val cannot be greater than max_val.")
    # Ensure max_val is at least min_val + (size // 2) to guarantee some variance if size is large
    # but still promote duplicates if max_val-min_val is small.
    return [random.randint(min_val, max_val) for _ in range(size)]

def generate_nearly_sorted_array(size, num_swaps=5, min_val=0, max_val=100):
    """
    Generates a nearly sorted array by taking a sorted array and performing a few random swaps.

    Args:
        size (int): The number of elements in the array.
        num_swaps (int): The number of random swaps to perform.
        min_val (int): The minimum possible value for an element.
        max_val (int): The maximum possible value for an element.

    Returns:
        list: A list that is mostly sorted but with a few inversions.
    """
    if size < 0:
        raise ValueError("Size cannot be negative.")
    arr = generate_sorted_array(size, min_val, max_val)
    for _ in range(min(num_swaps, size // 2)): # Don't swap more than half the array
        idx1, idx2 = random.sample(range(size), 2)
        arr[idx1], arr[idx2] = arr[idx2], arr[idx1]
    return arr
```