```typescript
import { minimumCost } from '../src/algorithms/kruskal';

describe('minimumCost (Kruskal\'s Algorithm)', () => {
    it('should return 6 for the example connections', () => {
        const n = 3;
        const connections = [[1, 2, 5], [1, 3, 6], [2, 3, 1]];
        expect(minimumCost(n, connections)).toBe(6);
    });

    it('should handle a graph that is already connected with minimal cost', () => {
        const n = 2;
        const connections = [[1, 2, 1]];
        expect(minimumCost(n, connections)).toBe(1);
    });

    it('should return -1 if not all cities can be connected', () => {
        const n = 4;
        // Two disconnected components: (1,2) and (3,4)
        const connections = [[1, 2, 1], [3, 4, 2]];
        expect(minimumCost(n, connections)).toBe(-1);
    });

    it('should return 0 for a single city (already connected)', () => {
        const n = 1;
        const connections: [number, number, number][] = [];
        expect(minimumCost(n, connections)).toBe(0);
    });

    it('should choose cheaper edges over more expensive ones', () => {
        const n = 4;
        const connections = [
            [1, 2, 10],
            [1, 3, 1],
            [2, 3, 1],
            [3, 4, 2],
            [2, 4, 100]
        ];
        // Expected MST: (1,3,1), (2,3,1), (3,4,2)
        // Total cost: 1 + 1 + 2 = 4
        expect(minimumCost(n, connections)).toBe(4);
    });

    it('should handle a star-shaped graph', () => {
        const n = 5;
        const connections = [
            [1, 2, 10],
            [1, 3, 5],
            [1, 4, 1],
            [1, 5, 8]
        ];
        // All edges are connected to city 1, so all will be chosen.
        // Cost: 10 + 5 + 1 + 8 = 24
        expect(minimumCost(n, connections)).toBe(24);
    });

    it('should handle a fully connected graph (complete graph)', () => {
        const n = 4;
        const connections = [
            [1, 2, 1], [1, 3, 5], [1, 4, 10],
            [2, 3, 2], [2, 4, 6],
            [3, 4, 3]
        ];
        // Edges sorted: (1,2,1), (2,3,2), (3,4,3), (1,3,5), (2,4,6), (1,4,10)
        // Add (1,2,1) -> cost 1, edges 1. Sets: {1,2},{3},{4}
        // Add (2,3,2) -> cost 1+2=3, edges 2. Sets: {1,2,3},{4}
        // Add (3,4,3) -> cost 3+3=6, edges 3. Sets: {1,2,3,4}
        // All connected. Total cost 6.
        expect(minimumCost(n, connections)).toBe(6);
    });

    it('should return -1 for N > 1 with no connections', () => {
        const n = 5;
        const connections: [number, number, number][] = [];
        expect(minimumCost(n, connections)).toBe(-1);
    });

    it('should handle disconnected components not forming a full MST', () => {
        const n = 5;
        const connections = [
            [1, 2, 1],
            [2, 3, 1],
            [4, 5, 1] // Nodes 1,2,3 are connected. Nodes 4,5 are connected. But not all 5 are connected.
        ];
        expect(minimumCost(n, connections)).toBe(-1);
    });

    it('should handle duplicate edges (should not affect logic significantly due to sorting)', () => {
        const n = 3;
        const connections = [
            [1, 2, 5],
            [1, 2, 5], // Duplicate
            [1, 3, 6],
            [2, 3, 1]
        ];
        expect(minimumCost(n, connections)).toBe(6);
    });

    it('should handle zero-cost edges', () => {
        const n = 3;
        const connections = [
            [1, 2, 0],
            [1, 3, 10],
            [2, 3, 5]
        ];
        // MST: (1,2,0), (2,3,5) => cost 5
        expect(minimumCost(n, connections)).toBe(5);
    });
});
```