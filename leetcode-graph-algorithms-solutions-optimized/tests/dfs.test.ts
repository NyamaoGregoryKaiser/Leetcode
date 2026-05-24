```typescript
import { numIslands, generalDfsTraversalRecursive, generalDfsTraversalIterative } from '../src/algorithms/dfs';

describe('numIslands', () => {
    it('should return 3 for the given example grid', () => {
        const grid = [
            ["1", "1", "0", "0", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "1", "0", "0"],
            ["0", "0", "0", "1", "1"]
        ];
        expect(numIslands(grid)).toBe(3);
    });

    it('should return 1 for a single large island', () => {
        const grid = [
            ["1", "1", "1", "1", "0"],
            ["1", "1", "0", "1", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "0", "0", "0"]
        ];
        expect(numIslands(grid)).toBe(1);
    });

    it('should return 0 for an empty grid', () => {
        const grid: string[][] = [];
        expect(numIslands(grid)).toBe(0);
    });

    it('should return 0 for a grid with only water', () => {
        const grid = [
            ["0", "0", "0"],
            ["0", "0", "0"],
            ["0", "0", "0"]
        ];
        expect(numIslands(grid)).toBe(0);
    });

    it('should return correct count for multiple small islands', () => {
        const grid = [
            ["1", "0", "1", "0", "1"],
            ["0", "1", "0", "1", "0"],
            ["1", "0", "1", "0", "1"]
        ];
        // Each '1' separated by '0's is an island in this configuration
        expect(numIslands(grid)).toBe(9);
    });

    it('should handle a 1x1 island', () => {
        const grid = [["1"]];
        expect(numIslands(grid)).toBe(1);
    });

    it('should handle a 1x1 water', () => {
        const grid = [["0"]];
        expect(numIslands(grid)).toBe(0);
    });

    it('should return 1 for a complex L-shaped island', () => {
        const grid = [
            ["1", "1", "0"],
            ["1", "1", "0"],
            ["0", "1", "1"]
        ];
        expect(numIslands(grid)).toBe(1);
    });

    it('should handle a grid with islands touching at corners (not counted as connected)', () => {
        const grid = [
            ["1", "0", "1"],
            ["0", "0", "0"],
            ["1", "0", "1"]
        ];
        // The '1's at corners are not horizontally/vertically connected
        expect(numIslands(grid)).toBe(4);
    });

    it('should work on a larger grid with mixed patterns', () => {
        const grid = [
            ["1", "1", "1", "1", "0", "0", "0"],
            ["1", "1", "0", "1", "0", "1", "1"],
            ["1", "1", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "1", "1", "0"]
        ];
        // Expected islands:
        // Top-left block: (0,0)-(2,0) and (0,1)-(1,1) etc forms 1 island
        // (0,3) isolated land forms part of the above island via (1,3)
        // (1,5)-(1,6) is another island
        // (3,4)-(3,5) is another island
        // So, 3 islands.
        expect(numIslands(grid)).toBe(3);
    });
});


describe('generalDfsTraversalRecursive', () => {
    it('should perform a basic DFS traversal on a simple graph', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, [1, 2]);
        graph.set(1, [3]);
        graph.set(2, [4]);
        graph.set(3, [5]);
        graph.set(4, []);
        graph.set(5, []);

        const result = generalDfsTraversalRecursive(graph, 0);
        // DFS order can vary depending on adjacency list order.
        // If 1 is processed before 2, then path 0->1->3->5, then 0->2->4
        expect(result).toEqual([0, 1, 3, 5, 2, 4]);
    });

    it('should handle cycles gracefully', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, [1, 2]);
        graph.set(1, [0, 3]);
        graph.set(2, [0, 4]);
        graph.set(3, [1, 5]);
        graph.set(4, [2, 5]);
        graph.set(5, [3, 4]);

        const result = generalDfsTraversalRecursive(graph, 0);
        // Check if all nodes are visited and no duplicates
        expect(new Set(result).size).toBe(6);
        expect(result.length).toBe(6);
        expect(result.sort()).toEqual([0, 1, 2, 3, 4, 5].sort());
    });

    it('should handle disconnected graphs (only visits component of startNode)', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, [1]);
        graph.set(1, [0]);
        graph.set(2, [3]);
        graph.set(3, [2]);

        const result = generalDfsTraversalRecursive(graph, 0);
        expect(result).toEqual([0, 1]);
    });

    it('should handle a single node graph', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, []);
        const result = generalDfsTraversalRecursive(graph, 0);
        expect(result).toEqual([0]);
    });
});

describe('generalDfsTraversalIterative', () => {
    it('should perform a basic DFS traversal on a simple graph', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, [1, 2]);
        graph.set(1, [3]);
        graph.set(2, [4]);
        graph.set(3, [5]);
        graph.set(4, []);
        graph.set(5, []);

        const result = generalDfsTraversalIterative(graph, 0);
        // Iterative DFS order can be different from recursive based on push/pop order.
        // If neighbors are pushed left to right, and stack is LIFO, rightmost is processed first.
        // 0 pushed. Pop 0. Add 0 to result. Push 2, Push 1.
        // Pop 1. Add 1 to result. Push 3.
        // Pop 3. Add 3 to result. Push 5.
        // Pop 5. Add 5 to result.
        // Pop 2. Add 2 to result. Push 4.
        // Pop 4. Add 4 to result.
        // Expected: [0, 1, 3, 5, 2, 4] or [0, 2, 4, 1, 3, 5]
        expect(result).toEqual([0, 2, 4, 1, 3, 5]); // This is one valid iterative DFS order
    });

    it('should handle cycles gracefully', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, [1, 2]);
        graph.set(1, [0, 3]);
        graph.set(2, [0, 4]);
        graph.set(3, [1, 5]);
        graph.set(4, [2, 5]);
        graph.set(5, [3, 4]);

        const result = generalDfsTraversalIterative(graph, 0);
        expect(new Set(result).size).toBe(6);
        expect(result.length).toBe(6);
        expect(result.sort()).toEqual([0, 1, 2, 3, 4, 5].sort());
    });

    it('should handle disconnected graphs (only visits component of startNode)', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, [1]);
        graph.set(1, [0]);
        graph.set(2, [3]);
        graph.set(3, [2]);

        const result = generalDfsTraversalIterative(graph, 0);
        expect(result).toEqual([0, 1]);
    });

    it('should handle a single node graph', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, []);
        const result = generalDfsTraversalIterative(graph, 0);
        expect(result).toEqual([0]);
    });
});
```