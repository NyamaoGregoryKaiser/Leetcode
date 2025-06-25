```java
package com.example;

import java.util.Arrays;

public class BitManipulation {

    // Problem 1: Reverse Bits
    public int reverseBits(int n) {
        int reversed = 0;
        for (int i = 0; i < 32; i++) {
            reversed <<= 1;
            reversed |= (n >> i) & 1;
        }
        return reversed;
    }

    // Problem 2: Count Set Bits
    public int countSetBits(int n) {
        int count = 0;
        while (n > 0) {
            count += (n & 1);
            n >>= 1;
        }
        return count;
    }
    public int countSetBitsBuiltIn(int n){
        return Integer.bitCount(n);
    }


    // Problem 3: Find Two Non-Repeating Numbers
    public int[] findTwoNonRepeating(int[] nums) {
        int xor = 0;
        for (int num : nums) {
            xor ^= num;
        }
        int rightmostSetBit = xor & -xor; // Isolates the rightmost set bit
        int num1 = 0;
        int num2 = 0;
        for (int num : nums) {
            if ((num & rightmostSetBit) == 0) {
                num1 ^= num;
            } else {
                num2 ^= num;
            }
        }
        return new int[]{num1, num2};
    }

    // Problem 4: Single Number III (appears three times except for one)
    public int singleNumberIII(int[] nums) {
        int ones = 0, twos = 0;
        for (int num : nums) {
            ones = (ones ^ num) & ~twos;
            twos = (twos ^ num) & ~ones;
        }
        return ones;
    }


    // Problem 5: Power of Two
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}
```