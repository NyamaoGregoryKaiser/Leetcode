```markdown
# 📚 Algorithm Explanations for Bit Manipulation

This document provides detailed explanations of the bit manipulation problems, the underlying concepts, and the logic behind each implemented solution, along with their time and space complexity analyses.

## Core Bitwise Operations

Before diving into problems, let's review the fundamental bitwise operators:

*   **`&` (AND)**: Sets a bit to 1 if both corresponding bits are 1. Useful for checking if a bit is set, or for masking.
    *   `X & 0 = 0`
    *   `X & 1 = X`
*   **`|` (OR)**: Sets a bit to 1 if at least one of the corresponding bits is 1. Useful for setting a bit.
    *   `X | 0 = X`
    *   `X | 1 = 1`
*   **`^` (XOR)**: Sets a bit to 1 if the corresponding bits are different. Useful for toggling bits and finding unique elements.
    *   `X ^ 0 = X`
    *   `X ^ 1 = ~X` (toggles the bit)
    *   `X ^ X = 0`
*   **`~` (NOT)**: Inverts all bits (0 becomes 1, 1 becomes 0).
*   **`<<` (Left Shift)**: Shifts bits to the left, filling with zeros on the right. Equivalent to multiplying by powers of 2.
    *   `n << k` is `n * (2^k)`
*   **`>>` (Signed Right Shift)**: Shifts bits to the right, preserving the sign bit (fills with 0 for positive, 1 for negative). Equivalent to integer division by powers of 2.
*   **`>>>` (Unsigned Right Shift)**: Shifts bits to the right, filling with zeros on the left, regardless of sign. Essential for treating numbers as unsigned in JavaScript where numbers are typically signed 32-bit.

---

## 1. Count Set Bits (Hamming Weight)

**Problem:** Given an unsigned integer, count the number of '1' bits it has.

### Approach 1: Brute Force (Iterate and check LSB)

*   **Logic:**
    1.  Initialize a `count` to 0.
    2.  Loop while the number `n` is not 0.
    3.  In each iteration, check the Least Significant Bit (LSB) using `n & 1`. If it's 1, increment `count`.
    4.  Right-shift `n` by 1 (`n >>>= 1`) to move the next bit to the LSB position.
    5.  Repeat until `n` becomes 0.
*   **Time Complexity:** O(log N) or O(k), where k is the number of bits (e.g., 32 for a 32-bit integer). In the worst case, you iterate through all bits.
*   **Space Complexity:** O(1)

### Approach 2: Brian Kernighan's Algorithm (Optimal)

*   **Logic:** This algorithm is highly efficient because it runs only as many times as there are set bits.
    1.  Initialize a `count` to 0.
    2.  Loop while the number `n` is not 0.
    3.  In each iteration, increment `count`.
    4.  The magic step: `n = n & (n - 1)`. This operation clears the rightmost set bit in `n`.
        *   **How `n & (n - 1)` works:** If `n` has a 1 at position `k` (its LSB), then `n-1` will have a 0 at position `k` and all bits to its right will be 1s. Performing `AND` will clear the `k`-th bit and leave higher bits unchanged.
            *   Example: `n = 12` (binary `1100`)
            *   `n - 1 = 11` (binary `1011`)
            *   `n & (n - 1)` = `1100 & 1011` = `1000` (8) - The rightmost '1' is cleared.
*   **Time Complexity:** O(k), where k is the number of set bits in `N`. This is faster than O(log N) if N has few set bits. In the worst case (all bits set), it's still O(log N).
*   **Space Complexity:** O(1)

### Approach 3: Precomputed Lookup Table

*   **Logic:** For fixed-size integers (e.g., 32-bit), we can break the number into bytes (8-bit chunks). A lookup table stores the number of set bits for all possible 256 8-bit values. By summing the set bits of each byte, we quickly get the total.
    1.  Precompute a table mapping each 8-bit value (0-255) to its set bit count (e.g., using Brian Kernighan's method).
    2.  For a given 32-bit `n`, extract each of its four bytes using `& 0xFF` and `>>>` (unsigned right shift).
    3.  Sum the values from the lookup table for each extracted byte.
*   **Time Complexity:**
    *   Precomputation: O(2^B * B) where B is byte size (e.g., 256 * 8). This is done once.
    *   Query: O(NUM_BYTES), which is O(1) for fixed-size integers (e.g., 4 operations for 32-bit).
*   **Space Complexity:** O(2^B) for the lookup table (e.g., 256 integers).

---

## 2. Check if a Number is a Power of Two

**Problem:** Given an integer N, determine if it is a power of two.

### Approach 1: Brute Force (Loop and Divide)

*   **Logic:**
    1.  Handle edge cases: If `n <= 0`, it's not a power of two.
    2.  Repeatedly divide `n` by 2 as long as `n` is even (`n % 2 === 0`).
    3.  If `n` eventually becomes 1, then it was a power of two. Otherwise, it was not.
*   **Time Complexity:** O(log N)
*   **Space Complexity:** O(1)

### Approach 2: Bit Manipulation (Optimal)

*   **Logic:** A positive integer is a power of two if and only if it has exactly one set bit in its binary representation.
    *   Examples: `1 (0001)`, `2 (0010)`, `4 (0100)`, `8 (1000)`.
*   The trick `n & (n - 1)` clears the rightmost set bit.
    *   If `n` is a power of two, it has only one set bit. So, `n - 1` will have all bits to the right of that single set bit set to 1, and that single set bit will be 0.
    *   Therefore, `n & (n - 1)` will be 0 if `n` is a power of two.
*   Combine this with the initial check for `n > 0`.
*   **Time Complexity:** O(1)
*   **Space Complexity:** O(1)

---

## 3. Reverse Bits

**Problem:** Reverse the bits of a given 32-bit unsigned integer.

### Approach 1: Iterative Bit-by-Bit (Optimal and General)

*   **Logic:** Build the reversed number bit by bit.
    1.  Initialize `reversed = 0`.
    2.  Loop 32 times (for a 32-bit integer).
    3.  In each iteration:
        *   Left-shift `reversed` by 1 (`reversed <<= 1`). This makes space for the next bit and shifts existing bits to the left.
        *   Extract the LSB of `n` using `n & 1`.
        *   OR this LSB into `reversed` (`reversed |= (n & 1)`).
        *   Right-shift `n` by 1 (`n >>>= 1`) to process the next bit.
    4.  Return `reversed`. The `>>> 0` ensures the result is treated as an unsigned 32-bit integer in JavaScript.
*   **Time Complexity:** O(k) where k is the number of bits (e.g., 32).
*   **Space Complexity:** O(1)

### Approach 2: Byte-by-Byte Lookup Table

*   **Logic:** Similar to `Count Set Bits` lookup table, but for reversing.
    1.  Precompute a table mapping each 8-bit value (0-255) to its 8-bit reversed value.
    2.  For a given 32-bit `n`, extract its four bytes: `byte1 = n & 0xFF` (LSB), `byte2 = (n >>> 8) & 0xFF`, etc.
    3.  Reverse each byte using the lookup table.
    4.  Reconstruct the 32-bit `reversed` number:
        *   The reversed `byte1` (originally LSB) goes into the most significant byte position (shifted left by 24).
        *   The reversed `byte2` goes into the next position (shifted left by 16).
        *   ... and so on, until the reversed `byte4` (originally MSB) goes into the LSB position (shifted left by 0).
    5.  OR these shifted reversed bytes together.
*   **Time Complexity:**
    *   Precomputation: O(2^B * B) where B is byte size (e.g., 256 * 8). Done once.
    *   Query: O(NUM_BYTES), which is O(1) for fixed-size integers (e.g., 4 operations for 32-bit).
*   **Space Complexity:** O(2^B) for the lookup table.

---

## 4. Single Number

**Problem:** Given a non-empty array of integers, every element appears twice except for one. Find that single one.

### Approach 1: Hash Map / Set

*   **Logic:**
    1.  Initialize an empty `Set` (or a `Map` to count frequencies).
    2.  Iterate through the array:
        *   If the current number is already in the `Set`, remove it.
        *   Otherwise, add it to the `Set`.
    3.  After iterating through all numbers, the `Set` will contain only the unique number.
*   **Time Complexity:** O(N) because `Set` operations (add, delete, has) are O(1) on average.
*   **Space Complexity:** O(N) in the worst case (if all numbers are unique until the end), or O(N/2) on average.

### Approach 2: Bit Manipulation (XOR Property) (Optimal)

*   **Logic:** This is a classic application of the XOR operator.
    *   **XOR Properties:**
        *   `x ^ 0 = x` (Identity)
        *   `x ^ x = 0` (Self-inverse)
        *   `x ^ y = y ^ x` (Commutativity)
        *   `(x ^ y) ^ z = x ^ (y ^ z)` (Associativity)
    *   Because of commutativity and associativity, the order of XOR operations does not matter. If we XOR all numbers in the array:
        *   Any number XORed with itself results in 0 (`A ^ A = 0`).
        *   All pairs of identical numbers will cancel each other out.
        *   The final result will be `0 ^ unique_number = unique_number`.
*   Initialize `result = 0`.
*   Iterate through the array, XORing each number with `result`.
*   Return `result`.
*   **Time Complexity:** O(N) to iterate through the array once.
*   **Space Complexity:** O(1)

---

## 5. Insert M into N

**Problem:** Given two 32-bit numbers, N and M, and two bit positions, i and j. Insert M into N such that M starts at bit j and ends at bit i. Assume M will fit in the range from i to j.

### Approach 1: Bit Manipulation (Clear then Insert) (Optimal)

*   **Logic:** This problem requires precisely manipulating specific bit ranges.
    1.  **Clear bits in N from position `i` to `j`:**
        *   Create a `clearMask` that has `0`s in the range `[i, j]` and `1`s everywhere else.
        *   `N_cleared = N & clearMask`.
        *   **How to create `clearMask`:**
            *   `allOnes = ~0` (or `0xFFFFFFFF` for 32-bit unsigned).
            *   `leftPart = allOnes << (j + 1)`: Creates a mask `11...100...0` where `0`s are from `bit 0` to `bit j`.
            *   `rightPart = (1 << i) - 1`: Creates a mask `00...011...1` where `1`s are from `bit 0` to `bit i-1`.
            *   `clearMask = leftPart | rightPart`: This combines them to form `11...1 (j+1) ... (i) 00...0 11...1`.
    2.  **Shift M to the correct position `i`:**
        *   `M_shifted = M << i`. This aligns the LSB of `M` with bit `i` of `N`.
    3.  **Insert `M_shifted` into `N_cleared`:**
        *   `result = N_cleared | M_shifted`. Since `N_cleared` has `0`s where `M` needs to go, `OR`ing will correctly insert `M`.
*   **Time Complexity:** O(1) (fixed number of bitwise operations).
*   **Space Complexity:** O(1)

---
```