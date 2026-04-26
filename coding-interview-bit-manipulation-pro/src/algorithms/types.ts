```typescript
/**
 * @file types.ts
 * @description Defines common interfaces and types used across the bit manipulation algorithms.
 */

/**
 * Interface for a generic bit manipulation problem solution.
 * This can be extended for specific problems if needed.
 */
export interface BitManipulationSolution<TInput, TOutput> {
    (input: TInput): TOutput;
}

/**
 * Interface for a solution with a descriptive name.
 */
export interface NamedSolution<TInput, TOutput> {
    name: string;
    solve: BitManipulationSolution<TInput, TOutput>;
}

/**
 * Type for a 32-bit unsigned integer, common in bit manipulation problems.
 */
export type UInt32 = number;

/**
 * Type for a number (can be signed or unsigned).
 */
export type NumberInput = number;
```