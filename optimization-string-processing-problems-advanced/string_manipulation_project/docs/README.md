# String Manipulation Coding Interview Project

This project is designed to be a comprehensive resource for preparing for string manipulation coding interview questions. It includes a variety of problems, multiple solution approaches (optimal, brute-force, further optimized), extensive test cases, performance benchmarks, and detailed documentation.

## Project Structure

*   `main_algorithms/`: Contains the core implementations of various string manipulation algorithms.
    *   `string_problems.py`: Optimal solutions commonly expected in interviews.
    *   `optimized_solutions.py`: More advanced or alternative optimal solutions (e.g., Manacher's for LPS).
    *   `brute_force_solutions.py`: Less efficient, straightforward implementations for illustrating performance gains.
*   `tests/`: Unit tests for verifying the correctness and performance of the algorithms.
    *   `test_string_problems.py`: Comprehensive test cases for each problem.
    *   `test_performance.py`: Compares the execution time of different solutions.
*   `utils/`: Helper utilities, mainly for generating diverse test data.
    *   `helpers.py`: Functions to create random strings, parentheses, etc.
*   `benchmarks/`: Script to run and analyze performance benchmarks.
*   `docs/`: Project documentation.
    *   `README.md` (this file): Project overview and problem statements.
    *   `algorithms_explanation.md`: Detailed explanations of each algorithm, including logic, diagrams, and variations.
    *   `interview_prep.md`: General interview tips, common pitfalls, and strategies for string problems.
*   `requirements.txt`: Python dependencies.

## Problems Covered

Here are the string manipulation problems addressed in this project, presented as they might appear in an interview.

### Problem 1: Longest Palindromic Substring

**Description:**
Given a string `s`, return the longest palindromic substring in `s`. If there are multiple palindromes of the same maximum length, any one of them is acceptable.

A substring is a contiguous non-empty sequence of characters within a string.
A palindrome is a string that reads the same forwards and backwards.

**Examples:**
1.  **Input:** `s = "babad"`
    **Output:** `"bab"` (or `"aba"`)
2.  **Input:** `s = "cbbd"`
    **Output:** `"bb"`
3.  **Input:** `s = "a"`
    **Output:** `"a"`
4.  **Input:** `s = "ac"`
    **Output:** `"a"`

**Constraints:**
*   `1 <= s.length <= 1000`
*   `s` consists of only digits and English letters.

**Approaches Implemented:**
*   **Brute Force:** Check every possible substring for palindrome property.
*   **Dynamic Programming:** Build a DP table `dp[i][j]` indicating if `s[i...j]` is a palindrome.
*   **Expand Around Center:** Iterate through each character (and between characters) as a potential center of a palindrome and expand outwards. This is often the most intuitive optimal solution for interviews.
*   **Manacher's Algorithm:** A highly optimized linear-time algorithm for finding the longest palindromic substring.

### Problem 2: Valid Parentheses

**Description:**
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

**Examples:**
1.  **Input:** `s = "()"`
    **Output:** `true`
2.  **Input:** `s = "()[]{}"`
    **Output:** `true`
3.  **Input:** `s = "(]"`
    **Output:** `false`
4.  **Input:** `s = "([)]"`
    **Output:** `false`
5.  **Input:** `s = "{[]}"`
    **Output:** `true`

**Constraints:**
*   `1 <= s.length <= 10^4`
*   `s` consists of parentheses only `'()[]{}'`.

**Approach Implemented:**
*   **Stack-based Approach:** Use a stack to keep track of open brackets.

### Problem 3: Group Anagrams

**Description:**
Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Examples:**
1.  **Input:** `strs = ["eat","tea","tan","ate","nat","bat"]`
    **Output:** `[["bat"],["nat","tan"],["ate","eat","tea"]]`
2.  **Input:** `strs = [""]`
    **Output:** `[[""]]`
3.  **Input:** `strs = ["a"]`
    **Output:** `[["a"]]`

**Constraints:**
*   `1 <= strs.length <= 10^4`
*   `0 <= strs[i].length <= 100`
*   `strs[i]` consists of lowercase English letters.

**Approaches Implemented:**
*   **Brute Force:** Compare each string with every other string to check if they are anagrams.
*   **Hashing with Sorted String:** Sort each string to create a canonical key for anagrams.
*   **Hashing with Character Count Tuple:** Use a tuple of character counts (e.g., `(0, 1, 0, ...)` for 'b') as a key.

### Problem 4: String to Integer (atoi)

**Description:**
Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer (similar to C/C++'s `atoi` function).

The algorithm for `myAtoi(string s)` is as follows:
1.  **Read and ignore leading whitespace:** Skip any leading whitespace (' ').
2.  **Check for sign:** Check if the next character is `'-'` or `'+'`. If present, it indicates the sign of the integer. Assume positive if no sign is found.
3.  **Read digits:** Read the next characters until a non-digit character or the end of the input is reached. These digits form the integer.
4.  **Convert to integer:** Convert these digits into an integer. If no digits were read, the integer is 0.
5.  **Apply sign:** Apply the sign found in step 2.
6.  **Handle overflow:** If the integer is out of the 32-bit signed integer range `[-2^31, 2^31 - 1]`, then clamp the integer to stay within the range. Specifically, integers less than `-2^31` should be clamped to `-2^31`, and integers greater than `2^31 - 1` should be clamped to `2^31 - 1`.
7.  **Return the integer:** Return the final integer.

**Note:** Only the space character `' '` is considered a whitespace character. Do not consider any other characters as whitespace.

**Examples:**
1.  **Input:** `s = "42"`
    **Output:** `42`
2.  **Input:** `s = "   -42"`
    **Output:** `-42`
    **Explanation:** The first non-whitespace character is '-', which is the sign. Then, "42" is read and converted to 42. Combining with the sign, the final result is -42.
3.  **Input:** `s = "4193 with words"`
    **Output:** `4193`
    **Explanation:** The digits "4193" are read until a non-digit character ' ' is encountered.
4.  **Input:** `s = "words and 987"`
    **Output:** `0`
    **Explanation:** The first non-whitespace character is 'w', which is not a digit or a sign. Therefore, no valid conversion could be performed.
5.  **Input:** `s = "-91283472332"`
    **Output:** `-2147483648`
    **Explanation:** The number "-91283472332" is out of the range of a 32-bit signed integer. The closest smaller integer is -2^31, which is -2147483648.

**Constraints:**
*   `0 <= s.length <= 200`
*   `s` consists of English letters (lower-case and upper-case), digits (`0-9`), `'+'`, `'-'`, and `' '`.

**Approach Implemented:**
*   **State Machine / Careful Parsing:** Implement a step-by-step parsing logic handling all edge cases and constraints.

## Setup and Running

### Prerequisites
*   Python 3.6+

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/string_manipulation_project.git
    cd string_manipulation_project
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Running Tests
To run all unit tests and verify the correctness of the implementations:
```bash
python -m unittest discover tests
```

### Running Benchmarks
To execute the performance benchmarks comparing different algorithms:
```bash
python benchmarks/benchmark_runner.py
```
This script will print execution times for various algorithms and input sizes.

## Documentation
Refer to the `docs/` directory for detailed explanations:
*   `algorithms_explanation.md`: In-depth dive into the logic, time/space complexity, and diagrams for each solution.
*   `interview_prep.md`: Practical advice for approaching string problems in interviews.

---