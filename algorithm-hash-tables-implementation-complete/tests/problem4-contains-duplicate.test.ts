```typescript
/**
 * @file tests/problem4-contains-duplicate.test.ts
 * @description Test suite for the Contains Duplicate problem.
 */

import { containsDuplicate } from '../src/main';

describe('Contains Duplicate', () => {
    test('should return true when duplicates exist', () => {
        const nums1 = [1, 2, 3, 1];
        expect(containsDuplicate(nums1)).toBe(true);

        const nums2 = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2];
        expect(containsDuplicate(nums2)).toBe(true);
    });

    test('should return false when all elements are distinct', () => {
        const nums1 = [1, 2, 3, 4];
        expect(containsDuplicate(nums1)).toBe(false);

        const nums2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(containsDuplicate(nums2)).toBe(false);
    });

    test('should return false for an empty array', () => {
        const nums: number[] = [];
        expect(containsDuplicate(nums)).toBe(false);
    });

    test('should return false for a single element array', () => {
        const nums = [1];
        expect(containsDuplicate(nums)).toBe(false);
    });

    test('should handle negative numbers', () => {
        const nums1 = [-1, -2, -3, -1];
        expect(containsDuplicate(nums1)).toBe(true);

        const nums2 = [-5, -4, -3, -2, -1];
        expect(containsDuplicate(nums2)).toBe(false);
    });

    test('should handle zero', () => {
        const nums1 = [0, 1, 2, 0];
        expect(containsDuplicate(nums1)).toBe(true);

        const nums2 = [0, 1, -1];
        expect(containsDuplicate(nums2)).toBe(false);
    });

    test('should handle large numbers', () => {
        const nums1 = [1000000000, 2000000000, 1000000000];
        expect(containsDuplicate(nums1)).toBe(true);

        const nums2 = [123456789, 987654321];
        expect(containsDuplicate(nums2)).toBe(false);
    });
});
```