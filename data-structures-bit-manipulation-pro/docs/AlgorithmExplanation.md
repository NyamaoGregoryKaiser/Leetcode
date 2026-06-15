# Bit Manipulation Algorithm Explanations

This document provides detailed explanations for the bit manipulation problems implemented in this project. We'll cover basic bitwise operators, the logic behind each solution, and visual aids using ASCII diagrams.

## 1. Introduction to Bitwise Operations

Bitwise operations treat numbers as sequences of bits (binary digits). They operate on these individual bits. Understanding these fundamental operations is crucial for solving bit manipulation problems efficiently.

*   `&` (AND): Sets a bit to 1 if both corresponding bits are 1.
    ```
      A: 0 1 0 1
      B: 0 0 1 1
    A&B: 0 0 0 1
    ```
*   `|` (OR): Sets a bit to 1 if at least one of the corresponding bits is 1.
    ```
      A: 0 1 0 1
      B: 0 0 1 1
    A|B: 0 1 1 1
    ```
*   `^` (XOR): Sets a bit to 1 if the corresponding bits are different.
    ```
      A: 0 1 0 1
      B: 0 0 1 1
    A^B: 0 1 1 0
    ```
*   `~` (NOT): Flips all bits (0 becomes 1, 1 becomes 0).
    ```
      A: 0 1 0 1
     ~A: 1 0 1 0 (assuming 4-bit representation for simplicity)
    ```
*   `<<` (Left Shift): Shifts bits to the left, filling vacant positions with 0s. Equivalent to multiplying by powers of 2.
    ```
      A: 0 1 0 1  (5)
    A<<1: 1 0 1 0 (10)
    ```
*   `>>` (Right Shift): Shifts bits to the right, filling vacant positions with 0s (for unsigned types) or preserving the sign bit (for signed types, arithmetic right shift). Equivalent to dividing by powers of 2.
    ```
      A: 0 1 0 1 (5)
    A>>1: 0 0 1 0 (2)
    ```

## 2. Problem Explanations

### Problem 1: Count Set Bits (Hamming Weight)

**Problem:** Count the number of '1' bits in a 32-bit unsigned integer.

#### Approach 1: Iterative Check

*   **Logic:** This is the most straightforward approach. We iterate 32 times (once for each bit position). In each iteration, we check the least significant bit (LSB) of the number. If it's 1, we increment a counter. Then, we right-shift the number by one bit to bring the next bit to the LSB position.
*   **Time Complexity:** O(N) where N is the number of bits (32 for a `uint32_t`).
*   **Space Complexity:** O(1)

```
Example: n = 11 (binary 0...01011)

Initial: n = 0...01011, count = 0

Iteration 1:
  (n >> 0) & 1  -> (0...01011) & 1 -> 1. count = 1.
Iteration 2:
  (n >> 1) & 1  -> (0...0101) & 1  -> 1. count = 2.
Iteration 3:
  (n >> 2) & 1  -> (0...010) & 1   -> 0. count = 2.
Iteration 4:
  (n >> 3) & 1  -> (0...01) & 1    -> 1. count = 3.
... (rest of the bits are 0, so count remains 3)
```

#### Approach 2: Brian Kernighan's Algorithm (Optimal for sparse numbers)

*   **Logic:** This algorithm is highly efficient. It works on the principle that `n & (n - 1)` unsets the least significant set bit (the rightmost '1') in `n`. We repeatedly apply this operation and increment a counter until `n` becomes 0. The number of times we perform the operation is equal to the number of set bits.
*   **Time Complexity:** O(k) where `k` is the number of set bits. In the worst case (all bits set), `k=32`, so O(32) which is O(1). More efficient than iterative check for sparse numbers.
*   **Space Complexity:** O(1)

```
Example: n = 11 (binary 0...01011)

Initial: n = 0...01011, count = 0

Loop 1:
  n = 0...01011
  n-1 = 0...01010
  n & (n-1) = 0...01010   (rightmost '1' cleared)
  n becomes 0...01010 (10 decimal), count = 1

Loop 2:
  n = 0...01010
  n-1 = 0...01001
  n & (n-1) = 0...01000   (rightmost '1' cleared)
  n becomes 0...01000 (8 decimal), count = 2

Loop 3:
  n = 0...01000
  n-1 = 0...00111
  n & (n-1) = 0...00000   (rightmost '1' cleared)
  n becomes 0 (0 decimal), count = 3

Loop terminates as n is 0. Result: 3.
```

