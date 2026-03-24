# Bit Manipulation Visualizations (ASCII Art)

This document provides visual diagrams using ASCII art to explain fundamental bitwise operations and common bit manipulation tricks.

---

## Basic Bitwise Operations (on 8-bit numbers for simplicity)

Let `A = 0b10101100` (172) and `B = 0b01101011` (107).

### 1. AND (`&`)

The bitwise AND operator returns `1` if both bits are `1`, otherwise `0`.

```
  A: 1 0 1 0   1 1 0 0
  B: 0 1 1 0   1 0 1 1
     -----------------
A & B: 0 0 1 0   1 0 0 0   (0b00101000 = 40)
```

**Key Use Cases:**
*   Checking if a specific bit is set: `(number >> k) & 1` or `number & (1 << k)`
*   Clearing specific bits: `number & (~mask)`
*   Masking: Extracting a subset of bits.

### 2. OR (`|`)

The bitwise OR operator returns `1` if at least one of the bits is `1`, otherwise `0`.

```
  A: 1 0 1 0   1 1 0 0
  B: 0 1 1 0   1 0 1 1
     -----------------
A | B: 1 1 1 0   1 1 1 1   (0b11101111 = 239)
```

**Key Use Cases:**
*   Setting a specific bit: `number | (1 << k)`
*   Combining bit masks or flags.

### 3. XOR (`^`)

The bitwise XOR operator returns `1` if the bits are different, otherwise `0`.

```
  A: 1 0 1 0   1 1 0 0
  B: 0 1 1 0   1 0 1 1
     -----------------
A ^ B: 1 1 0 0   0 1 1 1   (0b11000111 = 199)
```

**Key Use Cases:**
*   Toggling a specific bit: `number ^ (1 << k)`
*   Swapping two numbers without a temporary variable: `a ^= b; b ^= a; a ^= b;`
*   Finding the single unique number in an array where others appear twice (as demonstrated in the project).

### 4. NOT (`~`)

The bitwise NOT (complement) operator inverts all the bits. For unsigned integers, `~n` is equivalent to `(2^B - 1) - n`, where B is the number of bits.

```
  A:   1 0 1 0   1 1 0 0
     -----------------
~A:    0 1 0 1   0 0 1 1   (0b01010011 = 83)
```

**Key Use Cases:**
*   Creating masks: `~0U` gives all ones. `~((1 << k) - 1)` gives a mask with ones from bit `k` to the MSB.
*   Clearing bits (in combination with AND): `number & (~(1 << k))` clears bit `k`.

### 5. Left Shift (`<<`)

Shifts bits to the left, filling vacant positions with zeros. `n << k` is equivalent to `n * 2^k`.

```
A:   0 0 0 0   1 1 0 0   (12)

A << 2:
   0 0 1 1   0 0 0 0   (48)
   ^ ^
   Vacated bits filled with 0s
```

**Key Use Cases:**
*   Multiplying by powers of 2.
*   Creating masks for setting/clearing bits at specific positions: `1 << k` creates a mask with only the `k`-th bit set.

### 6. Right Shift (`>>`)

Shifts bits to the right.
*   For unsigned integers, vacant positions are filled with zeros (logical right shift). `n >> k` is equivalent to `n / 2^k` (integer division).
*   For signed integers, the behavior depends on the implementation (arithmetic vs. logical right shift). Arithmetic right shift fills with the sign bit (preserving the sign), while logical right shift fills with zeros. C++ standard allows either for negative signed numbers, but typically arithmetic shift is used for signed types. **Always prefer `unsigned int` for bit manipulation unless signed behavior is explicitly required.**

```
A:   1 1 0 0   0 0 0 0   (192, as unsigned)

A >> 2 (logical shift, for unsigned):
   0 0 1 1   0 0 0 0   (48)
   ^ ^
   Vacated bits filled with 0s
```

**Key Use Cases:**
*   Dividing by powers of 2.
*   Extracting bits: `(number >> k) & 1` gets the `k`-th bit.
*   Iterating through bits.

---

## Common Bit Manipulation Tricks

### 1. `n & (n - 1)`: Unsetting the Least Significant Set Bit

This is the core of Brian Kernighan's algorithm for counting set bits. It turns the rightmost `1` bit to `0` and all bits to its right to `0` (if they were `0`) or `1` (if they were `1`). Effectively, it clears the LSB.

**Example (n = 12, binary `0...01100`):**
```
n     : ... 0 1 1 0 0
n - 1 : ... 0 1 0 1 1
        -------------
n&(n-1): ... 0 1 0 0 0   (Result is 8)
```
The rightmost `1` (at position `2`) is turned off.

**Key Use Cases:**
*   Counting set bits efficiently.
*   Checking if a number is a power of 2: `n > 0 && (n & (n - 1)) == 0`.

### 2. `n & (-n)` or `n & (~n + 1)`: Isolating the Least Significant Set Bit

This operation returns a number with only the least significant set bit of `n` enabled, and all other bits (including other set bits) set to `0`. This is because `-n` in two's complement is `~n + 1`.

**Example (n = 12, binary `0...01100`):**
```
n     : ... 0 1 1 0 0  (12)
~n    : ... 1 0 0 1 1
~n + 1: ... 1 0 1 0 0  (-12 in 2's complement)
        -------------
n & (-n): ... 0 0 1 0 0   (Result is 4)
```
The result `0...00100` correctly isolates the LSB of `12`.

**Key Use Cases:**
*   Finding the next number with the same number of set bits (more advanced).
*   Used in Fenwick trees (BIT) for calculating prefix sums.

### 3. `n | (n + 1)`: Setting the Least Significant Zero Bit

This operation sets the least significant `0` bit to `1`.

**Example (n = 12, binary `0...01100`):**
```
n     : ... 0 1 1 0 0
n + 1 : ... 0 1 1 0 1
        -------------
n|(n+1): ... 0 1 1 0 1   (Result is 13)
```
The rightmost `0` (at position `0`) is turned on.

**Key Use Cases:**
*   Useful in algorithms like finding the next permutation with the same number of set bits.

### 4. Masking for Bit Ranges (`(1 << (j - i + 1)) - 1`)

To create a mask with `k` ones, you can use `(1 << k) - 1`. This is useful for clearing or extracting ranges of bits.

**Example (Mask of 5 ones):**
```
1 << 5      : 0 0 1 0 0 0 0 0  (32)
(1 << 5) - 1: 0 0 0 1 1 1 1 1  (31)
```

**Key Use Cases:**
*   Creating a mask for a specific window of bits.
*   Used in `insertMIntoN` to help create the clear mask and shift M.

---

Remember, understanding these basic operations and their combined effects is key to solving complex bit manipulation problems.

---