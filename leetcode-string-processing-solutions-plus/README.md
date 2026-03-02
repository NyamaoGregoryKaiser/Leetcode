```markdown
# String Manipulation Coding Interview Project

This project provides a comprehensive set of resources for mastering String Manipulation problems frequently encountered in coding interviews. It includes multiple problems with optimal and alternative solutions, extensive test cases, performance benchmarking, and detailed documentation.

## Project Structure

```
string-manipulation-project/
├── pom.xml
├── README.md
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── stringmanipulation/
│   │                   ├── problems/
│   │                   │   ├── AnagramChecker.java
│   │                   │   ├── LongestPalindromicSubstring.java
│   │                   │   └── ValidParentheses.java
│   │                   └── utils/
│   │                       └── PerformanceProfiler.java
│   └── test/
│       └── java/
│           └── com/
│           └── example/
│               └── stringmanipulation/
│                   ├── problems/
│                   │   ├── AnagramCheckerTest.java
│                   │   ├── LongestPalindromicSubstringTest.java
│                   │   └── ValidParenthesesTest.java
│                   └── utils/
│                       └── PerformanceProfilerTest.java
└── docs/
    ├── AlgorithmExplanations.md
    ├── InterviewTips.md
    └── VisualDiagrams.txt
```

## How to Use This Project

1.  **Clone or create the project structure.**
2.  **Navigate to the project root:** `cd string-manipulation-project`
3.  **Build the project (using Maven):** `mvn clean install`
    *   This compiles the code and downloads necessary dependencies.
4.  **Run tests:** `mvn test`
    *   This executes all JUnit tests, verifying the correctness of the implementations.
5.  **Explore the code:**
    *   `src/main/java/`: Contains the main algorithm implementations.
    *   `src/test/java/`: Contains extensive test cases for each problem.
    *   `docs/`: Provides detailed explanations, visual aids, and interview preparation tips.
6.  **Run performance benchmarks:**
    *   The `PerformanceProfilerTest.java` file demonstrates how to use the `PerformanceProfiler` utility. You can uncomment or add specific calls to profile different algorithms and observe their real-world performance.

---

## Problems Covered

Here's a summary of the string manipulation problems included, along with their different approaches and complexities.

### 1. Anagram Checker

**Problem Description:**
Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once. Assume the strings contain only lowercase English letters.

**Approaches:**

*   **`isAnagramSorting(String s, String t)`**:
    *   **Logic:** Convert both strings to character arrays, sort them, and then compare the sorted arrays. If they are identical, the strings are anagrams.
    *   **Time Complexity:** O(N log N) due to sorting, where N is the length of the string.
    *   **Space Complexity:** O(N) or O(log N) depending on the sorting algorithm implementation (for character array conversion and sort stack space).
*   **`isAnagramFrequencyArray(String s, String t)`**:
    *   **Logic:** Use an integer array of size 26 (for 'a' through 'z') to store character frequencies. Iterate through the first string, incrementing counts for each character. Then, iterate through the second string, decrementing counts. If any count goes below zero, or if the final array contains non-zero counts, they are not anagrams.
    *   **Time Complexity:** O(N) where N is the total length of both strings, as we iterate through each string once.
    *   **Space Complexity:** O(1) because the size of the frequency array (26) is constant, regardless of input string length. This is highly memory-efficient for ASCII character sets.
*   **`isAnagramHashMap(String s, String t)`**:
    *   **Logic:** Similar to the frequency array, but uses a `HashMap<Character, Integer>`. This is more general for larger character sets (e.g., Unicode) but can be less efficient for small, fixed character sets.
    *   **Time Complexity:** O(N) (average case for HashMap operations).
    *   **Space Complexity:** O(K) where K is the number of unique characters in the strings (worst case O(N) if all characters are unique).

### 2. Longest Palindromic Substring

**Problem Description:**
Given a string `s`, return the longest palindromic substring in `s`. A palindromic substring is a contiguous sequence of characters within a string that reads the same forwards and backwards.

**Approaches:**

*   **`bruteForce(String s)`**:
    *   **Logic:** Generate all possible substrings of `s` and for each substring, check if it's a palindrome. Keep track of the longest one found.
    *   **Time Complexity:** O(N^3). There are O(N^2) substrings, and checking each substring for palindrome property takes O(N) time.
    *   **Space Complexity:** O(1) (excluding space for storing the result string).
*   **`expandAroundCenter(String s)` (Optimal)**:
    *   **Logic:** A palindrome is symmetric around its center. The center can be a single character (for odd-length palindromes like "aba") or two characters (for even-length palindromes like "abba"). Iterate through each character (and between each pair of characters) as a potential center, and expand outwards to find the longest palindrome centered at that point.
    *   **Time Complexity:** O(N^2). There are 2N-1 possible centers, and for each center, expanding outwards can take up to O(N) time.
    *   **Space Complexity:** O(1).
*   **`dynamicProgramming(String s)`**:
    *   **Logic:** Use a 2D boolean array `dp[i][j]` where `dp[i][j]` is `true` if the substring `s[i...j]` is a palindrome, and `false` otherwise.
        *   Base cases: `dp[i][i]` is `true` (single characters are palindromes). `dp[i][i+1]` is `true` if `s[i] == s[i+1]`.
        *   Recurrence: `dp[i][j] = (s[i] == s[j]) && dp[i+1][j-1]`.
    *   **Time Complexity:** O(N^2) as we fill an N x N DP table.
    *   **Space Complexity:** O(N^2) for the DP table.

### 3. Valid Parentheses

**Problem Description:**
Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

**Approach:**

*   **`isValid(String s)` (Optimal)**:
    *   **Logic:** Use a `Stack`. Iterate through the string character by character.
        *   If an opening bracket ('(', '{', '[') is encountered, push it onto the stack.
        *   If a closing bracket (')', '}', ']') is encountered:
            *   If the stack is empty, it's an invalid sequence (closing bracket without an opening one).
            *   Pop the top element from the stack and check if it's the corresponding opening bracket. If not, it's an invalid sequence (mismatched brackets).
    *   After iterating through the entire string, if the stack is empty, the string is valid. Otherwise, it's invalid (unclosed opening brackets).
    *   **Time Complexity:** O(N) as we iterate through the string once, and stack operations take O(1) time.
    *   **Space Complexity:** O(N) in the worst case (e.g., "((((((("), where N is the length of the string, as the stack can store all opening brackets.

---

## Documentation

*   **`docs/AlgorithmExplanations.md`**: Provides detailed explanations for the logic behind the optimal solutions, including step-by-step reasoning and trade-offs.
*   **`docs/VisualDiagrams.txt`**: Contains ASCII art diagrams to help visualize certain algorithms (e.g., expanding around center for palindromes, stack operations for parentheses).
*   **`docs/InterviewTips.md`**: Offers general advice for string manipulation problems, specific tips for each problem type, and common variations to prepare for.

---

## Performance Benchmarking

The `com.example.stringmanipulation.utils.PerformanceProfiler` class allows for measuring the execution time of different algorithm implementations. This is useful for:
*   Comparing the real-world performance of O(N log N) vs O(N^2) vs O(N) solutions.
*   Understanding the impact of constant factors on execution time.
*   Identifying bottlenecks.

Example usage is provided in `src/test/java/com/example/stringmanipulation/utils/PerformanceProfilerTest.java`.

```java
// Example from PerformanceProfilerTest.java
// ...
ProfilerResult result = PerformanceProfiler.profileMethod(
    () -> AnagramChecker.isAnagramFrequencyArray(longString1, longString2),
    "isAnagramFrequencyArray", 1000 // Run 1000 times
);
System.out.println(result);
// ...
```

This project aims to be a valuable resource for anyone preparing for coding interviews, particularly focusing on the often tricky domain of string manipulation. Good luck!
```