#### Approach 3: Lookup Table (Optimal for repeated calls)

*   **Logic:** Pre-calculate the number of set bits for all possible 8-bit values (0-255) and store them in an array (lookup table). For a 32-bit integer, split it into four 8-bit chunks (bytes) and sum the pre-calculated counts for each chunk.
*   **Time Complexity:** O(1) (4 array lookups for a 32-bit int).
*   **Space Complexity:** O(256) for the lookup table.

```
Example: n = 43261596 (binary 00000010 10010100 00011110 10011100)

Pre-computation:
  lookup_table[0] = 0
  lookup_table[1] = 1
  lookup_table[2] = 1
  ...
  lookup_table[156] (10011100) = 4
  lookup_table[30]  (00011110) = 4
  lookup_table[148] (10010100) = 3
  lookup_table[2]   (00000010) = 1

Calculation for n:
  byte1 = n & 0xFF                 (10011100) -> 156 decimal
  byte2 = (n >> 8) & 0xFF          (00011110) -> 30 decimal
  byte3 = (n >> 16) & 0xFF         (10010100) -> 148 decimal
  byte4 = (n >> 24) & 0xFF         (00000010) -> 2 decimal

  count = lookup_table[156] + lookup_table[30] + lookup_table[148] + lookup_table[2]
        = 4 + 4 + 3 + 1 = 12
```

#### Approach 4: Built-in Function (Most Optimal for performance)

*   **Logic:** Many compilers (like GCC/Clang) provide built-in functions that map directly to hardware instructions (e.g., `POPCNT` on x86-64 processors) for counting set bits. This is the fastest method.
*   **Time Complexity:** O(1) (hardware accelerated).
*   **Space Complexity:** O(1).

### Problem 2: Check if Power of Two

**Problem:** Determine if a given integer `n` is a power of two.

#### Approach 1: Iterative Division

*   **Logic:** A positive integer `n` is a power of two if and only if it is repeatedly divisible by 2 until it reaches 1. We first handle negative numbers and zero, which are not powers of two. Then, we loop, dividing `n` by 2 until `n` becomes 1. If at any point `n` is not divisible by 2 (i.e., `n % 2 != 0`), it's not a power of two.
*   **Time Complexity:** O(log N).
*   **Space Complexity:** O(1).

```
Example: n = 16

Initial: n = 16

Loop 1: 16 % 2 == 0. n = 16 / 2 = 8.
Loop 2:  8 % 2 == 0. n =  8 / 2 = 4.
Loop 3:  4 % 2 == 0. n =  4 / 2 = 2.
Loop 4:  2 % 2 == 0. n =  2 / 2 = 1.

n is now 1. Return true.


Example: n = 6

Initial: n = 6

Loop 1: 6 % 2 == 0. n = 6 / 2 = 3.
Loop 2: 3 % 2 != 0. Loop terminates.

n is not 1. Return false.
```

#### Approach 2: Bitwise Check (Optimal)

*   **Logic:** A positive integer `n` is a power of two if and only if its binary representation has exactly one '1' bit.
    *   Examples: 1 (0001), 2 (0010), 4 (0100), 8 (1000).
*   The trick `n & (n - 1)` clears the least significant set bit (the rightmost '1') in `n`.
    *   If `n` is a power of two, it has only one '1' bit. `n - 1` will have all bits to the right of that '1' set to '1', and that '1' itself flipped to '0'.
    *   Therefore, `n & (n - 1)` will result in 0 if `n` is a power of two.
    *   We also need to ensure `n > 0` because 0 has no set bits and `0 & (-1)` is 0, but 0 is not a power of two. Negative numbers also don't count.
*   **Time Complexity:** O(1).
*   **Space Complexity:** O(1).

