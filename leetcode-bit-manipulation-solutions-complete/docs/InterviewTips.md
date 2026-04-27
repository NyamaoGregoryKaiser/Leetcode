```markdown
# Bit Manipulation Interview Tips and Variations

Bit manipulation questions are common in technical interviews, especially for roles involving low-level programming, embedded systems, or performance-critical applications. They test your understanding of number representation, bitwise operators, and problem-solving creativity.

## How to Approach Bit Manipulation Problems

1.  **Understand the Problem Clearly:**
    *   What are the input constraints (e.g., 32-bit integer, unsigned, positive/negative)?
    *   What is the desired output?
    *   Are there any time/space complexity constraints (e.g., O(1) space, linear time)?
    *   Clarify if the problem expects signed or unsigned 32-bit integers, particularly in JavaScript where numbers are floats but bitwise ops use 32-bit signed int rules.

2.  **Think in Binary:**
    *   The most crucial step is to visualize numbers in their binary form. Write them down!
    *   Work through small examples manually, showing how bits change with each operation. This helps identify patterns.
    *   Example: If the problem is about even/odd, think `...0` vs `...1`. If it's about powers of two, think `100...0`.

3.  **Recall Bitwise Operator Properties:**
    *   **AND (`&`)**: Masking (isolating specific bits), checking if a bit is set, clearing bits. `X & (1 << k)` checks if k-th bit is set. `X & 0` clears all. `X & (~(1 << k))` clears k-th bit.
    *   **OR (`|`)**: Setting bits. `X | (1 << k)` sets k-th bit. `X | (~0)` sets all.
    *   **XOR (`^`)**: Toggling bits, finding differences, swapping numbers without temp. `X ^ (1 << k)` toggles k-th bit. `X ^ X = 0`. `X ^ 0 = X`.
    *   **NOT (`~`)**: Inverting bits. Be careful with signed interpretation in JS.
    *   **Shifts (`<<`, `>>`, `>>>`)**: Multiplying/dividing by powers of 2, moving bits. Remember `>>>` for unsigned right shift in JS.

4.  **Identify Common Bit Patterns and Tricks:**
    *   **Check if `k`-th bit is set:** `(num >> k) & 1`
    *   **Set `k`-th bit:** `num | (1 << k)`
    *   **Clear `k`-th bit:** `num & (~(1 << k))`
    *   **Toggle `k`-th bit:** `num ^ (1 << k)`
    *   **Check if `n` is a power of 2:** `n > 0 && (n & (n - 1)) === 0`
    *   **Clear LSB (Brian Kernighan's):** `n & (n - 1)`
    *   **Isolate LSB:** `n & (-n)` or `n & (~n + 1)` (due to two's complement, `-n` is `~n + 1`)
    *   **Get all bits up to LSB:** `n ^ (n & (n-1))` (this gets the LSB, if it was `X & (-X)` it would return that LSB as a power of 2) or `(n & (~n + 1))`

5.  **Start with a Naive Approach (if bitwise doesn't click immediately):**
    *   For example, counting set bits can be done by iterating 32 times, checking `n % 2` and `n /= 2`. This often leads to the bitwise equivalent (`n & 1`, `n >>>= 1`).
    *   For `isPowerOfTwo`, repeated division is a good starting point.
    *   This shows your thought process and provides a baseline to optimize from.

6.  **Consider Edge Cases and Constraints:**
    *   `0`, `1`, `-1` (if applicable).
    *   `MAX_INT`, `MIN_INT` (or their 32-bit equivalents for JS bitwise ops).
    *   Empty arrays (if applicable).
    *   What happens if the result exceeds 32 bits? (JS will truncate and potentially change sign). Use `>>> 0` for final unsigned results.
    *   Refer to `docs/EdgeCasesGotchas.md` for common pitfalls.

7.  **Practice, Practice, Practice:**
    *   Bit manipulation is a pattern-based skill. The more problems you solve, the more intuitive it becomes.
    *   Try problems from different categories (counting bits, setting/clearing bits, XOR tricks, masks for subsets, etc.).

## Interview Tips

*   **Verbalize Your Thought Process:** Explain *why* you're choosing a particular operator or trick. Connect it back to binary representations.
*   **Draw Diagrams:** Use binary representations, shifting, and masking in your scratchpad or on the whiteboard. This helps you and the interviewer follow your logic.
*   **Test with Examples:** Before writing code, trace your proposed solution with a few simple examples (e.g., 0, 1, a small positive, a small negative if allowed).
*   **Discuss Time/Space Complexity:** Bit manipulation solutions are often O(1) space and O(number of bits) or O(1) time. Be ready to justify this.
*   **Mention Alternatives:** Even if you use the optimal bitwise solution, briefly mention other approaches (e.g., hash map for single number, iteration for set bits) and explain why the bitwise one is better given constraints.
*   **Ask Clarifying Questions:** "Should I handle negative numbers?", "Is it a 32-bit or 64-bit integer?", "Are inputs guaranteed to be within a certain range?"

## Common Bit Manipulation Variations and Related Problems

Beyond the problems in this project, here are other common types of bit manipulation questions:

1.  **Hamming Distance:** Number of positions at which corresponding bits are different between two integers. (Solved with `XOR` then `popcount`).
2.  **Missing Number:** Given an array containing `n` distinct numbers taken from `0, 1, ..., n`, find the one that is missing. (Also solvable with `XOR` property).
3.  **Two Single Numbers:** Given an array where all elements appear twice except for two elements which appear once, find the two single numbers. (Extension of Single Number, uses `XOR` and isolating the rightmost differing bit).
4.  **Bitwise AND of Numbers Range:** Calculate the bitwise AND of all numbers in a range `[m, n]`. (Observation that bits only remain 1 if all numbers in range have that bit as 1; involves finding common prefix).
5.  **Number of 1 Bits between two numbers (Hamming Distance):** XOR the two numbers and then count set bits.
6.  **Checking if a number is even/odd:** `(num & 1) === 0` for even, `(num & 1) === 1` for odd.
7.  **Swapping two numbers without a temporary variable:** `a = a ^ b; b = a ^ b; a = a ^ b;`
8.  **Gray Code:** Generating sequences where successive elements differ by only one bit.
9.  **Counting bits flipped to convert A to B:** Same as Hamming Distance.
10. **Finding the unique number in an array where all others appear K times:** Requires a bit more advanced bit manipulation, usually involving counting bits at each position modulo K.

By internalizing the fundamentals and practicing these types of problems, you'll be well-prepared for bit manipulation questions in any coding interview.
```