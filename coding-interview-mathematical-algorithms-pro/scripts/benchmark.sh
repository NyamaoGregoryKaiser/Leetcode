#!/bin/bash

# benchmark.sh
# This script compiles the Java project and runs a simple benchmark
# for selected algorithms to compare their performance.
#
# Usage: ./scripts/benchmark.sh
#

echo "--- Starting Math Algorithms Benchmarks ---"

# Compile the Java project using Gradle
echo "Compiling Java project..."
./gradlew build -x test > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Compilation failed. Please check build errors."
    exit 1
fi
echo "Compilation successful."

# Define the classpath for running Java classes
CLASSPATH="build/classes/java/main"

# --- Benchmark Fibonacci Numbers ---
echo "\n--- Benchmarking Fibonacci Numbers ---"
FIB_N_SMALL=20
FIB_N_MEDIUM=40
FIB_N_LARGE=45 # Recursive will be very slow for >40, so cap it for default runs. 50+ for iterative.

# Function to run a Fibonacci benchmark
run_fib_benchmark() {
    local method_name=$1
    local n=$2
    local runs=$3
    local total_time=0
    local result=""

    echo "  Running ${method_name}(${n}) for ${runs} iterations..."
    start_time=$(date +%s%N)
    for ((i=0; i<runs; i++)); do
        result=$(java -cp ${CLASSPATH} com.example.mathproblems.BenchmarkRunner fibonacci ${method_name} ${n})
        if [ $? -ne 0 ]; then
            echo "    Error running ${method_name}(${n}). Skipping."
            return
        fi
    done
    end_time=$(date +%s%N)
    total_time=$(( (end_time - start_time) / 1000000 )) # Convert nanoseconds to milliseconds

    echo "    Result: ${result}" # Last computed result
    echo "    ${method_name}(${n}) took: ${total_time} ms"
}

# Create a temporary Java file for benchmark execution without needing to modify Main.java or algorithms
# This allows passing method names dynamically.
# For simplicity, we'll use a direct call approach via a wrapper.
# In a real scenario, consider JMH (Java Microbenchmark Harness) for robust benchmarks.

# Create BenchmarkRunner.java
cat <<EOF > src/main/java/com/example/mathproblems/BenchmarkRunner.java
package com.example.mathproblems;

import com.example.mathproblems.algorithms.MathAlgorithms;
import com.example.mathproblems.algorithms.PrimeNumberAlgorithms;

