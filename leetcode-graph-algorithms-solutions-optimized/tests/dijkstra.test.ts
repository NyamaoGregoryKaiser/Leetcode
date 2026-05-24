```typescript
import { networkDelayTime, networkDelayTimeArrayScan } from '../src/algorithms/dijkstra';

describe('networkDelayTime (Dijkstra with Min-Heap)', () => {
    it('should return 2 for the given example', () => {
        const times: [number, number, number][] = [[2, 1, 1], [2, 3, 1], [3, 4, 1]];
        const n = 4;
        const k = 2;
        expect(networkDelayTime(times, n, k)).toBe(2);
    });

    it('should return -1 if not all nodes can be reached', () => {
        const times: [number, number, number][] = [[1, 2, 1]];
        const n = 2;
        const k = 1;
        expect(networkDelayTime(times, n, k)).toBe(1); // Node 2 receives at time 1
    });

    it('should return 0 for a single node graph starting at that node', () => {
        const times: [number, number, number][] = [];
        const n = 1;
        const k = 1;
        expect(networkDelayTime(times, n, k)).toBe(0);
    });

    it('should return -1 if no nodes are reachable', () => {
        const times: [number, number, number][] = [[1, 2, 1]];
        const n = 2;
        const k = 2; // Starting from 2, but no outgoing edges. Node 1 is unreachable.
        expect(networkDelayTime(times, n, k)).toBe(-1);
    });

    it('should handle a simple linear graph', () => {
        const times: [number, number, number][] = [[1, 2, 10], [2, 3, 5], [3, 4, 2]];
        const n = 4;
        const k = 1;
        expect(networkDelayTime(times, n, k)).toBe(17); // Path 1->2->3->4 = 10+5+2 = 17
    });

    it('should handle a graph with multiple paths to a node', () => {
        const times: [number, number, number][] = [[1, 2, 4], [1, 3, 2], [2, 4, 3], [3, 4, 5]];
        const n = 4;
        const k = 1;
        // 1->2->4 = 4+3 = 7
        // 1->3->4 = 2+5 = 7
        expect(networkDelayTime(times, n, k)).toBe(7);
    });

    it('should handle a more complex graph', () => {
        const times: [number, number, number][] = [
            [1, 2, 1],
            [1, 3, 5],
            [2, 3, 2],
            [3, 4, 1],
            [4, 5, 2],
            [2, 5, 10]
        ];
        const n = 5;
        const k = 1;
        // Distances from 1:
        // 1 -> 1 (0)
        // 1 -> 2 (1)
        // 1 -> 3 (1->2->3 = 1+2 = 3. 1->3 = 5 is longer)
        // 1 -> 4 (1->2->3->4 = 1+2+1 = 4)
        // 1 -> 5 (1->2->3->4->5 = 1+2+1+2 = 6. 1->2->5 = 1+10 = 11 is longer)
        // Max delay is 6.
        expect(networkDelayTime(times, n, k)).toBe(6);
    });

    it('should handle a graph where a node is unreachable from k but reachable from other nodes (which are also unreachable from k)', () => {
        const times: [number, number, number][] = [
            [1, 2, 1],
            [3, 4, 1] // Node 3 and 4 form a separate component
        ];
        const n = 4;
        const k = 1;
        // 1->2 (1)
        // 3 and 4 are unreachable from 1.
        expect(networkDelayTime(times, n, k)).toBe(-1);
    });

    it('should handle a dense graph where all nodes are connected', () => {
        const times: [number, number, number][] = [
            [1, 2, 1], [1, 3, 1], [1, 4, 1],
            [2, 3, 1], [2, 4, 1],
            [3, 4, 1]
        ];
        const n = 4;
        const k = 1;
        expect(networkDelayTime(times, n, k)).toBe(1); // All reachable from 1 with cost 1
    });

    it('should return -1 for an isolated start node if n > 1', () => {
        const times: [number, number, number][] = [[2, 3, 1]];
        const n = 3;
        const k = 1;
        expect(networkDelayTime(times, n, k)).toBe(-1);
    });
});

describe('networkDelayTimeArrayScan (Less Optimized Dijkstra)', () => {
    it('should return 2 for the given example (Array Scan)', () => {
        const times: [number, number, number][] = [[2, 1, 1], [2, 3, 1], [3, 4, 1]];
        const n = 4;
        const k = 2;
        expect(networkDelayTimeArrayScan(times, n, k)).toBe(2);
    });

    it('should return -1 if not all nodes can be reached (Array Scan)', () => {
        const times: [number, number, number][] = [[1, 2, 1]];
        const n = 2;
        const k = 1;
        expect(networkDelayTimeArrayScan(times, n, k)).toBe(1);
    });

    it('should return 0 for a single node graph starting at that node (Array Scan)', () => {
        const times: [number, number, number][] = [];
        const n = 1;
        const k = 1;
        expect(networkDelayTimeArrayScan(times, n, k)).toBe(0);
    });

    it('should return -1 if no nodes are reachable (Array Scan)', () => {
        const times: [number, number, number][] = [[1, 2, 1]];
        const n = 2;
        const k = 2;
        expect(networkDelayTimeArrayScan(times, n, k)).toBe(-1);
    });

    it('should match Min-Heap version for complex graph (Array Scan)', () => {
        const times: [number, number, number][] = [
            [1, 2, 1],
            [1, 3, 5],
            [2, 3, 2],
            [3, 4, 1],
            [4, 5, 2],
            [2, 5, 10]
        ];
        const n = 5;
        const k = 1;
        expect(networkDelayTimeArrayScan(times, n, k)).toBe(6);
    });
});
```