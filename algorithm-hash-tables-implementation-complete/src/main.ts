```typescript
/**
 * @file main.ts
 * @description Main file containing the custom HashTable implementation and solutions
 * to various classic Hash Table-related interview problems.
 * Each problem includes optimal solutions, detailed comments, and complexity analysis.
 */

import { IHashTable, HashCodeFunction, EqualityFunction } from './types';
import { SinglyLinkedList, stringHashCode, numberHashCode, defaultEquality, getAnagramKey } from './utils';

// --- Custom Hash Table Implementation ---

/**
 * A basic custom HashTable implementation using separate chaining for collision resolution.
 * It supports generic keys (K) and values (V).
 * Features: dynamic resizing, custom hash and equality functions.
 * @template K The type of the keys in the hash table.
 * @template V The type of the values in the hash table.
 */
export class HashTable<K, V> implements IHashTable<K, V> {
    // Default initial capacity for the hash table buckets.
    private static readonly DEFAULT_CAPACITY = 16;
    // Load factor threshold for triggering a resize.
    private static readonly DEFAULT_LOAD_FACTOR_THRESHOLD = 0.75;
    // Factor by which the capacity is increased during resize.
    private static readonly RESIZE_FACTOR = 2;

    // Array of SinglyLinkedLists, each representing a bucket for collision resolution.
    private _buckets: SinglyLinkedList<[K, V]>[];
    // Current number of key-value pairs stored in the hash table.
    private _size: number;
    // Current capacity (number of buckets) of the hash table.
    private _capacity: number;
    // Custom hash function to convert keys to a numeric hash code.
    private _hashFunction: HashCodeFunction<K>;
    // Custom equality function to compare keys, important for collision resolution within a bucket.
    private _equalityFunction: EqualityFunction<K>;

    /**
     * Creates an instance of HashTable.
     * @param capacity Initial number of buckets.
     * @param hashFunction Optional custom hash function. Defaults to `stringHashCode` for strings, `numberHashCode` for numbers.
     * @param equalityFunction Optional custom equality function for keys. Defaults to strict equality `===`.
     */
    constructor(
        capacity: number = HashTable.DEFAULT_CAPACITY,
        hashFunction?: HashCodeFunction<K>,
        equalityFunction: EqualityFunction<K> = defaultEquality
    ) {
        if (capacity < 1) {
            throw new Error("Capacity must be at least 1.");
        }
        this._capacity = capacity;
        this._buckets = Array.from({ length: this._capacity }, () => new SinglyLinkedList());
        this._size = 0;
        this._equalityFunction = equalityFunction;

        // Determine default hash function based on common key types if not provided
        if (hashFunction) {
            this._hashFunction = hashFunction;
        } else {
            // This is a heuristic and might need to be more robust for complex types.
            // For general K, a custom hash function should be provided.
            this._hashFunction = (key: K) => {
                if (typeof key === 'string') {
                    return stringHashCode(key as any);
                }
                if (typeof key === 'number') {
                    return numberHashCode(key as any);
                }
                // Fallback for other types: convert to string and hash.
                // This might not be optimal for object equality.
                return stringHashCode(String(key));
            };
        }
    }

    /**
     * Returns the number of key-value pairs in the hash table.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    get size(): number {
        return this._size;
    }

    /**
     * Calculates the bucket index for a given key.
     * It uses the custom hash function and then applies modulo capacity to get an index within bounds.
     * @param key The key to hash.
     * @returns The index of the bucket for the key.
     * Time Complexity: O(L) where L is key length (if hash function depends on key length, e.g., string hashing). O(1) for primitive types.
     * Space Complexity: O(1)
     */
    private _getIndex(key: K): number {
        const hashCode = this._hashFunction(key);
        // Ensure the index is non-negative and within capacity.
        return (hashCode & 0x7fffffff) % this._capacity; // Mask to ensure positive result
    }

    /**
     * Resizes the hash table when the load factor exceeds the threshold.
     * It creates a new, larger array of buckets and rehashes all existing entries.
     * Time Complexity: O(N) where N is the number of elements in the hash table (must rehash all).
     * Space Complexity: O(N) for temporarily storing old entries and new buckets.
     */
    private _resize(): void {
        const oldEntries = this.entries(); // Get all existing entries
        this._capacity *= HashTable.RESIZE_FACTOR; // Double capacity
        this._buckets = Array.from({ length: this._capacity }, () => new SinglyLinkedList()); // Create new buckets
        this._size = 0; // Reset size, will be incremented by 'set'

        // Rehash all old entries into the new buckets
        for (const [key, value] of oldEntries) {
            this.set(key, value);
        }
    }

    /**
     * Inserts or updates a key-value pair in the hash table.
     * If the key already exists, its value is updated.
     * If the load factor exceeds the threshold after insertion, the table is resized.
     * @param key The key to insert or update.
     * @param value The value associated with the key.
     * Time Complexity: Average O(1), Worst O(N) (due to collisions or resize).
     * Space Complexity: O(1) (amortized for resize).
     */
    set(key: K, value: V): void {
        // Check load factor before insertion. If current size / capacity exceeds threshold, resize.
        // This is a common strategy; alternatively, check *after* insertion.
        // Checking before ensures that the new element won't immediately push it over after a resize.
        if (this._size / this._capacity >= HashTable.DEFAULT_LOAD_FACTOR_THRESHOLD) {
            this._resize();
        }

        const index = this._getIndex(key);
        const bucket = this._buckets[index];

        // Try to find the key in the linked list (bucket)
        let found = false;
        bucket.find((entry: [K, V]) => {
            if (this._equalityFunction(entry[0], key)) {
                entry[1] = value; // Update existing value
                found = true;
                return true;
            }
            return false;
        });

        // If key not found, add new entry to the bucket
        if (!found) {
            bucket.prepend([key, value]);
            this._size++;
        }
    }

    /**
     * Retrieves the value associated with a given key.
     * @param key The key to look up.
     * @returns The value associated with the key, or `undefined` if the key is not found.
     * Time Complexity: Average O(1), Worst O(N) (due to collisions in a single long chain).
     * Space Complexity: O(1)
     */
    get(key: K): V | undefined {
        const index = this._getIndex(key);
        const bucket = this._buckets[index];

        const entry = bucket.find((entry: [K, V]) => this._equalityFunction(entry[0], key));
        return entry ? entry[1] : undefined;
    }

    /**
     * Deletes a key-value pair from the hash table.
     * @param key The key to delete.
     * @returns `true` if the key was found and deleted, `false` otherwise.
     * Time Complexity: Average O(1), Worst O(N) (due to collisions).
     * Space Complexity: O(1)
     */
    delete(key: K): boolean {
        const index = this._getIndex(key);
        const bucket = this._buckets[index];

        const wasDeleted = bucket.delete((entry: [K, V]) => this._equalityFunction(entry[0], key));

        if (wasDeleted) {
            this._size--;
        }
        return wasDeleted;
    }

    /**
     * Checks if a key exists in the hash table.
     * @param key The key to check for existence.
     * @returns `true` if the key exists, `false` otherwise.
     * Time Complexity: Average O(1), Worst O(N) (due to collisions).
     * Space Complexity: O(1)
     */
    has(key: K): boolean {
        return this.get(key) !== undefined;
    }

    /**
     * Returns an array of all keys present in the hash table.
     * @returns An array of keys.
     * Time Complexity: O(N) where N is the number of elements (must iterate all buckets and chains).
     * Space Complexity: O(N) for the new array of keys.
     */
    keys(): K[] {
        const allKeys: K[] = [];
        for (const bucket of this._buckets) {
            for (const [key, _] of bucket.toArray()) {
                allKeys.push(key);
            }
        }
        return allKeys;
    }

    /**
     * Returns an array of all values present in the hash table.
     * @returns An array of values.
     * Time Complexity: O(N) where N is the number of elements.
     * Space Complexity: O(N) for the new array of values.
     */
    values(): V[] {
        const allValues: V[] = [];
        for (const bucket of this._buckets) {
            for (const [_, value] of bucket.toArray()) {
                allValues.push(value);
            }
        }
        return allValues;
    }

    /**
     * Returns an array of all key-value pairs (entries) present in the hash table.
     * @returns An array of `[K, V]` tuples.
     * Time Complexity: O(N) where N is the number of elements.
     * Space Complexity: O(N) for the new array of entries.
     */
    entries(): [K, V][] {
        const allEntries: [K, V][] = [];
        for (const bucket of this._buckets) {
            allEntries.push(...bucket.toArray());
        }
        return allEntries;
    }
}

// --- Hash Table Interview Problems ---

/**
 * Problem 1: Two Sum
 * Given an array of integers `nums` and an integer `target`,
 * return indices of the two numbers such that they add up to `target`.
 * You may assume that each input would have exactly one solution,
 * and you may not use the same element twice.
 *
 * @param nums The array of integers.
 * @param target The target sum.
 * @returns An array `[index1, index2]` of the two indices, or `[]` if no solution (though problem states exactly one).
 */
export function twoSum(nums: number[], target: number): number[] {
    /**
     * Optimal Approach: Using a Hash Map (Map in JavaScript/TypeScript)
     *
     * Logic:
     * Iterate through the array `nums`. For each number `num` at index `i`:
     * 1. Calculate the `complement` needed: `complement = target - num`.
     * 2. Check if this `complement` already exists in our hash map.
     *    - If it does, we've found our pair! The current `i` and the index stored
     *      against the `complement` in the map are the answer.
     *    - If it doesn't, add the current `num` and its index `i` to the map.
     *      We do this because `num` might be the complement for a future number.
     *
     * Why this works: The hash map provides O(1) average time complexity for lookups.
     * As we iterate, we're effectively asking: "Have I seen a number before that,
     * when added to my current number, equals the target?"
     *
     * Time Complexity: O(N)
     *   - We iterate through the array once.
     *   - Each map operation (insertion, lookup) takes O(1) on average.
     *   - In worst case (all elements hash to same bucket), map operations could be O(N),
     *     making total O(N^2), but this is rare with good hash functions.
     * Space Complexity: O(N)
     *   - In the worst case, all numbers might be stored in the hash map (e.g., no pair found until the very end).
     */
    const numMap = new Map<number, number>(); // Stores {number: index}

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const complement = target - num;

        // Check if the complement exists in the map
        if (numMap.has(complement)) {
            // Found the pair! Return their indices.
            return [numMap.get(complement)!, i];
        }

        // If not found, add the current number and its index to the map
        // for future lookups.
        numMap.set(num, i);
    }

    // According to problem statement, there's always exactly one solution,
    // so this line should ideally not be reached.
    return [];
}

/**
 * Problem 2: Longest Consecutive Sequence
 * Given an unsorted array of integers `nums`, return the length of the longest
 * consecutive elements sequence.
 * You must write an algorithm that runs in O(N) time.
 *
 * @param nums The array of integers.
 * @returns The length of the longest consecutive sequence.
 */
export function longestConsecutiveSequence(nums: number[]): number {
    /**
     * Optimal Approach: Using a Hash Set (Set in JavaScript/TypeScript)
     *
     * Logic:
     * 1. Put all numbers from `nums` into a `Set`. This allows O(1) average time complexity for lookups.
     * 2. Iterate through each number `num` in the original `nums` array (or iterate through the set, effectively the same).
     * 3. For each `num`, check if it's the *start* of a sequence. A number `num` is the start of a sequence
     *    if `num - 1` is NOT present in the set.
     * 4. If `num` IS the start of a sequence:
     *    - Start building the current sequence: `currentNum = num`, `currentStreak = 1`.
     *    - While `currentNum + 1` is present in the set:
     *      - Increment `currentNum`.
     *      - Increment `currentStreak`.
     *    - Update the `longestStreak` found so far: `longestStreak = Math.max(longestStreak, currentStreak)`.
     *
     * Why this works:
     *   - By storing numbers in a Set, we get efficient O(1) lookups for `num - 1` and `num + 1`.
     *   - The crucial optimization is skipping numbers that are NOT the start of a sequence.
     *     If `num - 1` exists in the set, it means `num` is part of a longer sequence that starts at `num - 1` (or even earlier).
     *     We only need to start counting from the true beginning of each sequence.
     *     This ensures each number is visited at most twice: once when added to the set, and once when it's part of a
     *     `while` loop increment (but only if its `num-1` wasn't found, effectively checking each *sequence* start once).
     *
     * Time Complexity: O(N)
     *   - Populating the set: O(N).
     *   - Iterating through numbers: O(N).
     *   - Inside the loop, `set.has()` is O(1) average.
     *   - The inner `while` loop might seem like O(N^2) if not careful, but each number `num` is checked
     *     for `num-1` once, and then `num+1`, `num+2`... only if it's the start of a sequence.
     *     Overall, each number is visited by `set.has()` at most a constant number of times across all `while` loops combined.
     * Space Complexity: O(N)
     *   - To store all unique numbers in the set.
     */
    if (nums.length === 0) {
        return 0;
    }

    const numSet = new Set<number>(nums); // O(N) to build

    let longestStreak = 0;

    for (const num of numSet) { // Iterate over unique numbers in the set for efficiency
        // Check if the current number is the start of a sequence
        // (i.e., num - 1 is not in the set)
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            // Increment currentNum and currentStreak as long as consecutive numbers exist
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            // Update the longest streak found so far
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }

    return longestStreak;
}

/**
 * Problem 3: Group Anagrams
 * Given an array of strings `strs`, group the anagrams together.
 * You can return the answer in any order.
 * An Anagram is a word or phrase formed by rearranging the letters of a different
 * word or phrase, typically using all the original letters exactly once.
 *
 * @param strs The array of strings.
 * @returns A 2D array of strings where each inner array contains anagrams.
 */
export function groupAnagrams(strs: string[]): string[][] {
    /**
     * Optimal Approach: Using a Hash Map (Map in JavaScript/TypeScript)
     *
     * Logic:
     * 1. Create a `Map` where the key is a "canonical" representation of an anagram,
     *    and the value is an array of strings that are anagrams of each other.
     * 2. Iterate through each string `s` in the input array `strs`.
     * 3. For each string `s`, generate its canonical key. The most common way to do this
     *    is to sort the characters of the string alphabetically. For example, "eat" -> "aet", "tea" -> "aet".
     * 4. Use this canonical key to store the string in the map:
     *    - If the key already exists in the map, append the current string `s` to its associated list of strings.
     *    - If the key does not exist, create a new entry in the map with the key and a new list containing just `s`.
     * 5. After iterating through all strings, the values of the map will be the grouped anagrams.
     *
     * Why this works: All anagrams will produce the exact same canonical key.
     * The hash map provides O(1) average time complexity for storing and retrieving lists based on these keys.
     *
     * Time Complexity: O(N * L log L)
     *   - N: number of strings in `strs`.
     *   - L: average length of a string.
     *   - For each string, we sort its characters to create the key: O(L log L).
     *   - Map operations (get, set) are O(1) on average after key generation.
     *   - Total: N iterations * (L log L for sorting + 1 for map operation) = O(N * L log L).
     * Space Complexity: O(N * L)
     *   - In the worst case, if no two strings are anagrams, the map will store N entries,
     *     and each string of length L will be stored.
     */
    const anagramMap = new Map<string, string[]>(); // Stores {sorted_string: [original_string, ...]}

    for (const s of strs) {
        // Generate the canonical key by sorting the string's characters.
        // Helper function `getAnagramKey` in utils.ts can be used here.
        const key = getAnagramKey(s);

        // Retrieve the list of anagrams for this key, or create a new empty list.
        const currentGroup = anagramMap.get(key) || [];

        // Add the current string to its group.
        currentGroup.push(s);

        // Update the map with the modified group.
        anagramMap.set(key, currentGroup);
    }

    // The values of the map are the desired groups of anagrams.
    return Array.from(anagramMap.values());
}

/**
 * Problem 4: Contains Duplicate
 * Given an integer array `nums`, return `true` if any value appears at least twice in the array,
 * and return `false` if every element is distinct.
 *
 * @param nums The array of integers.
 * @returns `true` if duplicates exist, `false` otherwise.
 */
export function containsDuplicate(nums: number[]): boolean {
    /**
     * Optimal Approach: Using a Hash Set (Set in JavaScript/TypeScript)
     *
     * Logic:
     * 1. Create an empty `Set` to store numbers encountered so far.
     * 2. Iterate through each number `num` in the input array `nums`.
     * 3. For each `num`:
     *    - Check if `num` is already present in the `Set`.
     *    - If `num` IS present, it means we've encountered this number before, so a duplicate exists. Return `true`.
     *    - If `num` is NOT present, add it to the `Set` and continue.
     * 4. If the loop completes without finding any duplicates, return `false`.
     *
     * Why this works: A `Set` stores only unique values. Its `has()` and `add()` operations
     * provide O(1) average time complexity. This allows us to quickly check for previously seen numbers.
     *
     * Time Complexity: O(N)
     *   - We iterate through the array once.
     *   - Each `set.has()` and `set.add()` operation takes O(1) on average.
     * Space Complexity: O(N)
     *   - In the worst case (no duplicates), all unique numbers from `nums` will be stored in the `Set`.
     */
    const seenNumbers = new Set<number>(); // Stores unique numbers encountered

    for (const num of nums) {
        // If the number is already in the set, it's a duplicate.
        if (seenNumbers.has(num)) {
            return true;
        }
        // Otherwise, add it to the set.
        seenNumbers.add(num);
    }

    // If the loop finishes, no duplicates were found.
    return false;
}

/**
 * Example usage of the custom HashTable and problem solutions.
 * This function will be executed when running `npm start`.
 */
export function runExamples(): void {
    console.log("--- Running Hash Table Examples ---");

    // --- Custom HashTable Example ---
    console.log("\n--- Custom HashTable Usage ---");
    const myTable = new HashTable<string, number>(4); // Small capacity for demonstration

    myTable.set("apple", 10);
    myTable.set("banana", 20);
    myTable.set("cherry", 30);
    myTable.set("date", 40);
    myTable.set("elderberry", 50); // Should trigger a resize

    console.log(`Size: ${myTable.size}`); // Expected: 5
    console.log(`Get 'apple': ${myTable.get("apple")}`); // Expected: 10
    console.log(`Get 'grape': ${myTable.get("grape")}`); // Expected: undefined

    myTable.set("apple", 100); // Update
    console.log(`Updated 'apple': ${myTable.get("apple")}`); // Expected: 100

    console.log(`Has 'banana': ${myTable.has("banana")}`); // Expected: true
    console.log(`Has 'fig': ${myTable.has("fig")}`);       // Expected: false

    console.log(`Keys: ${myTable.keys().join(', ')}`);
    console.log(`Values: ${myTable.values().join(', ')}`);
    console.log(`Entries: ${JSON.stringify(myTable.entries())}`);

    myTable.delete("cherry");
    console.log(`Size after deleting 'cherry': ${myTable.size}`); // Expected: 4
    console.log(`Get 'cherry': ${myTable.get("cherry")}`); // Expected: undefined
    console.log(`Keys after deleting 'cherry': ${myTable.keys().join(', ')}`);

    // --- Problem Solutions Example ---
    console.log("\n--- Problem Solutions Usage ---");

    // Two Sum
    const nums1 = [2, 7, 11, 15];
    const target1 = 9;
    console.log(`Two Sum for [${nums1}] and target ${target1}: ${twoSum(nums1, target1)}`); // Expected: [0, 1]

    const nums2 = [3, 2, 4];
    const target2 = 6;
    console.log(`Two Sum for [${nums2}] and target ${target2}: ${twoSum(nums2, target2)}`); // Expected: [1, 2]

    // Longest Consecutive Sequence
    const numsLCS1 = [100, 4, 200, 1, 3, 2];
    console.log(`Longest Consecutive Sequence for [${numsLCS1}]: ${longestConsecutiveSequence(numsLCS1)}`); // Expected: 4 (1, 2, 3, 4)

    const numsLCS2 = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
    console.log(`Longest Consecutive Sequence for [${numsLCS2}]: ${longestConsecutiveSequence(numsLCS2)}`); // Expected: 9 (0, 1, 2, 3, 4, 5, 6, 7, 8)

    const numsLCS3: number[] = [];
    console.log(`Longest Consecutive Sequence for [${numsLCS3}]: ${longestConsecutiveSequence(numsLCS3)}`); // Expected: 0

    // Group Anagrams
    const strsGA1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
    console.log(`Group Anagrams for [${strsGA1}]: ${JSON.stringify(groupAnagrams(strsGA1))}`);
    // Expected: [["eat","tea","ate"],["tan","nat"],["bat"]] (order of inner/outer arrays may vary)

    const strsGA2 = ["a"];
    console.log(`Group Anagrams for [${strsGA2}]: ${JSON.stringify(groupAnagrams(strsGA2))}`); // Expected: [["a"]]

    const strsGA3 = [""];
    console.log(`Group Anagrams for [${strsGA3}]: ${JSON.stringify(groupAnagrams(strsGA3))}`); // Expected: [[""]]

    // Contains Duplicate
    const numsCD1 = [1, 2, 3, 1];
    console.log(`Contains Duplicate for [${numsCD1}]: ${containsDuplicate(numsCD1)}`); // Expected: true

    const numsCD2 = [1, 2, 3, 4];
    console.log(`Contains Duplicate for [${numsCD2}]: ${containsDuplicate(numsCD2)}`); // Expected: false

    const numsCD3 = [];
    console.log(`Contains Duplicate for [${numsCD3}]: ${containsDuplicate(numsCD3)}`); // Expected: false
}

// Automatically run examples when the script is executed directly
if (require.main === module) {
    runExamples();
}
```