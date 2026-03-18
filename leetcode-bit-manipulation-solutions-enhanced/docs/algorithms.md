```markdown
# Detailed Algorithm Explanations for Bit Manipulation

This document provides in-depth explanations of the bit manipulation techniques and algorithms used in this project. We'll cover the basics of bitwise operators and then dive into each problem's solution with examples and ASCII art to visualize bit operations.

## Table of Contents
1.  [Introduction to Bitwise Operators](#1-introduction-to-bitwise-operators)
    *   [AND (`&`)](#and-)
    *   [OR (`|`)](#or-)
    *   [XOR (`^`)](#xor-)
    *   [NOT (`~`)](#not-)
    *   [Left Shift (`<<`)](#left-shift-)
    *   [Right Shift (`>>`)](#right-shift-)
2.  [Problem 1: Count Set Bits (Hamming Weight)](#2-problem-1-count-set-bits-hamming-weight)
    *   [Approach 1: Iterative](#approach-1-iterative)
    *   [Approach 2: Brian Kernighan's Algorithm](#approach-2-brian-kernighans-algorithm)
    *   [Approach 3: Lookup Table](#approach-3-lookup-table)
3.  [Problem 2: Single Number III](#3-problem-2-single-number-iii)
    *   [Approach 1: XOR Properties](#approach-1-xor-properties)
4.  [Problem 3: Power of Two](#4-problem-3-power-of-two)
    *   [Approach 1: Loop and Divide](#approach-1-loop-and-divide)
    *   [Approach 2: Bit Manipulation](#approach-2-bit-manipulation)
5.  [Problem 4: Reverse Bits](#5-problem-4-reverse-bits)
    *   [Approach 1: Iterative Shifting](#approach-1-iterative-shifting)
6.  [Problem 5: Insert M into N (Update Bits)](#6-problem-5-insert-m-into-n-update-bits)
    *   [Approach 1: Clear and Set](#approach-1-clear-and-set)

---

## 1. Introduction to Bitwise Operators

Bitwise operators perform operations on individual bits of integer types. Understanding them is fundamental to bit manipulation.

### AND (`&`)
*   Sets a bit if both corresponding bits are 1.
*   Useful for:
    *   Checking if a specific bit is set.
    *   Clearing (setting to 0) specific bits using a mask.

```
  0101 (5)
& 0011 (3)
------
  0001 (1)
```

### OR (`|`)
*   Sets a bit if at least one of the corresponding bits is 1.
*   Useful for:
    *   Setting a specific bit to 1 using a mask.
    *   Combining bit masks.

```
  0101 (5)
| 0011 (3)
------
  0111 (7)
```

### XOR (`^`)
*   Sets a bit if the corresponding bits are different (one is 0, the other is 1).
*   Key properties:
    *   `x ^ 0 = x`
    *   `x ^ x = 0`
    *   `x ^ y = y ^ x` (commutative)
    *   `x ^ (y ^ z) = (x ^ y) ^ z` (associative)
    *   `x ^ y ^ x = y` (swap without temp, finding unique numbers)
*   Useful for:
    *   Toggling bits.
    *   Finding unique elements (as seen in Problem 2).
    *   Swapping numbers without a temporary variable.

```
  0101 (5)
^ 0011 (3)
------
  0110 (6)
```

### NOT (`~`)
*   Flips all bits (0 becomes 1, 1 becomes 0).
*   It's a unary operator.
*   In C++, `~0` results in an integer with all bits set to 1 (e.g., `0xFFFFFFFF` for a 32-bit int), which is `-1` in two's complement.

```
~ 0101 (5)
------
  1010 (for a 4-bit system, might be ...11111010 for larger)
```

### Left Shift (`<<`)
*   Shifts bits to the left, filling new positions with 0s.
*   `n << k` is equivalent to `n * 2^k` (if no overflow).
*   Useful for:
    *   Multiplying by powers of 2.
    *   Creating masks (`1 << i` creates a mask with only the i-th bit set).

```
  0001 (1)
<< 2
------
  0100 (4)
```

### Right Shift (`>>`)
*   Shifts bits to the right.
*   `n >> k` is equivalent to `n / 2^k` (integer division).
*   Behavior for signed integers with negative values is implementation-defined (arithmetic vs. logical shift), but typically arithmetic shift (preserves sign bit). For `unsigned` integers, it's always a logical shift (fills with 0s).
*   Useful for:
    *   Dividing by powers of 2.
    *   Extracting bits (e.g., LSB after shifting).

```
  1010 (10)
