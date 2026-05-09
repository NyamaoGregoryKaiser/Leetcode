def print_array_line(arr: list) -> str:
    """
    Utility function to print an array (or list of lists) in a compact, readable string format.
    Useful for consistent output in examples and benchmarks.
    """
    if not arr:
        return "[]"
    
    if isinstance(arr[0], list): # For lists of lists, like intervals or triplets
        return "[" + ", ".join(f"[{', '.join(map(str, sub_arr))}]" for sub_arr in arr) + "]"
    else: # For flat lists
        return "[" + ", ".join(map(str, arr)) + "]"

if __name__ == '__main__':
    print(f"Flat array: {print_array_line([1, 2, 3, 4, 5])}")
    print(f"Empty array: {print_array_line([])}")
    print(f"Array of lists: {print_array_line([[1,3], [2,6], [8,10]])}")
    print(f"Array of tuples (works with map(str, obj)): {print_array_line([(1,2), (3,4)])}")