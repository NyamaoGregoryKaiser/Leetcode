```java
package com.example.greedy.models;

/**
 * Represents an activity with a start time and a finish time.
 * Used in problems like Activity Selection and Minimum Number of Platforms.
 */
public class Activity {
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
        int result = start;
        result = 31 * result + finish;
        return result;
    }
}
```