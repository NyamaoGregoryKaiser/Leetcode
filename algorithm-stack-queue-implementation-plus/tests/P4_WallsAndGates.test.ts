```typescript
/**
 * @fileoverview Test suite for P4_WallsAndGates.ts
 */

import { wallsAndGates, INF } from '../src/problems/P4_WallsAndGates';

describe('P4: Walls and Gates (Multi-Source BFS)', () => {

    const cloneGrid = (grid: number[][]): number[][] => {
        return grid.map(row => [...row]);
    };

    test('should fill distances correctly for a simple grid', () => {
        const grid = [
            [INF, -1, 0, INF],
            [INF, INF, INF, -1],
            [INF, -1, INF, -1],
            [0, -1, INF, INF]
        ];
        const expected = [
            [3, -1, 0, 1],
            [2, 2, 1, -1],
            [1, -1, 2, -1],
            [0, -1, 3, 4]
        ];
        wallsAndGates(grid);
        expect(grid).toEqual(expected);
    });

    test('should handle a grid with only walls and gates', () => {
        const grid = [
            [0, -1],
            [-1, 0]
        ];
        const expected = [
            [0, -1],
            [-1, 0]
        ];
        wallsAndGates(grid);
        expect(grid).toEqual(expected);
    });

    test('should handle a grid with no gates', () => {
        const grid = [
            [INF, -1, INF],
            [INF, -1, INF],
            [-1, INF, INF]
        ];
        const expected = [
            [INF, -1, INF],
            [INF, -1, INF],
            [-1, INF, INF]
        ];
        wallsAndGates(grid);
        expect(grid).toEqual(expected);
    });

    test('should handle a grid with all empty rooms reachable by a single gate', () => {
        const grid = [
            [INF, INF, INF],
            [INF, 0, INF],
            [INF, INF, INF]
        ];
        const expected = [
            [2, 1, 2],
            [1, 0, 1],
            [2, 1, 2]
        ];
        wallsAndGates(grid);
        expect(grid).toEqual(expected);
    });

    test('should handle a grid where some rooms are unreachable', () => {
        const grid = [
            [INF, -1, INF],
            [INF, -1, INF],
            [INF, 0, INF]
        ];
        const expected = [
            [INF, -1, INF], // Unreachable
            [2, -1, 2],
            [1, 0, 1]
        ];
        wallsAndGates(grid);
        expect(grid).toEqual(expected);
    });

    test('should handle a 1x1 grid with a gate', () => {
        const grid = [[0]];
        const expected = [[0]];
        wallsAndGates(grid);
        expect(grid).toEqual(expected);
    });

    test('should handle a 1x1 grid with an empty room', () => {
        const grid = [[INF]];
        const expected = [[INF]];
        wallsAndGates(grid);
        expect(grid).toEqual(expected);
    });

    test('should handle a 1x1 grid with a wall', () => {
        const grid = [[-1]];
        const expected = [[-1]];
        wallsAndGates(grid);
        expect(grid).toEqual(expected);
    });

    test('should handle large rectangular grid', () => {
        const initialGrid = [
            [INF, INF, INF, INF, 0],
            [INF, -1, INF, -1, INF],
            [INF, INF, INF, INF, INF],
            [0, INF, -1, INF, INF],
            [INF, INF, INF, INF, INF]
        ];
        const expectedGrid = [
            [2, 3, 2, 1, 0],
            [1, -1, 1, -1, 1],
            [2, 1, 2, 2, 2],
            [0, 1, -1, 3, 3],
            [1, 2, 3, 4, 4]
        ];
        const grid = cloneGrid(initialGrid);
        wallsAndGates(grid);
        expect(grid).toEqual(expectedGrid);
    });

    test('should handle a complex scenario with multiple paths', () => {
        const initialGrid = [
            [INF, -1, 0, INF, INF],
            [INF, INF, INF, -1, INF],
            [INF, -1, INF, INF, INF],
            [0, INF, INF, INF, -1],
            [INF, INF, -1, INF, INF]
        ];
        const expectedGrid = [
            [3, -1, 0, 1, 2],
            [2, 2, 1, -1, 3],
            [1, -1, 2, 2, 3],
            [0, 1, 2, 3, -1],
            [1, 2, -1, 4, 5]
        ];
        const grid = cloneGrid(initialGrid);
        wallsAndGates(grid);
        expect(grid).toEqual(expectedGrid);
    });

    test('should not modify already calculated distances for closer gates', () => {
        const grid = [
            [INF, INF, INF],
            [INF, 0, INF],
            [INF, INF, 0]
        ];
        const expected = [
            [2, 1, 1],
            [1, 0, 1],
            [2, 1, 0]
        ];
        wallsAndGates(grid);
        expect(grid).toEqual(expected);
    });
});
```