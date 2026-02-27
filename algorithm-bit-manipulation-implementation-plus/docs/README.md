```markdown
# Bit Manipulation Interview Project

This project serves as a comprehensive resource for mastering bit manipulation techniques, crucial for coding interviews, especially at companies like Bit which value low-level optimization and efficient algorithms.

It includes:
- Multiple bit manipulation problems with optimal solutions.
- Detailed explanations, time/space complexity analysis.
- Extensive unit tests for correctness.
- Performance benchmarking for solution comparison.
- In-depth documentation covering concepts, visual aids, and interview strategies.

## Project Structure

```
bit-manipulation-interview-project/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── bitmanipulation/
│   │               └── BitManipulationProblems.java    // Main algorithms implementation
│   ├── test/
│   │   └── java/
│   │       └── com/
│   │           └── bitmanipulation/
│   │               └── BitManipulationProblemsTest.java // Unit tests for main algorithms
├── docs/
│   ├── README.md                                 // This file
│   ├── AlgorithmExplanation.md                   // Detailed explanation of bitwise operators and tricks
│   ├── VisualDiagrams.md                         // ASCII art diagrams for conceptual clarity
│   └── InterviewTips.md                          // Advice for bit manipulation interviews
├── benchmark/
│   └── PerformanceBenchmark.java                 // Performance comparison of solutions
└── solutions/
    └── java/
        └── com/
            └── bitmanipulation/
                ├── BruteForceSolutions.java      // Non-bit-manipulation approaches for comparison
                └── MemoryEfficientSolutions.java // Emphasizing memory optimization with bit ops
```

## Problems Implemented

### 1. Count Set Bits (Hamming Weight)
Counts the number of '1' bits in a 32-bit unsigned integer.
- **Approaches:**
    - Iteration and Check LSB
    - Brian Kernighan's Algorithm
    - Java Built-in `Integer.bitCount()`
- **Key Concepts:** `&`, `>>>`, `n & (n-1)`

### 2. Single Number
Finds the unique element in an array where all other elements appear twice.
- **Approach:** XOR Property
- **Key Concepts:** `^` properties (identity, inverse, commutative, associative)
- **Contrast:** Often solved with HashMaps, but XOR offers an O(1) space solution.

### 3. Power of Two
Determines if a given integer is a power of two.
- **Approaches:**
    - Bitwise AND Trick `n > 0 && (n & (n - 1)) == 0`
    - Loop and Divide
- **Key Concepts:** `&`, `n-1` behavior for powers of two

### 4. Reverse Bits
Reverses the bits of a 32-bit unsigned integer.
- **Approaches:**
    - Iteration, building the result bit by bit
    - Java Built-in `Integer.reverse()`
- **Key Concepts:** `<<`, `|`, `&`, `>>>`

### 5. Update Bits (Insert M into N)
Inserts a 32-bit number `M` into another 32-bit number `N` between bit positions `i` and `j`.
- **Approach:**
    - Create a mask to clear the target bits in `N`.
    - Shift `M` to align with the target positions.
    - OR the modified `N` with the shifted `M`.
- **Key Concepts:** `~`, `<<`, `|`, `&`

## How to Run

### Prerequisites
- Java Development Kit (JDK) 8 or higher
- Maven (for build automation and dependency management, specifically JUnit 5)

### Build and Run Tests
1. **Navigate to the project root:**
   ```bash
   cd bit-manipulation-interview-project
   ```
2. **Compile and run all tests using Maven:**
   ```bash
   mvn test
   ```
   This will execute `BitManipulationProblemsTest.java` and show the test results.

### Run Performance Benchmarks
The `PerformanceBenchmark.java` file is a standalone Java application.

1. **Compile from project root:**
   ```bash
   mvn compile
   ```
2. **Run the benchmark class:**
   ```bash
   mvn exec:java -Dexec.mainClass="benchmark.PerformanceBenchmark"
   ```
   *Note: If you encounter issues with `exec:java`, you might need to specify the full path to the class or create a separate Maven module for benchmarks.*
   Alternatively, you can compile and run directly if not using Maven for that specific file:
   ```bash
   javac -d target/classes benchmark/PerformanceBenchmark.java
   java -cp target/classes benchmark.PerformanceBenchmark
   ```

## Documentation

Explore the `docs/` directory for in-depth explanations:

- `AlgorithmExplanation.md`: Dive into the theory behind bitwise operators and common bit manipulation patterns.
- `VisualDiagrams.md`: Understand complex operations with ASCII art diagrams.
- `InterviewTips.md`: Get advice on how to approach bit manipulation questions in interviews, common pitfalls, and variations.

## Contributing

Feel free to fork this repository, add more problems, alternative solutions, or improve existing explanations/tests.
```