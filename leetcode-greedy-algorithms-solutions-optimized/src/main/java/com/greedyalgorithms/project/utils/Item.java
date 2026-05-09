package com.greedyalgorithms.project.utils;

/**
 * Helper class to represent an item with weight and value.
 * Used primarily for the Fractional Knapsack Problem.
 */
public class Item {
    private String name; // Optional: for identification
    private int weight;
    private int value;

    /**
     * Constructs a new Item object.
     * @param name The name or identifier of the item.
     * @param weight The weight of the item.
     * @param value The value of the item.
     */
    public Item(String name, int weight, int value) {
        if (weight < 0 || value < 0) {
            throw new IllegalArgumentException("Weight and value cannot be negative.");
        }
        this.name = name;
        this.weight = weight;
        this.value = value;
    }

    // --- Getters ---
    public String getName() {
        return name;
    }

    public int getWeight() {
        return weight;
    }

    public int getValue() {
        return value;
    }

    /**
     * Calculates the value-to-weight ratio for the item.
     * This is crucial for the greedy approach in Fractional Knapsack.
     * @return The value per unit weight. Returns 0 if weight is 0 to avoid division by zero,
     *         though typically weights are positive in knapsack problems.
     */
    public double getValuePerWeight() {
        if (weight == 0) {
            return value > 0 ? Double.POSITIVE_INFINITY : 0; // Handle zero weight scenario
        }
        return (double) value / weight;
    }

    @Override
    public String toString() {
        return "Item{" +
               "name='" + name + '\'' +
               ", weight=" + weight +
               ", value=" + value +
               ", ratio=" + String.format("%.2f", getValuePerWeight()) +
               '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return weight == item.weight && value == item.value && name.equals(item.name);
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + weight;
        result = 31 * result + value;
        return result;
    }
}