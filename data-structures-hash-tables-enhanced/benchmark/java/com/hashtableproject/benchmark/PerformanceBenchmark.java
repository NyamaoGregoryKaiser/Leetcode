```java
package com.hashtableproject.benchmark;

import com.hashtableproject.problems.HashTableProblems;
import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * Performance benchmarking for Hash Table problems using JMH.
 * This class compares the optimal (Hash Table-based) solutions against
 * brute-force or less optimal solutions for the problems defined in
 * {@link HashTableProblems}.
 *
 * To run:
 * 1. Navigate to the project root.
 * 2. `mvn clean install`
 * 3. `java -jar target/benchmarks.jar`
 *    (or `mvn exec:java -Dexec.mainClass="org.openjdk.jmh.Main" -Dexec.args="com.hashtableproject.benchmark.PerformanceBenchmark"`)
 */
@BenchmarkMode(Mode.AverageTime) // Measure average time per operation
@OutputTimeUnit(TimeUnit.MICROSECONDS) // Output time in microseconds
@State(Scope.Benchmark) // Each benchmark instance has its own state
@Fork(value = 2) // Run 2 forks of the JVM
@Warmup(iterations = 3, time = 500, timeUnit = TimeUnit.MILLISECONDS) // 3 warmup iterations of 0.5s each
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS) // 5 actual measurement iterations of 1s each
public class PerformanceBenchmark {

    private HashTableProblems.TwoSum twoSumInstance;
    private HashTableProblems.LongestConsecutiveSequence longestConsecutiveSequenceInstance;
    private HashTableProblems.GroupAnagrams groupAnagramsInstance;
    private HashTableProblems.SubarraySumEqualsK subarraySumEqualsKInstance;

    // --- Data for Benchmarks ---
    @Param({"100", "1000", "10000"})
    public int N; // Size of input array

    // TwoSum data
    private int[] twoSum_nums;
    private int twoSum_target;

    // LongestConsecutiveSequence data
    private int[] lcs_nums;

    // GroupAnagrams data
    private String[] ga_strs;

    // SubarraySumEqualsK data
    private int[] ssek_nums;
    private int ssek_k;

    @Setup(Level.Trial)
    public void setup() {
        twoSumInstance = new HashTableProblems.TwoSum();
        longestConsecutiveSequenceInstance = new HashTableProblems.LongestConsecutiveSequence();
        groupAnagramsInstance = new HashTableProblems.GroupAnagrams();
        subarraySumEqualsKInstance = new HashTableProblems.SubarraySumEqualsK();

        Random random = new Random(42); // Seed for reproducibility

        // TwoSum setup
        twoSum_nums = new int[N];
        for (int i = 0; i < N; i++) {
            twoSum_nums[i] = random.nextInt(N * 2) - N; // Random numbers between -N and N
        }
        // Ensure a solution exists for twoSum, pick two random indices and sum them
        int idx1 = random.nextInt(N);
        int idx2 = random.nextInt(N);
        while (idx1 == idx2) idx2 = random.nextInt(N);
        twoSum_target = twoSum_nums[idx1] + twoSum_nums[idx2];

        // LongestConsecutiveSequence setup
        lcs_nums = new int[N];
        for (int i = 0; i < N; i++) {
            lcs_nums[i] = random.nextInt(N * 5); // Numbers from 0 to N*5 - 1
        }
        // For scenarios where there might be a long sequence:
        if (N >= 1000 && random.nextDouble() < 0.5) { // 50% chance to inject a long sequence for larger N
            int start = random.nextInt(N * 2);
            int len = N / 2;
            for (int i = 0; i < len; i++) {
                lcs_nums[random.nextInt(N)] = start + i; // Overwrite random elements with a sequence
            }
        }


        // GroupAnagrams setup
        ga_strs = new String[N];
        String[] baseWords = {"abc", "bca", "cab", "def", "fed", "ghi", "ihg", "jkl", "kjl", "lji"};
        for (int i = 0; i < N; i++) {
            // Pick a random base word and shuffle it to create an anagram
            String base = baseWords[random.nextInt(baseWords.length)];
            char[] chars = base.toCharArray();
            for (int j = 0; j < chars.length; j++) {
                int swapIdx = random.nextInt(chars.length);
                char temp = chars[j];
                chars[j] = chars[swapIdx];
                chars[swapIdx] = temp;
            }
            ga_strs[i] = new String(chars);
        }

        // SubarraySumEqualsK setup
        ssek_nums = new int[N];
        for (int i = 0; i < N; i++) {
            ssek_nums[i] = random.nextInt(20) - 10; // Numbers between -10 and 9
        }
        ssek_k = random.nextInt(20) - 10; // Target sum between -10 and 9
    }

    // --- Benchmarks for TwoSum ---
    @Benchmark
    public void twoSum_Optimal(Blackhole bh) {
        bh.consume(twoSumInstance.twoSum_Optimal(Arrays.copyOf(twoSum_nums, twoSum_nums.length), twoSum_target));
    }

    @Benchmark
    public void twoSum_BruteForce(Blackhole bh) {
        bh.consume(twoSumInstance.twoSum_BruteForce(Arrays.copyOf(twoSum_nums, twoSum_nums.length), twoSum_target));
    }

    // --- Benchmarks for LongestConsecutiveSequence ---
    @Benchmark
    public void lcs_Optimal(Blackhole bh) {
        bh.consume(longestConsecutiveSequenceInstance.longestConsecutive_Optimal(Arrays.copyOf(lcs_nums, lcs_nums.length)));
    }

    @Benchmark
    public void lcs_Sorting(Blackhole bh) {
        bh.consume(longestConsecutiveSequenceInstance.longestConsecutive_Sorting(Arrays.copyOf(lcs_nums, lcs_nums.length)));
    }

    // --- Benchmarks for GroupAnagrams ---
    @Benchmark
    public void ga_SortedStringKey(Blackhole bh) {
        bh.consume(groupAnagramsInstance.groupAnagrams_SortedStringKey(Arrays.copyOf(ga_strs, ga_strs.length)));
    }

    @Benchmark
    public void ga_CharCountKey(Blackhole bh) {
        bh.consume(groupAnagramsInstance.groupAnagrams_CharCountKey(Arrays.copyOf(ga_strs, ga_strs.length)));
    }

    // --- Benchmarks for SubarraySumEqualsK ---
    @Benchmark
    public void ssek_Optimal(Blackhole bh) {
        bh.consume(subarraySumEqualsKInstance.subarraySum_Optimal(Arrays.copyOf(ssek_nums, ssek_nums.length), ssek_k));
    }

    @Benchmark
    public void ssek_BruteForce(Blackhole bh) {
        bh.consume(subarraySumEqualsKInstance.subarraySum_BruteForce(Arrays.copyOf(ssek_nums, ssek_nums.length), ssek_k));
    }
}
```