# Bit Manipulation Algorithms: Detailed Documentation

This document provides detailed explanations, diagrams, edge cases, and interview tips for each bit manipulation algorithm implemented in this project.


## 1. Count Set Bits

**Algorithm Explanation:**

This algorithm counts the number of bits that are set to 1 in the binary representation of a given integer.  The iterative approach uses a bitwise AND operation (`&`) to check the least significant bit and a right-shift operation (`>>`) to move to the next bit.

**Time Complexity:** O(log n) - because we iterate through the bits, and the number of bits is proportional to the logarithm of the number.
**Space Complexity:** O(1) - constant extra space.

**Diagram:**

```
  n = 13 (1101)
  count = 0

  Iteration 1: 13 & 1 = 1, count = 1, n = 6 (110)
  Iteration 2: 6 & 1 = 0, count = 1, n = 3 (11)
  Iteration 3: 3 & 1 = 1, count = 2, n = 1 (1)
  Iteration 4: 1 & 1 = 1, count = 3, n = 0

  Result: 3 set bits
```

**Edge Cases:**

* `n = 0`: The number of set bits is 0.
* `n = -1`:  (In two's complement representation) all bits will be 1. Special care may be needed depending on your system's behavior on negative numbers.


## 2. Reverse Bits

**(Add similar documentation for other algorithms)**