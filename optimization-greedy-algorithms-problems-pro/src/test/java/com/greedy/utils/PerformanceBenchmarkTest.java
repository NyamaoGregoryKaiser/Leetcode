package com.greedy.utils;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import com.greedy.utils.DataStructures.Pair;

/**
 * Unit tests for the PerformanceBenchmark utility class.
 * Ensures that time measurement and result capturing work as expected.
 */
public class PerformanceBenchmarkTest {

    private static final int DELAY_MS = 50; // Simulate 50ms work

    @Test
    void testMeasureTimeRunnable() {
        // Measure a task that takes a known amount of time
        long duration = PerformanceBenchmark.measureTime("TestRunnable", () -> {
            PerformanceBenchmark.simulateWork(DELAY_MS);
        });

        // Assert that the measured duration is approximately the expected delay.
        // Allow a margin of error for system scheduling and test overhead.
        assertTrue(duration >= DELAY_MS * 0.9 && duration <= DELAY_MS * 1.5, // 90% to 150% of expected
                   "Runnable duration should be around " + DELAY_MS + "ms, but was " + duration + "ms");
    }

    @Test
    void testMeasureTimeAndResultSupplier() {
        // Define a supplier that performs work and returns a result
        String expectedResult = "Task Completed";
        Pair<String, Long> resultPair = PerformanceBenchmark.measureTimeAndResult("TestSupplier", () -> {
            PerformanceBenchmark.simulateWork(DELAY_MS);
            return expectedResult;
        });

        // Assert the returned result
        assertEquals(expectedResult, resultPair.getKey(), "Supplier should return the correct result.");

        // Assert the measured duration
        long duration = resultPair.getValue();
        assertTrue(duration >= DELAY_MS * 0.9 && duration <= DELAY_MS * 1.5, // 90% to 150% of expected
                   "Supplier duration should be around " + DELAY_MS + "ms, but was " + duration + "ms");
    }

    @Test
    void testMeasureTimeRunnable_zeroDelay() {
        long duration = PerformanceBenchmark.measureTime("TestRunnableZeroDelay", () -> {
            // Do nothing, should be very fast
        });
        // Expecting a very small duration, but not necessarily 0 due to method call overhead.
        assertTrue(duration >= 0 && duration < DELAY_MS, "Zero delay task should be very fast.");
    }

    @Test
    void testMeasureTimeAndResultSupplier_noWork() {
        String noWorkResult = "No Work";
        Pair<String, Long> resultPair = PerformanceBenchmark.measureTimeAndResult("TestSupplierNoWork", () -> {
            return noWorkResult;
        });

        assertEquals(noWorkResult, resultPair.getKey(), "No work supplier should return correct result.");
        long duration = resultPair.getValue();
        assertTrue(duration >= 0 && duration < DELAY_MS, "No work supplier should be very fast.");
    }

    @Test
    void testSimulateWorkInterruption() {
        Thread testThread = new Thread(() -> {
            try {
                PerformanceBenchmark.simulateWork(10000); // Try to sleep for a long time
                fail("simulateWork should have been interrupted");
            } catch (Exception e) {
                // This catch block is for unexpected exceptions other than InterruptedException
                // InterruptedException is caught internally and resets interrupt status
                // We mainly check that the flag is reset.
            }
        });

        testThread.start();
        testThread.interrupt(); // Interrupt the thread
        try {
            testThread.join(100); // Wait a short time for thread to react
        } catch (InterruptedException e) {
            fail("Test thread join was interrupted.");
        }

        // The simulateWork catches InterruptedException and resets the flag.
        // We can't directly assert `isInterrupted()` after it's handled,
        // but this test ensures it doesn't hang or crash due to interruption.
        // The `fail` above would trigger if the sleep wasn't interrupted.
        assertFalse(testThread.isAlive(), "Thread should not be alive after interruption (or finished quickly).");
    }
}