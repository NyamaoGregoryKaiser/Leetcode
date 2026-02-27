```markdown
# Bit Manipulation: Algorithm Explanation

Bit manipulation involves operating on integer types at the bit level. This is often crucial for optimizing performance, solving specific algorithmic problems, and understanding low-level computing.

## Key Bitwise Operators in Java

| Operator | Name                  | Description                                                                     | Example (for `a=5 (0101)`, `b=3 (0011)`) | Result        |
|----------|-----------------------|---------------------------------------------------------------------------------|-------------------------------------------|---------------|
| `&`      | Bitwise AND           | Sets each bit to 1 if both corresponding bits are 1.                            | `0101 & 0011`                             | `0001` (1)    |
| `\|`     | Bitwise OR            | Sets each bit to 1 if at least one of the corresponding bits is 1.              | `0101 \| 0011`                            | `0111` (7)    |
| `^`      | Bitwise XOR           | Sets each bit to 1 if only one of the corresponding bits is 1 (exclusive OR).   | `0101 ^ 0011`                             | `0110` (6)    |
| `~`      | Bitwise NOT (Complement)| Inverts all the bits.                                                           | `~0101` (for 8-bit)                       | `1010` (-6)   |
| `<<`     | Left Shift            | Shifts bits to the left, filling with zeros on the right. Multiplies by powers of 2. | `0101 << 1`                               | `1010` (10)   |
| `>>`     | Signed Right Shift    | Shifts bits to the right, filling with the sign bit on the left. Divides by powers of 2 for positive numbers. | `0101 >> 1`                               | `0010` (2)    |
| `>>>`    | Unsigned Right Shift  | Shifts bits to the right, filling with zeros on the left.                         | `0101 >>> 1`                              | `0010` (2)    |

**Important Note on Java `int` and `long`:**
- Java's `int` and `long` types are **signed**. This means the leftmost bit (Most Significant Bit - MSB) indicates the sign (0 for positive, 1 for negative).
- The `>>` operator preserves the sign bit. For negative numbers, it fills with `1`s on the left.
- The `>>>` operator always fills with `0`s on the left, treating the number as "unsigned" for shifting purposes. This is crucial when problems specify "unsigned integers" or when dealing with negative inputs that should be interpreted as large positive numbers (e.g., `countSetBits(-1)`).

---

## Common Bit Manipulation Patterns & Tricks

### 1. Check if a bit is set
To check if the `k`-th bit (0-indexed from right) of a number `n` is set (i.e., is 1):
`boolean isSet = (n & (1 << k)) != 0;`
- `(1 << k)` creates a mask with a `1` at the `k`-th position and `0`s elsewhere.
- `n & mask` will result in `0` if the `k`-th bit of `n` is `0`, and `(1 << k)` if the `k`-th bit of `n` is `1`.

### 2. Set a bit
To set the `k`-th bit of a number `n` to 1:
`n = n | (1 << k);`
- `(1 << k)` creates the mask.
- `n | mask` ensures that if the `k`-th bit was `0`, it becomes `1`. If it was already `1`, it remains `1`.

### 3. Clear a bit
To clear the `k`-th bit of a number `n` (i.e., set it to 0):
`n = n & ~(1 << k);`
- `(1 << k)` creates the mask.
- `~(1 << k)` inverts the mask, making it `0` at the `k`-th position and `1`s elsewhere.
- `n & invertedMask` ensures that the `k`-th bit becomes `0`, while other bits remain unchanged.

### 4. Toggle a bit
To toggle the `k`-th bit of a number `n` (i.e., flip 0 to 1, or 1 to 0):
`n = n ^ (1 << k);`
- `^` (XOR) operation flips a bit if the corresponding mask bit is `1`, and leaves it unchanged if the mask bit is `0`.

### 5. Clear bits from MSB to `k`-th bit
To clear all bits from the Most Significant Bit (MSB) up to and including the `k`-th bit:
`n = n & ((1 << k) - 1);`
- `(1 << k)` creates `1` at `k`-th position.
- `(1 << k) - 1` creates a mask with `0`s from `k`-th bit to MSB, and `1`s from `k-1`-th bit to LSB.
- `n & mask` keeps only the bits from `k-1` down to `0`.

### 6. Clear bits from `k`-th bit to LSB
To clear all bits from the `k`-th bit down to and including the Least Significant Bit (LSB):
`n = n & (~0 << k);`
- `~0` is an integer with all bits set to `1` (equivalent to -1 in two's complement).
- `~0 << k` creates a mask with `1`s from `k`-th bit to MSB, and `0`s from `k-1`-th bit to LSB.
- `n & mask` keeps only the bits from `k` up to MSB.

### 7. Isolate the rightmost set bit
`n & (-n)`
- `-n` is equivalent to `~n + 1`.
- This operation results in a number with only the rightmost set bit of `n` as `1`, and all other bits `0`.
- Example: `n = 12 (01100_2)`
  `~n = 10011_2`
  `~n + 1 = 10100_2` (`-12` in 5-bit two's complement)
  `n & (-n) = 01100_2 & 10100_2 = 00100_2` (which is 4)

### 8. Clear the rightmost set bit (Brian Kernighan's Algorithm)
`n & (n - 1)`
- This operation effectively turns off the lowest (rightmost) set bit in `n`.
- This is fundamental for `countSetBits_BrianKernighan` and `isPowerOfTwo_Bitwise`.
- Example: `n = 12 (01100_2)`
  `n - 1 = 11 (01011_2)`
  `n & (n - 1) = 01100_2 & 01011_2 = 01000_2` (which is 8)

### 9. Check if a number is a power of two
`n > 0 && (n & (n - 1)) == 0`
- A positive integer is a power of two if and only if it has exactly one '1' bit in its binary representation.
- `n & (n - 1)` clears the rightmost set bit. If `n` has only one set bit, this operation will result in `0`.
- `n > 0` ensures that 0 and negative numbers are excluded, as they are not considered powers of two by convention.

### 10. XOR Swap
To swap two numbers `a` and `b` without using a temporary variable:
```java
a = a ^ b;
b = a ^ b; // b = (a ^ b) ^ b = a ^ (b ^ b) = a ^ 0 = a
a = a ^ b; // a = (a ^ b) ^ a = (a ^ a) ^ b = 0 ^ b = b
```
This is a classic trick, though often less readable than a temporary variable and might not offer significant performance benefits in modern compiled languages compared to its potential pitfalls (e.g., if `a` and `b` refer to the same memory location).

## Why Bit Manipulation?

- **Performance:** Bitwise operations are often very fast, as they directly correspond to hardware instructions.
- **Space Efficiency:** Can store multiple boolean flags in a single integer, or perform operations without auxiliary data structures (like XOR for `Single Number`).
- **Cryptographic Algorithms:** Many cryptographic functions heavily rely on bitwise operations.
- **Hashing Algorithms:** Similar to crypto, hash functions use bit mixing.
- **Graphics/Game Development:** Fast pixel manipulation, color blending, etc.
- **Embedded Systems/Hardware Interaction:** Directly interacting with hardware registers.

Understanding these fundamentals is crucial for solving many algorithmic problems elegantly and efficiently.
```