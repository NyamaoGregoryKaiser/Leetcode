```java
package com.example.sorting.utils;

/**
 * A simple immutable class representing a time interval with a start and end point.
 * Used for Problem 2 (Merge Intervals).
 */
public class Interval implements Comparable<Interval> {
    public final int start;
    public final int end;

    public Interval(int start, int end) {
        if (start > end) {
            throw new IllegalArgumentException("Start of interval cannot be greater than end.");
        }
        this.start = start;
        this.end = end;
    }

    /**
     * Compares this interval with another based on their start points.
     * If start points are equal, it compares by end points.
     *
     * @param other The other interval to compare to.
     * @return A negative integer, zero, or a positive integer as this interval
     *         is less than, equal to, or greater than the specified object.
     */
    @Override
    public int compareTo(Interval other) {
        if (this.start != other.start) {
            return Integer.compare(this.start, other.start);
        }
        return Integer.compare(this.end, other.end);
    }

    /**
     * Checks if this interval overlaps with another interval.
     * Two intervals `[a,b]` and `[c,d]` overlap if `max(a,c) <= min(b,d)`.
     *
     * @param other The other interval.
     * @return True if they overlap, false otherwise.
     */
    public boolean overlapsWith(Interval other) {
        // An overlap exists if the start of one is before the end of the other, AND
        // the end of one is after the start of the other.
        return this.start <= other.end && other.start <= this.end;
    }

    /**
     * Merges this interval with another overlapping interval.
     *
     * @param other The other interval to merge with. Must be overlapping.
     * @return A new Interval representing the merged range.
     * @throws IllegalArgumentException if intervals do not overlap.
     */
    public Interval merge(Interval other) {
        if (!overlapsWith(other)) {
            throw new IllegalArgumentException("Intervals do not overlap, cannot merge.");
        }
        return new Interval(Math.min(this.start, other.start), Math.max(this.end, other.end));
    }

    @Override
    public String toString() {
        return "[" + start + "," + end + "]";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Interval interval = (Interval) o;
        return start == interval.start && end == interval.end;
    }

    @Override
    public int hashCode() {
        int result = start;
        result = 31 * result + end;
        return result;
    }
}
```