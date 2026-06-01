```typescript
import { Graph } from '../../src/data-structures/Graph';
import { dijkstra, reconstructPathDijkstra } from '../../src/algorithms/dijkstra';

describe('dijkstra', () => {
    let graph: Graph<string>;

    beforeEach(() => {
        graph = new Graph<string>(true); // Dijkstra is typically for directed weighted graphs
    });

    // Helper to get distances for specific nodes easily
    const getDistances = (startNode: string, endNodes: string[]): Record<string, number> => {
        const { distances } = dijkstra(graph, startNode);
        const result: Record<string, number> = {};
        for (const node of endNodes) {
            result[node] = distances.get(node) ?? Infinity;
        }
        return result;
    };

    // Test Case 1: Simple Path
    it('should find the shortest path in a simple linear graph', () => {
        graph.addDirectedEdge('A', 'B', 1);
        graph.addDirectedEdge('B', 'C', 2);
        graph.addDirectedEdge('C', 'D', 3);

        const { distances, parentMap } = dijkstra(graph, 'A');

        expect(distances.get('A')).toBe(0);
        expect(distances.get('B')).toBe(1);
        expect(distances.get('C')).toBe(3);
        expect(distances.get('D')).toBe(6);
        expect(reconstructPathDijkstra('A', 'D', parentMap)).toEqual(['A', 'B', 'C', 'D']);
    });

    // Test Case 2: Multiple Paths, find the shortest weighted path
    it('should find the shortest weighted path with multiple options', () => {
        graph.addDirectedEdge('A', 'B', 4);
        graph.addDirectedEdge('A', 'C', 2);
        graph.addDirectedEdge('B', 'E', 3);
        graph.addDirectedEdge('C', 'D', 2);
        graph.addDirectedEdge('C', 'F', 4);
        graph.addDirectedEdge('D', 'E', 3);
        graph.addDirectedEdge('D', 'F', 1);
        graph.addDirectedEdge('E', 'Z', 1);
        graph.addDirectedEdge('F', 'Z', 3);

        const { distances, parentMap } = dijkstra(graph, 'A');

        // Path A -> Z:
        // A -> B (4) -> E (3) -> Z (1) = 8
        // A -> C (2) -> D (2) -> E (3) -> Z (1) = 8
        // A -> C (2) -> D (2) -> F (1) -> Z (3) = 8
        // All paths are 8. The specific path might vary based on PQ tie-breaking.
        expect(distances.get('Z')).toBe(8);
        expect(reconstructPathDijkstra('A', 'Z', parentMap)).toEqual(['A', 'C', 'D', 'F', 'Z']);
        expect(reconstructPathDijkstra('A', 'E', parentMap)).toEqual(['A', 'C', 'D', 'E']);
    });

    // Test Case 3: Start node and end node are the same
    it('should return 0 distance for start node to itself', () => {
        graph.addNode('A');
        const { distances, parentMap } = dijkstra(graph, 'A');
        expect(distances.get('A')).toBe(0);
        expect(reconstructPathDijkstra('A', 'A', parentMap)).toEqual(['A']);
    });

    // Test Case 4: No Path Exists (Disconnected Graph)
    it('should return Infinity distance for unreachable nodes', () => {
        graph.addDirectedEdge('A', 'B', 1);
        graph.addNode('C'); // C is disconnected from A
        graph.addDirectedEdge('D', 'E', 1); // another component

        const { distances, parentMap } = dijkstra(graph, 'A');
        expect(distances.get('C')).toBe(Infinity);
        expect(distances.get('D')).toBe(Infinity);
        expect(reconstructPathDijkstra('A', 'C', parentMap)).toEqual([]);
    });

    // Test Case 5: Start Node Not in Graph
    it('should return empty maps if start node is not in graph', () => {
        graph.addDirectedEdge('A', 'B', 1);
        const { distances, parentMap } = dijkstra(graph, 'X');
        expect(distances.size).toBe(0);
        expect(parentMap.size).toBe(0);
    });

    // Test Case 6: Empty Graph
    it('should return empty maps for an empty graph', () => {
        const emptyGraph = new Graph<string>(true);
        const { distances, parentMap } = dijkstra(emptyGraph, 'A');
        expect(distances.size).toBe(0);
        expect(parentMap.size).toBe(0);
    });

    // Test Case 7: Graph with Negative Weights (Dijkstra should not work correctly)
    it('should not work correctly with negative weights', () => {
        graph.addDirectedEdge('A', 'B', 1);
        graph.addDirectedEdge('B', 'C', -3);
        graph.addDirectedEdge('A', 'C', 5);

        // Expected if Dijkstra worked: A -> B -> C = 1 - 3 = -2
        // Dijkstra's will likely find A -> C = 5 as shorter first.
        const { distances } = dijkstra(graph, 'A');
        expect(distances.get('C')).toBe(2); // Dijkstra output
        // A -> B -> C should be -2, but Dijkstra finds 5, then updates to 2 if B is processed later
        // or just finds 2 from A->B->C (1 + -3 = -2) if the PQ extracted B properly and C was updated.
        // It *can* work if the negative edge doesn't create a shorter path than the 'finalized' ones
        // but it's not guaranteed. Let's make one where it definitely fails.

        const graphWithNegativeCycle = new Graph<string>(true);
        graphWithNegativeCycle.addDirectedEdge('S', 'A', 1);
        graphWithNegativeCycle.addDirectedEdge('A', 'B', -3);
        graphWithNegativeCycle.addDirectedEdge('B', 'S', 1); // Cycle S->A->B->S weight 1-3+1 = -1
        graphWithNegativeCycle.addDirectedEdge('S', 'C', 10);
        const res = dijkstra(graphWithNegativeCycle, 'S');
        expect(res.distances.get('S')).toBe(0); // This should be 0 because it's unreachable, or potentially -infinity if there's a negative cycle and it could be reached.
        // For a simple negative edge, Dijkstra might still work *if* the path doesn't go through the negative edge multiple times
        // and doesn't create a negative cycle.
        // With A(0) -> B(1) -> C(-3), dist(C) should be -2.
        // Dijkstra processes A (dist 0), adds (B,1), (C,5).
        // Extracts B (dist 1). Processes neighbors: C. New dist to C = 1-3 = -2. If dist(C) was 5, update to -2.
        // Extracts C (dist -2).
        // So with just a negative edge, it *can* work sometimes. The actual issue is negative cycles.
        // The spec for Dijkstra requires non-negative weights. Let's ensure our test case adheres.
        // For this specific case, it should be able to produce the correct value if the negative edge doesn't create a cycle
        // or a path that could be continuously shortened.
        // Our current implementation will correctly update C to -2.
        // The constraint is about *negative cycles*, not just negative edges.
        expect(distances.get('C')).toBe(-2);
        expect(reconstructPathDijkstra('A', 'C', parentMap)).toEqual(['A', 'B', 'C']);
    });

    // Test Case 8: Undirected Graph (Dijkstra works if treated as two directed edges)
    it('should work with an undirected graph (by adding directed edges in both ways)', () => {
        const undirectedWeightedGraph = new Graph<string>(true); // Still creating as directed, just adding edges both ways
        undirectedWeightedGraph.addDirectedEdge('A', 'B', 1);
        undirectedWeightedGraph.addDirectedEdge('B', 'A', 1);
        undirectedWeightedGraph.addDirectedEdge('B', 'C', 2);
        undirectedWeightedGraph.addDirectedEdge('C', 'B', 2);
        undirectedWeightedGraph.addDirectedEdge('A', 'C', 5);
        undirectedWeightedGraph.addDirectedEdge('C', 'A', 5);

        const { distances, parentMap } = dijkstra(undirectedWeightedGraph, 'A');
        expect(distances.get('A')).toBe(0);
        expect(distances.get('B')).toBe(1);
        expect(distances.get('C')).toBe(3); // A -> B (1) -> C (2) = 3
        expect(reconstructPathDijkstra('A', 'C', parentMap)).toEqual(['A', 'B', 'C']);
    });
});
```