>> 1
------
  0101 (5)
```

---

## 2. Problem 1: Count Set Bits (Hamming Weight)

**Problem:** Count the number of '1' bits in a 32-bit unsigned integer.

### Approach 1: Iterative
This is the most straightforward approach. It checks the Least Significant Bit (LSB) in each iteration using `n & 1`. If the LSB is 1, increment the count. Then, right-shift `n` by 1 to move the next bit to the LSB position. Repeat 32 times for a 32-bit integer.

**Logic:**
1.  Initialize `count = 0`.
2.  Loop 32 times (for a 32-bit integer).
3.  In each iteration, check `n & 1`. If it's 1, increment `count`.
4.  Right-shift `n` by 1 (`n >>= 1`).
5.  Return `count`.

**Example: `n = 0b1011` (11 decimal)**
```
Initial: n = ...0000 1011, count = 0

Iteration 1:
  n & 1 = (...0000 1011) & (...0000 0001) = 1. count = 1
  n >>= 1: ...0000 0101

Iteration 2:
  n & 1 = (...0000 0101) & (...0000 0001) = 1. count = 2
  n >>= 1: ...0000 0010

Iteration 3:
  n & 1 = (...0000 0010) & (...0000 0001) = 0. count = 2
  n >>= 1: ...0000 0001

Iteration 4:
  n & 1 = (...0000 0001) & (...0000 0001) = 1. count = 3
  n >>= 1: ...0000 0000

