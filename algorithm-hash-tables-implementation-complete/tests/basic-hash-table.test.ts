```typescript
/**
 * @file tests/basic-hash-table.test.ts
 * @description Test suite for the custom HashTable implementation.
 */

import { HashTable } from '../src/main';
import { stringHashCode, numberHashCode, defaultEquality } from '../src/utils';

describe('HashTable', () => {
    let hashTable: HashTable<string, number>;

    beforeEach(() => {
        // Initialize with a small capacity to easily test resizing
        hashTable = new HashTable<string, number>(4);
    });

    // Test constructor and initial state
    test('should initialize with correct capacity and size', () => {
        expect(hashTable.size).toBe(0);
        // Capacity is private, but we can infer it or check after insertions
    });

    // Test set and get
    test('should correctly set and get values', () => {
        hashTable.set('key1', 10);
        expect(hashTable.get('key1')).toBe(10);
        expect(hashTable.size).toBe(1);

        hashTable.set('key2', 20);
        expect(hashTable.get('key2')).toBe(20);
        expect(hashTable.size).toBe(2);
    });

    test('should return undefined for non-existent keys', () => {
        hashTable.set('key1', 10);
        expect(hashTable.get('nonExistentKey')).toBeUndefined();
    });

    test('should update value for existing key', () => {
        hashTable.set('key1', 10);
        expect(hashTable.get('key1')).toBe(10);
        hashTable.set('key1', 100);
        expect(hashTable.get('key1')).toBe(100);
        expect(hashTable.size).toBe(1); // Size should not increase for update
    });

    // Test has
    test('should correctly report if a key exists', () => {
        hashTable.set('key1', 10);
        expect(hashTable.has('key1')).toBe(true);
        expect(hashTable.has('nonExistentKey')).toBe(false);
    });

    // Test delete
    test('should delete existing keys', () => {
        hashTable.set('key1', 10);
        hashTable.set('key2', 20);
        expect(hashTable.delete('key1')).toBe(true);
        expect(hashTable.get('key1')).toBeUndefined();
        expect(hashTable.size).toBe(1);
        expect(hashTable.has('key1')).toBe(false);

        expect(hashTable.delete('key2')).toBe(true);
        expect(hashTable.size).toBe(0);
    });

    test('should not delete non-existent keys', () => {
        hashTable.set('key1', 10);
        expect(hashTable.delete('nonExistentKey')).toBe(false);
        expect(hashTable.size).toBe(1);
    });

    // Test keys, values, entries
    test('should return all keys', () => {
        hashTable.set('a', 1);
        hashTable.set('b', 2);
        hashTable.set('c', 3);
        const keys = hashTable.keys();
        expect(keys).toEqual(expect.arrayContaining(['a', 'b', 'c']));
        expect(keys.length).toBe(3);
    });

    test('should return all values', () => {
        hashTable.set('a', 1);
        hashTable.set('b', 2);
        hashTable.set('c', 3);
        const values = hashTable.values();
        expect(values).toEqual(expect.arrayContaining([1, 2, 3]));
        expect(values.length).toBe(3);
    });

    test('should return all entries', () => {
        hashTable.set('a', 1);
        hashTable.set('b', 2);
        hashTable.set('c', 3);
        const entries = hashTable.entries();
        expect(entries).toEqual(expect.arrayContaining([['a', 1], ['b', 2], ['c', 3]]));
        expect(entries.length).toBe(3);
    });

    test('should return empty arrays for empty table', () => {
        expect(hashTable.keys()).toEqual([]);
        expect(hashTable.values()).toEqual([]);
        expect(hashTable.entries()).toEqual([]);
    });

    // Test collision resolution (implicit through different keys that might hash to same bucket)
    // The default hash functions might not always cause collisions easily,
    // so this test relies on the resizing behavior or specific hash function.
    test('should handle collisions by separate chaining', () => {
        // With a small capacity, collisions are more likely.
        // Let's rely on resizing to prove entries are not lost.
        hashTable.set('keyA', 1); // 0.25 load factor
        hashTable.set('keyB', 2); // 0.5 load factor
        hashTable.set('keyC', 3); // 0.75 load factor -> should trigger resize next set
        hashTable.set('keyD', 4); // 1.0 load factor, this will trigger resize
        expect(hashTable.size).toBe(4);
        expect(hashTable.get('keyA')).toBe(1);
        expect(hashTable.get('keyB')).toBe(2);
        expect(hashTable.get('keyC')).toBe(3);
        expect(hashTable.get('keyD')).toBe(4);

        // Add more elements, ensuring values are still correct
        hashTable.set('keyE', 5); // This should cause resize from 4 to 8 buckets
        expect(hashTable.size).toBe(5);
        expect(hashTable.get('keyA')).toBe(1);
        expect(hashTable.get('keyE')).toBe(5);
        expect(hashTable.keys().length).toBe(5);
    });


    // Test resizing
    test('should resize when load factor is exceeded', () => {
        // Initial capacity is 4. Threshold 0.75 means resize at size >= 4*0.75 = 3.
        hashTable.set('a', 1); // size 1
        hashTable.set('b', 2); // size 2
        hashTable.set('c', 3); // size 3. Next `set` should trigger resize.

        // Before resize check
        expect(hashTable.size).toBe(3);
        expect(hashTable.get('a')).toBe(1);

        hashTable.set('d', 4); // size 4, capacity should be 8 now
        expect(hashTable.size).toBe(4);
        expect(hashTable.get('a')).toBe(1);
        expect(hashTable.get('b')).toBe(2);
        expect(hashTable.get('c')).toBe(3);
        expect(hashTable.get('d')).toBe(4);

        hashTable.set('e', 5); // size 5
        expect(hashTable.size).toBe(5);
        expect(hashTable.get('e')).toBe(5);
    });

    // Test with different key types (numbers)
    test('should work with number keys using default number hash function', () => {
        const numHashTable = new HashTable<number, string>(4);
        numHashTable.set(1, 'one');
        numHashTable.set(101, 'one hundred one');
        expect(numHashTable.get(1)).toBe('one');
        expect(numHashTable.get(101)).toBe('one hundred one');
        expect(numHashTable.size).toBe(2);
        expect(numHashTable.has(1)).toBe(true);
        expect(numHashTable.delete(1)).toBe(true);
        expect(numHashTable.size).toBe(1);
        expect(numHashTable.get(1)).toBeUndefined();
    });

    // Test with custom hash and equality functions
    test('should work with custom hash and equality functions', () => {
        // Custom equality for case-insensitive string keys
        const caseInsensitiveEquality: EqualityFunction<string> = (a, b) => a.toLowerCase() === b.toLowerCase();
        const customHashTable = new HashTable<string, number>(4, stringHashCode, caseInsensitiveEquality);

        customHashTable.set('Apple', 10);
        expect(customHashTable.get('apple')).toBe(10);
        expect(customHashTable.get('APPLE')).toBe(10);
        expect(customHashTable.get('Apple')).toBe(10);
        expect(customHashTable.size).toBe(1);

        customHashTable.set('apple', 20); // Should update 'Apple'
        expect(customHashTable.get('APPLE')).toBe(20);
        expect(customHashTable.size).toBe(1);

        expect(customHashTable.delete('APPLE')).toBe(true);
        expect(customHashTable.size).toBe(0);
    });

    // Edge case: empty table operations
    test('should handle operations on an empty table gracefully', () => {
        expect(hashTable.size).toBe(0);
        expect(hashTable.get('any')).toBeUndefined();
        expect(hashTable.has('any')).toBe(false);
        expect(hashTable.delete('any')).toBe(false);
        expect(hashTable.keys()).toEqual([]);
        expect(hashTable.values()).toEqual([]);
        expect(hashTable.entries()).toEqual([]);
    });

    // Edge case: setting capacity to 1
    test('should work with a capacity of 1', () => {
        const singleBucketTable = new HashTable<string, number>(1);
        singleBucketTable.set('a', 1);
        expect(singleBucketTable.size).toBe(1);
        expect(singleBucketTable.get('a')).toBe(1);

        singleBucketTable.set('b', 2); // Should resize to 2
        expect(singleBucketTable.size).toBe(2);
        expect(singleBucketTable.get('a')).toBe(1);
        expect(singleBucketTable.get('b')).toBe(2);
    });

    // Edge case: capacity less than 1
    test('should throw error for capacity less than 1', () => {
        expect(() => new HashTable<string, number>(0)).toThrow("Capacity must be at least 1.");
        expect(() => new HashTable<string, number>(-5)).toThrow("Capacity must be at least 1.");
    });
});

```