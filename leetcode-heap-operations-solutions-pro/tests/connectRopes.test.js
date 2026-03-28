```javascript
/**
 * connectRopes.test.js
 *
 * Jest test suite for the Connect Ropes with Minimum Cost problem.
 */

const { connectRopesWithMinCost, connectRopesWithMinCost_BruteForce } = require('../src/algorithms/connectRopes');
const { benchmark, benchmarkAverage } = require('../src/utils/performanceBenchmarking');

describe('connectRopesWithMinCost (Optimized Heap Approach)', () => {
    test('should calculate minimum cost for example 1', () => {
        const ropes = [4, 3, 2, 6];
        expect(connectRopesWithMinCost(ropes)).toBe(29);
    });

    test('should calculate minimum cost for example 2', () => {
        const ropes = [1, 2, 3, 4, 5];
        expect(connectRopesWithMinCost(ropes)).toBe(33);
    });

    test('should handle two ropes', () => {
        const ropes = [1, 2];
        expect(connectRopesWithMinCost(ropes)).toBe(3);
    });

    test('should handle single rope', () => {
        const ropes = [5];
        expect(connectRopesWithMinCost(ropes)).toBe(0);
    });

    test('should handle empty array', () => {
        const ropes = [];
        expect(connectRopesWithMinCost(ropes)).toBe(0);
    });

    test('should handle ropes with duplicates', () => {
        const ropes = [1, 1, 2, 2];
        // Connect 1,1 (cost 2) -> [2,2,2]
        // Connect 2,2 (cost 4) -> [2,4]
        // Connect 2,4 (cost 6) -> [6]
        // Total cost = 2 + 4 + 6 = 12
        expect(connectRopesWithMinCost(ropes)).toBe(12);
    });

    test('should handle ropes with zero length (if allowed, usually not practical)', () => {
        const ropes = [0, 0, 5, 10];
        // Connect 0,0 (cost 0) -> [0,5,10]
        // Connect 0,5 (cost 5) -> [5,10]
        // Connect 5,10 (cost 15) -> [15]
        // Total cost = 0 + 5 + 15 = 20
        expect(connectRopesWithMinCost(ropes)).toBe(20);
    });

    test('should handle a larger set of ropes', () => {
        const ropes = [8, 4, 6, 12, 1, 9, 3, 5, 7, 10];
        // Expected total cost:
        // [1,3,4,5,6,7,8,9,10,12]
        // 1+3=4 -> [4,4,5,6,7,8,9,10,12] Cost: 4
        // 4+4=8 -> [5,6,7,8,8,9,10,12] Cost: 8
        // 5+6=11 -> [7,8,8,9,10,11,12] Cost: 11
        // 7+8=15 -> [8,9,10,11,12,15] Cost: 15
        // 8+9=17 -> [10,11,12,15,17] Cost: 17
        // 10+11=21 -> [12,15,17,21] Cost: 21
        // 12+15=27 -> [17,21,27] Cost: 27
        // 17+21=38 -> [27,38] Cost: 38
        // 27+38=65 -> [65] Cost: 65
        // Total: 4+8+11+15+17+21+27+38+65 = 206
        expect(connectRopesWithMinCost(ropes)).toBe(206);
    });

    test('optimized vs brute force for Connect Ropes (large N)', () => {
        const N = 1000;
        const ropes = Array.from({ length: N }, () => Math.floor(Math.random() * 1000) + 1); // Ropes from 1 to 1000 length

        // Make copies for each benchmark run
        const ropesCopy1 = [...ropes];
        const ropesCopy2 = [...ropes];

        console.log(`\nBenchmarking Connect Ropes (N=${N}):`);

        // Optimized Heap solution
        const heapBenchmark = benchmark(() => connectRopesWithMinCost(ropesCopy1));
        console.log(`connectRopesWithMinCost (Heap): Result=${heapBenchmark.result}, Time=${heapBenchmark.durationMs.toFixed(3)}ms`);

        // Brute force (Sorting) solution
        const bruteForceBenchmark = benchmark(() => connectRopesWithMinCost_BruteForce(ropesCopy2));
        console.log(`connectRopesWithMinCost_BruteForce (Sorting): Result=${bruteForceBenchmark.result}, Time=${bruteForceBenchmark.durationMs.toFixed(3)}ms`);

        expect(heapBenchmark.result).toBe(bruteForceBenchmark.result);
        // Expect heap solution to be significantly faster for larger N
        expect(heapBenchmark.durationMs).toBeLessThan(bruteForceBenchmark.durationMs / 5); // Brute force is often O(N^2 log N) or O(N^2)
    });
});
```