```
Example: n = 16 (binary 0...10000)

1. n > 0 is true.
2. Calculate n - 1:
   n   = 0...10000
   n-1 = 0...01111

3. Calculate n & (n - 1):
   n        = 0...10000
   n-1      = 0...01111
   n & (n-1) = 0...00000

Result is 0. So, 16 is a power of two. Return true.


Example: n = 6 (binary 0...00110)

1. n > 0 is true.
2. Calculate n - 1:
   n   = 0...00110
   n-1 = 0...00101

3. Calculate n & (n - 1):
   n        = 0...00110
   n-1      = 0...00101
   n & (n-1) = 0...00100 (which is 4)

Result is not 0. So, 6 is not a power of two. Return false.
```

### Problem 3: Single Number (Find Unique Element)

**Problem:** Find the single number that appears only once in an array where all other elements appear twice. Do this in O(N) time and O(1) space.

#### Approach: XOR Sum (Optimal)

*   **Logic:** The XOR bitwise operator has several useful properties:
    *   `x ^ x = 0` (A number XORed with itself is 0)
    *   `x ^ 0 = x` (A number XORed with 0 is itself)
    *   XOR is commutative (`a ^ b = b ^ a`) and associative (`a ^ (b ^ c) = (a ^ b) ^ c`).
*   If we XOR all the numbers in the array, all numbers that appear twice will cancel each other out (their XOR sum will be 0), leaving only the unique number.
*   **Time Complexity:** O(N) because we iterate through the array once.
*   **Space Complexity:** O(1) because we only use a single variable for the XOR sum.

```
Example: nums = [2, 2, 1]

Initial: result = 0

Iteration 1 (num = 2):
  result = 0 ^ 2 = 2

Iteration 2 (num = 2):
  result = 2 ^ 2 = 0

Iteration 3 (num = 1):
  result = 0 ^ 1 = 1

Final result: 1.


Example: nums = [4, 1, 2, 1, 2]

Initial: result = 0

result = 0 ^ 4  = 4
result = 4 ^ 1  = 5 (binary 0100 ^ 0001 = 0101)
result = 5 ^ 2  = 7 (binary 0101 ^ 0010 = 0111)
result = 7 ^ 1  = 6 (binary 0111 ^ 0001 = 0110)
result = 6 ^ 2  = 4 (binary 0110 ^ 0010 = 0100)

Final result: 4.
```

### Problem 4: Reverse Bits

**Problem:** Reverse the bits of a given 32-bit unsigned integer.

#### Approach: Iterative Bit Manipulation (Optimal)

*   **Logic:** We can build the reversed number bit by bit. Initialize a `reversed_n` to 0. Iterate 32 times (for each bit). In each iteration:
    1.  Shift `reversed_n` one position to the left. This makes space for the next bit from the original number `n` at the least significant position.
    2.  Extract the least significant bit (LSB) of `n` using `(n & 1)`.
    3.  OR this LSB with `reversed_n`. This effectively adds the current bit from `n` to the LSB of `reversed_n`.
    4.  Right-shift `n` by one position to discard its LSB and bring the next bit into position for the next iteration.
*   **Time Complexity:** O(1) (exactly 32 iterations for a 32-bit integer).
*   **Space Complexity:** O(1).

