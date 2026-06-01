```typescript
import { Graph } from '../../src/data-structures/Graph';
import { bfsShortestPath } from '../../src/algorithms/bfs-shortest-path';

describe('bfsShortestPath', () => {
    let graph: Graph<string>;

    beforeEach(() => {
        graph = new Graph<string>(false); // Undirected graph for BFS shortest path
    });

    // Test Case 1: Simple Path
    it('should find the shortest path in a simple linear graph', () => {
        graph.addUndirectedEdge('A', 'B');
        graph.addUndirectedEdge('B', 'C');
        graph.addUndirectedEdge('C', 'D');
        const { path, distance } = bfsShortestPath(graph, 'A', 'D');
        expect(path).toEqual(['A', 'B', 'C', 'D']);
        expect(distance).toBe(3);
    });

    // Test Case 2: Multiple Paths, find the shortest
    it('should find the shortest path when multiple paths exist', () => {
        graph.addUndirectedEdge('A', 'B');
        graph.addUndirectedEdge('A', 'C');
        graph.addUndirectedEdge('B', 'D');
        graph.addUndirectedEdge('C', 'D');
        graph.addUndirectedEdge('C', 'E');
        graph.addUndirectedEdge('D', 'F');
        graph.addUndirectedEdge('E', 'F');
        // A-B-D-F (3 edges) vs A-C-F (2 edges) vs A-C-D-F (3 edges)
        const { path, distance } = bfsShortestPath(graph, 'A', 'F');
        expect(path).toEqual(['A', 'C', 'F']);
        expect(distance).toBe(2);
    });

    // Test Case 3: Start and End are the same
    it('should return path with single node and distance 0 if start and end are same', () => {
        graph.addNode('A');
        const { path, distance } = bfsShortestPath(graph, 'A', 'A');
        expect(path).toEqual(['A']);
        expect(distance).toBe(0);
    });

    // Test Case 4: No Path Exists (Disconnected Graph)
    it('should return empty path and -1 distance if no path exists', () => {
        graph.addUndirectedEdge('A', 'B');
        graph.addNode('C'); // C is disconnected
        const { path, distance } = bfsShortestPath(graph, 'A', 'C');
        expect(path).toEqual([]);
        expect(distance).toBe(-1);
    });

    // Test Case 5: Start or End Node Not in Graph
    it('should return empty path and -1 distance if start node is not in graph', () => {
        graph.addUndirectedEdge('A', 'B');
        const { path, distance } = bfsShortestPath(graph, 'X', 'A');
        expect(path).toEqual([]);
        expect(distance).toBe(-1);
    });

    it('should return empty path and -1 distance if end node is not in graph', () => {
        graph.addUndirectedEdge('A', 'B');
        const { path, distance } = bfsShortestPath(graph, 'A', 'Y');
        expect(path).toEqual([]);
        expect(distance).toBe(-1);
    });

    // Test Case 6: Empty Graph
    it('should return empty path and -1 distance for an empty graph', () => {
        const emptyGraph = new Graph<string>(false);
        const { path, distance } = bfsShortestPath(emptyGraph, 'A', 'B');
        expect(path).toEqual([]);
        expect(distance).toBe(-1);
    });

    // Test Case 7: Graph with a single node (and target is itself)
    it('should work with a single node graph if start and end are the same', () => {
        graph.addNode('S');
        const { path, distance } = bfsShortestPath(graph, 'S', 'S');
        expect(path).toEqual(['S']);
        expect(distance).toBe(0);
    });

    // Test Case 8: Graph with a single node (and target is different/non-existent)
    it('should return empty path if single node and target is different', () => {
        graph.addNode('S');
        const { path, distance } = bfsShortestPath(graph, 'S', 'T');
        expect(path).toEqual([]);
        expect(distance).toBe(-1);
    });

    // Test Case 9: Graph with a cycle (BFS naturally finds shortest in unweighted)
    it('should handle cycles correctly and find shortest path', () => {
        graph.addUndirectedEdge('A', 'B');
        graph.addUndirectedEdge('B', 'C');
        graph.addUndirectedEdge('C', 'A'); // Cycle A-B-C
        graph.addUndirectedEdge('C', 'D');
        const { path, distance } = bfsShortestPath(graph, 'A', 'D');
        expect(path).toEqual(['A', 'C', 'D']); // Not A-B-C-D
        expect(distance).toBe(2);
    });

    // Test Case 10: Larger Graph
    it('should find shortest path in a more complex graph', () => {
        graph.addUndirectedEdge('S', 'A');
        graph.addUndirectedEdge('S', 'B');
        graph.addUndirectedEdge('A', 'C');
        graph.addUndirectedEdge('B', 'D');
        graph.addUndirectedEdge('C', 'E');
        graph.addUndirectedEdge('D', 'E');
        graph.addUndirectedEdge('E', 'F');
        graph.addUndirectedEdge('B', 'C'); // A shorter path S-B-C-E-F

        const { path, distance } = bfsShortestPath(graph, 'S', 'F');
        expect(path).toEqual(['S', 'B', 'C', 'E', 'F']);
        expect(distance).toBe(4);
    });

    // Test Case 11: Directed Graph (BFS still works for unweighted shortest path)
    it('should find shortest path in a directed graph', () => {
        const directedGraph = new Graph<string>(true);
        directedGraph.addDirectedEdge('A', 'B');
        directedGraph.addDirectedEdge('B', 'C');
        directedGraph.addDirectedEdge('A', 'D');
        directedGraph.addDirectedEdge('D', 'C'); // A-D-C is 2 edges, A-B-C is 2 edges. Any is fine.

        const { path, distance } = bfsShortestPath(directedGraph, 'A', 'C');
        expect(distance).toBe(2);
        expect(path).toEqual(expect.arrayContaining(['A']));
        expect(path).toEqual(expect.arrayContaining(['C']));
        // Since both A-B-C and A-D-C have length 2, either is a valid shortest path.
        // Depending on iteration order, one will be found.
        expect(path).toEqual(['A', 'B', 'C']) || expect(path).toEqual(['A', 'D', 'C']);
    });
});
```