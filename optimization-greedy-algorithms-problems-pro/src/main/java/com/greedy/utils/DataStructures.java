package com.greedy.utils;

import java.util.Objects;

/**
 * Utility class to define common data structures used across various greedy problems.
 * This centralizes custom object definitions for clarity and reusability.
 */
public class DataStructures {

    /**
     * Represents an activity with a start and finish time.
     * Used in the Activity Selection Problem.
     */
    public static class Activity {
        public int start;
        public int finish;

        public Activity(int start, int finish) {
            this.start = start;
            this.finish = finish;
        }

        @Override
        public String toString() {
            return "(" + start + ", " + finish + ")";
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Activity activity = (Activity) o;
            return start == activity.start && finish == activity.finish;
        }

        @Override
        public int hashCode() {
            return Objects.hash(start, finish);
        }
    }

    /**
     * Represents an item with a weight and a value.
     * Used in the Fractional Knapsack Problem.
     */
    public static class Item {
        public int weight;
        public int value;
        public double valuePerWeight; // Derived property for greedy choice

        public Item(int weight, int value) {
            this.weight = weight;
            this.value = value;
            this.valuePerWeight = (double) value / weight;
        }

        @Override
        public String toString() {
            return "Item{W=" + weight + ", V=" + value + ", V/W=" + String.format("%.2f", valuePerWeight) + "}";
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Item item = (Item) o;
            // Comparing double with a small epsilon might be better for real-world scenarios,
            // but for interview context, direct equality might be sufficient if values are exact.
            return weight == item.weight && value == item.value;
        }

        @Override
        public int hashCode() {
            return Objects.hash(weight, value);
        }
    }

    /**
     * Represents a job with an ID, deadline, and profit.
     * Used in the Job Sequencing with Deadlines Problem.
     */
    public static class Job {
        public char id;    // Job Id
        public int deadline; // Deadline of job
        public int profit; // Profit if job is finished by deadline

        public Job(char id, int deadline, int profit) {
            this.id = id;
            this.deadline = deadline;
            this.profit = profit;
        }

        @Override
        public String toString() {
            return "Job{ID=" + id + ", D=" + deadline + ", P=" + profit + "}";
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Job job = (Job) o;
            return deadline == job.deadline && profit == job.profit && id == job.id;
        }

        @Override
        public int hashCode() {
            return Objects.hash(id, deadline, profit);
        }
    }

    /**
     * Represents a transaction in the Minimize Cash Flow Problem.
     * Not directly used in the greedy algorithm's core logic but useful for input/output.
     */
    public static class Transaction {
        public String from;
        public String to;
        public double amount;

        public Transaction(String from, String to, double amount) {
            this.from = from;
            this.to = to;
            this.amount = amount;
        }

        @Override
        public String toString() {
            return from + " pays " + to + " $" + String.format("%.2f", amount);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Transaction that = (Transaction) o;
            return Double.compare(that.amount, amount) == 0 &&
                   Objects.equals(from, that.from) &&
                   Objects.equals(to, that.to);
        }

        @Override
        public int hashCode() {
            return Objects.hash(from, to, amount);
        }
    }

    /**
     * A generic Pair class for situations where two related values need to be stored together.
     * Can be used for custom key-value pairs or simple tuples.
     *
     * @param <K> Type of the first element
     * @param <V> Type of the second element
     */
    public static class Pair<K, V> {
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
            return Objects.equals(key, pair.key) && Objects.equals(value, pair.value);
        }

        @Override
        public int hashCode() {
            return Objects.hash(key, value);
        }
    }
}