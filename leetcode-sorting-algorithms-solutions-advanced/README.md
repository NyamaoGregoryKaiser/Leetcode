# Sorting Algorithms Interview Project

This project is a comprehensive resource for mastering sorting algorithms and related problems commonly encountered in coding interviews. It provides multiple solutions for each problem, complete with detailed explanations, complexity analysis, test cases, and performance benchmarks.

## Project Structure

*   `main.py`: A simple script demonstrating how to use the implemented solutions.
*   `sorting_problems/`: Contains the core solutions for various sorting-related problems.
*   `utils/`: Includes helper functions and implementations of fundamental sorting algorithms (Merge Sort, Quick Sort).
*   `tests/`: Unit tests for all problem solutions using the `unittest` framework.
*   `docs/`: Extensive documentation covering problem descriptions, algorithm explanations, visual diagrams, edge cases, and interview tips.
*   `benchmarking/`: Scripts to measure and compare the performance of different approaches.
*   `additional_implementations/`: Contains brute-force or simpler, less optimized solutions for comparison.
*   `requirements.txt`: Lists the Python dependencies.

## Problems Covered

1.  **Kth Largest Element in an Array**: Find the k-th largest element in an unsorted array.
    *   **Approaches**: Quickselect (optimal), Sorting, Min-Heap.
2.  **Merge Overlapping Intervals**: Merge all overlapping intervals in a collection.
    *   **Approach**: Sorting by start time, then iterating and merging.
3.  **Group Anagrams**: Group words from a list that are anagrams of each other.
    *   **Approaches**: Sorting characters to form a key, Counting characters to form a key.
4.  **Wiggle Sort II**: Rearrange an array such that `nums[0] < nums[1] > nums[2] < nums[3]...`.
    *   **Approaches**: Optimal (Quickselect + 3-way partition + virtual indexing), Simple (Sort + Interleave).

## Setup and Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sorting_interview_project.git
    cd sorting_interview_project
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: `venv\Scripts\activate`
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Run the main demonstration:**
    ```bash
    python main.py
    ```
5.  **Run tests:**
    ```bash
    python -m unittest discover tests
    ```
6.  **Run benchmarks:**
    ```bash
    python benchmarking/benchmark_performance.py
    ```

## Documentation

Explore the `docs/` directory for in-depth information:

*   `docs/problems_guide.md`: Detailed problem statements and examples.
*   `docs/algorithms_explanation.md`: Explanations of Quickselect, Merge Sort, Quick Sort, and other core logic.
*   `docs/visual_diagrams.md`: ASCII art illustrations of sorting processes.
*   `docs/edge_cases_gotchas.md`: A list of common edge cases and potential pitfalls.
*   `docs/interview_tips.md`: Advice on how to approach sorting problems in an interview setting.

## Contributing

Feel free to open issues or pull requests to suggest improvements, add more problems, or refine existing solutions.

---
**Disclaimer**: This project aims to provide educational content for interview preparation. The `additional_implementations` directory showcases less optimized or brute-force approaches for pedagogical purposes and should not always be used in production code.