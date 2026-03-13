# Binary Search Interview Project

This repository serves as a comprehensive resource for mastering Binary Search, a fundamental algorithm often encountered in coding interviews. It provides a structured approach to learning, practicing, and understanding various Binary Search problem patterns.

## Project Structure

- `src/main/java/com/example/binarysearch/`: Contains the core Java implementations of various Binary Search problems.
- `test/java/com/example/binarysearch/`: Houses JUnit 5 test cases for all implemented problems, ensuring correctness and covering edge cases.
- `docs/`: A dedicated directory for in-depth documentation, including problem descriptions, algorithm explanations, and interview tips.
- `benchmarks/`: Contains JMH (Java Microbenchmark Harness) code to evaluate and compare the performance of different approaches.

## Implemented Problems

1.  **Standard Binary Search:** Find the index of a target element in a sorted array.
2.  **Find First/Last Occurrence:** Locate the first or last index of a target element in a sorted array that may contain duplicates.
3.  **Search in Rotated Sorted Array:** Find a target element in a sorted array that has been rotated at an unknown pivot.
4.  **Find Peak Element:** Find an element that is greater than its neighbors in an array.
5.  **Integer Square Root (mySqrt):** Compute the integer square root of a non-negative integer using Binary Search.

## Getting Started

### Prerequisites

- Java Development Kit (JDK) 8 or higher
- Apache Maven (for building and running)

### Building the Project

Navigate to the project root directory and run:

```bash
mvn clean install
```

This command compiles the source code, runs the tests, and packages the project.

### Running Tests

To execute all unit tests, use:

```bash
mvn test
```

### Running Benchmarks

To run the JMH performance benchmarks, use the following command from the project root:

```bash
java -jar benchmarks/target/benchmarks.jar
```
*Note: You might need to build the `benchmarks` module separately if it's not included in the main `install` phase or if you modified it.*
First, navigate to `benchmarks` directory and run `mvn clean install`. Then go back to root and run the command above.

## Documentation

Please refer to the `docs/` directory for detailed explanations:

- **`docs/README.md`**: Detailed descriptions of each problem, including examples and constraints.
- **`docs/ALGORITHM_EXPLANATION.md`**: A deep dive into the Binary Search algorithm, its principles, variations, and visual aids.
- **`docs/INTERVIEW_TIPS.md`**: Practical advice for tackling Binary Search problems in interviews, common pitfalls, and effective communication strategies.

---