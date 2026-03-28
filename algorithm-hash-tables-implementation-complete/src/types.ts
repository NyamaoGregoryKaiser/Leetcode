```typescript
/**
 * @file types.ts
 * @description Defines common types used across the project,
 * particularly for the custom HashTable implementation.
 */

/**
 * Type for a generic hash function.
 * Takes a key of type K and returns a number (hash code).
 */
export type HashCodeFunction<K> = (key: K) => number;

/**
 * Type for an equality check function.
 * Used in collision resolution to compare keys.
 */
export type EqualityFunction<K> = (a: K, b: K) => boolean;

/**
 * Interface for a basic Node in a singly linked list.
 */
export interface Node<T> {
    value: T;
    next: Node<T> | null;
}

/**
 * Interface for a custom HashTable implementation.
 * Used to define the public API.
 */
export interface IHashTable<K, V> {
    size: number;
    set(key: K, value: V): void;
    get(key: K): V | undefined;
    delete(key: K): boolean;
    has(key: K): boolean;
    keys(): K[];
    values(): V[];
    entries(): [K, V][];
}
```