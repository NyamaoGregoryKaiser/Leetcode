```python
import timeit
import gc
from typing import List, Callable, Tuple, Optional

# Adjust imports based on your project structure
from main_algorithms.linked_list_problems import LinkedListProblems
from utils.linked_list_utils import ListNode, list_to_linked_list

def run_benchmark(
    func: Callable[..., any],
    test_cases: List[Tuple[str, List[int], ...]], # (description, input_list, other_args...)
    num_runs: int = 1000,
    setup_func: Callable[[List[int], ...], Tuple[Optional[ListNode], ...]] = None,
    result_processor: Callable[[any], List[int]] = None
) -> None:
    """
    Runs benchmarks for a given function with various test cases.

    Args:
        func (Callable): The function to benchmark.
        test_cases (List[Tuple]): A list of tuples, where each tuple represents a test case.
                                  The first element is a description, and subsequent elements
                                  are arguments to be passed to the setup_func/func.
        num_runs (int): Number of times to run each test case for timeit.
        setup_func (Callable): A function that takes the raw test case inputs and
                               converts them into the required `ListNode` format for `func`.
                               Defaults to just `list_to_linked_list` for single list problems.
        result_processor (Callable): A function to convert the result of `func` back to a
                                     Python list for verification (optional).
    """
    print(f"\n--- Benchmarking: {func.__name__} ---")

    for test_case in test_cases:
        description = test_case[0]
        raw_inputs = test_case[1:]

        # Create the setup statement for timeit
        # The setup_func converts raw inputs (e.g., Python lists) into ListNode objects
        # that the algorithm expects.
        if setup_func:
            # Generate temporary variable names for the setup
            input_vars = [f"input_val_{i}" for i in range(len(raw_inputs))]
            setup_inputs_str = ", ".join([repr(arg) for arg in raw_inputs])
            setup_globals_str = f"func_inputs = {setup_func.__name__}({setup_inputs_str})"
            
            # Construct the call to the function, unpacking func_inputs
            if len(raw_inputs) > 1: # If setup_func returns a tuple, unpack it
                call_str = f"{func.__name__}(*func_inputs)"
            else: # If setup_func returns a single list/node, pass it directly
                call_str = f"{func.__name__}(func_inputs)"

            # Full setup string for timeit
            SETUP_CODE = f"""
from main_algorithms.linked_list_problems import LinkedListProblems
from utils.linked_list_utils import ListNode, list_to_linked_list, linked_list_to_list
import gc
{setup_func.__name__} = {setup_func.__module__}.{setup_func.__name__} # Get actual function reference
{func.__name__} = {func.__module__}.{func.__name__} # Get actual function reference
gc.disable() # Disable garbage collection during timing for more stable results
{setup_globals_str}
            """
        else: # Default for single-list problems
            list_data = raw_inputs[0]
            SETUP_CODE = f"""
from main_algorithms.linked_list_problems import LinkedListProblems
from utils.linked_list_utils import ListNode, list_to_linked_list, linked_list_to_list
import gc
head = list_to_linked_list({list_data})
{func.__name__} = {func.__module__}.{func.__name__}
gc.disable()
            """
            call_str = f"{func.__name__}(head)"

        # Execute the benchmark
        timer = timeit.Timer(stmt=call_str, setup=SETUP_CODE, globals=globals())
        
        try:
            times = timer.repeat(repeat=3, number=num_runs) # Repeat 3 times to get best of 3
            min_time = min(times) / num_runs * 1_000_000 # Convert to microseconds per run
            print(f"  {description}: {min_time:.3f} us (avg over {num_runs} runs)")
        except Exception as e:
            print(f"  {description}: Error during benchmarking - {e}")
        finally:
            gc.enable() # Re-enable garbage collection

    print("-" * 40)

# --- Setup functions for problems with multiple linked list inputs or other args ---
def setup_merge_lists(l1_data: List[int], l2_data: List[int]) -> Tuple[Optional[ListNode], Optional[ListNode]]:
    """Setup function for merge_two_lists."""
    return list_to_linked_list(l1_data), list_to_linked_list(l2_data)

def setup_remove_nth(list_data: List[int], n: int) -> Tuple[Optional[ListNode], int]:
    """Setup function for remove_nth_from_end."""
    return list_to_linked_list(list_data), n

def setup_add_two_numbers(l1_data: List[int], l2_data: List[int]) -> Tuple[Optional[ListNode], Optional[ListNode]]:
    """Setup function for add_two_numbers."""
    return list_to_linked_list(l1_data), list_to_linked_list(l2_data)

# --- Test Data ---
SMALL_LIST = list(range(10))
MEDIUM_LIST = list(range(100))
LARGE_LIST = list(range(1000))
VERY_LARGE_LIST = list(range(10000))

if __name__ == "__main__":
    # Benchmarking Reverse Linked List
    benchmark_cases_reverse = [
        ("Small List (10 nodes)", SMALL_LIST),
        ("Medium List (100 nodes)", MEDIUM_LIST),
        ("Large List (1000 nodes)", LARGE_LIST),
        # ("Very Large List (10000 nodes)", VERY_LARGE_LIST), # May cause recursion depth error
    ]
    run_benchmark(LinkedListProblems.reverse_list_iterative, benchmark_cases_reverse)
    run_benchmark(LinkedListProblems.reverse_list_recursive, benchmark_cases_reverse, num_runs=100) # Reduce runs for recursion

    # Benchmarking Detect Cycle
    # Note: `has_cycle` doesn't modify the list, so we can reuse `list_to_linked_list` directly in setup.
    list_with_small_cycle = list_to_linked_list(list(range(50)), pos=25)
    list_with_large_cycle = list_to_linked_list(list(range(500)), pos=250)
    list_no_cycle_large = list_to_linked_list(list(range(1000)))

    benchmark_cases_cycle = [
        ("No cycle (1000 nodes)", list(range(1000))),
        ("Small cycle (50 nodes, pos=25)", list_to_linked_list(list(range(50)), pos=25)), # Pass actual ListNode
        ("Large cycle (500 nodes, pos=250)", list_to_linked_list(list(range(500)), pos=250)),
    ]
    
    # We need a custom setup_func for has_cycle and detect_cycle_start because list_to_linked_list
    # already creates the ListNode objects with cycles. timeit's setup needs to rebuild this
    # for each run to ensure fairness and prevent side effects.
    def setup_cycle_detection(list_data: List[int], pos: int = -1) -> Optional[ListNode]:
        return list_to_linked_list(list_data, pos)

    benchmark_cases_has_cycle_raw = [
        ("No cycle (1000 nodes)", list(range(1000)), -1),
        ("Small cycle (50 nodes, pos=25)", list(range(50)), 25),
        ("Large cycle (500 nodes, pos=250)", list(range(500)), 250),
        ("Very Large cycle (10000 nodes, pos=5000)", list(range(10000)), 5000),
    ]
    run_benchmark(LinkedListProblems.has_cycle, benchmark_cases_has_cycle_raw, setup_func=setup_cycle_detection)
    run_benchmark(LinkedListProblems.detect_cycle_start, benchmark_cases_has_cycle_raw, setup_func=setup_cycle_detection)


    # Benchmarking Merge Two Sorted Lists
    benchmark_cases_merge = [
        ("Two small lists (10+10)", SMALL_LIST, list(range(5,15))),
        ("Two medium lists (100+100)", MEDIUM_LIST, list(range(50,150))),
        ("Two large lists (1000+1000)", LARGE_LIST, list(range(500,1500))),
        ("One empty, one large", [], LARGE_LIST),
        ("One small, one large", SMALL_LIST, LARGE_LIST),
    ]
    run_benchmark(LinkedListProblems.merge_two_lists_iterative, benchmark_cases_merge, setup_func=setup_merge_lists)
    run_benchmark(LinkedListProblems.merge_two_lists_recursive, benchmark_cases_merge, setup_func=setup_merge_lists, num_runs=100) # Reduce runs for recursion

    # Benchmarking Remove Nth Node From End
    benchmark_cases_remove_nth = [
        ("Small list (10 nodes), n=2", SMALL_LIST, 2),
        ("Medium list (100 nodes), n=50", MEDIUM_LIST, 50),
        ("Large list (1000 nodes), n=500", LARGE_LIST, 500),
        ("Large list (1000 nodes), n=1 (remove tail)", LARGE_LIST, 1),
        ("Large list (1000 nodes), n=1000 (remove head)", LARGE_LIST, 1000),
    ]
    run_benchmark(LinkedListProblems.remove_nth_from_end, benchmark_cases_remove_nth, setup_func=setup_remove_nth)

    # Benchmarking Add Two Numbers
    benchmark_cases_add_numbers = [
        ("Small numbers (2 digits)", [2,4], [5,6]), # 42+65=107
        ("Medium numbers (100 digits)", list(range(1,101)), list(range(50,150))),
        ("Large numbers (1000 digits)", [9]*1000, [1]*1000),
        ("Different lengths, large", [9]*500, [1]*1000),
    ]
    run_benchmark(LinkedListProblems.add_two_numbers, benchmark_cases_add_numbers, setup_func=setup_add_two_numbers)
```