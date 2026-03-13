package performance;

import com.binarysearch.algorithms.BinarySearchProblems;
import com.binarysearch.algorithms.BruteForceSolutions;
import com.binarysearch.utils.ArrayGenerator;
import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;

import java.util.concurrent.TimeUnit;

/**
 * Benchmarking class for comparing the performance of Binary Search algorithms
 * against their brute-force counterparts.
 * Uses JMH (Java Microbenchmark Harness).
 *
 * To run:
 * mvn clean install
 * java -jar target/benchmarks.jar
 */
@BenchmarkMode(Mode.AverageTime) // Measure average time per operation
@OutputTimeUnit(TimeUnit.MICROSECONDS) // Output time in microseconds
@State(Scope.Benchmark) // Each benchmark instance has its own state
@Fork(value = 1, jvmArgs = {"-Xms2G", "-Xmx2G"}) // Run the benchmark in a separate JVM, with 2GB heap
@Warmup(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS) // 5 warmup iterations, 1 second each
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS) // 5 actual measurement iterations, 1 second each
public class BinarySearchBenchmark {

    private BinarySearchProblems binarySearch;
    private BruteForceSolutions bruteForce;

    // Parameters for array size
    @Param({"100", "1000", "10000", "100000", "1000000"})
    public int N;

    private int[] sortedArray;
    private int[] sortedArrayWithDuplicates;
    private int[] rotatedSortedArray;
    private int[] peakArray;

    // Targets for search, chosen to represent various cases (found, not found, boundary)
    private int targetFound;
    private int targetNotFound;
    private int targetDuplicate;
    private int targetRotated;
    private int targetPeak; // Not a target to search, but for peak finding

    @Setup(Level.Trial)
    public void setup() {
        binarySearch = new BinarySearchProblems();
        bruteForce = new BruteForceSolutions();

        // Generate arrays for different problems
        sortedArray = ArrayGenerator.generateSortedArray(N);
        sortedArrayWithDuplicates = ArrayGenerator.generateSortedArrayWithDuplicates(N, 30); // 30% duplicates
        rotatedSortedArray = ArrayGenerator.generateRotatedSortedArray(N);
        peakArray = ArrayGenerator.generatePeakArray(N);

        // Define targets
        if (N > 0) {
            targetFound = sortedArray[N / 2]; // Middle element
            targetNotFound = sortedArray[0] - 1; // Element smaller than smallest
            if (sortedArrayWithDuplicates.length > 0) {
                targetDuplicate = sortedArrayWithDuplicates[N / 2]; // Element in the middle, likely duplicate
            } else {
                targetDuplicate = 0; // Default for empty array
            }
            targetRotated = rotatedSortedArray[N / 2];
        } else {
            targetFound = 0;
            targetNotFound = 0;
            targetDuplicate = 0;
            targetRotated = 0;
        }
        // For Sqrt(x), we just use N as input
    }

    // --- Problem 1: Standard Binary Search ---
    @Benchmark
    public void bsFind(Blackhole bh) {
        bh.consume(binarySearch.find(sortedArray, targetFound));
    }

    @Benchmark
    public void bfFind(Blackhole bh) {
        bh.consume(bruteForce.find(sortedArray, targetFound));
    }

    @Benchmark
    public void bsFindRecursive(Blackhole bh) {
        bh.consume(binarySearch.findRecursive(sortedArray, targetFound));
    }

    // --- Problem 2: Find First Occurrence ---
    @Benchmark
    public void bsFindFirst(Blackhole bh) {
        bh.consume(binarySearch.findFirst(sortedArrayWithDuplicates, targetDuplicate));
    }

    @Benchmark
    public void bfFindFirst(Blackhole bh) {
        bh.consume(bruteForce.findFirst(sortedArrayWithDuplicates, targetDuplicate));
    }

    // --- Problem 2: Find Last Occurrence ---
    @Benchmark
    public void bsFindLast(Blackhole bh) {
        bh.consume(binarySearch.findLast(sortedArrayWithDuplicates, targetDuplicate));
    }

    @Benchmark
    public void bfFindLast(Blackhole bh) {
        bh.consume(bruteForce.findLast(sortedArrayWithDuplicates, targetDuplicate));
    }

    // --- Problem 3: Search in Rotated Sorted Array ---
    @Benchmark
    public void bsSearchInRotated(Blackhole bh) {
        bh.consume(binarySearch.searchInRotatedSortedArray(rotatedSortedArray, targetRotated));
    }

    @Benchmark
    public void bfSearchInRotated(Blackhole bh) {
        bh.consume(bruteForce.searchInRotatedSortedArray(rotatedSortedArray, targetRotated));
    }

    // --- Problem 4: Find Peak Element ---
    @Benchmark
    public void bsFindPeak(Blackhole bh) {
        bh.consume(binarySearch.findPeakElement(peakArray));
    }

    @Benchmark
    public void bfFindPeak(Blackhole bh) {
        bh.consume(bruteForce.findPeakElement(peakArray));
    }

    // --- Problem 5: Sqrt(x) ---
    @Benchmark
    public void bsMySqrt(Blackhole bh) {
        bh.consume(binarySearch.mySqrt(N * N)); // Using N*N to get a perfect square, can also use just N
    }

    @Benchmark
    public void bfMySqrt(Blackhole bh) {
        bh.consume(bruteForce.mySqrt(N * N));
    }
}