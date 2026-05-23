```javascript
/**
 * @fileoverview Test suite for Product of Array Except Self problem.
 * Uses Jest for testing various approaches.
 */

const {
    productExceptSelf_division,
    productExceptSelf_twoPass
} = require('../src/problems/productExceptSelf');

describe('Product Except Self - Using Division (if allowed)', () => {
    test('should return correct products for positive numbers', () => {
        expect(productExceptSelf_division([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
    });

    test('should return correct products for negative numbers', () => {
        expect(productExceptSelf_division([-1, -2, -3])).toEqual([6, 3, 2]);
    });

    test('should handle array with zero', () => {
        expect(productExceptSelf_division([1, 2, 0, 4])).toEqual([0, 0, 8, 0]);
    });

    test('should handle array with multiple zeros', () => {
        expect(productExceptSelf_division([1, 0, 3, 0])).toEqual([0, 0, 0, 0]);
    });

    test('should handle array with all zeros', () => {
        expect(productExceptSelf_division([0, 0, 0])).toEqual([0, 0, 0]);
    });

    test('should handle array with mixed positive, negative, and zero', () => {
        expect(productExceptSelf_division([-1, 1, 0, -3, 3])).toEqual([0, 0, 9, 0, 0]);
    });

    test('should handle two elements', () => {
        expect(productExceptSelf_division([1, 2])).toEqual([2, 1]);
    });
});

describe('Product Except Self - Two-Pass (Optimal, No Division)', () => {
    test('should return correct products for positive numbers', () => {
        expect(productExceptSelf_twoPass([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
    });

    test('should return correct products for negative numbers', () => {
        expect(productExceptSelf_twoPass([-1, -2, -3])).toEqual([6, 3, 2]);
    });

    test('should handle array with zero', () => {
        // This solution assumes no zeros or handles them implicitly.
        // The problem statement guarantees 'product of any prefix or suffix... fits in 32-bit integer'.
        // For productExceptSelf, if there's a zero, the logic changes.
        // The *optimal* solution given (`productExceptSelf_twoPass`) inherently works for zeros as well.
        // Example: nums = [1, 2, 0, 4]
        // Left Pass: [1, 1, 2, 0]
        // Right Pass:
        // i=3: answer[3]=0, rightProduct=4. answer = [1,1,2,0]
        // i=2: answer[2]=2 * 4 = 8. rightProduct=4*0=0. answer = [1,1,8,0]
        // i=1: answer[1]=1 * 0 = 0. rightProduct=0*2=0. answer = [1,0,8,0]
        // i=0: answer[0]=1 * 0 = 0. rightProduct=0*1=0. answer = [0,0,8,0]
        expect(productExceptSelf_twoPass([1, 2, 0, 4])).toEqual([0, 0, 8, 0]);
    });

    test('should handle array with multiple zeros', () => {
        // Example: nums = [1, 0, 3, 0]
        // Left Pass: [1, 1, 0, 0]
        // Right Pass:
        // i=3: answer[3]=0, rightProduct=0. answer = [1,1,0,0]
        // i=2: answer[2]=0 * 0 = 0. rightProduct=0*3=0. answer = [1,1,0,0]
        // i=1: answer[1]=1 * 0 = 0. rightProduct=0*0=0. answer = [1,0,0,0]
        // i=0: answer[0]=1 * 0 = 0. rightProduct=0*1=0. answer = [0,0,0,0]
        expect(productExceptSelf_twoPass([1, 0, 3, 0])).toEqual([0, 0, 0, 0]);
    });

    test('should handle array with all zeros', () => {
        expect(productExceptSelf_twoPass([0, 0, 0])).toEqual([0, 0, 0]);
    });

    test('should handle array with mixed positive, negative, and zero', () => {
        expect(productExceptSelf_twoPass([-1, 1, 0, -3, 3])).toEqual([0, 0, 9, 0, 0]);
    });

    test('should handle two elements', () => {
        expect(productExceptSelf_twoPass([1, 2])).toEqual([2, 1]);
    });

    test('should handle a larger array', () => {
        expect(productExceptSelf_twoPass([2, 3, 4, 5, 6])).toEqual([360, 240, 180, 144, 120]);
    });
});
```