import random

def generate_random_int_list(size: int, min_val: int = -1000, max_val: int = 1000) -> list[int]:
    """
    Generates a list of random integers.

    Args:
        size (int): The number of elements in the list.
        min_val (int): The minimum possible value for an element.
        max_val (int): The maximum possible value for an element.

    Returns:
        list[int]: A list of random integers.
    """
    if size < 0:
        raise ValueError("Size cannot be negative.")
    if min_val > max_val:
        raise ValueError("min_val cannot be greater than max_val.")
    return [random.randint(min_val, max_val) for _ in range(size)]

def generate_random_k_sorted_lists(k: int, max_list_size: int, min_val: int = 0, max_val: int = 1000, allow_empty: bool = False) -> list[list[int]]:
    """
    Generates k lists, each containing sorted random integers.

    Args:
        k (int): The number of lists to generate.
        max_list_size (int): The maximum number of elements in each list.
        min_val (int): The minimum possible value for an element.
        max_val (int): The maximum possible value for an element.
        allow_empty (bool): If True, some lists might be empty.

    Returns:
        list[list[int]]: A list of k sorted lists of integers.
    """
    if k <= 0:
        raise ValueError("k must be positive.")
    if max_list_size < 0:
        raise ValueError("max_list_size cannot be negative.")

    all_lists = []
    for _ in range(k):
        current_list_size = random.randint(0, max_list_size) if allow_empty else random.randint(1, max_list_size)
        
        # To ensure sorted lists, we can generate sorted numbers or generate and sort.
        # Generating sorted numbers: pick a start, then next numbers are >= previous.
        # Simpler: generate and sort.
        
        current_list = generate_random_int_list(current_list_size, min_val, max_val)
        current_list.sort()
        all_lists.append(current_list)
    return all_lists

def generate_random_frequencies_list(size: int, num_unique: int, min_val: int = 1, max_val: int = 100) -> list[int]:
    """
    Generates a list of integers with controlled number of unique elements
    to simulate frequency distributions.

    Args:
        size (int): The total number of elements in the list.
        num_unique (int): The desired number of unique elements. Must be <= size.
        min_val (int): Minimum value for the unique elements.
        max_val (int): Maximum value for the unique elements.

    Returns:
        list[int]: A list of integers with roughly `num_unique` distinct elements.
    """
    if num_unique > size:
        raise ValueError("num_unique cannot be greater than size.")
    if num_unique <= 0 or size <= 0:
        raise ValueError("size and num_unique must be positive.")

    # Generate unique elements
    unique_elements = random.sample(range(min_val, max_val + 1), num_unique)
    
    # Distribute these unique elements to form the list
    result = []
    for _ in range(size):
        result.append(random.choice(unique_elements))
    return result

if __name__ == '__main__':
    print("--- Testing Helper Functions ---")

    print("\nRandom Int List (size 10, range 0-100):")
    print(generate_random_int_list(10, 0, 100))

    print("\nRandom K Sorted Lists (k=3, max_list_size=5, range -10 to 10):")
    k_lists = generate_random_k_sorted_lists(3, 5, -10, 10)
    for lst in k_lists:
        print(lst)

    print("\nRandom Frequencies List (size 20, unique=5, range 1-10):")
    freq_list = generate_random_frequencies_list(20, 5, 1, 10)
    print(freq_list)
    from collections import Counter
    print("Unique elements count:", len(Counter(freq_list)))

    print("\nTesting edge cases:")
    try:
        generate_random_int_list(-5)
    except ValueError as e:
        print(f"Caught expected error: {e}")
    try:
        generate_random_k_sorted_lists(0, 5)
    except ValueError as e:
        print(f"Caught expected error: {e}")
    try:
        generate_random_frequencies_list(10, 15)
    except ValueError as e:
        print(f"Caught expected error: {e}")
    
    # Test `allow_empty` for k_sorted_lists
    print("\nRandom K Sorted Lists (k=3, max_list_size=3, allow_empty=True):")
    k_lists_empty = generate_random_k_sorted_lists(3, 3, allow_empty=True)
    for lst in k_lists_empty:
        print(lst)