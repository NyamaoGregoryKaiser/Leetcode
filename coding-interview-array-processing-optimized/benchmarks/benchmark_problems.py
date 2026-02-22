import timeit
import random
import sys
import os

# Add the 'src' directory to sys.path to allow importing modules from it
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))

from problems import (
    ContainerWithMostWater,
    ProductOfArrayExceptSelf,
    RotateImage,
    MeetingRoomsII
)

# --- Configuration ---
NUM_RUNS = 100 # Number of times to run each benchmark
TEST_SIZES = [100, 1000, 10000, 50000] # Input sizes for array/matrix problems
MAX_HEIGHT = 10**9 # Max height for ContainerWithMostWater
MAX_NUM_VAL = 1000 # Max value for ProductOfArrayExceptSelf
MAX_INTERVAL_TIME = 10**5 # Max time for MeetingRoomsII intervals

def generate_heights(size):
    """Generates a list of random heights for ContainerWithMostWater."""
    return [random.randint(1, MAX_HEIGHT) for _ in range(size)]

def generate_nums(size, allow_zeros=False):
    """Generates a list of random numbers for ProductOfArrayExceptSelf."""
    if allow_zeros:
        return [random.randint(0, MAX_NUM_VAL) for _ in range(size)]
    return [random.randint(1, MAX_NUM_VAL) for _ in range(size)]

def generate_matrix(size):
    """Generates a square matrix for RotateImage."""
    return [[random.randint(1, 100) for _ in range(size)] for _ in range(size)]

def generate_intervals(size):
    """Generates a list of random meeting intervals."""
    intervals = []
    for _ in range(size):
        start = random.randint(0, MAX_INTERVAL_TIME)
        end = random.randint(start + 1, MAX_INTERVAL_TIME + 100) # Ensure end > start
        intervals.append([start, end])
    return intervals

def run_benchmark(setup_code, statement_code, label, num_runs=NUM_RUNS):
    """Helper function to run a single benchmark."""
    print(f"  Benchmarking: {label} (runs={num_runs})")
    try:
        times = timeit.repeat(
            stmt=statement_code,
            setup=setup_code,
            number=1, # Execute statement_code once per repeat call
            repeat=num_runs
        )
        avg_time_ms = (sum(times) / len(times)) * 1000
        print(f"    Avg time: {avg_time_ms:.4f} ms")
    except Exception as e:
        print(f"    Error during benchmark: {e}")

print("--- Starting Benchmarks ---")
print(f"Number of runs per test: {NUM_RUNS}\n")

# --- Container With Most Water Benchmarks ---
print("--- Problem: Container With Most Water ---")
for size in TEST_SIZES:
    print(f"\nInput Size: N = {size}")
    heights = generate_heights(size)

    setup_brute_force = f"from problems import ContainerWithMostWater; heights = {heights}"
    run_benchmark(setup_brute_force, "ContainerWithMostWater.brute_force(heights)", "Brute Force")

    setup_two_pointers = f"from problems import ContainerWithMostWater; heights = {heights}"
    run_benchmark(setup_two_pointers, "ContainerWithMostWater.two_pointers_optimal(heights)", "Two Pointers (Optimal)")

# --- Product of Array Except Self Benchmarks ---
print("\n--- Problem: Product of Array Except Self ---")
for size in TEST_SIZES:
    print(f"\nInput Size: N = {size}")
    nums = generate_nums(size)

    setup_two_arrays = f"from problems import ProductOfArrayExceptSelf; nums = {nums}"
    run_benchmark(setup_two_arrays, "ProductOfArrayExceptSelf.two_arrays_approach(nums)", "Two Arrays (O(N) space)")

    setup_optimal = f"from problems import ProductOfArrayExceptSelf; nums = {nums}"
    run_benchmark(setup_optimal, "ProductOfArrayExceptSelf.optimal_o1_space(nums)", "Optimal (O(1) space)")

# --- Rotate Image Benchmarks ---
# For matrix, size grows quadratically, so smaller TEST_SIZES or careful selection needed.
MATRIX_TEST_SIZES = [10, 50, 100, 200]
print("\n--- Problem: Rotate Image ---")
for size in MATRIX_TEST_SIZES:
    print(f"\nInput Size: N = {size}x{size}")

    # Note: For in-place modifications, we must recreate the matrix for each run
    # to ensure a fresh state.
    # The setup string will dynamically generate the matrix.

    # Brute force (not in-place, but good for comparison if allowed)
    # This setup is problematic for 'timeit' because it modifies the list.
    # We must ensure each benchmark gets a fresh copy.
    # The current `rotate_with_extra_space` modifies in-place, which is misleading.
    # Let's clarify: if rotate_with_extra_space creates a *new* matrix and returns it,
    # then the setup would be `m_orig = generate_matrix(size); m = list(m_orig); ...`
    # Since it modifies in-place then copies back, it's ok for benchmark, but still violates problem statement.
    setup_extra_space = (f"from problems import RotateImage; from benchmarks.benchmark_problems import generate_matrix; "
                         f"matrix_data = generate_matrix({size}); matrix_copy = [row[:] for row in matrix_data]")
    run_benchmark(setup_extra_space, "RotateImage.rotate_with_extra_space(matrix_copy)", "Extra Space (Not in-place)")

    setup_transpose_reverse = (f"from problems import RotateImage; from benchmarks.benchmark_problems import generate_matrix; "
                               f"matrix_data = generate_matrix({size}); matrix_copy = [row[:] for row in matrix_data]")
    run_benchmark(setup_transpose_reverse, "RotateImage.rotate_in_place_transpose_and_reverse(matrix_copy)", "Transpose & Reverse (Optimal)")

    setup_layer_by_layer = (f"from problems import RotateImage; from benchmarks.benchmark_problems import generate_matrix; "
                            f"matrix_data = generate_matrix({size}); matrix_copy = [row[:] for row in matrix_data]")
    run_benchmark(setup_layer_by_layer, "RotateImage.rotate_in_place_layer_by_layer(matrix_copy)", "Layer by Layer (Optimal)")


# --- Meeting Rooms II Benchmarks ---
# Interval generation ensures varying overlaps.
print("\n--- Problem: Meeting Rooms II ---")
for size in TEST_SIZES:
    print(f"\nInput Size: N = {size}")
    intervals = generate_intervals(size)

    # Brute force (conceptual) - not efficient enough to run for large N
    # The `min_rooms_brute_force_conceptual` is not meant to be efficient,
    # it's a conceptual discussion point. Running it for large N will be very slow.
    # Hence, limiting its benchmark or skipping it.
    if size <= 100: # Only run for small sizes
        setup_brute_force_mr = f"from problems import MeetingRoomsII; intervals = {intervals}"
        run_benchmark(setup_brute_force_mr, "MeetingRoomsII.min_rooms_brute_force_conceptual(intervals)", "Brute Force (Conceptual)", num_runs=10) # Fewer runs

    setup_optimal_heap = f"from problems import MeetingRoomsII; intervals = {intervals}"
    run_benchmark(setup_optimal_heap, "MeetingRoomsII.min_rooms_optimal_heap(intervals)", "Optimal (Min-Heap)")

    setup_line_sweep = f"from problems import MeetingRoomsII; intervals = {intervals}"
    run_benchmark(setup_line_sweep, "MeetingRoomsII.min_rooms_line_sweep(intervals)", "Optimal (Line Sweep)")

print("\n--- Benchmarks Finished ---")
---