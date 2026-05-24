import { solveNQueens, solveNQueensOptimizedSpace } from '@problems/nQueens';

describe('N-Queens Solver', () => {
    // Test for solveNQueens (using boolean board)
    describe('solveNQueens (Boolean Board)', () => {
        it('should return an empty array for n = 0', () => {
            expect(solveNQueens(0)).toEqual([]);
        });

        it('should return a single solution for n = 1', () => {
            const expected = [["Q"]];
            expect(solveNQueens(1)).toEqual(expected);
        });

        it('should return an empty array for n = 2 (no solution)', () => {
            expect(solveNQueens(2)).toEqual([]);
        });

        it('should return an empty array for n = 3 (no solution)', () => {
            expect(solveNQueens(3)).toEqual([]);
        });

        it('should return 2 solutions for n = 4', () => {
            const expected = [
                [".Q..", "...Q", "Q...", "..Q."],
                ["..Q.", "Q...", "...Q", ".Q.."]
            ];
            const result = solveNQueens(4);
            // Sort to ensure consistent order for comparison, as the algorithm's order might vary
            // based on how loops are implemented or how 'solutions' are collected.
            // For string arrays, sorting lexicographically usually works.
            const sortedResult = result.map(s => s.join('')).sort();
            const sortedExpected = expected.map(s => s.join('')).sort();
            expect(sortedResult.length).toBe(expected.length);
            expect(sortedResult).toEqual(sortedExpected);
        });

        it('should return 10 solutions for n = 5', () => {
            // For n=5, there are 10 unique solutions. We don't need to list them all, just check count.
            const solutions = solveNQueens(5);
            expect(solutions.length).toBe(10);

            // Optional: Basic check of solution format
            solutions.forEach(board => {
                expect(board.length).toBe(5);
                board.forEach(row => {
                    expect(row.length).toBe(5);
                    expect(row).toMatch(/^[.Q]{5}$/); // Contains only '.' or 'Q', exactly 5 chars
                    expect(row.split('Q').length - 1).toBeLessThanOrEqual(1); // At most one 'Q' per row (inherent)
                });
            });
        });

        it('should return 4 solutions for n = 6', () => {
            const solutions = solveNQueens(6);
            expect(solutions.length).toBe(4);
        });

        it('should return 40 solutions for n = 7', () => {
            const solutions = solveNQueens(7);
            expect(solutions.length).toBe(40);
        });
    });

    // Test for solveNQueensOptimizedSpace (using Set for O(1) checks)
    describe('solveNQueensOptimizedSpace (Set-based)', () => {
        it('should return an empty array for n = 0', () => {
            expect(solveNQueensOptimizedSpace(0)).toEqual([]);
        });

        it('should return a single solution for n = 1', () => {
            const expected = [["Q"]];
            expect(solveNQueensOptimizedSpace(1)).toEqual(expected);
        });

        it('should return an empty array for n = 2 (no solution)', () => {
            expect(solveNQueensOptimizedSpace(2)).toEqual([]);
        });

        it('should return an empty array for n = 3 (no solution)', () => {
            expect(solveNQueensOptimizedSpace(3)).toEqual([]);
        });

        it('should return 2 solutions for n = 4', () => {
            const expected = [
                [".Q..", "...Q", "Q...", "..Q."],
                ["..Q.", "Q...", "...Q", ".Q.."]
            ];
            const result = solveNQueensOptimizedSpace(4);
            const sortedResult = result.map(s => s.join('')).sort();
            const sortedExpected = expected.map(s => s.join('')).sort();
            expect(sortedResult.length).toBe(expected.length);
            expect(sortedResult).toEqual(sortedExpected);
        });

        it('should return 10 solutions for n = 5', () => {
            const solutions = solveNQueensOptimizedSpace(5);
            expect(solutions.length).toBe(10);
        });

        it('should return 4 solutions for n = 6', () => {
            const solutions = solveNQueensOptimizedSpace(6);
            expect(solutions.length).toBe(4);
        });

        it('should return 40 solutions for n = 7', () => {
            const solutions = solveNQueensOptimizedSpace(7);
            expect(solutions.length).toBe(40);
        });
    });
});