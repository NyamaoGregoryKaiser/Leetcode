```java
package com.arraymanipulation;

import com.arraymanipulation.problems.ArrayManipulationProblems;
import com.arraymanipulation.problems.SolutionApproach;
import com.arraymanipulation.utils.ArrayUtils;
import com.arraymanipulation.utils.PerformanceTracker;

import java.util.Arrays;

/**
 * Main class to demonstrate and test the Array Manipulation problems and their solutions.
 * It showcases different approaches for each problem, including performance benchmarking.
 */
public class ArrayManipulator {

    private final ArrayManipulationProblems problems;

    public ArrayManipulator() {
        this.problems = new ArrayManipulationProblems();
    }

    public static void main(String[] args) {
        ArrayManipulator app = new ArrayManipulator();

        System.out.println("--- Array Manipulation Project Demonstrations ---");
        System.out.println("Refer to README.md and docs/AlgorithmExplanation.md for detailed explanations.\n");

        app.demonstrateRotateArray();
        System.out.println("\n" + "-".repeat(80) + "\n");

        app.demonstrateMaxSubArraySum();
        System.out.println("\n" + "-".repeat(80) + "\n");

        app.demonstrateTrappingRainWater();
        System.out.println("\n" + "-".repeat(80) + "\n");

        app.demonstrateProductExceptSelf();
        System.out.println("\n" + "-".repeat(80) + "\n");

        System.out.println("--- End of Demonstrations ---");
    }

    /**
     * Demonstrates the 'Rotate Array' problem with different approaches.
     */
    private void demonstrateRotateArray() {
        System.out.println("Problem 1: Rotate Array");
        int[] originalNums = {1, 2, 3, 4, 5, 6, 7};
        int k = 3;

        // Brute Force
        int[] numsBruteForce = ArrayUtils.deepCopy(originalNums);
        ArrayUtils.printArray(originalNums, "Original Array");
        System.out.println("Rotating by k = " + k);
        PerformanceTracker.measureTime("Rotate Array", SolutionApproach.BRUTE_FORCE,
                () -> problems.rotateArray(numsBruteForce, k, SolutionApproach.BRUTE_FORCE));
        ArrayUtils.printArray(numsBruteForce, "Rotated (Brute Force)");

        // Extra Space
        int[] numsExtraSpace = ArrayUtils.deepCopy(originalNums);
        PerformanceTracker.measureTime("Rotate Array", SolutionApproach.EXTRA_SPACE,
                () -> problems.rotateArray(numsExtraSpace, k, SolutionApproach.EXTRA_SPACE));
        ArrayUtils.printArray(numsExtraSpace, "Rotated (Extra Space)");

        // Reversal Algorithm (In-place, Optimal)
        int[] numsReversal = ArrayUtils.deepCopy(originalNums);
        PerformanceTracker.measureTime("Rotate Array", SolutionApproach.REVERSAL,
                () -> problems.rotateArray(numsReversal, k, SolutionApproach.REVERSAL));
        ArrayUtils.printArray(numsReversal, "Rotated (Reversal)");

        // Test with large array for performance difference
        System.out.println("\nTesting with large array (size 100,000, k=50,000):");
        int largeSize = 100_000;
        int largeK = 50_000;
        int[] largeArr = ArrayUtils.generateRandomArray(largeSize, 0, 1000);

        // Brute force is too slow for large arrays, skipping to avoid long runtime in demo
        // int[] largeArrBruteForce = ArrayUtils.deepCopy(largeArr);
        // PerformanceTracker.measureTime("Rotate Array (Large)", SolutionApproach.BRUTE_FORCE,
        //         () -> problems.rotateArray(largeArrBruteForce, largeK, SolutionApproach.BRUTE_FORCE));

        int[] largeArrExtraSpace = ArrayUtils.deepCopy(largeArr);
        PerformanceTracker.measureTime("Rotate Array (Large)", SolutionApproach.EXTRA_SPACE,
                () -> problems.rotateArray(largeArrExtraSpace, largeK, SolutionApproach.EXTRA_SPACE));

        int[] largeArrReversal = ArrayUtils.deepCopy(largeArr);
        PerformanceTracker.measureTime("Rotate Array (Large)", SolutionApproach.REVERSAL,
                () -> problems.rotateArray(largeArrReversal, largeK, SolutionApproach.REVERSAL));
    }

    /**
     * Demonstrates the 'Maximum Subarray Sum' problem with different approaches.
     */
    private void demonstrateMaxSubArraySum() {
        System.out.println("Problem 2: Maximum Subarray Sum");
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        ArrayUtils.printArray(nums, "Input Array");

        // Brute Force
        int maxSumBruteForce = PerformanceTracker.measureTime("Max Subarray Sum", SolutionApproach.BRUTE_FORCE,
                () -> problems.maxSubArray(nums, SolutionApproach.BRUTE_FORCE));
        System.out.println("Max Sum (Brute Force): " + maxSumBruteForce);

        // Kadane's Algorithm (Optimal)
        int maxSumKadane = PerformanceTracker.measureTime("Max Subarray Sum", SolutionApproach.KADANES_ALGORITHM,
                () -> problems.maxSubArray(nums, SolutionApproach.KADANES_ALGORITHM));
        System.out.println("Max Sum (Kadane's Algo): " + maxSumKadane);

        // Edge case: all negative numbers
        int[] allNegatives = {-5, -1, -3, -2, -4};
        ArrayUtils.printArray(allNegatives, "\nInput Array (all negatives)");
        maxSumBruteForce = PerformanceTracker.measureTime("Max Subarray Sum", SolutionApproach.BRUTE_FORCE,
                () -> problems.maxSubArray(allNegatives, SolutionApproach.BRUTE_FORCE));
        System.out.println("Max Sum (Brute Force): " + maxSumBruteForce);
        maxSumKadane = PerformanceTracker.measureTime("Max Subarray Sum", SolutionApproach.KADANES_ALGORITHM,
                () -> problems.maxSubArray(allNegatives, SolutionApproach.KADANES_ALGORITHM));
        System.out.println("Max Sum (Kadane's Algo): " + maxSumKadane);

        // Test with large array for performance difference
        System.out.println("\nTesting with large array (size 1,000,000):");
        int largeSize = 1_000_000;
        int[] largeArr = ArrayUtils.generateRandomArray(largeSize, -100, 100);

        // Brute force will be very slow (N^2), Kadane's will be fast (N)
        // PerformanceTracker.measureTime("Max Subarray Sum (Large)", SolutionApproach.BRUTE_FORCE,
        //         () -> problems.maxSubArray(largeArr, SolutionApproach.BRUTE_FORCE)); // Commented out, too slow

        PerformanceTracker.measureTime("Max Subarray Sum (Large)", SolutionApproach.KADANES_ALGORITHM,
                () -> problems.maxSubArray(largeArr, SolutionApproach.KADANES_ALGORITHM));
    }

    /**
     * Demonstrates the 'Trapping Rain Water' problem with different approaches.
     */
    private void demonstrateTrappingRainWater() {
        System.out.println("Problem 3: Trapping Rain Water");
        int[] height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
        ArrayUtils.printArray(height, "Elevation Map");

        // Brute Force
        int trappedWaterBruteForce = PerformanceTracker.measureTime("Trapping Rain Water", SolutionApproach.BRUTE_FORCE,
                () -> problems.trapRainWater(height, SolutionApproach.BRUTE_FORCE));
        System.out.println("Trapped Water (Brute Force): " + trappedWaterBruteForce);

        // Dynamic Programming (Left/Right Max Arrays)
        int trappedWaterDP = PerformanceTracker.measureTime("Trapping Rain Water", SolutionApproach.DYNAMIC_PROGRAMMING,
                () -> problems.trapRainWater(height, SolutionApproach.DYNAMIC_PROGRAMMING));
        System.out.println("Trapped Water (DP): " + trappedWaterDP);

        // Two Pointers (Optimal)
        int trappedWaterTwoPointers = PerformanceTracker.measureTime("Trapping Rain Water", SolutionApproach.TWO_POINTERS,
                () -> problems.trapRainWater(height, SolutionApproach.TWO_POINTERS));
        System.out.println("Trapped Water (Two Pointers): " + trappedWaterTwoPointers);

        // Edge case: increasing sequence
        int[] increasing = {1, 2, 3, 4, 5};
        ArrayUtils.printArray(increasing, "\nElevation Map (increasing)");
        trappedWaterTwoPointers = PerformanceTracker.measureTime("Trapping Rain Water", SolutionApproach.TWO_POINTERS,
                () -> problems.trapRainWater(increasing, SolutionApproach.TWO_POINTERS));
        System.out.println("Trapped Water: " + trappedWaterTwoPointers); // Should be 0

        // Test with large array for performance difference
        System.out.println("\nTesting with large array (size 100,000):");
        int largeSize = 100_000;
        int[] largeArr = ArrayUtils.generateRandomArray(largeSize, 0, 1000);

        // Brute force will be very slow (N^2), skipping
        // PerformanceTracker.measureTime("Trapping Rain Water (Large)", SolutionApproach.BRUTE_FORCE,
        //         () -> problems.trapRainWater(largeArr, SolutionApproach.BRUTE_FORCE));

        PerformanceTracker.measureTime("Trapping Rain Water (Large)", SolutionApproach.DYNAMIC_PROGRAMMING,
                () -> problems.trapRainWater(largeArr, SolutionApproach.DYNAMIC_PROGRAMMING));

        PerformanceTracker.measureTime("Trapping Rain Water (Large)", SolutionApproach.TWO_POINTERS,
                () -> problems.trapRainWater(largeArr, SolutionApproach.TWO_POINTERS));
    }

    /**
     * Demonstrates the 'Product of Array Except Self' problem with different approaches.
     */
    private void demonstrateProductExceptSelf() {
        System.out.println("Problem 4: Product of Array Except Self");
        int[] nums = {1, 2, 3, 4};
        ArrayUtils.printArray(nums, "Input Array");

        // Brute Force (using division)
        int[] resultBruteForce = PerformanceTracker.measureTime("Product Except Self", SolutionApproach.BRUTE_FORCE,
                () -> problems.productExceptSelf(nums, SolutionApproach.BRUTE_FORCE));
        ArrayUtils.printArray(resultBruteForce, "Result (Brute Force)");

        // Two Pass (Prefix/Suffix products, No Division, Optimal)
        int[] resultTwoPass = PerformanceTracker.measureTime("Product Except Self", SolutionApproach.OPTIMIZED,
                () -> problems.productExceptSelf(nums, SolutionApproach.OPTIMIZED));
        ArrayUtils.printArray(resultTwoPass, "Result (Two Pass)");

        // Edge case: with zeros
        int[] numsWithZero = {1, 2, 0, 4};
        ArrayUtils.printArray(numsWithZero, "\nInput Array (with zero)");
        resultBruteForce = PerformanceTracker.measureTime("Product Except Self", SolutionApproach.BRUTE_FORCE,
                () -> problems.productExceptSelf(numsWithZero, SolutionApproach.BRUTE_FORCE));
        ArrayUtils.printArray(resultBruteForce, "Result (Brute Force)");
        resultTwoPass = PerformanceTracker.measureTime("Product Except Self", SolutionApproach.OPTIMIZED,
                () -> problems.productExceptSelf(numsWithZero, SolutionApproach.OPTIMIZED));
        ArrayUtils.printArray(resultTwoPass, "Result (Two Pass)");

        int[] numsWithTwoZeros = {1, 0, 3, 0};
        ArrayUtils.printArray(numsWithTwoZeros, "\nInput Array (with two zeros)");
        resultBruteForce = PerformanceTracker.measureTime("Product Except Self", SolutionApproach.BRUTE_FORCE,
                () -> problems.productExceptSelf(numsWithTwoZeros, SolutionApproach.BRUTE_FORCE));
        ArrayUtils.printArray(resultBruteForce, "Result (Brute Force)");
        resultTwoPass = PerformanceTracker.measureTime("Product Except Self", SolutionApproach.OPTIMIZED,
                () -> problems.productExceptSelf(numsWithTwoZeros, SolutionApproach.OPTIMIZED));
        ArrayUtils.printArray(resultTwoPass, "Result (Two Pass)");


        // Test with large array for performance difference
        System.out.println("\nTesting with large array (size 100,000):");
        int largeSize = 100_000;
        int[] largeArr = ArrayUtils.generateRandomArray(largeSize, 1, 10); // Avoid zeros for simple test case

        PerformanceTracker.measureTime("Product Except Self (Large)", SolutionApproach.BRUTE_FORCE,
                () -> problems.productExceptSelf(largeArr, SolutionApproach.BRUTE_FORCE));

        PerformanceTracker.measureTime("Product Except Self (Large)", SolutionApproach.OPTIMIZED,
                () -> problems.productExceptSelf(largeArr, SolutionApproach.OPTIMIZED));
    }
}
```