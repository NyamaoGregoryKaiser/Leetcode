```markdown
# Stack and Queue Interview Project

This project provides a comprehensive collection of classic coding interview problems related to Stacks and Queues. It includes optimal C++ implementations, detailed explanations, extensive test cases, performance benchmarks, and valuable interview tips.

## Project Structure

```
stack_queue_interview_project/
├── src/
│   ├── stack_queue_problems.h            # Header for problem declarations
│   ├── stack_queue_problems.cpp          # Main algorithm implementations
│   ├── main.cpp                          # Example usage and demonstration
│   └── utils/
│       ├── custom_stack_queue.h          # Custom Stack/Queue (linked-list based) implementations
│       └── custom_stack_queue.cpp        # Custom Stack/Queue (linked-list based) implementations
├── tests/
│   └── test_problems.cpp                 # Google Test for all problems
├── benchmarks/
│   └── benchmark_problems.cpp            # Google Benchmark for performance analysis
├── docs/
│   ├── README.md                         # Project overview and build instructions (this file)
│   ├── ALGORITHM_EXPLANATIONS.md         # Detailed algorithm logic, complexity analysis
│   ├── VISUAL_DIAGRAMS.md                # ASCII art diagrams for core algorithms
│   └── INTERVIEW_TIPS.md                 # Interview strategies, common pitfalls, variations
├── .gitignore
├── CMakeLists.txt                        # Build system configuration
```

## Problems Covered

1.  **Valid Parentheses**: Determine if a string of parentheses `{}()[]` is valid.
2.  **Min Stack**: Design a stack that supports `push`, `pop`, `top`, and `getMin` in O(1) time.
3.  **Implement Queue using Stacks**: Implement a FIFO queue using only two LIFO stacks.
4.  **Sliding Window Maximum**: Find the maximum element in each sliding window of size `k` in an array.
5.  **Daily Temperatures**: For each day, calculate how many days you have to wait until a warmer temperature.

Each problem includes:
*   Optimal solution using C++ STL `std::stack`, `std::queue`, `std::deque`.
*   Detailed comments.
*   Time and Space complexity analysis.
*   Where applicable, brute-force solutions for comparison.

## Building and Running the Project

This project uses CMake for its build system and relies on [Google Test](https://github.com/google/googletest) and [Google Benchmark](https://github.com/google/benchmark) for testing and benchmarking.

### Prerequisites

*   A C++17 compatible compiler (e.g., GCC, Clang, MSVC).
*   CMake (version 3.10 or higher).
*   Google Test (installed globally or available via `find_package`).
*   Google Benchmark (installed globally or available via `find_package`).

**For Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install build-essential cmake libgtest-dev libbenchmark-dev
# To use gtest, you might also need to build it:
# cd /usr/src/googletest
# sudo cmake .
# sudo make
# sudo mv libg* /usr/lib/
```

### Build Steps

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/your-username/stack_queue_interview_project.git
    cd stack_queue_interview_project
    ```
2.  **Create a build directory and run CMake:**
    ```bash
    mkdir build
    cd build
    cmake ..
    ```
3.  **Build the project:**
    ```bash
    make
    ```

### Running the Executables

After building, you'll find several executables in the `build` directory:

*   **`stack_queue_demo`**: Runs a simple demonstration of each problem's solution and the custom data structures.
    ```bash
    ./stack_queue_demo
    ```

*   **`run_tests`**: Executes all Google Test cases for the problems and custom data structures.
    ```bash
    ./run_tests
    ```

*   **`run_benchmarks`**: Runs performance benchmarks using Google Benchmark.
    ```bash
    ./run_benchmarks
    ```
    *(Note: If Google Benchmark was not found during CMake configuration, this executable might not be built.)*

## Documentation

The `docs/` directory contains detailed explanations and resources:

*   **`ALGORITHM_EXPLANATIONS.md`**: In-depth breakdown of each problem's logic, optimal approaches, and complexity analysis.
*   **`VISUAL_DIAGRAMS.md`**: ASCII art diagrams to illustrate the step-by-step execution of key algorithms (e.g., stack/queue states).
*   **`INTERVIEW_TIPS.md`**: Advice on approaching stack/queue problems, common pitfalls, asking clarifying questions, and exploring variations during an interview.

Feel free to explore these documents for a deeper understanding of the solutions and interview strategies.
```