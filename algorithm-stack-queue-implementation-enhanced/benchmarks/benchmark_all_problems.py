import timeit
import random
from main_algorithms.problem1_valid_parentheses import is_valid_parentheses_optimal, is_valid_parentheses_alternative
from main_algorithms.problem2_min_stack import MinStack, MinStackAuxiliaryStack
from main_algorithms.problem3_queue_using_stacks import MyQueue
from main_algorithms.problem4_sliding_window_maximum import max_sliding_window_optimal, max_sliding_window_bruteforce
from main_algorithms.problem5_next_greater_element import next_greater_elements_optimal

# --- Helper functions for generating test data ---
def generate_parentheses_string(length, valid_ratio=0.8):
    """Generates a parentheses string, mostly valid but with some invalid structures."""
    if length == 0: return ""
    
    brackets = "()[]{}"
    s_list = []
    stack = []
    
    for _ in range(length):
        if random.random() < valid_ratio and stack:
            # Try to close an open bracket
            open_bracket = stack.pop()
            if open_bracket == '(': s_list.append(')')
            elif open_bracket == '[': s_list.append(']')
            elif open_bracket == '{': s_list.append('}')
        else:
            # Open a new bracket
            open_bracket = random.choice("([{")
            s_list.append(open_bracket)
            stack.append(open_bracket)
    
    # Close any remaining open brackets to make it valid
    while stack:
        open_bracket = stack.pop()
        if open_bracket == '(': s_list.append(')')
        elif open_bracket == '[': s_list.append(']')
        elif open_bracket == '{': s_list.append('}')
            
    # If the generated string is longer than requested, truncate.
    # If it's shorter (e.g., small length and only opening brackets initially),
    # pad with random valid pairs to reach length.
    res_str = "".join(s_list[:length])
    
    if len(res_str) < length:
        # Pad with simple '()' pairs if too short
        padding_needed = length - len(res_str)
        for _ in range(padding_needed // 2):
            res_str += "()"
        if padding_needed % 2 != 0:
            res_str += "(" # Make it intentionally invalid if odd
            
    return res_str[:length]


def generate_random_list(length, min_val=-1000, max_val=1000):
    return [random.randint(min_val, max_val) for _ in range(length)]

def run_benchmark(stmt, setup, label, number=1000):
    times = timeit.repeat(stmt, setup, number=number, repeat=3)
    avg_time_ms = (sum(times) / len(times)) * 1000 / number
    print(f"  {label:<40}: {avg_time_ms:.6f} ms/execution")
    return avg_time_ms

def main():
    print("--- Stack and Queue Algorithm Benchmarks ---")
    print("All times are average per execution in milliseconds (ms).\n")

    test_sizes = [1000, 10000, 50000]

    # Problem 1: Valid Parentheses
    print("\n# Problem 1: Valid Parentheses")
    for size in test_sizes:
        print(f"\n## Input Size: N = {size}")
        s_long = generate_parentheses_string(size)
        
        setup_optimal = f"from main_algorithms.problem1_valid_parentheses import is_valid_parentheses_optimal; s = '{s_long}'"
        run_benchmark("is_valid_parentheses_optimal(s)", setup_optimal, "Optimal (is_valid_parentheses_optimal)")

        setup_alternative = f"from main_algorithms.problem1_valid_parentheses import is_valid_parentheses_alternative; s = '{s_long}'"
        run_benchmark("is_valid_parentheses_alternative(s)", setup_alternative, "Alternative (is_valid_parentheses_alternative)")

    # Problem 2: Min Stack
    print("\n# Problem 2: Min Stack")
    num_operations_list = [1000, 10000, 50000]
    for num_ops in num_operations_list:
        print(f"\n## Number of Operations: {num_ops}")
        
        # Generating operations
        ops = []
        for _ in range(num_ops):
            op_type = random.choice(["push", "pop", "top", "getMin"])
            if op_type == "push":
                ops.append((op_type, random.randint(-100, 100)))
            else:
                ops.append((op_type, None))
        
        # MinStack (Tuple Storage)
        setup_ms_tuple = f"""
from main_algorithms.problem2_min_stack import MinStack
ops = {ops}
"""
        stmt_ms_tuple = """
ms = MinStack()
for op_type, val in ops:
    if op_type == "push": ms.push(val)
    elif op_type == "pop":
        try: ms.pop()
        except IndexError: pass
    elif op_type == "top":
        try: ms.top()
        except IndexError: pass
    elif op_type == "getMin":
        try: ms.getMin()
        except IndexError: pass
"""
        run_benchmark(stmt_ms_tuple, setup_ms_tuple, "MinStack (Tuple Storage)", number=100) # Lower number for complex ops

        # MinStack (Auxiliary Stack)
        setup_ms_aux = f"""
from main_algorithms.problem2_min_stack import MinStackAuxiliaryStack
ops = {ops}
"""
        stmt_ms_aux = """
ms_aux = MinStackAuxiliaryStack()
for op_type, val in ops:
    if op_type == "push": ms_aux.push(val)
    elif op_type == "pop":
        try: ms_aux.pop()
        except IndexError: pass
    elif op_type == "top":
        try: ms_aux.top()
        except IndexError: pass
    elif op_type == "getMin":
        try: ms_aux.getMin()
        except IndexError: pass
"""
        run_benchmark(stmt_ms_aux, setup_ms_aux, "MinStack (Auxiliary Stack)", number=100)

    # Problem 3: Implement Queue using Stacks
    print("\n# Problem 3: Implement Queue using Stacks")
    num_operations_list = [1000, 10000, 50000]
    for num_ops in num_operations_list:
        print(f"\n## Number of Operations: {num_ops}")
        
        # Generating operations
        ops = []
        for _ in range(num_ops):
            op_type = random.choice(["push", "pop", "peek", "empty"])
            if op_type == "push":
                ops.append((op_type, random.randint(1, 100)))
            else:
                ops.append((op_type, None))
        
        setup_queue_stacks = f"""
from main_algorithms.problem3_queue_using_stacks import MyQueue
ops = {ops}
"""
        stmt_queue_stacks = """
my_queue = MyQueue()
for op_type, val in ops:
    if op_type == "push": my_queue.push(val)
    elif op_type == "pop":
        try: my_queue.pop()
        except IndexError: pass
    elif op_type == "peek":
        try: my_queue.peek()
        except IndexError: pass
    elif op_type == "empty": my_queue.empty()
"""
        run_benchmark(stmt_queue_stacks, setup_queue_stacks, "MyQueue (using two stacks)", number=100)


    # Problem 4: Sliding Window Maximum
    print("\n# Problem 4: Sliding Window Maximum")
    test_params = [
        (1000, 100), (10000, 500), (50000, 2000)
    ]
    for n, k in test_params:
        print(f"\n## Input Size: N = {n}, Window Size: K = {k}")
        nums_long = generate_random_list(n)
        
        setup_optimal = f"from main_algorithms.problem4_sliding_window_maximum import max_sliding_window_optimal; nums = {nums_long}; k = {k}"
        run_benchmark("max_sliding_window_optimal(nums, k)", setup_optimal, "Optimal (monotonic deque)", number=50) # Lower number for longer lists

        # Brute force only for smaller N to avoid excessively long runs
        if n <= 10000:
            setup_bruteforce = f"from main_algorithms.problem4_sliding_window_maximum import max_sliding_window_bruteforce; nums = {nums_long}; k = {k}"
            run_benchmark("max_sliding_window_bruteforce(nums, k)", setup_bruteforce, "Brute Force", number=10) # Even lower for BF

    # Problem 5: Next Greater Element
    print("\n# Problem 5: Next Greater Element (Circular)")
    for size in test_sizes:
        print(f"\n## Input Size: N = {size}")
        nums_long = generate_random_list(size)
        
        setup_nge = f"from main_algorithms.problem5_next_greater_element import next_greater_elements_optimal; nums = {nums_long}"
        run_benchmark("next_greater_elements_optimal(nums)", setup_nge, "Optimal (monotonic stack)")

if __name__ == '__main__':
    main()