```java
package com.hashtableproject.utils;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Objects;

/**
 * A basic custom implementation of a Hash Table (HashMap) using separate chaining.
 * This class demonstrates the fundamental principles of hash tables, including
 * hashing, collision resolution (linked lists), and dynamic resizing.
 *
 * @param <K> the type of keys maintained by this map
 * @param <V> the type of mapped values
 */
public class CustomHashTable<K, V> {

    // --- Entry Class ---
    /**
     * Represents a key-value pair stored in the hash table.
     */
    private static class Entry<K, V> {
        K key;
        V value;
        // Optionally, one could include a pointer to the next entry for linked list implementation
        // directly within Entry, but using java.util.LinkedList is simpler for this example.

        public Entry(K key, V value) {
            this.key = key;
            this.value = value;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Entry<?, ?> entry = (Entry<?, ?>) o;
            return Objects.equals(key, entry.key) && Objects.equals(value, entry.value);
        }

        @Override
        public int hashCode() {
            return Objects.hash(key, value);
        }

        @Override
        public String toString() {
            return "{" + key + "=" + value + '}';
        }
    }
    // --- End Entry Class ---

    // --- Hash Table Fields ---
    private static final int DEFAULT_CAPACITY = 16;
    private static final float DEFAULT_LOAD_FACTOR = 0.75f;

    private ArrayList<LinkedList<Entry<K, V>>> buckets; // Array of linked lists (buckets)
    private int size;                                  // Current number of key-value pairs
    private int capacity;                              // Current number of buckets
    private float loadFactor;                          // Threshold for resizing
    private int threshold;                             // (capacity * loadFactor)

    // --- Constructors ---
    /**
     * Constructs an empty CustomHashTable with the default initial capacity (16)
     * and load factor (0.75).
     */
    public CustomHashTable() {
        this(DEFAULT_CAPACITY, DEFAULT_LOAD_FACTOR);
    }

    /**
     * Constructs an empty CustomHashTable with the specified initial capacity
     * and default load factor (0.75).
     *
     * @param initialCapacity the initial capacity of the hash table
     * @throws IllegalArgumentException if the initial capacity is negative
     */
    public CustomHashTable(int initialCapacity) {
        this(initialCapacity, DEFAULT_LOAD_FACTOR);
    }

    /**
     * Constructs an empty CustomHashTable with the specified initial capacity
     * and load factor.
     *
     * @param initialCapacity the initial capacity of the hash table
     * @param loadFactor      the load factor threshold for resizing
     * @throws IllegalArgumentException if the initial capacity is negative or
     *                                  the load factor is non-positive
     */
    public CustomHashTable(int initialCapacity, float loadFactor) {
        if (initialCapacity < 0) {
            throw new IllegalArgumentException("Initial capacity cannot be negative: " + initialCapacity);
        }
        if (loadFactor <= 0 || Float.isNaN(loadFactor)) {
            throw new IllegalArgumentException("Load factor must be positive: " + loadFactor);
        }

        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.threshold = (int) (this.capacity * this.loadFactor);
        initBuckets(this.capacity);
    }

    // --- Private Helper Methods ---
    /**
     * Initializes the bucket array with empty linked lists.
     * @param currentCapacity The capacity for which to initialize buckets.
     */
    private void initBuckets(int currentCapacity) {
        buckets = new ArrayList<>(currentCapacity);
        for (int i = 0; i < currentCapacity; i++) {
            buckets.add(new LinkedList<>());
        }
    }

    /**
     * Computes the bucket index for a given key.
     * This uses the key's hashCode() and then applies a modulo operation
     * to ensure the index is within the current capacity.
     *
     * @param key the key to hash
     * @return the index of the bucket
     */
    private int getBucketIndex(K key) {
        // Handle null keys by assigning a consistent hash code, e.g., 0.
        // java.util.HashMap puts null key at bucket 0 and handles it specially.
        // For simplicity, we'll assume non-null keys for basic implementation or handle it as follows:
        if (key == null) {
            return 0; // null keys often map to bucket 0 in standard HashMaps.
        }
        // Ensure non-negative hash code and distribute it better before modulo.
        // A common technique is to XOR the hash code with its right-shifted value
        // to mix higher bits into lower bits, reducing collisions for poor hash functions.
        int hash = key.hashCode();
        hash = hash ^ (hash >>> 16); // This is a simplified version of HashMap's `hash()` function
        return Math.abs(hash) % capacity;
    }

    /**
     * Resizes the hash table when the load factor threshold is exceeded.
     * Doubles the capacity and re-hashes all existing entries into the new buckets.
     */
    private void resize() {
        int oldCapacity = capacity;
        capacity *= 2; // Double the capacity
        threshold = (int) (capacity * loadFactor);

        ArrayList<LinkedList<Entry<K, V>>> oldBuckets = buckets;
        initBuckets(capacity); // Initialize new, larger buckets

        size = 0; // Reset size, as put() will increment it

        // Re-hash all existing entries from old buckets into new buckets
        for (LinkedList<Entry<K, V>> bucket : oldBuckets) {
            for (Entry<K, V> entry : bucket) {
                put(entry.key, entry.value); // Re-inserting will use the new capacity
            }
        }
        System.out.println("Resized hash table from capacity " + oldCapacity + " to " + capacity);
    }

    // --- Public API Methods ---

    /**
     * Associates the specified value with the specified key in this map.
     * If the map previously contained a mapping for the key, the old value is replaced.
     * If adding a new entry causes the load factor to exceed the threshold, the table is resized.
     *
     * @param key   key with which the specified value is to be associated
     * @param value value to be associated with the specified key
     * @return the previous value associated with key, or null if there was no mapping for key.
     *         (For simplicity, this implementation returns null, actual HashMap returns old value)
     */
    public V put(K key, V value) {
        // Check for resizing before adding
        if (size >= threshold) {
            resize();
        }

        int bucketIndex = getBucketIndex(key);
        LinkedList<Entry<K, V>> bucket = buckets.get(bucketIndex);

        // Iterate through the linked list to check if key already exists
        for (Entry<K, V> entry : bucket) {
            // Use Objects.equals for robust comparison, especially with null keys
            if (Objects.equals(entry.key, key)) {
                V oldValue = entry.value;
                entry.value = value; // Update existing value
                return oldValue; // Return old value
            }
        }

        // Key not found, add a new entry to the bucket
        bucket.add(new Entry<>(key, value));
        size++;
        return null; // No previous value
    }

    /**
     * Returns the value to which the specified key is mapped,
     * or {@code null} if this map contains no mapping for the key.
     *
     * @param key the key whose associated value is to be returned
     * @return the value to which the specified key is mapped, or {@code null}
     *         if this map contains no mapping for the key
     */
    public V get(K key) {
        int bucketIndex = getBucketIndex(key);
        LinkedList<Entry<K, V>> bucket = buckets.get(bucketIndex);

        for (Entry<K, V> entry : bucket) {
            if (Objects.equals(entry.key, key)) {
                return entry.value;
            }
        }
        return null; // Key not found
    }

    /**
     * Removes the mapping for the specified key from this map if it is present.
     *
     * @param key key whose mapping is to be removed from the map
     * @return the previous value associated with key, or {@code null} if there was no mapping for key.
     */
    public V remove(K key) {
        int bucketIndex = getBucketIndex(key);
        LinkedList<Entry<K, V>> bucket = buckets.get(bucketIndex);

        Entry<K, V> toRemove = null;
        for (Entry<K, V> entry : bucket) {
            if (Objects.equals(entry.key, key)) {
                toRemove = entry;
                break;
            }
        }

        if (toRemove != null) {
            bucket.remove(toRemove);
            size--;
            return toRemove.value;
        }
        return null; // Key not found
    }

    /**
     * Returns {@code true} if this map contains a mapping for the specified key.
     *
     * @param key key whose presence in this map is to be tested
     * @return {@code true} if this map contains a mapping for the specified key.
     */
    public boolean containsKey(K key) {
        int bucketIndex = getBucketIndex(key);
        LinkedList<Entry<K, V>> bucket = buckets.get(bucketIndex);

        for (Entry<K, V> entry : bucket) {
            if (Objects.equals(entry.key, key)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns the number of key-value mappings in this map.
     *
     * @return the number of key-value mappings in this map
     */
    public int size() {
        return size;
    }

    /**
     * Returns {@code true} if this map contains no key-value mappings.
     *
     * @return {@code true} if this map contains no key-value mappings
     */
    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * Removes all of the mappings from this map. The map will be empty after this call returns.
     */
    public void clear() {
        size = 0;
        initBuckets(capacity); // Reinitialize all buckets to empty linked lists
    }

    // --- For Testing/Debugging ---
    /**
     * Returns the current capacity of the hash table (number of buckets).
     * @return the current capacity.
     */
    public int getCapacity() {
        return capacity;
    }

    /**
     * Returns the number of elements in a specific bucket.
     * Useful for observing collision distribution.
     * @param index the bucket index.
     * @return the number of elements in the specified bucket.
     * @throws IndexOutOfBoundsException if the index is out of range.
     */
    public int getBucketSize(int index) {
        if (index < 0 || index >= capacity) {
            throw new IndexOutOfBoundsException("Bucket index out of bounds: " + index);
        }
        return buckets.get(index).size();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("CustomHashTable (size=").append(size)
                .append(", capacity=").append(capacity).append(") {\n");
        for (int i = 0; i < capacity; i++) {
            LinkedList<Entry<K, V>> bucket = buckets.get(i);
            if (!bucket.isEmpty()) {
                sb.append("  Bucket ").append(i).append(": ").append(bucket).append("\n");
            }
        }
        sb.append("}");
        return sb.toString();
    }
}
```