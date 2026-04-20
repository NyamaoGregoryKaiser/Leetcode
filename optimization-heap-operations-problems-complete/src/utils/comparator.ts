```typescript
/**
 * Type definition for a comparison function.
 * It should return:
 * - a negative number if a < b
 * - a positive number if a > b
 * - 0 if a == b
 */
export type Comparator<T> = (a: T, b: T) => number;

/**
 * Default numeric comparison function.
 * Compares two numbers directly.
 * @param a The first number.
 * @param b The second number.
 * @returns a - b (standard ascending order).
 */
export function defaultCompare(a: number, b: number): number {
    return a - b;
}

/**
 * Creates a reversed comparator from an existing one.
 * Useful for switching between min-heap and max-heap behavior.
 * @param comparator The original comparator function.
 * @returns A new comparator that reverses the order of the original.
 */
export function reverseComparator<T>(comparator: Comparator<T>): Comparator<T> {
    return (a, b) => comparator(b, a);
}
```