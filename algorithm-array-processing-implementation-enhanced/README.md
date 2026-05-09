# Array Manipulation Interview Project

This project is a comprehensive guide and practice set for common array manipulation problems encountered in coding interviews. It includes multiple solutions, detailed explanations, extensive tests, performance benchmarks, and interview tips.

## Table of Contents

1.  **Project Structure**
2.  **Problems Covered**
3.  **How to Run**
    *   [Examples](#run-example-demonstrations)
    *   [Tests](#run-tests)
    *   [Benchmarks](#run-benchmarks)
4.  **Documentation**
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Visual Diagrams](#visual-diagrams)
    *   [Interview Tips](#interview-tips)

## Problems Covered

This project tackles several fundamental and advanced array manipulation problems, each with multiple approaches (brute force, optimized), detailed comments, and complexity analysis.

1.  **Rotate Array (p1_rotate_array.py)**
    *   Rotate an array to the right by `k` steps.
    *   Approaches: Brute Force, Extra Space, Cyclic Replacements, Reverse Method (Optimal).

2.  **Maximum Subarray Sum (p2_max_subarray_sum.py)**
    *   Find the contiguous subarray within an array (containing at least one number) which has the largest sum. (Kadane's Algorithm)
    *   Approaches: Brute Force, Dynamic Programming (Kadane's).

3.  **Merge Intervals (p3_merge_intervals.py)**
    *   Given a collection of intervals, merge all overlapping intervals.
    *   Approach: Sorting + Linear Scan.

4.  **Two Sum Variations (p4_two_sum_variations.py)**
    *   A set of problems where you need to find elements that sum up to a target.
    *   Problems: Two Sum, Three Sum, Four Sum.
    *   Approaches: Hash Map, Two Pointers (on sorted array).

5.  **Next Permutation (p5_next_permutation.py)**
    *   Implement `next permutation`, which rearranges numbers into the lexicographically next greater permutation.
    *   Approach: In-place algorithm (finding pivot and reversing).

## How to Run

### Run Example Demonstrations

The `main.py` script showcases how to use the implemented algorithms with various example inputs.

```bash
python main.py
```

### Run Tests

Tests are written using Python's `unittest` module.

To run all tests:

```bash
cd tests
python -m unittest discover
```

To run a specific test file (e.g., for Rotate Array):

```bash
cd tests
python test_p1_rotate_array.py
```

### Run Benchmarks

Benchmarks are implemented using the `timeit` module to compare the performance of different algorithms for the same problem.

To run benchmarks for a specific problem (e.g., Rotate Array):

```bash
cd benchmarks
python benchmark_p1_rotate_array.py
```

## Documentation

The `docs/` directory contains detailed explanations for the algorithms, visual aids, and general interview advice.

### Algorithm Explanations

[`docs/algorithm_explanations.md`](./docs/algorithm_explanations.md) provides an in-depth dive into the logic, time/space complexity, and reasoning behind the chosen optimal solutions for each problem.

### Visual Diagrams

[`docs/visual_diagrams.md`](./docs/visual_diagrams.md) contains ASCII art diagrams to help visualize the steps and concepts of complex algorithms like array rotation, Kadane's, and next permutation.

### Interview Tips

[`docs/interview_tips.md`](./docs/interview_tips.md) offers general advice on how to approach coding interviews, common pitfalls, communication strategies, and specific follow-up questions related to array manipulation.