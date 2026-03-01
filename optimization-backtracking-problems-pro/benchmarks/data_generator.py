# benchmarks/data_generator.py
# Utility for generating various types of test data for benchmarking.

import random

def generate_random_list(size: int, min_val: int = 1, max_val: int = 100) -> list[int]:
    """
    Generates a list of random integers.
    """
    return [random.randint(min_val, max_val) for _ in range(size)]

def generate_sorted_list(size: int, min_val: int = 1, max_val: int = 100) -> list[int]:
    """
    Generates a sorted list of unique random integers.
    """
    nums = set()
    while len(nums) < size:
        nums.add(random.randint(min_val, max_val * 2)) # Use larger range to help get unique numbers
    return sorted(list(nums))

def generate_list_with_duplicates(size: int, num_duplicates: int, min_val: int = 1, max_val: int = 10) -> list[int]:
    """
    Generates a list with a specified number of duplicates.
    Mainly for Combination Sum II.
    """
    if size < num_duplicates:
        raise ValueError("Size cannot be less than number of duplicates.")
    
    unique_elements = [random.randint(min_val, max_val) for _ in range(size - num_duplicates)]
    
    # Add duplicates of some existing elements
    for _ in range(num_duplicates):
        if unique_elements: # Ensure there's an element to duplicate
            unique_elements.append(random.choice(unique_elements))
        else: # If unique_elements is empty (size == num_duplicates)
            unique_elements.append(random.randint(min_val, max_val))
            
    random.shuffle(unique_elements)
    return unique_elements

def generate_n_queens_size(n: int) -> int:
    """
    Simply returns n for N-Queens problem.
    """
    return n

def generate_combination_sum_target(candidates: list[int]) -> int:
    """
    Generates a target value that is likely to have solutions
    based on the candidates, or a challenging target.
    """
    if not candidates:
        return 0
    
    # Create a target that is roughly half the sum of all unique candidates
    unique_candidates = sorted(list(set(candidates)))
    if not unique_candidates:
        return 0
    
    avg_sum = sum(unique_candidates) // 2
    
    # Make target challenging: try to have it be a sum of a few numbers
    if len(unique_candidates) > 2:
        target = unique_candidates[0] + unique_candidates[1] + random.randint(0, unique_candidates[-1])
    else:
        target = random.randint(1, avg_sum + 1)
        
    return max(1, target) # Ensure target is at least 1

if __name__ == '__main__':
    print("Example Data Generation:")
    print(f"Random list (size 5): {generate_random_list(5)}")
    print(f"Sorted list (size 5): {generate_sorted_list(5)}")
    print(f"List with duplicates (size 7, 3 duplicates): {generate_list_with_duplicates(7, 3)}")
    print(f"N-Queens size 4: {generate_n_queens_size(4)}")
    
    candidates_for_target = [1, 2, 3, 4, 5, 6, 7]
    print(f"Combination Sum target for {candidates_for_target}: {generate_combination_sum_target(candidates_for_target)}")
    
    candidates_duplicates = [1, 1, 2, 2, 3]
    print(f"Combination Sum target for {candidates_duplicates}: {generate_combination_sum_target(candidates_duplicates)}")