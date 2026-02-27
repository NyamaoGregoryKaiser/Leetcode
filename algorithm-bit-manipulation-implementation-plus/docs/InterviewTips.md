```markdown
# Bit Manipulation: Interview Tips and Variations

Bit manipulation questions often appear in interviews to test a candidate's understanding of low-level operations, problem-solving skills, and ability to optimize for time and space complexity. Here are some tips and common variations.

## General Interview Tips for Bit Manipulation

1.  **Understand the Problem:**
    *   Clarify if numbers are signed or unsigned. Java `int` and `long` are signed. If the problem implies unsigned arithmetic, be prepared to use `>>>` (unsigned right shift) and `Long.toUnsignedString()` or `Integer.toUnsignedString()` for debugging if needed.
    *   What are the constraints? Max/Min values? Length of arrays? These inform complexity requirements.

2.  **Start with a Brute Force (if applicable):**
    *   Sometimes, converting to binary string, iterating, or using a HashMap is a valid initial approach. This shows you can solve the problem, even if not optimally.
    *   Use this as a stepping stone to discuss more efficient bitwise solutions.

3.  **Think Bit by Bit:**
    *   Break down the problem into individual bit operations. Can you solve it for a single bit?
    *   Consider the Least Significant Bit (LSB) and Most Significant Bit (MSB).
    *   How do operations like `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>` affect individual bits?

4.  **Know the Common Patterns (see `AlgorithmExplanation.md`):**
    *   Checking if a bit is set (`n & (1 << k)`).
    *   Setting/Clearing/Toggling a bit.
    *   Brian Kernighan's Algorithm (`n & (n-1)`).
    *   Power of two check (`n > 0 && (n & (n-1)) == 0`).
    *   XOR properties (`A^A=0`, `A^0=A`).

5.  **Use Examples and Trace:**
    *   Pick small, simple examples (e.g., 0, 1, 2, 3, 5, 8, -1).
    *   Trace the binary representation bit by bit. ASCII art diagrams can be very helpful here (you can draw on a whiteboard or mentally visualize).

6.  **Edge Cases:**
    *   `0`: Often behaves uniquely with bitwise operations.
    *   `1`: The smallest positive number.
    *   `Integer.MAX_VALUE`, `Integer.MIN_VALUE`: Check limits.
    *   Negative numbers: Remember two's complement and how `>>` vs `>>>` behaves.
    *   All bits set (`-1`): Can be a useful test.

7.  **Discuss Time and Space Complexity:**
    *   Bitwise solutions are almost always O(1) space.
    *   Time complexity is often O(1) (fixed number of operations) or O(k) where `k` is the number of bits (e.g., 32 for `int`), or O(s) where `s` is the number of set bits.

8.  **Communicate Your Thought Process:**
    *   Explain *why* you're choosing a particular bitwise trick. Don't just pull it out of a hat.
    *   "I'm using `n & (n-1)` here because I know it clears the LSB, which simplifies counting set bits/checking for powers of two."

## Common Problem Variations

Here are some variations of the problems covered and other common bit manipulation questions:

### Count Set Bits (Hamming Weight) Variations:
*   **Hamming Distance:** Given two integers, find the number of positions at which their corresponding bits are different. (Hint: `A ^ B` gives a number where set bits are differences, then count set bits).
*   **Total Hamming Distance:** Given an array of integers, calculate the sum of Hamming distances between all pairs of numbers. (Hint: For each bit position, count zeros and ones. If there are `c0` zeros and `c1` ones, that bit position contributes `c0 * c1` to the total Hamming distance).

### Single Number Variations:
*   **Single Number II:** Every element appears thrice except for one, which appears once. Find that single one. (Hint: Instead of XORing, count bits at each position modulo 3).
*   **Single Number III:** Every element appears twice except for two elements, which appear once. Find the two single numbers. (Hint: XOR all numbers to get `XOR_sum = A ^ B`. Find the rightmost set bit in `XOR_sum`. This bit must be different for `A` and `B`. Partition the original array into two groups based on this bit, then XOR within each group).

### Power of Two Variations:
*   **Power of Three / Power of Four:** How would you check for powers of other bases? (Often involves log or repeated division, bit manipulation tricks are specific to powers of two). For power of three, `n > 0 && 1162261467 % n == 0` if 1162261467 is `3^19`, the largest power of 3 that fits in `int`.
*   **Closest Power of Two:** Given an integer, find the nearest power of two.

### Reverse Bits Variations:
*   **Reverse Integer:** Reverses the digits of a decimal integer. (Not bit manipulation, but often paired with it).
*   **Reverse Bytes:** Given a 32-bit integer, reverse the order of its bytes. (e.g., AABBCCDD -> DDCCBBAA). (Hint: Use masks and shifts for each byte).

### Update Bits (Insert M into N) Variations:
*   **Bitwise AND of Numbers Range:** Given a range `[m, n]` where `0 <= m <= n <= 2147483647`, return the bitwise AND of all numbers in this range, inclusive. (Hint: Find the common prefix of `m` and `n` in binary. All bits after the common prefix will eventually become 0 due to numbers changing within the range).
*   **Maximum Product of Word Lengths:** Given a string array `words`, return the maximum value of `length(word[i]) * length(word[j])` where the two words do not share common letters. (Hint: Represent each word as a bitmask where each bit corresponds to a letter 'a'-'z'. Then `(mask_i & mask_j) == 0` checks for common letters).

### Other Common Bit Manipulation Problems:
*   **Number of 1 Bits (Same as Count Set Bits):** Standard problem.
*   **Missing Number:** Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array. (Hint: Use XOR properties like `Single Number` problem, XOR all numbers from `0` to `n` with all numbers in `nums`).
*   **Add Two Numbers Without Plus Sign:** Implement addition without using `+` or `-` operators. (Hint: Use XOR for sum without carry, AND and left shift for carry).
*   **Convert a Number to Hexadecimal / Binary:** Implementing base conversions.
*   **Gray Code:** Generate a Gray code sequence.

By practicing these variations and understanding the underlying bitwise principles, you'll be well-prepared to tackle any bit manipulation question in an interview. Good luck!
```