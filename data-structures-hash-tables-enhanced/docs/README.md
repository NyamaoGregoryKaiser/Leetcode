```markdown
# Hash Table Interview Project

This project provides a comprehensive resource for mastering Hash Tables, a fundamental data structure for coding interviews. It includes implementations of classic problems, a custom hash table from scratch, extensive tests, and performance benchmarks.

## Project Structure

```
hash-table-interview-project/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── hashtableproject/
│   │               ├── problems/
│   │               │   └── HashTableProblems.java      # Main algorithm implementations
│   │               └── utils/
│   │                   └── CustomHashTable.java        # Custom hash table implementation
│   └── test/
│       └── java/
│           └── com/
│               └── hashtableproject/
│                   └── tests/
│                       └── HashTableProblemsTest.java  # Unit tests for problems and CustomHashTable
├── benchmark/
│   └── java/
│       └── com/
│           └── hashtableproject/
│               └── benchmark/
│                   └── PerformanceBenchmark.java       # Performance benchmarking code (JMH)
├── docs/
│   ├── README.md                                     # Project overview and problem descriptions (this file)
│   ├── AlgorithmExplanation.md                       # Detailed algorithm explanations, diagrams, tips
│   └── PerformanceBenchmarking.md                    # Benchmarking results and analysis
├── .gitignore
└── pom.xml                                           # Maven build file
```

## Problems Implemented

The `HashTableProblems.java` file contains solutions for the following problems:

### 1. Two Sum
*   **Description**: Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.
*   **Approaches**:
    *   `twoSum_Optimal`: Uses a `HashMap` for O(N) time complexity.
    *   `twoSum_BruteForce`: Uses nested loops for O(N^2) time complexity.

### 2. Longest Consecutive Sequence
*   **Description**: Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. The algorithm must run in O(N) time.
*   **Approaches**:
    *   `longestConsecutive_Optimal`: Uses a `HashSet` to achieve O(N) average time complexity.
    *   `longestConsecutive_Sorting`: Sorts the array first, leading to O(N log N) time complexity.

### 3. Group Anagrams
*   **Description**: Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
*   **Approaches**:
    *   `groupAnagrams_SortedStringKey`: Uses a `HashMap` where the key is the sorted version of the string. Time complexity O(N * K log K), where K is max string length.
    *   `groupAnagrams_CharCountKey`: Uses a `HashMap` where the key is a string representation of character counts. Time complexity O(N * K), generally faster for larger K.

### 4. Subarray Sum Equals K
*   **Description**: Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals to `k`.
*   **Approaches**:
    *   `subarraySum_Optimal`: Uses a `HashMap` to store prefix sums and their frequencies. Achieves O(N) time complexity.
    *   `subarraySum_BruteForce`: Uses nested loops to check all possible subarrays, resulting in O(N^2) time complexity.

## Custom Hash Table Implementation (`CustomHashTable.java`)

This file provides a basic, from-scratch implementation of a hash table using separate chaining. It demonstrates:
*   The `Entry` class for key-value pairs.
*   An `ArrayList` of `LinkedLists` for buckets (separate chaining).
*   A simple `getBucketIndex` hash function.
*   `put`, `get`, `remove`, `containsKey`, `size`, `isEmpty`, `clear` methods.
*   Dynamic resizing (rehashing) when a configurable `loadFactor` is exceeded.

This implementation helps understand the internal mechanics of how `java.util.HashMap` works.

## How to Build and Run

This project uses Maven.

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd hash-table-interview-project
    ```

2.  **Build the project:**
    ```bash
    mvn clean install
    ```
    This command will compile the code, run unit tests, and package the project.

3.  **Run Unit Tests:**
    ```bash
    mvn test
    ```
    This will execute `HashTableProblemsTest.java` and verify the correctness of all problem solutions and the `CustomHashTable` implementation.

4.  **Run Performance Benchmarks:**
    ```bash
    # Option 1: Using exec-maven-plugin (configured in pom.xml)
    mvn verify # 'verify' phase runs integration-tests, which triggers the exec-maven-plugin for benchmarks

    # Option 2: Directly running the JMH generated JAR
    # This might require finding the exact JAR name in target/
    java -jar target/benchmarks.jar
    # Or specifying the benchmark class directly (if benchmarks.jar is not created, e.g. for simple classes)
    java -jar target/hash-table-interview-project-1.0-SNAPSHOT.jar com.hashtableproject.benchmark.PerformanceBenchmark
    ```
    The benchmarking results will be printed to the console and also saved to `jmh-result.txt` and `jmh-result.json` in the project root. Refer to `docs/PerformanceBenchmarking.md` for analysis.

## Documentation

*   **`docs/README.md`**: (This file) Project overview, problem descriptions, and setup instructions.
*   **`docs/AlgorithmExplanation.md`**: Detailed explanations for each problem's optimal solution, including conceptual breakdown, ASCII diagrams, edge cases, and interview tips.
*   **`docs/PerformanceBenchmarking.md`**: Analysis and interpretation of the JMH benchmark results, showcasing the performance differences between various approaches.

---
```