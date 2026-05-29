# Hash Table Concepts

Hash tables (also known as hash maps) are a fundamental data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.

## 1. Core Components

1.  **Key-Value Pairs**: Hash tables store data as pairs, where each `key` is unique and maps to a `value`.
2.  **Hash Function**: A function that takes a key and converts it into an integer (hash code), which is then used to determine the index (bucket) in the internal array where the value should be stored.
    -   **Good Hash Function Qualities**:
        -   **Deterministic**: Same key always produces the same hash code.
        -   **Uniform Distribution**: Distributes keys evenly across the array, minimizing collisions.
        -   **Efficient**: Fast to compute.
3.  **Buckets (or Slots)**: An underlying array (or list) that stores the key-value pairs. Each index in this array is a "bucket".
4.  **Collision Resolution**: A strategy to handle situations where two different keys hash to the same index.

## 2. How Hash Tables Work (Simplified)

1.  **Insertion (`put(key, value)`)**:
    -   The `key` is passed to the `hash function`, which returns a hash code.
    -   The hash code is then typically modulo (`%`) the size of the underlying array to get an `index`.
    -   The `(key, value)` pair is stored in the bucket at that `index`.
    -   If a collision occurs (another pair already exists at that index), a collision resolution strategy is used.
2.  **Retrieval (`get(key)`)**:
    -   The `key` is passed to the same `hash function` to get the `index`.
    -   The bucket at that `index` is accessed.
    -   The bucket is searched for the specific `key`.
    -   If found, its `value` is returned. If not found, it implies the key is not in the hash table.
3.  **Deletion (`remove(key)`)**:
    -   Similar to retrieval, the `key` is hashed to find the `index`.
    -   The bucket is searched, and if the `key` is found, its `(key, value)` pair is removed.

## 3. Collision Resolution Strategies

When two distinct keys hash to the same index, a "collision" occurs. Hash tables must have a mechanism to handle these.

### a) Chaining (Separate Chaining)

-   Each bucket in the array stores a pointer to a data structure (e.g., a linked list or another dynamic array) that holds all key-value pairs that hash to that index.
-   When a collision occurs, the new key-value pair is simply added to the end of the list at that bucket.
-   **Retrieval/Deletion**: When searching, you go to the computed bucket index, then traverse the list at that bucket to find the desired key.

#### ASCII Diagram: Chaining

```
+------------+
| Bucket 0   | --> (key_A, val_A) --> (key_D, val_D)
+------------+
| Bucket 1   | --> (key_B, val_B)
+------------+
| Bucket 2   | --> (key_C, val_C) --> (key_E, val_E) --> (key_F, val_F)
+------------+
| ...        |
+------------+
```
**Pros**: Simple to implement, never runs out of space for collisions (as lists grow), relatively robust to bad hash functions.
**Cons**: Requires extra space for pointers/list nodes, cache performance might be worse due to scattered memory.

### b) Open Addressing (Closed Hashing)

-   Instead of storing multiple items in a linked list, all key-value pairs are stored directly in the array itself.
-   When a collision occurs, the system probes for the next available empty slot.
-   **Retrieval/Deletion**: When searching, if the key is not at the hashed index, the system continues to probe until the key is found or an empty slot (indicating the key is not present) is encountered.
-   Common probing techniques:
    1.  **Linear Probing**: Searches sequentially for the next empty slot: `(hash(key) + i) % capacity`, where `i` increments by 1.
        -   **Problem**: Can lead to "primary clustering," where long runs of occupied slots form, making future insertions/searches slow.
    2.  **Quadratic Probing**: Searches by taking quadratic steps: `(hash(key) + i^2) % capacity`, where `i` increments by 1.
        -   **Problem**: Can lead to "secondary clustering," where keys that hash to the same initial index follow the same probe sequence.
    3.  **Double Hashing**: Uses a second hash function to determine the step size for probing: `(hash1(key) + i * hash2(key)) % capacity`.
        -   Generally performs better by creating more diverse probe sequences.

#### ASCII Diagram: Linear Probing

```
Array:
Indices:  0    1    2    3    4    5    6    7
         +----+----+----+----+----+----+----+----+
Content: | K1 | K2 | K3 | K_ | K4 | K_ | K_ | K_ |
         +----+----+----+----+----+----+----+----+
(K_ means empty)

- If hash(K1) = 0, K1 is placed at index 0.
- If hash(K2) = 0 (collision with K1), K2 probes to index 1.
- If hash(K3) = 1 (collision with K2), K3 probes to index 2.
- If hash(K4) = 1 (collision with K2, K3), K4 probes to index 4.
```
**Pros**: No extra space overhead for pointers, better cache performance (items are stored contiguously).
**Cons**: More complex deletion (cannot just remove, must mark as "deleted" to maintain probe sequences), sensitive to load factor (performance degrades quickly as table fills), risk of clustering.

## 4. Load Factor and Resizing

-   **Load Factor (α)**: The ratio of the number of items (`n`) stored in the hash table to the number of buckets (`m`).
    `α = n / m`
-   **Importance**: The load factor indicates how full the hash table is.
    -   A low load factor means more empty buckets, reducing collision probability and leading to faster operations (but wastes space).
    -   A high load factor means more collisions, slowing down operations (but uses space efficiently).
-   **Resizing (Rehashing)**: When the load factor exceeds a certain threshold (e.g., 0.7 or 0.75 for chaining, often lower for open addressing), the hash table's underlying array is typically expanded (e.g., doubled in size).
    -   All existing key-value pairs must be rehashed using the *new* capacity and re-inserted into the new, larger array. This is because the modulo operation `hash(key) % new_capacity` will produce different indices.
    -   Resizing is an expensive O(N) operation (where N is the current number of items), but because it happens infrequently (doubling implies exponential growth), the amortized average time complexity for insertion remains O(1).

## 5. Time Complexity

Assuming a good hash function that distributes keys uniformly:

| Operation | Average Case | Worst Case (Pathological Hash Function / All Collisions) |
| :-------- | :----------- | :------------------------------------------------------- |
| Insert    | O(1)         | O(N)                                                     |
| Search    | O(1)         | O(N)                                                     |
| Delete    | O(1)         | O(N)                                                     |

-   **Why O(1) average?**: With a good hash function and proper resizing, the number of items per bucket remains small and constant on average. Thus, operations within a bucket take constant time.
-   **Why O(N) worst?**: If all keys hash to the same bucket (a "bad" hash function or extreme adversarial input), the hash table degenerates into a linked list (for chaining) or a linear scan (for open addressing), making operations proportional to the number of items N.

## 6. Space Complexity

-   **O(N)**: Where N is the number of key-value pairs stored.
    -   The underlying array size `M` is usually proportional to `N` (due to load factor management), so `O(M)` becomes `O(N)`.
    -   Each key-value pair itself takes constant space.

## 7. Use Cases for Hash Tables

Hash tables are incredibly versatile and widely used:
-   **Symbol tables in compilers/interpreters**.
-   **Database indexing**.
-   **Caching mechanisms** (e.g., memoization).
-   **Frequency counting** (e.g., character counts, word counts).
-   **Detecting duplicates** or checking for membership (using hash sets).
-   **Implementing sets** (which are essentially hash maps where values are ignored or set to a dummy value).
-   **Associative arrays** (Python's `dict`, Java's `HashMap`, C++'s `std::unordered_map`).

Hash tables are a go-to data structure for problems requiring fast lookups, insertions, and deletions.