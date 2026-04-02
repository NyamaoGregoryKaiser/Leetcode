```typescript
/**
 * @fileoverview Main entry point for the array-manipulation-project.
 * Exports all implemented algorithms for easy access.
 */

// Export optimal solutions
export { rotateArray, productExceptSelf, mergeIntervals, trapRainWater } from './algorithms/array-manipulation';

// Export brute-force/alternative solutions
export {
    rotateArrayBruteForce,
    productExceptSelfBruteForceWithDivision,
    mergeIntervalsBruteForce,
    trapRainWaterDP,
} from './algorithms/brute-force-solutions';

// Export utility functions
export {
    swap,
    reverseSubarray,
    generateUniqueRandomArray,
    generateSortedRandomArray,
    deepCloneArray,
} from './utils/array-helpers';
```