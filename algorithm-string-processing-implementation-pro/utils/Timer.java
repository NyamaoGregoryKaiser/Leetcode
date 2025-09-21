```java
package com.example.utils;

public class Timer {
    private long startTime;

    public void start() {
        startTime = System.nanoTime();
    }

    public double stop() {
        long endTime = System.nanoTime();
        return (double) (endTime - startTime) / 1_000_000_000; // seconds
    }
}
```