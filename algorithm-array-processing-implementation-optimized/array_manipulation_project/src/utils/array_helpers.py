import random

def generate_random_array(size, min_val=0, max_val=100):
    """
    Generates a list of random integers.

    Args:
        size (int): The number of elements in the array.
        min_val (int): The minimum possible value for an element.
        max_val (int): The maximum possible value for an element.

    Returns:
        list: A list of random integers.
    """
    return [random.randint(min_val, max_val) for _ in range(size)]

def print_array_with_indices(arr):
    """
    Prints an array along with its indices for better visualization.

    Args:
        arr (list): The array to print.
    """
    if not arr:
        print("[]")
        return

    indices = [str(i).ljust(len(str(max(arr) if arr else 0))) for i in range(len(arr))]
    elements = [str(x).ljust(len(str(max(arr) if arr else 0))) for x in arr]

    print("Indices:  " + " ".join(indices))
    print("Elements: " + " ".join(elements))

if __name__ == "__main__":
    print("--- Array Helper Utilities Demonstration ---")

    # Generate a random array
    random_arr = generate_random_array(10, -50, 50)
    print(f"\nGenerated random array ({len(random_arr)} elements): {random_arr}")

    # Print array with indices
    print("\nFormatted print of random array:")
    print_array_with_indices(random_arr)

    # Test with an empty array
    empty_arr = []
    print(f"\nEmpty array: {empty_arr}")
    print("Formatted print of empty array:")
    print_array_with_indices(empty_arr)

    # Test with a small array
    small_arr = [5, 12, 3]
    print(f"\nSmall array: {small_arr}")
    print("Formatted print of small array:")
    print_array_with_indices(small_arr)

    # Test with large numbers
    large_num_arr = [12345, 678, 901234]
    print(f"\nArray with large numbers: {large_num_arr}")
    print("Formatted print of array with large numbers:")
    print_array_with_indices(large_num_arr)