```
Example: n = 43261596 (binary ...000010100101000001111010011100)
Let's trace a simplified 8-bit example: n = 01010110 (decimal 86)

Initial: n = 01010110, reversed_n = 00000000

Iteration 1 (i=0):
  reversed_n <<= 1   -> 00000000
  n & 1              -> 0 (LSB of n)
  reversed_n |= 0    -> 00000000
  n >>= 1            -> 00101011

Iteration 2 (i=1):
  reversed_n <<= 1   -> 00000000
  n & 1              -> 1 (LSB of n)
  reversed_n |= 1    -> 00000001
  n >>= 1            -> 00010101

Iteration 3 (i=2):
  reversed_n <<= 1   -> 00000010
  n & 1              -> 1 (LSB of n)
  reversed_n |= 1    -> 00000011
  n >>= 1            -> 00001010

Iteration 4 (i=3):
  reversed_n <<= 1   -> 00000110
  n & 1              -> 0 (LSB of n)
  reversed_n |= 0    -> 00000110
  n >>= 1            -> 00000101

Iteration 5 (i=4):
  reversed_n <<= 1   -> 00001100
  n & 1              -> 1 (LSB of n)
  reversed_n |= 1    -> 00001101
  n >>= 1            -> 00000010

Iteration 6 (i=5):
  reversed_n <<= 1   -> 00011010
  n & 1              -> 0 (LSB of n)
  reversed_n |= 0    -> 00011010
  n >>= 1            -> 00000001

Iteration 7 (i=6):
  reversed_n <<= 1   -> 00110100
  n & 1              -> 1 (LSB of n)
  reversed_n |= 1    -> 00110101
  n >>= 1            -> 00000000

Iteration 8 (i=7):
  reversed_n <<= 1   -> 01101010
  n & 1              -> 0 (LSB of n)
  reversed_n |= 0    -> 01101010
  n >>= 1            -> 00000000

Final result: reversed_n = 01101010 (decimal 106).
Original: 01010110. Reversed: 01101010. Correct.
```

### Problem 5: Insert M into N

**Problem:** Insert 32-bit number `M` into `N` between bit positions `i` and `j` (inclusive).

#### Approach: Masking and OR operations (Optimal)

*   **Logic:** This problem involves precisely manipulating specific ranges of bits.
    1.  **Clear the target bits in N:** Create a mask with 0s in the range `[i, j]` and 1s everywhere else. Use this mask with `AND` to clear the bits in `N`.
        *   To create a mask with 1s *outside* `[i, j]` and 0s *inside*:
            *   `left_mask`: All 1s from bit `j+1` to 31. This is `~0 << (j + 1)`.
            *   `right_mask`: All 1s from bit `0` to `i-1`. This is `(1 << i) - 1`.
            *   Combine: `clear_mask = left_mask | right_mask`.
        *   Then, `N_cleared = N & clear_mask`.
    2.  **Shift M into position:** Shift `M` to the left by `i` positions (`M_shifted = M << i`) so its least significant bit aligns with bit `i` of the target range.
    3.  **Combine:** `OR` the `N_cleared` (which has 0s in the insertion range) with the `M_shifted` (which now contains the bits of M aligned for insertion).
*   **Time Complexity:** O(1) (fixed number of bitwise operations).
*   **Space Complexity:** O(1).

```
Example: N = 10000000000 (binary, 1024 decimal)
         M = 10011 (binary, 19 decimal)
         i = 2, j = 6

Diagram (32-bit, showing relevant portion):
  Bits: ... 11 10 9  8  7  6  5  4  3  2  1  0
  N:    ... 0  1  0  0  0  0  0  0  0  0  0  0   (bit 10 is set)
  M:    ... 0  0  0  0  0  0  0  1  0  0  1  1   (5 bits total)

Step 1: Create clear_mask
  all_ones = ~0 (all 1s)

  left_mask (1s for bits j+1 to 31, 0s for bits 0 to j):
    j = 6, j+1 = 7
    all_ones << 7  =>  ...1110000000 (1s from bit 7 up, 0s for 0-6)

  right_mask (1s for bits 0 to i-1, 0s for bits i to 31):
    i = 2
    (1 << 2) - 1 => (0...100) - 1 => 0...011 (1s for bits 0-1)

  clear_mask = left_mask | right_mask
             = (...1110000000) | (...0000000011)
             = ...111000000011
  This mask has 0s from bit 2 to 6, and 1s elsewhere.

Step 2: Clear bits in N:
  N_cleared = N & clear_mask
            = (...010000000000) & (...111000000011)
            = (...010000000000)  (Original N had 0s in 2-6, so they stay 0.
                                  The 1 at bit 10 is preserved as it's outside range [2,6])

Step 3: Shift M into position:
  M_shifted = M << i
            = (0...10011) << 2
            = 0...1001100  (bits of M are now aligned for insertion at bit 2)

Step 4: Combine:
  Result = N_cleared | M_shifted
         = (...010000000000) | (0...1001100)
         = (...01001001100)   (decimal 1092)

Final Result: 10001001100 (binary)
```
---