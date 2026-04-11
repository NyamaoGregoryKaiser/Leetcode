```java
package com.example.greedy.models;

/**
 * Represents an item with a weight and a value.
 * Used primarily in the Fractional Knapsack Problem.
 */
public class Item {
    public int weight;
    public int value;

    public Item(int weight, int value) {
        this.weight = weight;
        this.value = value;
    }

    /**
     * Calculates the value-to-weight ratio for this item.
     *
     * @return The ratio of value to weight. Returns 0 if weight is 0 to avoid division by zero,
     *         though in typical knapsack problems weights are positive.
     */
    public double getRatio() {
        if (weight == 0) {
            return (value > 0) ? Double.POSITIVE_INFINITY : 0; // Handle zero weight items carefully
        }
        return (double) value / weight;
    }

    @Override
    public String toString() {
        return "Item{w=" + weight + ", v=" + value + ", ratio=" + String.format("%.2f", getRatio()) + "}";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return weight == item.weight && value == item.value;
    }

    @Override
    public int hashCode() {
        int result = weight;
        result = 31 * result + value;
        return result;
    }
}
```