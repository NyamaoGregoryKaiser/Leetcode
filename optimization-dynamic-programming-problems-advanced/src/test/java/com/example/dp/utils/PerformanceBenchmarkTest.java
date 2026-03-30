```java
package com.example.dp.utils;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("Performance Benchmark Utility Tests")
class PerformanceBenchmarkTest {

    @Test
    void testMeasure_SimpleTask() {
        String testString = "Hello World";
        PerformanceBenchmark.BenchmarkResult<String> result = PerformanceBenchmark.measure(() -> testString);

        assertEquals(testString, result.result());
        assertTrue(result.durationMillis() >= 0); // Duration should be non-negative
        assertTrue(result.durationMillis() < 50); // Should be very fast, likely 0-1ms
    }

    @Test
    void testMeasure_TimeConsumingTask() {
        int sleepTime = 100; // Milliseconds
        PerformanceBenchmark.BenchmarkResult<Void> result = PerformanceBenchmark.measure(() -> {
            try {
                Thread.sleep(sleepTime);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return null; // Return Void for tasks that don't produce a specific value
        });

        assertTrue(result.durationMillis() >= sleepTime - 10); // Allow for minor inaccuracies, but should be close
        assertTrue(result.durationMillis() <= sleepTime + 50); // Allow for some overhead
    }

    @Test
    void testMeasure_ReturnsCorrectValue() {
        int expectedValue = 12345;
        PerformanceBenchmark.BenchmarkResult<Integer> result = PerformanceBenchmark.measure(() -> {
            // Simulate some computation
            return expectedValue;
        });

        assertEquals(expectedValue, result.result());
    }

    @Test
    void testBenchmarkResultToString() {
        PerformanceBenchmark.BenchmarkResult<Integer> result = new PerformanceBenchmark.BenchmarkResult<>(100, 500);
        String expectedString = "Result: 100, Time: 500 ms";
        assertEquals(expectedString, result.toString());
    }
}
```