... (remaining 28 iterations, n will be 0, count won't change)

Final count = 3
```
**Time Complexity:** O(k), where k is the number of bits (e.g., 32 for `uint32_t`).
**Space Complexity:** O(1).

### Approach 2: Brian Kernighan's Algorithm
This algorithm is more efficient because it iterates only as many times as there are set bits. The key is the operation `n & (n - 1)`, which clears the least significant set bit in `n`.

**Logic:**
1.  Initialize `count = 0`.
2.  While `n` is not 0:
    *   Clear the least significant set bit: `n = n & (n - 1)`.
    *   Increment `count`.
3.  Return `count`.

**How `n & (n - 1)` works:**
Consider a number `n` in binary. Let its rightmost '1' bit be at position `k`.
`n`: `...A100...0` (where `A` is any prefix of bits, and there are `k` zeros after the `1`)
`n - 1`: `...A011...1` (the `1` at position `k` becomes `0`, and all `0`s after it become `1`s)
When you perform `n & (n - 1)`, the `1` at position `k` in `n` gets ANDed with `0` at position `k` in `n-1`, effectively clearing it. All bits to the right of `k` were `0` in `n` and are `1` in `n-1`, so they become `0` after ANDing. Bits to the left of `k` remain unchanged.

**Example: `n = 0b1011` (11 decimal)**
```
Initial: n = ...0000 1011, count = 0

Iteration 1:
  n = 1011_2
  n-1 = 1010_2
  n & (n-1) = 1011 & 1010 = 1010_2. count = 1
  n becomes 1010_2

Iteration 2:
  n = 1010_2
  n-1 = 1001_2
  n & (n-1) = 1010 & 1001 = 1000_2. count = 2
  n becomes 1000_2

Iteration 3:
  n = 1000_2
  n-1 = 0111_2
  n & (n-1) = 1000 & 0111 = 0000_2. count = 3
  n becomes 0000_2

Loop terminates as n is 0.
Final count = 3
```
**Time Complexity:** O(k), where k is the number of set bits. In the worst case (all bits set), it's O(32).
**Space Complexity:** O(1).

### Approach 3: Lookup Table
For problems where `countSetBits` might be called many times, precomputing the results for smaller units (like bytes) can speed up subsequent calls significantly. A 32-bit integer can be broken into four 8-bit bytes.

**Logic:**
1.  **Precomputation (once):** Create a lookup table (e.g., `int lookupTable[256]`) where `lookupTable[i]` stores the number of set bits in `i`. This can be done using Brian Kernighan's algorithm for each `i` from 0 to 255.
2.  **Counting (per call):** For a given `uint32_t n`:
    *   Extract each byte using bitwise AND with `0xFF` and right shifts (`n & 0xFF`, `(n >> 8) & 0xFF`, etc.).
    *   Sum the precomputed counts from the lookup table for each byte.

**Example: `n = 0b100010000000100010001` (557057 decimal)**
Let's assume `lookupTable` is pre-filled.
```
n = 0x00088881 (hex)
   Byte 3   Byte 2   Byte 1   Byte 0
   00000000 00001000 10001000 10000001

1. (n & 0xFF)          = 0b10000001 (129 decimal). lookupTable[129] = 2
2. ((n >> 8) & 0xFF)   = 0b10001000 (136 decimal). lookupTable[136] = 3
3. ((n >> 16) & 0xFF)  = 0b00001000 (8 decimal).   lookupTable[8] = 1
4. ((n >> 24) & 0xFF)  = 0b00000000 (0 decimal).   lookupTable[0] = 0

Total count = 2 + 3 + 1 + 0 = 6
```
**Time Complexity:** O(1) after initial O(256 * k) precomputation (where k is bits in a byte).
**Space Complexity:** O(256) for the lookup table.

---

## 3. Problem 2: Single Number III

**Problem:** Find two unique numbers in an array where all other numbers appear twice.

### Approach 1: XOR Properties
The core idea leverages the properties of XOR: `A ^ A = 0` and `A ^ 0 = A`.
If we XOR all numbers in the array:
`xor_sum = (num1 ^ num1) ^ (num2 ^ num2) ^ ... ^ (unique1 ^ unique2)`
Since `X ^ X = 0`, all numbers appearing twice will cancel out, leaving:
`xor_sum = unique1 ^ unique2`

Now we have the XOR sum of the two unique numbers. We need a way to separate them.
1.  **Find a distinguishing bit:** Since `unique1 != unique2`, their `xor_sum` must be non-zero, meaning there's at least one bit where `unique1` and `unique2` differ. We can find *any* such bit. A common trick is `xor_sum & (-xor_sum)`, which isolates the rightmost set bit. Let this be `diff_bit`.
2.  **Partition and XOR:** Use `diff_bit` to partition the original array into two groups:
    *   Group A: Numbers where `diff_bit` is set.
    *   Group B: Numbers where `diff_bit` is not set.
    All numbers appearing twice will be in the *same* group. `unique1` will be in one group, and `unique2` in the other.
3.  XOR all numbers in Group A to find `unique1`.
4.  XOR all numbers in Group B to find `unique2`.

**Example: `nums = [1, 2, 1, 3, 2, 5]`**
Binary representations (using 4 bits for simplicity for 1,2,3,5):
`1 = 0001`
`2 = 0010`
`3 = 0011`
`5 = 0101`

**Step 1: XOR all numbers**
`xor_sum = 1 ^ 2 ^ 1 ^ 3 ^ 2 ^ 5`
`xor_sum = (1 ^ 1) ^ (2 ^ 2) ^ 3 ^ 5`
`xor_sum = 0 ^ 0 ^ 3 ^ 5`
`xor_sum = 3 ^ 5`
`xor_sum = 0011_2 ^ 0101_2 = 0110_2` (6 decimal)

**Step 2: Find a distinguishing bit (`diff_bit`)**
`xor_sum = 0110_2`
`diff_bit = xor_sum & (-xor_sum)`
In two's complement, `-xor_sum` is `~xor_sum + 1`.
`~xor_sum = ~0110_2 = 1001_2` (assuming 4 bits, or `...11111001_2` for 32-bit)
`~xor_sum + 1 = 1001_2 + 1 = 1010_2`
`diff_bit = 0110_2 & 1010_2 = 0010_2` (2 decimal, the rightmost set bit)

**Step 3 & 4: Partition and XOR**
Initialize `unique1 = 0`, `unique2 = 0`.
`diff_bit = 0010_2`

*   `num = 1 (0001_2)`: `(1 & 0010_2) = 0`. Add to `unique2`. `unique2 = 0 ^ 1 = 1`.
*   `num = 2 (0010_2)`: `(2 & 0010_2) = 2`. Add to `unique1`. `unique1 = 0 ^ 2 = 2`.
*   `num = 1 (0001_2)`: `(1 & 0010_2) = 0`. Add to `unique2`. `unique2 = 1 ^ 1 = 0`.
*   `num = 3 (0011_2)`: `(3 & 0010_2) = 2`. Add to `unique1`. `unique1 = 2 ^ 3 = 1`.
*   `num = 2 (0010_2)`: `(2 & 0010_2) = 2`. Add to `unique1`. `unique1 = 1 ^ 2 = 3`.
*   `num = 5 (0101_2)`: `(5 & 0010_2) = 0`. Add to `unique2`. `unique2 = 0 ^ 5 = 5`.

Final result: `[unique1, unique2] = [3, 5]`

**Time Complexity:** O(N) due to two passes over the array.
**Space Complexity:** O(1).

---

## 4. Problem 3: Power of Two

**Problem:** Check if an integer `n` is a power of two.

### Approach 1: Loop and Divide
A positive number `n` is a power of two if it's repeatedly divisible by 2 until it becomes 1.
**Logic:**
1.  If `n <= 0`, return `false`. (Powers of two are positive).
2.  While `n` is even (`n % 2 == 0`):
    *   Divide `n` by 2 (`n /= 2`).
3.  If `n` is now 1, return `true`. Otherwise, return `false`.

**Example: `n = 16`**
```
Initial: n = 16

1. n = 16 > 0 (true)
2. n % 2 == 0 (true): n = 16 / 2 = 8
3. n % 2 == 0 (true): n = 8 / 2 = 4
4. n % 2 == 0 (true): n = 4 / 2 = 2
5. n % 2 == 0 (true): n = 2 / 2 = 1
6. n % 2 == 0 (false), loop terminates.
7. n == 1 (true). Return true.
```
**Time Complexity:** O(log N) because n is halved in each step.
**Space Complexity:** O(1).

### Approach 2: Bit Manipulation
This is the most efficient and elegant solution. A positive integer `n` is a power of two if and only if it has exactly one '1' bit in its binary representation.
Examples:
`1 = 0001_2`
`2 = 0010_2`
`4 = 0100_2`
`8 = 1000_2`

If `n` has only one '1' bit, then `n - 1` will have all the bits to the right of that '1' flipped from '0' to '1', and that single '1' bit flipped to '0'.
For instance, if `n = 0b10000` (16):
`n = 10000_2`
`n - 1 = 01111_2`
`n & (n - 1) = 10000_2 & 01111_2 = 00000_2`

So, if `n` is a power of two, `n > 0` and `(n & (n - 1))` will be `0`.

**Logic:**
1.  Return `n > 0 && (n & (n - 1)) == 0`.

**Example: `n = 16` (`0b10000`)**
```
n = 16 (0001 0000_2)
n - 1 = 15 (0000 1111_2)

n > 0 is true.
(n & (n - 1)) = (0001 0000_2) & (0000 1111_2) = 0000 0000_2 (0 decimal).
(0 == 0) is true.
Result: true.
```
**Example: `n = 6` (`0b0110`)**
```
n = 6 (0000 0110_2)
n - 1 = 5 (0000 0101_2)

n > 0 is true.
(n & (n - 1)) = (0000 0110_2) & (0000 0101_2) = 0000 0100_2 (4 decimal).
(4 == 0) is false.
Result: false.
```
**Time Complexity:** O(1).
**Space Complexity:** O(1).

---

## 5. Problem 4: Reverse Bits

**Problem:** Reverse bits of a given 32-bit unsigned integer.

### Approach 1: Iterative Shifting
This method builds the reversed number bit by bit. In each iteration, we extract the LSB from the input `n` and append it to the `reversed_n`.

**Logic:**
1.  Initialize `reversed_n = 0`.
2.  Loop 32 times (for a 32-bit integer).
3.  In each iteration:
    *   Left-shift `reversed_n` by 1 (`reversed_n <<= 1`). This makes space for the next bit from `n`.
    *   Check if the LSB of `n` is 1 (`n & 1`).
    *   If it is, set the LSB of `reversed_n` to 1 (`reversed_n |= 1`).
    *   Right-shift `n` by 1 (`n >>= 1`) to move to the next bit in the input.
4.  Return `reversed_n`.

**Example: `n = 0b0010` (2 decimal), 4-bit representation for simplicity**
```
Initial: n = 0010_2, reversed_n = 0000_2

Iteration 1 (i=0):
  reversed_n <<= 1: 0000_2
  n & 1 = 0010_2 & 0001_2 = 0 (LSB of n is 0)
  reversed_n remains 0000_2
  n >>= 1: 0001_2

Iteration 2 (i=1):
  reversed_n <<= 1: 0000_2
  n & 1 = 0001_2 & 0001_2 = 1 (LSB of n is 1)
  reversed_n |= 1: 0001_2
  n >>= 1: 0000_2

Iteration 3 (i=2):
  reversed_n <<= 1: 0010_2
  n & 1 = 0000_2 & 0001_2 = 0
  reversed_n remains 0010_2
  n >>= 1: 0000_2

Iteration 4 (i=3):
  reversed_n <<= 1: 0100_2
  n & 1 = 0000_2 & 0001_2 = 0
  reversed_n remains 0100_2
  n >>= 1: 0000_2

Final reversed_n = 0100_2 (4 decimal).
Correct, 0010 reversed is 0100.
```
**Time Complexity:** O(k), where k is the number of bits (32 for `uint32_t`).
**Space Complexity:** O(1).

---

## 6. Problem 5: Insert M into N (Update Bits)

**Problem:** Insert `M` into `N` between bit positions `j` and `i` (inclusive).

### Approach 1: Clear and Set
This approach involves two main steps: first, clearing the target bits in `N`, and second, inserting `M` into that cleared space.

**Logic:**
1.  **Create a mask to clear bits [i, j] in N:**
    *   `left_mask`: All 1s from bit `j+1` to the MSB. `(~0) << (j + 1)`
        `~0` gives all 1s (`...11111111_2`).
        Left-shifting by `j+1` places `0`s in positions `0` to `j`.
        Example: `j = 6`. `~0 << 7` -> `...1111100000000_2` (0s at 0-6).
    *   `right_mask`: All 1s from bit `0` to `i-1`. `(1 << i) - 1`
        `1 << i` gives a 1 at position `i` and 0s elsewhere (`...00100_2`).
        Subtracting 1 results in all 1s from `0` to `i-1`.
        Example: `i = 2`. `(1 << 2) - 1` -> `0b100 - 1 = 0b011_2`.
        If `i=0`, `(1 << 0) - 1 = 1 - 1 = 0`. Correct.
    *   Combine them: `clear_mask = left_mask | right_mask`. This mask will have 0s in the range `[i, j]` and 1s everywhere else.
2.  **Clear the bits in N:** `n_cleared = N & clear_mask`. This sets bits `i` through `j` in `N` to 0.
3.  **Shift M to align:** `m_shifted = M << i`. This moves `M` to start at bit `i`.
4.  **Insert M into N:** `result = n_cleared | m_shifted`. ORing combines the cleared `N` with the shifted `M`.

**Example: `N = 0b10000000000` (1024), `M = 0b10011` (19), `i = 2`, `j = 6`**
(Using 11 bits for visualization)

```
N = 10 0000 0000_2 (decimal 1024)
M =       1 0011_2 (decimal 19)
i = 2, j = 6

Step 1: Create clear_mask
  left_mask = (~0) << (j + 1) = (~0) << (6 + 1) = (~0) << 7
    ~0    = 1111 1111 1111_2 (all 1s)
    ~0 << 7 = 1111 1000 0000_2  (0s from bit 0 to 6)
  
  right_mask = (1 << i) - 1 = (1 << 2) - 1
    1 << 2 = 0000 0000 100_2
    (1 << 2) - 1 = 0000 0000 011_2 (1s from bit 0 to 1)

  clear_mask = left_mask | right_mask
             = 1111 1000 0000_2 | 0000 0000 011_2
             = 1111 1000 0011_2 (0s in range [2, 6])

Step 2: Clear bits in N
  N           = 0010 0000 0000_2 (MSB part shown for 32-bit `int`, but focusing on the 11 bits)
  clear_mask  = 1111 1000 0011_2
  N & clear_mask = 0010 0000 0000_2  (bits 2-6 of N are cleared)

Step 3: Shift M to align
  M           = 0000 0001 0011_2
  M << i      = M << 2
              = 0000 0100 1100_2 (M now starts at bit 2)

Step 4: Insert M
  N after clear = 0010 0000 0000_2
  M shifted     = 0000 0100 1100_2
  Result = N_cleared | M_shifted
         = 0010 0000 0000_2 | 0000 0100 1100_2
         = 0010 0100 1100_2 (decimal 1100)
```
**Time Complexity:** O(1).
**Space Complexity:** O(1).
```