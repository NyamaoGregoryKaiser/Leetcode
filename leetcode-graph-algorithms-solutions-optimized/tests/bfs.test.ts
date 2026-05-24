```typescript
import { shortestPathBinaryMatrix, bfsTraversal } from '../src/algorithms/bfs';

describe('shortestPathBinaryMatrix', () => {
    it('should return 2 for a 2x2 clear path', () => {
        const grid = [[0, 1], [1, 0]];
        expect(shortestPathBinaryMatrix(grid)).toBe(2);
    });

    it('should return -1 if start cell is blocked', () => {
        const grid = [[1, 0, 0], [0, 0, 0], [0, 0, 0]];
        expect(shortestPathBinaryMatrix(grid)).toBe(-1);
    });

    it('should return -1 if end cell is blocked', () => {
        const grid = [[0, 0, 0], [0, 0, 0], [0, 0, 1]];
        expect(shortestPathBinaryMatrix(grid)).toBe(-1);
    });

    it('should return -1 if no clear path exists', () => {
        const grid = [
            [0, 0, 0],
            [1, 1, 0],
            [1, 1, 0]
        ];
        expect(shortestPathBinaryMatrix(grid)).toBe(-1);
    });

    it('should return 1 for a 1x1 clear grid', () => {
        const grid = [[0]];
        expect(shortestPathBinaryMatrix(grid)).toBe(1);
    });

    it('should return correct path length for a larger grid', () => {
        const grid = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ];
        // Path: (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) length 5
        // Path: (0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2) length 5
        expect(shortestPathBinaryMatrix(grid)).toBe(4); // Example path (0,0)->(1,0)->(2,1)->(2,2) is 4 steps.
        // (0,0) -> (0,1) -> (1,2) -> (2,2) is length 4
        // (0,0) -> (1,0) -> (2,1) -> (2,2) is length 4
    });

    it('should handle grid with only obstacles', () => {
        const grid = [
            [0, 0, 0],
            [0, 1, 0],
            [1, 1, 1]
        ];
        expect(shortestPathBinaryMatrix(grid)).toBe(-1);
    });

    it('should find path through diagonals', () => {
        const grid = [
            [0, 0, 1, 0],
            [1, 0, 1, 0],
            [0, 0, 0, 0],
            [0, 1, 0, 0]
        ];
        // Path could be (0,0)->(1,1)->(2,2)->(3,3) which is 4 steps
        expect(shortestPathBinaryMatrix(grid)).toBe(4);
    });

    it('should find path with complex turns', () => {
        const grid = [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]
        ];
        // A possible path: (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,1) -> (2,0) -> (3,0) -> (4,1) -> (4,2) -> (4,3) -> (4,4)
        // Length 11
        // Let's trace it:
        // (0,0) -> dist 1
        // (0,1) -> dist 2
        // (0,2) -> dist 3
        // (1,2) -> dist 4 (blocked)
        // (2,1) -> dist 4
        // (2,0) -> dist 5
        // (3,0) -> dist 6
        // (4,1) -> dist 7
        // (4,2) -> dist 8
        // (4,3) -> dist 9
        // (4,4) -> dist 10
        expect(shortestPathBinaryMatrix(grid)).toBe(10);
    });

    it('should handle large grids efficiently (performance check - heuristic, not strict)', () => {
        const n = 100;
        const largeGrid = Array(n).fill(0).map(() => Array(n).fill(0));
        // It's expected to finish within reasonable time for N=100
        expect(shortestPathBinaryMatrix(largeGrid)).toBe(n + n - 1); // Straight diagonal path
    });
});

describe('bfsTraversal', () => {
    it('should perform a basic BFS traversal on a simple graph', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, [1, 2]);
        graph.set(1, [3]);
        graph.set(2, [3, 4]);
        graph.set(3, [5]);
        graph.set(4, []);
        graph.set(5, []);

        const result = bfsTraversal(graph, 0);
        expect(result).toEqual([0, 1, 2, 3, 4, 5]); // Example BFS order
    });

    it('should handle a graph with cycles', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, [1, 2]);
        graph.set(1, [0, 3]);
        graph.set(2, [0, 4]);
        graph.set(3, [1, 5]);
        graph.set(4, [2, 5]);
        graph.set(5, [3, 4]);

        const result = bfsTraversal(graph, 0);
        // BFS order can vary slightly based on adjacency list order, but all nodes should be visited once.
        expect(result.sort()).toEqual([0, 1, 2, 3, 4, 5].sort());
        expect(result.length).toBe(6); // Ensure no duplicates due to cycles
    });

    it('should handle disconnected graphs (only visits component of startNode)', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, [1]);
        graph.set(1, [0]);
        graph.set(2, [3]);
        graph.set(3, [2]);

        const result = bfsTraversal(graph, 0);
        expect(result).toEqual([0, 1]);
    });

    it('should handle a single node graph', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, []);
        const result = bfsTraversal(graph, 0);
        expect(result).toEqual([0]);
    });

    it('should handle an empty graph or invalid startNode', () => {
        const graph = new Map<number, number[]>();
        graph.set(0, [1]);
        // If startNode doesn't exist, it should return an empty array for graph.get(startNode) || []
        const result = bfsTraversal(graph, 99);
        expect(result).toEqual([]);
    });
});
```