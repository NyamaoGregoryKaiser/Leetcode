# Math Problems Coding Interview Project

This project serves as a comprehensive resource for tackling common mathematical problems in coding interviews. It includes multiple implementations (brute-force, optimized, recursive, iterative, dynamic programming), detailed explanations, test cases, and performance benchmarks for each problem.

## Project Structure

*   **`src/`**: Contains the core C++ implementations of the problems, helper utilities, and a `main` file for demonstration.
*   **`tests/`**: Houses unit tests for verifying correctness and performance benchmarks for comparing different algorithmic approaches.
*   **`docs/`**: Provides detailed documentation, including problem descriptions, algorithm explanations, and interview preparation guidance.
*   **`CMakeLists.txt`**: Configuration file for building the project using CMake.

## Problems Covered

1.  **Greatest Common Divisor (GCD) & Least Common Multiple (LCM)**
    *   Euclidean Algorithm (Recursive and Iterative)
    *   Naive approaches (for comparison)
2.  **Prime Number Generation (Sieve of Eratosthenes)**
    *   Sieve implementation for efficient prime generation up to N
    *   Naive `is_prime` check (trial division)
3.  **Power (x^n) Calculation**
    *   Naive iterative multiplication
    *   Binary Exponentiation (Exponentiation by Squaring - Recursive and Iterative)
4.  **Nth Fibonacci Number**
    *   Naive recursive (exponential complexity)
    *   Recursive with Memoization (Dynamic Programming)
    *   Iterative (Optimal space and time complexity)

## Building the Project

This project uses CMake for building.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/math_problems_project.git
    cd math_problems_project
    ```
    *(Note: Replace `your-username/math_problems_project.git` with the actual repository URL if hosted)*

2.  **Create a build directory:**
    ```bash
    mkdir build
    cd build
    ```

3.  **Configure CMake:**
    ```bash
    cmake ..
    ```
    *(If you have specific compilers or build types, you might use: `cmake -DCMAKE_BUILD_TYPE=Release ..`)*

4.  **Build the project:**
    ```bash
    cmake --build .
    ```

## Running Executables

After building, you'll find executables in the `build/bin` directory (or `build/Debug`, `build/Release` depending on your OS/IDE).

*   **Run the main demonstration:**
    ```bash
    ./bin/math_problems_demo
    ```

*   **Run unit tests:**
    ```bash
    ./bin/math_problems_tests
    ```

*   **Run performance benchmarks:**
    ```bash
    ./bin/math_problems_benchmark
    ```

## Documentation

*   **`docs/algorithm_explanations.md`**: Dive deep into the logic behind each algorithm, including step-by-step breakdowns and ASCII diagrams.
*   **`docs/interview_guide.md`**: Find valuable interview tips, common pitfalls, edge cases, and variations for each problem.

This project is intended to be a robust learning and preparation tool. Good luck with your interviews!

---