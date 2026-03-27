```markdown
# Bit Manipulation Interview Tips and Variations

Bit manipulation questions are common in coding interviews, especially at companies focusing on performance or low-level systems. They test your understanding of binary representations, logical thinking, and ability to optimize.

## General Interview Strategies

1.  **Clarify Constraints:** Always ask about the input type (signed/unsigned, 32-bit/64-bit), range, and any memory/time complexity requirements. Java's `int` is signed 32-bit, `long` is signed 64-bit. Python's integers handle arbitrary precision. This is crucial for choosing `>>` vs `>>>` or handling negative numbers.
2.  **Start with Brute Force:** If you don't immediately see a bit manipulation trick, describe a straightforward (even if less efficient) approach first. This shows you can solve the problem, then you can optimize.
3.  **Think Binary:** Convert small examples to binary. Write them down. Often, patterns emerge that suggest bitwise operations.
    *   e.g., `n` and `n-1` for powers of two.
    *   e.g., XORing for unique elements.
4.  **Know the Operators:** Be fluent with `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`. Understand their effects on individual bits.
5.  **Common Bit Manipulation Patterns:**
    *   **Check `i`-th bit:** `(num >> i) & 1`
    *   **Set `i`-th bit:** `num | (1 << i)`
    *   **Clear `i`-th bit:** `num & ~(1 << i)`
    *   **Toggle `i`-th bit:** `num ^ (1 << i)`
    *   **Clear bits from `i` to LSB:** `num & (~((1 << (i + 1)) - 1))` or `num & (-1 << (i + 1))`
    *   **Clear bits from `i` to MSB:** `num & ((1 << i) - 1)`
    *   **Isolate LSB:** `num & (-num)` or `num & (~num + 1)` (finds `1` at LSB and `0`s elsewhere). This is `1 << (index of LSB)`.
    *   **Remove LSB:** `num & (num - 1)` (Brian Kernighan's trick)
6.  **Edge Cases:**
    *   `0`: Often needs special handling.
    *   `1`: Base case for powers of two, etc.
    *   `-1` (all bits set in 2's complement).
    *   `Integer.MAX_VALUE`, `Integer.MIN_VALUE`.
    *   Arrays: empty, single element, all same, all different.
7.  **Visualize:** Use ASCII diagrams (like in `VisualDiagrams.txt`) or trace bits on paper for complex operations.
8.  **Practice:** Bit manipulation requires pattern recognition that comes with practice.

## Interview Questions & Variations (Beyond this Project)

Here are some common bit manipulation problems and variations you might encounter, often building upon the techniques demonstrated in this project:

### Based on Count Set Bits:

*   **Hamming Distance:** Given two integers, find the number of positions at which their corresponding bits are different. (Hint: `XOR` the numbers, then count set bits in the result).
*   **Counting Bits (LeetCode 338):** For any non-negative integer `num`, count the number of set bits in each integer from `0` to `num` and return them as an array. (Hint: Dynamic programming with bit manipulation. `dp[i] = dp[i / 2] + (i % 2)`)
*   **Number of 1 Bits (LeetCode 191):** The same as our "Count Set Bits".

### Based on Single Number:

*   **Single Number II (LeetCode 137):** Every element appears three times except for one, which appears once. Find that single one. (Hint: Count bits at each position modulo 3).
*   **Single Number III (LeetCode 260):** Every element appears twice except for two elements which appear once. Find the two single numbers. (Hint: XOR all numbers to get `XOR_sum = A ^ B`. Find a differentiating bit in `XOR_sum`. Partition the array based on that bit and XOR elements in each partition).
*   **Missing Number (LeetCode 268):** Given an array containing `n` distinct numbers taken from `0, 1, ..., n`, find the one that is missing. (Hint: XOR all numbers in the array with all numbers from `0` to `n`. The result is the missing number).

### Based on Power of Two:

*   **Power of Four / Power of Three:** Similar logic, but bit manipulation might be harder for non-2 bases. For power of four, check `n > 0`, `n & (n - 1) == 0`, and `(n & 0xAAAAAAAA) == 0` (or `n % 3 == 1` for `n` being a power of 4).
*   **Check if a number is a power of 2 without using `if/else` or loops.** (Answer: `(n > 0) && ((n & (n - 1)) == 0)`)

### Based on Reverse Bits:

*   **Reverse Integer (LeetCode 7):** Reverse digits of a decimal integer. (This is usually a math problem, not bit manipulation, but often confused).
*   **Swap Bits:** Swap `i`-th and `j`-th bits of an integer. (Hint: Extract bits, clear original positions, set new positions).
*   **Complement of Base 10 Integer (LeetCode 1009):** Given a base-10 integer N, return the complement of its binary representation as a base-10 integer. (Hint: Find the smallest power of 2 greater than N, then `XOR` with `(1 << k) - 1`).

### Other Bit Manipulation Problems:

*   **Counting Set Bits in a Range:** Count total set bits for all numbers from `1` to `N`. (Can be solved with a pattern or more complex DP/recursion).
*   **Add Two Numbers Without Plus Operator:** Sum two integers using only bitwise operators. (Hint: `sum = a ^ b`, `carry = (a & b) << 1`).
*   **Multiply Two Numbers Without Multiply Operator:** Use shifts and additions.
*   **Divide Two Integers:** Similar to multiplication, use shifts and subtractions.
*   **Check if a number is even/odd:** `(num & 1) == 0` for even, `(num & 1) == 1` for odd.
*   **Get the value of a specific bit:** `(num >> k) & 1`
*   **Swap two numbers without a temporary variable:** `a = a ^ b; b = a ^ b; a = a ^ b;`

## Debugging Bit Manipulation Code

*   **Print Binary:** Always print the binary representation of your numbers at each step. The `BitUtils.toBinaryString()` method in this project is invaluable for this.
*   **Step-by-Step Tracing:** Manually trace the bits for a small example.
*   **Use a Calculator:** A programmer's calculator (like the one in Windows or online tools) can convert between decimal, binary, and hex, and perform bitwise operations.

By understanding these core concepts and practicing with variations, you'll be well-prepared for bit manipulation questions in technical interviews.
```