public class BenchmarkRunner {
    public static void main(String[] args) {
        if (args.length < 2) {
            System.err.println("Usage: java BenchmarkRunner <category> <method> [args...]");
            return;
        }

        String category = args[0];
        String method = args[1];

        try {
            switch (category) {
                case "fibonacci":
                    MathAlgorithms mathAlgorithms = new MathAlgorithms();
                    int n = Integer.parseInt(args[2]);
                    long fibResult = -1;
                    switch (method) {
                        case "recursive": fibResult = mathAlgorithms.fibonacciRecursive(n); break;
                        case "memoized": fibResult = mathAlgorithms.fibonacciMemoized(n); break;
                        case "iterative": fibResult = mathAlgorithms.fibonacciIterative(n); break;
                        case "spaceOptimized": fibResult = mathAlgorithms.fibonacciSpaceOptimized(n); break;
                        default: throw new IllegalArgumentException("Unknown fibonacci method: " + method);
                    }
                    System.out.print(fibResult); // Print result to stdout for capture
                    break;
                case "power":
                    mathAlgorithms = new MathAlgorithms();
                    double x = Double.parseDouble(args[2]);
                    int exp = Integer.parseInt(args[3]);
                    double powResult = 0.0;
                    switch (method) {
                        case "naive": powResult = mathAlgorithms.powerNaive(x, exp); break;
                        case "optimizedRecursive": powResult = mathAlgorithms.powerOptimizedRecursive(x, exp); break;
                        case "optimizedIterative": powResult = mathAlgorithms.powerOptimizedIterative(x, exp); break;
                        default: throw new IllegalArgumentException("Unknown power method: " + method);
                    }
                    System.out.print(powResult);
                    break;
                case "primality":
                    PrimeNumberAlgorithms primeAlgorithms = new PrimeNumberAlgorithms();
                    n = Integer.parseInt(args[2]);
                    boolean primeResult = false;
                    switch (method) {
                        case "naive": primeResult = primeAlgorithms.isPrimeNaive(n); break;
                        case "optimized": primeResult = primeAlgorithms.isPrimeOptimized(n); break;
                        default: throw new IllegalArgumentException("Unknown primality method: " + method);
                    }
                    System.out.print(primeResult);
                    break;
                case "sieve":
                    primeAlgorithms = new PrimeNumberAlgorithms();
                    n = Integer.parseInt(args[2]);
                    List<Integer> sieveResult = null; // We'll just run it, not print the huge list
                    switch (method) {
                        case "booleanArray": primeAlgorithms.sieveOfEratosthenesBooleanArray(n); break;
                        case "toList": sieveResult = primeAlgorithms.sieveOfEratosthenesToList(n); break;
                        default: throw new IllegalArgumentException("Unknown sieve method: " + method);
                    }
                    // For sieve, we don't print the full list to avoid massive output.
                    // Just indicating successful run is enough.
                    System.out.print("Sieve executed for N=" + n);
                    break;
                default:
                    System.err.println("Unknown benchmark category: " + category);
            }
        } catch (Exception e) {
            System.err.println("Error during benchmark execution: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }
}
EOF
# Recompile to include BenchmarkRunner.java
./gradlew compileJava > /dev/null 2>&1

run_fib_benchmark "recursive" $FIB_N_SMALL 1000
run_fib_benchmark "memoized" $FIB_N_MEDIUM 100000
run_fib_benchmark "iterative" $FIB_N_MEDIUM 100000
run_fib_benchmark "spaceOptimized" $FIB_N_MEDIUM 100000
echo "  Note: For larger N (e.g., >40), recursive Fibonacci becomes extremely slow."
run_fib_benchmark "iterative" $FIB_N_LARGE 10000 # Example for larger N, fewer runs
run_fib_benchmark "spaceOptimized" $FIB_N_LARGE 10000


# --- Benchmark Power Function ---
echo "\n--- Benchmarking Power Function ---"
POWER_X=2.0
POWER_N_SMALL=10
POWER_N_MEDIUM=10000
POWER_N_LARGE=1000000000 # 10^9

# Function to run a Power benchmark
run_power_benchmark() {
    local method_name=$1
    local x=$2
    local n=$3
    local runs=$4
    local total_time=0
    local result=""

    echo "  Running ${method_name}(${x}^${n}) for ${runs} iterations..."
    start_time=$(date +%s%N)
    for ((i=0; i<runs; i++)); do
        result=$(java -cp ${CLASSPATH} com.example.mathproblems.BenchmarkRunner power ${method_name} ${x} ${n})
        if [ $? -ne 0 ]; then
            echo "    Error running ${method_name}(${x}^${n}). Skipping."
            return
        fi
    done
    end_time=$(date +%s%N)
    total_time=$(( (end_time - start_time) / 1000000 )) # Convert nanoseconds to milliseconds

    echo "    Result: ${result}"
    echo "    ${method_name}(${x}^${n}) took: ${total_time} ms"
}

run_power_benchmark "naive" $POWER_X $POWER_N_SMALL 100000
run_power_benchmark "optimizedRecursive" $POWER_X $POWER_N_SMALL 100000
run_power_benchmark "optimizedIterative" $POWER_X $POWER_N_SMALL 100000

run_power_benchmark "naive" $POWER_X $POWER_N_MEDIUM 1000 # Naive will be slow here
run_power_benchmark "optimizedRecursive" $POWER_X $POWER_N_MEDIUM 100000
run_power_benchmark "optimizedIterative" $POWER_X $POWER_N_MEDIUM 100000

run_power_benchmark "optimizedIterative" $POWER_X $POWER_N_LARGE 10000 # Optimized methods for large N


# --- Benchmark Primality Test ---
echo "\n--- Benchmarking Primality Test ---"
PRIME_TEST_N_SMALL=97
PRIME_TEST_N_MEDIUM=999997 # A large prime
PRIME_TEST_N_LARGE=999999937 # Another large prime

# Function to run a Primality benchmark
run_primality_benchmark() {
    local method_name=$1
    local n=$2
    local runs=$3
    local total_time=0
    local result=""

    echo "  Running ${method_name}(${n}) for ${runs} iterations..."
    start_time=$(date +%s%N)
    for ((i=0; i<runs; i++)); do
        result=$(java -cp ${CLASSPATH} com.example.mathproblems.BenchmarkRunner primality ${method_name} ${n})
        if [ $? -ne 0 ]; then
            echo "    Error running ${method_name}(${n}). Skipping."
            return
        fi
    done
    end_time=$(date +%s%N)
    total_time=$(( (end_time - start_time) / 1000000 )) # Convert nanoseconds to milliseconds

    echo "    Result: ${result}"
    echo "    ${method_name}(${n}) took: ${total_time} ms"
}

run_primality_benchmark "naive" $PRIME_TEST_N_SMALL 100000
run_primality_benchmark "optimized" $PRIME_TEST_N_SMALL 100000

run_primality_benchmark "naive" $PRIME_TEST_N_MEDIUM 10 # Naive will be very slow
run_primality_benchmark "optimized" $PRIME_TEST_N_MEDIUM 1000

run_primality_benchmark "optimized" $PRIME_TEST_N_LARGE 1000


# --- Benchmark Sieve of Eratosthenes ---
echo "\n--- Benchmarking Sieve of Eratosthenes ---"
SIEVE_N_SMALL=1000
SIEVE_N_MEDIUM=100000
SIEVE_N_LARGE=1000000 # 1 million

# Function to run a Sieve benchmark
run_sieve_benchmark() {
    local method_name=$1
    local n=$2
    local runs=$3
    local total_time=0
    local result=""

    echo "  Running ${method_name}(N=${n}) for ${runs} iterations..."
    start_time=$(date +%s%N)
    for ((i=0; i<runs; i++)); do
        result=$(java -cp ${CLASSPATH} com.example.mathproblems.BenchmarkRunner sieve ${method_name} ${n})
        if [ $? -ne 0 ]; then
            echo "    Error running ${method_name}(N=${n}). Skipping."
            return
        fi
    done
    end_time=$(date +%s%N)
    total_time=$(( (end_time - start_time) / 1000000 )) # Convert nanoseconds to milliseconds

    echo "    ${method_name}(N=${n}) took: ${total_time} ms"
}

run_sieve_benchmark "booleanArray" $SIEVE_N_SMALL 1000
run_sieve_benchmark "toList" $SIEVE_N_SMALL 1000

run_sieve_benchmark "booleanArray" $SIEVE_N_MEDIUM 100
run_sieve_benchmark "toList" $SIEVE_N_MEDIUM 100

run_sieve_benchmark "booleanArray" $SIEVE_N_LARGE 10
run_sieve_benchmark "toList" $SIEVE_N_LARGE 10

echo "\n--- Benchmarks Finished ---"

# Clean up temporary BenchmarkRunner.java
rm src/main/java/com/example/mathproblems/BenchmarkRunner.java
./gradlew compileJava > /dev/null 2>&1 # Recompile without the runner