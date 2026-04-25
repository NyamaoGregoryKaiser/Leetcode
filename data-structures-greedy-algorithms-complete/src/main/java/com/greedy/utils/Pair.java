```java
package com.greedy.utils;

/**
 * A simple generic Pair class to store two related objects.
 * Useful for representing structures like (start_time, end_time), (character, frequency), etc.
 *
 * @param <K> The type of the first element.
 * @param <V> The type of the second element.
 */
public class Pair<K, V> implements Comparable<Pair<K, V>> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() {
        return key;
    }

    public V getValue() {
        return value;
    }

    public void setKey(K key) {
        this.key = key;
    }

    public void setValue(V value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "(" + key + ", " + value + ")";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pair<?, ?> pair = (Pair<?, ?>) o;
        if (!key.equals(pair.key)) return false;
        return value.equals(pair.value);
    }

    @Override
    public int hashCode() {
        int result = key.hashCode();
        result = 31 * result + value.hashCode();
        return result;
    }

    /**
     * Compares this Pair with another Pair.
     * This implementation assumes that the 'value' element is comparable and
     * is the primary key for comparison (e.g., for sorting by frequency in Huffman, or profit in Job Sequencing).
     * If the 'value' is not comparable or a different comparison logic is needed, this method should be overridden
     * or a custom Comparator should be used.
     *
     * @param other The other Pair to compare to.
     * @return A negative integer, zero, or a positive integer as this object is less than, equal to, or greater than the specified object.
     * @throws ClassCastException if the 'value' objects are not mutually comparable.
     */
    @SuppressWarnings("unchecked")
    @Override
    public int compareTo(Pair<K, V> other) {
        if (this.value instanceof Comparable) {
            return ((Comparable<V>) this.value).compareTo(other.value);
        }
        // If V is not comparable, throw an exception or define custom behavior.
        throw new UnsupportedOperationException("Comparison not supported for type V: " + value.getClass().getName());
    }
}

```